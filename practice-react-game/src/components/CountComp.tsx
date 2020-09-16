import React from 'react'

interface IProps{
    num : number
    onChange ? : (newVal : number) => void
}


//函数组件
export function Count(props : IProps){
    return (
        <div className="count">
            <button onClick={()=>{
                if(props.onChange){
                    props.onChange( props.num - 1);
                }
            }}>-</button>
            <span>{props.num}</span>
            <button onClick={()=>{
                if(props.onChange){
                    props.onChange( props.num + 1);
                }
            }}>+</button>
        </div>

    )
}