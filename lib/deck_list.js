var Agenda = require('./cards/agenda')
  , async = require('async')
  , CardFactory = require('./factories/card_factory')
  , Corp = require('./identities/corp')
  , IdentityFactory = require('./factories/identity_factory');

function DeckList(deck_list, finalized){
  function discernIdentity(){
    var id_list = IdentityFactory.identityList()
      , id_length = id_list.length
      , id_added
      , id_retrieval = []
      , context = this;
    for(var i = 0; i < id_length; i++){
      var func;
      if(this.deck_list[id_list[i]] != undefined){
        id_added = true;
        func = (function(x){
          return function(callback){
            assignIdentity.call(context, id_list[x], callback);
          }
        })(i);
        id_retrieval.push(func);
        delete this.deck_list[id_list[i]];
      }
    }
    if(id_added != true){ return finalized(Error("Deck list has no identity")) };
    async.series(id_retrieval, function(err){
      if(err){ return finalized(err); }
      buildDeckList.call(context);
    })
  }

  function assignIdentity(id, callback){
    var context = this;
    CardFactory.create({id: id}, function(card){
      if(context.identity != undefined){ return callback(Error("Deck list cannot have more than one identity")) };
      context.identity = card;

      if(context.identity.side == Corp.side){
        context.agenda_points = 0;
      }
      callback();
    });
  }

  function buildDeckList(){
    var card_retrieval = []
      , context = this;
    for(card_id in this.deck_list){
      var func;
      if(!this.deck_list.hasOwnProperty(card_id)) continue;

        func = (function(c_id){
          return function(callback){
            CardFactory.create({id: c_id}, function(card){
              var times_in_deck = context.deck_list[c_id];
              if(times_in_deck > 3){ return callback(Error("Deck list cannot have more than 3 of any given card")); }
              for(i = 0; i < times_in_deck; i++){
                if(err = addCardToDeck.call(context, card)){ return callback(err); }
              }
              callback();
            });
          }
        })(card_id);
        card_retrieval.push(func);
    }

    async.parallel(card_retrieval, function(err){
      if(err){ return finalized(err); }
      return finalized(checkDeckSize.call(context));
    });
  }

  function addCardToDeck(card){
    var err;
    if(card.side != this.identity.side){ return Error("You can't have "+card.side+" cards in a "+this.identity.side+" deck"); }
    if(err = addInfluenceForCard.call(this, card)){ return err; }
    if(err = addAgendaPointsForCard.call(this, card)){ return err; }
    this.cards.push(card);
  }

  function addInfluenceForCard(card){
    if(card.faction != this.identity.faction){
      this.influence += card.influence;
      if(this.influence > this.identity.influence_max){ return Error("Deck List must not exceed identity's maximum influence"); }
    }
  }

  function addAgendaPointsForCard(card){
    if(card.type != Agenda.type){ return; }
    if(card.faction != "neutral" &&
       card.faction != this.identity.faction){ return Error("Another faction's agenda may not be included in a deck"); }
    this.agenda_points += card.agenda_points;
  }

  function checkDeckSize(){
    var err;
    if(this.cards.length < this.identity.card_min){ return Error("Deck list must meet minimum deck size for given identity"); }
    if(this.identity.side == Corp.side){ if(err = checkAgendaPoints.call(this, this.cards.length)){ return err }; }
  }

  function checkAgendaPoints(deck_size){
    additional_agenda_points = Math.floor((deck_size - 40) / 5) * 2;
    min_req = 18 + additional_agenda_points;
    max_req = 19 + additional_agenda_points;
    if(this.agenda_points < min_req){      return Error("Deck list has too few agenda points");  }
    else if(max_req < this.agenda_points){ return Error("Deck list has too many agenda points"); }
  }

  this.cards = [];
  this.influence = 0;
  this.deck_list = deck_list;
  if(finalized == undefined) finalized = function(){};
  discernIdentity.call(this);
}

module.exports = DeckList;
