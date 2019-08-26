var express = require('express');
var router = express.Router();

const crypt = require('./modules/Secrets');
const db = require('./modules/DBConnector');
const ipInfo = require('./modules/GetClientIp');
const RadomKey = require('./modules/RandomKeyConstructor')
const GetDate = require('./modules/GetNowDate');

router.post('/add', function(req, res, next) {
    var key = req.body.key;
    var title = req.body.title;
    var publish = req.body.publish;
    var writter = req.body.writter;
    var year = req.body.year;
    var part = req.body.part;

    if(key==undefined | title==undefined | publish==undefined | writter==undefined
        | year==undefined | part==undefined){
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
            
            var bookKey = RadomKey.bookKey();
            var create = GetDate.nowDate();
            var regQuery = "INSERT INTO library_book_table (lbt_key, lbt_date, lbt_title, lbt_publish, lbt_writter, lbt_part, lbt_year) values (?, ?, ?, ?, ?, ?, ?);"
            var regParam = [bookKey, create, title, publish, writter, part, year]
            db.query(regQuery, regParam, (error, env)=>{
                if(error){
                    return res.status(400).send({
                        code : 400,
                        msg : '접근 불가한 상황입니다.[3]'
                    });
                }

                return res.status(200).send({
                    code : 200,
                    key : bookKey
                });
            });

        });
    });
});

router.post('/info', function(req, res, next) {
    var key = req.body.key;
    var books = req.body.books;

    if(key==undefined | books==undefined){
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
            
            var reqQuery = "SELECT * FROM library_book_table;"
            db.query(reqQuery, (error, list, env)=>{
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

                var list_book = books.split(',');
                var res_array = [];
                if(list_book.length < 2){
                    var item = list[0];
    
                    for(var row =0;row<list_book.length;row++){
                        var book_key = list_book[row];

                        if (item.lbt_key == book_key){
                            var res_body = {
                                title : item.lbt_title,
                                writter : item.lbt_writter,
                                publish : item.lbt_publish,
                                part : item.lbt_part,
                                year : item.lbt_year
                            }
                            res_array.push(res_body);
                        }
                    }
                }else{
                    for(var index =0;index<list.length;index++){
                        var item = list[index];
    
                        for(var row =0;row<list_book.length;row++){
                            var book_key = list_book[row];

                            if (item.lbt_key == book_key){
                                var res_body = {
                                    title : item.lbt_title,
                                    writter : item.lbt_writter,
                                    publish : item.lbt_publish,
                                    part : item.lbt_part,
                                    year : item.lbt_year
                                }
                                res_array.push(res_body);
                            }
                        }
                    }
                }

                return res.status(200).send({
                    code : 200,
                    list : res_array
                });
            });

        });
    });
});

module.exports = router;