const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    color: { type: Array, required: true },
    images: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Images", schema);
