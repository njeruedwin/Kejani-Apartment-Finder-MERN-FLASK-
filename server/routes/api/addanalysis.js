const express = require("express");
const router = express.Router();

//import the models
const Analysis = require("../../models/Analysis");
//import Aspects models
const Electricity = require("../../models/Aspects/Electricity");
const Water = require("../../models/Aspects/Water");

/*
Add Analysis
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { housingCooperativeName, customerName, sentiment, comment, aspect } =
    body;

  //make sure they are not blank
  if (!housingCooperativeName) {
    return res.send({
      success: false,
      message: "Housing Cooperative name field should not be empty",
    });
  }
  if (!customerName) {
    return res.send({
      success: false,
      message: "Customer name field should not be empty",
    });
  }
  if (!comment) {
    return res.send({
      success: false,
      message: "Comment field should not be empty",
    });
  }
  if (!sentiment) {
    return res.send({
      success: false,
      message: "polarity field should not be empty",
    });
  }
  if (!aspect) {
    return res.send({
      success: false,
      message: "Please select an aspect from the dropdown",
    });
  }

  //Work With Aspects

  /*
Electricity
  */
  if (aspect === "Electricity") {
    Electricity.find(
      { housingCooperativeName: housingCooperativeName },
      (err, housings) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server Error",
          });
        }

        //get add 1 to the number of comments given to the housing co-op
        const housing = housings[0];
        var commentCounts = housing.commentCounts + 1;
        var positivesCounts = housing.positivesCounts;

        if (sentiment === "pos") {
          positivesCounts = positivesCounts + 1;
        }
        if (sentiment === "neg") {
          positivesCounts = positivesCounts - 1;
        }
        var positivityPercentage = (positivesCounts / commentCounts) * 100;

        //update the housing Cooperative Information
        Electricity.updateOne(
          { housingCooperativeName: housingCooperativeName },
          {
            positivesCounts: positivesCounts,
            commentCounts: commentCounts,
            positivityPercentage: positivityPercentage,
          }
        )
          .then(() => {
            res.send({
              success: true,
              message: "New Analysis Added. Housing Updated",
            });
          })
          .catch((error) => {
            return res.send({ message: error });
          });
      }
    );
  }

  /*
Water
  */
  if (aspect === "Water") {
    Water.find(
      { housingCooperativeName: housingCooperativeName },
      (err, housings) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server Error",
          });
        }

        //get add 1 to the number of comments given to the housing co-op
        const housing = housings[0];
        var commentCounts = housing.commentCounts + 1;
        var positivesCounts = housing.positivesCounts;

        if (sentiment === "pos") {
          positivesCounts = positivesCounts + 1;
        }
        if (sentiment === "neg") {
          positivesCounts = positivesCounts - 1;
        }
        var positivityPercentage = (positivesCounts / commentCounts) * 100;

        //update the housing Cooperative Information
        Water.updateOne(
          { housingCooperativeName: housingCooperativeName },
          {
            positivesCounts: positivesCounts,
            commentCounts: commentCounts,
            positivityPercentage: positivityPercentage,
          }
        )
          .then(() => {
            res.send({
              success: true,
              message: "New Analysis Added. Housing Updated",
            });
          })
          .catch((error) => {
            return res.send({ message: error });
          });
      }
    );
  }

  //save the analysis
  const newAnalysis = new Analysis({
    housingCooperativeName,
    customerName,
    sentiment,
    comment,
  });
  newAnalysis.save((err, analysis) => {
    if (err) {
      return res.send({
        success: false,
        message: err,
      });
    }
  });
});

module.exports = router;
