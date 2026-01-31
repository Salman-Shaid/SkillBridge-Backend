import {
  app_default,
  prisma_default
} from "../chunk-3GBCYPDC.js";

// api/index.ts
prisma_default.$connect().then(() => console.log("\u2705 Prisma connected")).catch((err) => console.error("\u274C Prisma connection failed:", err));
var api_default = app_default;
export {
  api_default as default
};
//# sourceMappingURL=index.js.map