const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const HousingCooperativeSchema = new mongoose.Schema({
  housingCooperativeName: {
    type: String,
    default: "",
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    default: "",
    required: true,
  },
  phoneNumber: {
    type: String,
    default: "",
    required: true,
  },
  addressOne: {
    type: String,
    default: "",
    required: true,
  },
  addressTwo: {
    type: String,
    default: "",
    required: true,
  },
  location: {
    type: String,
    default: "",
    required: true,
  },
  description: {
    type: String,
    default: "",
    required: true,
  },
});

//set up methods for the user schema
//generate hash
HousingCooperativeSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//compare the passwords
HousingCooperativeSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("HousingCooperative", HousingCooperativeSchema);
