const express = require("express");
const router = express.Router();

const usersController = require("../controllers/Users-controller");

require("dotenv").config();

const {
  validateToken,
  staffToken,
  adimnToken,
} = require("../middlewares/AuthMiddleware");

// get all users
router.get("/", validateToken, usersController.getAllUsers);

// create users
router.post("/", staffToken, usersController.createUsers);

// you can use either this or async
router.post("/v2", staffToken, usersController.createUsersPro);

// logging in
router.post("/login", usersController.userLogin);

// Delete user
router.delete("/:id", adimnToken, usersController.deleteUser);

module.exports = router;
