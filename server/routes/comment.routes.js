const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/middleware");
const Comment = require("../models/Comment");

// /api/comment

router.get("/:productId", async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;
    const list = await Comment.find({ [orderBy]: equalTo });
    res.status(200).send(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
  }
});

// router
//   .route("/")
//   .get(async (req, res) => {
//     try {
//       // const { orderBy, equalTo } = req.query;
//       const list = Comment.find(/*{ [orderBy]: equalTo }*/);
//       res.send(list);
//     } catch (e) {
//       res
//         .status(500)
//         .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
//     }
//   })
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).send(newComment);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    console.log(req.body);
    const removedComment = await Comment.findById(commentId);
    await removedComment.remove();
    return res.send(null);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка.Попробуйте позже" });
  }
});

module.exports = router;
