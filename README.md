# Typescript

## 关于类型检查

Typescript 提供 2 种类型检查的模式：

1.非严格模式（默认）：非严格模式下，类型：null 和 undefined 可以赋值给其他类型；

```ts
let nu = null;
let str: string = null;
```

2.严格模式：
严格模式下，将执行更严格的类型检查，null 和 undefined 将不能赋值给其他类型。可以通过在编译项中配置 strict 为 true 开启严格模式。strict 包含了— strictNullChecks 和 noImplicitAny。

## Typescript 中的原始类型

- 1.string
- 2.number
- 3.bigint
  关于 bigint 的几个注意点： 1. bigint 和 number 无法混合计算。 2. bigint 和 number 进行值比较时， 应该使用 == 而不是 ===。 3. bigint 转 number 可能会导致精度丢失。
- 4.boolean
- 5.symbol
  symbol 有一个字类型 unique symbol，该类型通常用于作为接口或类的可计算属性名。

```
    // unique symbol 只能通过const声明， 因为let 和 var 声明的变量是可		可以更改的。
    const key : unique symbol = Symbol();
    interface Obj {
        [key] : string.
    }
```

- 6.undefined

- 7.null
  启用 strictCheckNull 之后。undefined 和 null 将不能作为其他类型的子类型。
- 8.void
  void 表示某个值不存在，该类型用作函数的返回值类型。

```ts
    function log(log) : void{
        console.log(‘log’: , log);
    }
```

严格模式下只允许将 undefined 类型赋值给 void

```ts
    // ok
    function log(log) : void{
        console.log(‘log’: , log)
        return undefined;
    }
    // err
    function log(log): void{
        console.log(‘log:’, log);
        return null
    }
```

- 9.enum
  enum 分为 数字 enum，字符串 enum， 异构 enum。

**数字 enum**：
枚举值为数字，默认从 0 开始。枚举值总是为上一个枚举值+1.

```ts
enum Enum {
  A, //0,
  B, //1,
  C = 6,
  D, //7,
  E, //8
}
```

数字枚举可以作为 number 的字类型。number 也可以作为数字枚举的字类型。

```ts
//数字枚举作为number的字类型。
const num: number = Enum.A;
//number作为数字枚举的字类型
const numEnum: Enum = 0;
```

**字符串 enum**：
字符串枚举只能作为字符串的字类型。字符串不能是字符枚举的字类型。

```ts
    enum Direction{
        up = ‘UP’,
        down = ‘DOWN’,
        left = ‘LEFT’,
        right = ‘RIGHT’
    }
    // 字符串枚举 作为 字符串的子类型。ok
    const str : string = Direction.up;
    //❌字符串 作为 字符串枚举的子类型。 error
    const direct : Direction = ‘UP’
```

**异构 enum**：
枚举中既有数字枚举成员，也有字符串枚举成员。不推荐使用。
一般情况下，枚举支持成员名和值之间的正向，反向映射。

```ts
enum Enum {
  A,
  B,
}
//通过枚举成员名得到枚举值
console.log(Enum.A); // 0
//通过枚举值得到枚举成员名
console.log(Enum[Enum.A]); // A
```

为了实现枚举成员名和值之间的正反映射，Typescript 会生成额外的代码来实现。
有的时候在程序中，我们并不需要枚举成员值和枚举成员名之间的映射。就可以使用 const 枚举

```ts
    const Enum Direction{
        Up,
        Down
    }
    console.log(Enum.Up); // 0
    console.log(Enum[Enum.up]);// ❌
```

- 10. 字面量

## 顶端类型

顶端类型是一种通用类型，也称通用超类型。
在 TS 中**所有类型**都是顶端类型的**子类型**
在 TS 中有一下 2 中顶端类型：

- any
  虽然 any 是所有类型的父类型，但是 any 可以赋值给任何类型(除了 never)。（通常情况下是子类型兼容父类型，而不是父类型兼容字类型）。
  **在编译过程中会跳过对 any 的类型检查**，如果一个值的类型是 any，就相当于告诉编译器：不要对这个值进行类型检查。
  - noImplicitAny
    ```ts
        //隐式any
        function(x){
            console.log(x);
        }
    ```
    当参数 x**没有使用类型注解并且 TS 也无法推断出其类型**时，此时 x 将获得**隐式 any**类型。
    可以通过设置编译配置中的：noImplicitAny ： true 来关闭隐式 any 检查。
