var Corp = require('../identities/corp')
  , Runner = require('../identities/runner');

var IdentityFactory = {
  create: function(options){
    var identity;

    function buildFromJSON(json){
      if(json.type.toLowerCase() != "identity"){ throw Error("ID given is not an Identity ID"); }
      if(json.side.toLowerCase() == "corp"){ identity =  new Corp(json); }
      else if(json.side.toLowerCase() == "runner"){ identity =  new Runner(json); }
    }

    if(options.json != undefined){ buildFromJSON(options.json); }

    return identity;
  },

  identityList: function(){
    var id_list = [].concat(Corp.identityIDs(), Runner.identityIDs());
    return id_list;
  }
}

module.exports = IdentityFactory;
