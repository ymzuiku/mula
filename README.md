# Tiny XMLHttpRequest, like axios

仅有 1.8k(gzip) 的体积, 为追求前端项目极致体积的开发者提供, 可兼容 Nodejs

## Feature

- 更加简化的返回类型
- 对于每个实例可以预设行为
- Promise 风格
- JSON 自动处理
- GET 请求 params 自动处理

## Example

```js
import Mula from 'mula'; // If in nodejs: 'mula/umd/node';


const mula = Mula({
  // 如果希望覆盖 XMLHttpRequest 对象, mula/umd/node 默认使用 xhr2
  // XMLHttpRequest: require("xhr2")

  // 可选，请求URL前缀
  prefixUrl: 'http://127.0.0.1:4000',
  // 可选，重定义默认的对 XMLHttpRequire 的数据处理
  fixResponse: (e)=>{
    return e;
  }
  ontimeout: e => {
    // 对一些状态统一做处理
    console.log('time-out:', e);
  },
  onerror: e => {
    console.log('have-error:', e);
    // 当遇到错误时，对原始数据做处理，并返回
    e.error = { code: '200' };

    // 如果有返回值，该返回值会取代原有返回值
    return e;
  },
});

const fetchSometing = async () => {
  const data1 = await mula.GET('/hello');
  const data2 = await mula.POST(
    '/hello',
    { name: 'dog', age: 5 },
    {
      onerror: e => {
        // 对一些状态单独做处理
        return null
      },
    }
  );
  const data3 = await mula.PUT('/hello', { name: 'dog', age: 5 });
  const data4 = await mula.DELETE('/hello', { name: 'dog', age: 5 });
};
```
