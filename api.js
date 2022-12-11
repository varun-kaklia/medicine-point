const zlib = require('zlib')
const dotenv = require('dotenv')
dotenv.config()

const api = async () => {
    const raw = `{ "MargID": "${process.env.MARG_ID}", "CompanyCode": "${process.env.COMPANY_CODE}", "Datetime":"0","index":0 }`
    console.log("Raw Data =", raw)
    
    const result = await fetch('https://wservices.margcompusoft.com/api/eOnlineData/MargMST2017',
    {
        method: 'POST',
        body: raw,
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
        }
    }
    )
    const data = await result.json()
    console.log(data)
    // const decode = Buffer.from(data,'base64url').toString('utf-8')
    // console.log("Decode-", decode)
    const apiReturn = zlib.inflateRawSync(new Buffer.from(data,'base64')).toString()
    console.log("Decoding", apiReturn)
    // process.exit()

// const decompressData = zlib.inflateSync(Buffer.from(data, 'base64')).trim()
    // console.log(decompressData)
}

api()