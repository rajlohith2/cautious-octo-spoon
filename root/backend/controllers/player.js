const Player = require("../models/player");

const getPlayers = async (req, res) => {
  const page = Number(req.query.page || "1");
  const limit = Number(req.query.limit || "20");
  const playername = req.query.name || "";
  const sortBy = req.query.sortby || "rating";
  const order = req.query.order || "desc";
  const clubname = req.query.club || "";
  const country = req.query.country || "";
  const position = req.query.position || "";

  let sortQuery;
  switch (sortBy) {
    case "rating":
      sortQuery = { overall: order == "asc" ? 1 : -1 };
      break;
    case "name":
      sortQuery = { short_name: order == "asc" ? 1 : -1 };
      break;
    case "age":
      sortQuery = { age: order == "asc" ? 1 : -1 };
      break;
    default:
      sortQuery = {};
  }

  const players = await Player.find({
    short_name: { $regex: playername, $options: "i" },
    club_name: { $regex: clubname, $options: "i" },
    nationality_name: { $regex: country, $options: "i" },
    player_positions: { $regex: position, $options: "i" },
  })
    .sort(sortQuery)
    .limit(limit)
    .skip((page - 1) * limit);
  const docCount = players.length;
  res.status(200).json({ playerDetails: players, count: docCount });
};

const getPlayerById = async (req, res) => {
  const playerId = req.params.id;
  const player = await Player.findOne({ sofifa_id: String(playerId) });
  res.status(200).json({ playerDetails: player });
};

module.exports = { getPlayers, getPlayerById };
