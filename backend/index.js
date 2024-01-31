import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/books.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS POLICY
//1. Allow all Origins with defalut of cors (*)
app.use(cors());
//2. Allow custom Origins
app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (rq, rs) => {
  console.log(rq);
  return rs.status(234).send("Welcome to MERN Stack.");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
