const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  shopId: { type: Types.ObjectId, ref: "Shop" },
  goodId: { type: Types.ObjectId, ref: "Good" },
  count: { type: String, required: true },
});

module.exports = model("Stock", schema);
