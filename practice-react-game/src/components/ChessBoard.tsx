import React, { Component } from 'react'
import { ChessType } from '../tools/enum'
import Chess from './Chess'
import './ChessBoard.css'

interface IProps{
    ChessesType : ChessType []
    onClick? : (index : number) => void
}

export  class ChessBoard extends Component<IProps> {
    render() {
        const chessList = this.props.ChessesType.map( (chessType, index) =>{
            return <Chess type={chessType} index={index}  onClick={this.props.onClick} key={index} ></Chess>   
        })
        return (
            <div className="chessBoard">
                {chessList}
            </div>
        )
    }
}
