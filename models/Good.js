const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  const: { type: Number, required: true },
});

module.exports = model("Good", schema);
