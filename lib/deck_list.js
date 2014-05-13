var CardFactory = require('./card_factory'),
    IdentityFactory = require('./identity_factory');

function DeckList(deck_list){
  function discernIdentity(deck_json){
    var id_list = IdentityFactory.identityList()
      , id_length = id_list.length;
    for(var i = 0; i < id_length; i++){
      if(deck_json[id_list[i]] != undefined){
        assignIdentity.call(this, id_list[i]);
        delete deck_json[id_list[i]];
      }
    }
    if(this.identity == undefined){ throw Error("Deck list has no identity") };
  }

  function assignIdentity(id){
    if(this.identity != undefined){ throw Error("Deck list cannot have more than one identity") };
    this.identity = CardFactory.create({id: id});
  }

  function buildDeckList(deck_json){
    for(card_id in deck_json){
      if(!deck_json.hasOwnProperty(card_id)) continue;
      var card = card_id // TODO: Replace with card instantiation
        , times_in_deck = deck_json[card_id];
      if(times_in_deck > 3){ throw Error("Deck list cannot have more than 3 of any given card"); }
      for(i = 0; i < times_in_deck; i++) addCardToDeck.call(this, card);
    }
  }

  function addCardToDeck(card){
    addInfluenceForCard.call(this, card);
    this.cards.push(card);
  }

  function addInfluenceForCard(card){
    if(card.faction != this.identity.faction){
      this.influence += card.influence;
      if(this.influence > this.identity.influence_max){ throw Error("Deck List must not exceed identity's maximum influence"); }
    }
  }

  function checkDeckSize(){
    if(this.cards.length < this.identity.card_min){ throw Error("Deck list must meet minimum deck size for given identity"); }
  }

  this.cards = [];
  discernIdentity.call(this, deck_list);
  buildDeckList.call(this, deck_list);
  checkDeckSize.call(this);
}

module.exports = DeckList;