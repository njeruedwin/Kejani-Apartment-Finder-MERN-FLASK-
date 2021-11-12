const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    default: "",
    required: true,
  },
  user_id: {
    type: String,
  },
  Housing_cooperative_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
