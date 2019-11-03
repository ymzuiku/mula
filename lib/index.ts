const queryString = require('querystring-number');

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
  /** 当请求中断的类型 */
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  /** 请求超时时长 */
  timeout?: number;
  /** 针对每个请求统一设置: 请求url，请求url等于 baseURL + url */
  url?: string;
}

export interface IBaseOptions {
  /** 用来替换默认的 XMLHttpRequest */
  XMLHttpRequest: any;
  /** 覆盖默认的数据处理行为 */
  reducer?: (ev: ProgressEvent, key: string) => any;
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
  baseURL?: string;
  /** 针对所有请求统一设置: 响应类型 */
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  /** 针对所有请求统一设置: 超时时长 */
  timeout?: number;
}

async function request(opt: IOptions, base: IBaseOptions) {
  return new Promise((resolve, reject) => {
    const XHR = base.XMLHttpRequest || XMLHttpRequest;
    const xmlReq = new XHR();

    // 初始化请求
    let url;
    if (base.baseURL) {
      url = `${base.baseURL}${opt.url}`;
    } else {
      url = opt.url;
    }
    xmlReq.open(opt.method, url);

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
        e = base.reducer!(e, key);
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
    if (opt.body) {
      xmlReq.send(JSON.stringify(opt.body));
    } else {
      xmlReq.send();
    }
  });
}

/** 默认的数据处理行为 */
export function defaultReducer(res: any, key: string) {
  if (!res) {
    return res;
  }

  const _res = res;
  res = (res.target && res.target.response) || res;
  if (typeof res === 'object') {
    res.__http__ = {
      total: _res.total,
      status: _res.target && _res.target.status,
      readyState: _res.target && _res.target.readyState,
      responseType: _res.target && _res.target.responseType,
      responseURL: _res.target && _res.target.responseURL,
      statusText: _res.target && _res.target.statusText,
      timeStamp: _res.timeStamp,
    };
  }

  return res;
}

/** 创建一个 http 请求器 */
const VanillaHttp = (base?: IBaseOptions) => {
  const opt = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
    url: '',
    responseType: 'json',
    reducer: defaultReducer,
    ...base,
  } as any;

  return {
    /** 通用请求 */
    reoquest: async (options: IOptions) => {
      return request(options, opt);
    },
    /** GET 请求, 使用 params 代替 body */
    get: async (url: string, params?: any, options?: IOptions): Promise<any> => {
      if (params) {
        url = `${url}?${queryString.stringify(params)}`;
      }
      return request({ url, method: 'GET', ...options }, opt);
    },
    /** POST 请求 */
    post: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'POST', ...options }, opt);
    },
    /** DELETE 请求 */
    delete: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'DELETE', ...options }, opt);
    },
    /** PUT 请求 */
    put: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'PUT', ...options }, opt);
    },
    /** OPTIONS 请求 */
    options: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'OPTIONS', ...options }, opt);
    },
  };
};

// tslint:disable-next-line
export default VanillaHttp;
