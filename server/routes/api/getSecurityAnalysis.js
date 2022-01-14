const express = require("express");
const router = express.Router();

//gather aspects
const Security = require("../../models/Aspects/Security");

router.get("/", (req, res) => {
  const { query } = req;
  const { housingCooperativeName } = query;

  Security.find(
    { housingCooperativeName: housingCooperativeName },
    (err, rooms) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      if (rooms == 0) {
        return res.send({
          success: false,
          message: "No Apartments Posted",
        });
      }

      res.send(rooms);
    }
  );
});

module.exports = router;
