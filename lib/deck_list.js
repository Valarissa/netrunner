var Agenda = require('./agenda')
  , CardFactory = require('./card_factory')
  , Corp = require('./corp')
  , IdentityFactory = require('./identity_factory');

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

    if(this.identity.side == Corp.side){
      this.agenda_points = 0;
    }
  }

  function buildDeckList(deck_json){
    for(card_id in deck_json){
      if(!deck_json.hasOwnProperty(card_id)) continue;
      var card = CardFactory.create({id: card_id})
        , times_in_deck = deck_json[card_id];
      if(times_in_deck > 3){ throw Error("Deck list cannot have more than 3 of any given card"); }
      for(i = 0; i < times_in_deck; i++) addCardToDeck.call(this, card);
    }
  }

  function addCardToDeck(card){
    if(card.side != this.identity.side){ throw Error("You can't have "+card.side+" cards in a "+this.identity.side+" deck"); }
    addInfluenceForCard.call(this, card);
    addAgendaPointsForCard.call(this, card);
    this.cards.push(card);
  }

  function addInfluenceForCard(card){
    if(card.faction != this.identity.faction){
      this.influence += card.influence;
      if(this.influence > this.identity.influence_max){ throw Error("Deck List must not exceed identity's maximum influence"); }
    }
  }

  function addAgendaPointsForCard(card){
    if(card.type != Agenda.type){ return; }
    if(card.faction != "neutral" &&
       card.faction != this.identity.faction){ throw Error("Another faction's agenda may not be included in a deck"); }
    this.agenda_points += card.agenda_points;
  }

  function checkDeckSize(){
    if(this.cards.length < this.identity.card_min){ throw Error("Deck list must meet minimum deck size for given identity"); }
    if(this.identity.side == Corp.side){ checkAgendaPoints.call(this, this.cards.length); }
  }

  function checkAgendaPoints(deck_size){
    additional_agenda_points = Math.floor((deck_size - 40) / 5) * 2;
    min_req = 18 + additional_agenda_points;
    max_req = 19 + additional_agenda_points;
    if(this.agenda_points < min_req){      throw Error("Deck list has too few agenda points");  }
    else if(max_req < this.agenda_points){ throw Error("Deck list has too many agenda points"); }
  }

  this.cards = [];
  this.influence = 0;
  discernIdentity.call(this, deck_list);
  buildDeckList.call(this, deck_list);
  checkDeckSize.call(this);
}

module.exports = DeckList;
