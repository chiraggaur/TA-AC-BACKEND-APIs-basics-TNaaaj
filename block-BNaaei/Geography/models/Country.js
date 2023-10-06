var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var countrySchema = new Schema(
  {
    name: { type: String },
    states: [{ type: Schema.Types.ObjectId, ref: "states" }],
    continent: { type: String },
    population: { type: String },
    ethnicity: [{ type: String }],
    neighbouring_countries: [{ type: Schema.Types.ObjectId }], // doubt
    area: { type: String },
  },
  { timestamps: true }
);

let Mymodel = mongoose.model("COUNTRY", countrySchema);
module.exports = Mymodel;
