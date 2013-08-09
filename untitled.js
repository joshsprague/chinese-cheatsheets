

module.exports = function (grunt) {
    var port = 8000,
        publicDir = './public',
        jsDir = publicDir + '/modules',
        lumbarFile = './lumbar.json',
        hostname = 'localhost';


    grunt.file.mkdir(publicDir);
    grunt.file.mkdir(jsDir);


    grunt.initConfig({
        // create a static webserver
        lumbar: {
            // performs an initial build so when tests
            // and initial open are run, code is built
            init: {
                build: lumbarFile,
                output: jsDir
            },
            // a long running process that will watch
            // for updates, to include another long
            // running task such as "watch", set
            // background: true
            watch: {
                background: false,
                watch: lumbarFile,
                output: jsDir
            }
        },
        // allows files to be opened when the
        // Thorax Inspector Chrome extension
        // is installed
        thorax: {
            inspector: {
                background: true,
                editor: "subl",
                paths: {
                    views: "./js/views",
                    models: "./js/models",
                    collections: "./js/collections",
                    templates: "./templates"
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: ['*.js', 'js/**/*.js']
            }
        }
    });


    grunt.registerTask('open-browser', function () {
        var open = require('open');
        open('http://' + hostname + ':' + port);
    });
    grunt.registerTask("init-api", function () {
      var cheatsheets = require("./app.js")();
    });


    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('thorax-inspector');
    grunt.loadNpmTasks('lumbar');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', [
        'ensure-installed',
        'thorax:inspector',
        'lumbar:init',
        'jshint',
        'init-api',
        // 'open-browser',
        'lumbar:watch'
    ]);


};

module.exports= function(){
var cheatsheets = (function () {
            this.express = require("express");
            this.app = this.express();
            this.http = require("http");
            this._ = require("underscore");
            // this.router = require("./router.js");
            this.router = require("./routes/routes_index.js");
            this.connect = require("connect");
            this.redis = require('redis');
            this.client = this.redis.createClient("14640", "pub-redis-14640.us-east-1-2.1.ec2.garantiadata.com");
            this.client.auth("test");
            this.Session = require("connect").middleware.session.Session;
            this.cookie = require("cookie");
            this.RedisStore = require('connect-redis')(this.express);
            this.sessionStore = new this.RedisStore({
                client: this.client,
                port: ("14640")
            });
            this.stripe = require("stripe")("sk_test_nwh4vUAFwgpnOsQrlDqI6A2m");
            this.signature = require("cookie-signature");
            this.prefix = "s:";
            this.MySQL = require("mysql");
            this.twilio = require("twilio");
            this.ShortId = require("shortid");
            this.Sequelize = require("sequelize");
            this.passport = require("passport");
            this.nodemailer = require("nodemailer");
            this.fs = require("fs");
            this.jade = require("jade");
            this.LocalStrategy = require('passport-local').Strategy;
            this.FacebookStrategy = require('passport-facebook').Strategy;
            this.q = require("q");
            this.auth = require("./auth.js")(this);
            this.db = require("./db.js")(this);
            this.api = require("./backend/api")(this);
            //this.db.user.drop();
            return this;


        })();


        //configure express app
        cheatsheets.app.configure(function () {
            this.use(function (req, res, next) {
                res.header('Access-Control-Allow-Origin', req.headers.origin);
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');


                // intercept OPTIONS method
                if ('OPTIONS' === req.method) {
                    res.send(200);
                } else {
                    next();
                }
            });
            this.use(cheatsheets.express.static(__dirname+'/public'));
            this.set('view engine', 'html');
            this.use(cheatsheets.express.bodyParser());
            this.use(cheatsheets.express.bodyParser());
            this.use(cheatsheets.express.cookieParser('monkey'));
            this.use(cheatsheets.express.session({
                secret: 'monkey',
                store: cheatsheets.sessionStore,
                key: "express.sid"


            }));
            this.use(cheatsheets.passport.initialize());
            //this.use(cheatsheets.passport.session());
            this.set('port', process.env.PORT || 8000);
            this.use(this.router);
            this.use(cheatsheets.express.methodOverride());






        });


        //configure socket.io
        cheatsheets.app.listen(cheatsheets.app.get("port"));
        //start server and api.
        cheatsheets.router(cheatsheets);
    return cheatsheets;

    {
  "name": "Application",
  "version": "0.0.1",
  "devDependencies": {
    "express": "3.x.x",
    "shortid":"*",
    "underscore":"*",
    "nodemailer":"*",
    "connect":"*",
    "connect-redis": "1.4.x",
    "redis":"*",
    "sequelize":"*",
    "twilio":"*",
    "jade":"*",
    "mysql":"2.0.0-alpha7",
    "cookie":"*",
    "cookie-signature":"*",
    "passport":"*",
    "passport-facebook":"*",
    "passport-local":"*",
    "q":"*",
    "stripe":"*",
    "handlebars": "~1.0.0",
    "grunt-contrib-connect": "0.1.1",
    "grunt-contrib-jshint": "~0.6.1",
    "grunt": "~0.4",
    "grunt-cli": "0.1.6",
    "lumbar": "2.2.5",
    "thorax-inspector": "0.2.4",
    "open": "0.0.3",
    "bower": "~0.10"
  },
  "scripts": {
    "start": "node ./node_modules/grunt-cli/bin/grunt",
    "test": "node ./node_modules/grunt-cli/bin/grunt test"
  },
  "engines": {
    "node": ">=0.8.0"
  }
}

//http://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
var fs = require('fs');

module.exports = function(app){
  fs.readdirSync(__dirname).forEach(function(file){
    if (file === 'routes_index.js' ||
        file.substr(file.lastIndexOf('.') + 1) !== 'js'){
      //check for routes_index.js
      //also make sure only include files ending with .js
      return;
    } else {
      var name = file.substr(0, file.indexOf('.'));
      require('./' + name)(app);
    }
  });
};

SELECT * FROM X WHERE id=#{id}
UNION ALL
SELECT * FROM tags
WHERE id IN
(SELECT id FROM xtags
 WHERE meal_id = #{id})