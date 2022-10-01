const User = require("../models/User");

async function register(email, username, password) {
  const existing = await getUserByEmail(email);

  if (existing) {
    throw new Error("Email is taken already");
  }

  const user = new User({ email, username, password });

  await user.save();
  return user;
}

async function login(username, password) {
  const user = await getUserByEmail(username);

  if (!user) {
    throw new Error("Wrong username or password");
  }
  const hasMatch = await user.validatePassword(password);

  if (!hasMatch) {
    throw new Error("Wrong username or password");
  }
  return user;
}

async function getUserByEmail(username) {
  const user = await User.findOne({
    username: new RegExp(`^${username}$`, "i"),
  });
  return user;
}

module.exports = {
  login,
  register,
};
