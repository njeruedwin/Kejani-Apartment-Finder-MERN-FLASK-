const express = require("express");
const router = express.Router();

//import the models
const HousingCooperative = require("../../models/HousingCooperative");
const UserSession = require("../../models/UserSession");
/*
Sign In 
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { housingCooperativeName, password } = body;

  //make sure they are not blank
  if (!housingCooperativeName) {
    return res.send({
      success: false,
      message: "housingCooperativeName field should not be empty",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "password field should not be empty",
    });
  } //field are not empty

  //make sure that the admin exists
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
          message: "The Housing Cooperative Account does not exist",
        });
      }

      //user does exist
      //check if password is correct for that particular admin
      const housing = housings[0];
      if (!housing.validPassword(password)) {
        return res.send({
          success: false,
          message: "The password is incorrect",
        });
      }

      //Everything is OK
      //create an Admin session

      const newUserSession = new UserSession({
        userId: housing.id,
      });

      //save the new user session

      newUserSession.save((err, session) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server Error",
          });
        }

        res.send({
          success: true,
          message: "User Successfully Signed In",
          token: session.id,
        });
      });
    }
  );
});

module.exports = router;
