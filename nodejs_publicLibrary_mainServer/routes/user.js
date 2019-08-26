var express = require('express');
var router = express.Router();

const crypt = require('./modules/Secrets');
const db = require('./modules/DBConnector');
const ipInfo = require('./modules/GetClientIp');
const RadomKey = require('./modules/RandomKeyConstructor')
const GetDate = require('./modules/GetNowDate');

router.post('/reg', function(req, res, next) {
    var key = req.body.key;
    var name = req.body.name;
    var phone = req.body.phone;

    if(key==undefined | name==undefined | phone==undefined){
        return res.status(400).send({
            code : 400,
            msg : '잘못된 요청입니다.'
        });
    }

    // name = crypt.getSecret(req.body.name);
    // phone = crypt.getSecret(req.body.phone);

    var req_ip = ipInfo.getClientIPInfo(req);
    var sQuery = "SELECT * FROM temp_access_auth_table WHERE taat_key=? AND taat_ip=?";
    var sParam = [key, req_ip]
    db.query(sQuery, sParam, (error, list, col)=>{
        if(error){
            return res.status(400).send({
                code : 400,
                msg : '접근 불가한 상황입니다.'
            });
        }

        if(list.length < 1){
            return res.status(400).send({
                code : 400,
                msg : '잘못된 접근입니다.'
            });
        }

        var delQuery = "DELETE FROM temp_access_auth_table WHERE taat_key=? AND taat_ip=?;"
        db.query(delQuery, sParam, (error, col)=>{
            if(error){
                return res.status(400).send({
                    code : 400,
                    msg : '접근 불가한 상황입니다.[2]'
                });
            }
            
            var userKey = RadomKey.userKey();
            var create = GetDate.nowDate();
            var regQuery = "INSERT INTO user_table (ut_key, ut_date, ut_name, ut_phone) values (?, ?, ?, ?);"
            var regParam = [userKey, create, name, phone]
            db.query(regQuery, regParam, (error, env)=>{
                if(error){
                    return res.status(400).send({
                        code : 400,
                        msg : '접근 불가한 상황입니다.[3]'
                    });
                }

                return res.status(200).send({
                    code : 200,
                    key : userKey
                });
            });

        });
    });
});

router.post('/info', function(req, res, next) {
    var key = req.body.key;
    var userKey = req.body.user;

    if(key==undefined | userKey==undefined){
        return res.status(400).send({
            code : 400,
            msg : '잘못된 요청입니다.'
        });
    }

    var req_ip = ipInfo.getClientIPInfo(req);
    var sQuery = "SELECT * FROM temp_access_auth_table WHERE taat_key=? AND taat_ip=?";
    var sParam = [key, req_ip]
    db.query(sQuery, sParam, (error, list, col)=>{
        if(error){
            return res.status(400).send({
                code : 400,
                msg : '접근 불가한 상황입니다.'
            });
        }

        if(list.length < 1){
            return res.status(400).send({
                code : 400,
                msg : '잘못된 접근입니다.'
            });
        }

        var delQuery = "DELETE FROM temp_access_auth_table WHERE taat_key=? AND taat_ip=?;"
        db.query(delQuery, sParam, (error, col)=>{
            if(error){
                return res.status(400).send({
                    code : 400,
                    msg : '접근 불가한 상황입니다.[2]'
                });
            }
            
            var reqQuery = "SELECT * FROM user_table WHERE ut_key=?;"
            var reqParam = [userKey]
            db.query(reqQuery, reqParam, (error, list, env)=>{
                if(error){
                    return res.status(400).send({
                        code : 400,
                        msg : '접근 불가한 상황입니다.[3]'
                    });
                }

                if(list.length < 1){
                    return res.status(400).send({
                        code : 400,
                        msg : '잘못된 정보입니다.'
                    });
                }

                var res_body = {
                    name : list[0].ut_name,
                    phone : list[0].ut_phone,
                }

                return res.status(200).send({
                    code : 200,
                    list : res_body
                });
            });

        });
    });
});

module.exports = router;