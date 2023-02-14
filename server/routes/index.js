const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/products", require("./products.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/comment", require("./comment.routes"));

module.exports = router;
