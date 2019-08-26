const requestIp = require('request-ip');

module.exports.getClientIPInfo = function(req){
    return requestIp.getClientIp(req) + ""
}