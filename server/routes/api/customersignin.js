const express = require("express");
const router = express.Router();

//import the models
const Customer = require("../../models/Customer");
const UserSession = require("../../models/UserSession");
/*
Sign In 
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { customerName, password } = body;

  //make sure they are not blank
  if (!customerName) {
    return res.send({
      success: false,
      message: "customerName field should not be empty",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "password field should not be empty",
    });
  } //field are not empty

  //make sure that the admin exists
  Customer.find({ customerName: customerName }, (err, customers) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }
    if (customers == 0) {
      return res.send({
        success: false,
        message: "The user name does not exist",
      });
    }

    //user does exist
    //check if password is correct for that particular admin
    const customer = customers[0];
    if (!customer.validPassword(password)) {
      return res.send({
        success: false,
        message: "The password is incorrect",
      });
    }

    //Everything is OK
    //create an Admin session

    const newUserSession = new UserSession({
      userId: customer.id,
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
        message: "Customer Successfully Signed In",
        token: session.id,
      });
    });
  });
});

module.exports = router;
