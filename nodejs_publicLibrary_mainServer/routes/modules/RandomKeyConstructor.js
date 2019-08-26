const GetDate = require('./GetNowDate')

function randomString(length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = length;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
    }
    //document.randform.randomfield.value = randomstring;
    return randomstring;
}

module.exports.randomKey = function(){
    var code = randomString(32)
    return code;
}

module.exports.bookKey = function(){
    var primary_code = "6001";
    var date = GetDate.nowDateString();
    var code = randomString(10)
    return primary_code+date+code;
}

module.exports.mngKey = function(){
    var primary_code = "3001";
    var date = GetDate.nowDateString();
    var code = randomString(10)
    return primary_code+date+code;
}

module.exports.userKey = function(){
    var primary_code = "1001";
    var date = GetDate.nowDateString();
    var code = randomString(10)
    return primary_code+date+code;
}