const User = require("../models/User");
const Team = require("../models/Team");

const getUserDetails = async (req, res) => {
  const userName = req.params.userName;
  const userDetails = await User.findOne({ userName: userName });
  const userTeams = await Team.find({ teamOwner: userDetails.id });
  res.status(200).json({ userDetails: { ...userDetails, teams: userTeams } });
};

const editUserDetails = async (req, res) => {
  console.log(req.body);

  const { userName, favouritePlayer, favouriteClub } = req.body;
  const avatar = {
    exists: req.body.avatar ? true : false,
    imageLink: req.body.avatar || "",
  };
  await User.updateOne(
    { userName: userName },
    {
      $set: {
        favouriteClub: favouriteClub,
        favouritePlayer: favouritePlayer,
        avatar: avatar,
      },
    }
  );
  res.status(200).json({ message: "User Details Updated!" });
};

module.exports = { getUserDetails, editUserDetails };
