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
 * @param {number} project_id
 * @param {string} description
 * @param {string} notes
 * @param {boolean} [completed]
 * @returns {Object} the new action stored in req.action
 */
const validateAction = (req, res, next) => {
   if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json("Please provide a project ID, name, description, and any notes for the action.");
   }

   if (!req.body.project_id) {
      return res.status(400).json({message: "There must be a project id for the action."});
   }

   if (!req.body.description) {
      return res.status(400).json({message: "There must be a description for the action."});
   } else if (req.body.description.length > 128) {
      return res.status(400).json({message: "The description may not be more than 128 characters."});
   }

   if (!req.body.notes) {
      return res.status(400).json({message: "Please provide the notes for the action."});
   }

   if (typeof req.body.completed !== "undefined" && typeof req.body.completed !== "boolean") {
      return res.status(400).json({message: "The \'completed\' property must be boolean"});
   }

   req.action = {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed
   }
   next();
};

module.exports = {
   validateProject,
   validateAction
}