const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

router.get('/me', auth, async (req, res, next)=>{
    res.send(req.user);
});

router.post('/logout', auth, async(req, res)=>{
    console.log("logging out");
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        });
        await req.user.save();

        res.status(200).send({message: "user logged out"});
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.post('/logoutAll', auth, async(req, res)=>{
    console.log("logging out");
    try{
        req.user.tokens = [];
        await req.user.save();

        res.status(200).send({message: "all users logged out"});
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.post('/login', async (req, res, next)=>{
    try{
        const user = await User.findByCredentials(req.body.regiId, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(e){
        console.log("eeeeerrrr | ", e);
        res.status(400).send();
    }
});

router.post('/register', async (req, res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    console.log("testing", req.body);

    User.insertMany([{
        regiId: req.body.regiId,
        name: req.body.name,
        rollNo: req.body.rollNo,
        mobNo: req.body.mobNo,
        email: req.body.email,
        password: hashedPassword
    }], async (err, users)=>{
        console.log("errr", err);
        if(err) res.status(400).send();
        else{
            const token = await users[0].generateAuthToken();
            res.status(201).send({user:users[0], token});
        }
    });
});
 
module.exports = router;