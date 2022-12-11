const mongoose = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const url = process.env.NEW_MONGO_URI;
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Database Connected! ${conn.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`error: ${error.Message}`.bgRed.white);
  }
};

module.exports = connectDB;
