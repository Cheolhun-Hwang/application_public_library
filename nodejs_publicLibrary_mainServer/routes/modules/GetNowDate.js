module.exports.nowDateString = function(){
    return new Date(Date.now())
    .toISOString()
    .replace(/T/, '')
    .replace(/\./gi, '')
    .replace(/\-/gi, '')
    .replace(/\' '/gi, '')
    .replace(/\:/gi, '');
}

module.exports.nowDate = function(){
    return new Date(Date.now())
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
}