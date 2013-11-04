module.exports = function(){
  var cheatsheets = (function () {
    this.express = require('express');
    this.app = this.express();
    this.http = require('http');
    this._ = require ('underscore');

    this.connect = require('connect');
    this.mysql = require('mysql');
    this.nodemailer = require('nodemailer');
    return this;
  })();

  //set up database and db connection
  var mysql = require('mysql');

  var dbConnection = mysql.createConnection({
    user: "root",
    //password: "mysql123",
    database: "cheatsheets",
  });



  var db = function(query, cb) {
    console.log("Database queried.");
    dbConnection.query(query, cb);
  };

  //set up express
  cheatsheets.app.configure(function () {

    this.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Origin', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Origin', 'Content-Type, Authorization, Content-Length, X-Requested-With');

      if ('OPTIONS' === req.method) {
        res.send(200);
      } else {
        next();
      }
    });


    this.use(cheatsheets.express.static(__dirname+'/public'));
    this.set('view engine', 'html');
    this.use(cheatsheets.express.bodyParser());
    this.set('port', process.env.PORT || 8000);
    this.use(cheatsheets.express.methodOverride());

  });


  //set up nodemailer
  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "chinesecheatsheets@gmail.com",
      pass: "chinese123"
    }
  });

  //Route saved pairs to database
  cheatsheets.app.post("/pairList", function(req, res) {

    dbConnection.query("INSERT into pairs (search_word, translation) values ('" + req.body['search_word'] + "', '" + req.body['translation'] + "');", function(err, rows, fields){
      if (err) throw err;
      console.log("Pair saved to database");
    });

    res.end();
  });

  //Route email request
  cheatsheets.app.post("/email", function(req, res) {

    smtpTransport.sendMail({
      from: "Cheatsheets <chinesecheatsheets@gmail.com>",
      to: "User <" + req.body['address'] + ">",
      subject: "Your cheatsheet",
      html: "Your cheatsheet: </br></br>" + req.body['emailBody'] + " ",
    }, function(error, response) {
      if(error) {
        console.log(error);
      } else {
        console.log("Message sent");
      }
    });


  //Route saved pairs to database
  cheatsheets.app.post("/pairList", function(req, res) {

    dbConnection.query("INSERT into pairs (search_word, translation) values ('" + req.body['search_word'] + "', '" + req.body['translation'] + "');", function(err, rows, fields){
      if (err) throw err;
      console.log("Pair saved to database");
      });


    res.end();
  });

  //Return 404 if route not found
  cheatsheets.app.use(function(req, res, next){
    res.send(404, 'Sorry cant find that!');
  });

  //set up listening
  cheatsheets.app.listen(cheatsheets.app.get("port"));

  return cheatsheets;
}