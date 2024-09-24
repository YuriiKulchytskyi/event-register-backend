const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Додайте фронтенд домен сюди
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected  "))
  .catch((err) => {
    console.error(err);
    process.exit(1); // Зупиняє сервер при помилці підключення
  });

// Event Model
const EventSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  eventDate: Date,
  organizer: String,
});

const Event = mongoose.model("Event", EventSchema);

// Participant Model
const ParticipantSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  dateOfBirth: Date,
  eventId: mongoose.Schema.Types.ObjectId,
  howHeard: String,
});

const Participant = mongoose.model("Participant", ParticipantSchema);

// Routes

// Get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while fetching events");
  }
});

// Register participant for an event
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, dateOfBirth, eventId, howHeard } = req.body;

    // Validation check for required fields
    if (!fullName || !email || !dateOfBirth || !eventId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const participant = new Participant({
      fullName,
      email,
      dateOfBirth,
      eventId,
      howHeard,
    });

    await participant.save();
    res.json(participant);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while registering participant");
  }
});

// Get participants for a specific event
app.get("/participants/:eventId", async (req, res) => {
  try {
    const participants = await Participant.find({
      eventId: req.params.eventId,
    });

    if (participants.length === 0) {
      return res
        .status(404)
        .json({ message: "No participants found for this event" });
    }

    res.json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while fetching participants");
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
