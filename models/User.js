const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
const NAME_PATTERN = /^[a-z ,.'-]+$/i;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator(value) {
        return EMAIL_PATTERN.test(value);
      },
      message: "Email address is not valid",
    },
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "Password must be at least 5 characters"],
  },
  bookedHotels: { type: [ObjectId], ref: "Item", default: [] },
  offeredHotels: { type: [ObjectId], ref: "Item", default: [] },
});

userSchema.index(
  { username: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

userSchema.pre("save", function (next) {
  if (this.bookedHotels.length > 0) {
    return next();
  } else {
    return bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
      this.password = hash;
      return next();
    });
  }
});

userSchema.method("validatePassword", function (password) {
  return bcrypt.compare(password, this.password);
});

const User = model("User", userSchema);

module.exports = User;