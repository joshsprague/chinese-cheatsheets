module.exports = function(){
  var cheatsheets = (function () {
    this.express = require('express');
    this.app = this.express();
    this.http = require('http');
    this._ = require ('underscore');
    this.router = require("./routes/routes_index.js");
    this.connect = require('connect');
    this.mysql = require('mysql');

    return this;
  })();

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
    this.use(this.router);
    this.use(cheatsheets.express.methodOverride());
  });

  cheatsheets.app.listen(cheatsheets.app.get("port"));
  //start server
  //cheatsheets.router(cheatsheets);

  return cheatsheets;
}