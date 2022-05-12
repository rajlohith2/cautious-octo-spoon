const Team = require("../models/Team");

const getUserTeams = async (req, res) => {
  const { userName } = req.body;
  const userTeams = await Team.find({
    userName: userName,
  });
  res.status(200).json(userTeams);
};

const getTeamDetails = async (req, res) => {
  const { teamName } = req.body;
  const teamDetails = await Team.findOne({
    teamName: teamName,
  });
  res.status(200).json(teamDetails);
};

module.exports = {
  getUserTeams,
  getTeamDetails,
};
