const express = require("express");
const router = express.Router({ mergeParams: true });
const Products = require("../models/Products");

//Получаем все продукты
router.get("/", async (req, res) => {
  try {
    const list = await Products.find();
    res.status(200).send(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
  }
});
//Получаем конкретный продукт по id
router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
  }
});

module.exports = router;
