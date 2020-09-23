import {Direction, GameStatus, IGameViewer} from './type'
import {BigSquare} from './BigSquare'
import {getRandomShape, TShape} from './RussiaBlock'
import GameConfig from './GameConfig'
import { RussiaBlockRule } from './RussiaBlockRule'
import PageConfig from './view/PageConfig'
import { Square } from './Square'
import { ready } from 'jquery'

export class Game{

    private _gameStatus : GameStatus = GameStatus.ready

    private _curBigSquare? : BigSquare;

    private _nextBigSquare : BigSquare = getRandomShape()

    private _existsSquare : Square [] = [];

    //方块下落计时器
    private _dropTimer? : number;

    //方块下落时间间隔
    private _timerInterval : number = GameConfig.IntervalTime;

    private _score : number = 0;

    constructor(private _gamerViewer : IGameViewer){
        this._gamerViewer.init(this);
    }

    get gameStatus(){
        return this._gameStatus;
    }

    start(){
        if(this._gameStatus === GameStatus.ready){
            this.switchSquare();
            this._gamerViewer.start()
        }
        if(this._gameStatus === GameStatus.over){
            this._gameStatus = GameStatus.playing;
            this._existsSquare.forEach( sq => sq.viewer!.remove());
            this._existsSquare = [];
            this._curBigSquare = undefined;
            clearInterval(this._dropTimer);
            this._dropTimer = undefined;
            this._score = 0;
            this._gamerViewer.renderScore(String(this._score));
            this._gamerViewer.start()
            this.switchSquare();
            return ;
        }
        if(this._gameStatus !== GameStatus.playing){
            this._gameStatus = GameStatus.playing;
            this._gamerViewer.start()
            this.bigSquareDropDownAutomatic();
        }
    }

    pause(){
        if(this._gameStatus !== GameStatus.pause){
            this._gameStatus = GameStatus.pause
            this._gamerViewer.pause();
            this.bigSquareDropDownStop();
        }
    }

    left(){
        if(this._curBigSquare && this._gameStatus === GameStatus.playing){
            RussiaBlockRule.move(this._curBigSquare, Direction.left, this._existsSquare)
        }
    }

    right(){
        if(this._curBigSquare && this._gameStatus === GameStatus.playing){
            RussiaBlockRule.move(this._curBigSquare, Direction.right, this._existsSquare)
        }
    }
    down(){
        if(this._curBigSquare && this._gameStatus === GameStatus.playing){
            if(!RussiaBlockRule.move(this._curBigSquare, Direction.down, this._existsSquare)){
                this.touchBottom();
            }
        }
    }
    downBottom(){
        if(this._curBigSquare && this._gameStatus === GameStatus.playing){
            RussiaBlockRule.moveBottom(this._curBigSquare,this._existsSquare)
            this.touchBottom();
        }
    }
    rotate(){
        if(this._curBigSquare && this._gameStatus === GameStatus.playing){
            RussiaBlockRule.rotate(this._curBigSquare, this._existsSquare);
        }
    }

    private bigSquareDropDownAutomatic(){
        if(this._dropTimer){
            return ;
        }
        this._dropTimer = setInterval(()=>{
            if(this._curBigSquare){
                if(!RussiaBlockRule.move(this._curBigSquare, Direction.down, this._existsSquare)){
                    this.touchBottom();
                }
            }
        },this._timerInterval)
    }

    private bigSquareDropDownStop(){
        
        if(this._dropTimer){
            clearInterval(this._dropTimer);
            this._dropTimer = undefined;
        }
    }

    //将下一个方块切换到游戏区
    private switchSquare(){
        this._curBigSquare = this._nextBigSquare;
        this.resetBigSquareCenterPoint(GameConfig.PanelConfig.width, this._curBigSquare);
        this._gamerViewer.nextSquareSwitchPanel(this._curBigSquare);
         //判断游戏是否结束
         if(!RussiaBlockRule.canMove(this._curBigSquare.bigSquareType, this._curBigSquare.centerPoint, this._existsSquare)){
            this._gameStatus = GameStatus.over;
            this.bigSquareDropDownStop();
            this._curBigSquare.squareArr.forEach(sq => {
                sq.viewer!.remove();
            });
            this._gamerViewer.gameover();
            return ;
        }
        this._nextBigSquare = getRandomShape();
        this.resetBigSquareCenterPoint(GameConfig.nextSquarePanel.width, this._nextBigSquare);
        this._gamerViewer.renderNextPanel(this._nextBigSquare);
        this.bigSquareDropDownStop();
        this.bigSquareDropDownAutomatic();
    }

    //重置居中坐标中心点
    private resetBigSquareCenterPoint(width : number, bigSquare : BigSquare){
        const centerX = Math.ceil( width / 2  - 1);
        bigSquare.centerPoint = { x :  centerX, y : bigSquare.centerPoint.y };
        while( bigSquare.squareArr.some( square => {return square.point.y < 0}) ){
            bigSquare.centerPoint = { x : bigSquare.centerPoint.x , y : bigSquare.centerPoint.y + 1};
        }
    }

    //当触底时
    private touchBottom(){
        //将触底的方块加入exists数组
        if(this._curBigSquare){
            this._existsSquare.push(...this._curBigSquare.squareArr);
        }
        //判断消除
        const ally = this._existsSquare.map( ele => ele.point.y );
        const minY = Math.min(...ally);
        const maxY = Math.max(...ally);
        let pointYPlus : Square [] = []
        let deleteNum = 0;
        //从上到下,检查每一列的方块是否为面板宽度
        for(let y = minY ; y <= maxY ; y++){
            const thisYSquareArr = this._existsSquare.filter( sq => sq.point.y == y );
            if(thisYSquareArr.length === GameConfig.PanelConfig.width){
                deleteNum++;
                thisYSquareArr.forEach( ele=> {
                    if(ele.viewer){
                        ele.viewer.remove();
                    }
                    this._existsSquare.filter( sq => sq.point.y < y ).forEach(sq => {
                        if(pointYPlus.indexOf(sq) == -1){
                            pointYPlus.push(sq);
                        }
                    })
                    const index = this._existsSquare.indexOf(ele);
                    this._existsSquare.splice(index, 1);
                })
            }
        }
        pointYPlus.forEach( sq => sq.point = { x : sq.point.x , y : sq.point.y + 1 * deleteNum})
        this.addScore(deleteNum);
        this._gamerViewer.renderScore(String(this._score));
        //将下一组方块移到游戏面板中
        this.switchSquare();
    }

    private addScore(deleteLine : number){
        if(deleteLine == 0){
            return ;
        }
        if(deleteLine == 1){
         this._score += 10;   
        }else if(deleteLine == 2){
            this._score += 30;
        }else if(deleteLine == 3){
            this._score += 60;
        }else{
            this._score += 80;
        }
    }

}