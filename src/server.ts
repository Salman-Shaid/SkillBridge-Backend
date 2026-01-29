import app from "./app";
import prisma from "./lib/prisma"; // ✅ default import

const PORT = Number(process.env.PORT) || 5000;

const shutdown = async () => {
  console.log("🛑 Shutting down server...");
  await prisma.$disconnect(); // ✅ use prisma, not Prisma
  process.exit(0);
};

async function startServer() {
  try {
    await prisma.$connect(); // ✅ use prisma
    console.log("✅ Connected to database");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Start app
startServer();

