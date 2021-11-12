const express = require("express");
const router = express.Router();

//import the model
const Customer = require("../../models/Customer");

router.post("/", (req, res) => {
  let { body } = req;
  let { customerName, password } = body;

  //make sure the fields are not null

  if (!customerName) {
    res.send({
      success: false,
      message: "customerName Field is empty",
    });
  }
  if (!password) {
    res.send({
      success: false,
      message: "customerName Field is empty",
    });
  }

  //make sure that the customerName does not exist
  Customer.find({ customerName: customerName }, (err, customers) => {
    if (err) {
      res.send({
        success: false,
        message: "Server Error",
      });
    }

    if (customers != 0) {
      return res.send({
        success: false,
        message: "The customerName already exists",
      });
    }

    //the admin is new
    //save the admin
    const newCustomer = new Customer({
      customerName,
      password,
    });

    //encrypt the password
    newCustomer.password = newCustomer.generateHash(password);

    newCustomer.save((err, admin) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server Error",
        });
      }

      res.send({
        success: true,
        message: "New Customer Registered",
      });
    });
  });
});

module.exports = router;
