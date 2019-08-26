const mysql = require('mysql');

const db_init = mysql.createConnection(
    { host: '13.125.71.93',
     port:3306,
     user: 'sub_user', 
     password: 'gachon2019!', 
     database: 'kisa_library_server' });

module.exports = db_init;