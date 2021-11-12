const express = require("express");
const router = express.Router();

const Room = require("../../models/Room");

router.delete("/", (req, res) => {
  Room.deleteOne({ _id: req.query._id }, (err, doc) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }
    res.send(doc);
  });
});

module.exports = router;
