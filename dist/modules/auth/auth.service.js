import prisma from "../../lib/prisma";
import { hashPassword, comparePassword } from "../../utils/hash";
import { signToken } from "../../utils/jwt";
export const registerUser = async (data) => {
    const hashed = await hashPassword(data.password);
    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashed,
        },
    });
    return user;
};
export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("User not found");
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = signToken({ id: user.id, role: user.role });
    return { token, user };
};
