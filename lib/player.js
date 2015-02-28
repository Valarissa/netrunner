var DeckList = require('./deck_list');

function Player(options, finalize){
  var player = this;
  options = options || {};
  finalize = finalize || function(){};

  new DeckList(options.deck, function(err){
    if(err != undefined){ return finalize(err) }

    player.identity = this.identity;
    player.deck = this.cards;
    player.scored_agendas = [];
    player.credits = 5;
    player.hand = [];

    player.identity.prepare(player);
    finalize();
  })
}

module.exports = Player;
