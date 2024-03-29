const express = require("express");
const productsMock = require("./mock/products.js");
const Products = require("./models/Products.js");
const usersMock = require("./mock/user.js");
const User = require("./models/User.js");
const ImportData = express.Router();
const colorsMock = require("./mock/color.js");
const Color = require("./models/Colors.js");
const commentsMock = require("./mock/comments.js");
const Comment = require("./models/Comment.js");

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

ImportData.post("/comments", async (req, res) => {
  await Comment.remove({});
  const importUser = await Comment.insertMany(commentsMock);
  res.send({ importUser });
});

module.exports = ImportData;
