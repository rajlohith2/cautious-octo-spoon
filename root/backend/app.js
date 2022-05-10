const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// IMPLEMENT THESE
// app.use(middleware.unknownEndpointHandler);
// app.use(middleware.errorHandler);

module.exports = app;
