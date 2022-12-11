const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    rid:{
      type: String,
      require: true,
    },
    code: {
      type: String,
      require:true,
    }
    ,
    stock: {
      type: Number,
      require: true,
    },
    company: {
      type: String,
      require: true,
    },
    MRP: {
      type: Number,
      require: true,
    },
    Rate: {
      type: Number,
      require: true,
    },
    scode: {
      type: String
    },
    Salt: {
      type: String,
    },
    category: {
      type: String,
      require: true,
    },
    pointsPage: {
      type: Boolean,
      default:false,
    },
    dailyOfferPage: {
      type: Boolean,
      default:false,
    },
    points: {
      type: Number
    },
    dailyRegularPrice: {
      type: Number
    },
    image: {
      type: String,
      default: "1.png"
    },
    twoLines:{
      type:String,
      default:"This is testing product so information may changes after sometime. So don't rely on these information."
    },
    firstDescription:{
      type:String,
      default:"This is testing description1 for our medicine."
    },
    secondDescription:{
      type:String,
      default:"This is testing description2 for our medicine."
    },
    thirdDescription:{
      type:String,
      default:"This is testing description3 for our medicine."
    },
    packet:{
      type:String,
      default:"100X11"
    }
  },
  { timestamps: true }
);

const medicineModel = mongoose.model("Medicine", medicineSchema);
module.exports = medicineModel;
