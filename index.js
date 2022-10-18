import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Low, JSONFileSync } from "lowdb";

import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import booksRouter from "./routes/books.js";

const PORT = process.env.PORT || 4000;

const adapter = new JSONFileSync("db.json");
const db = new Low(adapter);

db.data = db.data || { books: [] };

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books Library",
      version: "1.0.0",
      description: "Simple Books Library",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
      {
        url: "https://google.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
