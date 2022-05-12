const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const schemaCleaner = require("../util/schemaCleaner");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  avatar: {
    exists: {
      type: Boolean,
      default: "false",
    },
    imageLink: {
      type: String,
      trim: true,
      default: "null",
    },
  },
  gameName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  teamOwner: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  remainingBudget: {
    type: Number,
    required: true,
  },
  players: [
    {
      playerID: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        trim: true,
      },
      soldAmount: {
        type: Number,
      },
    },
  ],
});

teamSchema.plugin(uniqueValidator);

// replaces _id with id, convert id to string from ObjectID and deletes __v
schemaCleaner(teamSchema);

module.exports = mongoose.model("Team", teamSchema);
