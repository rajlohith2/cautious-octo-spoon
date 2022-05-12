const express = require("express");
const {
  createNewGame,
  joinGame,
  updatedGameStatus,
  getTeamsInGame,
  updateSale,
} = require("../controllers/game");

const router = express.Router();

router.post("/create", createNewGame);
router.post("/join", joinGame);
router.post("/updatedStatus", updatedGameStatus); //test pending
router.post("/teams", getTeamsInGame); //test pending
router.post("/updateSale", updateSale); //test pending

module.exports = router;
