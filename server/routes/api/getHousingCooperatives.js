const express = require("express");
const router = express.Router();

const HousingCooperative = require("../../models/HousingCooperative");

router.get("/", (req, res) => {
  HousingCooperative.find({}, (err, HousingCooperatives) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send(HousingCooperatives);
  });
});

module.exports = router;
