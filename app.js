const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://yuriikulchytsckyi:LjY9NOHhA6MOW6yb@event-folder.skyyi.mongodb.net/?retryWrites=true&w=majority&appName=event-folder";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Mongoose conected"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
