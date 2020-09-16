// 创建并打印一副扑克牌（大小王不含）

import { Deck } from "./Deck";






const deck = new Deck();

console.log('===========洗牌===========');
deck.shuffleCards();
deck.printCard();
console.log('===========发牌===========');
const decks : [Deck, Deck, Deck, Deck] = deck.dealCard();
console.log('===========player1===========');
decks[0].printCard();
console.log('===========player2===========');
decks[1].printCard();
console.log('===========player3===========');
decks[2].printCard();
console.log('===========player4===========');
decks[3].printCard();



