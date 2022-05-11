const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const schemaCleaner = require("../util/schemaCleaner");

const playerSchema = new mongoose.Schema({
  sofifa_id: {
    type: String,
    required: true,
  },
  player_url: {
    type: String,
  },
  short_name: {
    type: String,
  },
  long_name: {
    type: String,
  },
  player_positions: {
    type: String,
  },
  overall: {
    type: Number,
  },
  potential: {
    type: Number,
  },
  value_eur: {
    type: Number,
  },
  age: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  height_cm: {
    type: Number,
  },
  weight_kg: {
    type: Number,
  },
  club_team_id: {
    type: Number,
  },
  club_name: {
    type: String,
  },
  league_name: {
    type: String,
  },
  league_level: {
    type: Number,
  },
  club_position: {
    type: Number,
  },
  club_jersey_number: {
    type: Number,
  },
  club_joined: {
    type: Date,
  },
  nationality_id: {
    type: Number,
  },
  nationality_name: {
    type: String,
  },
  nation_position: {
    type: String,
  },
  nation_jersey_number: {
    type: Number,
  },
  preferred_foot: {
    type: String,
  },
  weak_foot: {
    type: Number,
  },
  skill_moves: {
    type: Number,
  },
  international_reputation: {
    type: Number,
  },
  work_rate: {
    type: String,
  },
  body_type: {
    type: String,
  },
  player_tags: {
    type: String,
  },
  pace: {
    type: Number,
  },
  shooting: {
    type: Number,
  },
  passing: {
    type: Number,
  },
  dribbling: {
    type: Number,
  },
  defending: {
    type: Number,
  },
  physic: {
    type: Number,
  },
  attacking_crossing: {
    type: Number,
  },
  attacking_finishing: {
    type: Number,
  },
  attacking_heading_accuracy: {
    type: Number,
  },
  attacking_short_passing: {
    type: Number,
  },
  attacking_volleys: {
    type: Number,
  },
  skill_dribbling: {
    type: Number,
  },
  skill_curve: {
    type: Number,
  },
  skill_fk_accuracy: {
    type: Number,
  },
  skill_long_passing: {
    type: Number,
  },
  skill_ball_control: {
    type: Number,
  },
  movement_acceleration: {
    type: Number,
  },
  movement_sprint_speed: {
    type: Number,
  },
  movement_agility: {
    type: Number,
  },
  movement_reactions: {
    type: Number,
  },
  movement_balance: {
    type: Number,
  },
  power_shot_power: {
    type: Number,
  },
  power_jumping: {
    type: Number,
  },
  power_stamina: {
    type: Number,
  },
  power_strength: {
    type: Number,
  },
  power_long_shots: {
    type: Number,
  },
  mentality_aggression: {
    type: Number,
  },
  mentality_interceptions: {
    type: Number,
  },
  mentality_positioning: {
    type: Number,
  },
  mentality_vision: {
    type: Number,
  },
  mentality_penalties: {
    type: Number,
  },
  mentality_composure: {
    type: Number,
  },
  defending_marking_awareness: {
    type: Number,
  },
  defending_standing_tackle: {
    type: Number,
  },
  defending_sliding_tackle: {
    type: Number,
  },
  goalkeeping_diving: {
    type: Number,
  },
  goalkeeping_handling: {
    type: Number,
  },
  goalkeeping_kicking: {
    type: Number,
  },
  goalkeeping_positioning: {
    type: Number,
  },
  goalkeeping_reflexes: {
    type: Number,
  },
  player_face_url: {
    type: String,
  },
  club_logo_url: {
    type: String,
  },
  club_flag_url: {
    type: String,
  },
  nation_logo_url: {
    type: String,
  },
  nation_flag_url: {
    type: String,
  },
});

playerSchema.plugin(uniqueValidator);

// replaces _id with id, convert id to string from ObjectID and deletes __v
schemaCleaner(playerSchema);

module.exports = mongoose.model("Player", playerSchema);
