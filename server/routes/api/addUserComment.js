const express = require("express");
const router = express.Router();

//import the models
const Comment = require("../../models/Comment");

/*
post a room
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { comment } = body;

  //make sure they are not blank

  if (!comment) {
    return res.send({
      success: false,
      message: "comment is empty",
    });
  } //field are not empty

  //save the room
  const newComment = new Comment({
    comment,
  });

  newComment.save((err, room) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }

    res.send({
      success: true,
      message: "Comment succesfully saved",
    });
  });
});

module.exports = router;
