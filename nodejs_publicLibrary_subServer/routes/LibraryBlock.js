var express = require('express');
var router = express.Router();

var request = require('request');
const blockchain = require('./modules/bchain/blockchain');

const lib_mng = "300120190822033543205ZyVk6UQyOX5"; //세션으로 바꿀것

router.get('/',function(req,res,next){
    var book = req.query.book;
    if(book == undefined){
        return res.status(400).send({
            code : 400,
            msg : '잘못된 정보 요청입니다.'
        });
    }

    return res.status(200).send({
        code : 200,
        list : blockchain.getBlockchainForKey(book)
    });
});

router.get('/list', function(req, res, next){
    var book = req.query.book;
    var title = req.query.title;
    var writer = req.query.writer;
    var publish = req.query.publish;

    if(book == undefined){
        return res.status(400).send({
            code : 400,
            msg : '잘못된 정보 요청입니다.'
        });
    }

    var res_list = [];
    var bchain = blockchain.getBlockchainForKey(book);
    var index = 0;
    while(true){
        var block = bchain[index];
        if(block == undefined){
            break;
        }
        var bkey = block.key;
        var timestamp = block.timestamp;
        var sysdate = new Date(parseInt(timestamp)).toISOString().substring(0, 19).replace("T", " ");
        var classify_key = bkey.substring(0, 4);
        if(classify_key == "1001"){
            res_list.push({
                user : "홍당무",
                date : sysdate
            });
        }
        index+=1;
    }
    return res.render('blockchain',{
        list : res_list,
        title:title,
        writer:writer,
        publish:publish
    })
})

router.get('/list2', function(req, res, next){
    var book = req.query.book;
    
    if(book == undefined){
        return res.status(400).send({
            code : 400,
            msg : '잘못된 정보 요청입니다.'
        });
    }

    var param_user = "";
    var bchain = blockchain.getBlockchainForKey(book);
    var index = 0;
    while(true){
        var block = bchain[index];
        if(block == undefined){
            break;
        }
        var bkey = block.key;
        console.log(bkey);
        
        var classify_key = bkey.subString(0, 4);
        if(classify_key != "1001"){
            param_user += (bkey+",")
        }
        index+=1;
    }

    if(param_user.length < 1){
        request.post(sendsvr, function(err,response,body){ 
            return res.render('blockcahin',{
                list : body
            })
        })
    }else{
        const sendsvr = {
            uri:'http://192.168.43.102:3000/api/user/list', 
            method: 'POST',
            form: {
                users:param_user,
            }
        }
      
        request.post(sendsvr, function(err,response,body){ 
            return res.render('blockcahin',{
                list : body[0].list
            })
        })
    }    
})

router.post('/add',function(req,res,next){
    var book = req.body.book;
    var ownKey = req.body.own;
    var type = req.body.type;

    if(book == undefined || ownKey==undefined || type == undefined){
        return res.status(400).send({
            code : 400,
            msg : '잘못된 정보 요청입니다.'
        });
    }

    if(type == 'r'){
        blockchain.addBlockchainForkey(book, ownKey);
    }else{
        blockchain.addBlockchainForkey(book, lib_mng);
    }
    
    return res.status(200).send({
        code : 200,
        msg : "추가 완료"
    });
});

router.post('/init',function(req,res,next){
    var book = req.body.book;
    if(book == undefined){
        return res.status(400).send({
            code : 400,
            msg : '잘못된 정보 요청입니다.'
        });
    }

    blockchain.createBlockchainForKey(book);
            
    return res.status(200).send({
        code : 200,
        msg : "초기 추가 완료"
    });
});

module.exports = router;