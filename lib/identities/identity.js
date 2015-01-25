function Identity(json){
  function setMinimumDeckSize(deck_size){
    if(deck_size == undefined) throw Error('Identities require a minimum deck size');
    this.card_min = deck_size;
  }

  function setMaximumInfluence(limit){
    if(limit == undefined) throw Error('Identities require a maximum influence');
    this.influence_max = limit;
  }

  this.title = json.title;
  this.type = json.type_code || json.type;
  this.text = json.text;
  setMinimumDeckSize.call(this, json.minimumdecksize || json.card_min);
  setMaximumInfluence.call(this, json.influencelimit || json.influence_max);
}

module.exports = Identity;
