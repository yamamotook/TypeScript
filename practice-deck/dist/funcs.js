"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeck = exports.getDeck = void 0;
const enum_1 = require("./enum");
/// 创建一副牌，返回一副牌
function getDeck() {
    const deck = [];
    const marks = Object.values(enum_1.Mark);
    const colors = Object.values(enum_1.Color);
    for (const m of marks) {
        for (const c of colors) {
            deck.push({
                color: c,
                mark: m
            });
        }
    }
    return deck;
}
exports.getDeck = getDeck;
// 打印一副牌的花色
function printDeck(deck) {
    let result = '';
    deck.forEach((card, i) => {
        let str = card.color + card.mark;
        result += str + '\t';
        if ((i + 1) % 8 == 0)
            result += '\n';
    });
    console.log(result);
}
exports.printDeck = printDeck;
