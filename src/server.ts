import app from "../src/app.js"; 
import prisma from "../src/lib/prisma.js"; 

prisma.$connect()
  .then(() => console.log("Prisma connected"))
  .catch((err) => console.error("Prisma connection failed:", err));

export default app; 

