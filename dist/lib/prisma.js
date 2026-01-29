import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
// DATABASE_URL
const connectionString = process.env.DATABASE_URL;
// PostgreSQL Adapter
export const prisma = new PrismaPg({ connectionString });
