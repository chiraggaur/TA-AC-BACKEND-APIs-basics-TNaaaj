var express = require("express");
var router = express.Router();
var BOOKS = require("../models/books");
var Comments = require("../models/comments");

/* GET book listing form. */
router.get("/", async function (req, res, next) {
  let booksdata = await BOOKS.find({});
  // console.log(booksdata);
  res.render("booksList", { BooksData: booksdata });
});
// get create book form
router.get("/form", function (req, res, next) {
  res.render("booksForm");
});
/* POST listed book into Database . */
router.post("/", function (req, res, next) {
  BOOKS.create(req.body);
  res.redirect("/api/books");
});
//get single book details by id
router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  let bookdata = await BOOKS.findById(id);
  let commentsdata = await Comments.find({ bookId: id });
  // console.log(bookdata);
  res.render("singleBook", { BookData: bookdata, CommentsData: commentsdata });
});
// get request to edit form
router.get("/edit/:id", async function (req, res, next) {
  let id = req.params.id;
  let bookData = await BOOKS.findById(id);
  res.render("BookEdit", { data: bookData });
});
// post request to update form
router.post("/update/:id", async function (req, res, next) {
  let id = req.params.id;
  await BOOKS.findByIdAndUpdate(id, req.body);
  res.redirect("/api/books/" + id);
});

// delete request to delete book
router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  await BOOKS.findByIdAndDelete(id);
  res.redirect("/api/books");
});

module.exports = router;
