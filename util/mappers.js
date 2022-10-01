function mapErrors(err) {
  if (Array.isArray(err)) {
    return err;
  } else if (err.name == "ValidationError") {
    return Object.values(err.errors).map((e) => ({ msg: e.message }));
  } else if (typeof err.message == "string") {
    return [{ msg: err.message }];
  } else {
    return [{ msg: "Request failed" }];
  }
}

function itemViewModel(item) {
  return {
    _id: item._id,
    name: item.name,
    type: item.type,
    year: item.year,
    city: item.city,
    image: item.image,
    description: item.description,
    pieces: item.pieces,

    rentedUsers: item.rentedUsers.map(voteViewModel),
  };
}

function authorViewModel(author) {
  return {
    _id: author._id,
    username: author.username,
  };
}

function voteViewModel(user) {
  return {
    _id: user._id,
    username: user.username,
  };
}

module.exports = {
  mapErrors,
  itemViewModel,
};
