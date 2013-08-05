new (Backbone.Router.extend({
  routes: module.routes,
  index: function() {
    var collection = new Application.Collection([]);
    var view = new Application.Views["todos/index"]({
      collection: collection
    });
    Application.setView(view);
  }
}));