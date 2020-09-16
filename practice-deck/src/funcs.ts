import { Mark, Color } from "./enum";
import { Card, Deck, Joker, NormalCard } from "./types";


/// 创建一副牌，返回一副牌
export function getDeck() : Deck{
    const deck : Deck = [];
    const marks = Object.values(Mark);
    const colors = Object.values(Color);
    for(const m of marks){
        for(const c of colors){
            //对象兼容性
            // 写法1 : 利用鸭子辨型法(不使用对象字面量)
            /**
             * const card = {
             *   toString(){
             *      return this.color + this.mark
             *  },
             *  color : c,
             *  mark : m
             * }
             * deck.push(card)
             */
            //写法2 : 对象类型断言(使用对象字面量)
            // 告诉ts 这个Card 就是一张普通牌
            deck.push(<NormalCard>{
                toString(){
                    return this.color + this.mark;
                },
                color : c,
                mark : m
            });
            
        }
    }
    //添加大小王
    let joker : Joker;
    joker = {
        toString(){
            return 'JOKER'
        },
        type : 'JOKER'
    }
    deck.push(joker);
    joker = {
        toString(){
            return 'joker'
        },
        type : 'joker'
    };
    deck.push(joker);
    return deck;
}


// 打印一副牌的花色
export function printDeck(deck : Deck) : void{
    let result : string = '';
    deck.forEach( (card,i) => {
        result +=  card.toString() + '\t';
        if( (i + 1) % 8 == 0 ) result += '\n';
    });
    console.log(result);
}
