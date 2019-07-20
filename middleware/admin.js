const config = require("config");

module.exports = function(req, res, next) {
  // 401 unauthorzied
  // 403 forbidden
  // if (!config.get("requiresAuth")) return next();
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
};
