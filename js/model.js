Application.Model = Thorax.Model.extend({
  
  initialize: function(params){
    var dbConnection = mysql.createConnection({
      user: "root",
      password: "mysql123",
      database: "cheatsheets"
    });

    exports.db = function(query, cb) {
      console.log("Database queried.");
      dbConnection.query(query, cb);
    };
  }

});