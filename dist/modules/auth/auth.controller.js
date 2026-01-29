import { asyncHandler } from "../../utils/asyncHandler";
import { registerUser, loginUser } from "./auth.service";
import { successResponse } from "../../utils/apiResponse";
export const register = asyncHandler(async (req, res) => {
    const user = await registerUser(req.body);
    successResponse(res, user, "User registered");
});
export const login = asyncHandler(async (req, res) => {
    const result = await loginUser(req.body.email, req.body.password);
    successResponse(res, result, "Login successful");
});
