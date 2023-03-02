const express = require("express");
const router = express.Router({ mergeParams: true });
// const auth = require("../middleware/middleware");
const Cart = require("../models/Cart");

// /api/cart
// router
//   .route("/")
//   .get(auth, async (req, res) => {
//     const { userId } = req.params;
//     try {
//       const cart = Cart.create({ ...req.body, userId });
//       res.send(cart);
//     } catch (e) {
//       res
//         .status(500)
//         .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
//     }
//   })
//   .post(auth, async (req, res) => {
//     try {
//       const newComment = await Comment.create({
//         ...req.body,
//         userId: req.user._id,
//       });
//       res.status(201).send(newComment);
//     } catch (e) {
//       res
//         .status(500)
//         .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
//     }
//   });

// router.delete("/:commentId", auth, async (req, res) => {
//   try {
//     const { commentId } = req.params;
//     const removedComment = await Comment.findById(commentId);
//     if (removedComment.userId.toString() === req.user._id) {
//       await removedComment.remove();
//       return res.send(null);
//     } else {
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   } catch (e) {
//     res
//       .status(500)
//       .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
//   }
// });

// router.post("/:userId", auth, async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const removedCart = await Cart.findById(userId);
//     if (removedCart.cartItems.toString() === req.user._id) {
//       await removedComment.remove();
//       return res.send(null);
//     } else {
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   } catch (e) {
//     res
//       .status(500)
//       .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
//   }
// });

module.exports = router;
