const express = require("express");
const dotenv = require("dotenv");
const path = require('path')
const connectDB = require("./config/config");
const morgan = require("morgan");
const cors = require('cors')
const importUpdatedMedicine = require('./updateMedicineData')
const importUpdatedUser = require('./updateUserData')
const updateOrderStatus = require("./checkOrderStatus")
const udpateSalt = require("./updateSalt")
const updatePoints = require('./updatePoints')
// const importUpdatedSalt = require('./updateSalt')
const bodyParser = require('body-parser')
require("colors");

//config dotenv
dotenv.config();

//connection mongodb
connectDB();
const app = express();

// import update Medicine & User
// setInterval(() => { importUpdatedMedicine(); importUpdatedUser(); }, 720000)
setInterval(importUpdatedMedicine,300000)
setInterval(importUpdatedUser, 180000)
setInterval(updateOrderStatus, 1800000)
setInterval(udpateSalt, 1800000)
setInterval(updatePoints,7200000)

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json())

app.use(cors())

// importUpdatedMedicine()
// importUpdatedUser()

//route
app.use("/api/medicines", require("./routes/medicineRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/seller", require("./routes/sellerRoutes"));
app.use('/api/slider',require('./routes/sliderRoutes'));
app.use("/images",express.static(path.join(__dirname,"./frontend/public/images")))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/frontend/build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
  })
}else{
  app.get("/", (req, res) => {
    res.send("<h1>Server is live now.</h1>");
  });
}




const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} mode on port no. ${process.env.PORT}`
      .bgMagenta.white
  );
});