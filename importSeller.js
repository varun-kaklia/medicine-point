const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const connectDB = require("./config/config");
const express = require('express')
const Seller = require('./model/sellerModel')

const app = express()

//config dot env and mongodb connection file
dotenv.config();
connectDB();

//import data
const importData = async () => {
  // await Seller.find({})

  console.log('Seller Data Update going on')
  try {
    await Seller.deleteMany();
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
    const sampleData = data.Details.Users.map((seller) => {
      return { RowID:seller.RowID, UserID:seller.UserID, name: seller.Name, email:seller.email, address:seller.Address1, mobile:seller.Mobile, type:seller.Type  };
    });
    await Seller.insertMany(sampleData);
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