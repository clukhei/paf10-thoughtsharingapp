const express = require('express')
const router = express.Router()
const mongoClient = require('../mongo_db')
const multer = require('multer')
const path = require('path')
const {s3} = require('../s3')
const fs = require('fs')


const multipart = multer({dest: path.join(__dirname, 'uploads')})

const MONGO_DB = "mythoughts"
const MONGO_COL = "thoughts"
router.post('/', multipart.single('image'), async(req,res)=> {
    const fileName = req.file.filename
    const thoughts = {
        imageRef: fileName,
        timestamp: new Date(),
        ...req.body
    }


    try{
        const imgFile = await readFilePromise(req.file.path)
        await putObjPromise(req, imgFile)
        await mongoClient.db(MONGO_DB)
        .collection(MONGO_COL)
        .insertOne(thoughts)
        .then(result=> {
            if (result.insertedCount > 0) {
                res.type('application/json')
                res.status(200).json(result.insertedId)
                fs.unlink(req.file.path, ()=> {
                    console.log('deleted temp img file')
                })
            }
        })
    } catch(e){
        console.log(e)
        res.type('application/json')
        res.status(500).json({message: e})
    }

})


const readFilePromise = (path) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, imgFile) => {
			if (err) reject(err);
			else resolve(imgFile);
		});
	});
};

const putObjPromise = (req, imgFile) => {
  
	const params = {
		Bucket: process.env.AWS_S3_BUCKETNAME,
		Key: req.file.filename,
		Body: imgFile,
        ACL: "public-read",
        ContentType : req.file.mimetype,
        ContentLength : req.file.size
	};
	return new Promise((resolve, reject) => {
		s3.putObject(params, (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
};

module.exports = router