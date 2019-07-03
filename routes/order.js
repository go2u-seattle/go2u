"use strict";

// packages
var express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
// modules
var orderController = require("../controllers/order");

var orderRouter = express
  .Router()
  .get("/", orderController.getAll)
  .get("/:id", orderController.getById)
  .delete("/:id", orderController.deleteById)
  .post("/", orderController.post)
  .put("/:id", auth, orderController.put);

module.exports = orderRouter;
