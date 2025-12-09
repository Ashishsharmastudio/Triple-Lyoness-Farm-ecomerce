const ROLES = require("../config/roles");

const isOwner = (req, res, next) => {
  if (req.user && req.user.role === ROLES.OWNER) {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Access denied. Owner privileges required." });
  }
};

module.exports = isOwner;
