var IdentityFactory = require('./identity_factory');

function DeckList(deck_list){
  function discernIdentity(deck_list, deck_json){
    var id_list = IdentityFactory.identityList()
      , id_length = id_list.length;
    for(var i = 0; i < id_length; i++){
      if(deck_json[id_list[i]] != undefined){
        assignIdentity(deck_list, deck_json[id_list[i]]);
        delete deck_json[id_list[i]];
      }
    }
    if(deck_list.identity == undefined){ throw Error("Deck list has no identity") };
  }
  function buildDeckList(deck_list, deck_json){
    for(card_id in deck_json){
      if(!deck_json.hasOwnProperty(card_id)) continue;
      var card = card_id // TODO: Replace with card instantiation
        , times_in_deck = deck_json[card_id];
      if(times_in_deck > 3){ throw Error("Deck list cannot have more than 3 of any given card"); }
      for(i = 0; i < times_in_deck; i++) deck_list.cards.push(card);
    }
  }

  function assignIdentity(deck_list, id){
    if(deck_list.identity != undefined){ throw Error("Deck list cannot have more than one identity") };
    deck_list.identity = IdentityFactory.create({id: id});
  }

  this.cards = [];
  discernIdentity(this, deck_list);
  buildDeckList(this, deck_list);
}

module.exports = DeckList;
