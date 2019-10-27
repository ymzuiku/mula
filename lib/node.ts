export { IBaseOptions, IOptions } from './index';

import { Mula as Mula_, IBaseOptions } from './index';

const XMLHttpRequest = require('xhr2');

export const Mula = (base: IBaseOptions) =>
  Mula_({
    ...base,
    XMLHttpRequest,
  });

export default Mula;
