const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: { type: String, required: true },
    //на чьей странице находятся комменты
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    //того человека , кто оставил коммент
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    estimation: { type: Schema.Types.Number, required: true },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = model("Comment", schema);
