var Identity = require('./identity');

function DeckList(deck_list){
  this.cards = [];
  this.identity = null;
  DeckList.buildDeckList(this, deck_list);
  if(this.identity == null) throw Error('Deck List has no identity');
}

DeckList.buildDeckList = function(deck_list, deck_json){
  for(card_id in deck_json){
    if(!deck_json.hasOwnProperty(card_id)) continue;
    if(Identity.isIdentity(card_id)){
      DeckList.assignIdentity(deck_list, new Identity({id:card_id}));
      continue;
    }
    var card = card_id // TODO: Replace with card instantiation
      , times_in_deck = deck_json[card_id];
    for(i = 0; i < times_in_deck; i++) deck_list.cards.push(card);
  }
}

DeckList.assignIdentity = function(deck_list, id){
  deck_list.identity = id;
}

module.exports = DeckList;
