const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const connectDB = require("./config/config");
const express = require('express')
const Medicine = require('./model/medicineModel')

const app = express()

//config dot env and mongodb connection file
dotenv.config();
connectDB();

const importUpdatedMedicine = async () => {
  // await Medicine.find({})

  console.log('Medicine Data Updating going on')
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
    const sampleData = data.Details.pro_N.map((medicine) => { return { rid: medicine.rid, code:medicine.code, name: medicine.name, stock: medicine.stock, company: medicine.company, MRP: medicine.MRP, Rate: medicine.Rate,Salt:medicine.Salt } });
    // console.log("Sample Data", sampleData)
    for (let i = 0; i < sampleData.length; i++) {
      // console.log(sampleData[i])
      const rid = [sampleData[i]['rid']]
      // console.log('Filter RID-', {rid})
      const updateCode = sampleData[i]['code']
      const updateStock = sampleData[i]['stock']
      const updateName = sampleData[i]['name']
      const updateMRP = sampleData[i]['MRP']
      const updateRate = sampleData[i]['Rate']
      const updateCompany = sampleData[i]['company']
      // console.log("Company Name", updateCompany)
      const updateSalt = sampleData[i]['Salt']
      // console.log("Salt", updateSalt)
      // console.log('Ready Update', update)
      const opt = { new: true, upsert: true }
      // let doc = Medicine.find({ rid })
      // console.log('Document Print', doc)
      await Medicine.findOneAndUpdate({ rid }, { $set: {name:updateName,code:updateCode, stock: updateStock,MRP:updateMRP, Rate:updateRate,company: updateCompany,scode: updateSalt } }, opt, function (err, obj) {
        if (err) console.warn(err)
        // console.log(obj)
      }).clone()
      // console.log("Document",doc)
    }
    // console.log("Data", sampleData )
    console.log(`Data Updated`.bgMagenta.white);
    // process.exit();
  } catch (error) {
    console.log(`${error}`.america.bgRed.white);
    process.exit(1);
  }
};

// setInterval(importUpdatedMedicine,360000)
module.exports = importUpdatedMedicine

// LIVERFIT SYP 200ML 38