const express = require("express");
const productsMock = require("./mock/products.js");
const Products = require("./models/Products.js");
// const usersMock = require("./mock/user.js");
const User = require("./models/User.js");
const ImportData = express.Router();
const colorsMock = require("./mock/color.js");
const Color = require("./models/Colors.js");
const imagesMock = require("./mock/images.js");
const Images = require("./models/Images.js");
ImportData.post("/products", async (req, res) => {
  await Products.remove({});
  const importUser = await Products.insertMany(productsMock);
  res.send({ importUser });
});
// ImportData.post("/users", async (req, res) => {
//   await Products.remove({});
//   const importUser = await User.insertMany(usersMock);
//   res.send({ importUser });
// });
// ImportData.post("/colors", async (req, res) => {
//   await Color.remove({});
//   const importUser = await Color.insertMany(colorsMock);
//   res.send({ importUser });
// });

// ImportData.post("/images", async (req, res) => {
//   await Images.remove({});
//   const importUser = await Images.insertMany(imagesMock);
//   res.send({ importUser });
// });

module.exports = ImportData;
