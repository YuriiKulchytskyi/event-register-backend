import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../middlewares/handleMongooseError.js";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

eventSchema.post("save", handleMongooseError);

const createEventSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "Missing required title field" }),
  description: Joi.string()
    .required()
    .messages({ "any.required": "Missing required description field" }),
  eventDate: Joi.date()
    .required()
    .messages({ "any.required": "Missing required event date field" }),
  organizer: Joi.string()
    .required()
    .messages({ "any.required": "Missing required organizer field" }),
});

const updateEventSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  eventDate: Joi.date(),
  organizer: Joi.string(),
});

export const Event = model("event", eventSchema);
export const eventSchemas = {
  createEventSchema,
  updateEventSchema,
};
