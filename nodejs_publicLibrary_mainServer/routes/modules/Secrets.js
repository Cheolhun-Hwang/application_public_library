const crypto = require('crypto');
const skey = require('./ProjectKeys').EncryptKey;

module.exports.makeSecret = function(pwd){
    var cipher = crypto.createCipher('aes-256-cbc', skey);
    var encode = cipher.update(pwd, 'utf8', 'base64');
    encode +=  cipher.final('base64');
    return encode;
}

module.exports.getSecret = function(pwd){
    var decipher = crypto.createDecipher('aes-256-cbc', skey);
    var decode = decipher.update(pwd, 'base64', 'utf8');
    decode += decipher.final('utf8');
    return decode;
}