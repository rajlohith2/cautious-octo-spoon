const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const schemaCleaner = require("../util/schemaCleaner");

const userSchema = new mongoose.Schema({
  userName: {
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
  favouritePlayer: {
    type: String,
    minlength: 3,
    maxlength: 20,
    // required: true,
    trim: true,
  },
  favouriteClub: {
    type: String,
    minlength: 3,
    maxlength: 20,
    // required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.plugin(uniqueValidator);

// replaces _id with id, convert id to string from ObjectID and deletes __v
schemaCleaner(userSchema);

module.exports = mongoose.model("User", userSchema);
