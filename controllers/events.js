import { Event } from "../models/event.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

export const getAll = ctrlWrapper(async (_, res) => {
  const result = await Event.find({}, "title description eventDate organizer");
  res.json(result);
});

export const getById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Event.findById(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
});

export const deleteById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Event.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json({ message: "Deleted successfully" });
});


export const create = ctrlWrapper(async (req, res) => {
  const result = await Event.create(req.body);
  res.status(201).json(result);
});

export const updateById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Event.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
});


export const addParticipantToEvent = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, dateOfBirth, source } = req.body; 

  try {
    const event = await Event.findByIdAndUpdate(
      id,
      {
        $push: {
          registeredParticipants: { fullName, email, dateOfBirth, source },
        },
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const removeParticipantFromEvent = async (req, res) => {
  const { eventId, participantId } = req.params;

  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $pull: {
          registeredParticipants: { _id: participantId },
        },
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getParticipantsByEventId = ctrlWrapper(async (req, res) => {
  const { id } = req.params; 

  const event = await Event.findById(id, "registeredParticipants");

  if (!event) {
    throw HttpError(404, "Event not found");
  }

  res.json(event.registeredParticipants); 
});