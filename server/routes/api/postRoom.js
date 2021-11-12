const express = require("express");
const router = express.Router();

//import the models
const Room = require("../../models/Room");

/*
post a room
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { housingCooperativeName, price, type, status } = body;

  //make sure they are not blank
  if (!housingCooperativeName) {
    return res.send({
      success: false,
      message: "apartment name field should not be empty",
    });
  }
  if (!type) {
    return res.send({
      success: false,
      message: "Apartment type field should not be empty",
    });
  }
  if (!price) {
    return res.send({
      success: false,
      message: "price field should not be empty",
    });
  }

  if (!status) {
    return res.send({
      success: false,
      message: "Kindly Describe The Apartment in brief!",
    });
  }
  //field are not empty

  //save the room
  const newRoom = new Room({
    housingCooperativeName,
    price,
    type,
    status,
  });

  newRoom.save((err, room) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send({
      success: true,
      message: "New room posted",
    });
  });
});

module.exports = router;
