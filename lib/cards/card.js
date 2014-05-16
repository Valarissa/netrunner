function Card(json){
  this.faction = json.faction_code;
  this.influence = json.factioncost;
  this.side = json.side_code;
  this.type = json.type_code;
}

module.exports = Card;
