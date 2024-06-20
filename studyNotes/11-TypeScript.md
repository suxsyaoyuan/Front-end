# TS

> 类型推断、类型注解、类型断言
>
> 常用类型
>
> 数组、元组、枚举
>
> 函数
>
> 接口
>
> 类型别名
>
> 泛型

# 01 简介

## 1.1 TypeScript简介

- [TS 官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2F)

1. **`TypeScript` 简称：TS，是 JavaScript 的超集**，简单来说就是：JS 有的 TS 都有。
2. 它对JS进行了扩展，向JS中引入了类型的概念，并添加了许多新的特性。
3. TS代码需要通过编译器编译为JS，然后再交由JS解析器执行。
4. TS完全兼容JS，换言之，任何的JS代码都可以直接当成JS使用。
5. 相较于JS而言，TS拥有了静态类型，更加严格的语法，更强大的功能；TS可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；TS代码可以编译为任意版本的JS代码，可有效解决不同JS运行环境的兼容问题；同样的功能，TS的代码量要大于JS，但由于TS的代码结构更加清晰，变量类型更加明确，在后期代码的维护中TS却远远胜于JS。

![image-20220805180538856](https://i0.hdslb.com/bfs/album/ba8bd25384d6530bff2acf5a425b6c529dd8f6b1.png)

> TS和JS之间的关系其实就是Less/Sass和CSS之间的关系
> 就像Less/Sass是对CSS进行扩展一样, TS也是对JS进行扩展
> 就像Less/Sass最终会转换成CSS一样, 我们编写好的TS代码最终也会换成JS

## 1.2 为什么要有 typescript

背景：JS 的类型系统存在“先天缺陷”弱类型，JS 代码中绝大部分错误都是类型错误（Uncaught TypeError）

开发的时候，定义的变量本应该就有类型，这些经常出现的错误，导致了在使用 JS 进行项目开发时，增加了找 Bug、改 Bug 的时间，严重影响开发效率

从编程语言的动静来区分，**TypeScript 属于静态类型的编程语言**，**JavaScript 属于动态类型的编程语言**
- 静态类型：**编译**期做类型检查
- 动态类型：**执行**期做类型检查

代码编译和代码执行的顺序：1 编译 2 执行

- 对于 JS 来说：需要等到代码真正去执行的时候才能发现错误（晚）
- 对于 TS 来说：在代码编译的时候（代码执行前）就可以发现错误（早）

并且，配合 VSCode 等开发工具，TS 可以提前到**在编写代码的同时就发现代码中的错误**，减少找 Bug、改 Bug 时间

对比：

- 使用 JS：
  1. 在 VSCode 里面写代码
  2. 在浏览器中运行代码 --> 运行时，才会发现错误【晚】
- 使用 TS：
  1. 在 VSCode 里面写代码 --> 写代码的同时，就会发现错误【早】
  2. 在浏览器中运行代码

> 简单来说就是因为JavaScript是弱类型, 很多错误只有在运行时才会被发现
> 而TypeScript提供了一套静态检测机制, 可以帮助我们在编译时就发现错误

## 1.3 TypeScript相比JS的优势

1. 更早（写代码的同时）发现错误，减少找Bug、改Bug时间，提升开发效率。
2. 程序中任何位置的代码都有提示，随时随地的安全感，增强了开发体验。
3. 强大的类型系统提升了代码的可维护性，使得重构代码更加容易。
4. 支持最新的ECMAScript语法，优先体验最新的语法，让你走在前端技术的最前沿。
5. TS类型判断机制，不需要再代码中的每个地方都演示标注类型，让你在享受优势的同时，尽量降低来了成本。

除此之外，Vue 3 源码使用 TS 重写、Angular 默认支持 TS、React 与 TS 完美配合，TypeScript  已成为大中型前端 项目的首选编程语言。

目前，前端最新的开发技术栈：

1. React： TS + Hooks
2. Vue： TS + Vue3

- 注意： Vue2 对 TS 的支持不好~

# 02 TypeScript初体验

## 2.1 TypeScript 开发环境搭建

问题：为什么要安装编译TS的工具包？

回答：Node.js/浏览器，只认识JS代码，不认识TS代码。需要将TS代码转化为JS代码，然后才能运行。

1. 下载Node.js
   - 64位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi
   - 32位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi

2. 安装Node.js

3. 全局安装typescript
   - 进入命令行
   - 输入：
     - pnpm i -g typescript 
     - npm install -g typescript 
     - yarn global add typescript 

   - typescript 包：用来编译 TS 代码的包，提供了 `tsc` 命令，实现了 TS -> JS 的转化

   - 验证是否安装成功：tsc –v(查看 typescript 的版本)

> 运行tsc 文件名

## 2.2 编译并运行TS代码

- 创建 hello.ts 文件（注意：**TS 文件的后缀名为 `.ts`**）

- 将 TS 编译为 JS：在终端中输入命令，`tsc hello.ts`（此时，在同级目录中会出现一个同名的 JS 文件）
- 执行 JS 代码：在终端中输入命令，`node hello.js`

> 1 创建 ts 文件  ===>  2 编译 TS  ===>  3 执行 JS

说明：所有合法的 JS 代码都是 TS 代码，有 JS 基础只需要学习 TS 的类型即可

注意：由 TS 编译生成的 JS 文件，代码中就没有类型信息了

**真正在开发过程中，其实不需要自己手动的通过 tsc 把 ts 文件转成 js 文件，这些工作应该交给webpack或者vite来完成**

## 2.3 简化运行TS的步骤

问题描述：每次修改代码后，都要重复执行两个命令，才能运行TS代码，太繁琐。

简化方式：使用ts-node包，直接在Node.js中执行TS代码。

安装命令：`pnpm i -g ts-node`(ts-node包提供了ts-node命令)。

使用方式：`ts-node hello.ts`

(遇到错误了：在安装完ts-node之后执行这个使用命令会报错，原因是缺少安装东西，执行命令 `pnpm  install -g tslib @types/node`)

解释：ts-node命令在内部偷偷的将TS->JS，然后，再运行JS代码。

## 2.4 官方playground

官方也提供了一个在线开发 TypeScript 的云环境——[Playground](https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Fzh%2Fplay)。

基于它，我们无须在本地安装环境，只需要一个浏览器即可随时学习和编写 TypeScript，同时还可以方便地选择 TypeScript 版本、配置 tsconfig，并对 TypeScript 实时静态类型检测、转译输出 JavaScript 和在线执行。

而且在体验上，它也一点儿不逊色于任何本地的 IDE，对于刚刚学习 TypeScript 的我们来说，算是一个不错的选择

# 03 TypeScript常用类型

## 3.1 概述

TypeScript 是 JS 的超集，TS 提供了 JS 的所有功能，并且额外的增加了：**类型系统**

- 所有的 JS 代码都是 TS 代码
- **JS 有类型**（比如，number/string 等），但是 **JS 不会检查变量的类型是否发生变化**，而 TS 会检查

TypeScript 类型系统的主要优势：**可以显示标记出代码中的意外行为，从而降低了发生错误的可能性**

**示例代码**:

```typescript
let age = 18
let age: number = 18
```

- 说明：代码中的 `: number` 就是**类型注解**
- 作用：**为变量添加类型约束**。比如，上述代码中，约定变量 age 的类型为 number 类型
- 解释：**约定了什么类型，就只能给变量赋值该类型的值，否则，就会报错**
- 约定了类型之后，代码的提示就会非常的清晰
- 错误演示：

```typescript
// 错误代码：
// 错误原因：将 string 类型的值赋值给了 number 类型的变量，类型不一致
let age: number = '18'
```

可以将 TS 中的常用基础类型细分为两类：

- JS 已有类型
  - 原始类型，简单类型（`string、boolean、number、object、bigint、symbol、null 和 undefined`）
  - 复杂数据类型（数组，对象，函数等）
- TS 新增类型
  - 联合类型
  - 自定义类型（类型别名）
  - 接口
  - 元组
  - 字面量类型
  - 枚举
  - void
  - any
  - …

## 3.2 原始类型

### 3.2.1 JS的八种内置类型

原始类型：`string、boolean、number、bigint、object、symbol、null 和 undefined`

特点：简单，这些类型，完全按照 JS 中类型的名称来书写

- number

  ```typescript
  let notANumber: number = NaN;//Nan
  let num: number = 123;//普通数字
  let infinityNumber: number = Infinity;//无穷大
  let decimal: number = 6;//十进制
  let hex: number = 0xf00d;//十六进制
  let binary: number = 0b1010;//二进制
  let octal: number = 0o744;//八进制
  let big: bigint = 100n;
  ```

- boolean

  ```typescript
  let isDone: boolean = false;//可以直接使用布尔值
  let booleand2: boolean = Boolean(1) //也可以通过函数返回布尔值
  ```

- string

  ```typescript
  //普通声明
  let color: string = "blue";
  color = 'red';
  
  //也可以使用es6的字符串模板
  let fullName: string = `Bob Bobbington`;
  let age: number = 37;
  let sentence: string = `Hello, my name is ${fullName}.I'll be ${age + 1} years old next month.`;
  ```

- 其它

  ```typescript
  let a: null = null
  let b: undefined = undefined
  let obj: object = {x: 1}
  let s: symbol = Symbol()
  ```

> 对象类型：object（包括，数组、对象、函数等对象）。
>
> 特点：对象类型，在TS中更加细化，每个具体的对象都有自己的类型语法。

### 3.2.2 注意点

**null和undefined**

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 也就是说，可以把 `null` 和 `undefined` 赋值给其他类型。

```typescript
// null和undefined赋值给string
let str:string = "666";
str = null
str= undefined

// null和undefined赋值给number
let num:number = 666;
num = null
num= undefined

// null和undefined赋值给object
let obj:object ={};
obj = null
obj= undefined

// null和undefined赋值给Symbol
let sym: symbol = Symbol("me"); 
sym = null
sym= undefined

// null和undefined赋值给boolean
let isDone: boolean = false;
isDone = null
isDone= undefined

// null和undefined赋值给bigint
let big: bigint =  100n;
big = null
big= undefined
```

如果你在tsconfig.json指定了严格模式`"strictNullChecks":true` ，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。

**number和bigint**

虽然`number`和`bigint`都表示数字，但是这两个类型不兼容。

```typescript
let big: bigint =  100n;
let num: number = 6;
big = num;
num = big;
```

会抛出一个类型不兼容的 `ts(2322)` 错误。

## 3.3 数组类型

**数组的两种写法：**

- **类型 [ ]** 

```ts
//类型加中括号
let arr:number[] = [123]
//这样会报错定义了数字类型出现字符串是不允许的
let arr:number[] = [1,2,3,'1']
//操作方法添加也是不允许的
let arr:number[] = [1,2,3,]
arr.unshift('1')

var arr: number[] = [1, 2, 3]; //数字类型的数组
var arr2: string[] = ["1", "2"]; //字符串类型的数组
var arr3: any[] = [1, "2", true]; //任意类型的数组
```

- **数组泛型**

```ts
// 规则 Array<类型>
let arr:Array<number> = [1,2,3,4,5]
```

**用接口表示数组**

一般用来描述类数组 

```ts
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
//表示：只要索引的类型是数字时，那么值的类型必须是数字。
```

**多维数组**

```ts
let data:number[][] = [[1,2], [3,4]];
```

**arguments类数组**

```ts
function Arr(...args:any): void {
    console.log(arguments)
    //错误的arguments 是类数组不能这样定义
    let arr:number[] = arguments
}
Arr(111, 222, 333)

function Arr(...args:any): void {
    console.log(arguments) 
    //ts内置对象IArguments 定义
    let arr:IArguments = arguments
}
Arr(111, 222, 333)

//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {

[index: number]: any;

length: number;
callee: Function;
}
```

**any 在数组中的应用**

一个常见的例子数组中可以存在任意类型

```ts
let list: any[] = ['test', 1, [],{a:1}]
```

**定义联合类型数组**

```typescript
let arr:(number | string)[];
// 表示定义了一个名称叫做arr的数组, 
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
arr3 = [1, 'b', 2, 'c'];
```

**定义指定对象成员的数组**

```typescript
// interface是接口,最后面会讲到
interface Arrobj{
    name:string,
    age:number
}
let arr3:Arrobj[]=[{name:'jimmy',age:22}]
```

## 3.4 联合类型（|）

联合类型表示取值可以为多种类型中的一种，使用 `|` 分隔每个类型。

需求：数组中既有 number 类型，又有 string 类型，这个数组的类型应该如何写?

```ts
let arr: (number | string)[] = [1, 'a', 3, 'b']
```

- 解释：`|`（竖线）在 TS 中叫做**联合类型**，即：由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种
- 注意：这是 TS 中联合类型的语法，只有一根竖线，不要与 JS 中的或（|| 或）混淆了

```jsx
  let timer: number | null = null
  timer = setInterval(() => {}, 1000)

  // 定义一个数组，数组中可以有数字或者字符串, 需要注意 | 的优先级
  let arr: (number | string)[] = [1, 'abc', 2]
