export { IBaseOptions, IOptions, defaultFixResponse } from './index';
import { IBaseOptions } from './index';
export declare const Mula: (base: IBaseOptions) => {
    reoquest: (options: import(".").IOptions) => Promise<unknown>;
    GET: (url: string, params?: any, options?: import(".").IOptions | undefined) => Promise<any>;
    POST: (url: string, body: any, options?: import(".").IOptions | undefined) => Promise<any>;
    DELETE: (url: string, body: any, options?: import(".").IOptions | undefined) => Promise<any>;
    PUT: (url: string, body: any, options?: import(".").IOptions | undefined) => Promise<any>;
    OPTIONS: (url: string, body: any, options?: import(".").IOptions | undefined) => Promise<any>;
};
export default Mula;
