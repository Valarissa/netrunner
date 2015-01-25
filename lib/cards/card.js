function Card(json){
  this.title = json.title;
  this.text = json.text;
  this.faction = json.faction_code || json.faction;
  this.influence = json.factioncost || json.influence || 0;
  this.cost = json.cost || 0;
  this.side = json.side_code || json.side;
  this.type = json.type_code || json.type;
}

module.exports = Card;
