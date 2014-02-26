var Identity = require('./identity');

function Corp(json){
  function setFaction(faction, id){
    var corps = ["jinteki", "weyland-consortium", "haas-bioroid", "nbn"];
    if(corps.indexOf(faction) < 0) throw Error('Invalid corporate faction');
    id.faction = faction;
  }

  function setCorpAttributes(json, id){
    id.bad_reputation = 0;
  }

  Identity.call(this, json);
  this.side = "corp";
  setFaction(json.faction_code, this);
  setCorpAttributes(json, this);
}
Corp.prototype = Object.create(Identity.prototype);

Corp.identityIDs = function(){
  var id_list = ["02031"];
  return id_list;
}

module.exports = Corp;
