import express from "express";
import cors from "cors";
import morgan from "morgan";
import { LowSync, JSONFileSync } from "lowdb";

const PORT = process.env.PORT || 4000;

const adapter = new JSONFileSync("db.json");
const db = new LowSync(adapter);

db.data ||= { books: [] };

const app = express();

app.db = db;

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
