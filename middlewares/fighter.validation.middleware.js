import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

const createFighterValid = async (req, res, next) => {
  const { name, power, defense, health } = req.body;
  
  for (let key in FIGHTER) {
    if (key !== "id" && key !== "health" && !req.body.hasOwnProperty(key)) {
      return res.status(400).json({ error: true, message: `Field ${key} is required` });
    }
  }

 
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: true, message: "Invalid name" });
  }

  if (!Number.isFinite(power) || power < 1 || power > 100) {
    return res.status(400).json({ error: true, message: "Invalid power value" });
  }

  if (!Number.isFinite(defense) || defense < 1 || defense > 10) {
    return res.status(400).json({ error: true, message: "Invalid defense value" });
  }

  if (health !== undefined && (!Number.isFinite(health) || health < 80 || health > 120)) {
    return res.status(400).json({ error: true, message: "Invalid health value" });
  }


  if (health === undefined) {
    req.body.health = 85;
  }


  if (await fighterService.isFighterNameTaken(name)) {
    return res.status(400).json({ error: true, message: "Fighter name is already taken" });
  }

  next();
};

const updateFighterValid = async (req, res, next) => {
  const { name, power, defense, health } = req.body;
  let hasUpdateField = false;


  for (let key in FIGHTER) {
    if (key !== "id" && req.body.hasOwnProperty(key)) {
      hasUpdateField = true;
      break;
    }
  }

  if (!hasUpdateField) {
    return res.status(400).json({ error: true, message: "No fields to update" });
  }

  if (name && (typeof name !== 'string' || name.trim() === '')) {
    return res.status(400).json({ error: true, message: "Invalid name" });
  }

  if (power !== undefined && (!Number.isFinite(power) || power < 1 || power > 100)) {
    return res.status(400).json({ error: true, message: "Invalid power value" });
  }

  if (defense !== undefined && (!Number.isFinite(defense) || defense < 1 || defense > 10)) {
    return res.status(400).json({ error: true, message: "Invalid defense value" });
  }

  if (health !== undefined && (!Number.isFinite(health) || health < 80 || health > 120)) {
    return res.status(400).json({ error: true, message: "Invalid health value" });
  }

  
  if (name && await fighterService.isFighterNameTaken(name)) {
    return res.status(400).json({ error: true, message: "Fighter name is already taken" });
  }
  
  next();
};

export { createFighterValid, updateFighterValid };
