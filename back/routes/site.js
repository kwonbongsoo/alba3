const express = require('express');
const router = express.Router();
const datasource = require('../config/datasource');
const siteDB = require('../db/siteDB');
const connection = datasource.getConnection();
siteDB.setConnection(connection);

// 이미지 업로드
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");
const s3 = new aws.S3();
const multer = require('multer');
const memorystorage = multer.memoryStorage();
const upload = multer({ storage: memorystorage });


/* GET users listing. */
router.post('/add', upload.single('file'), function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Origin", "*");


  let i_name = new Date().getTime()+'.'+req.file.mimetype.split('/')[1]
  var s3_params = {
    Bucket: 's3.icon',
    Key: i_name,
    ACL: 'public-read',
    ContentTpye: req.file.mimetype
  };
  
  var s3obj = new aws.S3({ params: s3_params });
  s3obj.upload({ Body: req.file.buffer })
  .on('httpUploadProgress',function(progress) {
    console.log(Math.round(progress.loaded/progress.total*100)+ '% done');
  }).
  send(function (err, data) {
    //S3 File URL
    let params = {
      
    };
  });
});

router.get('/l_site', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Origin", "*");

  siteDB.l_site((result) => {
    res.json(result);
  }, (error) => {
    res.status(200)
    .set('Content-Type', 'text/plain;charset=UTF-8')
    .end(error);
  });
});


module.exports = router;
