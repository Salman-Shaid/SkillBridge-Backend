import { Router } from "express";
import { register, login } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { registerSchema } from "./auth.validation";
const router = Router();
router.post("/register", validate(registerSchema), register);
router.post("/login", login);
export default router;
