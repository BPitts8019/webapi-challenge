const router = require("express").Router();
const projectsDb = require("../data/helpers/projectModel");

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


router.post("/");


router.put("/");


router.delete("/");

module.exports = router;
