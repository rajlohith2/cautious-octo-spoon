const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const schemaCleaner = require("../util/schemaCleaner");

const gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  gamePassword: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  gameStatus: {
    type: String,
    required: true,
    trim: true,
  },
  teamsPlaying: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  playerSoldSoFar: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  gameRules: {
    maxTeams: {
      type: Number,
      required: true,
    },
    maxPlayersPerTeam: {
      type: Number,
      required: true,
    },
    minForwards: {
      type: Number,
      required: true,
    },
    minMidfielders: {
      type: Number,
      required: true,
    },
    minDefenders: {
      type: Number,
      required: true,
    },
    minGoalKeepers: {
      type: Number,
      required: true,
    },
    minBidIncrement: {
      type: Number,
      required: true,
    },
    gameBudget: {
      type: Number,
      required: true,
    },
  },
});

gameSchema.plugin(uniqueValidator);

// replaces _id with id, convert id to string from ObjectID and deletes __v
schemaCleaner(gameSchema);

module.exports = mongoose.model("Team", gameSchema);
