const router = require("express").Router();
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


module.exports = router;
