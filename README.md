# Vanilla-http (Tiny fetch)

仅有 1kb(gzip) 的体积, 仅仅是 fetch 的封装

## Feature

- 更加简化的返回类型, 焦距最终的返回值, 而不是过程
- Promise 风格
- JSON 自动处理
- GET 请求 params 自动处理

## Example

```js
import Http from "vanilla-http";

const http = Http({
  useCache: 1,
  cacheTimeout: 60 * 15 * 1000, // base is 60*15*1000
  // 可选，请求URL前缀
  baseURL: "http://127.0.0.1:4000",
  reducer: (e) => {
    return e;
  },
  onError: (e) => {
    console.log("have-error:", e);
    return e;
  },
});

const fetchSometing = async () => {
  const data1 = await http.get("/hello");
  const data2 = await http.post(
    "/hello",
    { name: "dog", age: 5 },
    {
      onerror: (e) => {
        // 对一些状态单独做处理, 例如，弱error就返回null
        return null;
      },
    }
  );
  const data3 = await http.put("/hello", { name: "dog", age: 5 });
  const data4 = await http.delete("/hello", { name: "dog", age: 5 });
  const data4 = await http.options("/hello", { name: "dog", age: 5 });
};
```
