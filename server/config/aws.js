const aws = require('aws-sdk')

module.exports = {
    s3: new aws.S3({
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    })
}