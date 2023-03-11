const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/products", require("./products.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/comments", require("./comment.routes"));
router.use("/users", require("./user.routes"));
router.use("/colors", require("./colors.routes"));
router.use("/images", require("./images.routes"));

module.exports = router;
