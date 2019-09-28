import queryString from 'querystring-number';

export interface IOptions {
  /** 请求体 */
  body?: object;
  /** 请求头 */
  headers?: { [key: string]: string };
  /** 请求方法 */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
  /** 当请求中断的回调 */
  onabort?: (ev: ProgressEvent) => any;
  /** 当请求错误的回调 */
  onerror?: (ev: ProgressEvent) => any;
  /** 当请求成功的回调 */
  onload?: (ev: ProgressEvent) => any;
  /** 当请求完全结束的回调 */
  onloadend?: (ev: ProgressEvent) => any;
  /** 当请求开始的回调 */
  onloadstart?: (ev: ProgressEvent) => any;
  /** 当请求有进度时，进度改变的回调 */
  onprogress?: (ev: ProgressEvent) => any;
  /** 当请求超时的回调 */
  ontimeout?: (ev: ProgressEvent) => any;
  /** 当请求中断的回调 */
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  /** 请求超时时长 */
  timeout?: number;
  /** 针对每个请求统一设置: 请求url，请求url等于 prefixUrl + url */
  url?: string;
}

export interface IBaseOptions {
  /** 覆盖默认的数据处理行为 */
  fixResponse?: (ev: ProgressEvent) => any;
  /** 针对所有请求统一设置: headers */
  headers?: { [key: string]: string };
  /** 针对所有请求统一设置: 当请求中断 */
  onabort?: (ev: ProgressEvent) => any;
  /** 针对所有请求统一设置: 当请求遇到错误 */
  onerror?: (ev: ProgressEvent) => any;
  /** 针对所有请求统一设置: 当请求成功 */
  onload?: (ev: ProgressEvent) => any;
  /** 针对所有请求统一设置: 当请求均完毕 */
  onloadend?: (ev: ProgressEvent) => any;
  /** 针对所有请求统一设置: 当请求开始 */
  onloadstart?: (ev: ProgressEvent) => any;
  /** 针对所有请求统一设置: 当请求有进度 */
  onprogress?: (ev: ProgressEvent) => any;
  /** 针对所有请求统一设置: 当超时回调 */
  ontimeout?: (ev: ProgressEvent) => any;
  /** 针对所有请求统一设置: url前缀 */
  prefixUrl?: string;
  /** 针对所有请求统一设置: 响应类型 */
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  /** 针对所有请求统一设置: 超时时长 */
  timeout?: number;
}

async function request(opt: IOptions, base: IBaseOptions) {
  return new Promise((resolve, reject) => {
    const xmlReq = new XMLHttpRequest();

    // 初始化请求
    xmlReq.open(opt.method, `${base.prefixUrl}${opt.url}`);

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

/** 默认的数据处理行为 */
export function defaultFixResponse(e: any) {
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

/** 创建一个 mula 请求器 */
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
    /** 通用请求 */
    reoquest: async (options: IOptions) => {
      return request(options, opt);
    },
    /** GET 请求, 使用 params 代替 body */
    GET: async (url: string, params?: any, options?: IOptions): Promise<any> => {
      if (params) {
        url = `${url}?${queryString.stringify(params)}`;
      }

      return request({ url, method: 'GET', ...options }, opt);
    },
    /** POST 请求 */
    POST: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'POST', ...options }, opt);
    },
    /** DELETE 请求 */
    DELETE: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'DELETE', ...options }, opt);
    },
    /** PUT 请求 */
    PUT: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'PUT', ...options }, opt);
    },
    /** OPTIONS 请求 */
    OPTIONS: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'OPTIONS', ...options }, opt);
    },
  };
};

// tslint:disable-next-line
export default Mula;
