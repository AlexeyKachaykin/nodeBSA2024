import { fightRepository } from "../repositories/fightRepository.js";

class FightService {
  async getAllFights() {
    return await fightRepository.getAll();
  }

  async search(search) {
    const fight = await fightRepository.getOne(search);
    if (!fight) {
      return null;
    }
    return fight;
  }

  async createFight(fightData) {
    return await fightRepository.create(fightData);
  }

  async updateFight(id, fightData) {
    const updatedFight = await fightRepository.update(id, fightData);
    if (!updatedFight) {
      return null;
    }
    return updatedFight;
  }

  async deleteFight(id) {
    const deletedFight = await fightRepository.delete(id);
    if (!deletedFight) {
      return null;
    }
    return deletedFight;
  }
}

const fightsService = new FightService();

export { fightsService };