- unkonw
  和 any 不同，unkonw 只能赋值给**unknown 类型**和**any 类型**变量
  使用 any 时，编译器不会对其进行类型检查（即使是错误的）。但是在使用 unknown 类型时，绝大部分操作都将被限制，编辑器会强制要求将其细分为某个类型后才能操作。
  ```ts
  //编译器不会报错， 因为会跳过类型检查
  function f1(x: any) {
    console.log(x.length);
  }
  f1(undefined);
  ```
  ```ts
  //unknown类型会被限制绝大多数操作
  let uk: unknown = "unknown";
  uk.length; //❌
  uk.split(""); //❌
  ```
  ```ts
  //使用unknown时必须强制将其细分为某个类型，否则会编译错误。
  function f(x: unknown) {
    console.log(x.length); //❌
    if (typeof x === "string") {
      // ✅
      console.log(x.length);
    }
  }
  f(undefined);
  ```
  unknown 类型是更安全的 any 类型。如果确实无法知道某个值的类型，应该优先使用 unknown。

## 尾端类型

**尾端类型是其他任何类型的子类型**
typescript 中只有一个尾端类型：**never**

- never：
  never 表示不含任何肯能的值。
  never 可以赋值给任何类型。（因为 never 是任何类型的子类型）

  ```ts
  let x;
  let str: string = x as never;
  let bool: boolean = x as never;
  ```

  只有 never 类型才可以给 never 类型赋值，即使是顶端类型的 any 和 unknown 也不行。

  ```ts
  let x;
  let y: never = x as never; // never只能被never赋值
  let z: never = x as any; //❌
  ```

  **never 出现的场景**

- 1.出现在函数中返回值中，表示该函数永远无法返回一个值。
  比如：

  - 函数报错了

    ```ts
    function throwErr(msg): never {
      throw Error(msg);
      //下面的代码将永远无法运行，该函数也不会返回任何值。
      return 123;
    }
    ```

  - 无限循环的函数

    ```ts
    //因为是无限循环的函数，所以永远不会有返回结果
    function infinityRun(): never {
      while (true) {
        //do something ....
      }
    }
    ```

- 2.在条件类型中，使用 never 进行类型运算。
  比如 Typescript 的内置类型`Exclude<T, U>`.
  Exclude 可以将按 U 过滤掉 T 中的类型。
  Exclude 的实现

  ```ts
  //如果 T 是 U 的子类型，那么就过滤掉（never 不存在），否则还是 T
  type MyExclude<T, U> = T extends U ? never : T;

  //boolean
  type result = MyExclude<string | boolean, string>;
  ```

- 3.在编译器执行类型推断过程中，发现没有可用的类型了，会推断出为 never 类型。
  ```ts
  function len(str: string): any {
    if (typeof str === "string") {
      //此时str为string
      return str.length;
    } else {
      //此时str为never，表示不存在这样的值
      str; //nerver
    }
  }
  ```

## 数组类型

ts 中数据类型可以通过 2 方式定义。

- 通过类似数组字面量的方式定义。
  ```ts
  //Type[]
  const arr: number[] = [];
  //使用字面量方式，定义联合类型的数组，需要用（）将联合类型包起来
  const arr2: (number | string)[] = [];
  ```
- 通过数组泛型定义。
  ```ts
  const arr: Array<number> = [];
  //使用数组泛型定义联合类型数组
  const arr2: Array<string | number> = [];
  ```
  两种数组类型的定义方法功能都一摸一样，仅是写法的不同。

关于数组的定义规范。

- 全部使用字面量的方式定义数组类型。
- 全部使用数组泛型的方式定义数组类型。
- 如果是原始值，是用字面量的方式定义；如果好是复杂一点的类型或者是引用值，使用数组泛型的方式定义。

  ```ts
  //定义简单的数组
  const numArr: number[] = [];
  // 定义复杂一点的数组
  const userArr: Array<{ name: string; age: number }> = [];
  ```

## 元组类型（Tuple）

元组类型是**元素的长度和类型都固定的集合**。
javascript 没有提供原生的元组数据类型。由于数组和元组有许多共通性，所以在 TS 中使用数组表示元组。并且**元组是数组的子类型**。

