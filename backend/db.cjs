const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const URI = process.env.MongoDBURI;

//connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database (food-mern-app) connected successfully");

    const fetched_data = await mongoose.connection.db.collection("food-items");
    const data = await fetched_data.find({}).toArray();
    // console.log(data);
    global.food_items = data;
    // console.log(global.food_items);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