```

联合类型通常与 `null` 或 `undefined` 一起使用：

```js
const sayHello = (name: string | undefined) => {
  /* ... */
};
```

例如，这里 `name` 的类型是 `string | undefined` 意味着可以将 `string` 或 `undefined` 的值传递给`sayHello` 函数。

```js
sayHello("semlinker"); 
sayHello(undefined);
```

通过这个示例，你可以凭直觉知道类型 A 和类型 B 联合后的类型是同时接受 A 和 B 值的类型。此外，对于联合类型来说，你可能会遇到以下的用法：

```js
let num: 1 | 2 = 1;
type EventNames = 'click' | 'scroll' | 'mousemove';
```

以上示例中的 `1`、`2` 或 `'click'` 被称为字面量类型，用来约束取值只能是某几个值中的一个。

## 3.5 交叉类型（&）

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性，使用`&`定义交叉类型。

```ts
{
  type Useless = string & number;
}
```

很显然，如果我们仅仅把原始类型、字面量类型、函数类型等原子类型合并成交叉类型，是没有任何用处的，因为任何类型都不能满足同时属于多种原子类型，比如既是 string 类型又是 number 类型。因此，在上述的代码中，类型别名 Useless 的类型就是个 never。

交叉类型真正的用武之地就是将多个接口类型合并成一个类型，从而实现等同接口继承的效果，也就是所谓的合并接口类型，如下代码所示：

```ts
  type IntersectionType = { id: number; name: string; } & { age: number };
  const mixed: IntersectionType = {
    id: 1,
    name: 'name',
    age: 18
  }
```

在上述示例中，我们通过交叉类型，使得 IntersectionType 同时拥有了 id、name、age 所有属性，这里我们可以试着将合并接口类型理解为求并集。

##  3.6 函数类型

### 3.6.1 基本使用

函数的类型实际上指的是：函数参数类型、返回值的类型

为函数指定类型的两种方式：
- 单独指定参数、返回值的类型
- 同时指定参数、返回值的类型

#### 1 单独指定参数、返回值的类型：

```ts
// 函数声明
function add(a: number, b: number): number {
  return a + b
}

// 函数表达式
let mySum: (x: number, y: number) => number = function (x, y) {
    return x + y;
};

// 箭头函数
const add = (a: number, b: number): number => {
  return a + b
}
```

#### 2 同时指定参数、返回值的类型:

```ts
type AddFn = (a: number, b: number) => number

const add: AddFn = (a, b) => {
  return a + b
}
```

- 解释：当函数作为表达式时，可以通过类似箭头函数形式的语法来为函数添加类型
- 注意：这种形式只适用于函数表达式

#### 3 用接口定义函数类型

```typescript
interface ISearchFunc{
  (source: string, subString: string): boolean;
}
```

采用函数表达式接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

### 3.6.2 void 类型

void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型。

`void` 表示没有任何类型，和其他类型是平等关系，不能直接赋值:

```typescript
let a: void; 
let b: number = a; // Error
```

你只能为它赋予`null`和`undefined`（在`strictNullChecks`未指定为true时）。

声明一个`void`类型的变量没有什么大用，我们一般也只有在函数没有返回值时去声明。如果函数没有返回值，那么，函数返回值类型为：`void`

```ts
function greet(name: string): void {
  console.log('Hello', name)
}
```

值得注意的是，方法没有返回值将得到`undefined`，但是我们需要定义成`void`类型，而不是`undefined`类型。否则将报错:

```ts
// 如果什么都不写，此时，add 函数的返回值类型为： void
const add = () => {}
// 这种写法是明确指定函数返回值类型为 void，与上面不指定返回值类型相同
const add = (): void => {}

function fun(): undefined {
  console.log("this is TypeScript");
};
fun(); // Error

// 但，如果指定 返回值类型为 undefined，此时，函数体中必须显示的 return undefined 才可以
const add = (): undefined => {
  // 此处，返回的 undefined 是 JS 中的一个值
  return undefined
}
```

### 3.6.3 never 类型

void 用来表示空，以函数为例，就表示没有返回值的函数。

never 类型表示的是那些永不存在的值的类型。

值会永不存在的两种情况：

1. 如果一个函数执行时抛出了**异常**，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）；
2. 函数中执行无限循环的代码（**死循环**），使得程序永远无法运行到函数返回值那一步，永不存在返回。

```typescript
// 异常
function err(msg: string): never { // OK
  throw new Error(msg); 
}

// 死循环
function loopForever(): never { // OK
  while (true) {};
}
```

`never`类型同`null`和`undefined`一样，也是任何类型的子类型，也可以赋值给任何类型。

但是没有类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外），即使`any`也不可以赋值给`never`

```typescript
let ne: never;
let nev: never;
let an: any;

ne = 123; // Error
ne = nev; // OK
ne = an; // Error
ne = (() => { throw new Error("异常"); })(); // OK
ne = (() => { while(true) {} })(); // OK
```

在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：

```typescript
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```

注意在 else 分支里面，我们把收窄为 never 的 foo 赋值给一个显示声明的 never 变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事修改了 Foo 的类型：

```typescript
type Foo = string | number | boolean;
```

然而他忘记同时修改 `controlFlowAnalysisWithNever` 方法中的控制流程，这时候 else 分支的 foo 类型会被收窄为 `boolean` 类型，导致无法赋值给 never 类型，这时就会产生一个编译错误。通过这个方式，我们可以确保`controlFlowAnalysisWithNever` 方法总是穷尽了 Foo 的所有可能类型。 通过这个示例，我们可以得出一个结论：**使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。**

比较`void`和`never`：

```typescript
// void 用来表示空，以函数为例，就表示没有返回值的函数
function fn(): void {
  console.log('hello');
  return undefined;
  return;
}

