const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const playerRoutes = require("./routes/player");
const userRoutes = require("./routes/user");
const gameRoutes = require("./routes/game");
const teamRoutes = require("./routes/team");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/auth", authRoutes);
app.use("/player", playerRoutes);
app.use("/user", userRoutes);
app.use("/game", gameRoutes);
app.use("/team", teamRoutes);

// app.use('/api/posts', postRoutes);
// app.use('/api/subreddits', subredditRoutes);
// app.use('/api/users', userRoutes);

// IMPLEMENT THESE
// app.use(middleware.unknownEndpointHandler);
// app.use(middleware.errorHandler);

module.exports = app;
