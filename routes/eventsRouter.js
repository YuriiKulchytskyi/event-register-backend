import express from "express";
import {
  getAll,
  getById,
  deleteById,
  create,
  updateById,
  addParticipantToEvent,
  removeParticipantFromEvent,
  getParticipantsByEventId,
} from "../controllers/events.js";
import { eventSchemas } from "../models/event.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValid.js";

const eventsRouter = express.Router();

eventsRouter.get("/", getAll);
eventsRouter.get("/:id", isValidId, getById);
eventsRouter.get("/:id/participants", getParticipantsByEventId);
eventsRouter.delete("/:id", isValidId, deleteById);
eventsRouter.post("/", validateBody(eventSchemas.createEventSchema), create);
eventsRouter.put(
  "/:id",
  isValidId,
  validateBody(eventSchemas.updateEventSchema),
  updateById
);
eventsRouter.patch(
  "/:id/participants",
  isValidId,
  validateBody(eventSchemas.participantSchema),
  addParticipantToEvent
);
eventsRouter.delete("/:id/participants/:participantId", removeParticipantFromEvent)

export default eventsRouter;
