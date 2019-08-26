const mysql = require('mysql');

const db_init = mysql.createConnection({
     host:'13.125.71.93',
     port:3306,
     user:'hooney',
     password:'hch1458741!',
     database:'kisa_main_server'
});

module.exports = db_init;