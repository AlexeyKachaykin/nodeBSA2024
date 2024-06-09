import { userRepository } from "../repositories/userRepository.js";

class UserService {
  async getAllUsers() {
    return await userRepository.getAll();
  }

  async getUserById(id) {
    return await userRepository.getOne({ id });
  }

  async getUserByEmail(email) {
    return await userRepository.getOne({ email });
  }

  async checkPassword(user, password) {
    return user.password === password; 
  }

  async createUser(userData) {
    return await userRepository.create(userData);
  }

  async updateUser(id, userData) {
    return await userRepository.update(id, userData);
  }

  async deleteUser(id) {
    return await userRepository.delete(id);
  }

  async isCredentialTaken(email, phoneNumber) {
    const emailTaken = await userRepository.getOne({ email });
    const phoneTaken = await userRepository.getOne({ phoneNumber });
    return emailTaken || phoneTaken;
  }
}

const userService = new UserService();

export { userService };
