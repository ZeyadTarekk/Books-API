import express from "express";
import { nanoid } from "nanoid";
const router = express.Router();

const IDLENGTH = 8;

router.get("/", async (req, res) => {
  await req.app.db.read();
  const books = req.app.db.data.books;
  console.log(books);
  res.json(books);
});

router.get("/:id", async (req, res) => {
  await req.app.db.read();
  const book = req.app.db.data.books.find((el) => el.id === req.params.id);
  res.send(book);
});

router.post("/", async (req, res) => {
  try {
    const book = {
      id: nanoid(IDLENGTH),
      ...req.body,
    };
    req.app.db.data.books.push(book);
    await req.app.db.write();
    res.json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await req.app.db.read();
    req.app.db.data.books = req.app.db.data.books.filter(
      (el) => el.id !== req.params.id
    );

    await req.app.db.write();
    res.json(req.app.db.data.books);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export default router;
