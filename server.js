var app = require('./app');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// mongodb+srv://sonht:<password>@cluster0-7ahry.mongodb.net/test?retryWrites=true&w=majority
 
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://sonht:<password>@cluster0-7ahry.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
