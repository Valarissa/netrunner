var IdentityFactory = require('./identity_factory');

function DeckList(deck_list){
  function buildDeckList(deck_list, deck_json){
    for(card_id in deck_json){
      if(!deck_json.hasOwnProperty(card_id)) continue;
      if(IdentityFactory.isIdentity(card_id)){
        assignIdentity(deck_list, IdentityFactory.create({id:card_id}));
        continue;
      }
      var card = card_id // TODO: Replace with card instantiation
        , times_in_deck = deck_json[card_id];
      if(times_in_deck > 3){ throw Error("Deck list cannot have more than 3 of any given card"); }
      for(i = 0; i < times_in_deck; i++) deck_list.cards.push(card);
    }
  }

  function assignIdentity(deck_list, id){
    if(deck_list.identity != undefined){ throw Error("Deck list cannot have more than one identity") };
    deck_list.identity = id;
  }

  this.cards = [];
  this.identity = null;
  buildDeckList(this, deck_list);
  if(this.identity == null) throw Error('Deck List has no identity');
}

module.exports = DeckList;
