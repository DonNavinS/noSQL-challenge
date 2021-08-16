const router = require("express").Router();

const {
  getAllThoughts,
  createThoughts,
  getThoughtsById,
  updateThoughts,
  deleteThoughts,
} = require("../../controllers/thoughts-controllers");

router.route("/").get(getAllThoughts);
router.route("/:userId").post(createThoughts);
router
  .route("/:id")
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;
