const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false
    },
    RowID: {
      type: Number,
    },
    UserID: {
      type:String
    },
    email: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    mobile: {
      type: Number,
      required: false
    },
    type: {
      type:String
    },
    password: {
      type: String,
      default:"1234"
    },
    date:[]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
