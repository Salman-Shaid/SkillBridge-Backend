import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";


export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT" | "TUTOR" | "ADMIN";
}) => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: (data.role || "STUDENT").toUpperCase() as "STUDENT" | "TUTOR" | "ADMIN",
    },
  });

  return user;
};


export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};