// never 表示永远不会返回结果
function fn1(): never {
  throw new Error('出错啦！');
}
```

### 3.6.4 可选参数

使用函数实现某个功能时，参数可以传也可以不传。这种情况下，在给函数参数指定类型时，就用到**可选参数**了，比如，数组的 slice 方法，可以 `slice()` 也可以 `slice(1)` 还可以 `slice(1, 3)`

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

- 可选参数：在可传可不传的参数名称后面添加 `?`（问号）
- 注意：**可选参数只能出现在参数列表的最后**，也就是说可选参数后面不能再出现必选参数

### 3.6.5 参数默认值

函数参数可以有默认值，有默认值的情况下，参数的类型注解可以省略，而且可以接收undefined的值

```typescript
function buildName(firstName: string, lastName = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

> 默认值会自动判断类型

### 3.6.6 剩余参数

将一个不定数量的参数放到一个数组中，并且加上类型注解

```typescript
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);
```

### 3.6.7 函数重载

由于 JavaScript 是一个动态语言，我们通常会使用不同类型的参数来调用同一个函数，该函数会根据不同的参数而返回不同的类型的调用结果：

```js
function add(x, y) {
 return x + y;
}
add(1, 2); // 3
add("1", "2"); //"12"
```

由于 TypeScript 是 JavaScript 的超集，因此以上的代码可以直接在 TypeScript 中使用，但当 TypeScript 编译器开启 `noImplicitAny` 的配置项时，以上代码会提示以下错误信息：

```js
Parameter 'x' implicitly has an 'any' type.
Parameter 'y' implicitly has an 'any' type.
```

该信息告诉我们参数 x 和参数 y 隐式具有 `any` 类型。为了解决这个问题，我们可以为参数设置一个类型。因为我们希望 `add` 函数同时支持 string 和 number 类型，因此我们可以定义一个 `string | number` 联合类型，同时我们为该联合类型取个别名：

```ts
type Combinable = string | number;
```

在定义完 Combinable 联合类型后，我们来更新一下 `add` 函数：

```ts
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
     return a.toString() + b.toString();
    }
    return a + b;
}
```

为 `add` 函数的参数显式设置类型之后，之前错误的提示消息就消失了。那么此时的 `add` 函数就完美了么，我们来实际测试一下：

```ts
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
```

在上面代码中，我们分别使用 `'Semlinker'` 和 `' Kakuqo'` 这两个字符串作为参数调用 add 函数，并把调用结果保存到一个名为 `result` 的变量上，这时候我们想当然的认为此时 result 的变量的类型为 string，所以我们就可以正常调用字符串对象上的 `split` 方法。但这时 TypeScript 编译器又出现以下错误信息了：

```ts
Property 'split' does not exist on type 'number'.
```

很明显 `number` 类型的对象上并不存在 `split` 属性。问题又来了，那如何解决呢？这时我们就可以利用 TypeScript 提供的函数重载特性。

> **函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。** 要解决前面遇到的问题，方法就是为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。

```ts
type Types = number | string

// 编写重载签名
function add(a:number,b:number):number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;

// 编写通用的函数实现 通用函数不能被调用
function add(a:Types, b:Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
```

在以上代码中，我们为 add 函数提供了多个函数类型定义，从而实现函数的重载。之后，可恶的错误消息又消失了，因为这时 result 变量的类型是 `string` 类型。

## 3.7 any 类型

在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型.

原则:不推荐使用 any**!这会让 TypeScript 变为 “AnyScript”(失去 TS 类型保护的优势)

一个变量设置类型为any后相当于对该变量关闭了TS的类型检测

当值的类型为 any 时，可以对该值进行任意操作，并且不会有代码提示

```ts
let a: any = 666;
a = "Semlinker";
a = false;
a = 66
a = undefined
a = null
a = []
a = {}

let a: string = 'seven';
a = 7;
// TS2322: Type 'number' is not assignable to type 'string'.
```

解释:以上操作都不会有任何类型错误提示，即使可能存在错误

尽可能的避免使用 any 类型，除非临时使用 any 来“避免”书写很长、很复杂的类型

其他隐式具有 any 类型的情况

1. 声明变量不提供类型也不提供默认值

   ```typescript
   let something;
   something = 'seven';
   something = 7;
   something.setName('Tom');
   ```

   等价于

   ```typescript
   let something: any;
   something = 'seven';
   something = 7;
   something.setName('Tom');
   ```

2. 函数参数不加类型

注意：因为不推荐使用 any，所以，这两种情况下都应该提供类型

在许多场景下，这太宽松了。使用 `any` 类型，可以很容易地编写类型正确但在运行时有问题的代码。如果我们使用 `any` 类型，就无法使用 TypeScript 提供的大量的保护机制。请记住，`any 是魔鬼！`尽量不要用any。

为了解决 `any` 带来的问题，TypeScript 3.0 引入了 `unknown` 类型。

## 3.8 unknown 类型

### 3.8.1 基本使用

`unknown`与`any`一样，所有类型都可以分配给`unknown`:

```typescript
// unknown 表示未知类型的值
let e: unknown;
e = 10;
e = 'hello';
```

`unknown`与`any`的最大区别是： 任何类型的值可以赋值给`any`，同时`any`类型的值也可以赋值给任何类型。`unknown` 任何类型的值都可以赋值给它，但它只能赋值给`unknown`和`any`。看看下面这个例子:

```typescript
let notSure: unknown = 4;
let uncertain: any = notSure; // OK

let notSure: any = 4;
let uncertain: unknown = notSure; // OK

let notSure: unknown = 4;
let uncertain: number = notSure; // Error
```

> unknown 实际上就是一个类型安全的any
>
> unknown类型的变量，不能直接赋值给其他变量（除了自己和any）

 如果不缩小类型，就无法对`unknown`类型执行任何操作：

```typescript
function getDog() {
 return '123'
}
 
const dog: unknown = {hello: getDog};
dog.hello(); // Error
```

这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用`typeof`、`类型断言`等方式来缩小未知范围：

```typescript
function getDogName() {
 let x: unknown;
 return x;
};
const dogName = getDogName();
// 直接使用
const upName = dogName.toLowerCase(); // Error
// typeof
if (typeof dogName === 'string') {
  const upName = dogName.toLowerCase(); // OK
}
```

但是这样才能赋值太麻烦了，所以引出了类型断言。

### 3.8.2 类型断言

有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型。 

类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。

TypeScript 类型检测无法做到绝对智能，毕竟程序不能像人一样思考。有时会碰到我们比 TypeScript 更清楚实际类型的情况，比如下面的例子：

```ts
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2); // 提示 ts(2322)
```

其中，greaterThan2 一定是一个数字（确切地讲是 3），因为 arrayNumber 中明显有大于 2 的成员，但静态类型对运行时的逻辑无能为力。

在 TypeScript 看来，greaterThan2 的类型既可能是数字，也可能是 undefined，所以上面的示例中提示了一个 ts(2322) 错误，此时我们不能把类型 undefined 分配给类型 number。

不过，我们可以使用一种笃定的方式——**类型断言**（类似仅作用在类型层面的强制类型转换）告诉 TypeScript 按照我们的方式做类型检查。

比如，我们可以使用 as 语法做类型断言，如下代码所示：

```typescript
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;
```

**语法**

```typescript
// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

以上两种方式虽然没有任何区别，但是尖括号格式会与react中JSX产生语法冲突，因此我们更推荐使用 as 语法。

好了，对于上面`unknown 类型`赋值的类型也能解决了。

```typescript
function getDogName() {
 let x: unknown;
 return x;
};
const dogName = getDogName();

// 类型断言 
let upName = (dogName as string).toLowerCase(); // OK

let upName = (<string>dogName).toLowerCase(); // OK
```

> 告诉解析器我就是这个类型的就可以了。

### 3.8.3 非空断言

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是非 null 和非 undefined 类型。**具体而言，x! 将从 x 值域中排除 null 和 undefined 。**

具体看以下示例：

```typescript
let mayNullOrUndefinedOrString: null | undefined | string;
mayNullOrUndefinedOrString!.toString(); // ok
mayNullOrUndefinedOrString.toString(); // ts(2531)
```

```typescript
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```

### 3.8.4 确定赋值断言

允许在实例属性和变量声明后面放置一个 `!` 号，从而告诉 TypeScript 该属性会被明确地赋值。为了更好地理解它的作用，我们来看个具体的例子：

```js
let x: number;
initialize();

// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error
function initialize() {
  x = 10;
}

```

很明显该异常信息是说变量 x 在赋值前被使用了，要解决该问题，我们可以使用确定赋值断言：

```js
let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
```

通过 `let x!: number;` 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。

##  3.9 对象类型（{}）

### 3.9.1 基本使用

JS 中的对象是由属性和方法构成的，而 **TS 对象的类型就是在描述对象的结构**（有什么类型的属性和方法）

对象类型的写法:

```ts
// 空对象
let person: {} = {}

// 有属性的对象
let person: { name: string } = {
  name: '同学'
}

// 既有属性又有方法的对象
// 在一行代码中指定对象的多个属性类型时，使用 `;`（分号）来分隔
let person: { name: string; sayHi(): void } = {
  name: 'jack',
  sayHi() {}
}

// 对象中如果有多个类型，可以换行写：
// 通过换行来分隔多个属性类型，可以去掉 `;`
let person: {
  name: string
  sayHi(): void
} = {
  name: 'jack',
  sayHi() {}
}
```

解释:
1. 使用 `{}` 来描述对象结构
2. 属性采用`属性名: 类型`的形式
3. 方法采用`方法名(): 返回值类型`的形式

### 3.9.2 箭头函数形式的方法类型

方法的类型也可以使用箭头函数形式

```ts
{
    greet(name: string):string
    greet: (name: string) => string
}



type Person = {
  greet: (name: string) => void;
  greet(name: string):void;
}

let person: Person = {
  greet(name) {
    console.log(name)
  }
}
```

### 3.9.3 对象可选属性

对象的属性或方法，也可以是可选的，此时就用到**可选属性**了

比如，我们在使用 `axios({ ... })` 时，如果发送 GET 请求，method 属性就可以省略

可选属性的语法与函数可选参数的语法一致，都使用 `?` 来表示

```ts
type Config = {
  url: string
  method?: string
}

function axios(config: Config) {
  console.log(config)
}

```

### 3.9.4 使用类型别名

注意：直接使用 `{}` 形式为对象添加类型，会降低代码的可读性（不好辨识类型和值）

推荐：**使用类型别名为对象添加类型**

```ts
// 创建类型别名
type Person = {
  name: string
  sayHi(): void
}

// 使用类型别名作为对象的类型：
let person: Person = {
  name: 'jack',
  sayHi() {}
}
```

### 3.9.5 任意属性

有时候我们希望一个对象中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 **索引签名** 的形式来满足上述要求。

```js
// [propName: string]: any 表示任意类型的属性
let c: {name: string, [propName: string]: any};
c = {name: '猪八戒', age: 18, gender: '男'};
```

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

## 3.10 元组类型（Tuple）

### 3.10.1 元祖定义

众所周知，数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。

元组最重要的特性是可以限制 数组元素的个数和类型，它特别适合用来实现多值返回。

场景：在地图中，使用经纬度坐标来标记位置信息

可以使用数组来记录坐标，那么，该数组中只有两个元素，并且这两个元素都是数值类型

```ts
let position: number[] = [116.2317, 39.5427]
```

使用 number[] 的缺点：不严谨，因为该类型的数组中可以出现任意多个数字

更好的方式：`元组 Tuple`

元组类型是另一种类型的数组，它确切地知道包含多少个元素，**以及特定索引对应的类型**（元祖用于保存定长定数据类型的数据）

```ts
// 类型必须匹配且个数必须为2
let position: [number, number] = [39.5427, 116.2317]
```

解释：
1. 元组类型可以确切地标记出有多少个元素，以及每个元素的类型
2. 该示例中，元素有两个元素，每个元素的类型都是 number

**注意**，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。如果一个数组中可能有多种类型，数量和类型都不确定，那就直接`any[]`

### 3.10.2 元祖类型的解构赋值

我们可以通过下标的方式来访问元组中的元素，当元组中的元素较多时，这种方式并不是那么便捷。其实元组也是支持解构赋值的：

```typescript
let employee: [number, string] = [1, "Semlinker"];
let [id, username] = employee;
console.log(`id: ${id}`);
console.log(`username: ${username}`);
```

以上代码成功运行后，控制台会输出以下消息：

```typescript
id: 1
username: Semlinker
```

这里需要注意的是，在解构赋值时，解构数组元素的个数是不能超过元组中元素的个数，否则也会出现错误，比如：

```typescript
let employee: [number, string] = [1, "Semlinker"];
let [id, username, age] = employee;
```

在以上代码中，我们新增了一个 age 变量，但此时 TypeScript 编译器会提示以下错误信息：

```typescript
Tuple type '[number, string]' of length '2' has no element at index '2'.
```

很明显元组类型 `[number, string]` 的长度是 `2`，在位置索引 `2` 处不存在任何元素。

### 3.10.3 元组类型的可选元素

与函数签名类型，在定义元组类型时，我们也可以通过 `?` 号来声明元组类型的可选元素，具体的示例如下：

```typescript
let optionalTuple: [string, boolean?];
optionalTuple = ["Semlinker", true];
console.log(`optionalTuple : ${optionalTuple}`);
optionalTuple = ["Kakuqo"];
console.log(`optionalTuple : ${optionalTuple}`);
```

在上面代码中，我们定义了一个名为 `optionalTuple` 的变量，该变量的类型要求包含一个必须的字符串属性和一个可选布尔属性，该代码正常运行后，控制台会输出以下内容：

```js
optionalTuple : Semlinker,true
optionalTuple : Kakuqo
```

那么在实际工作中，声明可选的元组元素有什么作用？这里我们来举一个例子，在三维坐标轴中，一个坐标点可以使用 `(x, y, z)` 的形式来表示，对于二维坐标轴来说，坐标点可以使用 `(x, y)` 的形式来表示，而对于一维坐标轴来说，只要使用 `(x)` 的形式来表示即可。针对这种情形，在 TypeScript 中就可以利用元组类型可选元素的特性来定义一个元组类型的坐标点，具体实现如下：

```typescript
type Point = [number, number?, number?];

const x: Point = [10]; // 一维坐标点
const xy: Point = [10, 20]; // 二维坐标点
const xyz: Point = [10, 20, 10]; // 三维坐标点

console.log(x.length); // 1
console.log(xy.length); // 2
console.log(xyz.length); // 3
```

### 3.10.4 元组类型的剩余元素

元组类型里最后一个元素可以是剩余元素，形式为 `...X`，这里 `X` 是数组类型。**剩余元素代表元组类型是开放的，可以有零个或多个额外的元素。** 例如，`[number, ...string[]]` 表示带有一个 `number` 元素和任意数量`string` 类型元素的元组类型。为了能更好的理解，我们来举个具体的例子：

```js
type RestTupleType = [number, ...string[]];
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];
console.log(restTuple[0]);
console.log(restTuple[1]);
```

### 3.10.5 只读的元组类型

TypeScript 3.4 还引入了对只读元组的新支持。我们可以为任何元组类型加上 `readonly` 关键字前缀，以使其成为只读元组。具体的示例如下：

```js
const point: readonly [number, number] = [10, 20];
```

在使用 `readonly` 关键字修饰元组类型之后，任何企图修改元组中元素的操作都会抛出异常：

```js
// Cannot assign to '0' because it is a read-only property.
point[0] = 1;
// Property 'push' does not exist on type 'readonly [number, number]'.
point.push(0);
// Property 'pop' does not exist on type 'readonly [number, number]'.
point.pop();
// Property 'splice' does not exist on type 'readonly [number, number]'.
point.splice(1, 1);
```

##  3.11 字面量类型

在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。

### 3.11.1 基本使用

思考以下代码，两个变量的类型分别是什么?

```ts
let str1 = 'Hello TS'
const str2 = 'Hello TS'
```

通过 TS 类型推断机制，可以得到答案：
1. 变量 str1 的类型为：string
2. 变量 str2 的类型为：'Hello TS'

解释:

1. str1 是一个变量(let)，它的值可以是任意字符串，所以类型为:string
2. str2 是一个常量(const)，它的值不能变化只能是 'Hello TS'，所以，它的类型为:'Hello TS'

注意：此处的 'Hello TS'，就是一个**字面量类型**，也就是说某个特定的字符串也可以作为 TS 中的类型

目前，TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型，具体示例如下：

```typescript
{
  let specifiedStr: 'this is string' = 'this is string';
  let specifiedNum: 1 = 1;
  let specifiedBoolean: true = true;
}
```

比如 'this is string' （这里表示一个字符串字面量类型）类型是 string 类型（确切地说是 string 类型的子类型），而 string 类型不一定是 'this is string'（这里表示一个字符串字面量类型）类型，如下具体示例：

```typescript
{
  let specifiedStr: 'this is string' = 'this is string';
  let str: string = 'any string';
  specifiedStr = str; // ts(2322) 类型 '"string"' 不能赋值给类型 'this is string'
  str = specifiedStr; // ok 
}
```

'this is string' 字面量类型可以给 string 类型赋值，但是 string 类型不能给 'this is string' 字面量类型赋值。

### 3.11.2 字符串字面量类型

一般来说，我们可以使用一个字符串字面量类型作为变量的类型，如下代码所示：

```js
let hello: 'hello' = 'hello';
hello = 'hi'; // ts(2322) Type '"hi"' is not assignable to type '"hello"'
```

实际上，定义单个的字面量类型并没有太大的用处，它真正的应用场景是可以把多个字面量类型组合成一个联合类型（后面会讲解），用来描述拥有明确成员的实用的集合。

如下代码所示，我们使用字面量联合类型描述了一个明确、可 'up' 可 'down' 的集合，这样就能清楚地知道需要的数据结构了。

```js
type Direction = 'up' | 'down';

