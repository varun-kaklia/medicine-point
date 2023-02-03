const express = require("express");
const router = express.Router();
const orderAPI = require("../orderApi");
const dotenv = require("dotenv");
const contactEmail = require("../email");
const zlib = require("zlib");

dotenv.config();
const Order = require("../model/orderModel");

router.post("/placesellerorder", async (req, res) => {
  const { subTotal, currentSeller, cartItems, remarks, user } = req.body;
  // console.log("Request Body", req.body)
  const orderedItems = cartItems.map((name) => `${name.name}`);
  var arrayItemsName = "";
  var n;
  for (n in orderedItems) {
    arrayItemsName += orderedItems[n] + "<br/>";
  }
  // console.log("Name", arrayItemsName)
  const orderedItemsQuantity = cartItems.map(
    (quantity) => `${quantity.quantity}`
  );
  var arrayItemsQuantity = "";
  var q;
  for (q in orderedItemsQuantity) {
    arrayItemsQuantity += orderedItemsQuantity[q] + "<br/>";
  }

  const SellerId = currentSeller.RowID;
  const CustomerID = user.rid;
  const CustName = user.name;
  const apiOrder = cartItems;
  const productCode = apiOrder.map((code) => {
    return `${code.code}` + `${code.length - 1 ? "," : ""}`;
  });
  const orderQuantity = apiOrder.map((quantity) => {
    return `${quantity.quantity}` + `${quantity.length - 1 ? "," : ""}`;
  });

  const orderApiResponse = await orderAPI(
    CustomerID,
    CustName,
    productCode,
    orderQuantity,
    SellerId
  );
  // console.log("order Api Response", orderApiResponse)
  const { Details } = orderApiResponse;
  const [orderDetails] = Details.OrderDetails;
  const { OrderNo } = orderDetails;
  // console.log("Order Details from Api in Order Routes", OrderNo)
  const newOrder = new Order({
    name: user.name,
    email: user.email1,
    userid: user._id,
    remarks: remarks,
    CustomerID: user.rid,
    orderItems: cartItems,
    orderAmount: subTotal,
    OrderNo: OrderNo,
    sellerID: SellerId,
    orderBy: "Seller",
  });

  try {
    const mail = {
      from: process.env.GMAIL_USER,
      to: process.env.SIR_GMAIL,
      subject: "New Order",
      html: `<h1>New Order Email</h1>
      <p>Name: ${user.name}</p>
      <p>Email: ${user.email1}</p>
      <p>Address: ${user.address}</p>
      <p>Phone Number: ${user.phone1}</p>
      <p>Drug License Number: ${user.DlNo}</p>
      <p>Order By: Seller</p>
      <p>Seller Name:${currentSeller.name}</p>
      <p>Ordered Items-</p>
      <table>
      <tr>
      <th>Medicine Name</th>
      <th>Quantity</th>
      </tr>
      <tr>
      <td>${arrayItemsName}</td>
      <td>${arrayItemsQuantity}</td>
      </tr>
      </table>
      <p>Order Remarks:</p>
      <p>${remarks}</p>
      <p>SubTotal Of Products: ${subTotal}</p>
      <p>You got New Order On Website</p>
      `,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "Error" });
      } else {
        res.json({ status: "Email Sent" });
      }
    });
    newOrder.save();
    res.status(200).json({
      success: true,
      message: "Order Succesful",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

router.post("/placeorder", async (req, res) => {
  const {
    subTotal,
    newSubTotal,
    currentUser,
    useWallet,
    cartItems,
    wallets,
    remarks,
    pendingPoints,
  } = req.body;
  // console.log("Remarks", remarks)
  const orderedItems = cartItems.map((name) => `${name.name}`);
  var arrayItemsName = "";
  var n;
  for (n in orderedItems) {
    arrayItemsName += orderedItems[n] + "<br/>";
  }
  // console.log("Name", arrayItemsName)
  const orderedItemsQuantity = cartItems.map(
    (quantity) => `${quantity.quantity}`
  );
  // console.log("Ordered Items Name", orderedItemsQuantity)
  var arrayItemsQuantity = "";
  var q;
  for (q in orderedItemsQuantity) {
    arrayItemsQuantity += orderedItemsQuantity[q] + "<br/>";
  }

  const SellerId = "109411";
  const CustomerID = currentUser.rid;
  const CustName = currentUser.name;
  const apiOrder = cartItems;
  // console.log("API Order", apiOrder)
  const productCode = apiOrder.map((code) => {
    return `${code.code}` + `${code.length - 1 ? "," : ""}`;
  });
  // console.log("Product Code", productCode)
  const orderQuantity = apiOrder.map((quantity) => {
    return `${quantity.quantity}` + `${quantity.length - 1 ? "," : ""}`;
  });

  // console.log("Order Quantity", orderQuantity)
  const orderApiResponse = await orderAPI(
    CustomerID,
    CustName,
    productCode,
    orderQuantity,
    SellerId,
    remarks
  );

  const { Details } = orderApiResponse;
  // console.log("Order Api", Details)
  const [orderDetails] = Details.OrderDetails;
  const { OrderNo } = orderDetails;
  // console.log("Order Details from Api in Order Routes", OrderNo)
  // console.log("API Result in Order Routes", orderApiDetails)
  // console.log("API Result in Order Routes", apiDetals)
  // const  apiDetails = apiDetals && apiDetals.Details

  const newOrder = new Order({
    name: currentUser.name,
    email: currentUser.email1,
    userid: currentUser._id,
    useWallet: useWallet,
    wallets: wallets,
    remarks: remarks,
    CustomerID: currentUser.rid,
    orderItems: cartItems,
    orderAmount: subTotal,
    OrderNo: OrderNo,
    pendingPoints: pendingPoints,
  });

  try {
    const mail = {
      from: process.env.GMAIL_USER,
      to: process.env.SIR_GMAIL,
      subject: "New Order",
      html: `<h1>New Order Email</h1>
      <p>Name: ${currentUser.name}</p>
      <p>Email: ${currentUser.email1}</p>
      <p>Address: ${currentUser.address}</p>
      <p>Phone Number: ${currentUser.phone1}</p>
      <p>Drug License Number: ${currentUser.DlNo}</p>
      <p>User Wallet Balance: ${currentUser.wallet}</p>
      <p>User Use Wallet: ${useWallet === true ? "Yes" : "No"}</p>
      <p>Wallet Money used by party: ${wallets}</p>
      <p>Points Ear by Party:${pendingPoints}</p>
      <p>Ordered Items-</p>
      <table>
      <tr>
      <th>Medicine Name</th>
      <th>Quantity</th>
      </tr>
      <tr>
      <td>${arrayItemsName}</td>
      <td>${arrayItemsQuantity}</td>
      </tr>
      </table>
      <p>Order Remarks:</p>
      <p>${remarks}</p>
      <p>SubTotal Of Products: ${subTotal}</p>
      <p>New SubTotal on Products after Wallet Money Used: ${newSubTotal}</p>
      <p>You got New Order On Website</p>
      `,
    };
    // console.log("Mail Format", mail)
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "Error" });
      } else {
        res.json({ status: "Email Sent" });
      }
    });
    // console.log("API Result in Order Routes", orderApiRequest)
    newOrder.save();
    res.status(200).json({
      success: true,
      message: "Order Succesful",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

router.post("/getuserorder", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid }).sort({ _id: "-1" });
    res.status(200).send(orders);
  } catch (error) {
    res.status(401).json({
      message: "Something went Wrong",
      error: error.stack,
    });
  }
});

