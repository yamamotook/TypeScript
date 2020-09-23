export function getRandom(max:number, min: number){
    const des = max - min;
    return Math.floor( Math.random() * des + min );
}