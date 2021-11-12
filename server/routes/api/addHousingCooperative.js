const request = require("request");
const express = require("express");
const router = express.Router();

//import the models
const HousingCooperative = require("../../models/HousingCooperative");
//import the aspects models
const Electricity = require("../../models/Aspects/Electricity");
const Water = require("../../models/Aspects/Water");

/*
Add an Apartment 
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { housingCooperativeName, password } = body;

  //make sure they are not blank
  if (!housingCooperativeName) {
    return res.send({
      success: false,
      message: "Housing Cooperative name field should not be empty",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "password field should not be empty",
    });
  } //field are not empty

  //make sure that the apartment does not exist
  HousingCooperative.find(
    { housingCooperativeName: housingCooperativeName },
    (err, HousingCooperatives) => {
      if (err) {
        res.send({
          success: false,
          message: "Server Error: find",
        });
      }

      if (HousingCooperatives != 0) {
        return res.send({
          success: false,
          message: "The Housing Cooperative already exists",
        });
      }

      //the Apartment is new
      //save the apartment
      const newHousingCooperative = new HousingCooperative({
        housingCooperativeName,
        password,
      });

      //encrypt the password
      newHousingCooperative.password =
        newHousingCooperative.generateHash(password);

      newHousingCooperative.save((err, HousingCooperative) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server Error: save",
          });
        }
        //set aspects initials
        const newElectricity = new Electricity({
          housingCooperativeName: housingCooperativeName,
          commentCounts: 0,
          positivesCounts: 0,
          positivityPercentage: 0,
        });
        newElectricity.save((err, HousingCooperative) => {
          if (err) {
            return res.send({
              success: false,
              message: "Server Error: save",
            });
          }
        });

        const newWater = new Water({
          housingCooperativeName: housingCooperativeName,
          commentCounts: 0,
          positivesCounts: 0,
          positivityPercentage: 0,
        });
        newWater.save((err, HousingCooperative) => {
          if (err) {
            return res.send({
              success: false,
              message: "Server Error: save",
            });
          }
        });

        res.send({
          success: true,
          message: "New Housing Cooperative Entered",
        });
      });
    }
  );
});

module.exports = router;
