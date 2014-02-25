var Card = require('./card')
  , Corp = require('./corp')
  , Runner = require('./runner');

var IdentityFactory = {
  create: function(options){
    var identity;

    function buildFromId(id_id){
      return Card.getFromAPIUsingID(id_id, function(json){ buildFromJSON(json); });
    }

    function buildFromJSON(json){
      if(json.type_code != "identity"){ throw Error("ID given is not an Identity ID"); }
      if(json.side == "Corp"){ identity =  new Corp(json); }
      else if(json.side == "Runner"){ identity =  new Runner(json); }
    }

    if(options.json != undefined){ buildFromJSON(options.json); }
    else if(options.id != undefined){ buildFromId(options.id); }

    return identity;
  },

  isIdentity: function(card_id){
    var id_ids = ["05030", "02031"];

    return id_ids.indexOf(card_id) >= 0;
  }
}

module.exports = IdentityFactory;
