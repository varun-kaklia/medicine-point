const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const connectDB = require("./config/config");
const express = require('express')
const Order = require('./model/orderModel')

const app = express()

//config dot env and mongodb connection file
dotenv.config();
connectDB();

//import data
const updateOrderStatus = async () => {
  // await Medicine.find({})
  console.log("Order Data Updating Going On..")
  try {
    const response = await fetch(
      'http://api2.medicinpoint.com/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Data", data)
    const sampleData = data.Details.OrderInfo.map((order) => {return {OrderID:order.OrderID, datesub:order.datesub, dateisu:order.dateisu, datedis:order.datedis}})
    //   console.log("Order Data",sampleData)
    for (let i = 0; i < sampleData.length; i++) {
      // console.log(sampleData[i])
      const OrderID = [sampleData[i]['OrderID']]
      // console.log('Filter RID-', {rid})
      const updateSubDate = sampleData[i]['datesub']
      const updateIssueDate = sampleData[i]['dateisu']
      const updateDisDate = sampleData[i]['datedis']
      await Order.findOneAndUpdate({ OrderNo:`${OrderID}` }, { $set: {datesub:updateSubDate, dateisu: updateIssueDate, datedis:updateDisDate} }, function (err, obj) {
        if (err) console.warn(err)
        // console.log(obj)
      }).clone()
    //   console.log("Document",doc)
    }
    // console.log("Data", sampleData )
    console.log(`Order Data Updated`.bgMagenta.white);
    // process.exit();
  } catch (error) {
    console.log(`${error}`.america.bgRed.white);
    process.exit(1);
  }
};

// updateOrderStatus()

module.exports = updateOrderStatus

// LIVERFIT SYP 200ML 38