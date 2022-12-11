const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false
    },
    rid: {
      type: Number,
    },
    email1: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    balance:{
      type: Number,
    },
    phone1: {
      type: Number,
      required: false
    },
    DlNo: {
      type: String,
      required: false
    },
    GSTIN: {
      type: String,
      required: false
    },
    password: {
      type: String,
      default:"1234"
    },
    points: {
      type: Number,
      required:true,
      default:0
    },
    wallet: {
      type: Number,
      default: 0,
      required:true
    },
    isAdmin: {
      type: Boolean,
      default: "false",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
