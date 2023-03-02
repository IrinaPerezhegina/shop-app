const express = require("express");
const router = express.Router({ mergeParams: true });
// const auth = require("../middleware/middleware");
const Images = require("../models/Images.js");

router.get("/", async (req, res) => {
  try {
    const list = await Images.find();
    res.status(200).send(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
  }
});
module.exports = router;
