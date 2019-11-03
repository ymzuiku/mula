export { IBaseOptions, IOptions } from './index';

import _VanillaHttp, { IBaseOptions } from './index';

const XMLHttpRequest = require('xhr2');

const VanillaHttp = (base: IBaseOptions) =>
  _VanillaHttp({
    ...base,
    XMLHttpRequest,
  });

export default VanillaHttp;
