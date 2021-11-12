const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  housingCooperativeName: {
    type: String,
    default: "",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  type: {
    type: String,
    default: "",
    required: true,
  },
  price: {
    type: String,
    default: "",
    required: true,
  },
  status: {
    type: String,
    default: "",
    required: true,
  },
});

module.exports = mongoose.model("room", RoomSchema);
