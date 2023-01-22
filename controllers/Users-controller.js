const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const { sign } = require("jsonwebtoken");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.findAll();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create(Add) users
const createUsers = async (req, res) => {
  try {
    const user = req.body;
    const addUser = await Users.create({
      id: uuid.v4(),
      name: user.name,
      email: user.email,
      gender: user.gender,
      role: user.role,
      password: bcrypt.hashSync(user.password, 4),
    });
    res.status(200).send(addUser);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

// Create(Add) users without using async
const createUsersPro = (req, res) => {
  const user = req.body;
  Users.create({
    id: uuid.v4(),
    name: user.name,
    email: user.email,
    gender: user.gender,
    role: user.role,
    password: bcrypt.hashSync(user.password, 4),
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Login
const userLogin = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(400).send({ message: "Email is required" });
    }
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ error: "User doesn't exist" });
    }
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.status(406).send({ error: "Wrong username or password" });
      }

      const accessToken = sign(
        {
          email: user.email,
          id: user.id,
          fullName: user.fullName,
          role: user.role,
        },
        process.env.SECRET_TOKEN
      );

      res.status(200).send({
        token: accessToken,
        fullName: user.fullName,
        id: user.id,
        email: user.email,
        role: user.role,
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ message: "ID is required" });
    }
    const id = req.params.id;
    await Users.destroy({ where: { id } });
    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllUsers = getAllUsers;
exports.createUsers = createUsers;
exports.createUsersPro = createUsersPro;
exports.userLogin = userLogin;
exports.deleteUser = deleteUser;
