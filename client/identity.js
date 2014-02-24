var Card = require("./card");

function Identity(options){
  function buildFromId(id_id, id){
    if(!Identity.isIdentity(id_id)) throw Error("ID given is not an Identity ID");
    Card.getFromAPIUsingID(id_id, function(json){
      buildFromJSON(json, id);
    });
  }

  function buildFromJSON(json, id){
    setMinimumDeckSize(json.minimumdecksize, id);
    setMaximumInfluence(json.influencelimit, id);
  }

  function setMinimumDeckSize(deck_size, id){
    if(deck_size == undefined) throw Error('Identities require a minimum deck size');
    id.card_min = deck_size;
  }

  function setMaximumInfluence(limit, id){
    if(limit == undefined) throw Error('Identities require a maximum influence');
    id.influence_max = limit;
  }


  // BEGIN CONSTRUCTOR
  if(options.json != undefined) buildFromJSON(options.json, this);
  else if(options.id != undefined) buildFromId(options.id, this);
}

Identity.isIdentity = function(id_id){
  var identity_ids = ["02031"];

  return identity_ids.indexOf(id_id) >= 0;
};

module.exports = Identity;
