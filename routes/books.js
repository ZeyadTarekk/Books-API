import express from "express";
import { nanoid } from "nanoid";
const router = express.Router();

const IDLENGTH = 8;

router.get("/", (req, res) => {
  const books = req.app.db.data.books;
  console.log(books);
  res.json(books);
});

router.get("/:id", (req, res) => {
  const book = req.app.db.data.books.find((el) => el.id === req.params.id);
  res.send(book);
});

export default router;
