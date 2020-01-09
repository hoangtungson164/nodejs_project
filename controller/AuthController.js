var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var con = require('../db.js');

exports.register = function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  var sql = "INSERT INTO user_login (name, email, password) VALUES (?)";
  var value = [req.body.name, req.body.email, hashedPassword ];
  var sql2 = "SELECT email FROM user_login WHERE email = " + "'" + req.body.email + "'"


  con.query(sql2, function (err, result) {
    if (result.length > 0) {
      return res.status(500).send("Email is already existed.")
    } else {
      con.query(sql, [value], function (err, result) {
        if (err) throw err 
        // return res.status(500).send("There was a problem registering the user.")
        // create a token
        var token = jwt.sign({ id: result.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      })
    }
  })
};

exports.getUser =  function (req, res, next) {

    var sql = "SELECT*FROM user_login WHERE id = '" + req.id + "'"
    con.query(sql, function (err, user) {

      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user[0]);
  });
};

exports.login =  function (req, res) {
  var sql = "SELECT*FROM user_login WHERE email = '" + req.body.email + "'"
  con.query(sql, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user[0]) return res.status(404).send('No user found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user[0].id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ id: user[0].id, email: user[0].email, accessToken: token, name: user[0].name });
  });

};

exports.logout = function (req, res, next) {
  res.status(200).send({ auth: false, token: null });
};
