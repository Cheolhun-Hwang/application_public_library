var express = require('express');
var router = express.Router();

const db = require('./modules/DBConnector');
const ipInfo = require('./modules/GetClientIp');
const RadomKey = require('./modules/RandomKeyConstructor')
const GetDate = require('./modules/GetNowDate');

router.get('/request_key', function(req, res, next) {
    var req_ip = ipInfo.getClientIPInfo(req);
    var random_key = RadomKey.randomKey();
    var date = GetDate.nowDate()
    var sQuery = "INSERT INTO temp_access_auth_table (taat_date, taat_key, taat_ip) values (?, ?, ?);";
    var sParam = [date, random_key, req_ip]

    db.query(sQuery, sParam, (err, env)=>{
        console.log("query");
        if(err){
            return res.status(400).send({
                code : 400,
                msg : "내부 저장 오류"
            });
        }else{
            return res.status(200).send({
                code : 200,
                key : random_key
            });
        }
    });
});

module.exports = router;