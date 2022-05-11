const express = require('express');
const { getPlayers, getPlayerById  } = require('../controllers/player');

const router = express.Router();

router.get('/', getPlayers);
router.get('/:id', getPlayerById);
module.exports = router;