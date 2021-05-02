import fastify from "fastify";
import { fastifyZeroApi } from "../../../serve/fastifyZeroApi";
import { apis } from "./apis";

// 创建 一个 fastlify 实例
const app = fastify({ logger: { level: "warn" } });

// 注册若干个函数路由，并且约定一个前缀: /v1
fastifyZeroApi(app, "/v1", apis);

app.listen(5000, (_, addr) => {
  console.log("listen:", addr);
});
