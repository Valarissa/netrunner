var Identity = require('./identity');

function Corp(json){
  function setFaction(faction){
    var corps = ["jinteki", "weyland-consortium", "haas-bioroid", "nbn"];
    if(corps.indexOf(faction) < 0) throw Error('Invalid corporate faction');
    this.faction = faction;
  }

  function setCorpAttributes(json){
    this.bad_reputation = 0;
  }

  Identity.call(this, json);
  this.side = "corp";
  setFaction.call(this, json.faction_code);
  setCorpAttributes.call(this, json);
}
Corp.prototype.parent = Object.create(Identity.prototype);

Corp.identityIDs = function(){
  var id_list = ["02031"];
  return id_list;
}

Corp.side = "corp";

module.exports = Corp;
