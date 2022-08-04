import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import placesRouter from "./src/places/places.router";

dotenv.config();
if (!process.env.REACT_APP_BASE_PORT) {
  throw new Error("'REACT_APP_BASE_PORT' env not found!");
}

const app = express();
const port = process.env.REACT_APP_BASE_PORT;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", placesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
