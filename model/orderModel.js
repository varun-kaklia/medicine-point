const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Order Name Required"],
    },
    Status: {
      type: String,
    },
    useWallet: {
      type: Boolean,
      default:false
    },
    wallets: {
      type: Number
    },
    OrderID: {
      type: Number,
      default:0
    },
    CustomerID: {
      type: Number,
    },
    OrderNo: {
      type: Number,
    },
    datesub: {
      type: Date,
    },
    dateisu: {
      type: Date,
    },
    datedis: {
      type: Date,
    },
    points: {
      type: Number,
      default:0
    },
    remarks: {
      type: String,
    },
    pendingPoints: {
      type: Number,
      default: 0
    },
    transferPoints: {
      type: Number,
      default:0
    }
    ,
    sellerID: {
      type:String
    },
    orderBy: {
      type: String,
      default: "User"
    }
    ,
    email1: {
      type: String,
    },
    userid: {
      type: String,
    },
    deliveryAssigned:{
      type: Boolean,
      default: false
    }
    ,
    deliveryBy:{
      type:String,
    },
    generatedOtp:{
      type:Number
    },
    deliveryEmail:{
      type:String
    }
    ,
    orderItems: [],
    orderAmount: {
      type: Number,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
