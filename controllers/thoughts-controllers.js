const { User, Thoughts } = require("../models");

const thoughtsController = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((thoughtsData) => res.json(thoughtsData))
      .catch((err) => console.log(err));
  },
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.thoughtsId })
      .then((thoughtsData) => {
        if (!thoughtsData) {
          res.json({ message: "No thoughts with that ID" });
          return;
        }
        res.json(thoughtsData);
      })
      .catch((err) => console.log(err));
  },

  createThoughts({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((newThoughtsData) => res.json(newThoughtsData))
      .catch((err) => console.log(err));
  },
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.thoughtsId }, body, { new: true })
      .then((updatedThoughtsData) => {
        if (!updatedThoughtsData) {
          res.json({ message: "No thoughts with that ID" });
          return;
        }
        res.json(updatedThoughtsData).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtsId })
      .then(({}) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtsId } },
          { new: true }
        );
      })
      .then((deletedThoughts) => {
        if (!deletedThoughts) {
          res.json({ message: "No thoughts with that ID" });
          return;
        }
        res
          .json({ message: "Thought deleted" })
          .catch((err) => console.log(err));
      });
  },
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((newReaction) => res.json(newReaction))
      .catch((err) => res.json(err));
  },
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reactions: params.reactionsId } },
      { new: true }
    )
      .then((removedReaction) => {
        if (!removedReaction) {
          res.json({ message: "No reaction with that ID" });
          return;
        }
        res.json({ message: "Reaction removed" });
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;
