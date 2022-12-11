const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const connectDB = require("./config/config");
const express = require('express')
const order = require('./model/orderModel')
const User = require('./model/userModel')

const app = express()

//config dot env and mongodb connection file
dotenv.config();
connectDB();

const updatePoints = async () => {
    const Orders = await order.find({})
    for (let i = 0; i < Orders.length; i++) { 
        // console.log("Order Length", Orders[i])
        if (Orders[i].isDelivered === false) { 
            if (Orders[i].dateisu && Orders[i].dateisu !== "" || null || undefined) {
                const orderNo = Orders[i].OrderNo
                const customerID = Orders[i].CustomerID
                console.log("customerID",customerID)
                const updateTransferPoints = Orders[i].pendingPoints
                const updatePendingPoints = 0
                const updateIsDelivered = true
                await order.findOneAndUpdate({ OrderNo: `${orderNo}` }, { $set: { transferPoints: updateTransferPoints, pendingPoints: updatePendingPoints, isDelivered: updateIsDelivered } })
                // console.log("Update Points", updatePointsOrder)
                const user = await User.findOne({ rid: customerID })
                console.log("User", user)
                const oldPoints = user.points
                console.log("Old Points", oldPoints)
                const updatePoints = updateTransferPoints + oldPoints
                console.log("UPdated Points", updatePoints)
                user.points = updatePoints
                const updateUserPoints = await user.save()
                console.log("UPdate POints", updateUserPoints)
                // console.log("Check Points",checkPointUpdate)
            }
        } else {
            console.log(`${Orders[i].OrderNo} Order Already Fullfilled`)
        }
    }
}

module.exports = updatePoints