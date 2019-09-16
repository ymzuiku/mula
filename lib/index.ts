interface IOptions {
  body?: object;
  headers?: { [key: string]: string };
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
  onabort?: (ev: ProgressEvent) => any;
  onerror?: (ev: ProgressEvent) => any;
  onload?: (ev: ProgressEvent) => any;
  onloadend?: (ev: ProgressEvent) => any;
  onloadstart?: (ev: ProgressEvent) => any;
  onprogress?: (ev: ProgressEvent) => any;
  ontimeout?: (ev: ProgressEvent) => any;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  timeout?: number;
  url?: string;
}

export interface IBaseOptions {
  fixResponse?: (ev: ProgressEvent) => any;
  headers?: { [key: string]: string };
  onabort?: (ev: ProgressEvent) => any;
  onerror?: (ev: ProgressEvent) => any;
  onload?: (ev: ProgressEvent) => any;
  onloadend?: (ev: ProgressEvent) => any;
  onloadstart?: (ev: ProgressEvent) => any;
  onprogress?: (ev: ProgressEvent) => any;
  ontimeout?: (ev: ProgressEvent) => any;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  timeout?: number;
  url?: string;
}

async function request(opt: IOptions, base: IBaseOptions) {
  return new Promise((resolve, reject) => {
    const xmlReq = new XMLHttpRequest();

    // 初始化请求
    xmlReq.open(opt.method, `${base.url}${opt.url}`);

    // 设置超时时间,0表示永不超时
    xmlReq.timeout = opt.timeout || base.timeout!;
    // 设置期望的返回数据类型 'json' 'text' 'document' ...
    xmlReq.responseType = opt.responseType || base.responseType!;

    // 设置请求头
    const nextHeader = { ...base.headers, ...opt.headers };
    Object.keys(nextHeader).forEach(key => {
      xmlReq.setRequestHeader(key, (nextHeader as any)[key]);
    });

    const events = {
      onload: true,
      onabort: false,
      onerror: false,
      ontimeout: false,
      onloadend: null,
      onloadstart: null,
      onprogress: null,
    };
    Object.keys(events).forEach(key => {
      const promiseType = (events as any)[key];
      const baseFn = (base as any)[key];
      const optFn = (opt as any)[key];
      (xmlReq as any)[key] = (e: any) => {
        e = base.fixResponse!(e);
        e = (baseFn && baseFn(e)) || e;
        e = (optFn && optFn(e)) || e;
        if (promiseType !== null) {
          if (promiseType) {
            resolve(e);
          } else {
            reject(e);
          }
        }
      };
    });

    // 发送请求
    xmlReq.send(opt.body ? JSON.stringify(opt.body) : undefined);
  });
}

function defaultFixResponse(e: any) {
  const le = e;
  e = (e.target && e.target.response) || e;
  if (typeof e === 'object') {
    e.httpStatus = {
      total: le.total,
      status: le.target && le.target.status,
      readyState: le.target && le.target.readyState,
      responseType: le.target && le.target.responseType,
      responseURL: le.target && le.target.responseURL,
      statusText: le.target && le.target.statusText,
      timeStamp: le.timeStamp,
    };
  }

  return e;
}

export const Mula = (base?: IBaseOptions) => {
  const opt = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 9000,
    url: '',
    responseType: 'json',
    fixResponse: defaultFixResponse,
    ...base,
  } as any;

  return {
    reoquest: async (options: IOptions) => {
      return request(options, opt);
    },
    GET: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'GET', ...options }, opt);
    },
    POST: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'POST', ...options }, opt);
    },
    DELETE: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'DELETE', ...options }, opt);
    },
    PUT: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'PUT', ...options }, opt);
    },
    OPTIONS: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'OPTIONS', ...options }, opt);
    },
  };
};

// tslint:disable-next-line
export default Mula;
