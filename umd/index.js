!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("querystring-number")):"function"==typeof define&&define.amd?define(["exports","querystring-number"],e):e((t=t||self).queryString={},t.queryString)}(this,function(t,u){"use strict";u=u&&u.hasOwnProperty("default")?u.default:u;var c=function(){return(c=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function i(u,i,a,s){return new(a=a||Promise)(function(t,e){function n(t){try{o(s.next(t))}catch(t){e(t)}}function r(t){try{o(s.throw(t))}catch(t){e(t)}}function o(e){e.done?t(e.value):new a(function(t){t(e.value)}).then(n,r)}o((s=s.apply(u,i||[])).next())})}function a(n,r){var o,u,i,t,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return t={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,u&&(i=2&e[0]?u.return:e[0]?u.throw||((i=u.return)&&i.call(u),0):u.next)&&!(i=i.call(u,e[1])).done)return i;switch(u=0,i&&(e=[2&e[0],i.value]),e[0]){case 0:case 1:i=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,u=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(i=0<(i=a.trys).length&&i[i.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!i||e[1]>i[0]&&e[1]<i[3])){a.label=e[1];break}if(6===e[0]&&a.label<i[1]){a.label=i[1],i=e;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(e);break}i[2]&&a.ops.pop(),a.trys.pop();continue}e=r.call(n,a)}catch(t){e=[6,t],u=0}finally{o=i=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}var s=void 0;function f(s,f){return i(this,void 0,void 0,function(){return a(this,function(t){return[2,new Promise(function(o,u){var i=new XMLHttpRequest;i.open(s.method,""+f.prefixUrl+s.url),i.timeout=s.timeout||f.timeout,i.responseType=s.responseType||f.responseType;var e=c({},f.headers,s.headers);Object.keys(e).forEach(function(t){i.setRequestHeader(t,e[t])});var a={onload:!0,onabort:!1,onerror:!1,ontimeout:!1,onloadend:null,onloadstart:null,onprogress:null};Object.keys(a).forEach(function(t){var e=a[t],n=f[t],r=s[t];i[t]=function(t){t=f.fixResponse(t),t=n&&n(t)||t,t=r&&r(t)||t,null!==e&&(e?o(t):u(t))}}),i.send(s.body?JSON.stringify(s.body):void 0)})]})})}function e(t){var e=t;return"object"==typeof(t=t.target&&t.target.response||t)&&(t.httpStatus={total:e.total,status:e.target&&e.target.status,readyState:e.target&&e.target.readyState,responseType:e.target&&e.target.responseType,responseURL:e.target&&e.target.responseURL,statusText:e.target&&e.target.statusText,timeStamp:e.timeStamp}),t}function n(t){var o=c({headers:{"Content-Type":"application/json"},timeout:9e3,url:"",responseType:"json",fixResponse:e},t);return{reoquest:function(e){return i(s,void 0,void 0,function(){return a(this,function(t){return[2,f(e,o)]})})},GET:function(e,n,r){return i(s,void 0,void 0,function(){return a(this,function(t){return n&&(e=e+"?"+u.stringify(n)),[2,f(c({url:e,method:"GET"},r),o)]})})},POST:function(e,n,r){return i(s,void 0,void 0,function(){return a(this,function(t){return[2,f(c({url:e,body:n,method:"POST"},r),o)]})})},DELETE:function(e,n,r){return i(s,void 0,void 0,function(){return a(this,function(t){return[2,f(c({url:e,body:n,method:"DELETE"},r),o)]})})},PUT:function(e,n,r){return i(s,void 0,void 0,function(){return a(this,function(t){return[2,f(c({url:e,body:n,method:"PUT"},r),o)]})})},OPTIONS:function(e,n,r){return i(s,void 0,void 0,function(){return a(this,function(t){return[2,f(c({url:e,body:n,method:"OPTIONS"},r),o)]})})}}}t.Mula=n,t.default=n,t.defaultFixResponse=e,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
