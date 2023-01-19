const express = require("express");
const router = express.Router();
const multer = require('multer');
const {v4: uuidv4} = require('uuid')
const medicineModel = require("../model/medicineModel");
let path = require('path')

//storage
const imgconfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./frontend/public/images/upload')
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

router.get('/company',async(req,res)=>{
  try {
    const companyData = await medicineModel.distinct('company')
    res.send(companyData)
  } catch (error) {
    res.json({message:error})
  }
})

router.get('/salt',async(req,res)=>{
  try {
    const saltData = await medicineModel.distinct("Salt")
    res.send(saltData)
  } catch (error) {
    res.json({message:error})
  }
})

router.post('/search',async(req,res)=>{
  try {
    const query = req.query.query || "";
    if(query.length>0){
      const searchMedicine = await medicineModel.find({name:{$regex:"^"+query,$options:"i"}}).sort({name:1})
      res.send(searchMedicine)
    }else{
      res.send("Please Enter Name of Medicine")
    }
  } catch (error) {
    res.json({message:error})
  }
})

router.post('/shopPageMedicine',async(req,res)=>{
  try {
    const query = req.query.query || "";
    console.log("Request Query",req.query)
    const page = parseInt(req.query.page) || 1;
    const limitValue = parseInt(req.query.limit) || "";
    const skipValue = (page-1) * limitValue;
    const total = await medicineModel.countDocuments();
    const pages = Math.ceil(total/limitValue)
    const brand = req.query.brand || ""
    const salt = req.query.salt || ""
    const sortQuery = req.query.select === "hightolow"? {Rate:-1}: req.query.select === "lowtohigh"? {Rate:1}:{name:1}
    const inStock = req.query.instock ==="true"? {$gt:0}:{$gte:0}
    const searchMedicine = await medicineModel.find({name:{$regex:"^"+query,$options:"i"},company:{$regex:brand,$options:'i'},Salt:{$regex:salt,$options:'i'},stock:inStock}).skip(skipValue).limit(limitValue).sort(sortQuery)
    const counts = searchMedicine.length
    if(page>pages){
      return res.status(404).json({
        status:"fail",
        message:"No Medicine Data Found..!"
      })
    }
    res.status(200).send({searchMedicine,page,pages,counts,total});
  } catch (error) {
    res.json({message:error})
  }
})

router.get("/pointsPage",async(req,res)=>{
  try {
  const medicine = await medicineModel.find({pointsPage:true})
  res.send(medicine)
} catch (error) {
  res.json({message:error})
}})

router.get("/dailyOfferPage",async(req,res)=>{
  try {
  const medicine = await medicineModel.find({dailyOfferPage:true})
  res.send(medicine)
} catch (error) {
  res.json({message:error})
}})

//get all medicines || @get request
router.get("/getAllMedicine", async (req, res) => {
  try {
    // console.log("Requested Query",req.query)
    const page = parseInt(req.query.page) || 1;
    const limitValue = parseInt(req.query.limit) || "";
    const skipValue = (page-1) * limitValue;
    const total = await medicineModel.countDocuments();
    const pages = Math.ceil(total/limitValue)
    const brand = req.query.brand || ""
    const salt = req.query.salt || ""
    const sortQuery = req.query.select === "hightolow"? {Rate:-1}: req.query.select === "lowtohigh"? {Rate:1}:{name:1}
    const inStock = req.query.instock ==="true"? {$gt:0}:{$gte:0}
    const medicines = await medicineModel.find({company:{$regex:brand,$options:'i'},Salt:{$regex:salt,$options:'i'},stock:inStock}).skip(skipValue).limit(limitValue).sort(sortQuery)
    const counts = medicines.length
    if(page>pages){
      return res.status(404).json({
        status:"fail",
        message:"No Page Found..!"
      })
    }
    res.json({medicines,page,pages,counts,total});
  } catch (error) {
    res.json({ message: error });
  }
});

