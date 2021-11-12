const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Aspects = new mongoose.Schema({
  water: {
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
  },
  security: {
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
  },
});

module.exports = mongoose.model("HousingCooperative", Aspects);
