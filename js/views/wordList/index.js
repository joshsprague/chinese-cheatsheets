

Application.View.extend({
  name: "wordList/index",

  //template: Handlebars.compile('{{view email}}'),

  events: {
    "submit #translated": function(event) {
      event.preventDefault();
      var attrs = this.serialize();
      var holder;
      var self = this;

      var newPair = new Application.Models["wordList/pair"];
      newPair.search_word = attrs.title;

      $.ajax({
        url: 'http://api.pearson.com/v2/dictionaries/ldec/entries?headword='+attrs.title+'&apikey=d0Q5fQJA1TLjuY8pGYliGnbKWGmnAy8V',
        dataType: 'jsonp',
        success: function (body) {
          if (body["results"][0] === undefined) {
            //TODO Message user that word is not in dictionary
          } else if (body["results"][0]["senses"][0]["translation"] === undefined) {
              newPair.translation = body["results"][0]["senses"][0]["subsenses"][0]["translation"];
              console.log(newPair.translation);
          } else {
              newPair.translation = body["results"][0]["senses"][0]["translation"];
              console.log(newPair.translation);
          }

          self.collection.add({title: newPair.search_word, translation: newPair.translation});

          newPair.save({search_word: newPair.search_word, translation: newPair.translation});
        }
    });

      this.$('input[name="title"]').val('');
    },

    'submit #email': function(event) {
      event.preventDefault();
      var attrs = this.serialize();
      var email = new Application.Models["wordList/email"];
      var emailBody = "";

      this.collection.each(function(model) {
        console.log(model.attributes.title);
        emailBody = emailBody.concat("<tr><td>" + model.attributes.title + "</td><td>" + model.attributes.translation + "</td></tr>");
      });

      console.log(emailBody);

      email.save({address: attrs.address, emailBody: emailBody});
      this.$('input[name="address"]').val('Sent');

    }
  },

});