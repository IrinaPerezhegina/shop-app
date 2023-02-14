const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: { type: String, enum: ["men's", "female"] },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Object,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    amortization: {
      type: String,
      required: true,
    },
    color: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Products", schema);
