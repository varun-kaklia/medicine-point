const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const Medicine = require("./model/medicineModel");
const User = require('./model/userModel')
const connectDB = require("./config/newConfig");

//config dot env and mongodb connection file
dotenv.config();
connectDB();

//import User data
const importUser = async () => {
  try {
    await User.deleteMany({isAdmin:false});
    console.log("User Details", User)
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
    const userData = data.Details.Party.map((user) => {
      return { ...user };
    });
    await User.insertMany(userData);
    console.log(`User imported`.bgGreen.white);
    process.exit();
  } catch (error) {
    console.log(`${error}`.america.bgRed.white);
    process.exit(1);
  }
};


importUser()