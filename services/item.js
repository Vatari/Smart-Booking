const Item = require("../models/Item");
const User = require("../models/User");

async function createItem(item) {
  const result = new Item(item);
  await result.save();
  return result;
}

async function getItems() {
  return Item.find({}).lean();
}

async function getItemsByAuthor(userId) {
  return Item.find({ author: userId }).lean();
}

async function getItemById(id) {
  return Item.findById(id).lean();

  /*   
    .populate("owner", "name")
    .populate("rentedUsers", "username"); */
}

async function updateItem(id, item) {
  const existing = await Item.findById(id);

  existing.name = item.name;
  existing.city = item.city;
  existing.freeRooms = item.freeRooms;
  existing.imageUrl = item.imageUrl;

  await existing.save();
}

async function deleteItem(id) {
  return Item.findByIdAndDelete(id);
}

async function book(itemId, userId) {
  const item = await Item.findById(itemId);
  const user = await User.findById(userId);

  if (item.bookedUsers.includes(userId)) {
    throw new Error("You are already booked!");
  }
  user.bookedHotels.push(itemId);
  item.bookedUsers.push(userId);

  await item.save();
  await user.save();
}

async function getItemAndUsers(id) {
  return Item.findById(id).populate("owner").populate("bookedUsers").lean();
}

async function getUserAndItems(userId) {
  return User.findById(userId).populate("bookedHotels").lean();
}

async function searchItem(text) {
  if (text) {
    return Item.find({ type: { $regex: text, $options: "i" } }).lean();
  }
}

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  book,
  getItemsByAuthor,
  getUserAndItems,
  searchItem,
  getItemAndUsers,
};
