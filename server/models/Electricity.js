const mongoose = require("mongoose");

const ElectricitySchema = new mongoose.Schema({
  housingCooperativeName: {
    type: String,
    default: "",
    required: true,
  },
  commentCounts: {
    type: Number,
    default: 1,
    required: true,
  },
  positivesCounts: {
    type: Number,
    default: 1,
    required: true,
  },
  positivityPercentage: {
    type: Number,
    default: 1,
    required: true,
  },
});

module.exports = mongoose.model("Electricity", ElectricitySchema);
