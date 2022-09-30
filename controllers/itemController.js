const { mapErrors } = require("../util/mappers");
const { isUser, isOwner, isGuest } = require("../middleware/guards");
const preload = require("../middleware/preload");

const {
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  book,
  searchItem,
} = require("../services/item");
const { request } = require("express");

const router = require("express").Router();

router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create Page" });
});

router.post("/create", isUser(), async (req, res) => {
  const userId = req.session.user._id;

  const item = {
    name: req.body.name,
    city: req.body.city,
    imageUrl: req.body.imageUrl,
    freeRooms: req.body.freeRooms,
    owner: userId,
  };
  try {
    await createItem(item);
    res.redirect("/");
  } catch (err) {
    const errors = mapErrors(err);
    res.render("create", { title: "Create Page", errors, item });
  }
});

router.get("/edit/:id", preload(), isOwner(), isUser(), async (req, res) => {
  res.render("edit", { title: "Edit Page" });
});

router.post("/edit/:id", preload(), isOwner(), isUser(), async (req, res) => {
  const id = req.params.id;

  const item = {
    name: req.body.name,
    city: req.body.city,
    freeRooms: Number(req.body.freeRooms),
    imageUrl: req.body.imageUrl,
  };

  try {
    await updateItem(id, item);
    res.redirect("/details/" + id);
  } catch (err) {
    const errors = mapErrors(err);
    item._id = id;
    res.render("edit", { title: "Edit Page", item, errors });
  }
});

router.get("/delete/:id", preload(), isOwner(), isUser(), async (req, res) => {
  const id = req.params.id;

  try {
    await deleteItem(id);
    res.redirect("/");
  } catch (err) {
    const errors = mapErrors(err);
    res.render("details", { title: existing.title, errors });
  }
});

router.get("/book/:id/", isUser(), async (req, res) => {
  const id = req.params.id;

  try {
    await book(id, req.session.user._id);
    res.redirect("/details/" + id);
  } catch (err) {
    const errors = mapErrors(err);
    res.render("details", { title: "Details", errors });
  }
});

router.get("/search", isUser(), async (req, res) => {
  if (req.query.text == "") {
    return;
  }
  try {
    let searchItems = await searchItem(req.query.text);
    res.render("search", { title: "Search", searchItems });
  } catch (err) {
    const errors = mapErrors(err);
    res.render("search", { title: "Search", errors });
  }
});

module.exports = router;
