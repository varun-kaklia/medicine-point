const zlib = require('zlib')
const dotenv = require('dotenv')
dotenv.config()

const check = async (CustomerID,CustName,productCode, orderQuantity, SellerId, remarks) => {
    const raw = `{ "OrderID": "", "OrderNo": "0", "CustomerID": "${CustomerID}", "MargID": "${process.env.MARG_ID}", "Type": "S", "Sid": "${SellerId}", "ProductCode": "${productCode}", "Quantity": "${orderQuantity}", "Free": "", "Lat": "", "Lng": "", "Address": "", "GpsID": "0", "UserType": "1", "Points": "0.00", "Discounts": "0", "Transport": "", "Delivery": "", "Bankname": "", "BankAdd1": "", "BankAdd2": "", "shipname": "", "shipAdd1": "", "shipAdd2": "", "shipAdd3": "", "paymentmode": "1", "paymentmodeAmount": "0", "payment_remarks": "", "order_remarks": "${remarks}", "CustName": "${CustName}", "CustMobile": "9990903046", "CompanyCode": "${process.env.COMPANY_CODE}", "OrderFrom": "${process.env.ORDER_FROM}" }`

    const result = await fetch('https://wservices.margcompusoft.com/api/eOnlineData/InsertOrderDetail',
    {
        method: 'POST',
        body: raw,
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    }
    )
    const data = await result.json()
    const orderApiResponse = zlib.inflateRawSync(new Buffer.from(data, 'base64')).toString('utf-8').replace("﻿", "")
    return JSON.parse(orderApiResponse)
}

module.exports = check
