const express = require("express");
const { getUserDetails, editUserDetails } = require("../controllers/user");

const router = express.Router();

router.get("/:userName", getUserDetails);
router.post("/updateUserDetails", editUserDetails);

module.exports = router;
