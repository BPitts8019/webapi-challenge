/**
 * validateProject
 * validates the req body for Projects API requests
 * @param {string} name
 * @param {string} description
 * @param {boolean} [completed]
 * @returns {Object} the new project stored in req.project
 */
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

   if (typeof req.body.completed !== "undefined" && typeof req.body.completed !== "boolean") {
      return res.status(400).json({message: "The \'completed\' property must be boolean"});
   }

   req.project = {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed
   }
   next();
}


/**
 * validateAction
 * validates the req body for Actions API requests
 * @param {string} name
 * @param {string} description
 * @param {boolean} [completed]
 * @returns {Object} the new project stored in req.project
 */
const validateAction = (req, res, next) => {
   next();
};

module.exports = {
   validateProject,
   validateAction
}