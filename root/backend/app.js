const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use('/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/subreddits', subredditRoutes);
// app.use('/api/users', userRoutes);

// IMPLEMENT THESE
// app.use(middleware.unknownEndpointHandler);
// app.use(middleware.errorHandler);

module.exports = app;
