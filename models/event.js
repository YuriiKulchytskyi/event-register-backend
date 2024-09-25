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
    registeredParticipants: {
      type: [
        {
          fullName: {
            type: String,
            required: [true, "Participant name is required"],
          },
          email: {
            type: String,
            required: [true, "Participant email is required"],
          },
          dateOfBirth: {
            type: Date,
            required: [true, "Participant date of birth is required"],
          },
          source: {
            type: String,
            required: [true, "Participant source is required"],
          },
        },
      ],
      default: [],
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
  registeredParticipants: Joi.array()
    .items(
      Joi.object({
        fullName: Joi.string().required().messages({
          "string.base": `"fullName" should be a type of 'text'`,
          "any.required": `"fullName" is a required field`,
        }),
        email: Joi.string().email().required().messages({
          "string.email": `"email" must be a valid email`,
          "any.required": `"email" is a required field`,
        }),
        dateOfBirth: Joi.date().required().messages({
          "any.required": `"dateOfBirth" is a required field`,
        }),
        source: Joi.string().optional(),
      })
    )
    .optional()
    .default([]),
});

const updateEventSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  eventDate: Joi.date(),
  organizer: Joi.string(),
  registeredParticipants: Joi.array().items(
    Joi.object({
      fullName: Joi.string(),
      email: Joi.string().email(),
      dateOfBirth: Joi.date(),
      source: Joi.string(),
    })
  ),
});

const participantSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.date().required(),
  source: Joi.string().optional(),
});

export const Event = model("event", eventSchema);
export const eventSchemas = {
  createEventSchema,
  updateEventSchema,
  participantSchema
};
