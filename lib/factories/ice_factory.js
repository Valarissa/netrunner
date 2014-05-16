var Ice = require('../cards/ice');

var IceFactory = {
  create: function(options){
    var ice;

    function buildFromJSON(json){
      ice = new Ice(json);
    }

    if(options.json != undefined){ buildFromJSON(options.json); }

    return ice;
  }
};

module.exports = IceFactory;
