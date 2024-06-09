
import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    if (user) {
      res.data = { message: "User logged in successfully." };
    } else {
      res.err = { statusCode: 404, message: "User not found." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

export { router };

