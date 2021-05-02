"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
exports.fastifyZeroApi = exports.modifySend = void 0;
// 控制 fastily 返回对象，捕获错误，并且转化为三段式:
// {code:number, msg:string, data?:any}
var modifySend = function (fn, modifyError) { return __awaiter(void 0, void 0, void 0, function () {
    var out, err_1, str, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Promise.resolve(fn())];
            case 1:
                out = _a.sent();
                if (typeof out === "string") {
                    return [2 /*return*/, { code: 200, msg: out }];
                }
                return [2 /*return*/, __assign({ code: 200 }, out)];
            case 2:
                err_1 = _a.sent();
                if (typeof err_1 !== "string") {
                    err_1 = err_1.toString();
                }
                if (modifyError) {
                    err_1 = modifyError(err_1);
                }
                // 若以 [ok] 开头，将错误转化为msg
                if (/^\[ok\]/.test(err_1)) {
                    return [2 /*return*/, { code: 200, msg: err_1.replace("[ok]", "").trim() }];
                }
                // 若以 [json] 开头，将内容转化为返回对象
                if (/^\[json\]/.test(err_1)) {
                    try {
                        str = err_1.replace("[json]", "").trim();
                        data = JSON.parse(str);
                        return [2 /*return*/, __assign({ code: 200 }, data)];
                    }
                    catch (err) {
                        return [2 /*return*/, { code: 500, msg: "错误对象 [json] 转化失败" }];
                    }
                }
                return [2 /*return*/, { code: 400, msg: err_1 }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.modifySend = modifySend;
var regiest_post = function (app, url, fn) {
    app.post(url, function (req, rep) {
        return exports.modifySend(function () {
            return Promise.resolve(fn(req.body));
        });
    });
};
// 零 api 方案，具体使用请参考 README.md
// 注册一个单层级对象，转化为若干个 post 路由
var fastifyZeroApi = function (app, preUrl, obj) {
    Object.keys(obj).forEach(function (k) {
        regiest_post(app, preUrl + "/" + k, obj[k]);
    });
};
exports.fastifyZeroApi = fastifyZeroApi;
