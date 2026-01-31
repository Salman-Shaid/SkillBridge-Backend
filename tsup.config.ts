import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts", "api/index.ts"], // add api/index.ts too
  outDir: "dist",
  format: ["esm"],                 
  target: "node18",
  sourcemap: true,
  clean: true,
  outExtension: () => ({ js: ".js" }) 
});
