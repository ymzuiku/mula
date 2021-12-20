import querystring from "querystring-number";
const cache = {} as any;

interface IOptions extends RequestInit {
  format?: "text" | "json";
  cacheTime?: number;
  baseUrl?: string;
  reduce?: (res: any) => Promise<any>;
  onSuccess?: (res: any) => Promise<any>;
  onError?: (res: any) => Promise<any>;
}

export const baseApi = async (url: string, obj?: any, opt: IOptions = {}) => {
  if (typeof window === "undefined") {
    return;
  }
  let body: any = void 0;

  if (opt.method === "GET") {
    url += "?" + querystring.stringify(body);
  } else {
    body = obj && JSON.stringify(obj);
  }

  const realUrl = (opt.baseUrl || "") + url;
  const cacheKey = realUrl + body;

  // 若开启缓存，默认在内存中保留N分钟
  if (opt.cacheTime) {
    const old = cache[cacheKey];
    if (old && Date.now() - old.time < opt.cacheTime) {
      return old;
    }
  }

  let isForm = Object.prototype.toString.call(obj) === "[object FormData]";

  if (!(opt as any).headers) {
    (opt as any).headers = {};
  }

  if (!(opt as any).headers["Content-Type"]) {
    if (isForm) {
      (opt as any).headers["Content-Type"] =
        "application/x-www-form-urlencoded";
    } else {
      (opt as any).headers["Content-Type"] = "application/json";
    }
  }

  if (opt.method === "GET" && !(opt as any).headers["Cache-Control"]) {
    (opt as any).headers["Cache-Control"] = "public, max-age=604800, immutable";
  }

  return fetch(realUrl, {
    body,
    ...opt,
    headers: opt.headers,
  })
    .then(async (res) => {
      const data = await res[opt.format || "json"]();
      return { body: data, status: res.status, headers: res.headers };
    })
    .then(async (res) => {
      if (opt.cacheTime) {
        cache[cacheKey] = {
          data: res,
          time: Date.now(),
        };
      }
      if (opt.reduce) {
        res = await Promise.resolve(opt.reduce(res));
      }
      if (opt.onSuccess) {
        await Promise.resolve(opt.onSuccess(res));
      }
      return res;
    })
    .catch(async (err) => {
      if (opt.onError) {
        await Promise.resolve(opt.onError(err));
      }
    });
};

export const createHttp = (opt: IOptions = {}) => {
  return {
    get: (url: string, body?: any, options?: IOptions) => {
      return baseApi(url, body, { ...opt, ...options, method: "GET" });
    },
    post: (url: string, body?: any, options?: IOptions) => {
      return baseApi(url, body, { ...opt, ...options, method: "POST" });
    },
    put: (url: string, body?: any, options?: IOptions) => {
      return baseApi(url, body, { ...opt, ...options, method: "PUT" });
    },
    del: (url: string, body?: any, options?: IOptions) => {
      return baseApi(url, body, { ...opt, ...options, method: "DELETE" });
    },
    options: (url: string, body?: any, options?: IOptions) => {
      return baseApi(url, body, { ...opt, ...options, method: "OPTIONS" });
    },
  };
};
