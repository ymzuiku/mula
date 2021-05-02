// 控制 fastily 返回对象，捕获错误，并且转化为三段式:
// {code:number, msg:string, data?:any}
export const modifySend = async (
  fn: Function,
  modifyError?: (err: string) => string
) => {
  try {
    const out = await Promise.resolve(fn());
    if (typeof out === "string") {
      return { code: 200, msg: out };
    }
    return { code: 200, ...out };
  } catch (err) {
    if (typeof err !== "string") {
      err = err.toString();
    }

    if (modifyError) {
      err = modifyError(err);
    }

    // 若以 [ok] 开头，将错误转化为msg
    if (/^\[ok\]/.test(err)) {
      return { code: 200, msg: (err as string).replace("[ok]", "").trim() };
    }

    // 若以 [json] 开头，将内容转化为返回对象
    if (/^\[json\]/.test(err)) {
      try {
        const str = (err as string).replace("[json]", "").trim();
        const data = JSON.parse(str);
        return { code: 200, ...data };
      } catch (err) {
        return { code: 500, msg: "错误对象 [json] 转化失败" };
      }
    }

    return { code: 400, msg: err };
  }
};

const regiest_post = (app: any, url: string, fn: Function) => {
  app.post(url, (req: any, rep: any) => {
    return modifySend(() => {
      return Promise.resolve(fn(req.body));
    });
  });
};

// 零 api 方案，具体使用请参考 README.md
// 注册一个单层级对象，转化为若干个 post 路由
export const fastifyZeroApi = <T>(app: any, preUrl: string, obj: T) => {
  Object.keys(obj).forEach((k) => {
    regiest_post(app, preUrl + "/" + k, (obj as any)[k]);
  });
};
