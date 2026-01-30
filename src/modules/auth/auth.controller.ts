
import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { registerUser, loginUser } from "./auth.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT" | "TUTOR" | "ADMIN";
}

interface LoginBody {
  email: string;
  password: string;
}

export const getMe = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ success: true, user: req.user });
};

export const register = asyncHandler(async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});


export const login = asyncHandler(async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const userWithToken = await loginUser(email, password);

  res.json({
    success: true,
    message: "Login successful",
    data: userWithToken,
  });
});
