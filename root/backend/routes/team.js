const express = require("express");
const { getUserTeams, getTeamDetails } = require("../controllers/team");

const router = express.Router();

router.post("/myTeams", getUserTeams); //test pending
router.post("/teamDetails", getTeamDetails); //test pending

module.exports = router;
