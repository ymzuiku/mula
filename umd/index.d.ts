interface IOptions extends RequestInit {
    format?: "text" | "json";
    useCache?: boolean;
    cacheTimeout?: number;
    baseUrl?: string;
    reduce?: (res: any) => Promise<any>;
    onSuccess?: (res: any) => Promise<any>;
    onError?: (res: any) => Promise<any>;
}
export declare const baseApi: (url: string, obj?: any, opt?: IOptions) => Promise<any>;
declare const CreateHTTP: (opt: IOptions) => {
    get: (url: string, body?: any, options?: IOptions | undefined) => Promise<any>;
    post: (url: string, body?: any, options?: IOptions | undefined) => Promise<any>;
    del: (url: string, body?: any, options?: IOptions | undefined) => Promise<any>;
    options: (url: string, body?: any, options?: IOptions | undefined) => Promise<any>;
};
export default CreateHTTP;
