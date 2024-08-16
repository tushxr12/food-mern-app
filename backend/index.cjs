const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./db.cjs");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
dotenv.config();

const port = process.env.PORT | 4000;
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./routes/createUser.cjs"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
