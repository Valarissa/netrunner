function Deck(deck_list){
  deck_list = deck_list || {};
  this.identity = deck_list.identity;
  this.deck = deck_list.cards;

  Deck.checkDeck(this);
}

Deck.checkDeck = function(deck){
  if(deck.identity == undefined) throw Error('Deck has no identity');
  Deck.checkIdentityMinimum(deck);
  throw Error('Deck is invalid');
}

Deck.checkIdentityMinimum = function(deck){
  if(deck.deck.length < deck.identity.card_min) throw Error('Deck has too few cards for given identity');
}

module.exports = Deck;
