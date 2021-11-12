const express = require("express");
const router = express.Router();

//import the model
const Admin = require("../../models/Admin");

router.post("/", (req, res) => {
  let { body } = req;
  let { adminName, password } = body;

  //make sure the fields are not null

  if (!adminName) {
    res.send({
      success: false,
      message: "adminName Field is empty",
    });
  }
  if (!password) {
    res.send({
      success: false,
      message: "adminName Field is empty",
    });
  }

  //make sure that the adminName does not exist
  Admin.find({ adminName: adminName }, (err, admins) => {
    if (err) {
      res.send({
        success: false,
        message: "Server Error",
      });
    }

    if (admins != 0) {
      return res.send({
        success: false,
        message: "The adminName already exists",
      });
    }

    //the admin is new
    //save the admin
    const newAdmin = new Admin({
      adminName,
      password,
    });

    //encrypt the password
    newAdmin.password = newAdmin.generateHash(password);

    newAdmin.save((err, admin) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      res.send({
        success: true,
        message: "New Admin Registered",
      });
    });
  });
});

module.exports = router;
