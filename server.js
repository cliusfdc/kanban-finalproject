// dotenv -> see .env file for environment variables
require('dotenv').config();

const express = require("express");

const PORT = process.env.PORT || 8000;
const app = express();
const conn = require("./salesforce/connection.js");

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("build/es6-unbundled"));

// get a reference to the socket once a client connects
const socket = io.on("connection", function(socket) {
  console.log("socket.io client connected");
});

// Platform Events
conn.authenticate(
  {
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  },
  function(err, oauth) {
    if (err) return console.log(err);

    const client = conn.createStreamClient();

    client.on("connect", function() {
      console.log("streaming client transport: up");
    });

    const taskAdded = client.subscribe({
      topic: "Task_Added__e",
      isEvent: true,
      replayId: -1
    });

    taskAdded.on("data", function(data) {
      console.log("server.js: Task_Added__e platform event received. Data:");
      console.log(data);
      socket.emit("task added", data);
    });

    const taskUpdated = client.subscribe({
      topic: "Task_Updated__e",
      isEvent: true,
      replayId: -1
    });

    taskUpdated.on("data", function(data) {
      console.log("server.js: Task_Updated__e platform event received. Data:");
      console.log(data);
      socket.emit("task updated", data);
    });
    // ** Added for task delete event (added a platform event)**
    const taskDeleted = client.subscribe({
      topic: "Task_Deleted__e",
      isEvent: true,
      replayId: -1
    });

    taskDeleted.on("data", function(data) {
      console.log("server.js: Task_Deleted__e platform event received. Data:");
      console.log(data);
      socket.emit("task deleted", data);
    });
  }
);

const routes = require("./routes.js");
routes(app);

server.listen(PORT, function() {
  console.log(`We are connected on PORT ${PORT}`);
});
