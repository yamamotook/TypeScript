"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mark = exports.Color = void 0;
// 使用枚举来限制花色 和 牌面大小
// 花色 类型
var Color;
(function (Color) {
    Color["heart"] = "\u2665";
    Color["spade"] = "\u2660";
    Color["Diamond"] = "\u2666";
    Color["Club"] = "\u2663";
})(Color = exports.Color || (exports.Color = {}));
;
var Mark;
(function (Mark) {
    Mark["three"] = "3";
    Mark["four"] = "4";
    Mark["five"] = "5";
    Mark["six"] = "6";
    Mark["seven"] = "7";
    Mark["eight"] = "8";
    Mark["night"] = "9";
    Mark["ten"] = "10";
    Mark["jack"] = "J";
    Mark["queen"] = "Q";
    Mark["king"] = "K";
    Mark["ace"] = "A";
    Mark["two"] = "2";
})(Mark = exports.Mark || (exports.Mark = {}));
