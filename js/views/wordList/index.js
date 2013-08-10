

Application.View.extend({
  name: "wordList/index",

  events: {
    "submit form": function(event) {
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

    'change input[type="checkbox"]': function(event) {
      var model = $(event.target).model();
      model.set({done: event.target.checked});
    },

    'click button[name="save"]': function(event) {
      //this.collection.save();
    }
  },

});