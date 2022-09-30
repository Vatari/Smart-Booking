const { isUser } = require("../middleware/guards");
const {
  getItems,
  getUserAndItems,
  getItemById,
  getItemsByAuthor,
} = require("../services/item");
const preload = require("../middleware/preload");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const items = await getItems();

  res.render("home", { title: "Home Page", items });
});

router.get("/details", async (req, res) => {
  const items = await getItems();
  res.render("details", { title: "Details Page", items });
});

router.get("/details/:id", preload(true), isUser(), async (req, res) => {
  /*   res.locals.item.remainingPieces =
    res.locals.item.pieces - res.locals.item.rentedUsers.length; */
  if (req.session.user) {
    res.locals.item.hasUser = true;
    res.locals.item.isOwner =
      req.session.user?._id == res.locals.item.owner._id;

    if (
      res.locals.item.bookedUsers.some((b) => b._id == req.session.user._id)
    ) {
      res.locals.item.isBooked = true;
    }
  }

  res.render("details", { title: "Details" });
});

router.get("/profile", preload(true), isUser(), async (req, res) => {
  const user = await getUserAndItems(req.session.user._id);

  user.bookedHotels = user.bookedHotels.map((hotel) => hotel.name).join(", ");

  res.render("profile", { title: "My Items", user });
});

module.exports = router;
