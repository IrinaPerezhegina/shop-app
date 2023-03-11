const bcrypt = require("bcryptjs");

const user = [
  {
    username: "Admin",
    email: "admin@mail.ru",
    password: bcrypt.hashSync("Test1234", 10),
    isAdmin: true,
  },
  {
    username: "User",
    email: "user@.ru",
    password: bcrypt.hashSync("Test1234", 10),
  },
];

module.exports = user;
