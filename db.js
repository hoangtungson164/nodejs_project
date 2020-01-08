var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '123456',
    database: 'user_login',
    port: 3307,
});

module.exports = con;