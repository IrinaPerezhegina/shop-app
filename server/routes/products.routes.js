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

router.patch("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const updateProduct = await Products.findByIdAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
      }
    );
    await console.log(updateProduct);
    // const updateProduct = await Products.findByIdAndUpdate(
    //   { _id: productId },
    //   {
    //     $set: {
    //       rating: req.body.rating,
    //       numReviews: req.body.numReviews,
    //     },
    //   }
    // );

    res.send(updateProduct);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await Products.create({ ...req.body });
    console.log(newProduct);
    res.status(201).send(newProduct);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const removedProduct = await Products.findById(productId);
    console.log(removedProduct);
    await removedProduct.deleteOne({ _id: productId });
    return res.send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
