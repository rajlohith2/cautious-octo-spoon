const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const app = require("./app.js");
//connect database
connectDB();

//dotenv config
dotenv.config();

//Creating API for user
const PORT = process.env.PORT || 5000;

//Express js listen method to run project on http://localhost:5000
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
