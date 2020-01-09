var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '123456',
    database: 'test_table',
    port: 3307,
});

module.exports = con;