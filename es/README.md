# Tiny XMLHttpRequest, like axios

对于最求前端项目极致体积的开发者，或许不愿意使用 gzip 3.5k 的一个请求库

```js
import Mula from 'mula';

const mula = Mula({
  url: 'http://127.0.0.1:4000',
});

const fetchSometing = async () => {
  const data1 = await mula.GET('/hello');
  const data2 = await mula.POST('/hello', { name: 'dog', age: 5 });
  const data3 = await mula.PUT('/hello', { name: 'dog', age: 5 });
  const data4 = await mula.DELETE('/hello', { name: 'dog', age: 5 });
  const data5 = await mula.OPTIONS('/hello', { name: 'dog', age: 5 });
};
```
