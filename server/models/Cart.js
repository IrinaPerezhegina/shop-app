const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", schema);
