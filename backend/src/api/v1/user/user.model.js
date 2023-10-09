const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModal = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  roles: [String],
});

module.exports = mongoose.model("User", userModal);
