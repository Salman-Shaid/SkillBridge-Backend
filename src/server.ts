import app from "./app";
import prisma from "./lib/prisma";

const PORT = Number(process.env.PORT) || 5000;

const shutdown = async () => {
  console.log("🛑 Shutting down server...");
  await prisma.$disconnect(); 
  process.exit(0);
};

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}


process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);


startServer();

