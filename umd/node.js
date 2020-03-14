'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var _this = undefined;
var queryString = require("querystring-number");
function request(opt, base) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var XHR = base.XMLHttpRequest || XMLHttpRequest;
                    var xmlReq = new XHR();
                    // 初始化请求
                    var url;
                    if (base.baseURL) {
                        url = "" + base.baseURL + opt.url;
                    }
                    else {
                        url = opt.url;
                    }
                    xmlReq.open(opt.method, url);
                    // 设置超时时间,0表示永不超时
                    xmlReq.timeout = opt.timeout || base.timeout;
                    // 设置期望的返回数据类型 'json' 'text' 'document' ...
                    xmlReq.responseType = opt.responseType || base.responseType;
                    // 设置请求头
                    var nextHeader = __assign({}, base.headers, opt.headers);
                    Object.keys(nextHeader).forEach(function (key) {
                        xmlReq.setRequestHeader(key, nextHeader[key]);
                    });
                    var events = {
                        onload: true,
                        onabort: false,
                        onerror: false,
                        ontimeout: false,
                        onloadend: null,
                        onloadstart: null,
                        onprogress: null
                    };
                    Object.keys(events).forEach(function (key) {
                        var promiseType = events[key];
                        var baseFn = base[key];
                        var optFn = opt[key];
                        xmlReq[key] = function (e) {
                            e = base.reducer(e, key);
                            e = (baseFn && baseFn(e)) || e;
                            e = (optFn && optFn(e)) || e;
                            if (promiseType !== null) {
                                if (promiseType) {
                                    resolve(e);
                                }
                                else {
                                    reject(e);
                                }
                            }
                        };
                    });
                    // 发送请求
                    if (opt.body) {
                        xmlReq.send(JSON.stringify(opt.body));
                    }
                    else {
                        xmlReq.send();
                    }
                })];
        });
    });
}
/** 默认的数据处理行为 */
function defaultReducer(res, key) {
    if (!res) {
        return res;
    }
    var _res = res;
    res = (res.target && res.target.response) || res;
    if (typeof res === "object") {
        res.__http__ = {
            total: _res.total,
            status: _res.target && _res.target.status,
            readyState: _res.target && _res.target.readyState,
            responseType: _res.target && _res.target.responseType,
            responseURL: _res.target && _res.target.responseURL,
            statusText: _res.target && _res.target.statusText,
            timeStamp: _res.timeStamp
        };
    }
    return res;
}
var cache = {};
/** 创建一个 http 请求器 */
var VanillaHttp = function (base) {
    var opt = __assign({ headers: {
            "Content-Type": "application/json"
        }, timeout: 5000, url: "", responseType: "json", reducer: defaultReducer, autoResponseType: {
            md: "text",
            text: "text",
            html: "text"
        } }, base);
    return {
        /** 通用请求 */
        reoquest: function (options) { return __awaiter(_this, void 0, void 0, function () {
            var oldData, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldData = cache[options.url];
                        if (options.cacheTime &&
                            oldData &&
                            Date.now() - oldData.time < options.cacheTime) {
                            return [2 /*return*/, oldData.res];
                        }
                        return [4 /*yield*/, request(options, opt)];
                    case 1:
                        res = _a.sent();
                        if (options.cacheTime) {
                            cache[options.url] = {
                                res: res,
                                time: Date.now()
                            };
                        }
                        return [2 /*return*/, res];
                }
            });
        }); },
        /** GET 请求, 使用 params 代替 body */
        get: function (url, params, options) { return __awaiter(_this, void 0, void 0, function () {
            var suffixs, fileType, responseType;
            return __generator(this, function (_a) {
                if (params) {
                    url = url + "?" + queryString.stringify(params);
                }
                suffixs = url.split(".");
                fileType = suffixs[suffixs.length - 1];
                responseType = opt.autoResponseType[fileType] || "json";
                return [2 /*return*/, request(__assign({ url: url, responseType: responseType, method: "GET" }, options), opt)];
            });
        }); },
        /** POST 请求 */
        post: function (url, body, options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request(__assign({ url: url, body: body, method: "POST" }, options), opt)];
            });
        }); },
        /** DELETE 请求 */
        delete: function (url, body, options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request(__assign({ url: url, body: body, method: "DELETE" }, options), opt)];
            });
        }); },
        /** PUT 请求 */
        put: function (url, body, options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request(__assign({ url: url, body: body, method: "PUT" }, options), opt)];
            });
        }); },
        /** OPTIONS 请求 */
        options: function (url, body, options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request(__assign({ url: url, body: body, method: "OPTIONS" }, options), opt)];
            });
        }); }
    };
};

var XMLHttpRequest$1 = require('xhr2');
var VanillaHttp$1 = function (base) {
    return VanillaHttp(__assign({}, base, { XMLHttpRequest: XMLHttpRequest$1 }));
};

module.exports = VanillaHttp$1;
//# sourceMappingURL=node.js.map
