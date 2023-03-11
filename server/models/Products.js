const { Schema, model, default: mongoose } = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
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
      type: Number,
      required: true,
      default: 0,
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
    numReviews: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
