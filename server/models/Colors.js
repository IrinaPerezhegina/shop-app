const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  //на чьей странице находятся комменты

  value: { type: String, required: true },
});

module.exports = model("Colors", schema);
