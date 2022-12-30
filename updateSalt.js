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

const udpateSalt = async () => {
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

    console.log("Salt Data Update Going on...")
    const filterData = data && data?.Details?.Stype.filter((tar) => tar && tar?.sgcode.includes("SALT "))
    // console.log("filter data", filterData)
    const saltData = filterData && filterData.map((salt) => { return { rid: salt.rid, sgcode:salt.sgcode, name: salt.name, scode: salt.scode.replace(/\s+/g,' ').trim() } });
    // console.log("Sample Data", sampleData)

    // This code to update Salt works perfectly
    for (let i = 0; i < saltData.length; i++) {
      const scode = saltData[i]['scode']
      // console.log("Finding SCode",scode)
      const updateSaltName = saltData[i]['name']
      // console.log("Name for Updation",updateName)
      await Medicine.updateMany({ scode:`${scode}` }, { $set: { Salt: `${updateSaltName}` } })
      // console.log("Updated Salt", updateSalt)
    }

    console.log("Salt Data Updated".bgCyan.white)
    // process.exit();
  } catch (error) {
    console.log(`${error}`.america.bgRed.white);
    process.exit(1);
  }
};

// udpateSalt()
// setInterval(importUpdatedMedicine,360000)
module.exports = udpateSalt

// LIVERFIT SYP 200ML 38