var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    return res.status(200).send({
        msg:"서버 동작 중..."
    })
});

module.exports = router;