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

//import data
const importData = async () => {
  await Medicine.find({})

  console.log('Medicine Data Updating going on')
  try {
    await Medicine.deleteMany();
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
    const sampleData = data.Details.pro_N.map((medicine) => {
      return { rid:medicine.rid,code:medicine.code,name: medicine.name, stock:medicine.stock, company:medicine.company, MRP:medicine.MRP, Rate:medicine.Rate, scode:medicine.Salt  };
    });
    await Medicine.insertMany(sampleData);
    console.log(`Data imported`.bgGreen.white);
    process.exit()
      // console.log("Document",doc)
    }
   catch (error) {
    console.log(`${error}`.america.bgRed.white);
    process.exit(1);
  }
};

importData()