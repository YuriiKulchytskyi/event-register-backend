import mongoose from "mongoose";
import { app } from "./app.js";


const { DB_HOST, PORT = 5000 } = process.env;


mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST).then(() => {
    app.listen(PORT, () => {
        if (typeof DB_HOST !== "string") {
          console.error("DB_HOST must be a string");
          process.exit(1);
        }
        console.log("Database connected successful")
        console.log(DB_HOST);
        
        
    })
}).catch((error) => {
    console.log(error.message);
    process.exit(1)
})

