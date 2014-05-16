function Identity(json){
  function setMinimumDeckSize(deck_size){
    if(deck_size == undefined) throw Error('Identities require a minimum deck size');
    this.card_min = deck_size;
  }

  function setMaximumInfluence(limit){
    if(limit == undefined) throw Error('Identities require a maximum influence');
    this.influence_max = limit;
  }

  setMinimumDeckSize.call(this, json.minimumdecksize);
  setMaximumInfluence.call(this, json.influencelimit);
}

module.exports = Identity;
