const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./db.cjs");
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
