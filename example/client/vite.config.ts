import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["monaco-editor", "vscode", "vanilla-life"],
  },
  esbuild: {
    jsxFactory: "aoife",
    jsxFragment: "aoife.Frag",
  },
  server: {
    proxy: {
      "/v1": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
});
