interface IOptions {
    body?: object;
    headers?: {
        [key: string]: string;
    };
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
    headers?: {
        [key: string]: string;
    };
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
export declare const Mula: (base?: IBaseOptions) => {
    reoquest: (options: IOptions) => Promise<unknown>;
    GET: (url: string, body: any, options?: IOptions) => Promise<any>;
    POST: (url: string, body: any, options?: IOptions) => Promise<any>;
    DELETE: (url: string, body: any, options?: IOptions) => Promise<any>;
    PUT: (url: string, body: any, options?: IOptions) => Promise<any>;
    OPTIONS: (url: string, body: any, options?: IOptions) => Promise<any>;
};
export {};