function move(dir: Direction) {
  // ...
}
move('up'); // ok
move('right'); // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'
```

通过使用字面量类型组合的联合类型，我们可以限制函数的参数为指定的字面量类型集合，然后编译器会检查参数是否是指定的字面量类型集合里的成员。

因此，相较于使用 string 类型，使用字面量类型（组合的联合类型）可以将函数的参数限定为更具体的类型。这不仅提升了程序的可读性，还保证了函数的参数类型，可谓一举两得。

### 3.11.3 数字字面量类型及布尔字面量类型

数字字面量类型和布尔字面量类型的使用与字符串字面量类型的使用类似，我们可以使用字面量组合的联合类型将函数的参数限定为更具体的类型，比如声明如下所示的一个类型 Config：

```ts
interface Config {
    size: 'small' | 'big';
    isEnable:  true | false;
    margin: 0 | 2 | 4;
}
```

在上述代码中，我们限定了 size 属性为字符串字面量类型 'small' | 'big'，isEnable 属性为布尔字面量类型 true | false（布尔字面量只包含 true 和 false，true | false 的组合跟直接使用 boolean 没有区别），margin 属性为数字字面量类型 0 | 2 | 4。

### 3.11.4 let和const分析

我们先来看一个 const 示例，如下代码所示：

```js
{
  const str = 'this is string'; // str: 'this is string'
  const num = 1; // num: 1
  const bool = true; // bool: true
}
```

在上述代码中，我们将 const 定义为一个不可变更的常量，在缺省类型注解的情况下，TypeScript 推断出它的类型直接由赋值字面量的类型决定，这也是一种比较合理的设计。

接下来我们看看如下所示的 let 示例:

```js
{

  let str = 'this is string'; // str: string
  let num = 1; // num: number
  let bool = true; // bool: boolean
}
```

在上述代码中，缺省显式类型注解的可变更的变量的类型转换为了赋值字面量类型的父类型，比如 str 的类型是 'this is string' 类型（这里表示一个字符串字面量类型）的父类型 string，num 的类型是 1 类型的父类型 number。

这种设计符合编程预期，意味着我们可以分别赋予 str 和 num 任意值（只要类型是 string 和 number 的子集的变量）：

```js
  str = 'any string';
  num = 2;
  bool = false;