//get all medicines || @get request
router.post("/addmedicine", async (req, res) => {
  const { medicine } = req.body;
  try {
    const newMedicine = new medicineModel({
      name: medicine.name,
      Rate: medicine.price,
      category: medicine.category,
      Salt: medicine.salt,
      company: medicine.company,
    });
    await newMedicine.save();
    res.status(201).send("New Medicine Added");
  } catch (error) {
    res.json({ message: error });
  }
});

//get all medicines || @get request
router.post("/getmedicinebyid", async (req, res) => {
  const id = req.body.id;
  try {
    const medicine = await medicineModel.findOne({ _id: id });
    res.send(medicine);
  } catch (error) {
    res.json({ message: error });
  }
});

//upload
const upload = multer({storage : imgconfig, fileFilter:filter})

//get all medicines || @get request
router.post(("/updatemedicine"),upload.single('image'), async (req, res) => {
  const id = req.body._id;
  const category = req.body.category;
  const twoLines = req.body.twoLines;
  const firstDescription = req.body.firstDescription;
  const secondDescription = req.body.secondDescription;
  const thirdDescription = req.body.thirdDescription;
  const packet = req.body.packet;
  const image = req.file.filename
  console.log("Update Medicine in Routes", req.body)
  try {
    const medicine = await medicineModel.findOne({ _id: id });
    medicine.category = category
    medicine.image = image
    medicine.twoLines = twoLines
    medicine.firstDescription = firstDescription
    medicine.secondDescription = secondDescription
    medicine.thirdDescription = thirdDescription 
    medicine.packet = packet 
    const finalData = await medicine.save();
    console.log("Final Data",finalData)
    res.status(200).json({
      status: 200,
      finalData
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/updateRawDataMedicine",async(req,res)=>{
  const id = req.body._id;
  const category = req.body.category;
  const twoLines = req.body.twoLines;
  const firstDescription = req.body.firstDescription;
  console.log("firstDescription", firstDescription)
  const secondDescription = req.body.secondDescription;
  console.log("secondDescription", secondDescription)
  const thirdDescription = req.body.thirdDescription;
  console.log("thirdDescription", thirdDescription)
  const packet = req.body.packet;
  try {
    const medicine = await medicineModel.findOne({ _id: id });
    medicine.category = category
    medicine.twoLines = twoLines
    medicine.firstDescription = firstDescription
    medicine.secondDescription = secondDescription
    medicine.thirdDescription = thirdDescription 
    medicine.packet = packet 
    const finalData = await medicine.save();
    // console.log("Final Data",finalData)
    res.status(200).json({
      status: 200,
      finalData
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/deletemedicine", async (req, res) => {
  const medicineId = req.body.medicineId;
  try {
    await medicineModel.findOneAndDelete({ _id: medicineId });
    res.status(200).send("Medicine Deleted Successfully");
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.post("/pointsPage", async (req, res) => {
  const medicineId = req.body.medicineId;
  console.log("Request Body", req.body)
  const {pointPageValue} = req.body.pageValue
  const {points} = req.body.points
  console.log("Points Page Value", pointPageValue)
  try {
    const medicine = await medicineModel.findOne({ _id: medicineId });
    medicine.pointsPage = pointPageValue;
    medicine.points = points;
    const finalData = await medicine.save()
    res.status(200).json({
      status: 200,
      finalData
    })
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.post("/dailyOffer", async (req, res) => {
  const medicineId = req.body.medicineId;
  console.log("Medicine Id", medicineId)
  const {dailyOfferPage} = req.body.dailyOfferPage
  const {dailyRegularPrice} = req.body.dailyRegularPrice
  console.log("Daily Offer Page", dailyOfferPage)
  try {
    const medicine = await medicineModel.findOne({ _id: medicineId });
    medicine.dailyOfferPage = dailyOfferPage
    medicine.dailyRegularPrice = dailyRegularPrice
    const finalData = await medicine.save()
    res.status(200).json({
      status: 200,
      finalData
    })
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = router;