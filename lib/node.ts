export { IBaseOptions, IOptions } from './index';

import { VanillaHttp as _VanillaHttp, IBaseOptions } from './index';

const XMLHttpRequest = require('xhr2');

export const VanillaHttp = (base: IBaseOptions) =>
  _VanillaHttp({
    ...base,
    XMLHttpRequest,
  });

export default VanillaHttp;
