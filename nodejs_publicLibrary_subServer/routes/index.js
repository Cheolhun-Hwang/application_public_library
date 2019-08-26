var express = require('express');
var router = express.Router();

const db=require("./modules/DBConnector");

router.get('/',function(req,res,next){
    res.render('index');
});

//router.get('/', function(req, res, next) {
//    
//    var query="SELECT * FROM booklist"
//    db.query(query, (err, list, col)=>{
//        if(err){
//            return res.status(400).send({
//                code : 400,
//                msg : "접근 불가합니다."
//            });
//        }
//        
//        return res.status(200).send({
//            code : 200,
//            list : list
//        });
//    });
//});

module.exports = router;