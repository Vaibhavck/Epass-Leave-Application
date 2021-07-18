const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: 'f4b6762c',
    apiSecret: 'clwr1ExL7jozzlih',
});


module.exports = function(mobNo, applicationId){
    console.log("sending msg to ", mobNo);
    const from = 'Vonage APIs';
    const to = `91${mobNo}`;
    const text = `Your Application has been submitted for verification successfully. 
Application Id is : ${applicationId}. You can check application status using this id.`;
    nexmo.message.sendSms(from, to, text);
}