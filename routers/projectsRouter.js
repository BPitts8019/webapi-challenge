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
 * @returns {Object} the new project
 */
router.post("/", validateProject, async (req, res, next) => {
   res.json(req.project);
});


router.put("/");


router.delete("/");

module.exports = router;
