const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => console.log(err));
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
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
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true })
      .then((updatedUserData) => {
        if (!updatedUserData) {
          res.json({ message: "No user with that ID" });
          return;
        }
        res.json(updatedUserData);
      })
      .catch((err) => console.log(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId }).then((deletedUser) => {
      if (!deletedUser) {
        res.json({ message: "No user with that ID" });
        return;
      }
      res.json({ message: "User deleted" }).catch((err) => console.log(err));
    });
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendsId } },
      { new: true }
    )
      .then((updatedFriendData) => {
        if (!updatedFriendData) {
          res.json({ message: "No user with that ID" });
          return;
        }
        res.json(updatedFriendData);
      })
      .catch((err) => console.log(err));
  },
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((removedFriend) => {
        if (!removedFriend) {
          res.json({ message: "No Friend with that ID" });
          return;
        }
        res.json({ message: "Friend Removed" });
      })
      .catch((err) => console.log(err));
  },
};

module.exports = userController;
