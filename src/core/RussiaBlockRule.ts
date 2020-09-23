import { Direction, Point } from './type';
import GameConfig from './GameConfig';
import { BigSquare } from './BigSquare'
import { Square } from './Square';

function isTypePoint(obj : any) : obj is Point{
    if(typeof obj.x !== 'undefined'){
        return true;
    }
    return false;
}

export class RussiaBlockRule{


    //根据形状和目标中心点判断是否能够移动(越界)
    static canMove(shape : readonly Point [], targetPoint : Point, existsSqaures : Square[]) : boolean{
        //获得移动后的坐标
        const shapeTargetPoint : Point [] = shape.map( p => {
            return {
                x : p.x + targetPoint.x,
                y : p.y + targetPoint.y
            }
        });
        //判断移动后的坐标是否有越界
        if(shapeTargetPoint.some( p => {
            return p.x < 0 || p.x > GameConfig.PanelConfig.width - 1 || p.y < 0 || p.y > GameConfig.PanelConfig.height - 1
        })){
            return false;
        }

        //判断是否重叠
        
        let result = shapeTargetPoint.some( sq =>{
            return existsSqaures.some( e=>{ return e.point.x == sq.x && e.point.y == sq.y})
        } )
        if(result){
            return false;
        }
        return true;
    }

    //函数重载,当传入的是坐标则直接判断移动
    static move(square : BigSquare, targetPointOrDirection : Point, existsSquare : Square []) : boolean;
    //函数重载,当传入的是方向，先计算坐标在判断移动
    static move(square : BigSquare, targetPointOrDirection : Direction, existsSquare : Square []) : boolean;
    static move(square : BigSquare, targetPointOrDirection : Point | Direction, existsSquare : Square []) : boolean{
        if(!isTypePoint(targetPointOrDirection)){
            let targetPoint : Point;
            if(targetPointOrDirection == Direction.down){
                // down
                targetPoint = {
                    x : square.centerPoint.x,
                    y : square.centerPoint.y + 1
                }
            }else if(targetPointOrDirection == Direction.left){
                // left
                targetPoint = {
                    x : square.centerPoint.x - 1,
                    y : square.centerPoint.y 
                }
            }else {
                // right
                targetPoint = {
                    x : square.centerPoint.x + 1,
                    y : square.centerPoint.y 
                }
            }
            return  this.move(square, targetPoint, existsSquare);
        }else{
            if(this.canMove(square.bigSquareType, targetPointOrDirection,existsSquare)){
                square.centerPoint = targetPointOrDirection;
                return true;
            }
            return false;
        }
    }

    static moveBottom(square : BigSquare, existsSquare : Square []):boolean{
        while(this.move(square, Direction.down, existsSquare)){}
        return true;
    }

    static rotate(square : BigSquare, existsSquare : Square []){
        const newPoint = square.calcRotatePoint();
        if(this.canMove(newPoint, square.centerPoint,existsSquare)){
            square.rotate(newPoint);
        }
    }





}