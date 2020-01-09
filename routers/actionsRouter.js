const router = require("express").Router();
const projectsDb = require("../data/helpers/projectModel");
const actionsDb = require("../data/helpers/actionModel");
const { validateAction } = require("../middleware/validate");

/**
 * GET   /api/actions
 * Returns an array containing all of the actions in the database
 * database
 * @returns {Array} all actions in database
 */
router.get("/", async (req, res, next) => {
   try {
      const actions = await actionsDb.get();
      res.json(actions);
   } catch (error) {
      next(error);
   }
});

/**
 * POST   /api/actions
 * Creates a new project and adds it to the database
 * @param {number} project_id
 * @param {string} description
 * @param {string} notes
 * @param {boolean} [completed]
 * @returns {Object} the new action
 */
router.post("/", validateAction, async (req, res, next) => {
   try {
      const project = await projectsDb.get(Number(req.action.project_id));
      if (!project) {
         return res.status(404).json({message: "Could not find a project with the specified ID."});
      }

      const newAction = await actionsDb.insert(req.action);
      res.status(201).json(newAction);
   } catch (error) {
      next(error);
   }
});

/**
 * GET   /api/actions/:id
 * Get an existing action
 * @param {number} id
 * @returns {Object} the requested project
 */
router.get("/:id", async (req, res, next) => {
   try {
      const action = await actionsDb.get(req.params.id);

      if (!action) {
         return res.status(404).json({message: "No action found with that ID."});
      };

      res.json(action);
   } catch (error) {
      next(error);
   }
});

/**
 * PUT   /api/actions/:id
 * Update an existing action
 * @param {number} id
 * @param {number} project_id
 * @param {string} description
 * @param {string} notes
 * @param {boolean} [completed]
 * @returns {Object} the updated action
 */
router.put("/:id", validateAction, async (req, res, next) => {
   try {
      const action = await actionsDb.update(req.params.id, req.action);

      if (!action) {
         return res.status(404).json({message: "No action found with that ID."});
      };

      res.json(action);
   } catch (error) {
      next(error);
   }
});

/**
 * Delete   /api/actions/:id
 * Delete an existing action
 * @param {number} id
 * @returns {Object} success message
 */
router.delete("/:id", async (req, res, next) => {
   try {
      const numFiles = await actionsDb.remove(Number(req.params.id));

      if (numFiles < 1) {
         return res.status(404).json({message: "No action found with that ID."});
      };

      res.json({message: "Action removed!"});
   } catch (error) {
      next(error);
   }
});

module.exports = router;
