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