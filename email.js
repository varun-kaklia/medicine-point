const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()


    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth: {
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS
        },
    })
    
    transporter.verify((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Ready to Send Email")
        }
    })


// contactEmail()
module.exports = transporter