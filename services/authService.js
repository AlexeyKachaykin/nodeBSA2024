import { userService } from "./userService.js";

class AuthService {
  async login(email, password) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await userService.checkPassword(user, password);
    if (!isPasswordValid) {
      throw new Error("Invalid password or email");
    }
    return user;
  }
}

const authService = new AuthService();

export { authService };
