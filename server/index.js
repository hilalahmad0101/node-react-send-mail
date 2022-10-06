const express = require('express');
const app = express();
const port = 5000;
const nodemailer = require('nodemailer');
const cors=require('cors');
const { USERNAME, PASSWORD } = require('./config.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USERNAME,
        pass: PASSWORD
    }
})



app.post('/send-mail', function (req, res) {
    try {
        const { email, body } = req.body;
        if(!email || !body){
            return res.send({
                success: false,
                message: 'Please fill all the field'
            })
        }else{
        const mailOptions = {
            from: USERNAME,
            to: email,
            subject: 'node and react js email sending',
            text: body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.send({
                    success: false,
                    message: error.message
                })
            } else {
                return res.send({
                    success: true,
                    message: "Message Send Successfully"
                })
            }
        });
    }
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})