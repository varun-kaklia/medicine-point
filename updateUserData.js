const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const connectDB = require("./config/config");
const express = require('express')
const User = require('./model/userModel')

const app = express()

//config dot env and mongodb connection file
dotenv.config();
connectDB();

//import data
const importUpdatedUser = async () => {
  // await Medicine.find({})
  console.log("User Data Updating Going On..")
  try {
    const response = await fetch(
      'http://api.medicinpoint.com/',
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
      const sampleData = data.Details.Party.map((user) => {return {rid:user.rid,address:user.address, name:user.name, balance:user.balance, DlNo:user.DlNo, email1:user.email1, phone1:user.phone1, gstin:user.GSTIN}})
    //   console.log("User Data",sampleData)
    for (let i = 0; i < sampleData.length; i++) {
      // console.log(sampleData[i])
      const rid = [sampleData[i]['rid']]
      // console.log('Filter RID-', {rid})
      const updateAddress = sampleData[i]['address']
      const updateName = sampleData[i]['name']
      const updateGstin = sampleData[i]['gstin']
      const updateBalance = sampleData[i]['balance']
      const updateDlNo = sampleData[i]['DlNo']
      const updatePhone1 = sampleData[i]['phone1']
      const updateEmail1 = sampleData[i]['email1']
      // console.log('Ready Update', update)
      const opt = { new: true, upsert: true }
      // let doc = Medicine.find({ rid })
      // console.log('Document Print', doc)
      await User.findOneAndUpdate({ rid }, { $set: {name:updateName, address: updateAddress,balance:updateBalance,GSTIN:updateGstin, DlNo:updateDlNo, email1:updateEmail1, phone1:updatePhone1 } }, opt, function (err, obj) {
        if (err) console.warn(err)
        // console.log(obj)
      }).clone()
    //   console.log("Document",doc)
    }
    // console.log("Data", sampleData )
    console.log(`User Data Updated`.bgMagenta.white);
    // process.exit();
  } catch (error) {
    console.log(`${error}`.america.bgRed.white);
    process.exit(1);
  }
};

// importUpdatedUser()

module.exports = importUpdatedUser

// LIVERFIT SYP 200ML 38