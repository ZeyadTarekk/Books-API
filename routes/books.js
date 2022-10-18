import express from "express";
import { nanoid } from "nanoid";
const router = express.Router();

const IDLENGTH = 8;

/**
 * @swagger
 *  components:
 *   schemas:
 *    Book:
 *     type: object
 *     required:
 *      - title
 *      - author
 *     properties:
 *      id:
 *       type: string
 *       description: the unique id of the book
 *      title:
 *       type: string
 *       description: the title of the book
 *      author:
 *       type: string
 *       description: the author of the book
 *     example:
 *      id: d5e-azd
 *      title: Cool Book
 *      author: Zeyad Tarek
 *
 */


/**
 * @swagger
 * tags:
 *  name: Books
 *  description: The Books management API
 */

/**
 * @swagger
 * /books:
 *  get:
 *   summary: Returns the list of all books
 *   tags: [Books]
 *   responses:
 *    200:
 *     description: The list of the books
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Book'
 *
 */

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
