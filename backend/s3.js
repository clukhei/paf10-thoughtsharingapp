

const AWS = require('aws-sdk')
require('dotenv').config()

const AWS_S3_HOSTNAME = process.env.AWS_S3_HOSTNAME;
const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY;
const AWS_S3_SECRET_ACCESSKEY = process.env.AWS_S3_SECRET_ACCESSKEY;
const AWS_S3_BUCKETNAME = process.env.AWS_S3_BUCKETNAME;

const spaceEndPoint = new AWS.Endpoint(AWS_S3_HOSTNAME);

const s3 = new AWS.S3({
	endpoint: spaceEndPoint,
	accessKeyId: AWS_S3_ACCESS_KEY,
	secretAccessKey: AWS_S3_SECRET_ACCESSKEY,
});



module.exports = {s3}
