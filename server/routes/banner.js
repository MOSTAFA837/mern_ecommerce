const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
  create,
  read,
  listAll,
  update,
  remove,
} = require("../controllers/banner");

// routes
router.post("/banner", authCheck, adminCheck, create); // create
router.get("/banner/:id", read); // get one
router.get("/banners", listAll); // get all
router.put("/banner/:id", authCheck, adminCheck, update);
router.delete("/banner/:id", authCheck, adminCheck, remove);

module.exports = router;
