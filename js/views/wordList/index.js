

Application.View.extend({
  name: "wordList/index",
  
  events: {
    "submit form": function(event) {
      event.preventDefault();
      var attrs = this.serialize();
      var holder;
      var self = this;
      // var mysql = require('mysql');

      // var dbConnection = mysql.createConnection({
      //   user: "root",
      //   password: "mysql123",
      //   database: "cheatsheets"
      // });

      // var db = function(query, cb) {
      //   console.log("Database queried.");
      //   dbConnection.query(query, cb);
      // };
      

      $.ajax({
        url: 'http://api.pearson.com/v2/dictionaries/ldec/entries?headword='+attrs.title+'&apikey=d0Q5fQJA1TLjuY8pGYliGnbKWGmnAy8V',
        dataType: 'jsonp',
        success: function (body) {
          if (body["results"][0] === undefined) {
            //TODO Message user that word is not in dictionary
          } else if (body["results"][0]["senses"][0]["translation"] === undefined) {
              holder = body["results"][0]["senses"][0]["subsenses"][0]["translation"];
              console.log(holder);
          } else {
              holder = body["results"][0]["senses"][0]["translation"];
              console.log(holder);
          }
          //require(['mysql'], function(mysql) {
          //db.query("INSERT into collection (name, author) values ('test', 'test');");
          //});
          self.collection.add({title: attrs.title, translation: holder});
        }
      });
      this.$('input[name="title"]').val('');
    },
    'change input[type="checkbox"]': function(event) {
      var model = $(event.target).model();
      model.set({done: event.target.checked});
    }
  }
});