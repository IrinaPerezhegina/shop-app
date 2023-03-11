const express = require("express");
const User = require("../models/User");
// const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.patch("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updateUser = await User.findOne({ _id: userId });
    const map = updateUser.cartItems.findIndex(
      (item) => item._id.toString() === req.body._id
    );

    if (map >= 0 && req.body.count !== 0) {
      const elemInc = `cartItems.${map}.count`;
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $inc: { [elemInc]: req.body.count },
      });
    } else if (map === -1 && req.body.count !== 0) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            cartItems: {
              _id: req.body._id,
              count: req.body.count,
              price: req.body.price,
            },
          },
          upsert: true,
        }
      );
    } else if (req.body.count === 0) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },

        {
          $pull: {
            cartItems: { _id: req.body._id },
          },
        }
      );
    }
    res.send(updateUser);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(userId);
    res.send(currentUser);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
