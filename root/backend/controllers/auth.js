const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const dotenv = require("dotenv");
// const { SECRET } = require("../config/config");
dotenv.config();
const SECRET = process.env.SECRET;
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: { $regex: new RegExp("^" + username + "$", "i") },
  });

  if (!user) {
    return res
      .status(400)
      .send({ message: "No account with this username has been registered." });
  }

  const credentialsValid = await bcrypt.compare(password, user.passwordHash);
  // console.log(user.passwordHash);
  // const credentialsValid = user.passwordHash == password;
  if (!credentialsValid) {
    return res.status(401).send({ message: "Invalid username or password." });
  }

  const payloadForToken = {
    id: user._id,
  };
  const token = jwt.sign(payloadForToken, SECRET);

  res.status(200).json({
    token,
    username: user.userName,
    id: user._id,
    avatar: user.avatar,
  });
};

const signupUser = async (req, res) => {
  const { userName, password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({ message: "Password needs to be atleast 6 characters long." });
  }

  if (!userName || userName.length > 20 || userName.length < 3) {
    return res
      .status(400)
      .send({ message: "userName character length must be in range of 3-20." });
  }

  const existingUser = await User.findOne({
    userName: { $regex: new RegExp("^" + userName + "$", "i") },
  });

  if (existingUser) {
    return res.status(400).send({
      message: `Username '${userName}' is already taken. Choose another one.`,
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    userName,
    passwordHash,
  });

  const savedUser = user.save();

  const payloadForToken = {
    id: savedUser._id,
  };

  const token = jwt.sign(payloadForToken, SECRET);

  res.status(200).json({
    token,
    userName: savedUser.userName,
    id: savedUser._id,
    avatar: savedUser.avatar,
  });
};

module.exports = { loginUser, signupUser };
