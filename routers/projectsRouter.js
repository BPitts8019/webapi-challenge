const router = require("express").Router();
const projectsDb = require("../data/helpers/projectModel");
const { validateProject } = require("../middleware/validate");

/**
 * GET   /api/projects
 * Returns an array containing all of the projects in the database
 * @returns {Array} projects
 */
router.get("/", async (req, res, next) => {
   try {
      const projects = await projectsDb.get();
      res.json(projects);
   } catch (error) {
      next(error);
   }
});

/**
 * POST   /api/projects
 * Creates a new project and adds it to the database
 * @param {string} name
 * @param {string} description
 * @param {boolean} [completed]
 * @returns {Object} the new project
 */
router.post("/", validateProject, async (req, res, next) => {
   try {
      const newProject = await projectsDb.insert(req.project);
      res.status(201).json(newProject);
   } catch (error) {
      next(error);
   }
});

/**
 * GET   /api/projects/:id
 * Get an existing project
 * @returns {Object} the requested project
 */
router.get("/:id", async (req, res, next) => {
   try {
      const project = await projectsDb.get(req.params.id);

      if (!project) {
         return res.status(404).json({message: "No project found with that ID."});
      };

      res.json(project);
   } catch (error) {
      next(error);
   }
});

/**
 * PUT   /api/projects/:id
 * Update an existing  project
 * @param {string} name
 * @param {string} description
 * @param {boolean} [completed]
 * @returns {Object} the updated project
 */
router.put("/:id", validateProject, async (req, res, next) => {
   try {
      const project = await projectsDb.update(req.params.id, req.project);

      if (!project) {
         return res.status(404).json({message: "No project found with that ID."});
      };

      res.json(project);
   } catch (error) {
      next(error);
   }
});

/**
 * Delete   /api/projects/:id
 * Delete an existing  project
 * @param {string} name
 * @param {string} description
 * @param {boolean} [completed]
 * @returns {Object} the updated project
 */
router.delete("/:id", async (req, res, next) => {
   try {
      const numFiles = await projectsDb.remove(req.params.id);

      if (numFiles < 1) {
         return res.status(404).json({message: "No project found with that ID."});
      };

      res.json({message: "Project removed!"});
   } catch (error) {
      next(error);
   }
});

module.exports = router;
