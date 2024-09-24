const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

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
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { fullName, email, dateOfBirth, eventId, howHeard } = req.body;
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
    res.status(500).send("Server error");
  }
});

app.get("/participants/:eventId", async (req, res) => {
  try {
    const participants = await Participant.find({
      eventId: req.params.eventId,
    });
    res.json(participants);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
