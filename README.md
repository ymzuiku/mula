# Vanilla-http (Tiny fetch)

仅有 1kb(gzip) 的体积, 仅仅是 fetch 的封装

## Feature

- 更加简化的返回类型, 焦距最终的返回值, 而不是过程
- Promise 风格
- JSON 自动处理
- GET 请求 params 自动处理

## Example

```js
import { createHttp } from "vanilla-http";

const http = createHttp({
  // 开启请求缓存, 默认为 false
  useCache: false,
  // 在固定间隔时间内的请求，若参数相同，直接走缓存，默认15分钟
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
  // 给某个请求开启缓存
  const data1 = await http.get("/hello", {}, { useCache: true });
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

## Zero API

> 大部分情况下，你不需要使用此 API，若后端使用的是 NodeJS + Typescript，这或许会帮你提高开发效率

Zero API 是通过一个前后端约定，达到前后端调用 API 和调用 typescript 函数一样，简单并且有类型提示约束。

查看 [Example](https://github.com/ymzuiku/vanilla-http/tree/master/example)

### Zero API 服务端设定

约定服务端以一下方式创建接口

apis.ts: 声明一个 apis 对象，同时也是前端调用的类型对象

```ts
export const apis = {
  hello: async ({ name }: { name: string }) => {
    return { code: 200, data: { name } };
  },
  world: async ({ age }: { age: number }) => {
    return { code: 200, data: { age } };
  },
};
```

app.ts: 启动服务

```ts
import fastify from "fastify";
import { fastifyZeroApi } from "vanilla-http/serve/fastifyZeroApi";
import { apis } from "./apis";

// 创建 一个 fastlify 实例
const app = fastify({ logger: { level: "warn" } });

// 注册若干个函数路由，并且约定一个前缀: /v1
fastifyZeroApi(app, "/v1", apis);

app.listen(5000);
```

### Zero API 客户端设定

api.d.ts: 引用服务端 ts 源码，获得接口类型

```ts
import { apis } from "../server/apis";

type ApiTypes = typeof apis;

export { ApiTypes };
```

zeroApi.ts: 创建一个服务端请求对象，并且约束接口类型

```ts
import { createZeroApi } from "vanilla-http";
import { ApiTypes } from "./apis.d.ts";

// 使用刚刚引入的 Apis 类型约束， 并且使用服务端约定的前缀: /v1,
const api = createZeroApi<ApiTypes>("/v1");

// 此时获得完整的类型提示，并且执行即发起一个 POST 请求
api.hello({ name: "dog" }).then((res) => {
  // 服务端函数返回的对象： { code: 200, data: { name } }
  console.log(res);
});
```
