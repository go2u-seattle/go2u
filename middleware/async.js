

// we are not using this error express logging module
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch (ex) {
      next(ex);
    }
  }
}