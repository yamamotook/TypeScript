import { BigSquare } from "./BigSquare";
import { Game } from "./Game";

export interface Point{
    readonly x : number
    readonly y : number
}

export interface IViewer{
    //显示方块
    render : () => void
    remove : () => void
}

export enum Direction{
    down,
    left,
    right
}

export enum GameStatus{
    ready,
    playing,
    pause,
    over
}

export interface IGameViewer{
    renderNextPanel(bigSquare : BigSquare) : void;
    nextSquareSwitchPanel(bigSquare : BigSquare) : void;
    renderScore(score : string) : void;
    init(game : Game) : void;
    pause() : void;
    start() : void;
    gameover() : void;

} 