```

我们将 TypeScript 的字面量子类型转换为父类型的这种设计称之为 "literal widening"，也就是字面量类型的拓宽，比如上面示例中提到的字符串字面量类型转换成 string 类型，下面我们着重介绍一下。

### 3.11.5 使用模式和场景

使用模式：**字面量类型配合联合类型一起使用**

使用场景：用来表示一组明确的可选值列表

比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个

```ts
// 使用自定义类型:
type Direction = 'up' | 'down' | 'left' | 'right'

function changeDirection(direction: Direction) {
  console.log(direction)
}

// 调用函数时，会有类型提示：
changeDirection('up')
```

解释：参数 direction 的值只能是 up/down/left/right 中的任意一个

优势：相比于 string 类型，使用字面量类型更加精确、严谨

### 3.11.6 类型拓宽(Type Widening)

所有通过 let 或 var 定义的变量、函数的形参、对象的非只读属性，如果满足指定了初始值且未显式添加类型注解的条件，那么它们推断出来的类型就是指定的初始值字面量类型拓宽后的类型，这就是字面量类型拓宽。

下面我们通过字符串字面量的示例来理解一下字面量类型拓宽：

```js
  let str = 'this is string'; // 类型是 string
  let strFun = (str = 'this is string') => str; // 类型是 (str?: string) => string;
  const specifiedStr = 'this is string'; // 类型是 'this is string'
  let str2 = specifiedStr; // 类型是 'string'
  let strFun2 = (str = specifiedStr) => str; // 类型是 (str?: string) => string;
```

因为第 1~2 行满足了 let、形参且未显式声明类型注解的条件，所以变量、形参的类型拓宽为 string（形参类型确切地讲是 string | undefined）。

因为第 3 行的常量不可变更，类型没有拓宽，所以 specifiedStr 的类型是 'this is string' 字面量类型。

第 4~5 行，因为赋予的值 specifiedStr 的类型是字面量类型，且没有显式类型注解，所以变量、形参的类型也被拓宽了。其实，这样的设计符合实际编程诉求。我们设想一下，如果 str2 的类型被推断为 'this is string'，它将不可变更，因为赋予任何其他的字符串类型的值都会提示类型错误。

基于字面量类型拓宽的条件，我们可以通过如下所示代码添加显示类型注解控制类型拓宽行为。

```js
{
  const specifiedStr: 'this is string' = 'this is string'; // 类型是 '"this is string"'
  let str2 = specifiedStr; // 即便使用 let 定义，类型是 'this is string'
}
```

实际上，除了字面量类型拓宽之外，TypeScript 对某些特定类型值也有类似 "Type Widening" （类型拓宽）的设计，下面我们具体来了解一下。

比如对 null 和 undefined 的类型进行拓宽，通过 let、var 定义的变量如果满足未显式声明类型注解且被赋予了 null 或 undefined 值，则推断出这些变量的类型是 any：

```js
{
  let x = null; // 类型拓宽成 any
  let y = undefined; // 类型拓宽成 any

  /** -----分界线------- */
  const z = null; // 类型是 null

  /** -----分界线------- */
  let anyFun = (param = null) => param; // 形参类型是 null
  let z2 = z; // 类型是 null
  let x2 = x; // 类型是 null
  let y2 = y; // 类型是 undefined
}
```

**注意：在严格模式下，一些比较老的版本中（2.0）null 和 undefined 并不会被拓宽成“any”。**

### 3.11.7 类型缩小(Type Narrowing)

在 TypeScript 中，我们可以通过某些操作将变量的类型由一个较为宽泛的集合缩小到相对较小、较明确的集合，这就是 "Type Narrowing"。

比如，我们可以使用类型守卫将函数参数的类型从 any 缩小到明确的类型，具体示例如下：

```js
{
  let func = (anything: any) => {
    if (typeof anything === 'string') {
      return anything; // 类型是 string 
    } else if (typeof anything === 'number') {
      return anything; // 类型是 number
    }
    return null;
  };
}
```

在 VS Code 中 hover 到第 4 行的 anything 变量提示类型是 string，到第 6 行则提示类型是 number。

同样，我们可以使用类型守卫将联合类型缩小到明确的子类型，具体示例如下：

```js
{
  let func = (anything: string | number) => {
    if (typeof anything === 'string') {
      return anything; // 类型是 string 
    } else {
      return anything; // 类型是 number
    }
  };
}
```

当然，我们也可以通过字面量类型等值判断（===）或其他控制流语句（包括但不限于 if、三目运算符、switch 分支）将联合类型收敛为更具体的类型，如下代码所示：

```js
{
  type Goods = 'pen' | 'pencil' |'ruler';
  const getPenCost = (item: 'pen') => 2;
  const getPencilCost = (item: 'pencil') => 4;
  const getRulerCost = (item: 'ruler') => 6;
  const getCost = (item: Goods) =>  {
    if (item === 'pen') {
      return getPenCost(item); // item => 'pen'
    } else if (item === 'pencil') {
      return getPencilCost(item); // item => 'pencil'
    } else {
      return getRulerCost(item); // item => 'ruler'
    }
  }
}
```

在上述 getCost 函数中，接受的参数类型是字面量类型的联合类型，函数内包含了 `if` 语句的 3 个流程分支，其中每个流程分支调用的函数的参数都是具体独立的字面量类型。

那为什么类型由多个字面量组成的变量 item 可以传值给仅接收单一特定字面量类型的函数 `getPenCost、getPencilCost、getRulerCost` 呢？这是因为在每个流程分支中，编译器知道流程分支中的 item 类型是什么。比如 item === 'pencil' 的分支，item 的类型就被收缩为“pencil”。

事实上，如果我们将上面的示例去掉中间的流程分支，编译器也可以推断出收敛后的类型，如下代码所示：

```js
  const getCost = (item: Goods) =>  {
    if (item === 'pen') {
      item; // item => 'pen'
    } else {
      item; // => 'pencil' | 'ruler'
    }
  }
