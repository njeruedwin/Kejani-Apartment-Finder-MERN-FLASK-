const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("UserSession", UserSessionSchema);
