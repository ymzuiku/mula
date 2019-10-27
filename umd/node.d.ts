export { IBaseOptions, IOptions } from './index';
import { IBaseOptions } from './index';
export declare const Mula: (base: IBaseOptions) => {
    reoquest: (options: import(".").IOptions) => Promise<unknown>;
    get: (url: string, params?: any, options?: import(".").IOptions | undefined) => Promise<any>;
    post: (url: string, body: any, options?: import(".").IOptions | undefined) => Promise<any>;
    delete: (url: string, body: any, options?: import(".").IOptions | undefined) => Promise<any>;
    put: (url: string, body: any, options?: import(".").IOptions | undefined) => Promise<any>;
    options: (url: string, body: any, options?: import(".").IOptions | undefined) => Promise<any>;
};
export default Mula;
