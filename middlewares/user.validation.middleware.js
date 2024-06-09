import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const createUserValid = async (req, res, next) => {
  const {  email, phoneNumber, password } = req.body;

  for (let key in USER) {
    if (key !== "id" && !req.body.hasOwnProperty(key)) {
      return res.status(400).json({ error: true, message: `Field ${key} is required` });
    }
  }

  const emailRegex = /^.*@gmail\.com$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: true, message: "Invalid email format" });
  }

  const phoneRegex = /^\+380\d{9}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ error: true, message: "Invalid phone number format" });
  }


  if (password.length < 3) {
    return res.status(400).json({ error: true, message: "Password must be at least 3 characters long" });
  }

   try {
    const credentialsTaken = await userService.isCredentialTaken(email, phoneNumber);
    if (credentialsTaken) {
      return res.status(400).json({ error: true, message: "Email or phone number is already taken" });
    }
  } catch (error) {
    console.error("Error checking credentials uniqueness:", error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  } 

  next();
};
const updateUserValid = async (req, res, next) => {
  const {  email, phoneNumber, password } = req.body;
  let hasUpdateField = false;

  for (let key in USER) {
    if (key !== "id" && req.body.hasOwnProperty(key)) {
      hasUpdateField = true;
      break;
    }
  }

  if (!hasUpdateField) {
    return res.status(400).json({ error: true, message: "No fields to update" });
  }

  if (email && !/^.*@gmail\.com$/.test(email)) {
    return res.status(400).json({ error: true, message: "Invalid email format" });
  }

  if (phoneNumber && !/^\+380\d{9}$/.test(phoneNumber)) {
    return res.status(400).json({ error: true, message: "Invalid phone number format" });
  }

  if (password && password.length < 3) {
    return res.status(400).json({ error: true, message: "Password must be at least 3 characters long" });
  }

  try {
    if (email || phoneNumber) {
      const credentialsTaken = await userService.isCredentialTaken(email, phoneNumber);
      if (credentialsTaken) {
        return res.status(400).json({ error: true, message: "Email or phone number is already taken" });
      }
    }
  } catch (error) {
    console.error("Error checking credentials uniqueness:", error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }

  next();
};

export { createUserValid, updateUserValid };
