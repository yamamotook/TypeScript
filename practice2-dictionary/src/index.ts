
interface callback<K, V>{
    (key : K, value : V) : void
}

// 字典类
class Dictionary<K,V>{
    private keys : K [] = [];
    private values : V [] = [];

    get size(){
        return this.keys.length;
    }

    //设置键值对,如果键已经存在则更新值, 如果不存在则新增一组键值对
    set(key : K, value : V){
        const keysIndex = this.keys.indexOf(key);
        //存在
        if(keysIndex != -1){
            this.values[keysIndex] = value;
        }else{
            //不存在
            this.keys.push(key);
            this.values.push(value);
        }
    }
    //循环字典          //传入泛型
    forEach(callback : callback<K, V>){
        this.keys.forEach( (i, index) => {
            callback(this.keys[index] , this.values[index]);
        })
    }

    //判断某个键是否存在
    hasKey(key : K) : boolean{
        try{
            this.forEach((k) => {
                if(k == key) throw new Error('stop foreach')
            })
            return false;
        }catch(e){
            return true;
        }
    }

    //根据key删除value
    remove(key : K){
        const index = this.keys.indexOf(key);
        if(index != -1){
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        }
    }

}

const mySet = new Dictionary<string , string>();

mySet.set('a', '1');
mySet.set('b', '2');
mySet.set('c', '3');
mySet.set('c', '4');
mySet.remove('c');

mySet.forEach((k, v)=>{
    console.log(k,v);
})


