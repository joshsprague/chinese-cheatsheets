Application.View.extend({
  name: "todos/index",
  events: {
    "submit form": function(event) {
      event.preventDefault();
      var attrs = this.serialize();
      var holder;
      var self = this;
      $.ajax({
        url: 'http://api.pearson.com/v2/dictionaries/ldec/entries?headword='+attrs.title+'&apikey=d0Q5fQJA1TLjuY8pGYliGnbKWGmnAy8V',
        dataType: 'jsonp',
        success: function (body) {
          if (body["results"][0]["senses"][0]["translation"] === undefined) {
            holder = body["results"][0]["senses"][0]["subsenses"][0]["translation"];
            console.log(holder);
          } else {
            holder = body["results"][0]["senses"][0]["translation"];
            console.log(holder);
          }
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