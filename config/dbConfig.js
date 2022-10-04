const mongoose = require("mongoose");
//const ENV = require("dotenv");
//ENV.config({ path: "./.env" });

require("../models/User");

const dbName = "booking-uni";

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qfalkak.mongodb.net/${dbName}`;

module.exports = async (app) => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection established");
    mongoose.connection.on("error", (err) => {
      console.log("Database connection error");
      console.log(err);
    });
  } catch (err) {
    console.error("Error connecting to database");
    process.exit(1);
  }
};
