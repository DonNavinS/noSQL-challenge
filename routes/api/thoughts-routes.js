const router = require("express").Router();

const {
  getAllThoughts,
  createThoughts,
  getThoughtsById,
  updateThoughts,
  deleteThoughts,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughts-controllers");

router.route("/").get(getAllThoughts);
router.route("/:userId").post(createThoughts);
router.route("/:thoughtsId").get(getThoughtsById).put(updateThoughts);

router.route("/:thoughtsId/:userId").delete(deleteThoughts);

router.route("/:thoughtsId/reactions").post(addReaction);
router.route("/:thoughtsId/:reactionsId").put(removeReaction);

module.exports = router;
