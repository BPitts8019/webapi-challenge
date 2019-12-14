const express = require("express");
const helmet = require("helmet");

//create server
const server = express();

//apply middleware
server.use(helmet());
server.use(express.json());

//define routes
server.get("/", (req, res) => {
   res.json({
      message: "Congratulations! You have a basic server. 🤓"
   });
});

//404 Page not found
server.use((req, res) => {
   res.status(404).json({
      message: "Page Not Found!"
   });
});

module.exports = server;
