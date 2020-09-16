// 一副牌Deck 类型
import { Color, Mark } from './enum';


// export type Deck = Card[]; 


//牌(普通牌和大小王)
export interface Card{
    toString() : void
}

//普通牌接口
export interface NormalCard extends Card{
    color : Color,
    mark : Mark
}

//大小王接口
export interface Joker extends Card{
    type : 'JOKER' | 'joker'
}


// 一张牌NormalCard 类型
// export type NormalCard = {
//     color :  Color,
//     mark : Mark
// };