router.post("/getsellerorder", async (req, res) => {
  try {
    const sellerID = req.body.sellerID;
    const limit = req.body.limit || 8;
    console.log("Body Request", req.body);
    const orders = await Order.find({ orderBy: "Seller", sellerID: sellerID })
      .limit(limit)
      .sort({ createdAt: -1 });
    // console.log("Orders", orders)
    res.status(200).send(orders);
  } catch (error) {
    res.status(401).json({
      message: "Something went Wrong",
      error: error.stack,
    });
  }
});

router.post("/getorderbyid", async (req, res) => {
  const id = req.body.id;
  // console.log("Order id", id)
  try {
    const order = await Order.findOne({ _id: id });
    // console.log("Order",order)
    res.send(order);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/updateorder", async (req, res) => {
  const id = req.body._id;
  const deliveryBy = req.body.deliveryBy;
  console.log("Order id", id);
  try {
    const order = await Order.findOne({ _id: id });
    order.deliveryBy = deliveryBy;
    const finalData = await order.save();
    console.log("Final Data", finalData);
    res.status(200).json({
      status: 200,
      finalData,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/alluserorder", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    // console.log(orderid);
    order.isDelivered = true;
    await order.save();
    res.status(200).send("Order Delivered Successfully");
    window.location.href = "/admin/orderlist";
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error,
    });
  }
});

router.post("/assignDelivery", async (req, res) => {
  const { orderId } = req.body.orderId;
  const deliveryBy = req.body.deliveryBy;
  try {
    const order = await Order.findOne({ _id: orderId });
    console.log("Order in Order Routes", order);
    order.deliveryAssigned = true;
    order.deliveryBy = deliveryBy;
    await order.save();
    res.status(200).send("Order Delivery Assigned Successfully");
  } catch (error) {
    res.status(400).json({
      message: "Something went Wrong",
      error: error,
    });
  }
});

router.post("/generateOtp", async (req, res) => {
  const email = req.body.email;
  const { orderId } = req.body.orderId;
  try {
    const generateOtp = ("" + Math.random()).substring(2, 8);
    console.log("generate Otp", generateOtp);
    const order = await Order.findOne({ _id: orderId });
    // console.log("Order in Order routes", order)
    order.deliveryEmail = email;
    order.generatedOtp = generateOtp;
    const mail = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Delivery OTP Authentication",
      html: `<h1>Medicine Point</h1>
        <p>OTP for Delivery is: ${generateOtp}</p>
        <p>Don't share OTP to anyone.</p>
        `,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "Error" });
      } else {
        res.json({ status: "Email Sent" });
      }
    });
    await order.save();
    res.status(200).send("Otp Generated");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error,
    });
  }
});

router.post("/matchOtp", async (req, res) => {
  const otp = req.body.otp;
  console.log("Otp", otp);
  const { orderId } = req.body.orderId;
  try {
    const order = await Order.findOne({ _id: orderId });
    const dbOtp = order.generatedOtp;
    console.log("DB Otp", dbOtp);
    if (dbOtp == otp) {
      console.log("OTP verification started");
      order.generatOtp = "";
      order.isDelivered = true;
      await order.save();
      return res.status(200).send("OTP Authenticated Succesfully");
    } else {
      res.status(400).send("Wrong Otp");
    }
  } catch (error) {
    res.status(404).json({
      message: "Something went Wrong",
      error: error,
    });
  }
});

module.exports = router;
