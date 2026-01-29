import prisma from "../../lib/prisma"; // ✅ default import
import { hashPassword, comparePassword } from "../../utils/hash";

export const createUser = async (name: string, email: string, password: string, role: string) => {
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role as any,
    },
  });
  return user;
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};
