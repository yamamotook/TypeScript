//泛型在类型别名中的使用

type callback<T> = (item : T, index : number) => boolean

//泛型在接口中的使用
// interface callback<T>{
//     (item : T, index : number) : boolean
// }

//模拟js filter
function filter<T>(arr : T [], cb:callback<T>):T[]{
    const resultArr : T[] = [];
    arr.forEach((item, index) =>{
        if(cb(item, index)){
            resultArr.push(item);
        }
    });
    return resultArr;
}

const res = filter([1,2,3,4,5], n => n % 2 ==0)


class ArrayHelper<T>{

    constructor(private arr : T[]){}

    private randomGet(min : number , max : number) : number{
        const diff = Math.abs(max - min);
        return Math.ceil(Math.random() * diff + min);
    }

    takeArr(num : number) : Array<T>{
        const res : T [] = [];
        for(let i = 0 ; i < num ; i ++){
            res.push(this.arr[i]);
        }
        return res;
    }
    

    shuffle(){
        for(let i = 0 ; i < this.arr.length ; i++){
            const changeIndex = this.randomGet(0, this.arr.length);
            const temp = this.arr[i];
            this.arr[i] = this.arr[changeIndex];
            this.arr[changeIndex] = temp;
       }
    }

}


const stringArrHelper = new ArrayHelper<string>(['1','2','3']);
stringArrHelper.takeArr(1)

// 泛型的约束,希望能够对泛型的类型做具体的限制,比如要求泛型必须拥有某个属性



interface hasNameProperty{
    name : string
}

//将对象中name属性的属性值的每一个单词首字母大写
//就是说对于obj的限制有:
//1.obj 必须为一个对象
//2. obj必须包含name 属性,而且name属性为string
//可以对泛型的类型进行约束来达到这个效果
function objectNameToUppercase<T extends hasNameProperty>(obj : T) : T{
    obj.name = obj.name
        .split(' ')
        .map( str => str[0].toUpperCase() + str.substr(1))
        .join(' ');
    return obj;    
}

const obj = {
    name : 'yamamoto hihumi',
    age : 100
}

//根据参数,TS可以自动推导出泛型的类型为 { name : string ,age : number}
const o =  objectNameToUppercase(obj);
console.log(o.name);


//多泛型

//将2个数组混合为一个数组， [1,2,3] 和 [‘a’, ‘b’, ‘c’] => [1, ’a’, 2, ’b’, ‘3’, ‘c’]
function arrMix<T, K>(arr1 : T[], arr2 : K []) : (T | K) []{
	const result : (T | K) [] = [];
	if(arr1.length != arr2.length){
		console.log('数组的长度不同');
	}else{
		for(let i = 0 ; i < arr1.length; i++){
			result.push(arr1[i]);
			result.push(arr2[i]);
		}
	}
	return result;
}

//TS可以自动推导出泛型 为 <number , string>,并且result的类型推导为 number [] | string []
const result = arrMix([1,2,3], [ 'a', 'b', 'c']);
console.log(result);




