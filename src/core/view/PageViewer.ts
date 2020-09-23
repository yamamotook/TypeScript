import { GameStatus, IGameViewer, IViewer } from "../type";
import $ from 'jquery';
import { Square } from "../Square";
import PageConfig from './PageConfig';
import { BigSquare } from "../BigSquare";
import { Game } from "../Game";
import GameConfig from "../GameConfig";

export class SquarePageDomViewer implements IViewer{

    //小方块的dom
    private _dom? : JQuery<HTMLElement> 

    private _isRemove : boolean = false //方块dom是否移除

    constructor(private square : Square, private container : JQuery<HTMLElement> ){}

    get isRemove(){
        return this._isRemove;
    }

    render(){
        if(this._isRemove) return;
        const squareWidth = PageConfig.PageBlockConfig.width;
        const squareHeight = PageConfig.PageBlockConfig.height
        if(!this._dom){
            this._dom = $('<div>').css({
                position : 'absolute',
                width : squareWidth,
                height : squareHeight,
                boxSizing : 'border-box',
                border : `1px solid ${PageConfig.PageBlockConfig.borderColor}`
            })
            this._dom.appendTo(this.container);       
        }
        this._dom.css({
            left : this.square.point.x * squareWidth,
            top : this.square.point.y * squareHeight,
            backgroundColor : this.square.color
        });
    }

    remove(){
        if(this._dom){
            this._dom.remove();
            this._isRemove = false;
        }
    }


}

export class GamePageViewer implements IGameViewer{

    private $panel = $('#pannel');
    private $nextPanel = $('#nextSquarePanel')
    private $score = $('#score');
    private $msg = $('#msg');

    renderScore(score: string): void {
        if(this.$score.text() == score){
            return ;
        }
        this.$score.text(score);
    }
    gameover(): void {
        this.$msg.text('游戏结束')
            .css({
                display : 'block'
            });
    }

    pause(): void {
        this.$msg.text('游戏暂停')
            .css({
                display : 'block'
            });
        
    }
    start(): void {
        this.$msg.css({
            display : 'none'
        });
    }
    

    //根据game对象渲染界面
    init(game : Game){
        //初始化游戏界面
        this.$panel.css({
            width : PageConfig.PageBlockConfig.width * GameConfig.PanelConfig.width,
            height : PageConfig.PageBlockConfig.height * GameConfig.PanelConfig.height,
            background : '#000',
            position : 'relative',
        });
        this.$nextPanel.css({
            width : PageConfig.PageBlockConfig.width * GameConfig.nextSquarePanel.width,
            height : PageConfig.PageBlockConfig.height * GameConfig.nextSquarePanel.height,
            background : '#000',
            position : 'relative',
            margin : '0 1em'

        });
        //绑定事件
        $(document).on('keydown', function(e){
            if(e.key == 's'){
                game.down();
            }else if(e.key == 'a'){
                game.left();
            }else if(e.key == 'd'){
                game.right()
            }else if(e.key == ' '){
                if(game.gameStatus !== GameStatus.playing){
                    game.start();
                }else{
                    game.pause();
                }
            }else if(e.key == 'j'){
                game.rotate();

            }else if(e.key == 'k'){
                game.downBottom();
            }
        })
    }


    renderNextPanel(bigSquare : BigSquare): void {
        bigSquare.squareArr.forEach( square =>{
            square.viewer = new SquarePageDomViewer(square, this.$nextPanel)
        })
    }

    nextSquareSwitchPanel(bigSquare : BigSquare): void {
        bigSquare.squareArr.forEach( square =>{
            if(square.viewer){
                square.viewer.remove();
            }
            square.viewer = new SquarePageDomViewer(square, this.$panel)
        })
    }
    
    
    
}