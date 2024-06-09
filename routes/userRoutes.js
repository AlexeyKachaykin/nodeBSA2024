
import { Router } from "express";
import { userService } from "../services/userService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createUserValid, updateUserValid } from "../middlewares/user.validation.middleware.js";
import { removeIdFromBody } from "../middlewares/removeIdFromBody.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    if (users) {
      res.data = users;
    } else {
      res.err = { statusCode: 404, message: "Users not found." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (user) {
      res.data = user;
    } else {
      res.err = { statusCode: 404, message: "User not found." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", removeIdFromBody,createUserValid,  async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    if (newUser) {
      res.data = newUser;
    } else {
      res.err = { statusCode: 500, message: "Failed to create new user." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.patch("/:id",removeIdFromBody, updateUserValid,  async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await userService.updateUser(id, userData);
    if (updatedUser) {
      res.data = updatedUser;
    } else {
      res.err = { statusCode: 404, message: "User not found or could not be updated." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    if (result) {
      res.data = { message: "User deleted successfully." };
    } else {
      res.err = { statusCode: 404, message: "User not found or could not be deleted." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
