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
  使用 any 时，编译器不会对其进行类型检查（即使是错误的），但是在 unknown 类型时，编辑器会强制要求将其细分为某个类型。
