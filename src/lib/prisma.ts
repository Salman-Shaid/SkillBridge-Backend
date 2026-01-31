import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// Create adapter using DATABASE_URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Initialize Prisma client with adapter
const prisma = new PrismaClient({ adapter });

export default prisma;

