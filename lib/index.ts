import qs from "querystring-number";
const cache = {} as any;

interface IOptions extends RequestInit {
  format?: "text" | "json";
  useCache?: boolean;
  // base 60 * 15 * 1000
  cacheTimeout?: number;
  baseUrl?: string;
  reduce?: (res: any) => Promise<any>;
  onSuccess?: (res: any) => Promise<any>;
  onError?: (res: any) => Promise<any>;
}

export const baseApi = async (url: string, obj?: any, opt: IOptions = {}) => {
  let body: any = void 0;
  let params = "";
  const useCache = obj.useCache;
  if (opt.method === "GET") {
    params = "?" + qs.stringify(obj);
  } else {
    body = obj && JSON.stringify(obj);
  }
  const realUrl = (opt.baseUrl || "") + url + params;
  const cacheKey = realUrl + body;

  // GET 请求，在内存中保留3分钟
  if (useCache) {
    const old = cache[cacheKey];
    if (old && Date.now() - old.time < (opt.cacheTimeout || 60 * 15 * 1000)) {
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
    .then((res) => res[opt.format || "json"]())
    .then(async (res) => {
      if (useCache) {
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

const CreateHTTP = (opt: IOptions) => {
  return {
    get: (url: string, body?: any, options?: IOptions) => {
      return baseApi(url, body, { ...opt, ...options, method: "GET" });
    },
    post: (url: string, body?: any, options?: IOptions) => {
      return baseApi(url, body, { ...opt, ...options, method: "POST" });
    },
    del: (url: string, body?: any, options?: IOptions) => {
      return baseApi(url, body, { ...opt, ...options, method: "DELETE" });
    },
    options: (url: string, body?: any, options?: IOptions) => {
      return baseApi(url, body, { ...opt, ...options, method: "OPTIONS" });
    },
  };
};

export default CreateHTTP;
