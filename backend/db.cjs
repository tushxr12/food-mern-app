const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const URI = process.env.MongoDBURI;

//connect to MongoDB
const connectDB = () => {
  mongoose.connect(URI);
  console.log("Database connected successfully");
};

module.exports = connectDB;
