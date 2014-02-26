var Identity = require('./identity');

Runner = function(json){
  function setFaction(faction, id){
    var corps = ["anarch", "criminal", "shaper"];
    if(corps.indexOf(faction) < 0) throw Error('Invalid corporate faction');
    id.faction = faction;
  }

  function setRunnerAttributes(json, id){
    id.link = json.baselink || 0;
    id.memory = 4;
    id.tags = 0;
  }
  Identity.call(this, json);
  this.side = "runner";
  setFaction(json.faction_code, this);
  setRunnerAttributes(json, this);
}
Runner.prototype = Object.create(Identity.prototype);

Runner.identityIDs = function(){
  var id_list = ["05030"];
  return id_list;
}

module.exports = Runner;
