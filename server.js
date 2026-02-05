const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const { Server} = require ("socket.io")

dotenv.config({ path: "./.env" });
const app = require("./app");



// Connect database
mongoose
  .connect(process.env.MONGO_URI,
    {
      serverSelectionTimeoutMS:6000,
      connectTimeoutMS: 60000,
      family: 4
    })
  .then(() => {
    console.log("Database connected...");
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

  .catch((error) => console.log(error));

// Serve client folder
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

//   Listen to port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Listening...");
});
