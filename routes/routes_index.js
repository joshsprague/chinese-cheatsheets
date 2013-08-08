module.exports = function(cheatsheets){
  
  cheatsheets.app.get("/pairs", function(req, res) {
    var body = 'Hello World';
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
  });

  cheatsheets.app.use(function(req, res, next){
  res.send(404, 'Sorry cant find that!');
});
};