const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
  actionName: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = model("Log", schema);
