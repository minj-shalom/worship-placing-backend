import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import placesRouter from "./src/places/places.router";

dotenv.config();
if (!process.env.REACT_APP_BASE_PORT) {
  throw new Error("'REACT_APP_BASE_PORT' env not found!");
}
if (!process.env.REACT_APP_DB_ID) {
  throw new Error("'REACT_APP_DB_ID' env not found!");
}
if (!process.env.REACT_APP_DB_PW) {
  throw new Error("'REACT_APP_DB_PW' env not found!");
}
if (!process.env.REACT_APP_DB_ENDPOINT) {
  throw new Error("'REACT_APP_DB_ENDPOINT' env not found!");
}

const app = express();
const port = process.env.REACT_APP_BASE_PORT;
const dbID = process.env.REACT_APP_DB_ID;
const dbPW = process.env.REACT_APP_DB_PW;
const dbEndpoint = process.env.REACT_APP_DB_ENDPOINT;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connect");
});

mongoose.connect(
  `mongodb://${dbID}:${dbPW}@${dbEndpoint}/local?authSource=admin&authMechanism=SCRAM-SHA-1`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
