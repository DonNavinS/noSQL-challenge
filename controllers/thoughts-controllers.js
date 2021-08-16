const { Thoughts } = require("../models");

const thoughtsController = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((thoughtsData) => res.json(thoughtsData))
      .catch((err) => console.log(err));
  },
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .then((thoughtsData) => {
        if (!thoughtsData) {
          res.json({ message: "No thoughts with that ID" });
          return;
        }
        res.json(thoughtsData);
      })
      .catch((err) => console.log(err));
  },

  createThoughts({ body }, res) {
    Thoughts.create(body)
      .then((newthoughtsData) => res.json(newthoughtsData))
      .catch((err) => console.log(err));
  },
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
    Thoughts.findOneAndDelete({ _id: params.id }).then((deletedThoughts) => {
      if (!deletedThoughts) {
        res.json({ message: "No thoughts with that ID" });
        return;
      }
      res
        .json({ message: "thoughts deleted" })
        .catch((err) => console.log(err));
    });
  },
};

module.exports = thoughtsController;
