import express from "express";
import { getAll, getById, deleteById, create, updateById } from "../controllers/events.js";
import { eventSchemas } from "../models/event.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValid.js";

const eventsRouter = express.Router();

eventsRouter.get("/", getAll);
eventsRouter.get("/:id", isValidId, getById);
eventsRouter.delete("/:id", isValidId, deleteById);
eventsRouter.post("/", validateBody(eventSchemas.createEventSchema), create)
eventsRouter.put("/:id", isValidId, validateBody(eventSchemas.updateEventSchemaEventSchema), updateById)


export default eventsRouter;