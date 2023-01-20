const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const dotenv = require('dotenv')
const contactEmail = require("../email")

dotenv.config()

router.post("/register", (req, res) => {
  const {
    name,
    email1,
    address,
    phone1,
    DlNo,
    password,
    GSTIN,
    confirmPassword,
  } = req.body;
  const newUser = new User({
    name,
    email1,
    address,
    phone1,
    DlNo,
    password,
    GSTIN,
    confirmPassword,
  });
  try {
    const mail = {
      from: process.env.GMAIL_USER,
      to: process.env.SIR_GMAIL,
      subject: "New User Registration",
      html: 
      `<h1>New User Registration Email</h1>
      <p>Name: ${name}</p>
      <p>Email: ${email1}</p>
      <p>Address: ${address}</p>
      <p>Phone Number: ${phone1}</p>
      <p>Drug License Number: ${DlNo}</p>
      <p>GST Number: ${GSTIN}</p>
      <p>Please Create New Account in MARG ERP</p>
      `
    }
    // console.log("Mail Format", mail)
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({status:"Error"})
      } else {
        res.json({status:"Email Sent"})
      }
    })
    // newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Succesful",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

router.post('/updateUserbyadmin', async (req, res) => {
  const point = req.body.points
  const wallet = req.body.wallet
  const rid = req.body.rid
  const password = req.body.password
  if (rid) {
    try {
      const [user] = await User.find({ rid })
      user.points = point
      user.wallet = wallet
      user.password = password
      const updatePointByAdmin = await user.save()
      res.status(200).json({
        message: "User Point by Admin Updated Succesfully",
        updatePointByAdmin
      })
    } catch (error) {
      res.status(400).json({
        message:error
      })
    }
  }
})

router.post('/updatepoint', async (req, res) => {
  const point = req.body.point
  // const wallet = req.body.currentUser.wallet
  const { rid } = req.body.currentUser;
  const  wallet  = req.body.wallet;
  // console.log("Body Request", req.body)
  const { email1 } = req.body.currentUser;
  if (rid) {
    try {      
      const [user] = await User.find({ rid });
      // console.log("user Find in database-", user)
      // console.log("user POints in database-", user.points)
      user.points = point
      user.wallet = wallet
      const updatePoints = await user.save()
      // console.log("UPdate POints", updatePoints)
      res.status(200).json({
        message: "User Points Updated",
        updatePoints
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  } if (!rid && email1) {
      try {      
      const [user] = await User.find({ email1 });
      // console.log("user Find in database-", user)
      // console.log("user POints in database-", user.points)
        user.points = point
        user.wallet = wallet
      const updatePoints = await user.save()
      // console.log("UPdate POints", updatePoints)
      res.status(200).json({
        message: "User Points Updated",
        updatePoints
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  }
})

router.post('/updateUser',async (req,res)=>{
  const {rid,email1} = req.body
  // console.log("User",req.body)
  if(req.body.rid){
    try {
      const user = await User.find({ rid });
      if (user.length > 0) {
        const currentUser = {
          name: user[0].name,
          email1: user[0].email1,
          isAdmin: user[0].isAdmin,
          _id: user[0]._id,
          balance: user[0].balance,
          address: user[0].address,
          phone1: user[0].phone1,
          DlNo: user[0].DlNo,
          rid: user[0].rid,
          wallet: user[0].wallet,
          points: user[0].points,
        };
        // console.log("Get User in User Routes of Backend", currentUser)
        res.status(200).send(currentUser);
      } else {
        res.status(400).json({
          message: "Couldn't able to find details.",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "Something Went wrong",
        
      });
    }
  }else{
    try {
      const user = await User.find({ email1 });
      if (user.length > 0) {
        const currentUser = {
          name: user[0].name,
          email1: user[0].email1,
          isAdmin: user[0].isAdmin,
          _id: user[0]._id,
          balance: user[0].balance,
          address: user[0].address,
          phone1: user[0].phone1,
          DlNo: user[0].DlNo,
          rid: user[0].rid,
          wallet: user[0].wallet,
          points: user[0].points,
        };
        // console.log("Get User in User Routes of Backend", currentUser)
        res.status(200).send(currentUser);
      } else {
        res.status(400).json({
          message: "Couldn't able to find details.",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "Something Went wrong",
        
      });
    }
  }

})

router.post("/login", async (req, res) => {
  const { email1, name, password } = req.body;
  if (!req.body.name) {
    try {
      const user = await User.find({ email1, password });
      if (user.length > 0) {
        const currentUser = {
          name: user[0].name,
          email1: user[0].email1,
          isAdmin: user[0].isAdmin,
          _id: user[0]._id,
          balance: user[0].balance,
          address: user[0].address,
          phone1: user[0].phone1,
          DlNo: user[0].DlNo,
          rid: user[0].rid,
          wallet: user[0].wallet,
          points: user[0].points,
        };
        // console.log("Get User in User Routes of Backend", currentUser)
        res.status(200).send(currentUser);
      } else {
        res.status(400).json({
          message: "Login Failed, Email Or Password Wrong",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "Something Went wrong",
        
      });
    }
  } else {
    try {
      const user = await User.find({ name, password });
      // console.log("User Details",user)
      if (user.length > 0) {
        const currentUser = {
          name: user[0].name,
          email1: user[0].email1,
          isAdmin: user[0].isAdmin,
          _id: user[0]._id,
          balance: user[0].balance,
          address: user[0].address,
          phone1: user[0].phone1,
          DlNo: user[0].DlNo,
          rid: user[0].rid,
          wallet: user[0].wallet,
          points: user[0].points,
        };
        // console.log("Get User", currentUser)
        res.status(200).send(currentUser);
      } else {
        res.status(400).json({
          message: "Login Failed, Name Or Password Wrong",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "Something Went wrong",
        
      });
    }
  }

});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

router.post('/findUserBySeller',async(req,res)=>{
  try {
    const searchUser = req.body.searchUser
    const users = await User.find({name:{$regex:searchUser, $options:'i'}}).sort({name:"1"})
    res.status(200).send(users)
  } catch (error) {
   res.status(404).json({message:error.stack}) 
  }
})

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

router.post("/getuserbyid", async (req, res) => {
  const rid = req.body.rid;
  try {
    const user = await User.findOne({ rid: rid });
    // console.log("User", user)
    res.send(user);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
