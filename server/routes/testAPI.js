var express = require('express');
var router = express.Router();

router.get('/testing', (req, res, next)=>{
    res.send("testing the api");
})

module.exports = router;