```ts
//声明一个元组
//元组的长度固定为2， 类型固定为number number
const aTuple: [number, number] = [0, 0]; //✅
const aTuple: [number, number] = [0, 0， 0]; //❌
const aTuple: [number, number] = ['0', '0']; //❌
```

元组的可选元素和剩余元素

- 可选元素
  元祖中允许出现可选元素，但是**只能出现在必选元素之后**。
  语法：`[?T]`

  ```ts
  //第三个元素为可选元素
  const tunple: [string, string, number?] = [1, 2, 3];
  //此时len的类型为： 2 ｜ 3
  const len = tunple.length;
  ```

- 剩余元素
  通常情况下，元组的长度是固定或者可推导的。可以将元组的最后一个元素指定为剩余元素，使用了剩余元素之后元组的长度将不固定。
  语法：`[...T[]]`
  ```ts
  const tunple: [string, number?, ...boolean[]] = ["1", 2, false, false, false];
  //此时len的类型为：number
  const len = tunple.length;
  ```
  **关于元组和数组的兼容性**
  元组可以赋值给数组（**元组是数组的子类型**），但必须满足数组的类型。

```ts
const tunple: [number, number] = [0, 0];
const numberArr: number[] = tunple; //✅
const stringArr: string[] = tunple; //❌
```

数组不能赋值给元组。因为数组是元组的父类型。

```ts
const arr: number[] = [0, 0];
const tunple: [number, number] = arr; //❌
```

## 对象类型

对象类型有以下 3 种基本类型：

- Object

  - javascript 中存在一个创建的构造函数`const obj = new Object()`。但是我们平时很少使用这个构造函数来创建对象，往往会选择使用更简便的对象字面量来创建对象,例如：`const obj = {}`，因为这样更符合 javascript 具有动态性的特征。但是我们会常常使用`Object`构造函数提供的静态方法，例如：`Object.keys();Object.assign()`。**而构造函数:`Object`的`prototype`的类型正是 Object 类型**.
    TS 中构造函数 Object 的声明

    ```ts
    //Object()构造函数的类型并不是Object，而是Objectconstructor
    interface Objectconstructor {
      //Object类型指的是构造函数Object中的property属性的类型
      //Object.prototype 是一个特殊的对象。他提供了所有对象的一些公共的方法和属性。例如：constructor属性， hasOwnProperty（），valueOf（）。
      readonly property: Object;
      //省略其他属性
    }
    declare var Object: Objectconstructor;
    ```

  - Object 的类型兼容性
    除了类型：null 和 undefined 都可以给 Object 类型赋值。

    ```ts
    let Obj: Object;
    Obj = "x";
    Obj = true;
    Obj = 123;
    Obj = {
      a: 1,
    };
    Obj = "123";
    Obj = undefined; //❌
    Obj = null; //❌
    ```

    **Typescript 允许将原始值赋值给`Object`**。当读取原始值的方法或者属性时，js 会自动封箱，自然也能够访问到 Object.property 上的方法和属性了。

    ```js
    Number.prototype.__proto__ === Object.prototype; //true
    ```

  - Object 常见的错误

    ```ts
    //不会编译错误， 但是这是一个明显的错误。Object类型是用来描述 Object.propotype对象的类型。
    const obj: Object = {
      a: 1,
    };
    //如此一来obj 就只能访问Object原型上的一些公共方法和属性了。
    obj.a; //访问不到
    obj1.valueOf(); //可以访问
    ```

