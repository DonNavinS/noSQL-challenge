const { Schema, model, Mongoose } = require("mongoose");

const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      length: 1 - 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reactions: [
      {
        reactionId: {
          type: Schema.Types.ObjectId,
          // default: new Mongoose.Types.ObjectId(),
        },
        reactionBody: {
          type: String,
          require: true,
          length: 1 - 280,
        },
        username: {
          type: String,
          require: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    toJSON: {
      virtual: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtsSchema.virtual("reactionCount", function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;
