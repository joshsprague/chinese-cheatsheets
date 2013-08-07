new (Backbone.Router.extend({
  routes: module.routes,
  index: function() {
    var collection = new Application.Collections["wordList/pairs"]([]);
    debugger;
    var view = new Application.Views["wordList/index"]({
      collection: collection
    });
    Application.setView(view);
  }
}));