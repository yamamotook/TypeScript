import { Square } from "./Square";
import { Point } from "./type";

export class BigSquare{
    protected _squareArr: readonly Square[]
    protected _clock : boolean = true;//true ： 顺时针， false ： 逆时针
    constructor(protected _BigSquareType : readonly Point [], protected _centerPoint: Point, private _color : string ){
        const sqArr : Square[] = [];
        this._BigSquareType.forEach( point => {
            const squarePoint = { x : point.x + this._centerPoint.x, y : point.y + this._centerPoint.y }
            const sq = new Square(squarePoint, this._color);
            sqArr.push(sq);
        })
        this._squareArr = sqArr;
    }

    /**
     * 计算旋转后的坐标并返回
     */
    calcRotatePoint():Point []{
        if(this._clock){
             const newPoints : Point[]= this._BigSquareType.map( p =>{
                return {
                    x : -p.y,
                    y : p.x
                }
            })
            return newPoints;
        }else{
            const newPoints : Point[]= this._BigSquareType.map( p =>{
                return {
                    x : p.y,
                    y : -p.x
                }
            })
            return newPoints;
        }
    }

    // 更新小方块的坐标
    protected  updateSquarePoint(){
        this._BigSquareType.forEach((square,index) => {
            this._squareArr[index].point = {
                x : square.x + this._centerPoint.x,
                y : square.y + this._centerPoint.y
            }
        })
    }

    //根据旋转后的坐标旋转
     rotate(newPoints : Point[]){
        this._BigSquareType = newPoints;
        this.updateSquarePoint();
    }

    get squareArr(){
        return this._squareArr
    }

    get bigSquareType(){
        return this._BigSquareType;
    }

    get centerPoint(){
        return this._centerPoint;
    }
    set centerPoint(val : Point){
        this._centerPoint = val;
        this.updateSquarePoint();
    }
    
    
}

