var express = require("express");
var router = express.Router();
var States = require("../models/States");
// create list country form
router.get("/:id/Form", function (req, res, next) {
  let countryId = req.params.id;
  res.render("statesForm", { id: countryId });
});
// post country data to db
router.post("/:id", async function (req, res, next) {
  let id = req.params.id;
  req.body.country = id;
  await States.create(req.body);
  // console.log(req.body);
  res.redirect("/" + id);
});

module.exports = router;
