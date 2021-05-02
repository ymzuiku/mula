import { createZeroApi } from "../../../lib";
import { ApiTypes } from "./apis";

const api = createZeroApi<ApiTypes>("/v1");

const view = document.createElement("div");
view.textContent = "loading...";
document.body.append(view);

api.hello({ name: "dog" }).then((res) => {
  view.textContent = JSON.stringify(res);
});
