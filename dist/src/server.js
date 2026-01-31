import {
  app_default,
  prisma_default
} from "../chunk-3GBCYPDC.js";

// src/server.ts
var PORT = Number(process.env.PORT) || 5e3;
var shutdown = async () => {
  console.log("\u{1F6D1} Shutting down server...");
  await prisma_default.$disconnect();
  process.exit(0);
};
async function startServer() {
  try {
    await prisma_default.$connect();
    console.log("\u2705 Connected to database");
    app_default.listen(PORT, () => {
      console.log(`\u{1F680} Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("\u274C Failed to start server:", error);
    await prisma_default.$disconnect();
    process.exit(1);
  }
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
startServer();
//# sourceMappingURL=server.js.map