export interface IOptions {
    /** 请求体 */
    body?: object;
    /** 请求头 */
    headers?: {
        [key: string]: string;
    };
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
    /** 用来替换默认的 XMLHttpRequest */
    XMLHttpRequest: any;
    /** 覆盖默认的数据处理行为 */
    fixResponse?: (ev: ProgressEvent, key: string) => any;
    /** 针对所有请求统一设置: headers */
    headers?: {
        [key: string]: string;
    };
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
/** 默认的数据处理行为 */
export declare function defaultFixResponse(e: any, key: string): any;
/** 创建一个 mula 请求器 */
export declare const Mula: (base?: IBaseOptions | undefined) => {
    /** 通用请求 */
    reoquest: (options: IOptions) => Promise<unknown>;
    /** GET 请求, 使用 params 代替 body */
    get: (url: string, params?: any, options?: IOptions | undefined) => Promise<any>;
    /** POST 请求 */
    post: (url: string, body: any, options?: IOptions | undefined) => Promise<any>;
    /** DELETE 请求 */
    delete: (url: string, body: any, options?: IOptions | undefined) => Promise<any>;
    /** PUT 请求 */
    put: (url: string, body: any, options?: IOptions | undefined) => Promise<any>;
    /** OPTIONS 请求 */
    options: (url: string, body: any, options?: IOptions | undefined) => Promise<any>;
};
export default Mula;
