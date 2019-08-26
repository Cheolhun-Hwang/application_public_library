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
    var rep = req.body.rep;
    var phone = req.body.phone;

    if(key==undefined | name==undefined | rep==undefined | phone==undefined){
        return res.status(400).send({
            code : 400,
            msg : '잘못된 요청입니다.'
        });
    }

    // name = crypt.getSecret(req.body.name);
    // rep = crypt.getSecret(req.body.rep);
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
            
            var mngKey = RadomKey.mngKey();
            var create = GetDate.nowDate();
            var regQuery = "INSERT INTO library_management_table (lmt_key, lmt_date, lmt_name, lmt_phone, lmt_rep) values (?, ?, ?, ?, ?);"
            var regParam = [mngKey, create, name, phone, rep]
            db.query(regQuery, regParam, (error, env)=>{
                if(error){
                    return res.status(400).send({
                        code : 400,
                        msg : '접근 불가한 상황입니다.[3]'
                    });
                }

                return res.status(200).send({
                    code : 200,
                    key : mngKey
                });
            });

        });
    });
});

router.post('/info', function(req, res, next) {
    var key = req.body.key;
    var mngKey = req.body.mng;

    if(key==undefined | mngKey==undefined){
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
            
            var reqQuery = "SELECT * FROM library_management_table WHERE lmt_key=?;"
            var reqParam = [mngKey]
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
                    name : list[0].lmt_name,
                    phone : list[0].lmt_phone,
                    rep : list[0].lmt_rep
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