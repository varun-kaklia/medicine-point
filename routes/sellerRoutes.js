const express = require("express");
const router = express.Router();
const Seller = require("../model/sellerModel");
const dotenv = require('dotenv')

dotenv.config()

router.post("/login", async (req,res) => {
  // console.log("Request from Body",req.body)
  const { email, name, password, date } = req.body;
  if (!req.body.name) {
    try {
      // const seller = await Seller.find({ email, password });
      const seller = await Seller.findOneAndUpdate({ email, password },{$push:{date:date}});
      // console.log("Seller Details",seller)
      res.status(200).send(seller)
      // if (seller !== null || undefined || "") {
      //   console.log("new Seller Details starting")
      //   const currentSeller = {
      //     name: seller[0].name,
      //     email: seller[0].email,
      //     _id: seller[0]._id,
      //     address: seller[0].address,
      //     mobile: seller[0].mobile,
      //     RowID: seller[0].RowID,
      //     UserID: seller[0].UserID,
      //   };
      //   console.log("Get Seller", currentSeller)
      //   res.status(200).send(seller);
      // } else {
      //   res.status(400).json({
      //     message: "Login Failed",
      //   });
      // }
    } catch (error) {
      res.status(404).json({
        message: "Something Went wrong",
        
      });
    }
  } else {
    try {
      const seller = await Seller.findOneAndUpdate({ name, password },{$push:{date:date}});
      // console.log("Seller Details",seller)
      res.status(200).send(seller)
      // if (seller !== null || undefined || "") {
      //   console.log("new Seller Details starting")
      //   const currentSeller = {
      //     name: seller[0].name,
      //     email: seller[0].email,
      //     _id: seller[0]._id,
      //     address: seller[0].address,
      //     mobile: seller[0].mobile,
      //     RowID: seller[0].RowID,
      //     UserID: seller[0].UserID,
      //   };
      //   console.log("Get Seller", currentSeller)
      //   res.status(200).send(seller);
      // } else {
      //   res.status(400).json({
      //     message: "Login Failed",
      //   });
      // }
    } catch (error) {
      res.status(404).json({
        message: "Something Went wrong",
        
      });
    }
  }
})

router.get("/getallseller", async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.status(200).send(sellers);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});


module.exports = router;