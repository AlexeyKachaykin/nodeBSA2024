import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { removeIdFromBody } from "../middlewares/removeIdFromBody.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const fighters = await fighterService.getAllFighters();
    if (fighters) {
      res.data = fighters;
    } else {
      res.err = { statusCode: 404, message: "Fighters not found." };
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
    const fighter = await fighterService.getFighterById(id);
    if (fighter) {
      res.data = fighter;
    } else {
      res.err = { statusCode: 404, message: "Fighter not found." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", removeIdFromBody, createFighterValid, async (req, res, next) => {
  try {
    const fighterData = req.body;
    const newFighter = await fighterService.createFighter(fighterData);
    if (newFighter) {
      res.data = newFighter;
    } else {
      res.err = { statusCode: 500, message: "Failed to create new fighter." };
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
    const fighterData = req.body;
    const updatedFighter = await fighterService.updateFighter(id, fighterData);
    if (updatedFighter) {
      res.data = updatedFighter;
    } else {
      res.err = { statusCode: 404, message: "Fighter not found or could not be updated." };
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
    const result = await fighterService.deleteFighter(id);
    if (result) {
      res.data = { message: "Fighter deleted successfully." };
    } else {
      res.err = { statusCode: 404, message: "Fighter not found or could not be deleted." };
    }
  } catch (err) {
    res.err = { statusCode: 500, message: err.message };
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
