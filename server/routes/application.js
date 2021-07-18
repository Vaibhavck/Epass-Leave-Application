const express = require('express');
const router = express.Router();
const storageBucket = require('../utils/firebaseStorage');
const generateApplication = require('../utils/generateApplication');
const signSVGImage = require('../utils/svgImages');
const request = require('request');
const pdf = require('html-pdf');
const dateFormat = require('dateformat');
const fs = require('fs');
const mongoose = require('mongoose');
const applicationModel = mongoose.model('applications');
const sendSMS = require('../utils/smsService');



router.post('/generateApplication', async (req, res, next)=>{

    // UNCOMMENT THE sendSMS FUNCTION FOR ENABLING SMS SERVICE //

    var applicationId =  generateApplication.generateApplicationId();
    var mobNo = req.body.mobNo;
    var regiId = req.body.regiId.toString();
    var branch = regiId[0] == "C" ? "COMP" : 
                ( regiId[0] == "I" ? "IT" : "ENTC" );
    var hodSign = branch === "COMP" ? signSVGImage.HOD_COMP_SIGN : 
        (branch === "IT" ? signSVGImage.HOD_IT_SIGN : signSVGImage.HOD_ENTC_SIGN);
    var applicationTemplate = generateApplication.htmlTemplate(hodSign);
    [
        ...Object.keys(req.body),
        'dept', 'dateApplied'
    ]
    .forEach(function eachKey(key) {
        if(applicationTemplate.includes('{%'+key+'%}')){
            if(key === 'dept'){
                applicationTemplate = applicationTemplate.replace('{%'+key+'%}', branch);
            }else if(key === 'dateApplied'){
                applicationTemplate = applicationTemplate.replace('{%'+key+'%}', dateFormat(new Date(), "dd-mm-yyyy"));
            }else{
                applicationTemplate = applicationTemplate.replace('{%'+key+'%}', req.body[key]);
            }
        }
    });
    
    var fileName = generateApplication.guidGenerator()
    pdf.create(applicationTemplate, generateApplication.options).toFile('assets/'+ fileName + '.pdf', async (err, result) => {
        if (err) return console.log(err);
        var fullPath = result.filename.split("\\");
        var filename = fullPath[fullPath.length-1]
        const firebaseStorageLocation = `applications/students/${branch}/${regiId}/${filename}`;
        storageBucket.upload(`${filename}`, {destination: firebaseStorageLocation}).
        then((resp)=>{
            storageBucket.file(firebaseStorageLocation).getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
              }).then(async signedUrls => {
                var applications = [{
                    regiId: regiId,
                    filename: fileName,
                    applicationId: applicationId,
                    dateApplied : Date.now(),
                    downloadURL : signedUrls[0],
                }];
                console.log("storing application in db");
                applicationModel.insertMany(applications, async (err, doc)=>{

                    if(err) throw err;

                    console.log(result.filename);
                    // await fs.unlinkSync(result.filename);
                    // sendSMS(mobNo, applicationId);
                    res.json({
                        status: true,
                        message: "application generated successfully!",
                        downloadURL: signedUrls[0]
                    })
                });
              }).catch(async (e)=>{
                // await fs.unlinkSync(result.filename);
                console.log("err1", e);
                res.send({
                    status: false,
                    message: "could not generate application",
                    downloadURL: null
                })
            })
        }).catch(async (e)=>{
            // await fs.unlinkSync(fullPath);
            console.log("err2", e);
            res.send({
                status: false,
                message: "could not generate application",
                downloadURL: null
            })
        })
        // res.send(result);
    });
});

router.post('/downloadApplication', function (req, res, next) {
    // storageBucket.file('applications/students/IT/I2K18102462/1dd1edda4277c143.pdf')
    // .download({destination: './testtesttest.pdf'})
    // .then(()=>res.send("downloadApplication"))
    // .catch((err)=>res.send(err));

    request({url: req.body.url}, (err, res)=>{
        if(err) throw err;
        if(res) console.log("res => ", res);
    })
})

router.post('/getApplicationHistroy', (req, res, next)=>{
    var regiId = req.body.regiId;
    // console.log(req.body.regiId);
    // applicationModel
    applicationModel
    .find({regiId : regiId}, (err, doc)=>{
        // console.log("doc", doc);
        if(err) res.send({
            status : false,
            message : err,
            history : null
        })
        if(doc)
        res.send({
            status : true,
            message : "application history fetched successfully",
            applications : doc
        });
    })
})

module.exports = router;