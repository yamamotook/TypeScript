import React from 'react'
import { ChessType } from '../tools/enum'
import './Chess.css';

interface Iprop{
    type : ChessType
    index : number
    onClick? : (index : number) => void
}

export default function Chess(props : Iprop) {
    let Chess = null;
    if(props.type === ChessType.black){
        Chess = <div className="black chess-item"></div>
    }else if(props.type === ChessType.red){
        Chess = <div className="red chess-item"></div>
    }else{
        Chess = <div className="chess-item"></div>
    }

    return (
        <div>
            <div className="chess" onClick={ ()=>{
                if(props.type === ChessType.none && props.onClick){
                    props.onClick(props.index);
                }
            } }>
                {Chess}
            </div>
        </div>
    )
}
