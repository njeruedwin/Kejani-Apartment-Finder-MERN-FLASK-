const express = require("express");
const router = express.Router();

//import the models
const HousingCooperative = require("../../models/HousingCooperative");

router.post("/", (req, res) => {
  const { body } = req;
  const {
    housingCooperativeName,
    email,
    phoneNumber,
    addressOne,
    addressTwo,
    location,
    description,
  } = body;

  //make sure they are not blank
  if (!housingCooperativeName) {
    return res.send({
      success: false,
      message: "Housing Cooperative name field should not be empty",
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: "email name field should not be empty",
    });
  }
  if (!location) {
    return res.send({
      success: false,
      message: "location field should not be empty",
    });
  }
  if (!phoneNumber) {
    return res.send({
      success: false,
      message: "phone number field should not be empty",
    });
  }
  if (!addressOne) {
    return res.send({
      success: false,
      message: "adress 1 empty",
    });
  }
  if (!addressTwo) {
    return res.send({
      success: false,
      message: "adress two empty",
    });
  }
  if (!description) {
    return res.send({
      success: false,
      message: "Please add description",
    });
  }

  HousingCooperative.find(
    { housingCooperativeName: housingCooperativeName },
    (err, housings) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      if (housings == 0) {
        return res.send({
          success: false,
          message: "The Housing Cooperative does not exist",
        });
      }

      //update the housing Cooperative Information
      HousingCooperative.updateOne(
        { housingCooperativeName: housingCooperativeName },
        {
          email: email,
          location: location,
          phoneNumber: phoneNumber,
          description: description,
          addressOne: addressOne,
          addressTwo: addressTwo,
        }
      )
        .then(() => {
          res.send({
            success: true,
            message: "Housing Updated",
          });
        })
        .catch((error) => {
          return res.send({ message: error });
        });
    }
  );
});

module.exports = router;
