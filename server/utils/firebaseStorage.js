var admin = require("firebase-admin");
var serviceAccount = require('../config/pict-epass-firebase-adminsdk-48paz-f487c38ef4.json');
var serviceAccount = require('../config/pict-e-pass-firebase-adminsdk-2lqwd-78f861cffb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://pict-e-pass.appspot.com'
  // storageBucket: 'gs://pict-epass.appspot.com'
});

var storageBucket = admin.storage().bucket(); 

module.exports = storageBucket;