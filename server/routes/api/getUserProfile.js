const express = require("express");
const router = express.Router();

const HousingCooperative = require("../../models/HousingCooperative");

router.get("/", (req, res) => {
  const { query } = req;
  const { housingCooperativeName } = query;

  HousingCooperative.find(
    { housingCooperativeName: housingCooperativeName },
    (err, housingCooperative) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      if (housingCooperative == 0) {
        return res.send({
          success: false,
          message: "Cooperative does not exist",
        });
      }

      res.send(housingCooperative);
    }
  );
});

module.exports = router;
