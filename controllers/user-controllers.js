const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => console.log(err));
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.json({ message: "No user with that ID" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => console.log(err));
  },

  createUser({ body }, res) {
    User.create(body)
      .then((newUserData) => res.json(newUserData))
      .catch((err) => console.log(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true }).then(
      (updatedUserData) => {
        if (!updatedUserData) {
          res.json({ message: "No user with that ID" });
          return;
        }
        res.json(updatedUserData).catch((err) => console.log(err));
      }
    );
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id }).then((deletedUser) => {
      if (!deletedUser) {
        res.json({ message: "No user with that ID" });
        return;
      }
      res.json({ message: "User deleted" }).catch((err) => console.log(err));
    });
  },
};

module.exports = userController;
