const uuid = require("uuid");
const bcrypt = require("bcryptjs");

("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: uuid.v4(),
        name: "William Duse",
        email: "dusenaberawilliam07@gmail.com",
        gender: "M",
        password: bcrypt.hashSync("william", 4),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