```

## 3.12 枚举类型（enum）

### 3.12.1 基本使用

枚举就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型。

枚举的功能类似于**字面量类型+联合类型组合**的功能，也可以表示一组明确的可选值。

枚举：定义一组命名常量。它描述一个值，该值可以是这些命名常量中的一个。

```ts
// 创建枚举
enum 枚举名 { 
    枚举项 = 枚举值,
    枚举项 = 枚举值, 
}
```

解释:
1. 使用 `enum` 关键字定义枚举
2. 约定枚举名称以大写字母开头
3. 枚举中的多个值之间通过 `,`（逗号）分隔
4. 定义好枚举后，直接使用枚举名称作为类型注解

### 3.12.2 数字枚举

问题：我们把枚举成员作为了函数的实参，它的值是什么呢?

解释：通过将鼠标移入 Gender.Boy，可以看到枚举成员 Boy 的值为 1

注意：枚举成员是有值的，默认为：从 0 开始自增的数值

我们把，枚举成员的值为数字的枚举，称为：`数字枚举`

当然，也可以给枚举中的成员初始化值

```ts
{
  /* 
    ✅开发需求：
      用户编辑界面，用户选择的性别    男  女  未知
      后端接口参数要求传的是数字对应为 1   0  -1

    🎉开发经验：
      TS项目中可通过设计枚举结构，提高源代码的可读性
  */

  // 定义枚举结构
  // enum Gender {
  //   Boy = 1,
  //   Girl = 0,
  //   Unknown = -1
  // }

  // 🔔补充：枚举项会自动自增，默认从 0 开始
  enum Gender {
    Unknown = -1,
    Girl,
    Boy,
  }

  // 模拟后端所需的参数
  const query: Gender = {
    name: '用户名',
    // gender: Gender.Boy 等价于 gender: 1，🔔但代码可读性更高
    gender: Gender.Boy,
  }

  console.log('query', query)
```

### 3.12.3 字符串枚举-了解即可

字符串枚举：枚举成员的值是字符串

注意：字符串枚举没有自增长行为，因此，**字符串枚举的每个成员必须有初始值**

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
```

### 3.12.4 枚举实现原理

枚举是 TS 为数不多的非 JavaScript 类型级扩展(不仅仅是类型)的特性之一，因为：其他类型仅仅被当做类型，而枚举不仅用作类型，还提供值(枚举成员都是有值的)，也就是说，其他的类型会在编译为 JS 代码时自动移除。但是，**枚举类型会被编译为 JS 代码**。

```ts
enum Gender {
    Unknown = -1,
    Girl = 0,
    Boy = 1,
}

// 会被编译为以下 JS 代码：
var Gender;
(function (Gender) {
    Gender[Gender["Unknown"] = -1] = "Unknown";
    Gender[Gender["Girl"] = 0] = "Girl";
    Gender[Gender["Boy"] = 1] = "Boy";
})(Gender || (Gender = {}));
```

说明：枚举与前面讲到的字面量类型+联合类型组合的功能类似，都用来表示一组明确的可选值列表

一般情况下，**推荐使用字面量类型+联合类型组合的方式**，因为相比枚举，这种方式更加直观、简洁、高效

## 3.13 类型别名（type）

类型别名（自定义类型）：类型别名用来给一个类型起个新名字。(类型别名常用于联合类型。)

使用场景：当同一类型（复杂）被多次使用时，可以通过类型别名，**简化该类型的使用**。

```ts
type CustomArray = (number | string)[]

let arr1: CustomArray = [1, 'a', 3, 'b']
let arr2: CustomArray = ['x', 'y', 6, 7]

type Message = string | string[];
let greet = (message: Message) => {
  // ...
};
```

解释:

1. 使用 `type` 关键字来创建自定义类型
2. 类型别名（比如，此处的 *CustomArray*）可以是任意合法的变量名称
3. 推荐使用大写字母开头
4. 创建类型别名后，直接使用该类型别名作为变量的类型注解即可

> **注意：类型别名，诚如其名，即我们仅仅是给类型取了一个新的名字，并不是创建了一个新的类型。**

## 3.14 类型推断

```typescript
{
  let str: string = 'this is string';
  let num: number = 1;
  let bool: boolean = true;
}
{
  const str: string = 'this is string';
  const num: number = 1;
  const bool: boolean = true;
}
```

看着上面的示例，可能你已经在嘀咕了：定义基础类型的变量都需要写明类型注解，TypeScript 太麻烦了吧？在示例中，使用 let 定义变量时，我们写明类型注解也就罢了，毕竟值可能会被改变。可是，使用 `const` 常量时还需要写明类型注解，那可真的很麻烦。

实际上，TypeScript 早就考虑到了这么简单而明显的问题。

- 在很多情况下, TS 某些没有明确指出类型的地方，**TS 的类型推断机制会帮助提供类型**
- 换句话说：由于类型推断的存在，这些地方，类型注解可以省略不写
- 发生类型推断的 2 种常见场景:
  1. 具有初始化值的变量
  2. 有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。

```ts
{
  let str = 'this is string'; // 等价
  let num = 1; // 等价
  let bool = true; // 等价
}
{
  const str = 'this is string'; // 不等价
  const num = 1; // 不等价
  const bool = true; // 不等价
}

```

我们能根据 return 语句推断函数返回的类型，如下代码所示：

```typescript
{
  /** 根据参数的类型，推断出返回值的类型也是 number */
  function add1(a: number, b: number) {
    return a + b;
  }
  const x1= add1(1, 1); // 推断出 x1 的类型也是 number
  
  /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
  function add2(a: number, b = 1) {
    return a + b;
  }
  const x2 = add2(1);
  const x3 = add2(1, '1'); // ts(2345) Argument of type "1" is not assignable to parameter of type 'number | undefined
}
```

我们把 TypeScript 这种基于赋值表达式推断类型的能力称之为`类型推断`。

> 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查：
>
> ```typescript
> let myFavoriteNumber;
> myFavoriteNumber = 'seven';
> myFavoriteNumber = 7;
> ```

推荐：**能省略类型注解的地方就省略**（~~偷懒~~，充分利用TS类型推断的能力，提升开发效率）

技巧：如果不知道类型，可以通过鼠标悬停在变量名称上，利用 VSCode 的提示来查看类型

## 3.15 总结

类型声明

- 类型声明是TS非常重要的一个特点

- 通过类型声明可以指定TS中变量（参数、形参）的类型

- 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错

- 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

- 语法：

  - ```typescript
    let 变量: 类型;
    
    let 变量: 类型 = 值;
    
    function fn(参数: 类型, 参数: 类型): 类型{
        ...
    }
    ```

自动类型判断

- TS拥有自动的类型判断机制
- 当对变量的声明和赋值是同时进行的，TS编译器会自动判断变量的类型
- 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明

类型：

|  类型   |       例子        |              描述              |
| :-----: | :---------------: | :----------------------------: |
| number  |    1, -33, 2.5    |            任意数字            |
| string  |  'hi', "hi", hi   |           任意字符串           |
| boolean |    true、false    |       布尔值true或false        |
| 字面量  |      其本身       |  限制变量的值就是该字面量的值  |
|   any   |         *         |            任意类型            |
| unknown |         *         |         类型安全的any          |
|  void   | 空值（undefined） |     没有值（或undefined）      |
|  never  |      没有值       |          不能是任何值          |
| object  |  {name:'孙悟空'}  |          任意的JS对象          |
|  array  |      [1,2,3]      |           任意JS数组           |
|  tuple  |       [4,5]       | 元素，TS新增类型，固定长度数组 |
|  enum   |    enum{A, B}     |       枚举，TS中新增类型       |

# 04 编译选项

tsconfig.json 是 TypeScript 项目的配置文件。如果一个目录下存在一个 tsconfig.json 文件，那么往往意味着这个目录就是 TypeScript 项目的根目录。

tsconfig.json 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。

**tsconfig.json 重要字段**

- files - 设置要编译的文件的名称；
- include - 设置需要进行编译的文件，支持路径模式匹配；
- exclude - 设置无需进行编译的文件，支持路径模式匹配；
- compilerOptions - 设置与编译流程相关的选项。

自动编译文件：编译文件时，使用 -w 指令后，TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

示例：

- ```powershell
  tsc xxx.ts -w
  ```

自动编译整个项目：如果直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件。但是能直接使用tsc命令的前提时，要先在项目根目录下创建一个ts的配置文件 tsconfig.json

tsconfig.json是一个JSON文件，添加配置文件后，只需只需 tsc 命令即可完成对整个项目的编译

配置选项：

- include：定义希望被编译文件所在的目录

  默认值：["\*\*/\*"]

  示例：

  ```json
  "include":["src/**/*", "tests/**/*"]
  ```

  上述示例中，所有src目录和tests目录下的文件都会被编译

- exclude：定义需要排除在外的目录

  默认值：["node_modules", "bower_components", "jspm_packages"]

  示例：

  ```json
  "exclude": ["./src/hello/**/*"]
  ```

  上述示例中，src下hello目录下的文件都不会被编译

- extends：定义被继承的配置文件

  示例：

  ```json
  "extends": "./configs/base"
  ```

  上述示例中，当前配置文件中会自动包含config目录下base.json中的所有配置信息

- files：指定被编译文件的列表，只有需要编译的文件少时才会用到

  示例：

  ```json
  "files": [
      "core.ts",
      "sys.ts",
      "types.ts",
      "scanner.ts",
      "parser.ts",
      "utilities.ts",
      "binder.ts",
      "checker.ts",
      "tsc.ts"
    ]
  ```

  列表中的文件都会被TS编译器所编译

compilerOptions：编译选项是配置文件中非常重要也比较复杂的配置选项

在compilerOptions中包含多个子选项，用来完成对编译的配置



项目选项：

- target：设置ts代码编译的目标版本

  可选值：ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

  示例：

  ```json
  "compilerOptions": {
      "target": "ES6"
  }
  ```
  
  如上设置，我们所编写的ts代码将会被编译为ES6版本的js代码
  
- lib：指定代码运行时所包含的库（宿主环境）

  可选值：ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

  示例：

  ```json
  "compilerOptions": {
      "target": "ES6",
      "lib": ["ES6", "DOM"],
      "outDir": "dist",
      "outFile": "dist/aa.js"
  }
  ```
  
- module：设置编译后代码使用的模块化系统

  可选值：CommonJS、UMD、AMD、System、ES2020、ESNext、None

  示例：

  ```typescript
  "compilerOptions": {
      "module": "CommonJS"
  }
  ```
  
- outDir：编译后文件的所在目录

  默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

  示例：

  ```json
"compilerOptions": {
      "outDir": "dist"
  }
  ```
  
  设置后编译后的js文件将会生成到dist目录

- outFile：将所有的文件编译为一个js文件

  默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module制定了None、System或AMD则会将模块一起合并到文件之中

  示例：

  ```json
  "compilerOptions": {
      "outFile": "dist/app.js"
  }
  ```
  
- rootDir：指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录

  示例：

  ```json
  "compilerOptions": {
      "rootDir": "./src"
  }
  ```
  
- allowJs：是否对js文件编译

- checkJs：是否对js文件进行检查

  示例：

  ```json
  "compilerOptions": {
      "allowJs": true,
      "checkJs": true
  }
  ```
  
- removeComments：是否删除注释

  默认值：false
  
- noEmit：不对代码进行编译

  默认值：false
  
- sourceMap：是否生成sourceMap

  默认值：false
  


严格检查

- strict
  - 启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查
- alwaysStrict
  - 总是以严格模式对代码进行编译
- noImplicitAny
  - 禁止隐式的any类型
- noImplicitThis
  - 禁止类型不明确的this(比如函数时window调用)
- strictBindCallApply
  - 严格检查bind、call和apply的参数列表
- strictFunctionTypes
  - 严格检查函数的类型
- strictNullChecks
  - 严格的空值检查
- strictPropertyInitialization
  - 严格检查属性是否初始化

额外检查

- noFallthroughCasesInSwitch
  - 检查switch语句包含正确的break
- noImplicitReturns
  - 检查函数没有隐式的返回值
- noUnusedLocals
  - 检查未使用的局部变量
- noUnusedParameters
  - 检查未使用的参数

高级

- allowUnreachableCode
  - 检查不可达代码
  - 可选值：
    - true，忽略不可达代码
    - false，不可达代码将引起错误
  
- noEmitOnError
  - 有错误的情况下不进行编译
  
  - 默认值：false
  
    

**超哥的compilerOptions 选项**

```json
{
/*
  tsconfig.json是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译
    "include" 用来指定哪些ts文件需要被编译
      路径：** 表示任意目录
            * 表示任意文件
    "exclude" 不需要被编译的文件目录
        默认值：["node_modules", "bower_components", "jspm_packages"]

*/
  "include": [
    "./src/**/*"
  ],
//  "exclude": [
//    "./src/hello/**/*"
//  ]

  /*
    compilerOptions 编译器的选项
  */
  "compilerOptions": {

    // target 用来指定ts被编译为的ES的版本
    // 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'esnext'
    "target": "es2015",
    // module 指定要使用的模块化的规范
    // 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'
    "module": "es2015",
    // lib用来指定项目中要使用的库(默认即可)
//    "lib": []
    // outDir 用来指定编译后文件所在的目录
    "outDir": "./dist",
    // 将代码合并为一个文件
    // 设置outFile后，所有的全局作用域中的代码会合并到同一个文件中
    //"outFile": "./dist/app.js"

    // 是否对js文件进行编译，默认是false
//    "allowJs": true,
    // 是否检查js代码是否符合语法规范，默认是false
//    "checkJs": true,
    // 是否移除注释
    "removeComments": true,
    // 不生成编译后的文件
    "noEmit": false,


    // 当有错误时不生成编译后的文件
    "noEmitOnError": true,

    // 所有严格检查的总开关
    "strict": true,

    // 用来设置编译后的文件是否使用严格模式，默认false
    "alwaysStrict": true,

    // 不允许隐式的any类型
    "noImplicitAny": true,

    // 不允许不明确类型的this
    "noImplicitThis": true,

    // 严格的检查空值
    "strictNullChecks": true

  }
}
```

**网上找的compilerOptions 选项**

```json
{
  "compilerOptions": {
  
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}

```

# 05 webpack配置

## 5.1 项目基本配置

- 通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS同样也可以结合构建工具一起使用，下边以webpack为例介绍一下如何结合构建工具使用TS。

- 步骤：

  1. 初始化项目

     进入项目根目录，执行命令 ``` npm init -y```
  
     主要作用：创建package.json文件
  
  2. 下载构建工具
  
     ```npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin```
  
     共安装了7个包
     - webpack：构建工具webpack
     - webpack-cli：webpack的命令行工具
     - webpack-dev-server：webpack的开发服务器
     - typescript：ts编译器
     - ts-loader：ts加载器，用于在webpack中编译ts文件
     - html-webpack-plugin：webpack中html插件，用来自动创建html文件
     - clean-webpack-plugin：webpack中的清除插件，每次构建都会先清除目录
  
  3. 根目录下创建webpack的配置文件webpack.config.js
  
     ```javascript
     // 引入一个包
     const path = require('path');
     // 引入html插件
     const HTMLWebpackPlugin = require('html-webpack-plugin');
     
     // webpack中的所有的配置信息都应该写在module.exports中
     module.exports = {
     
         // 指定入口文件
         entry: "./src/index.ts",
     
         // 指定打包文件所在目录
         output: {
             // 指定打包文件的目录
             path: path.resolve(__dirname, 'dist'),
             // 打包后文件的文件
             filename: "bundle.js",
     
             // 告诉webpack不使用箭头
             environment:{
                 arrowFunction: false
             },
             
             clean:true
         },
     
         // 指定webpack打包时要使用模块
         module: {
             // 指定要加载的规则
             rules: [
                 {
                     // test指定的是规则生效的文件
                     test: /\.ts$/,
                     // 要使用的loader
                     use: [
                          // 配置babel
                          {
                              // 指定加载器
                              loader:"babel-loader",
                              // 设置babel
                              options: {
                                  // 设置预定义的环境
                                  presets:[
                                      [
                                          // 指定环境的插件
                                          "@babel/preset-env",
                                          // 配置信息
                                          {
                                              // 要兼容的目标浏览器
                                              targets:{
                                                  "chrome":"58",
                                                  "ie":"11"
                                              },
                                              // 指定corejs的版本
                                              "corejs":"3",
                                              // 使用corejs的方式 "usage" 表示按需加载
                                              "useBuiltIns":"usage"
                                          }
                                      ]
                                  ]
                              }
                          },
                         'ts-loader'
                     ],
                     // 要排除的文件
                     exclude: /node-modules/
                 }
             ]
         },
     
         // 配置Webpack插件
         plugins: [
             new HTMLWebpackPlugin({
                 // title: "这是一个自定义的title"
                 template: "./src/index.html"
             }),
         ],
     
         // 用来设置引用模块
         resolve: {
             extensions: ['.ts', '.js']
         }
     
     };
     ```
  
  4. 根目录下创建tsconfig.json，配置可以根据自己需要
  
     ```json
     {
         "compilerOptions": {
             "target": "ES2015",
             "module": "ES2015",
             "strict": true
         }
     }
     ```
  
  5. 修改package.json添加如下配置
  
     ```json
     {
       ...略...
       "scripts": {
         "test": "echo \"Error: no test specified\" && exit 1",
         "build": "webpack",
         "start": "webpack serve --open chrome.exe"
       },
       ...略...
     }
     ```
  
  6. 在src下创建ts文件，并在并命令行执行```npm run build```对代码进行编译，或者执行```npm start```来启动开发服务器


## 5.2 Babel配置

经过一系列的配置，使得TS和webpack已经结合到了一起，除了webpack，开发中还经常需要结合babel来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将babel引入到项目中。

1. 安装依赖包：

   ```npm i -D @babel/core @babel/preset-env babel-loader core-js```

   共安装了4个包，分别是：
   - @babel/core：babel的核心工具
   - @babel/preset-env：babel的预定义环境
   - @babel-loader：babel在webpack中的加载器
   - core-js：core-js用来使老版本的浏览器支持新版ES语法

2. 修改webpack.config.js配置文件

   ```javascript
   ...略...
   module: {
       rules: [
           {
               test: /\.ts$/,
               use: [
                   {
                       loader: "babel-loader",
                       options:{
                           presets: [
                               [
                                   "@babel/preset-env",
                                   {
                                       "targets":{
                                           "chrome": "58",
                                           "ie": "11"
                                       },
                                       "corejs":"3",
                                       "useBuiltIns": "usage"
                                   }
                               ]
                           ]
                       }
                   },
                   {
                       loader: "ts-loader",
   
                   }
               ],
               exclude: /node_modules/
           }
       ]
   }
   ...略...
   ```

如此一来，使用ts编译后的文件将会再次被babel处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的targets中指定要兼容的浏览器版本。

# 06 接口（ interface）

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

## 6.1 什么是接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象]以外，也常用于对「对象的形状（Shape）」进行描述。

## 6.2 基本使用

当一个对象类型被多次使用时，一般会使用接口（`interface`）来描述对象的类型，达到复用的目的

解释：
1. 使用 `interface` 关键字来<u>声明</u>接口
2. 接口名称(比如，此处的 Person)，可以是任意合法的名称
3. 声明接口后，直接使用接口名称作为类型

```typescript
interface IPerson {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

上面的例子中，我们定义了一个接口 `IPerson`，接着定义了一个变量 `tom`，它的类型是 `IPerson`。这样，我们就约束了 `tom` 的形状必须和接口 `IPerson` 一致。

接口一般首字母大写。

定义的变量比接口少了一些属性是不允许的：

```typescript
interface Person {
    name: string;
    age: number;
}
let tom: Person = {
    name: 'Tom'
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

多一些属性也是不允许的：

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

可见，**赋值的时候，变量的形状必须和接口的形状保持一致**。

## 6.3 可选 | 只读属性

```typescript
interface Person {
  readonly name: string;
  age?: number;
}
```

只读属性用于限制只能在对象刚刚创建的时候修改其值。此外 TypeScript 还提供了 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

## 6.4 任意属性

有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 **索引签名** 的形式来满足上述要求。

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```typescript
interface Person {
    name: string;
    age?: number; // 这里真实的类型应该为：number | undefined
    [propName: string]: string | number | undefined;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

## 6.5 绕开额外属性检查的方式

### 6.5.1 类型断言

类型断言的意义就等同于你在告诉程序，你很清楚自己在做什么，此时程序自然就不会再进行额外的属性检查了。

```typescript
interface Props { 
  name: string; 
  age: number; 
  money?: number;
}

let p: Props = {
  name: "兔神",
  age: 25,
  money: -100000,
  girl: false
} as Props; // OK
```

### 6.5.2 索引签名

使用场景：当无法确定对象中有那些属性(或对象中可以出现任意多的属性)

使用[key:string] 来约束该接口中允许出现的属性名称。表示只要是string类型的属性名称，都可以出现在对象中key只是一个占位符，可以换成任意合法的变量名称

```typescript
 interface AnyObject {
    [key:string]:number
}
let obj1:AnyObject ={
    '1':11,
    // 's':'ss'
}
//  ||
//  \/
interface AnyObject1<T> {
    [key:string]:T
}
let obj2:AnyObject1<number> ={
    '1':11,
    // 's':'ss'
}
```

数组接口也是使用了索引签名类型

```ts
interface MyArray<T> {
    [n:number]:T
}

let mayy:MyArray<number> = [1,2]
```

> MyArray模拟了原生的数组接口，并使用[n:number]来作为索引签名类型，该签名表示：只要是number类型的键/索引都可以出现在数组中，或者说数组中可以有任意多个元素，同时也符合数组索引+number类型的这一前提。

## 6.6 interface vs type

实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。

type(类型别名)会给一个类型起个新名字。 type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。起别名不会新建一个类型 - 它创建了一个新名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

区别：

- type类型适用范围更广，接口类型只能用来声明对象
- 在声明对象时，接口可以声明多次
  - type不允许两个相同名称的别名同时存在
  - 接口可以多次声明同一个接口名称
- 接口支持继承的
- 接口可以被类实现

总结：如果是非对象类型的定义，直接使用type；如果是对象类型的声明使用interface。

### 6.6.1 Objects / Functions

两者都可以用来描述对象或函数的类型，但是语法不同。

**Interface**

```typescript
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
```

**Type**

```typescript
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;
```

### 6.6.2 Other Types

与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。

```typescript
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B = typeof div;
```

### 6.6.3 接口可以定义多次

与类型别名不同，接口可以定义多次，会被自动合并为单个接口。

```typescript
interface Point { x: number; }
interface Point { y: number; }
const point: Point = { x: 1, y: 2 };

```

### 6.6.4 接口的继承特性

> - 减少了相同代码的编写
> - 继承第三方库某一类型中所有的属性

##### 1  基本使用

如果两个接口之间有相同的属性或方法，可以将**公共的属性或方法抽离出来，通过继承来实现复用**

比如，这两个接口都有 x、y 两个属性，重复写两次，可以，但很繁琐

```ts
interface Point2D { x: number; y: number }
interface Point3D { x: number; y: number; z: number }
```

更好的方式:

```ts
interface Point2D { x: number; y: number }
// 扩展 Point2D
interface Point3D extends Point2D {
  z: number
}
```

解释：
1. 使用 `extends`(扩展)关键字实现了接口 Point3D 继承 Point2D
2. 扩展后，Point3D 就有了 Point2D 的所有属性和方法(此时，Point3D 同时有 x、y、z 三个属性)

##### 2  和type的区别

两者的扩展方式不同，但并不互斥。接口可以扩展类型别名，同理，类型别名也可以扩展接口。

接口的扩展就是继承，通过 `extends` 来实现。类型别名的扩展就是交叉类型，通过 `&` 来实现。

**接口扩展接口**

```typescript
interface PointX {
    x: number
}

interface Point extends PointX {
    y: number
}
```

**类型别名扩展类型别名**

```typescript
type PointX = {
    x: number
}

type Point = PointX & {
    y: number
}
```

**接口扩展类型别名**

```typescript
type PointX = {
    x: number
}
interface Point extends PointX {
    y: number
}
```

**类型别名扩展接口**

```typescript
interface PointX {
    x: number
}
type Point = PointX & {
    y: number
}
```

### 6.6.5 接口的类实现

类实现某一个接口，接口中的所有属性和行为，类必须具备，再创建实例就会直接具备这些

```typescript
interface Point2 {
    x: number
} 
class Point2 implements PointX{
    x: number
}
const Point3 = new Point2()
```

# 07 泛型（<>）

## 7.1 基本介绍

定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。

> 类型的参数化

举个例子：

```typescript
function identity (arg: any): any{
	return arg;
}
```

上例中，identity 函数有一个参数类型不确定，但是能确定的时其返回值的类型和参数的类型是相同的，由于类型不确定所以参数和返回值均使用了any，但是很明显这样做是不合适的，首先使用any会关闭TS的类型检查，其次这样设置也不能体现出参数和返回值是相同的类型。

**使用泛型：**

为了解决上面的这些问题，我们**使用泛型对上面的代码进行重构**。和我们的定义不同，这里用了一个 类型 T，这个 **T 是一个抽象类型，只有在调用的时候才确定它的值**。

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

语法：在函数名称的后面添加 `<>`(尖括号)，**尖括号中添加类型变量**，比如此处的 Type

**类型变量 Type，是一种特殊类型的变量，它处理类型而不是值**，**该类型变量相当于一个类型容器**，能够捕获用户提供的类型(具体是什么类型由用户调用该函数时指定)。

因为 Type 是类型，因此可以将其作为函数参数和返回值的类型，表示参数和返回值具有相同的类型。

类型变量 Type，可以是任意合法的变量名称，除了 `T` 之外，以下是常见泛型变量代表的意思：

- K（Key）：表示对象中的键类型；
- V（Value）：表示对象中的值类型；
- E（Element）：表示元素类型。
  ![image-20220807133943971](https://i0.hdslb.com/bfs/album/f0875f26e68c8533ab32d23a82bbae11e2232b50.png)

那么如何使用上边的函数呢？

- 方式一（直接使用）：

  ```typescript
  identity(10)
  ```

  在调用泛型函数时，**可以省略 `<类型>` 来简化泛型函数的调用**，此时，TS 内部会采用一种叫做**类型参数推断**的机制，来根据传入的实参自动推断出类型变量 Type 的类型，比如，传入实参 10，TS 会自动推断出变量 num 的类型 number，并作为 Type 的类型

  推荐：使用这种简化的方式调用泛型函数，使代码更短，更易于阅读

  说明：**当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数**

- 方式二（指定类型）：

  ```typescript
  identity<number>(10)
  ```

  语法：在函数名称的后面添加 `<>`(尖括号)，**尖括号中指定具体的类型**，比如，此处的 number，当传入类型 number 后，这个类型就会被函数声明时指定的类型变量 Type 捕获到，此时，Type 的类型就是 number，所以，函数 id 参数和返回值的类型也都是 number，同样，如果传入类型 string，函数 id 参数和返回值的类型就都是 string，这样，通过泛型就做到了让 id 函数与多种不同的类型一起工作，**实现了复用的同时保证了类型安全**

**传入多个类型：**

其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 `U`，用于扩展我们定义的 `identity` 函数：

```typescript
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}
console.log(identity<Number, string>(68, "Semlinker"));
```

![image-20220807134038387](https://i0.hdslb.com/bfs/album/1d646c21096038011017b93333d8fecd97639e4f.png)

**泛型类的使用：**

使用泛型时，完全可以将泛型当成是一个普通的类去使用，类中同样可以使用泛型：

```typescript
class MyClass<T = number>{
    prop: T;

    constructor(prop: T){
        this.prop = prop;
    }
}
```

## 7.2 泛型约束

默认情况下，泛型函数的类型变量 Type 可以代表多个类型，这导致无法访问任何属性

比如，id('a') 调用函数时获取参数的长度：

```ts
function id<Type>(value: Type): Type {
  console.log(value.length)
  return value
}

id('a')
```

解释：Type 可以代表任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length，此时，就需要**为泛型添加约束来`收缩类型`(缩窄类型取值范围)**

添加泛型约束收缩类型，主要有以下两种方式：1 指定更加具体的类型  2 添加约束

### 7.2.1 指定更加具体的类型

比如，将类型修改为 `Type[]`(Type 类型的数组)，因为只要是数组就一定存在 length 属性，因此就可以访问了。

```ts
function id<Type>(value: Type[]): Type[] {
  console.log(value.length)
  return value
}
```

### 7.2.2 添加约束

```ts
// 创建一个接口
interface ILength { length: number }

// Type extends ILength 添加泛型约束
// 解释：表示传入的 类型 必须满足 ILength 接口的要求才行，也就是得有一个 number 类型的 length 属性
function id<Type extends ILength>(value: Type): Type {
  console.log(value.length)
  return value
}
```

解释:
1. 创建描述约束的接口 ILength，该接口要求提供 length 属性
2. 通过 `extends` 关键字使用该接口，为泛型(类型变量)添加约束
3. 该约束表示：**传入的类型必须具有 length 属性**

注意：传入的实参(比如，数组)只要有 length 属性即可（类型兼容性)

## 7.3 泛型接口

泛型接口：接口也可以配合泛型来使用，以增加其灵活性，增强其复用性。

```ts
interface IdFunc<Type = string> { //默认值
  id: (value: Type) => Type
  ids: () => Type[]
}

let obj: IdFunc<number> = {
  id(value) { return value },
  ids() { return [1, 3, 5] }
}
```

解释:
1. 在接口名称的后面添加 `<类型变量>`，那么，这个接口就变成了泛型接口。
2. 接口的类型变量，对接口中所有其他成员可见，也就是**接口中所有成员都可以使用类型变量**。
3. 使用泛型接口时，**需要显式指定具体的类型**(比如，此处的 IdFunc)。
4. 此时，id 方法的参数和返回值类型都是 number;ids 方法的返回值类型是 number[]。

**JS 中的泛型接口**

实际上，JS 中的数组在 TS 中就是一个泛型接口。

```ts
const strs = ['a', 'b', 'c']
// 鼠标放在 forEach 上查看类型
strs.forEach

const nums = [1, 3, 5]
// 鼠标放在 forEach 上查看类型
nums.forEach
```

解释：当我们在使用数组时，TS 会根据数组的不同类型，来自动将类型变量设置为相应的类型

技巧：可以通过 Ctrl + 鼠标左键来查看具体的类型信息。

