const express = require("express");
const router = express.Router();

const Room = require("../../models/Room");

router.get("/", (req, res) => {
  Room.find({}, (err, rooms) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send(rooms);
  });
});

module.exports = router;
