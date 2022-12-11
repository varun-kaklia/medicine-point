const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const Medicine = require("./model/medicineModel");
const connectDB = require("./config/config");

//config dot env and mongodb connection file
dotenv.config();
connectDB();

//import data
const importData = async () => {
  try {
    await Medicine.deleteMany();
    const response = await fetch(
      'https://medicinpoint.com/api.php',
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
    const sampleData = data.Details.pro_N.map((medicine) => {
      return { ...medicine };
    });
    await Medicine.insertMany(sampleData);
    console.log(`Data imported`.bgGreen.white);
    process.exit();
  } catch (error) {
    console.log(`${error}`.america.bgRed.white);
    process.exit(1);
  }
};


const dataDestroy = () => {};
if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  importData();
}