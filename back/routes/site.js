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

  // console.log(req.body);

  let i_name = new Date().getTime()+'.'+req.file.mimetype.split('/')[1]
  let s3_params = {
    Bucket: 's3.icon',
    Key: i_name,
    ACL: 'public-read',
    ContentTpye: req.file.mimetype
  };
  
  let s3obj = new aws.S3({ params: s3_params });
  s3obj.upload({ Body: req.file.buffer })
  .on('httpUploadProgress',function(progress) {
    console.log(Math.round(progress.loaded/progress.total*100)+ '% done');
  }).
  send(function (err, data) {
    //S3 File URL
    let params = {
      icon_url: data.Location,
      site_url: req.body.siteUrl,
      site_name: req.body.siteName,
      new_browser_yn: req.body.newBrowserYn,
      icon_name: i_name
    };

    siteDB.add(params, (result) => {
      res.json(result[0]);
    }, (error) => {
      res.status(200)
      .set('Content-Type', 'text/plain;charset=UTF-8')
      .end(error);
    })
  });
});

router.post('/update', upload.single('file'), function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // console.log(req.body);

  if (req.file) {
    let i_name = new Date().getTime()+'.'+req.file.mimetype.split('/')[1]
    let s3_params = {
      Bucket: 's3.icon',
      Key: i_name,
      ACL: 'public-read',
      ContentTpye: req.file.mimetype
    };
    
    let s3obj = new aws.S3({ params: s3_params });
    s3obj.upload({ Body: req.file.buffer })
    .on('httpUploadProgress',function(progress) {
      console.log(Math.round(progress.loaded/progress.total*100)+ '% done');
    }).
    send(function (err, data) {
      var suc_icon_url = data.Location;
      let delete_params = {
        Bucket: 's3.icon',
        Key: req.body.imgOriName
      };
    
      let deleteObj = new aws.S3();
      deleteObj.deleteObject(delete_params, (err, data) => {
        let params = {
          icon_url: suc_icon_url,
          site_url: req.body.siteUrl,
          site_name: req.body.siteName,
          new_browser_yn: req.body.newBrowserYn,
          icon_name: i_name,
          no: parseInt(req.body.no, 10)
        };
    
        siteDB.update(params, (result) => {
          res.json(result[0]);
        }, (error) => {
          res.status(200)
          .set('Content-Type', 'text/plain;charset=UTF-8')
          .end(error);
        })
      })
    });
  }
  else {
    let params = {
      icon_url: req.body.imageUrl,
      site_url: req.body.siteUrl,
      site_name: req.body.siteName,
      new_browser_yn: req.body.newBrowserYn,
      icon_name: req.body.imgOriName,
      no: parseInt(req.body.no, 10)
    };

    siteDB.update(params, (result) => {
      res.json(result[0]);
    }, (error) => {
      res.status(200)
      .set('Content-Type', 'text/plain;charset=UTF-8')
      .end(error);
    })
  }
});

router.get('/d_site', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Origin", "*");

  let delete_params = {
    Bucket: 's3.icon',
    Key: req.query.imgOriName
  };

  let deleteObj = new aws.S3();
  let no = parseInt(req.query.no, 10);
  deleteObj.deleteObject(delete_params, (err, data) => {
    siteDB.d_site(no, (result) => {
      res.json(result)
    }, (error) => {
      params.res.status(200)
      .set('Content-Type', 'text/plain;charset=UTF-8')
      .end('error')
    })
  })
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
