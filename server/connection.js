const mongoose = require('mongoose');
require('dotenv').config();
require('./models/testModel');
require('./models/userModel');
require('./models/fileModel');
require('./models/applicationModel');

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI.toString(), { useNewUrlParser: true, useUnifiedTopology: true }, (error)=>{
    if(error){
        console.log('connection error : ', error);
    }else{
        console.log("connected to database");
    }
});

mongoose.connection.once('open', ()=>{
    console.log("database is up");
}).on('error', function(error){
    console.log('connection error : ', error);
})