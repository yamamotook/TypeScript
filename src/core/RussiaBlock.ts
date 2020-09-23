import { BigSquare } from './BigSquare';
import {Point} from './type'
import { getRandom } from './utils'

//Shape : ....
export class  HorizonLineShape extends BigSquare{

    //默认逆时针旋转
    _clock : boolean = false;

    constructor(centerPoint : Point, color : string){
        super([{ x : -1, y : 0 },
            { x : 0, y : 0 },
            { x : 1, y : 0 },
            { x : 2, y : 0 }], centerPoint, color);
    }
    
    //重写父类rotate
    rotate(){
        this._BigSquareType = this.calcRotatePoint();
        this._clock = !this._clock;
        this.updateSquarePoint();
    }
}

//Shape :
// .
// .
// .
// .
export class VerticalLineShape extends BigSquare{
    constructor(centerPoint : Point, color : string){
        super([{ x : 0, y : -1 },
            { x : 0, y : 0 },
            { x : 0, y : 1 },
            { x : 0, y : 2 }], centerPoint, color);
    }
    rotate(){
        this._BigSquareType = this.calcRotatePoint();
        this._clock = !this._clock;
        this.updateSquarePoint();
    }
}
    

//Shape : 
// ..
// ..
export class MicrosoftShape extends BigSquare{
    constructor(centerPoint : Point, color : string){
        super([{ x : 0, y : 0 },
            { x : 1, y : 0 },
            { x : 0, y : 1 },
            { x : 1, y : 1 }], centerPoint, color);
    }
    //田字方块 不能旋转  
    rotate(){
        return ;
    }
}
    
//Shape : 
//  ..
// ..
export class MirrorZShape extends BigSquare{

    constructor(centerPoint : Point, color : string){
        super([ { x : -1, y : 0 },
            { x : 0, y : 0 },
            { x : 0, y : -1 },
            { x : 1, y : -1 }], centerPoint, color);
    }
    rotate(){
        this._BigSquareType = this.calcRotatePoint();
        this._clock = !this._clock;
        this.updateSquarePoint();
    }
}

//Shape : 
//  ..
//   ..
export class ZShape extends BigSquare{
    constructor(centerPoint : Point, color : string){
        super([ { x : -1, y : -1 },
            { x : 0, y : -1 },
            { x : 0, y : 0 },
            { x : 1, y : 0 }], centerPoint, color);
    }
    rotate(){
        this._BigSquareType = this.calcRotatePoint();
        this._clock = !this._clock;
        this.updateSquarePoint();
    }
}
    


//Shape:
//  .
// ...
export class MirrorTShape extends BigSquare{
    constructor(centerPoint : Point, color : string){
        super([ { x : -1, y : 0},
            { x : 0, y : 0},
            { x : 1, y : 0},
            { x : 0, y : -1}], centerPoint, color);
    }
}


//Shape :
// ...
//  .
export class TShape extends BigSquare{

    constructor(centerPoint : Point, color : string){
        super([  { x : -1, y : 0},
            { x : 0, y : 0},
            { x : 1, y : 0},
            { x : 0, y : 1}], centerPoint, color);
    }
   
}

//Shape : 
//   .
// ...
export class LShape extends BigSquare{
    constructor(centerPoint : Point, color : string){
        super([ 
            { x : -2, y : 0},
            { x : -1, y : 0},
            { x : 0, y : 0},
            { x : 0, y : -1}
        ], centerPoint, color);
    }   
}





const shapeArr = [
    HorizonLineShape,
    VerticalLineShape,
    MicrosoftShape,
    MirrorZShape,
    ZShape,
    MirrorTShape,
    TShape,
    LShape
]
const colors = [
    'red',
    'green',
    'orange',
    'blue'
]

export function getRandomShape(centerPoint : Point = {x : 0, y : 0}) : BigSquare{
    const shapeIndex = getRandom(0, shapeArr.length);
    const colorIndex = getRandom(0, colors.length);
    return new shapeArr[shapeIndex](centerPoint, colors[colorIndex]);
}
