var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var statesSchema = new Schema(
  {
    name: { type: String },
    country: { type: Schema.Types.ObjectId, ref: "country" },
    population: { type: String },
    area: { type: String },
    neighbouring_states: [{ type: Schema.Types.ObjectId, ref: "States" }], // doubt
  },
  { timestamps: true }
);

let Mymodel = mongoose.model("STATES", statesSchema);
module.exports = Mymodel;
