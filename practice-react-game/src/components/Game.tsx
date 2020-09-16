import React, { Component } from 'react'
import { ChessType } from '../tools/enum'
import { ChessBoard } from './ChessBoard'
import './Game.css'

interface iState{
    ChessesType: ChessType []
    isBlackNext : boolean
    isGameOver : boolean
    winner : ChessType
}

export default class Game extends Component < {}, iState> {
    
    state : iState = {
        ChessesType:[ ChessType.none,
            ChessType.none,
            ChessType.none,
            ChessType.none,
            ChessType.none,
            ChessType.none,
            ChessType.none,
            ChessType.none,
            ChessType.none
        ],
        isBlackNext : true, //默认黑棋先,
        isGameOver : false,
        winner : ChessType.none
    }

    onChessClick = (index : number) => {
       if(!this.state.isGameOver) {
        const curChessType = this.state.isBlackNext ? ChessType.black : ChessType.red;
        this.state.ChessesType[index] = curChessType;
        this.setState({
            ChessesType : [...this.state.ChessesType],
            isBlackNext : !this.state.isBlackNext
        });
        this.checkGameOver();  
       }
    }

    checkGameOver = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        const state = this.state;
        for(let i = 0 ; i < lines.length; i++){
            const [a, b, c] = lines[i];
            if(state.ChessesType[a] && state.ChessesType[a] === state.ChessesType[b] && state.ChessesType[a] === state.ChessesType[c]){
                this.setState({
                    ...state,
                    isGameOver : true,
                    winner : state.ChessesType[a]
                });
                return ;
            }
        }
        //判断胜利
        const isTied =  state.ChessesType.every(type => type!=ChessType.none);
        if(isTied){
            this.setState({
                ...state,
                isGameOver : true
            })
        }
    }

    restartGame = () =>{
        this.setState({
            ChessesType : [ ChessType.none,
                ChessType.none,
                ChessType.none,
                ChessType.none,
                ChessType.none,
                ChessType.none,
                ChessType.none,
                ChessType.none,
                ChessType.none
            ],
            isBlackNext : true,
            isGameOver : false
        })
    }

    render() {
        let winner = null;
        if(this.state.isGameOver){
            if(this.state.winner === ChessType.red){
                winner = <p>红方胜利!</p>
            }else if(this.state.winner === ChessType.black){
                winner = <p>黑方胜利!</p>
            }else{
                winner = <p>平局!</p>
            }
        }
        return (
            <div className="game">
                <h2 className="gameTitle">下一步:{this.state.isBlackNext ? '黑棋' : '红棋'}</h2>
                {winner}
                <ChessBoard ChessesType={this.state.ChessesType}  onClick={this.onChessClick}/>
                <button className="restartGame" onClick={this.restartGame}>重新开始</button>
            </div>
        )
    }
}
