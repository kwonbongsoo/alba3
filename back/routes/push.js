const express = require('express');
const router = express.Router();
const datasource = require('../config/datasource');
const pushDB = require('../db/pushDB');
const connection = datasource.getConnection();
const push = require('../config/push');
pushDB.setConnection(connection);

/* GET home page. */
router.get('/push_all', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
  res.setHeader("Access-Control-Allow-Origin", "*");

  pushDB.push_all((result) => {
    let arr = [];

    for (let i = 0; result[0].length > i; i++) {
      arr.push(result[0][i].token);
    }
    let msg = req.query.msg;
    push.fcm.send(push.push_all(msg, arr), function(err, response) {
      if (err) {
          console.error('Push메시지 발송에 실패했습니다.');
          console.error(err);
          res.json({
            result: 'FAIL'
          });
          return;
      } else {
        console.log('Push메시지가 발송되었습니다.');
        console.log(response);
        res.json({
          result: 'SUCCESS'
        });
      }
    });
  }, (error) => {
    res.status(200)
    .set('Content-Type', 'text/plain;charset=UTF-8')
    .end(error);
  });
  
});

module.exports = router;
