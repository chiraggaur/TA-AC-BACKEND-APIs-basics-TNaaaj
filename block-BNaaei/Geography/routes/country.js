var express = require("express");
var router = express.Router();
const Country = require("../models/Country");
const States = require("../models/States");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("countryHome");
});
// create list country form
router.get("/Form", function (req, res, next) {
  res.render("countryForm");
});
// post country data to db
router.post("/Form", function (req, res, next) {
  Country.create(req.body);
  res.redirect("/");
});
// Extract list of country  from db
router.get("/list", async function (req, res, next) {
  // let list = await Country.find({});
  const sort = { name: -1 };

  let list = await Country.find({}).sort(sort); // sorted in descending order of countries name
  res.render("countryList", { list });
});
// Extract indivisual details of country
router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  // let dataState = await States.find({}).sort({ name: -1 });
  let dataState = await States.find({}).sort({ population: -1 });
  let data = await Country.findById(id); // use async awiat with crud operations
  res.render("indivisual_Country", { countrydata: data, stateData: dataState });
});
// edit country details
router.get("/:id/edit", async function (req, res, next) {
  let id = req.params.id;
  let data = await Country.findById(id); // use async awiat with crud operations
  res.render("editForm", { data });
});
// update database when edited
router.post("/:id/update", async function (req, res, next) {
  let id = req.params.id;
  await Country.findByIdAndUpdate(id, req.body); // use async awiat with crud operations
  res.redirect("/" + id);
});
// delete country data from db
router.get("/:id/delete", async function (req, res, next) {
  let id = req.params.id;
  await Country.findByIdAndDelete(id); // use async awiat with crud operations
  res.redirect("/list");
});

module.exports = router;
