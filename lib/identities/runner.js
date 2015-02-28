var Identity = require('./identity');

Runner = function(json){
  function setFaction(faction){
    var factions = ["anarch", "criminal", "shaper"];
    if(factions.indexOf(faction) < 0) throw Error('Invalid runner faction');
    this.faction = faction;
  }

  function setRunnerAttributes(json){
    this.link = json.baselink || 0;
    this.memory = 4;
    this.tags = 0;
  }

  Identity.call(this, json);
  this.side = "runner";
  setFaction.call(this, json.faction_code || json.faction);
  setRunnerAttributes.call(this, json);
}
Runner.prototype = Object.create(Identity.prototype);
Runner.prototype.parent = Identity.prototype;

Runner.identityIDs = function(){
  var id_list = ["05030"];
  return id_list;
}

module.exports = Runner;
