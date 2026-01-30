import { Request, Response } from "express";
import { createUser, findUserByEmail } from "./user.service";
import { signToken } from "../../utils/jwt";
import { comparePassword } from "../../utils/hash";
import { registerSchema, loginSchema } from "./user.validation";
import prisma  from "../../lib/prisma";
import { AuthRequest } from "../../middlewares/auth.middleware";


export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const existingUser = await findUserByEmail(parsed.email);
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await createUser(parsed.name, parsed.email, parsed.password, "STUDENT");
    const token = signToken({ id: user.id, role: user.role });

    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Registration failed" });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const user = await findUserByEmail(parsed.email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await comparePassword(parsed.password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: user.id, role: user.role });
    res.json({ user, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Login failed" });
  }
};


export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ user });
};

export const getStudentDashboard = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const studentId = req.user.id;


    const bookings = await prisma.booking.findMany({
      where: { studentId },
      include: {
        tutor: {
          select: {
            user: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({ success: true, data: { bookings } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true },
    });

    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email },
      select: { id: true, name: true, email: true, role: true },
    });

    res.json({ success: true, data: updatedUser });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};