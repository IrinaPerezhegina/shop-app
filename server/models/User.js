const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    cartItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: { type: Number, required: true, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
