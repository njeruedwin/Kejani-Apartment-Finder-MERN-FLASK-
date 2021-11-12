const mongoose = require("mongoose");

//set up the user schema
const AnalysisSchema = new mongoose.Schema({
  housingCooperativeName: {
    type: String,
    default: "",
    required: true,
  },
  customerName: {
    type: String,
    default: "",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
    required: true,
    default: "",
  },
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
