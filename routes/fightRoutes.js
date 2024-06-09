import { Router } from "express";
import { fightsService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createFighterValid, updateFighterValid } from "../middlewares/fighter.validation.middleware.js";
import { removeIdFromBody } from "../middlewares/removeIdFromBody.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const fights = await fightsService.getAllFights();
    if (fights) {
      res.data = fights;
    } else {
      res.err = { statusCode: 404, message: "Fights not found." };
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
    const fight = await fightsService.search(id);
    if (fight) {
      res.data = fight;
    } else {
      res.err = { statusCode: 404, message: "Fight not found." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", removeIdFromBody, createFighterValid, async (req, res, next) => {
  try {
    const fightData = req.body;
    const newFight = await fightsService.createFight(fightData);
    if (newFight) {
      res.data = newFight;
    } else {
      res.err = { statusCode: 500, message: "Fight not created." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.patch("/:id", removeIdFromBody, updateFighterValid, async (req, res, next) => {
  try {
    const { id } = req.params;
    const fightData = req.body;
    const updatedFight = await fightsService.updateFight(id, fightData);
    if (updatedFight) {
      res.data = updatedFight;
    } else {
      res.err = { statusCode: 404, message: "Fight not found or could not be updated." };
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
    const result = await fightsService.deleteFight(id);
    if (result) {
      res.data = { message: "Fight deleted successfully." };
    } else {
      res.err = { statusCode: 404, message: "Fight not found or could not be deleted." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
