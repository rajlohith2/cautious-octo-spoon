const Team = require("../models/Team");
const Game = require("../models/Game");
const bcrypt = require("bcrypt");

const createNewGame = async (req, res) => {
  const { userName, gameName, gamePassword, gameRules, teamName, imageLink } =
    req.body;
  const existingGame = await Game.findOne({
    gameName: { $regex: new RegExp("^" + gameName + "$", "i") },
  });

  if (existingGame) {
    return res.status(400).send({
      message: `Game name '${userName}' is already taken. Choose another one.`,
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(gamePassword, saltRounds);

  const gameData = new Game({
    gameName: gameName,
    gamePasswordHash: passwordHash,
    gameOwner: userName,
    gameStatus: "Not Started",
    gameRules: gameRules,
    playersSoldSoFar: [],
  });
  await gameData.save();
  await createTeam(
    userName,
    gameName,
    teamName,
    imageLink,
    gameRules.gameBudget
  );
  res.status(200).json({
    message:
      "Game created successfully. Your team " +
      teamName +
      " has been added to the game.",
  });
};

const joinGame = async (req, res) => {
  const { userName, gameName, gamePassword, teamName, imageLink } = req.body;
  const game = await Game.findOne({
    gameName: { $regex: new RegExp("^" + gameName + "$", "i") },
  });

  if (!game) {
    return res
      .status(400)
      .send({ message: "No game exists with the given game name." });
  }
  const credentialsValid = await bcrypt.compare(
    gamePassword,
    game.gamePasswordHash
  );

  if (!credentialsValid) {
    return res.status(401).send({ message: "Invalid Game name or password." });
  }
  const result = await createTeam(
    userName,
    gameName,
    teamName,
    imageLink,
    game.gameRules.gameBudget
  );

  if (result instanceof Error) {
    return res.status(400).send({ message: result.toString() });
  }
  res.status(200).json({
    message:
      "Game joined successfully. Your team " +
      teamName +
      " has been added to the game.",
  });
};

const createTeam = async (
  userName,
  gameName,
  teamName,
  imageLink,
  remainingBudget
) => {
  const existingUser = await Team.findOne({
    gameName: { $regex: new RegExp("^" + gameName + "$", "i") },
    teamOwner: { $regex: new RegExp("^" + userName + "$", "i") },
  });
  if (existingUser) {
    return new Error(`You have already joined the game!`);
  }
  const existingTeam = await Team.findOne({
    gameName: { $regex: new RegExp("^" + gameName + "$", "i") },
    teamName: { $regex: new RegExp("^" + teamName + "$", "i") },
  });
  if (existingTeam) {
    return new Error(
      `Team name '${teamName}' is already taken in this game. Choose another one.`
    );
  }

  const teamAvatar = {
    exists: imageLink ? true : false,
    imageLink: imageLink,
  };
  const teamData = new Team({
    teamName: teamName,
    avatar: teamAvatar,
    gameName: gameName,
    teamOwner: userName,
    remainingBudget: remainingBudget,
    players: [],
  });
  await teamData.save();
  return teamData;
};

const updatedGameStatus = async (req, res) => {
  // possible statuses = INACTIVE, PLAYERS_IN_LOBBY, AUCTION_SESSION_UNDER_PROGRESS, STOPPED, COMPLETED

  const { gameName, status } = req.body;
  const updatedGame = await Game.updateOne(
    {
      gameName: gameName,
    },
    { $set: { gameStatus: status } }
  );
  res.status(200).json({
    message: "Game status updated successfully",
  });
};

const getTeamsInGame = async (req, res) => {
  const { gameName } = req.body;
  const teamsInGame = await Team.find({
    gameName: gameName,
  });
  res.status(200).json(teamsInGame);
};

const updateSale = async (req, res) => {
  const { teamName, playerID, soldAmount, gameName } = req.body;
  const saleUpdated = await Team.updateOne(
    { teamName: teamName },
    {
      $push: { players: { playerID: playerID, soldAmount: soldAmount } },
      $subtract: [remainingBudget, soldAmount],
    }
  );
  const gameUpdated = await Game.updateOne(
    { gameName: gameName },
    {
      $push: {
        playersSoldSoFar: { playerID: playerID, soldAmount: soldAmount },
      },
    }
  );
  res
    .status(200)
    .json({ message: "Player Successfully sold to team " + teamName });
};

module.exports = {
  createNewGame,
  joinGame,
  getTeamsInGame,
  updatedGameStatus,
  updateSale,
};
