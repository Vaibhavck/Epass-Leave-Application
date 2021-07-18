// var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
// var nodemailer = require('nodemailer');
var emailAndOtpUtils = require('../utils/emailAndOtp');

router.post('/sendOTP/', function(req, res, next){
    // console.log(req.body);
    var otpGenerated = emailAndOtpUtils.generateOTP();
    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.receiverEmail,
        subject: "PICT Epass Authentication",
        html: `Dear  Teacher/Student,<br>

Welcome to PICT Epass Application.<br>
Your response has been recorded. The auto generated One Time Password (OTP) for further process is <b>${otpGenerated}</b>, sent on Jul, 01, 2020 at 06:26.<br>

In case you have not logged into your Account, please contact project lead. You can also write an email at lastbit.hotmail@gmail.com<br>
Thank You
        `,
    }
    emailAndOtpUtils.transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("error sending mail!", error);
            res.send({
                status: false,
                message: "email sending failed!",
                otp: null,
            });
        }else{
            console.log("email sent to : ", info.response);
            res.send({
                status: true,
                message: "email sent successfully.",
                otp: otpGenerated
            });
        }
    })
});

module.exports = router;