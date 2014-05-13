var Identity = require('./identity');

Runner = function(json){
  function setFaction(faction){
    var corps = ["anarch", "criminal", "shaper"];
    if(corps.indexOf(faction) < 0) throw Error('Invalid corporate faction');
    this.faction = faction;
  }

  function setRunnerAttributes(json){
    this.link = json.baselink || 0;
    this.memory = 4;
    this.tags = 0;
  }

  Identity.call(this, json);
  this.side = "runner";
  setFaction.call(this, json.faction_code);
  setRunnerAttributes.call(this, json);
}
Runner.prototype = Object.create(Identity.prototype);

Runner.identityIDs = function(){
  var id_list = ["05030"];
  return id_list;
}

module.exports = Runner;
