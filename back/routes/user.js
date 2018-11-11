const express = require('express');
const router = express.Router();
const datasource = require('../config/datasource');
const userDB = require('../db/userDB');
const connection = datasource.getConnection();
userDB.setConnection(connection);


router.post('/login', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Origin", "*");

  let params = {
      id: req.query.id,
      password: req.query.password
  };

  console.log(params);

  userDB.login(params, (result) => {
    res.json(result[0]);
  }, (error) => {
    res.status(200)
    .set('Content-Type', 'text/plain;charset=UTF-8')
    .end(error);
  });
});

router.get('/master_info', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    let params = {
        // id: req.query.id
        no: 1
    };
  
    console.log(params);
  
    userDB.master_info(params, (result) => {
      res.json(result);
    }, (error) => {
      res.status(200)
      .set('Content-Type', 'text/plain;charset=UTF-8')
      .end(error);
    });
  });

  router.get('/alliance_req', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    let params = {
        no: 1
    };
  
    console.log(params);
  
    userDB.master_info(params, (result) => {
      res.json(result[0]);
    }, (error) => {
      res.status(200)
      .set('Content-Type', 'text/plain;charset=UTF-8')
      .end(error);
    });
  });

  router.get('/master_info_update', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    let params = {
        id: req.query.id,
        tel: req.query.tel,
        alliance_msg: req.query.alliance_msg
    };
  
    console.log(params);
  
    userDB.master_info_update(params, (result) => {
      res.json(result);
    }, (error) => {
      res.status(200)
      .set('Content-Type', 'text/plain;charset=UTF-8')
      .end(error);
    });
  });

  router.post('/add_token', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    let params = {
        no: parseInt(req.body.no, 10),
        token: req.body.token
    };
  
    console.log(params);
  
    userDB.add_token(params, (result) => {
      res.json(result[0]);
    }, (error) => {
      res.status(200)
      .set('Content-Type', 'text/plain;charset=UTF-8')
      .end(error);
    });
  });


module.exports = router;
