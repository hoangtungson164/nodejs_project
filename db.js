// var mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://sonht:<Tungson97..>@cluster0-7ahry.mongodb.net/test?retryWrites=true&w=majority');

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://sonht:<Tungson97..>@cluster0-7ahry.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '123456',
    database: 'user_login',
    port: 3307,
});

module.exports = con;