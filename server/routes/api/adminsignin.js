const express = require("express");
const router = express.Router();

//import the models
const Admin = require("../../models/Admin");
const UserSession = require("../../models/UserSession");
/*
Sign In 
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { adminName, password } = body;

  //make sure they are not blank
  if (!adminName) {
    return res.send({
      success: false,
      message: "adminName field should not be empty",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "password field should not be empty",
    });
  } //field are not empty

  //make sure that the admin exists
  Admin.find({ adminName: adminName }, (err, admins) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error: find admin",
      });
    }
    if (admins == 0) {
      return res.send({
        success: false,
        message: "The Admin does not exist",
      });
    }

    //user does exist
    //check if password is correct for that particular admin
    const admin = admins[0];
    if (!admin.validPassword(password)) {
      return res.send({
        success: false,
        message: "The password is incorrect",
      });
    }

    //Everything is OK
    //create an Admin session

    const newUserSession = new UserSession({
      userId: admin.id,
    });

    //save the new user session

    newUserSession.save((err, session) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error: session",
        });
      }

      res.send({
        success: true,
        message: "Admin Successfully Signed In",
        token: session.id,
      });
    });
  });
});

module.exports = router;
