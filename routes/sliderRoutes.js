const express = require("express");
const router = express.Router();
const multer = require('multer');
const {v4: uuidv4} = require('uuid')
const sliderSchema = require("../model/sliderHandle");
let path = require('path');

//storage
const imgconfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./frontend/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4()+ "-" +Date.now() + path.extname(file.originalname))
    }
  })
  
  //filter
  const filter = (req, file, cb) => {
    const allowedFile = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedFile.includes(file.mimetype)) {
      cb(null,true)
    } else {
      cb(null, false)
    }
  }

  
//upload
const upload = multer({storage : imgconfig, fileFilter:filter})

router.post("/updateSlider",upload.single('image'),async(req,res)=>{
    const name = req.body.name
    const image = req.file.filename
      try {            
          const slider = await sliderSchema.findOne({})
          slider.name = name
          slider.image = image
          const updateSlider = await slider.save()
          res.status(200).json({
              message:"Image Updated",
              updateSlider
          })
      } catch (error) {
          res.status(400).json({message:error})
      }
})

router.get("/getSliderImage", async (req,res)=>{
  try {
    const slider = await sliderSchema.findOne({});
    res.send(slider);
  } catch (error) {
    res.json({ message: error });
  }
})

module.exports = router