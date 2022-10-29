const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const URL_PATTERN =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [4, "Title must be at least 4 characters"],
    },
    city: {
      type: String,
      required: true,
      minLength: [3, "Description must be at least 3 characters"],
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return URL_PATTERN.test(value);
        },
        message: "Image must be a valid URL",
      },
    },
    freeRooms: {
      type: Number,
      required: true,
      min: [1, "Value must be between 1 and 100"],
      max: [100, "Value must be between 1 and 100"],
    },

    bookedUsers: { type: [ObjectId], ref: "User", default: [] },
    owner: { type: ObjectId, ref: "User", required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true }, //inserts creation date
  }
);

const Item = model("Item", ItemSchema);

module.exports = Item;