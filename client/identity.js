function Identity(json){
  function setMinimumDeckSize(deck_size, id){
    if(deck_size == undefined) throw Error('Identities require a minimum deck size');
    id.card_min = deck_size;
  }

  function setMaximumInfluence(limit, id){
    if(limit == undefined) throw Error('Identities require a maximum influence');
    id.influence_max = limit;
  }

  setMinimumDeckSize(json.minimumdecksize, this);
  setMaximumInfluence(json.influencelimit, this);
}

module.exports = Identity;
