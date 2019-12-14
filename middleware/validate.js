const validateProject = (req, res, next) => {
   if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json("Please provide a name and description for the project.");
   }

   if (!req.body.name) {
      return res.status(400).json({message: "There must be a name for the project."});
   }

   if (!req.body.description) {
      return res.status(400).json({message: "There must be a description for the project."});
   }

   if (typeof req.completed !== "undefined" && typeof req.completed !== "boolean") {
      return res.status(400).json({message: "The \'completed\' property must be boolean"});
   }

   req.project = {
      name: req.body.name,
      description: req.body.description,
      completed: req.completed
   }
   next();
}

module.exports = {
   validateProject
}