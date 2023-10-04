var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Comments = require("../models/comments");
//comments
router.post("/:id", function (req, res, next) {
  let id = req.params.id;
  req.body.bookId = id;
  Comments.create(req.body);
  res.redirect("/api/books/" + id); // comment collection created
});
// edit comments edit page
router.get("/:id/edit", async function (req, res, next) {
  let id = req.params.id;
  let comments = await Comments.findById(id);
  res.render("updateComment", { commentsData: comments });
});
// update comment
router.post("/:id/update", function (req, res, next) {
  let id = req.params.id;
  Comments.findByIdAndUpdate(id, req.body)
    .then((comment) => {
      // here for 1 last time comment will still be there with all the details
      res.redirect("/api/books/" + comment.bookId);
    })
    .catch((err) => {
      next(err);
    });
});

//delete comment;
router.get("/:id/delete", function (req, res, next) {
  let id = req.params.id;
  Comments.findByIdAndDelete(id)
    .then((comment) => {
      // here for 1 last time comment will still be there with all the details
      res.redirect("/api/books/" + comment.bookId);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
