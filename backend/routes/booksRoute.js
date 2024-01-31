import express from "express";
import { Book } from "../models/books.js";

const router = express.Router();

//create new book
router.post("/", async (rq, rs) => {
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
router.get("/", async (rq, rs) => {
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
router.get("/:id", async (rq, rs) => {
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
router.put("/:id", async (rq, rs) => {
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

//delete a book by id
router.delete("/:id", async (rq, rs) => {
  try {
    const { id } = rq.params;

    const result = await Book.findByIdAndDelete(id, rq.body);

    if (!result) {
      return rs.status(404).json({ message: "Book not found" });
    }

    return rs.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    rs.status(500).send({ message: error.message });
  }
});


export default router;