- object

  - **object 强调类型是一个引用值对象，而不是原始值。** object 类型并不会关注这个对象上的成员有哪些，是什么类型，比如是否有 name 属性， 是否有 say()。
    ```ts
    const obj: object = {
      name: "ymmt",
      sayHello() {
        console.log("hello");
      },
    };
    //❌编译错误， Property 'name' does not exist on type 'object'.
    obj.name;
    //❌编译错误， Property 'sayHello' does not exist on type 'object'.
    obj.sayHello();
    ```
  - object 的兼容性
    在 JS 中所有的原始值在 TS 中都会有一个对应的类型。唯独没有一个类型能够表示非原始值类型，就是对象类型。
    由于 Object 是描述 Object.prototype 属性的类型。并且所有的原始值都可以赋值给 Object 类型。所以 Object 也没办法描述非原始值类型。

    ```ts
    //编译✅
    const obj: Object = 123;
    ```

    因此 TS 在 2.2 之后增加了一个新类型`object`。object 可以准确描述这个值是非原始类型。

    ```ts
    let obj: object;
    obj = "123"; //❌
    obj = true; //❌
    obj = false; //❌
    //编译✅
    obj = {
      a: 1,
    };
    const obj1: Object = "123"; //✅
    ```

    **只有引用值才能赋值给 object。**

    ```ts
    let obj: object;
    obj = [];
    obj = {};
    obj = function () {};
    ```

    **object 只能给以下 3 种类型赋值**

    1. Object
       在 js 中所有引用值都是对象。所有的对象都会有一个公共的原型对象：Object.prototyp。所有的引用值都能够通过`__proto__`访问到 Object.prototyp，所以 object 类型自然可以赋值给 Object 类型。相当于 object 是 Object 的子类型。
    2. 顶端类型：any 和 unknown
       顶端类型 yyds
    3. 空对象字面量({})

    ```ts
    let obj: object = { a: 1 };
    const Obj: Object = obj;
    const anyType: any = obj;
    const ukType: unknown = obj;
    const oo: {} = obj;
    ```

  - object 的应用
    `Object.create()`用于创建一个对象，并且只有一个参数只能传入引用值和 null。传入的引用值将作为创建对象的原型。在没有类型`object`之前，没有一个类型能够描述`Object.create()`的参数签名（因为 Object 兼容原始类型，所以也不行）。此时 TS 只能将第一个参数签名定为`any`。当 object 出现之后，TS 更新了 Object.create()的签名。

- 对象字面量
  对象字面量有以下几种签名：
  基础语法
  ```ts
  //成员之间可以使用，分隔
  {
    TypeMember, TypeMember, TypeMember;
  }
  ```
  or
  ```ts
  //成员之间也可以使用；分隔
  {
    TypeMember;
    TypeMember;
    TypeMember;
  }
  ```
  对象字面量成员的类型有以下几种：
  - 属性签名
    属性签名声明了字面量对象中的成员名称和类型。
    ```ts
    {
      PropertyName: Type;
    }
    ```
    `PropertyName` 表示对象的属性名，可以为[标识符](https://baike.baidu.com/item/%E6%A0%87%E8%AF%86%E7%AC%A6/7105638?fr=aladdin)，字符串，数字和可计算属性名；`Type`为成员类型。
    可计算属性名可以为**字符串字面量**，**数组字面量**和**unique symbol**。
    ```ts
      //类型推导为 string
      let pName = 'str';
      //类型推导为 'str'， 字符串字面量
      const propertyName = 'str';
      //类型推导为 123， 数字串字面量
      const nPropertyName = 123;
      //unique symbol
      const symbolPropertyName : unique symbol = Symbol();
      //声明对象字面量
      const obj : {
        //成员名称为字符串字面量
        "a" : string,
        //成员名称为数组字面量
        1 ： number,
        //成员名称为标识符
        _a1 : string,
        //可计算属性名
        [propertyName] : string,
        [nPropertyName] : number
        [symbolPropertyName] : string，
        //如果没有指定成员Type， 将会得到隐式的any类型。
        //如果开启了noImplicitAny 会产生编译错误。
        everything
      } = {
        ...
      }
    ```
    - 可选成员
    ```ts
      const obj : {
        a : number,
        b ? : string,
        c ? : boolean，
        d ? : boolean
      } = {
        a : 123,
        b : '123'，
        d : undefined
      }
      //如果没有开启strcitNullCheck 可以使用null给可选成员赋值
    ```
    - 只读属性
    ```ts
    const obj: {
      readonly a: string;
      b: number;
    } = {
      a: "123",
      b: 123,
    };
    //❌
    obj.a = "321";
    //✅
    obj.b = 321;
    ```
    - 空对象字面量
      空对象字面量**表示对象中不存在任何可访问的自定义属性**。其表现形式和 Object 差不多。但是 Object 是强调所有对象的公共属性和方法，即 Object.prototype。
      ```ts
      let a: {} = { a: 1 };
      let b: Object = { b: 1 };
      //❌
      a.a;
      //❌
      b.a;
      a = b;
      b = a;
      ```
  - 调用签名
  - 构造签名
  - 方法签名
  - 索引签名
