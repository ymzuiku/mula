# Tiny XMLHttpRequest, like axios

仅有 1.5k(gzip) 的体积, 对于最求前端项目极致体积的开发者

```js
import Mula from 'mula';

const mula = Mula({
  url: 'http://127.0.0.1:4000',
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
        console.log('have-error:', e);
      },
    }
  );
  const data3 = await mula.PUT('/hello', { name: 'dog', age: 5 });
  const data4 = await mula.DELETE('/hello', { name: 'dog', age: 5 });
};
```
