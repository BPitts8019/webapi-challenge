const express = require("express");
const helmet = require("helmet");
const projectsRouter = require("./routers/projectsRouter");

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

server.use("/api/projects", projectsRouter);

//404 Page not found
server.use((req, res) => {
   res.status(404).json({
      message: "Page Not Found!"
   });
});

//Global 500 Error
server.use((error, req, res, next) => {
   console.log(error.toString());
   res.status(500).json({
      data: error.toString()
   });
});

module.exports = server;
