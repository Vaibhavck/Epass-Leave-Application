var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    "USER LOGIN" : {
      route: "/auth/login",
      data : "{regiId, password}"
    },

    "USER REGISTER" : {
      route: "/auth/register",
      data : "regiId , name, rollNo, mobNo, email, password"
    }
  })
});

module.exports = router;
