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

    if (base && base.headers) {
      Object.keys(base.headers).forEach(key => {
        xmlReq.setRequestHeader(key, (base.headers as any)[key]);
      });
    }
    if (opt.headers) {
      Object.keys(opt.headers).forEach(key => {
        xmlReq.setRequestHeader(key, (opt.headers as any)[key]);
      });
    }

    // 非必要回调用
    if (opt.onloadend) {
      xmlReq.onloadend = opt.onloadend;
    }
    if (opt.onloadstart) {
      xmlReq.onloadstart = opt.onloadstart;
    }
    if (opt.onprogress) {
      xmlReq.onprogress = opt.onprogress;
    }

    // 必要回调

    xmlReq.onload = (ev: ProgressEvent) => {
      // if (xmlReq.responseType) {
      //   ev = JSON.parse(ev);
      // }
      if (opt.onload) {
        opt.onload(ev);
      }
      resolve(ev);
    };
    xmlReq.onabort = (ev: ProgressEvent) => {
      if (opt.onabort) {
        opt.onabort(ev);
      }
      reject(ev);
    };
    xmlReq.onerror = (ev: ProgressEvent) => {
      if (opt.onerror) {
        opt.onerror(ev);
      }
      reject(ev);
    };
    xmlReq.ontimeout = (ev: ProgressEvent) => {
      if (opt.ontimeout) {
        opt.ontimeout(ev);
      }
      reject(ev);
    };

    // 发送请求
    xmlReq.send(opt.body ? JSON.stringify(opt.body) : undefined);
  });
}

export const createPull = (base?: IBaseOptions) => {
  const opt = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 9000,
    url: '',
    responseType: 'json',
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
    DELETE: async (
      url: string,
      body: any,
      options?: IOptions,
    ): Promise<any> => {
      return request({ url, body, method: 'DELETE', ...options }, opt);
    },
    PUT: async (url: string, body: any, options?: IOptions): Promise<any> => {
      return request({ url, body, method: 'PUT', ...options }, opt);
    },
    OPTIONS: async (
      url: string,
      body: any,
      options?: IOptions,
    ): Promise<any> => {
      return request({ url, body, method: 'OPTIONS', ...options }, opt);
    },
  };
};
