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

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connect");
});

mongoose.connect("mongodb://127.0.0.1/worship-placing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", placesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
