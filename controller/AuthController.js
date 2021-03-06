require('dotenv').config();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var con = require('../config/db');
var redisApi = require("../config/redis")

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

var rand, mailOptions, link, hashedPassword, name, email;
rand = Math.floor((Math.random() * 100) + 54);

exports.register = function (req, res) {
  name = req.body.name;
  email = req.body.email;
  hashedPassword = bcrypt.hashSync(req.body.password, 8);

  var sql2 = "SELECT email FROM user_login WHERE email = " + "'" + req.body.email + "'"

  con.query(sql2, function (err, result) {
    if (err) res.status(500).send("Something's wrong with checking email")
    if (result.length > 0) {
      return res.status(500).send("Email is already existed.")
    } else {

      link = "http://" + req.get('host') + "/verify?id=" + rand;

      mailOptions = {
        to: req.body.email,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
      }

      console.log(mailOptions);

      redisApi.set(redisApi.PINCODE_PREFIX, rand, function (error, reply) {
        if (error) {
          console.log('Store pincode error : ' + error);
        } else {
          smtpTransport.sendMail(mailOptions, function (error2, response) {
            if (error2) {
              console.log(error2);
              res.status(500).send("something wrong with verify");
            } else {
              console.log("Message sent: success to send verify");
              res.status(200).send("send verify success");
            }
          });
        }
      })
    }
  })
};

exports.verify = function (req, res) {

  var sql = "INSERT INTO user_login (name, email, password) VALUES (?)";
  var value = [name, email, hashedPassword];

  redisApi.get(redisApi.PINCODE_PREFIX, function (err, reply) {
    console.log(reply);
    if (err) return res.status(404).send("not found");
    con.query(sql, [value], function (error, result) {
      if (error) {
        return res.status(500).send("There was a problem registering the user.")
      } else {
        res.status(200).send("Email " + mailOptions.to + " is been Successfully verified");
      }
    });
  });
}

exports.getUser = function (req, res, next) {

  var sql = "SELECT*FROM user_login WHERE id = '" + req.id + "'"
  con.query(sql, function (err, user) {

    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user[0]);
  });
};

exports.login = function (req, res) {
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
