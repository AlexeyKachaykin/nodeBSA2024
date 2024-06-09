import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  async getAllFighters() {
    return await fighterRepository.getAll();
  }

  async getFighterById(id) {
    return await fighterRepository.getOne({ id });
  }

  async createFighter(fighterData) {
    return await fighterRepository.create(fighterData);
  }

  async updateFighter(id, fighterData) {
    return await fighterRepository.update(id, fighterData);
  }

  async deleteFighter(id) {
    return await fighterRepository.delete(id);
  }

  async isFighterNameTaken(name) {
    const fighter = await fighterRepository.getOne({ name });
    return !!fighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
