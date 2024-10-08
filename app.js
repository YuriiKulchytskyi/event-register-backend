import express from "express";
import morgan from "morgan";
import cors from "cors";
import eventsRouter from "./routes/eventsRouter.js";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRouter);

app.use((_, res) => {
    res.status(404), json({ message: "Route not found" })
});

app.use((err, _, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({message})
})