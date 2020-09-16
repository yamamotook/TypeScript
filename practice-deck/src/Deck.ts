import { Mark, Color } from "./enum";
import { Card, Joker, NormalCard } from "./types";

export class Deck{

    private cards : Card [] = []

    constructor(initCard? : Card[]){
        if(initCard){
            this.cards = initCard;
        }else{
            this.init();
        }      
    }
    
    //生成一副牌
    private init(){
        const marks = Object.values(Mark);
        const colors = Object.values(Color);
        for(const m of marks){
            for(const c of colors){
                this.cards.push(<NormalCard>{
                    toString(){
                        return this.color + this.mark;
                    },
                    color : c,
                    mark : m
                });
                
            }
        }
        let joker : Joker;
        joker = {
            toString(){
                return 'JOKER'
            },
            type : 'JOKER'
        }
        this.cards.push(joker);
        joker = {
            toString(){
                return 'joker'
            },
            type : 'joker'
        }
        this.cards.push(joker);
    }

    //打印牌
    public printCard() : void {
        let result : string = '';
        this.cards.forEach((card, index) => {
            result +=  card.toString() + '\t';
            if( (index + 1) % 8 == 0 ) result += '\n';
        })
        console.log(result);
    }


    public shuffleCards(){
       for(let i = 0 ; i < this.cards.length ; i++){
            const changeIndex = this.randomGet(0, this.cards.length);
            const temp = this.cards[i];
            this.cards[i] = this.cards[changeIndex];
            this.cards[changeIndex] = temp;
       }
    }

    //发牌
    public dealCard() : [ Deck,  Deck, Deck , Deck ] {//元组类型
        let player1 : Deck, player2 : Deck , player3 : Deck, desktop : Deck;
        player1 = this.takeCard(17);
        player2 = this.takeCard(17);
        player3 = this.takeCard(17);
        desktop = this.takeCard(3);
        return [player1, player2, player3, desktop]
    }

    private takeCard(takeCounts) : Deck{
        let cards : Card [] = [];
        for(let i = 0 ; i < takeCounts ; i ++){
            cards.push(<Card>this.cards.shift());
        }
        return new Deck(cards);
    }


    // 生成一个随机数
    private randomGet(min : number , max : number) : number{
        const diff = Math.abs(max - min);
        return Math.ceil(Math.random() * diff + min);
    }


    

}