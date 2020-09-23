import {  IViewer, Point } from "./type";

//一个小方块、
export class Square{

    get viewer(){
        return this._viewer;
    }

    set viewer(val){
        this._viewer = val;
        if(this._viewer){
            this._viewer.render();
        }
    }

    get point(){
        return this._point;
    }
    set point(val : Point){
        this._point = val;
        if(this._viewer){
            this._viewer.render();
        }
    }

    get color(){
        return this._color;
    }
    set color(val){
        this._color = val;
    }
    constructor(
        private _point : Point,
        private _color : string,
        private _viewer? : IViewer
    ){}
  


}


