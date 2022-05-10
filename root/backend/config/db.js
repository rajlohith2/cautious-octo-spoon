const mongoose = require("mongoose");
const dotenv = require("dotenv");
// import constants from '../constants.js';
const connectDB = async () => {
  try {
    //database Name
    const databaseName = "demomern";
    //dotenv config
    dotenv.config();
    const con = await mongoose.connect(process.env.DATABASE_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // con.PlayerStats.renameCollection("Player");
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
