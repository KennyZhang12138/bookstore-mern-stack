import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/books.js";

const app = express();

app.use(express.json());

app.get("/", (rq, rs) => {
  console.log(rq);
  return rs.status(234).send("Welcome to MERN Stack.");
});

//create new book
app.post("/books", async (rq, rs) => {
  try {
    if (!rq.body.title || !rq.body.author || !rq.body.publishYear) {
      return rs.status(400).send({
        message: "Send all required field: title, author, publishYear",
      });
    }
    const newBook = {
      title: rq.body.title,
      author: rq.body.author,
      publishYear: rq.body.publishYear,
    };

    const book = await Book.create(newBook);
    return rs.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    rs.status(500).send({ message: error.message });
  }
});

//get all books
app.get("/books", async (rq, rs) => {
  try {
    const books = await Book.find({});
    return rs.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    rs.status(500).send({ message: error.message });
  }
});

//get one book by id
app.get("/books/:id", async (rq, rs) => {
  try {
    const { id } = rq.params;

    const book = await Book.findById(id);

    return rs.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    rs.status(500).send({ message: error.message });
  }
});

//update a book by id
app.put("/books/:id", async (rq, rs) => {
  try {
    if (!rq.body.title || !rq.body.author || !rq.body.publishYear) {
      return rs.status(400).send({
        message: "Send all required field: title, author, publishYear",
      });
    }
    const { id } = rq.params;

    const result = await Book.findByIdAndUpdate(id, rq.body);

    if (!result) {
      return rs.status(404).json({ message: "Book not found" });
    }

    return rs.status(200).send({ message: "Book updated successfully" });

  } catch (error) {
    console.log(error.message);
    rs.status(500).send({ message: error.message });
  }
});

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
