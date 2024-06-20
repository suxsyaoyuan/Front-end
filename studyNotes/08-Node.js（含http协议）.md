# Node.js

Node.js：运行在服务器端的js
- 用来编写服务器
- 特点：
- 单线程、异步、非阻塞
- 统一API

node.js和JavaScript有什么区别：

ECMAScript（node有） DOM（node没有） BOM（node没有）

# d1 Promise对象

## 01 同步异步

Promise 是异步操作的一种解决方案。

异步（Asynchronous, async）是与同步（Synchronous, sync）相对的概念。

简单来理解就是：同步按你的代码顺序执行，异步不按照代码顺序执行，异步的执行效率更高。

##### A 同步

- 通常情况代码都是自上向下一行一行执行的
- 前面的代码不执行后边的代码也不会执行
- 同步的代码执行会出现阻塞的情况
- 代码执行慢会影响到整个程序的执行

解决同步问题：

   - java python
     - 通过多线程来解决
          - node.js
     - 通过异步方式来解决

##### B 异步

异步：一段代码的执行不会影响到其他的程序的

问题：异步的代码无法通过return来设置返回值

特点：

1. 不会阻塞其他代码的执行
2. 需要通过回调函数来返回结果

```js
function sum(a, b, cb) {
    setTimeout(() => {
        cb(a + b)
    }, 1000)

}
function sum2(a, b){
    const begin = Date.now()
    // 让程序停10秒
    while(Date.now() - begin < 10000){}
}
console.log("111111")
sum(123, 456, (result)=>{
    sum(result, 7, (result)=>{
        sum(result, 8, result => {
            sum(result, 9, result => {
                sum(result, 10, result => {
                    console.log(result)
                })
            })
        })
    })
})  //回调地狱
console.log("222222")
```

##### C 回调函数（callback function）

在 JavaScript 中，回调函数具体的定义为：函数A 作为参数（函数引用）传递到另一个 函数B 中，并且这个 函数B 执行函数A。我们就说 函数A 叫做回调函数。如果没有名称（函数表达式），就叫做匿名回调函数。

回调函数就是一个作为参数的函数，它是在我们启动一个异步任务的时候就告诉它：等你完成了这个任务之后要干什么。这样一来主线程几乎不用关心异步任务的状态了，他自己会善始善终。

注意：回调和异步不是同一个东西，许多人误认为 js 中每个回调函数都是异步处理的，实际上并不是，可以同步回调，也可以异步回调。只不过说：**回调可以是同步也可以是异步，异步必须放在回调里执行，也就是对于一个异步任务只有回调函数里的才是异步的部分。**

回调同步的例子：

```javascript
const test = function (func) {
func();
}

test(() => {
console.log('func');
})
```

回调异步的例子：

```javascript
setTimeout(()=>{
console.log('one');
}, 3000);
console.log('two');
```

（之前常用的异步操作解决方案是：回调函数）

> ##### **基于回调函数的异步带来的问题：**

1. 代码的可读性差
2. 可调试性差
3. 回调地狱

**解决问题：**需要一个东西，可以代替回调函数来给我们返回结果

**Promise：**

Promise可以帮助我们解决异步中的回调函数的问题

Promise是一个可以用来存储数据的对象

Promise存储数据的方式比较特殊，这种特殊方式使得Promise可以用来存储异步调用的数据

```js
function sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)   //resolve返回的是一个promise 不需要返回值
        }, 1000)
    })
}
sum(123, 456)
    .then(result => result + 7)
    .then(result => result + 8)
    .then(result => console.log(result))
```

## 02 Promise的基本用法

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

#### A 创建Promise

创建Promise时，构造函数中需要一个函数作为参数

Promise构造函数的回调函数，它会在创建Promise时调用，调用时会有两个参数传递进去

```js
const promise = new Promise((resolve, reject) => {
    // resolve 和 reject 是两个函数，通过这两个函数可以向Promise中存储数据
    // resolve在执行正常时存储数据，reject在执行错误时存储数据
    // reject("哈哈")
    // 通过函数来向Promise中添加数据，好处就是可以用来添加异步调用的数据
    // setTimeout(() => {
    //     resolve("哈哈")
    // }, 2000)

    // throw new Error("哈哈，出错了")
    
    resolve("resolve返回的数据")
    // reject("reject返回的数据")

})
```

#### B 从Promise中读取数据

##### `then`

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数，来读取Promise中存储的数据。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

通过resolve存储的数据，会调用第一个函数返回，可以在第一个函数中编写处理数据的代码

通过reject存储的数据或者出现异常时，会调用第二个函数返回，可以在第二个函数中编写处理异常的代码

**Promise中维护了两个隐藏属性**

**PromiseResult**：用来存储数据

**PromiseState**：记录Promise的状态（三种状态）：pending（等待）、fulfilled 或 resolved（成功）、rejected（失败）。

- 实例化 Promise 后，默认是等待状态 

- 当执行 `resolve()` 函数时，Promise 从等待状态——>成功状态。

- 当执行 `reject()` 函数时，Promise 从等待状态——>失败状态。

> state只能修改一次，修改以后永远不会在变
>
> 注意：这里的 resolve reject 只是一个形参，可以取任意名字，但是我们约定直接使用 resolve reject。

**流程：**

当Promise创建时，PromiseState初始值为pending，

- ​        当通过resolve存储数据时 PromiseState 变为fulfilled（完成），PromiseResult变为存储的数据
- ​        当通过reject存储数据或出错时 PromiseState 变为rejected（拒绝，出错了），PromiseResult变为存储的数据 或 异常对象

当我们通过then读取数据时，相当于为Promise设置了回调函数，

- ​        如果PromiseState变为fulfilled，则调用then的第一个回调函数来返回数据
- ​        如果PromiseState变为rejected，则调用then的第二个回调函数来返回数据

#####  `catch`

 catch() 用法和then类似，但是只需要一个回调函数作为参数

- ​    catch()中的回调函数只会在Promise被拒绝时才调用
- ​    catch() 相当于 then(null, *reason* => {})
- ​    catch() 就是一个专门处理Promise异常的方法

#####  `finally() `

- ​    无论是正常存储数据还是出现异常了，finally总会执行
- ​    但是finally的回调函数中不会接收到数据
- ​    finally()通常用来编写一些无论成功与否都要执行代码

promise中的这三个方法都会返回一个新的Promise，Promise中会存储回调函数的返回值

其中finally的返回值，不会存储到新的Promise中

> 后边的方法（then和catch）读取的上一步的执行结果
>
> 如果上一步的执行结果不是当前想要的结果，则跳过当前的方法
>
> 当Promise出现异常时，而整个调用链中没有出现catch，则异常会向外抛出

####  C 静态方法

```js
Promise.resolve() //创建一个立即完成的Promise
```

```js
Promise.reject() //创建一个立即拒绝的Promise 得用catch读
//与 Promise.resolve() 不同，Promise.reject() 无论接收什么类型的参数，都会原封不动的向后传递
```

```js
Promise.all([...]) 
Promise.all([p1, p2, p3])
// 同时返回多个Promise的执行结果
// 其中有一个报错，就返回错误
```

```js
Promise.allSettled([...]) //同时返回多个Promise的执行结果(无论成功或失败)
   {status: 'fulfilled', value: 579}
   {status: 'rejected', reason: '哈哈'}
```

```js
Promise.race([...]) //返回执行最快的Promise（不考虑对错）
```

```js
Promise.any([...]) //返回执行最快的完成的Promise
```

> `Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

**Promise的执行原理**：

Promise在执行，then就相当于给Promise了回调函数，当Promise的状态从pending 变为 fulfilled时，then的回调函数会被放入到任务队列中。

```js
// 开启了一个定时器
// 定时器的作用是间隔一段时间后，将函数放入到任务队列中
setTimeout(() => {
     console.log(1)
}, 0)
```

## 03 宏任务和微任务


​    JS是单线程的，它的运行时基于事件循环机制（event loop）
- 调用栈
     - 栈：栈是一种数据结构，后进先出
     - 调用栈中，放的是要执行的代码
- 任务队列
    - 队列：队列是一种数据结构，先进先出
    - 任务队列的是将要执行的代码
    - 当调用栈中的代码执行完毕后，队列中的代码才会按照顺序依次进入到栈中执行
    - 在JS中任务队列有两种
        - 宏任务队列 （大部分代码都去宏任务队列中去排队）
        - 微任务队列 （Promise的回调函数（then、catch、finally））
- 整个流程
    ① 执行调用栈中的代码
    ② 执行微任务队列中的所有任务
    ③ 执行宏任务队列中的所有任务

## 04 async和await

通过async可以快速的创建异步函数

```js
function fn() {
    return Promise.resolve(10)
}
/* 
    通过async可以来创建一个异步函数
        异步函数的返回值会自动封装到一个Promise中返回
*/      
 async function fn2() {
    return 10
}       
```

在async声明的异步函数中可以使用await关键字来调用异步函数

```js
// fn().then(r => {
//     console.log(r)
// })

// fn2().then(r => {
//     console.log(r)
// })
function sum(a, b) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}
/* 
    Promise解决了异步调用中回调函数问题，
        虽然通过链式调用解决了回调地狱，但是链式调用太多以后还是不好看
        我多想以同步的方式去调用异步的代码
*/

async function fn3() {
    // sum(123, 456)
    //     .then(r => sum(r, 8))
    //     .then(r => sum(r, 9))
    //     .then(r => console.log(r))

    // 当我们通过await去调用异步函数时，它会暂停代码的运行
    //  直到异步代码执行有结果时，才会将结果返回
    /* 注意 await 只能用于 async声明的异步函数中，或es模块的顶级作用域中
                                                 .mjs
                                                 <script type="module"></script>
    */
    // await阻塞的知识异步函数内部的代码，不会影响外部代码
    
    // 通过await调用异步代码时，需要通过try-catch来处理异常
    try {
        let result = await sum(123, 456)
        result = await sum(result, 8)
        result = await sum(result, 9)
        console.log(result)
    } catch (e) {
        console.log("出错了~~")
    }
}

// fn3()
// console.log("全局中的输出~~")
```

执行顺序

```js
// 如果async声明的函数中没有写await，那么它里边就会依次执行
/* 
async function fn4(){
    console.log(1)
    console.log(2)
    console.log(3)
}

function fn5(){
    return new Promise(resolve => {
        console.log(1)
        console.log(2)
        console.log(3)
        resolve()
    })
} 
*/  
//123

async function fn4() {
    console.log(1)
    /* 
        当我们使用await调用函数后，当前函数后边的所有代码 
        会在当前函数执行完毕后，被放入到微任务队里中
    */
    await console.log(2)
    // await后边的所有代码，都会放入到微任务队列中执行 相当于放到一个then里面
    console.log(3)
}
fn4()
console.log(4)
//1243 2后面的所有代码会挂到微任务 4执行后 栈空了 然后执行3
//相当于
function fn5() {
    return new Promise(resolve => {
        console.log(1)
        // 加了await
        console.log(2)
        
        resolve()
    }).then(r => {
        console.log(3)
    })
}
fn5()
console.log(4)
```

想在非模块的js里面调用await

```js
// 又不想用这个函数
// async function fn6(){
//     await console.log("哈哈")
// }
// fn6()
// 立即执行函数 记得加分号 和前面的函数隔开
;(async () => {
    await console.log("哈哈")
})()
```

# d2 模块化 CommonJS

### 01 前言

网站越来越复杂，js代码、js文件也越来越多，会遇到**一些问题**：

- 文件依赖
- 全局污染、命名冲突

程序模块化包括：

- 日期模块
- 数学计算模块
- 日志模块
- 登陆认证模块
- 报表展示模块等。

所有这些模块共同组成了程序软件系统。

一次编写，多次使用，才是提高效率的核心。

### 02 模块化的理解

#### 2.1 什么是模块化

**概念**：将一个复杂的程序依据一定的规则（规范）封装成几个块（文件），并组合在一起。

模块的内部数据、实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信。

最早的时候，我们会把所有的代码都写在一个js文件里，那么，耦合性会很高（关联性强），不利于维护；而且会造成全局污染，很容易命名冲突。

#### 2.2 模块化的好处

- 避免命名冲突，减少命名空间污染
- 降低耦合性；更好地分离、按需加载
- **高复用性**：代码方便重用，别人开发的模块直接拿过来就可以使用，不需要重复开发类似的功能。
- **高可维护性**：软件的声明周期中最长的阶段其实并不是开发阶段，而是维护阶段，需求变更比较频繁。使用模块化的开发，方式更容易维护。
- 部署方便

### 03 模块化规范

#### 3.1 模块化规范的引入

假设我们引入模块化，首先可能会想到的思路是：在一个文件中引入多个js文件。如下：

```html
<body>
    <script src="zepto.js"></script>
    <script src="fastClick.js"></script>
    <script src="util/login.js"></script>
    <script src="util/base.js"></script>
    <script src="util/city.js"></script>
</body>
```

但是这样做会带来很多问题：

- 请求过多：引入十个js文件，就有十次http请求。
- 依赖模糊：不同的js文件可能会相互依赖，如果改其中的一个文件，另外一个文件可能会报错。

以上两点，最终导致：**难以维护**。

于是，这就引入了模块化规范。

#### 3.2 模块化的概念解读

模块化起源于 Node.js。Node.js 中把很多 js 打包成 package，需要的时候直接通过 require 的方式进行调用（CommonJS），这就是模块化的方式。

那如何把这种模块化思维应用到前端来呢？这就产生了两种伟大的 js：RequireJS 和 SeaJS。

#### 3.3 模块化规范

服务器端规范：

- [**CommonJS规范**](http://www.commonjs.org/)：是 Node.js 使用的模块化规范。

CommonJS 就是一套约定标准，不是技术。用于约定我们的代码应该是怎样的一种结构。

浏览器端规范：

- [**AMD规范**](https://github.com/amdjs/amdjs-api)：是 **[RequireJS](http://requirejs.org/)** 在推广过程中对模块化定义的规范化产出。

```text
- 异步加载模块；

- 依赖前置、提前执行：require([`foo`,`bar`],function(foo,bar){});   //也就是说把所有的包都 require 成功，再继续执行代码。

- define 定义模块：define([`require`,`foo`],function(){return});
```

- **[CMD规范](https://web.qianguyihao.com/11-Node.js/04-Node.js模块化规范：CommonJS.html)**：是 **[SeaJS](http://seajs.org/)** 在推广过程中对模块化定义的规范化产出。淘宝团队开发。

```text
  同步加载模块；

  依赖就近，延迟执行：require(./a) 直接引入。或者Require.async 异步引入。   //依赖就近：执行到这一部分的时候，再去加载对应的文件。

  define 定义模块， export 导出：define(function(require, export, module){});
```

PS：面试时，经常会问AMD 和 CMD 的区别。

另外，还有ES6规范：import & export。

这篇文章，我们来讲一下`CommonJS`，它是 Node.js 使用的模块化规范。

### 04 CommonJS 的基本语法

#### 4.1 CommonJS 的介绍

[CommonJS](http://www.commonjs.org/)：是 Node.js 使用的模块化规范。也就是说，Node.js 就是基于 CommonJS 这种模块化规范来编写的。

CommonJS 规范规定：每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口对象。加载某个模块，其实是加载该模块的 module.exports 对象。

在 CommonJS 中，每个文件都可以当作一个模块：

- 在服务器端：模块的加载是运行时同步加载的。
- 在浏览器端: 模块需要提前编译打包处理。首先，既然同步的，很容易引起阻塞；其次，浏览器不认识`require`语法，因此，需要提前编译打包。

#### 4.2 模块的暴露和引入

Node.js 中只有模块级作用域，两个模块之间的变量、方法，默认是互不冲突，互不影响，这样就导致一个问题：模块 A 要怎样使用模块B中的变量&方法呢？这就需要通过 `exports` 关键字来实现。

Node.js中，每个模块都有一个 exports 接口对象，我们可以把公共的变量、方法挂载到这个接口对象中，其他的模块才可以使用。

接下来详细讲一讲模块的暴露、模块的引入。

##### 4.2.1 暴露模块的方式一： exports

`exports`对象用来导出当前模块的公共方法或属性。别的模块通过 require 函数调用当前模块时，得到的就是当前模块的 exports 对象。

**语法格式**：

```js
// 相当于是：给 exports 对象添加属性
exports.xxx = value
```

这个 value 可以是任意的数据类型。

**注意**：暴露的关键词是`exports`，不是`export`。其实，这里的 exports 类似于 ES6 中的 export 的用法，都是用来导出一个指定名字的对象。

**代码举例**：

```js
const name = 'qianguyihao';

const foo = function (value) {
	return value * 2;
};

exports.name = name;
exports.foo = foo;
```

##### 4.2.2 暴露模块的方式二： module.exports

`module.exports`用来导出一个默认对象，没有指定对象名。

语法格式：

```javascript
// 方式一：导出整个 exports 对象
module.exports = value;

// 方式二：给 exports 对象添加属性
module.exports.xxx = value;
```

这个 value 可以是任意的数据类型。

代码举例：

```js
// 方式1
module.exports = {
    name: '我是 module1',
    foo(){
        console.log(this.name);
    }
}

// 我们不能再继续写 module.exports = value2。因为重新赋值，会把 exports 对象 之前的赋值覆盖掉。

// 方式2
const age = 28;
module.exports.age = age;
```

`module.exports` 还可以修改模块的原始导出对象。比如当前模块原本导出的是一个对象，我们可以通过 module.exports 修改为导出一个函数。如下：

```js
module.exports = function () {
    console.log('hello world')
}
```

#### 4.3 exports 和 module.exports 的区别

最重要的区别：

- 使用exports时，只能单个设置属性 `exports.a = a;`
- 使用module.exports时，既单个设置属性 `module.exports.a`，也可以整个赋值 `module.exports = obj`。

其他要点：

- Node中每个模块的最后，都会执行 `return: module.exports`。
- Node中每个模块都会把 `module.exports`指向的对象赋值给一个变量 `exports`，也就是说 `exports = module.exports`。
- `module.exports = XXX`，表示当前模块导出一个单一成员，结果就是XXX。
- 如果需要导出多个成员，则必须使用 `exports.add = XXX; exports.foo = XXX`。或者使用 `module.exports.add = XXX; module.export.foo = XXX`。

#### 4.4 问题: 暴露的模块到底是谁？

**答案**：暴露的本质是`exports`对象。【重要】

比如，方式一的 `exports.a = a` 可以理解成是，**给 exports 对象添加属性**。方式二的 `module.exports = a`可以理解成是给整个 exports 对象赋值。方式二的 `module.exports.c = c`可以理解成是给 exports 对象添加属性。

Node.js 中每个模块都有一个 module 对象，module 对象中的有一个 exports 属性称之为**接口对象**。我们需要把模块之间公共的方法或属性挂载在这个接口对象中，方便其他的模块使用。

#### 4.5 引入模块的方式：require

require函数用来在一个模块中引入另外一个模块。传入模块名，返回模块导出对象。

**语法格式**：

```js
const module1 = require('模块名');
```

解释：

- 内置模块：require的是**包名**。
- 下载的第三方模块：require的是**包名**。
- 自定义模块：require的是**文件路径**。文件路径既可以用绝对路径，也可以用相对路径。后缀名`.js`可以省略。

**代码举例**：

```js
const module1 = require('./main.js');

const module2 = require('./main');

const module3 = require('Demo/src/main.js');
```

**require()函数的两个作用**：

- 执行导入的模块中的代码。
- 返回导入模块中的接口对象。

#### 4.6 主模块

主模块是整个程序执行的入口，可以调度其他模块。

```bash
# 运行main.js启动程序。此时，main.js就是主模块
$ node main.js
```

#### 4.7 模块的初始化

一个模块中的 JS 代码仅在模块**第一次被使用时**执行一次，并且在使用的过程中进行初始化，然后会被缓存起来，便于后续继续使用。

代码举例：

（1）calModule.js:

```js
var a = 1;

function add () {
  return ++a;
}

exports.add = add;
```

（2）main.js：（在 main.js 中引入 hello.js 模块）

```js
var addModule1 = require('./calModule')
var addModule2 = require('./calModule')

console.log(addModule1.add());
console.log(addModule2.add());
```

在命令行执行 `node main.js` 运行程序，打印结果：

```bash
2
3
```

从打印结果中可以看出，`calModule.js`这个模块虽然被引用了两次，但只初始化了一次。

### 05 commonjs-在服务器端的实现举例

（1）module1.js：

```javascript
//暴露方式一：module.exports = value

//暴露一个对象出去
module.exports = {
    name: '我是 module1',
    foo(){
        console.log(this.name);
    }
}

//我们不能再继续写 module.exports = xxx。因为重新赋值，会把之前的赋值覆盖掉。
```

（2）module2.js：

```javascript
//暴露方式一：module.exports = value

//暴露一个函数出去
module.exports = function(){
    console.log('我是 module2');
}
```

注意，此时暴露出去的 exports 对象 等价于整个函数。

（3）module3.js：

```javascript
//暴露方式二：exports.xxx = value

//可以往 export 对象中不断地添加属性，进行暴露

exports.foo1 = function(){
    console.log('module3 中的 foo1 方法');
}

exports.foo2 = function(){
    console.log('module3 中的 foo2 方法');
}

exports.arr = [1,1,2,2,3,5,11];
```

（4）app.js：（将其他模块汇集到主模块）

```javascript
//将其他模块汇集到主模块

let uniq = require('uniq'); //引入时，第三方模块要放在自定义模块的上面

let module1 = require('./modules/module1');
let module2 = require('./modules/module2');
let module3 = require('./modules/module3');

//调用module1对象的方法
module1.foo();

//调用module2的函数
module2();  //注意，在定义时，module2对象等价于整个函数function。所以，module2()的意思是，直接调用了函数。

//调用module3中的属性
module3.foo1();
module3.foo2();

uniq(module3.arr); //将module3中的数组进行去重操作
console.log(module3.arr); //打印数组去重后的结果
```

这样的话，我们的代码就写完了。

我们在命令行中输入`node app.js`，就可以把代码跑起来了。打印结果如下：

```bash
我是 module1
我是 module2
module3 中的 foo1 方法
module3 中的 foo2 方法
[ 1, 11, 2, 3, 5 ]
```

### 06 commonjs-基于浏览器端的实现举例

#### 6.1 初始化项目

在工程文件中新建如下目录和文件：

```text
js
    dist //打包生成文件的目录
    src //源码所在的目录
      | module1.js
      | module2.js
      | module3.js
      | app.js //应用主源文件
index.html    //因为CommonJS是基于浏览器端，js文件要跑在浏览器的页面上，所以要有这个html页面
```

然后在根目录下新建如下命令：

```text
  npm init
```

然后根据提示，依次输入如下内容：

- **包名**：可以自己起包名，也可以用默认的包名。注意，包名里不能有中文，不能有大写。
- **版本**：可以用默认的版本 1.0.0，也可以自己修改包名。

其他的参数，一路回车即可。

于是，根目录下会自动生成`package.json`这个文件。点进去看一下：

```json
{
  "name": "commonjs_browser",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

#### 6.2 下载第三方包：Browserify

这里需要用到[Browserify](http://browserify.org/)这个工具进行编译打包。Browserify 称为 CommonJS 的浏览器端的打包工具。

输入如下命令进行安装：（两个命令都要输入）

```javascript
    npm install browserify -g          //全局
    npm install browserify --save-dev  //局部。
```

上面的代码中，`-dev`表示开发依赖。这里解释一下相关概念：

- 开发依赖：当前这个包，只在开发环境下使用。
- 运行依赖：当前这个包，是在生产环境下使用。

#### 6.3 自定义模块 & 代码运行

（1）module1.js：

```javascript
//暴露方式一：module.exports = value

//暴露一个对象出去
module.exports = {
    name: '我是 module1',
    foo(){
        console.log(this.name);
    }
}

//我们不能再继续写 module.exports = xxx。因为重新赋值，会把之前的赋值覆盖掉。
```

（2）module2.js：

```javascript
//暴露方式一：module.exports = value

//暴露一个函数出去
module.exports = function(){
    console.log('我是 module2');
}
```

注意，此时暴露出去的 exports 对象 等价于整个函数。

（3）module3.js：

```javascript
//暴露方式二：exports.xxx = value

//可以往export对象中不断地添加属性，进行暴露

exports.foo1 = function(){
    console.log('module3 中的 foo1 方法');
}

exports.foo2 = function(){
    console.log('module3 中的 foo2 方法');
}
```

（4）app.js：（将其他模块汇集到主模块

引入的路径解释：

- `./`是相对路径，指的是当前路径（app.js的当前路径是src）

到此，我们的主要代码就写完了。

但是，如果我们直接在index.html中，像下面这样写，是不行的：（因为浏览器不认识 require 关键字）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="./js/src/app.js"></script>
</body>
</html>
```

为了能够让index.html引入app.js，我们需要输入如下命令：

打包处理js:

```text
    browserify js/src/app.js -o js/dist/bundle.js
```

然后在index.html中引入打包后的文件：

```html
    <script type="text/javascript" src="js/dist/bundle.js"></script>
```



# d3 核心模块

核心模块，是node中自带的模块，可以在node中直接使用

window 是浏览器的宿主对象 node中是没有的

global 是node中的全局对象，作用类似于window

ES标准下，全局对象的标准名应该是 globalThis

### 01 process

核心模块——process ：表示当前的node进程

该对象可以获取进程的信息，或者对进程做各种操作

如何使用：

1. process是一个全局变量，可以直接使用

2. 有哪些属性和方法：

    `process.exit()`：结束当前进程，终止node

    `process.nextTick(callback[, …args])`：将函数插入到 tick队列中

    ​		tick队列中的代码，会在下一次事件循环之前执行

    ​		会在微任务队列和宏任务队列中任务之前执行

> 调用栈
> tick队列（旧的微任务队列
> 微任务队列
> 宏任务队列

```js
// console.log(11111)
// process.exit(0)
// console.log(22222)
// console.log(33333)

setTimeout(() => {
    console.log(1) // 宏任务队列
})
queueMicrotask(() => {
    console.log(2)
}) // 微任务队列

process.nextTick(() => {
    console.log(3) // tick队列
})
console.log(4) // 调用栈
//4231
```

### 02 path.js

path：表示的路径

通过path可以用来获取各种路径

要使用path，需要先对其进行引入

方法：`path.resolve([…paths]) `：生成一个绝对路径

相对路径：./xxx  ../xxx  xxx

绝对路径：           

- 在计算机本地
     c:\xxx
     /User/xxxx
- 在网络中
  http://www.xxxxx/...
  https://www.xxx/...

如果直接调用resolve，则返回当前的工作目录

​            C:\Program Files\nodejs\node.exe .\03_包管理器\01_path.js
​            c:\Users\lilichao\Desktop\Node-Course

node .\01_path.js
            C:\Users\lilichao\Desktop\Node-Course\03_包管理器

​	注意，我们通过不同的方式执行代码时，它的工作目录是有可能发生变化的

如果将一个相对路径作为参数，则resolve会自动将其转换为绝对路径，此时根据工作目录的不同，它所产生的绝对路径也不同。

```js
const path = require("node:path")   //要先引入
// const result = path.resolve()

//一般会将一个绝对路径作为第一个参数，一个相对路径作为第二个参数，这样它会自动计算出最终的路径。
// c:\Users\lilichao\Desktop\Node-Course\hello.js
// const result = path.resolve("./hello.js")
// const result = path.resolve(
//     "C:\\Users\\lilichao\\Desktop\\Node-Course\\03_包管理器",
//     "../../hello.js")

// 最终形态
// 以后在使用路径时，尽量通过path.resolve()来生成路径
// const result = path.resolve(__dirname, "./hello.js")
// console.log(result)
// 这样通过不同的方式执行代码时路径是相同的
```

### 03 fs.js

fs （File System）：fs用来帮助node来操作磁盘中的文件

文件操作也就是所谓的I/O，input output

使用fs模块，同样需要引入

##### **`fs.readFile()` **

读取文件

```js
const fs = require("node:fs/promises")
const { buffer } = require("stream/consumers")
    /* 
        1 用Promise版本的fs的方法 promise异步
    */
    fs.readFile(path.resolve(__dirname, "./hello.txt"))
         .then(buffer => {
             console.log(buffer.toString())
         })
         .catch(e => {
            console.log("出错了~")
         })

//2 还可以这么写 async
; (async () => {
    try {
        const buffer = await fs.readFile(path.resolve(__dirname, "./hello.txt"))
        console.log(buffer.toString())
    } catch (e) {
        console.log("出错了~~")
    }
})()

// 3 readFileSync() 同步的读取文件的方法，会阻塞后边代码的执行
// 当我们通过fs模块读取磁盘中的数据时，读取到的数据总会以Buffer对象的形式返回
// Buffer是一个临时用来存储数据的缓冲区
const buf = fs.readFileSync(path.resolve(__dirname, "./hello.txt"))
console.log(buf.toString())

// 4 readFile() 异步的读取文件的方法
fs.readFile(
path.resolve(__dirname, "./hello.txt"),
(err, buffer) => {

  if (err) {
		console.log("出错了~")
	} else {
      	console.log(buffer.toString())
}
}
)
```

##### `fs.appendFile() `

创建新文件，或将数据添加到已有文件中

```js
 fs.appendFile(
     path.resolve(__dirname, "./hello123.txt"),
     "超哥讲的真不错"
 ).then(r => {
     console.log("添加成功")
 })
 
// 复制一个文件
// C:\Users\lilichao\Desktop\图片\jpg\an.jpg
fs.readFile("C:\\Users\\lilichao\\Desktop\\图片\\jpg\\an.jpg")
    .then(buffer => {

        return fs.appendFile(
            path.resolve(__dirname, "./haha.jpg"),
            buffer
        )
    })
    .then(() => {
        console.log("操作结束")
    })
fs.mkdir()
```

`fs.mkdir()` 创建目录
`fs.rmdir() `删除目录
`fs.rm()` 删除文件
`fs.rename()` 重命名
`fs.copyFile() `复制文件

```js
/*
    mkdir可以接收一个 配置对象作为第二个参数，
        通过该对象可以对方法的功能进行配置
            recursive 默认值为false
                - 设置true以后，会自动创建不存在的上一级目录
*/
// 创建目录
fs.mkdir(path.resolve(__dirname, "./hello/abc"), { recursive: true })
 .then(r => {
     console.log("操作成功~")
 })
 .catch(err => {
     console.log("创建失败", err)
 })

// 删除路径
 fs.rmdir(path.resolve(__dirname, "./hello"), { recursive: true })
     .then(r => {
         console.log("删除成功")
     })

// 重命名
fs.rename(
    path.resolve(__dirname, "../an.jpg"),
    path.resolve(__dirname, "./an.jpg")
).then(r => {
    console.log("重命名成功")
})
```

### 04 Buffer（缓冲器）

##### A 概念

Buffer 是一个类似于数组的 `对象` ，用于表示固定长度的字节序列

Buffer 本质是一段内存空间，专门用来处理 `二进制数据` 。

##### B 特点

1. Buffer 大小固定且无法调整
2. Buffer 性能较好，可以直接对计算机内存进行操作
3. 每个元素的大小为 1 字节（byte）

##### C 使用

###### 创建 Buffer

Node.js 中创建 Buffer 的方式主要如下几种：

1. `Buffer.alloc`

   ```js
   // 创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为 0
   let buf_1 = Buffer.alloc(10) //=>结果为<Buffer 00 00 00 00 00 00 00 00 00 00>
   ```

2. `Buffer.allocUnsafe`

   ```js
   // 创建了一个长度为 10 字节的 Buffer，buffer 中可能存在旧数据，可能会影响执行结果，所以叫 unsafe ，但是效率比 alloc 高
   let buf_2 = Buffer.allocUnsafe(10)
   ```


3. `Buffer.from`

   ```js
   // 通过字符串创建 Buffer
   let buf_3 = Buffer.from('hello')
   // 通过数组创建 Buffer
   let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
   ```


###### Buffer 与字符串的转化

> 我们可以借助 `toString` 方法将 Buffer 转为字符串

```js
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf_4.toString()) //=>iloveyou
```

**注意: **`toString` 默认是按照 `utf-8` 编码方式进行转换的

###### Buffer 的读写

> Buffer 可以直接通过 `[]` 的方式对数据进行处理。

```js
let buf_3 = Buffer.from('hello')
// 读取
console.log(buf_3[1]) //=>101
// 修改
buf_3[1] = 97
//查看字符串结果
console.log(buf_3.toString()) //=>hallo
```

**注意:**

1. 如果修改的数值超过 `255` ，则<span style="color:red">超过</span> `8` 位数据会被舍弃
2. 一个 `utf-8` 的字符 <span style="color:red">一般</span> 占3个字节

# d4 npm

### 01 包和npm

#### A 什么是包

由于 Node 是一套轻内核的平台，虽然提供了一系列的内置模块，但是不足以满足开发者的需求，于是乎出现了包（package）的概念： 与核心模块类似，就是将一些预先设计好的功能或者说 API 封装到一个文件夹，提供给开发者使用。

Node 本身并没有太多的功能性 API，所以市面上涌现出大量的第三方人员开发出来的 Package。

npm由以下三个部分组成：

1. npm网站 （通过npm网站可以查找包，也可以管理自己开发提交到npm中的包。https://www.npmjs.com/）
2. npm CLI（Command Line Interface 即 命令行）（通过npm的命令行，可以在计算机中操作npm中的各种包（下载和上传等））
3. 仓库（仓库用来存储包以及包相关的各种信息）

#### B package.json

```js
/* 
    package.json
        - package.json是包的描述文件
        - node中通过该文件对项目进行描述
        - 每一个node项目必须有package.json
    命令
        npm init 初始化项目，创建package.json文件（需要回答问题）
        npm init -y 初始化项目，创建package.json文件（所有值都采用默认值）
        npm install 包名 将指定包下载到当前项目中
            install时发生了什么？
                ① 将包下载当前项目的node_modules目录下
                ② 会在package.json的dependencies属性中添加一个新属性
                    "lodash": "^4.17.21"
                ③ 会自动添加package-lock.json文件
                    帮助加速npm下载的，不用动他
                    
        npm install 自动安装所有依赖

        npm install 包名 -g 全局安装
            - 全局安装是将包安装到计算机中
            - 全局安装的通常都是一些工具

        npm uninstall 包名 卸载           
        https://docs.npmjs.com/cli/v8/commands
*/

/* 
    引入从npm下载的包时，不需要书写路径，直接写包名即可
*/
const _ = require("lodash")
// console.log(_)
```

#### C 包的加载机制

Node.js中使用`CommonJs`模块化机制，通过`npm`下载的第三方包，我们在项目中引入第三方包都是：`let xx = require('第三方包名')`，究竟`require`方法加载第三方包的原理机制是什么，今天我们来探讨下。

1. `require('第三方包名')`优先在加载该包的模块的同级目录`node_modules`中查找第三方包。
2. 找到该第三方包中的`package.json`文件，并且找到里面的`main`属性对应的入口模块，该入口模块即为加载的第三方模块。
3. 如果在要加载的第三方包中没有找到`package.json`文件或者是`package.json`文件中没有`main`属性，则默认加载第三方包中的`index.js`文件。
4. 如果在加载第三方模块的文件的同级目录没有找到`node_modules`文件夹，或者以上所有情况都没有找到，则会向上一级父级目录下查找`node_modules`文件夹，查找规则如上一致。
5. 如果一直找到该模块的磁盘根路径都没有找到，则会报错：`can not find module xxx`。

比如说：

```javascript
requiere(`fs`);
```

那加载的肯定是系统的包。所以，我们尽量不要创建一些和现有的包重名的包。

#### D npm 的概念

**NPM**：Node Package Manager。官方链接： https://www.npmjs.com/

Node.js 发展到现在，已经形成了一个非常庞大的生态圈。包的生态圈一旦繁荣起来，就必须有工具去来管理这些包。NPM 应运而生。

举个例子，当我们在使用 Java 语言做开发时，需要用到 JDK 提供的内置库，以及第三方库。同样，在使用 JS 做开发时，我们可以使用 NPM 包管理器，方便地使用成熟的、优秀的第三方框架，融合到我们自己的项目中，极大地加速日常开发的构建过程。

随着时间的发展，NPM 出现了两层概念：

- 一层含义是 Node 的开放式模块登记和管理系统，亦可以说是一个生态圈，一个社区。

- 另一层含义是 Node 默认的模块管理器，是一个命令行下的软件，用来安装和管理 Node 模块


#### E 配置 NPM 的全局目录

NPM 默认安装到当前正在使用 Node 版本所在目录下。我们建议重新配置 NPM 的全局目录。

输入`npm config ls`，查看

https://blog.csdn.net/smalCat/article/details/79505441

### 02 NPM 的常用命令

查看 npm 当前版本：

```bash
npm -v
```

更新 npm：

```bash
npm install npm@latest -g
```

项目初始化：（执行完成后，会生成`package.json`文件）

```bash
npm init

# 快速跳过问答式界面，选择默认配置
npm init --yes
```

只在当前工程下安装指定的包：

```bash
npm install [package]
```

在全局安装指定的包：

```text
npm install -g [package]
```

安装的包只用于开发环境，不用于生产环境：（会出现在 package.json 文件中的 devDependencies 属性中）

```bash
npm install [package] --save-dev

# 或者
npm install [package] -D
```

安装的包需要发布到生产环境：（会出现在 package.json 文件中的 dependencies 属性中）

```bash
npm install [package] --save

# 或者
npm install [package] -S
```

查看当前目录下已安装的 node 包：

```bash
npm list
```

查看全局已经安装的 node 包：

```bash
npm list -g
```

查看 npm 帮助命令：

```bash
npm --help
```

查看指定命令的帮助：

```bash
npm [指定命令] --help
```

更新指定的包：

```bash
npm update [package]
```

卸载指定的包：

```bash
npm uninstall [package]
```

查看配置信息：

```bash
npm config list
```

查看本地安装的指定包的信息，没有则显示 empty：

```bash
npm ls [package]
```

查看全局安装的指定包的信息，没有则显示 empty：

```bash
npm ls [package] -g
```

查看远程 npm 上指定包的所有版本信息：

```bash
npm info [package] versions
```

查看当前包的安装路径：

```bash
npm root
```

查看全局包的安装路径：

```bash
npm root -g
```

### 03 配置 npm 镜像源

由于 npm 默认的下载地址在国外（npmjs.com），有时候会被墙，导致无法下载或者下载很慢。因此，我们可以尝试切换成，从其他的镜像源下载 npm 包。

切换镜像源，有下面这几种方式：

- 方式 1：临时切换镜像源。
- 方式 2：切换镜像源
- 方式 3：通过 NRM 切换镜像源（最为推荐的方式）。
- 方式 4：cnpm。

#### 3.1 方式 1：临时切换镜像源

安装指定包的时候，通过追加 `--registry`参数即可。格式如下：

```bash
# 格式
npm install [package] --registry [https://xxx]

# 举例：在下载安装 express 这个包的时候，临时指定镜像源为 https://registry.npm.taobao.org
npm install express --registry https://registry.npmmirror.com/
```

#### 3.2 方式 2：切换镜像源（√）

```js
npm config set registry https://registry.npmmirror.com/
//还原到原版仓库
npm config delete registry
// 查看
npm config get registry
```

执行上述命令后，以后下载所有 npm 包的时候，都会改为使用淘宝的镜像源。

#### 3.3 方式 3：通过 NRM 切换镜像源

**NRM**：Node Registry Manager。作用是：**切换和管理 npm 包的镜像源**。

- 项目地址：https://www.npmjs.com/package/nrm
- GitHub 地址： https://github.com/Pana/nrm

**安装 NRM**：

```bash
npm install -g nrm
```

> 执行命令`nrm ls`查看可选的源。

```bash
npm ---------- https://registry.npmjs.org/
yarn --------- https://registry.yarnpkg.com/
tencent ------ https://mirrors.cloud.tencent.com/npm/
cnpm --------- https://r.cnpmjs.org/
taobao ------- https://registry.npmmirror.com/
npmMirror ---- https://skimdb.npmjs.com/registry/
```

1. 切换

如果要切换到`taobao`源，执行命令 `nrm use taobao`。

2. 增加

你可以增加定制的源，特别适用于添加企业内部的私有源，执行命令 `nrm add <registry> <url>`，其中`reigstry`为源名，`url`为源的路径。

```bash
nrm add registry http://registry.npm.frp.trmap.cn/
```

3. 删除

执行命令`nrm del <registry>`删除对应的源。

4. 测试速度

你还可以通过 `nrm test` 测试相应源的响应时间。

```bash
nrm test npm  
```

#### 3.4 方式 4：安装 cnpm

- 项目地址：[npmmirror 中国镜像站](https://npmmirror.com/)

安装`cnpm`替换 npm（npm 由于源服务器在国外，下载包的速度较慢，cnpm 会使用国内镜像）：

```bash
$ npm install -g cnpm --registry=https://registry.npmmirror.com
```

以后我们就可以通过 cnpm 命令去安装一个包。举例如下：

```bash
# 安装 vue 这个包
cnpm install vue
```

这里的单词 `install` 可以简写成 `i`。

### 04 什么是 npm 脚本

> npm 允许在`package.json`文件里面，使用`scripts`字段定义脚本命令。`package.json` 里面的`scripts` 字段是一个对象。它的每一个属性，对应一段脚本。定义在`package.json`里面的脚本，就称为 `npm` 脚本。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

#### 4.1 使用

- `npm run` 脚本名称
- 如果是并行执行（即同时的平行执行），可以使用&符号。 `npm run script1.js & npm run script2.js`
- 如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。`npm run script1.js && npm run script2.js`

#### 4.2 简写形式

- `npm start` 即 `npm run start`
- `npm stop` 即 `npm run stop`
- `npm test` 即 `npm run test`
- `npm restart` 即 `npm run stop && npm run restart && npm run start`

### 05 pnpm

#### 5.1 pnpm 是什么

> pnpm是 Node.js 的替代包管理器。它是 npm 的直接替代品，但速度更快、效率更高。

> 为什么效率更高？当您安装软件包时，我们会将其保存在您机器上的全局存储中，然后我们会从中创建一个硬链接，而不是进行复制。对于模块的每个版本，磁盘上只保留一个副本。例如，当使用 npm 或 yarn 时，如果您有 100 个使用 lodash 的包，则磁盘上将有 100 个 lodash 副本。pnpm 可让您节省数 GB 的磁盘空间！

pnpm优势
pnpm 拥有 Yarn 超过 npm 的所有附加功能：

- **安全**: 与 yarn 一样，pnpm 有一个包含所有已安装包校验和的特殊文件，用于在执行代码之前验证每个已安装包的完整性。
- **离线模式**: pnpm 将所有下载的包 tarball 保存在本地注册表镜像中。当包在本地可用时，它从不发出请求。使用该--offline参数可以完全禁止 HTTP 请求。
- **速度**: pnpm 不仅比 npm 快，而且比 yarn 快。无论是冷缓存还是热缓存，它都比 yarn 快。yarn 从缓存中复制文件，而 pnpm 只是从全局存储中链接它们。

#### 5.2 pnpm 的使用

**官网**： `https://pnpm.js.org/installation/`

**全局安装**

```bash
npm install pnpm -g
```

**设置源**

```bash
//查看源
pnpm config get registry 
//切换淘宝源
pnpm config set registry https://registry.npmmirror.com/
```

**使用**

```bash
//可以和npm一样使用方式

pnpm init //直接初始化
pnpm install 包  // 
pnpm i 包
pnpm add 包    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装
```

**移除**

```bash
pnpm remove(uninstall) 包                            //移除包
pnpm remove 包 --global                   //移除全局包
```

**更新**

```bash
pnpm up                //更新所有依赖项
pnpm upgrade 包        //更新包
pnpm upgrade 包 --global   //更新全局包
pnpm up --latest //最新更新所有依赖项，忽略package.json中指定的范围
```

### 06 npm命令总结

```bash
1.npm init -y 添加初始化文件记录安装信息，如果在后面加-S或者-D会自动创建该文件

2.npm install 包名 –g  （uninstall,update）

3.npm install 包名 --save（-S） --dev(-D)  (uninstall,update)
如果不写后缀默认是安装到生产环境
如果先装到了开发环境，那么后面覆盖安装不写后缀也是本身的环境下
一个包只能存在在一种环境，得先卸载才能换环境

4.npm list -g (不加-g，列举当前目录下的安装包)

5.npm info 包名（详细信息） npm info 包名 version (获取最新版本)

6.npm install md5@1.8.0（安装指定版本）

7.npm outdated(检查包是否已经过时)
如果版本比较新就不会有输出

8.pwd输出当前目录的绝对路径

9.npm view 包名 version查看当前版本   npm view 包名 versions查看该包所有版本

10.npm update 包名 更新指定包 npm update 更新所有的包（pnpm up）

11.npm config list  查看npm配置信息

12.npm 指定命令 --help 查看指定命令的帮助。

13.npm root：查看当前包的安装路径。  npm root -g：查看全局的包的安装路径。

14.npm ls 包名：查看本地安装的指定包及版本信息，没有显示empty。 npm ls 包名 -g：查看全局安装的指定包及版本信息

15.npm cache clean --force 清除缓存

16.npm -v查看npm的版本

"dependencies": {    "md5": "^2.1.0"  }  ^ 表示 如果 直接npm install 将会 安md5@2.*.*  	最新版本
"dependencies": {    "md5": "~2.1.0"  }  ~ 表示 如果 直接npm install 将会 安装md5 2.1.*  最新版本
"dependencies": {    "md5": "*"  }  * 表示 如果 直接npm install 将会 安装 md5  最新版本
```

### 07 使用 nodemon 自动重启服务

我们在开发的过程中，每次改完代码之后都必须重启服务器，显然这样的操作效率是比较低，这里给大家推荐个工具，`nodemon`,`nodemon`可以帮我们实时监听项目中代码的变化，并且自动重启服务，而且配置简单。

1. 安装：`npm install -g nodemon`

   > 如果无法使用nodemon，那么要去环境变量中进行配置

2. 使用`nodemon`运行项目，取代之前的`node app.js`。

```
nodemon  app.js
```

项目运行之后，`nodemon`会自动监听代码的改动，并且重新启动服务，大大增加我们开发效率。

3. `nodemon`常见配置

- 在命令行指定应用的端口号：`nodemon ./server.js localhost 8080`
- 查看帮助，帮助里面有很多选项都是一目了然：`nodemon -h 或者 nodemon --help`
- 运行 debug 模式：`nodemon --debug ./server.js 80`
- 手动重启项目： `Nodemon` 命令运行的终端 窗口中输入 `rs` 两个字符，然后再按下回车键，就能手动重启 `Nodemon`了。

# d5 http协议

### 01 网络基础

##### 什么是 HTTP 协议

HTTP协议 ：Hyper Text Transfer Protocol（超文本传输协议）,是用于从万维网（WWW:World Wide Web）服务器传输超文本到本地浏览器的传送协议。是互联网上应用最为广泛的一种网络协议。所有的WWW文件都必须遵守这个标准。

HTTP是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）。

> 网络的服务器基于请求和响应的

https:// lilichao.com/hello/index.html

-    `https:// `  协议名http ftp ...

-    `lilichao.com`   域名domain
-    `/hello/index.html`  网站资源路径

> 整个网络中存在着无数个服务器，每一个服务器都有它自己的唯一标识，这个标识被称为 ip地址192.168.1.17，但是ip地址不方便记忆，域名就相当于是ip地址的别名

##### 当在浏览器中输入地址以后发生了什么？

> Url解析-缓存检查-DNS解析-TCP三次握手-数据传输-四次挥手-页面渲染

① Url解析、缓存检查、DNS解析，获取网站的ip地址
② 浏览器需要和服务器建立连接（tcp/ip）（三次握手）
③ 向服务器发送请求（http协议）
④ 服务器处理请求，并返回响应（http协议）
⑤ 浏览器将响应的页面渲染
⑥ 断开和服务器的连接（四次挥手）

##### 客户端如何和服务器建立（断开）连接(三次握手和四次挥手）

**三次握手（客户端和服务器建立连接的过程）**

1. 客户端向服务器发送连接请求
          SYN（申请）
2. 服务器收到连接请求，向客户端返回消息
          SYN ACK （同意且也申请和客户端建立连接）
3. 客户端向服务器发送同意连接的信息
          ACK（同意）

**四次挥手（断开连接）**

1. 客户端向服务器发送请求，通过之服务器数据发送完毕，请求断开连接
   	FIN（finally）

2. 服务器向客户端返回数据，知道了（但是数据还没收完）

   ​        ACK

3. 服务器向客户端返回数据，收完了，可以断开连接
   ​        FIN ACK

4. 客户端向服务器发数据，可以断开了
   ​         ACK（同意断开）

> 请求报文和响应报文实际上就是一段数据，只是这段数据需要遵循一个特殊的格式，这个特殊的格式由HTTP协议来规定。

> 为什么握手三次，挥手四次：服务器收到请求报文后，可以直接发送SYN+ACK报文，但是关闭连接时，当服务器收到FIN报文时，很可能还不能理解关闭连接，所以只能先恢复一个ACK报文，告诉客户端我收到了，等到服务器端所有的报文都发送完了才能发送FIN报文，不然不能即时应答，因此需要四次。

### 02 TCP/IP 协议族

TCP/IP协议族中包含了一组协议，这组协议规定了互联网中所有的通信的细节。

#### TCP/IP 五层网络模型

- ​        应用层（软件的层面，浏览器 服务器都属于应用层）
- ​        传输层（负责对数据进行拆分，把大数据拆分为一个一个小包）
- ​        网络层（负责给数据包，添加信息）
- ​        数据链路层（传输信息）
- ​        物理层（定义物理设备如何传输数据）

HTTP协议就是应用层的协议，用来规定客户端和服务器间通信的报文格式的

#### 报文（message）

浏览器和服务器之间通信是基于请求和响应的
- 浏览器向服务器发送请求（request）

    > 浏览器向服务器发送请求相当于浏览器给服务器写信

- 服务器向浏览器返回响应（response）

    > 服务器向浏览器返回响应，相当于服务器给浏览器回信
    >
    > 这个信在HTTP协议中就被称为报文

- HTTP协议就是对这个报文的格式进行规定

**服务器一个服务器的主要功能：**

1. 可以接收到浏览器发送的请求报文
2. 可以向浏览器返回响应报文

##### 请求报文（request）

客户端发送给服务器的报文称为请求报文

请求报文的格式如下：

- 请求首行

- 请求头
- 空行
- 请求体

###### 请求首行

请求首行就是请求报文的第一行
GET /index.html?username=sunwukong HTTP/1.1

- 第一部分 get 表示请求的方式，get表示发送的是get请求

  > 现在常用的方式就是get和post请求：
  >
  > ​	get请求主要用来向服务器请求资源
  >
  > ​	post请求主要用来向服务器发送数据

- 第二部分 /index.html?username=sunwukong 表示请求资源的路径，? 后边的内容叫做查询字符串

  1. 查询字符串是一个名值对结构，一个名字对应一个值

  ​            使用=连接，多个名值对之间使用&分割

  ​            username=admin&password=123123

  2. get请求通过查询字符串将数据发送给服务器

​            		由于查询字符串会在浏览器地址栏中直接显示，所以，它安全性较差

​           	 	同时，由于url地址长度有限制，所以get请求无法发送较大的数据

​		   3. post请求通过请求体来发送数据在chrome中通过 载荷 可以查看

​					请求体发送数据，无法在地址栏直接查看，所以安全性较好

​					请求体的大小没有限制，可以发送任意大小的数据

​			如果你需要向服务器发送数据，能用post尽量使用post

- 第三部分  HTTP/1.1 协议的版本

###### 请求头

请求头也是名值对结构，用来告诉服务器我们浏览器的信息

每一个请求头都有它的作用：

- Accept 浏览器可以接受的文件类型
- Accept-Encoding 浏览器允许的压缩的编码
- Accept-language 语言 zh-CN，zh；
- User-Agent 用户代理，它是一段用来描述浏览器信息的字符串（识别浏览器）

###### 空行

- 用来分隔请求头和请求体

###### 请求体

- post请求通过请求体来发送数据

##### 响应报文

网页、css、 js、图片这些资源会作为响应报文中的哪一部分发送

- 响应首行
- 响应头
- 空行
- 响应体

###### 响应首行

HTTP/1.1 200 OK

- ​         200 响应状态码

- ​         ok 对响应状态码的描述

  > 响应状态码的规则：
  >
  > 1xx 请求处理中
  > 2xx 表示成功
  > 3xx 表示请求的重定向
  > 4xx 表示客户端错误
  > 5xx 表示服务器的错误

###### 响应头

响应头也是一个一个的名值对结构，用来告诉浏览器响应的信息

- Content-type 用来描述响应体的类型

- Content-Length 用来描述响应体大小

Content-Type: text/html; charset=UTF-8
Content-Length: 2017

###### 空行

空行用来分隔响应头和响应体

###### 响应体

响应体就是服务器返回给客户端的内容

### 03 Nginx 代理

#### 1. Nginx 安装与基础代理

Nginx 可以设置多个 server 服务，每个服务的 `.conf` 配置文件都在不同目录，只要在基础目录 `/etc/nginx/nginx.conf` 中使用 `include` 引入即可。

先配置好本地地址映射，修改 windows下的 host 文件即可。

```txt
127.0.0.1 test.com
127.0.0.1 a.test.com
127.0.0.1 b.test.com
127.0.0.1 localhost
::1 localhost
```

例如，在基本配置文件 `/etc/nginx/nginx.conf`：

> 注意不同版本 nginx 的配置文件可能不同，这里是 `nginx 1.8`。

```nginx
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*;
```

然后配置 `/etc/nginx/conf.d/servers.conf` 文件：

```nginx
server {
  listen 8081;
  server_name test.com;
  location / {
    #root /mnt/d/nginx;
    #index index.html;
    #autoindex on;
    proxy_pass http://localhost:8888; # 设置代理
  }
}
```

配置以上代理后： 启动 nginx 服务 `sudo service nginx start`，启动 `nodejs` 服务.

访问 `http:test.com:8081` => 网页指向 `http://localhost:8888`，浏览器地址显示 `http:test.com:8081`。

配置代理后，被代理的服务端返回的 `request.header.host` 为这个被代理的 `host`，这显然不是我们想要的。

```js
console.log(`request come: ${req.headers.host}`)
// http://localhost:8888
```

xxxxxxxxxx <body>    <button id="btn01">点我一下</button>​    <button id="btn02">取消</button>    <button id="btn03">按钮3号</button>    <script>        // 获取按钮        const btn01 = document.getElementById("btn01")        const btn02 = document.getElementById("btn02")        const btn03 = document.getElementById("btn03")​        let controller​        btn01.onclick = () => {            // 创建一个AbortController            controller = new AbortController()            // setTimeout(()=>{            //     controller.abort()            // }, 3000)​            // 终止请求            // 点击按钮向test发送请求            fetch("http://localhost:3000/test", {                signal: controller.signal            })                .then((res) => console.log(res))                .catch((err) => console.log("出错了", err))        }​        btn02.onclick = () => {            controller && controller.abort()        }​        btn03.onclick = async () => {            // fetch("http://localhost:3000/test").then()...            // 注意：将promise改写为await时，一定要写try-catch​            try {                const res = await fetch("http://localhost:3000/students")                const data = await res.json()                console.log(data)            } catch (e) {                console.log("出错了", e)            }        }    </script></body>js

修改：

```nginx
proxy_set_header HOST $host; # 使显示的 host 为最初发起请求的地址。
```

这个例子说明，httpp 的所有明文传输的信息都能被代理修改！以上举例是 **反向代理**。

更多 nginx 配置，自行查文档。

#### 2. 代理缓存

Nginx 代理缓存的作用：多个不同浏览器的不同用户访问同一个资源的时候，可以共用同一个缓存。也就是说，只要一个用户在请求了一个资源后，其他用户可直接使用该代理服务器上的缓存。

`Cache-Control` 的值 `s-maxage` 的作用：覆盖 `max-age` 或者 `Expires` 头，但是仅适用于 **共享缓存**（比如各个代理），私有缓存会忽略它。设置了 `s-maxage=<seconds>` 后，表示代理缓存的有效期。

主服务器响应头的配置：

```js
resp.writeHead(200, {
  'Cache-Control': 'max-age=10, s-maxage=30'
})
```

Nginx 配置代理缓存：

```nginx
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;
server {
  listen 8081;
  server_name test.com;

  location / {
    proxy_cache my_cache;
    proxy_pass http://localhost:8888;
    proxy_set_header HOST $host;
  }
}
```

当我们不需要使用代理缓存的时候，可以使用 `private`，使得代理服务器无法缓存我们的数据，只允许私有缓存。

不允许代理服务器缓存，只允许私有缓存（浏览器/客户端）：

```js
resp.writeHead(200, {
  'Cache-Control': 'max-age=10, s-maxage=30, private'
})
```

#### 3. Vary

##### 定义

`Vary` 是一个HTTP响应头部信息，它决定了对于未来的一个请求头，应该用一个缓存的回复(response)还是向源服务器请求一个新的回复。它被服务器用来表明在 **数据协商** 中选择一个资源代表的时候应该使用哪些头部信息（headers）。

一句话概括它的工作原理就是，就是它表示某个响应因某个响应头部而不同。指定 `*` 为它的值，这样等价于将资源视为唯一，并不进行缓存，但这并不是最佳实践，因此不建议这么做。

语法：

```
Vary: <header-name>, <header-name>, ...
Vary: *
```

例如，主服务端响应头添加自定义 header：`X-Test-Cache`，然后添加到 `Vary` 中。

```js
resp.writeHead(200, {
  'Cache-Control': 's-maxage=30',
  'Vary': 'X-Test-Cache'
})
```

浏览器使用 `fetch` 发起请求，每次都给 `X-Test-Cache` 赋予不同的值 `Date.now()`。

```js
fetch('http://test.com:8081/data', {
  method: 'GET',
  headers: {
    'X-Test-Cache': Date.now()
  }
}).then(res => res.text())
  .then(data => {
    document.querySelector('#data-show').innerHTML = data
  })
```

每次 `X-Test-Cache` 的值都不一样，那么每次请求所使用的缓存都不一样，这就导致每次都要向服务器发起请求，因此 `s-maxage=30` 失效。当把 `X-Test-Cache` 设置为固定值例如 `1`，每次请求的 `X-Test-Cache` 都一样，那么使用的都是同一份缓存。

##### 应用

`Vary` 应用场景：

- 对于 `User-Agent` 头部信息，例如你 **提供给移动端的内容是不同的，可用防止你客户端误使用了用于桌面端的缓存，从而各取所需**。
- 对于 `Content-Language` 实体头部，同一个网站的中英文版本所需要的缓存可能是不同的。

建议阅读：

- [知乎 - 30 分钟 HTTP 查漏补缺之 Vary](https://zhuanlan.zhihu.com/p/47049060)
- [MDN -Vary](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/vary)

#### 4. HTTP2

HTTP2 主要的新特性：

- 信道复用
- 分帧传输
- Server Push

 PREVIOUS

# d6 express

## 01 express基本使用

> https://www.expressjs.com.cn/

基于 Node.js 平台，快速、开放、极简的 web 开发框架。

### A express的安装方式

Express的安装可直接使用npm包管理器上的项目，在安装npm之前可先安装淘宝镜像：

```bash
npm config set registry https://registry.npmmirror.com/
```

这样我们使用cnpm的来代替npm，这使得下载速度提高很多；其次你需要在你项目目录下运行以下指令来初始化npm，期间所有提示按enter键即可，这会生成package.json，它是用于描述项目文件的。

```
npm init
```

再输入

```
npm install
```

这下项目目录中又会多出一个叫node_modules文件夹，里面是node.js为我们提供的模块，当然现在没有。接下来便是真正的安装express了，执行：

```
npm install express --save
```

这时，我们看到node_modules文件夹多了许多不同版本的应用文件夹，接下来执行

```
express --version
```

查看express是否安装成功，如果显示版本号，则安装正确。

### B 运行原理（路由、中间件）

**底层：http模块**

> Express框架建立在node.js内置的http模块上。http模块生成服务器的原始代码如下

```javascript
var http = require("http");
var app = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
});
app.listen(3000, "localhost");
```

> Express框架的核心是对http模块的再包装。上面的代码用Express改写如下

```javascript
//引入express
var express = require('express');
//获取服务器实例
var app = express();
//启动服务器 app.listen(端口号)
app.listen(3000，() =>{
    console.log("启动")
});
//服务器启动后就可以通过端口访问
// 协议名://ip地址:端口号/路径
// http://localhost:3000
// http://127.0.0.1:3000

// 如果希望服务器可以正常访问，则需要为服务器设置路由，路由可以根据不同的请求方式和请求地址来处理用户的请求
// app.METHOD(...)
// METHOD 可以是 get 或 post ...

// 路由的回调函数执行时，会接收到三个参数，第一个request 第二个response
app.get('/', function (req, res) {  // '/'表示根目录
  res.send('Hello world!');
});
/*
在路由中，应该做两件事
1. 读取用户的请求（request）
    req 表示的是用户的请求信息，通过req可以获取用户传递数据
    console.log(req.url)
2. 根据用户的请求返回响应（response）
    res 表示的服务器发送给客户端的响应信息
    可以通过res来向客户端返回数据
    res.sendStatus(404)  //sendStatus() 向客户端发送响应状态吗
    res.status(200)  //status() 用来设置响应状态吗，但是并不发送
    res.send("<h1>这是我的第一个服务器</h1>")  //send() 设置并发送响应体
*/
```

> Express框架等于在http模块之上，加了一个中间件（比如权限验证）
>
> - 简单说，中间件（middleware）就是处理HTTP请求的函数。它最大的特点就是，一个中间件处理完，再传递给下一个中间件。App实例在运行过程中，会调用一系列的中间件。
> - 每个中间件可以从App实例，接收三个参数，依次为request对象（代表HTTP请求）、response对象（代表HTTP回应），next回调函数（代表下一个中间件）。每个中间件都可以对HTTP请求（request对象）进行加工，并且决定是否调用next方法，将request对象再传给下一个中间件。

```javascript
// 一个不进行任何操作、只传递`request`对象的中间件，就是下面这样：
function uselessMiddleware(req, res, next) {
  next();
}
// 上面代码的next就是下一个中间件。如果它带有参数，则代表抛出一个错误，参数为错误文本
// 抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止
function uselessMiddleware(req, res, next) {
  next('出错了！');
}
```

```js
// 在express我们使用app.use来定义一个中间件
// 中间件作用和路由很像，用法很像
// 但是路由不区分请求的方式，只看路径

// next() 是回调函数的第三个参数，它是一个函数，调用函数后，可以触发后续的中间件
// next() 不能在响应处理完毕后调用
// 路径不写 默认根目录
app.use((req, res, next) => {
    console.log("111", Date.now())
    // res.send("<h1>111</h1>")
    next() // 放行，我不管了~~
    // res.send调完之后 请求和响应已经完事了 再调用next没意义
})

app.use((req, res, next) => {
    console.log("222", Date.now())
    // res.send("<h1>222</h1>")
    next()
})

app.use((req, res) => {
    console.log("333", Date.now())
    res.send("<h1>333</h1>")
})

```

> 和路由的区别
>
> ​      1.会匹配所有请求
>
> ​      2.路径设置父目录（）

### C nodemon

```js
/* 
    目前，服务器代码修改后必须要重启，
        我们希望有一种方式，可以自动监视代码的修改
        代码修改以后可以自动重启服务器

    要实现这个功能，我们需要安装一个模块 nodemon
        使用方式：
            1. 全局安装
                npm i nodemon -g
                yarn global add nodemon
                    - 同yarn进行全局安装时，默认yarn的目录并不在环境变量中
                    - 需要手动将路径添加到环境变量中
                - 启动：
                    nodemon  // 运行index.js
                    nodemon xxx // 运行指定的js

            2. 在项目中安装
                npm i nodemon -D
                yarn add nodemon -D

                - 启动
                    npx nodemon
                    
                - 写到package.json  
                "scripts": {
   					"start": "npx nodemon index.js"
  								}

*/
```

### D 获取参数

#### .1 req.query

req.query()可以用来获取接口请求中拼接在链接"?"后边的参数，主要用于get请求，post请求也适用。
req.query()被express原生支持，并且会自动将参数转换为对象形式返回。
请求：

```bash
http://localhost:5050/server?p=user&q=password
```

express接口:

```js
let express = require('express')
let server = express()
server.get('/server',(req,resp)=>{
    console.log(req.query);
    resp.send('')
})
server.listen(5050,()=>{
    console.log('服务器已就绪')
})
```

请求后得到的结果：

![image-20221103202150243](https://i0.hdslb.com/bfs/album/75af32b9b18f18c515720fea9909e2ee9e98123c.png)

#### .2 req.params

req.params()有些特殊，它适用于在url链接上传递数据参数，需要后台接口用==:变量名==的写法发起请求。

请求：

```bash
http://localhost:5050/nums/1000
```

express接口：

```js
let express = require('express')
let server = express();
server.get('/nums/:num', (req, resp) => {
  console.log(req.params);
  resp.send('')
})
server.listen(5050, () =>{
	 console.log('服务器已就绪')
})
```

请求后得到的结果：

![image-20221103202245942](https://i0.hdslb.com/bfs/album/77d61a1ac0f8b8d16d34540bcf02f7bff28989c6.png)

#### .3 req.body

req.body()被原生express所支持,可以直接使用req.body()获取post请求的表单数据。

请求:

```js
fecth('http://localhost:5050/people',{
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body:{name: 'zhangsan', age: 15}
})
```

express接口：

```js
const express = require('express');
const server = express();
//配置解析post参数的-不用下载第三方 ,内置
//解析post参数-(url-ky格式) username=kerwin&password=1234
// app.use(express.urlencoded({ extended: false }));
//解析post参数-(json字符串) {name:"",age:100}
app.use(express.json());
server.post('/people', (req, resp) => {
  console.log(req.body);
  resp.send('')
})
server.listen(5050, () => console.log('服务器已就绪'))

```

![image-20221103202743889](https://i0.hdslb.com/bfs/album/25cbb7ad14c21077add671c586e0f18f4a6c61b8.png)

### E response对象

| 方法                                                         | 描述                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------ |
| [res.download()](http://www.expressjs.com.cn/en/4x/api.html#res.download) | 提示要下载的文件。                                     |
| [res.end（）](http://www.expressjs.com.cn/en/4x/api.html#res.end) | 结束响应过程。                                         |
| [res.json（）](http://www.expressjs.com.cn/en/4x/api.html#res.json) | 发送JSON响应。                                         |
| [res.jsonp（）](http://www.expressjs.com.cn/en/4x/api.html#res.jsonp) | 发送带有JSONP支持的JSON响应。                          |
| [res.redirect（）](http://www.expressjs.com.cn/en/4x/api.html#res.redirect) | 重定向请求。                                           |
| [res.render（）](http://www.expressjs.com.cn/en/4x/api.html#res.render) | 渲染视图模板。                                         |
| [res.send（）](http://www.expressjs.com.cn/en/4x/api.html#res.send) | 发送各种类型的响应。                                   |
| [res.sendFile（）](http://www.expressjs.com.cn/en/4x/api.html#res.sendFile) | 将文件作为八位字节流发送。                             |
| [res.sendStatus（）](http://www.expressjs.com.cn/en/4x/api.html#res.sendStatus) | 设置响应状态代码，并将其字符串表示形式发送为响应正文。 |

例：

**（1）response.redirect方法**

> response.redirect方法允许网址的重定向

```javascript
response.redirect("/hello/anime");
response.redirect("http://www.example.com");
response.redirect(301, "http://www.example.com"); 
```

**（2）response.sendFile方法**

> response.sendFile方法用于发送文件

```javascript
response.sendFile("/path/to/anime.mp4");
```

**（3）response.render方法**

> response.render方法用于渲染网页模板。

```js
//  使用render方法，将message变量传入index模板，渲染成HTML网页
app.get("/", function(request, response) {
  response.render("index", { message: "Hello World" });
});
```

### F 路线处理程序

您可以提供行为类似于[中间件的](http://www.expressjs.com.cn/en/guide/using-middleware.html)多个回调函数来处理请求。唯一的例外是这些回调可能会调用`next('route')`以绕过其余的路由回调。您可以使用此机制在路由上施加先决条件，然后在没有理由继续使用当前路由的情况下将控制权传递给后续路由。

多个回调函数可以处理一条路由（确保指定了`next`对象）。例如：

```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```

混合使用函数和函数数组处理路由：

```js
const fun1 = (req, res, next) => {
  // 验证用户token过期, cookie过期
  console.log('token验证');
  let isValid = true;
  if (isValid) {
    next();
  } else {
    //将第一个中间件的数据传输到第二个中间件
    res.name = "dselegent";
    res.send('error');
  }
};
const fun2 = (req, res) => {
   console.log(res.name)
  res.send('home');
};
app.get('/home', [fun1, fun2]);

app.get('/list', fun1, (req, res) => {
  res.send('list');
});
```



## 02 路由

#### **1 Express路由简介**

路由表示应用程序端点 (URI) 的定义以及响应客户端请求的方式。它包含一个请求方时（methods）、路径（path）和路由匹配时的函数（callback）;

```js
app.methods(path, callback);
```

#### **2 Express路由方法**

Express方法源于 HTTP 方法之一，附加到 express 类的实例。它可请求的方法包括：

get、post、put、head、delete、options、trace、copy、lock、mkcol、move、purge、propfind、proppatch、unlock、report、mkactivity、checkout、merge、m-search、notify、subscribe、unsubscribe、patch、search 和 connect。

> 路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。
>
> 路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： app.METHOD(path, [callback...], callback)， app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。

下面是一个基本的路由示例：

```js
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  //写完一个send，后面所有跟路由有关的都不会执行
  //会自动响应对应的数据类型
  //   res.send([1, 2, 3]);
  //   res.send({ ok: 1 });
  //   res.json({ ok: 1 });
   // 使用混合使用函数数组处理时如果前面有res.send();那么后面和路由处理相关代码都不生效
  res.send('hello world');
  res.send(`
        <html>
            <h1>hello world</h2>
        </html>
    `);
});
```

路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

#### **3 all方法和HTTP动词方法**

> 针对不同的请求，Express提供了use方法的一些别名。比如，上面代码也可以用别名的形式来写

```javascript
var express = require("express");
var http = require("http");
var app = express();

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

app.get("*", function(request, response) {
  response.end("404!");
});

http.createServer(app).listen(1337);
```

> - 上面代码的all方法表示，所有请求都必须通过该中间件，参数中的“*”表示对所有路径有效。get方法则是只有GET动词的HTTP请求通过该中间件，它的第一个参数是请求的路径。由于get方法的回调函数没有调用next方法，所以只要有一个中间件被调用了，后面的中间件就不会再被调用了
> - 除了get方法以外，Express还提供post、put、delete方法，即HTTP动词都是Express的方法
>
> - 除了get方法以外，Express还提供post、put、delete方法，即HTTP动词都是Express的方法
> - 这些方法的第一个参数，都是请求的路径。除了绝对匹配以外，Express允许模式匹配
>

```javascript
app.get("/hello/:who", function(req, res) {
  res.end("Hello, " + req.params.who + ".");
});
```

#### 4 路径匹配

##### 字符串路径

```js
// 匹配根路径的请求
app.get('/', function (req, res) {
  res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
```

##### 字符串模式路径

使用字符串模式的路由路径示例：

```js
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
```

##### 正则表达式路径

使用正则表达式的路由路径示例：

```js
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
  res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```

可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

```js
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
```

使用多个回调函数处理路由（记得指定 next 对象）：

```js
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

使用回调函数数组处理路由：

```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

## 03 中间件

Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

中间件的功能包括：

- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件。

如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

Express 应用可使用如下几种中间件：

- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

使用可选则挂载路径，可在应用级别或路由级别装载中间件。另外，你还可以同时装在一系列中间件函数，从而在一个挂载点上创建一个子中间件栈。

#### .1 应用级中间件

应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。例如：

```js
var app = express()
const indexRouter = require('./route/indexRouter');
const LoginRouter = require('./route/LoginRouter');

//应用级别(后面的路由都会执行此中间件)
app.use((req, res, next) => {
  // 验证用户token过期, cookie过期
  console.log('token验证');
  let isValid = true;
  if (isValid) {
    next();
  } else {
    res.send('error');
  }
});

//应用级别(这里不写路径默认/)
//这些use方法是每次访问都是从上往下执行
//如果是/login/a,会先找到/login开头的这个应用级中间件
//然后再进入这个中间件找/a
app.use(indexRouter);
app.use('/login', LoginRouter);

```

#### .2 路由级中间件

##### .2.1 app.route()

您可以使用来为路由路径创建可链接的路由处理程序`app.route()`。由于路径是在单个位置指定的，因此创建模块化路由非常有帮助，减少冗余和错别字也很有帮助。有关路由的更多信息，请参见：[Router（）文档](http://www.expressjs.com.cn/en/4x/api.html#router)。

这是使用定义的链式路由处理程序的示例`app.route()`。

```js
app.route('/book')
  .get(function (req, res) {
    res.send(' Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

##### .2.2 快速路由器

路由级中间件和应用级中间件一样，只是它绑定的对象为 `express.Router()`。

使用`express.Router`该类创建模块化的，可安装的路由处理程序。一个`Router`实例是一个完整的中间件和路由系统; 因此，它通常被称为“迷你应用程序”。

以下示例将路由器创建为模块，在其中加载中间件功能，定义一些路由，并将路由器模块安装在主应用程序的路径上。

`home.js`在app目录中创建一个名为以下内容的路由器文件：

```js
var router = express.Router()
```

```js
var app = express()
var router = express.Router()

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route')
  // 负责将控制权交给栈中下一个中间件
  else next() //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular')
})

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

module.exports=  router
```

然后，在应用程序中加载路由器模块：

```js
var indexRouter = require('./home')
// ...
app.use('/home', index)
```

该应用程序现在将能够处理对`/home`和的请求`/home/user/123456`

##### .2.3 router.route方法

> router实例对象的route方法，可以接受访问路径作为参数

```javascript
var router = express.Router();

router.route('/api')
	.post(function(req, res) {
		// ...
	})
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err) res.send(err);
			res.json(bears);
		});
	});

module.exports=  router
```

#### .3 错误处理中间件

错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。

```js
//上面的中间件都没有匹配就会走这里
app.use(function(err, req, res, next) {
  console.error(err.stack)
     //send的状态码默认是200
  res.status(500).send('error')
})
```

#### .4 内置的中间件

express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。每个应用可有多个静态目录。

```js
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('files'))
```

#### .5 第三方中间件

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser

```js
$ npm install cookie-parser
```

```js
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')const express = require("express")
const path = require("path")
// 创建服务器的实例
const app = express()
// use() 中间件
/* 
    服务器中的代码，对于外部来说都是不可见的，
        所以我们写的html页面，浏览器无法直接访问
        如果希望浏览器可以访问，则需要将页面所在的目录设置静态资源目录
*/

// 设置static中间件后，浏览器访问时，会自动去public目录寻找是否有匹配的静态资源
app.use(express.static(path.resolve(__dirname, "./public")))
// 中间件和路由的顺序是  先匹配上面的 所以静态资源这里把中间件写前面
// 配置路由
app.get("/", (req, res) => {
    /* 
        希望用户返回根目录时，可以给用户返回一个网页
    */
    res.send("怎么办呢？")  

    // res.send(`
    // <!doctype html>
    // <html>
    //     <head>
    //         <meta charset="utf-8">
    //         <title>这是一个网页</title>
    //     </head>
    //     <body>
    //         <h1>这是网页的标题</h1>
    //     </body>
    // </html>
    // `)
})


// 加载用于解析 cookie 的中间件
app.use(cookieParser())
```

## 04 静态资源和查询字符串

利用 Express 托管静态文件

```js
const express = require("express")
const path = require("path")
// 创建服务器的实例
const app = express()
// use() 中间件
/* 
    服务器中的代码，对于外部来说都是不可见的，
        所以我们写的html页面，浏览器无法直接访问
        如果希望浏览器可以访问，则需要将页面所在的目录设置静态资源目录
*/

// 设置static中间件后，浏览器访问时，会自动去public目录寻找是否有匹配的静态资源
app.use(express.static(path.resolve(__dirname, "./public")))
// 中间件和路由的顺序是  先匹配上面的 所以静态资源这里把中间件写前面
// 配置路由
app.get("/", (req, res) => {
    /* 
        希望用户返回根目录时，可以给用户返回一个网页
    */
    res.send("怎么办呢？")  

    // res.send(`
    // <!doctype html>
    // <html>
    //     <head>
    //         <meta charset="utf-8">
    //         <title>这是一个网页</title>
    //     </head>
    //     <body>
    //         <h1>这是网页的标题</h1>
    //     </body>
    // </html>
    // `)
})

```

通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

```js
//直接将public里的index.html当成/的网页
app.use(express.static('public'))
```

现在，public 目录下面的文件就可以访问了。

```js
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

> 所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。

如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。

如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：

```js
app.use('/static', express.static('public'))
```

现在，你就可以通过带有 “/static” 前缀的地址来访问 public 目录下面的文件了。

```tex
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

**总结**

```js
app.use(express.static('public'))
<link rel="stylesheet" href="/css/index.css" />
    
app.use('/static', express.static('public'))
<link rel="stylesheet" href="/static/css/index.css" />
```

- 简易登录功能


```js
//html
<body>
        <h2>登录</h2>
        <form action="/login" method="get">
            <div>用户名 <input name="username" type="text" /></div>
            <div>密码 <input name="password" type="password" /></div>
            <div>
                <input type="submit" value="登录" />
            </div>
        </form>
        <hr />

        <h1>我是一个网页，一个静态网页</h1>
        <img src="./an.jpg" />
    </body>

//js
const express = require("express")
const path = require("path")
const app = express()
// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "./public")))
app.get("/login", (req, res) => {
    // 但是get 会明文发送
    // 获取到用户输入的用户名和密码
    // req.query 表示查询字符串中的请求参数
    // console.log(req.query.username)
    // console.log(req.query.password)
    console.log("请求已经收到~~")
    
    // 验证用户输入的用户名和密码是否正确
    if(req.query.username === "sunwukong" && req.query.password === "123123"){
        res.send("<h1>登录成功！</h1>")
    }else{
        res.send("<h1>用户名或密码错误！</h1>")
    }

})
```

## 05 请求体

表单优先使用post

#### get

```js
// 添加一个路由，可以读取get请求的参数
// /login -->  http://localhost:3000/login
app.get("/login", (req, res) => {
    // 获取用户发送的数据
    // 通过req.query来获取查询字符串中的数据（参数名值都得写）
    if (req.query.username === "admin" && req.query.password === "123123") {
        res.send("<h1>欢迎您回来！登录成功</h1>")
    } else {
        res.send("<h1>用户名或密码错误！</h1>")
    }
})

// get请求发送参数的第二种方式
// /hello/:id 表示当用户访问 /hello/xxx 时就会触发
// 在路径中以冒号命名的部分我们称为param，在get请求它可以被解析为请求参数
// param传参一般不会传递特别复杂的参数
// app.get("/hello/:name/:age/:gender", (req, res) => {
app.get("/hello/:name", (req, res) => {
    // 约定优于配置 直接传值
    // 可以通过req.params属性来获取这些参数
    console.log(req.params)
    res.send("<h1>这是hello路由</h1>")
})
```

#### post

```js
const express = require("express")
const app = express()
const path = require("path")
// 配置静态资源的路径
// public http://localhost:3000/
app.use(express.static(path.resolve(__dirname, "public")))
// 引入解析请求体的中间件
app.use(express.urlencoded())
app.post("/login", (req, res) => {
    // 通过req.body来获取post请求的参数（请求体中的参数）
    // 默认情况下express不会自动解析请求体，需要通过中间件来为其增加功能
    // console.log(req.body)
    const username = req.body.username
    const password = req.body.password

    if (username === "admin" && password === "123123") {
        res.send("<h1>登录成功</h1>")
    } else {
        res.send("<h1>登录失败</h1>")
    }
})
app.listen(3000, () => {
    console.log("服务器已经启动~")
})

```

- 简单实现：

```js
const express = require("express")
const app = express()
const path = require("path")
// 创建一个数组来存储用户信息 模拟数据库
const USERS = [
    {
        username: "admin",
        password: "123123",
        nickname: "超级管理员"
    },
    {
        username: "sunwukong",
        password: "123456",
        nickname: "齐天大圣"
    }
]

// 配置静态资源的路径
// public http://localhost:3000/
app.use(express.static(path.resolve(__dirname, "public")))
// 引入解析请求体的中间件
app.use(express.urlencoded())

app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // 获取到用户的用户名和密码后，需要根据用户名去用户的数组中查找用户
    // 1 采用for循环
    // for (const user of USERS) {
    //     if (user.username === username) {
    //         // 用户存在接着检查用户的密码
    //         if (user.password === password) {
    //             // 信息正确，登录成功
    //             res.send(`<h1>登录成功 ${user.nickname}</h1>`)
    //             return
    //         }
    //     }
    // }
    // res.send(`<h1>用户名或密码错误</h1>`)

    // 2 用数组中的find
    const loginUser = USERS.find((item) => {
        return item.username === username && item.password === password
    })

    if (loginUser) {
        res.send(`<h1>登录成功 ${loginUser.nickname}</h1>`)
    } else {
        res.send(`<h1>用户名或密码错误</h1>`)
    }
})

app.post("/register", (req, res) => {
    // 获取用户输入的数据
    // console.log(req.body)
    const {username, password, repwd, nickname} = req.body

    // console.log(username, password, repwd, nickname)
    // 验证这些数据是否正确，略... 
    // 只验证用户名是否存在
    const user = USERS.find(item => {
        return item.username === username || item.nickname === nickname
    })

    // console.log(user)
    if(!user){
        // 进入判断说明用户不存在，可以注册
        USERS.push({
            username,
            password,
            nickname
        })

        res.send("<h1>恭喜您！注册成功！</h1>")
    }else{
        res.send("<h1>用户名已存在！</h1>")
    }
})

app.listen(3000, () => {
    console.log("服务器已经启动~")
})
```

## 06 模板引擎（ejs）

```js
const express = require("express")
const path = require("path")
const app = express()

const STUDENT_ARR = [
    {
        name: "孙悟空",
        age: 18,
        gender: "男",
        address: "火锅山"
    },
    {
        name: "猪八戒",
        age: 28,
        gender: "男",
        address: "高老庄"
    },
    {
        name: "沙和尚",
        age: 38,
        gender: "男",
        address: "流沙河"
    }
]

let name = "猪八戒"

// 将ejs设置为默认的模板引擎
app.set("view engine", "ejs")
// 配置模板的路径
app.set("views", path.resolve(__dirname, "views"))

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")))
// 配置请求体解析
app.use(express.urlencoded({ extended: true }))

app.get("/hello", (req, res) => {
    res.send("hello")
})

app.get("/students", (req, res) => {
    // 希望用户在访问students路由时，可以给用户返回一个显示有学生信息的页面
    /* 
        html页面属于静态页面，创建的时候什么样子，用户看到的就是什么样子
            不会自动跟随服务器中数据的变化而变化

        希望有这么一个东西，他呢长的像是个网页，但是他里边可以嵌入变量，
            这个东西在node中被称为 模板

        在node中存在有很多个模板引擎，都各具特色，ejs，运行在服务器当中

        ejs是node中的一款模板引擎，使用步骤：
            1.安装ejs
            2.配置express的模板引擎为ejs
                app.set("view engine", "ejs")
            3.配置模板路径
                app.set("views", path.resolve(__dirname, "views"))

            注意，模板引擎需要被express渲染后才能使用
    */

    //  res.render() 用来渲染一个模板引擎，并将其返回给浏览器
    // 可以将一个对象作为render的第二个参数传递，这样在模板中可以访问到对象中的数据
    // res.render("students", { name: "孙悟空", age: 18, gender: "男" })
    // <%= %> 在ejs中输出内容时，它会自动对字符串中的特殊符号进行转义 &lt;
    //             这个设计主要是为了避免 xss 攻击
    // <%- %> 直接将内容输出
    // <% %>  可以在其中直接编写js代码，js代码会在服务器中执行
    // <%# %> 注释
    res.render("students", { name })
})

app.get("/set_name", (req, res) => {
    name = req.query.name
    res.send("修改成功")
})

// 可以在所有路由的后边配置错误路由
app.use((req, res) => {
    // 只要这个中间件一执行，说明上边的地址都没有匹配
    res.status(404)
    res.send("<h1>您访问的地址已被外星人劫持！</h1>")
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})

```

- 在ejs中显示、删除、修改学生信息

```js
// index.js
const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs/promises")

const STUDENT_ARR = require("./data/students.json")

// 将ejs设置为默认的模板引擎
app.set("view engine", "ejs")
// 配置模板的路径
app.set("views", path.resolve(__dirname, "views"))

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")))
// 配置请求体解析
app.use(express.urlencoded({ extended: true }))

app.get("/hello", (req, res) => {
    res.send("hello")
})

app.get("/students", (req, res) => {
    res.render("students", { stus: STUDENT_ARR })
})

// 创建一个添加学生信息的路由 点击添加按钮就转到这个路由
app.post("/add-student", (req, res) => {
    // 路由里要做什么？
    // 生成一个id  at是根据索引去数组里找【es13】 -1是最后一个
    const id = STUDENT_ARR.at(-1).id + 1
    // 1.获取用户填写的信息
    const newUser = {
        id,
        name: req.body.name,
        age: +req.body.age,   //传给服务器的都是字符串 隐式转换
        gender: req.body.gender,
        address: req.body.address
    }
    // 2. 验证用户信息（略）

    // 3. 将用户信息添加到数组中
    STUDENT_ARR.push(newUser)

    // 4. 返回响应
    // res.send("添加成功！")
    // 直接在添加路由中渲染ejs，会面临表单重复提交的问题
    // res.render("students", { stus: STUDENT_ARR })

    // 将新的数据写入到json文件中
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    ).then(()=>{
        // res.redirect() 用来发起请求重定向
        // 重定向的作用是告诉浏览器你向另外一个地址再发起一次请求
        res.redirect("/students")
    }).catch(()=>{
        // ....处理异常 略
    })  
})

/* 
    删除
        - 点击删除链接后，删除当前数据
        - 点击 白骨精 删除 --> 删除id为5的学生
        - 流程：
            1. 点击白骨精的删除链接
            2. 向路由发送请求（写一个路由）
            3. 路由怎么写？
                - 获取学生的id n
                - 删除id为n的学生
                - 将新的数组写入文件
                - 重定向到学生列表页面
*/
app.get("/delete", (req, res) => {
    // 获取要删除的学生的id
    const id = +req.query.id //学生id是number 查询字符串是字符串 隐式转换

    // 根据id删除学生
    // console.log(id) 
    // 过滤数组 把不符合条件的筛出去 
    STUDENT_ARR = STUDENT_ARR.filter((stu) => stu.id !== id)

    // 将新的数组写入到文件中
    // 将新的数据写入到json文件中
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    )
        .then(() => {
            // res.redirect() 用来发起请求重定向
            // 重定向的作用是告诉浏览器你向另外一个地址再发起一次请求

            res.redirect("/students")
        })
        .catch(() => {
            // ....
        })
})

/* 
    修改
        - 点击修改链接后，显示一个表单，表单中应该有要修改的学生的信息，
            用户对学生信息进行修改，修改以后点击按钮提交表单
        - 流程：
            1. 点击孙悟空的修改链接
            2. 跳转到一个路由
                - 这个路由会返回一个页面，页面中有一个表单，表单中应该显示孙悟空的各种信息
            3. 用户填写表单，点击按钮提交到一个新的路由
                - 获取学生信息，并对信息进行修改
*/
app.get("/to-update", (req, res) => {
    const id = +req.query.id
    // 获取要修改的学生的信息
    const student = STUDENT_ARR.find((item) => item.id === id)
    // 
    res.render("update", { student })
})

app.post("/update-student", (req, res) => {
    // 获取id
    // const id = req.query.id
    const { id, name, age, gender, address } = req.body
    // 修改学生信息
    // 根据学生id获取学生对象
    const student = STUDENT_ARR.find((item) => item.id == id)
    student.name = name
    student.age = +age
    student.gender = gender
    student.address = address
    // 将新的数据写入到json文件中 在重定向到这个界面
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    )
        .then(() => {
            // res.redirect() 用来发起请求重定向
            // 重定向的作用是告诉浏览器你向另外一个地址再发起一次请求
            res.redirect("/students")
        })
        .catch(() => {
            // ....
        })
})

// 可以在所有路由的后边配置错误路由
app.use((req, res) => {
    // 只要这个中间件一执行，说明上边的地址都没有匹配
    res.status(404)
    res.send("<h1>您访问的地址已被外星人劫持！</h1>")
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})

// student.js
    <body>
        <hr />
        <% if(stus && stus.length > 0) { %>
        <table>
            <caption>
                学生列表
            </caption>
            <thead>
                <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>性别</th>
                    <th>地址</th>
                    <th>操作</th>
                </tr>
            </thead>

            <tbody>
                <% for(const stu of stus){ %>
                <tr>
                    <td><%=stu.id%></td>
                    <td><%=stu.name %></td>
                    <td><%=stu.age %></td>
                    <td><%=stu.gender %></td>
                    <td><%=stu.address %></td>
                    <td>
                        <a
                            onclick="return confirm('确认删除吗？')"
                            href="/delete?id=<%=stu.id%>"
                            >删除</a>
                        <a href="/to-update?id=<%=stu.id%>">修改</a>
                    </td>
                </tr>
                <% }%>
            </tbody>
        </table>
        <%}else{%>
        <p>学生列表为空！</p>

        <%}%>

        <hr />

        <form action="/add-student" method="post">
            <div>姓名：<input type="text" name="name" /></div>
            <div>
                年龄：<input type="number" max="150" min="0" name="age" />
            </div>
            <div>
                性别：<input type="radio" name="gender" value="男" /> 男
                <input type="radio" name="gender" value="女" /> 女
            </div>
            <div>地址：<input type="text" name="address" /></div>
            <div>
                <button>添加</button>
            </div>
        </form>
    </body>
                
// update.js
    <body>
        <h1>修改学生信息</h1>
        //<form action="/update-student？id=<%>=student.id%>" method="post">        
        <form action="/update-student" method="post">
            <!-- hidden是一个隐藏的表单项，可以通过它传递一些不希望被用户看见的数据 -->
            <input type="hidden" name="id" value="<%=student.id%>" />
            <div>
                姓名：<input
                    type="text"
                    name="name"
                    value="<%=student.name%>"
                />
            </div>
            <div>
                年龄：<input
                    type="number"
                    max="150"
                    min="0"
                    name="age"
                    value="<%=student.age%>"
                />
            </div>

            <div>
                性别：
                <input type="radio" name="gender" value="男"
                <%=student.gender === "男" && "checked" %> /> 男 
                <input type="radio" name="gender" value="女" 
                <%=student.gender === "女"
                && "checked" %> /> 女
            </div>
            <div>
                地址：<input
                    type="text"
                    name="address"
                    value="<%=student.address%>"
                />
            </div>
            <div>
                <button>修改</button>
            </div>
        </form>
    </body>           
```

> 整体来看 后续功能变多 需要精简

## 07 router

路由和主文件分开 代码解耦 方便维护

```js
//user 用户相关路由
const express = require("express")
// router是express中创建的一个对象
// 创建router对象
const router = express.Router()

// router实际上是一个中间件 可以在该中间件上去绑定各种路由以及其他中间件
// 这虽然写的list 但是实际上是user/list
router.get("/list", (req, res) => {
    res.send("hello 我是list")
})

// 将router暴露到模块外
module.exports = router
```

```js
const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
//自定义组件 导入
const userRouter = require("./routes/user")
// 如果有商品相关路由 引入
const goodsRouter = require("./routes/goods")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// 使路由生效 以中间件形式注册进来
// app.use("/user", userRouter)
// app.use("/goods", goodsRouter)
// 注意注册位置 在静态资源请求体下面生效 如果写到静态资源前面 那静态资源和请求体的路由对他都不生效了
// 路由过多 路径名字容易重复 所以把路由路径也加上

// 使学生列表路由生效
app.use("/students", require("./routes/student"))

app.get("/", (req, res) => {
    res.render("login")
})

app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持</h1>")
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})

```

student.js（较上一节所有路径都要处理）

```js
const express = require("express")
const router = express.Router()
let STUDENT_ARR = require("../data/students.json")
const fs = require("fs/promises")
const path = require("path")

// 学生列表的路由
router.get("/list", (req, res) => {
    if(req.cookies.username){
        res.render("students", { stus: STUDENT_ARR })
    }else{
        res.redirect("/")
    }
    // res.render("students", { stus: STUDENT_ARR })
})

// 添加学生的路由
router.post("/add", (req, res, next) => {
    const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1
    const newUser = {
        id,
        name: req.body.name,
        age: +req.body.age,
        gender: req.body.gender,
        address: req.body.address
    }

    STUDENT_ARR.push(newUser)

    //调用next交由后续路由继续处理 存储的事全交由后续处理
    next()
})

// 删除学生的路由
router.get("/delete", (req, res, next) => {
    const id = +req.query.id

    STUDENT_ARR = STUDENT_ARR.filter((stu) => stu.id !== id)

    next()
})

// 修改
router.post("/update-student", (req, res, next) => {
    const { id, name, age, gender, address } = req.body
    const student = STUDENT_ARR.find((item) => item.id == id)

    student.name = name
    student.age = +age
    student.gender = gender
    student.address = address
    next()
})

router.get("/to-update", (req, res) => {
    const id = +req.query.id
    const student = STUDENT_ARR.find((item) => item.id === id)

    res.render("update", { student })
})

// 处理存储文件的中间件 把文件写入的代码放进一个中间件里
router.use((req, res) => {
    fs.writeFile(
        path.resolve(__dirname, "../data/students.json"),
        JSON.stringify(STUDENT_ARR)
    )
        .then(() => {
            res.redirect("/students/list")
        })
        .catch(() => {
            res.send("操作失败！")
        })
})

module.exports = router
```

## 08 cookie

需要安装中间件来使得express可以解析cookie

1. 安装cookie-parser

   ```js
    yarn add cookie-parser
   ```

2. 引入js

   ```js
   const cookieParser = require("cookie-parser")  
   ```

3. 设置为中间件

   ```js
   app.use(cookieParser())
   ```

现在咱们这个登录，简直形同虚设，HTTP协议是一个无状态的协议，服务器无法区分请求是否发送自同一个客户端。cookie是HTTP协议中用来解决无状态问题的技术。

cookie的本质就是一个头，服务器以响应头的形式将cookie发送给客户端，客户端收到以后会将其存储，并在下次向服务器发送请求时将其传回，这样服务器就可以根据cookie来识别出客户端了。

cookie是有有效期：

   - 默认情况下cookie的有效期就是一次会话（session），会话就是一次从打开到关闭浏览器的过程。
   - maxAge 用来设置cookie有效时间，单位是毫秒
   - page对象

cookie一旦发送给浏览器我们就不能再修改了，但是我们可以通过发送新的同名cookie来替换旧cookie，从而达到修改的目的。

```js
const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")

const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// 使路由生效
// app.use("/user", userRouter)
// app.use("/goods", goodsRouter)

app.use("/students", require("./routes/student"))
// 根目录路由
app.get("/", (req, res) => {
    res.render("login")
})

app.get("/get-cookie", (req, res) => {
    // 给客户端发送一个cookie
    res.cookie("username", "admin")

    res.send("cookie已经发送")
})

app.get("/hello", (req, res) => {
    // req.cookies 用来读取客户端发回的cookie
    console.log(req.cookies)
    res.send("hello路由")
})

app.post("/login", (req, res) => {
    // 获取用户的用户名和密码
    const {username, password} = req.body
    if(username === "admin" && password === "123123"){
        // 登录成功
        // res.send("登录成功")
        // 将用户名放入cookie
        res.cookie("username", username)
        res.redirect("/students/list")
    }else{
        res.send("用户名或密码错误")
    }

})


app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持</h1>")
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})
```

```js
const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")

const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/set", (req, res) => {
    res.cookie("name", "sunwukong", {
        // expires:new Date(2022, 11, 7)
        maxAge: 1000 * 60 * 60 * 24 * 30
    })
    res.send("设置cookie")
})

app.get("/get", (req, res) => {
    const name = req.cookies.name

    console.log(name)

    res.send("读取cookie")
})

app.get("/delete-cookie", (req, res) => {    
    res.cookie("name", "", {
        maxAge: 0
    })

    res.send("删除Cookie")
})

app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持</h1>")
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})
```

## 09 session

**cookie的不足**：cookie是由服务器创建，浏览器保存，每次浏览器访问服务器时都需要将cookie发回，这就导致我们不能在cookie存放较多的数据，并且cookie是直接存储在客户端，容易被篡改盗用。

> 注意：
> 我们在使用cookie一定不会在cookie存储敏感数据

所以为了Cookie的不足，我们希望可以这样: 将用户的数据统一存储在服务器中，每一个用户的数据都有一个对应的id，我们只需通过cookie将id发送给浏览器，浏览器只需每次访问时将id发回，即可读取到服务器中存储的数据，这个技术我们称之为session（会话）。

**session**:

session是服务器中的一个对象，这个对象用来存储用户的数据

每一个session对象都有一个唯一的id，id会通过cookie的形式发送给客户端, 客户端每次访问时只需将存储有id的cookie发回即可获取它在服务器中存储的数据

在express 可以通过 express-session 组件来实现session功能

**使用步骤：**

① 安装
    `npm add express-session`
② 引入
    `const session = require("....")`
③ 设置为中间件
    `app.use(session({...}))`

```js
const express = require("express")
const path = require("path")
const app = express()
// 引入session
const session = require("express-session")

const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

// 设置session中间件
app.use(
    session({
        secret: "hello"
    })
)

app.get("/set", (req, res) => {
    /*
        cookie的不足
            - cookie是由服务器创建，浏览器保存
                每次浏览器访问服务器时都需要将cookie发回
                这就导致我们不能在cookie存放较多的数据
                并且cookie是直接存储在客户端，容易被篡改盗用
            - 注意：
                我们在使用cookie一定不会在cookie存储敏感数据

            - 所以为了Cookie的不足，我们希望可以这样
                将用户的数据统一存储在服务器中，
                    每一个用户的数据都有一个对应的id
                    我们只需通过cookie将id发送给浏览器
                    浏览器只需每次访问时将id发回，即可读取到服务器中存储的数据
                    这个技术我们称之为session（会话）

            session
                - session是服务器中的一个对象，这个对象用来存储用户的数据
                - 每一个session对象都有一个唯一的id，id会通过cookie的形式发送给客户端
                - 客户端每次访问时只需将存储有id的cookie发回即可获取它在服务器中存储的数据
                - 在express 可以通过 express-session 组件来实现session功能
                - 使用步骤：
                    ① 安装
                        yarn add express-session
                    ② 引入
                        const session = require("....")
                    ③ 设置为中间件
                        app.use(session({...}))
                         
    */

    // console.log(req.session)
    req.session.username = "sunwukong"

    res.send("查看session")
})

app.get("/get",(req, res) => {

    const username = req.session.username

    console.log(username)

    res.send("读取session")
})

app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持</h1>")
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})
```

```js
const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
// 引入file-store
const FileStore = require("session-file-store")(session)

const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    session({
        store: new FileStore({
            // path用来指定session本地文件的路径
            path: path.resolve(__dirname, "./sessions"),
            // 加密
            secret: "哈哈"
            // session的有效时间 秒 默认1个小时
            // ttl: 10,
            // 默认情况下，fileStore会每间隔一小时，清除一次session对象
            // reapInterval 用来指定清除session的间隔，单位秒，默认 1小时
            // reapInterval: 10
        }),
        secret: "dazhaxie"
    })
)

/* 
    session是服务器中的一个对象，这个对象用来存储用户的信息
        每一个session都会有一个唯一的id，session创建后，
            id会以cookie的形式发送给浏览器
        浏览器收到以后，每次访问都会将id发回，服务器中就可以根据id找到对应的session

    id（cookie） ----> session对象
    
    session什么时候会失效？
        第一种 浏览器的cookie没了
        第二种 服务器中的session对象没了
    
    express-session默认是将session存储到内存中的，所以服务器一旦重启session会自动重置，
        所以我们使用session通常会对session进行一个持久化的操作（写到文件或数据库）

    如果将session存储到本文件中：
        - 需要引入一个中间件session-file-store
        - 使用步骤：
            ① 安装
                yarn add session-file-store
            ② 引入
                const FileStore = require("session-file-store")(session) 
            ③ 设置为中间件       
            app.use(
                session({
                    store: new FileStore({}),
                    secret: "dazhaxie"
                })
            )

*/

app.use("/students", require("./routes/student"))

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/logout", (req, res) => {
    // 使session失效
    req.session.destroy(() => {
        res.redirect("/")
    })
})

app.post("/login", (req, res) => {
    // 获取用户的用户名和密码
    const { username, password } = req.body
    if (username === "admin" && password === "123123") {
        // 登录成功后，将用户信息放入到session中
        req.session.loginUser = username

        res.redirect("/students/list")
    } else {
        res.send("用户名或密码错误")
    }
})
app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持</h1>")
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})

```



```js
const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
// 引入uuid
const uuid = require("uuid").v4
// 引入file-store
const FileStore = require("session-file-store")(session)

const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    session({
        store: new FileStore({
            path: path.resolve(__dirname, "./sessions")
        }),
        secret: "dazhaxie"
    })
)
app.use("/students", require("./routes/student"))

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/logout", (req, res) => {
    // 使session失效
    req.session.destroy(() => {
        res.redirect("/")
    })
})

app.post("/login", (req, res) => {
    // 获取用户的用户名和密码
    const { username, password } = req.body
    if (username === "admin" && password === "123123") {
        // 登录成功后，将用户信息放入到session中
        // 这里仅仅是将loginUser添加到了内存中的session中
        // 而没有将值写入到文件中
        req.session.loginUser = username

        // 为了使得session可以立刻存储，需要手动调用save
        req.session.save(()=>{
            res.redirect("/students/list")
        })
    } else {
        res.send("用户名或密码错误")
    }
})
app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持</h1>")
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})
```

## 10 crsf攻击

**csrf攻击**（跨站请求伪造）
http://localhost:3000/students/delete?id=3

现在大部分的浏览器的都不会在跨域的情况下自动发送cookie，这个设计就是为了避免csrf的攻击。

**如何解决？**

1. 使用referer头来检查请求的来源
2. 使用验证码
3. 尽量使用post请求（结合token）


**token（令牌）**

可以在创建表单时随机生成一个token，然后将token存储到session中，并通过模板发送给用户，用户提交表单时，必须将token发回，才可以进行后续操作（可以使用uuid来生成token）

```js
const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
// 引入uuid
const uuid = require("uuid").v4
// 引入file-store
const FileStore = require("session-file-store")(session)

const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    session({
        store: new FileStore({
            path: path.resolve(__dirname, "./sessions")
        }),
        secret: "dazhaxie"
    })
)

app.use("/students", require("./routes/student"))

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/logout", (req, res) => {
    // 使session失效
    req.session.destroy(() => {
        res.redirect("/")
    })
})

app.post("/login", (req, res) => {
    // 获取用户的用户名和密码
    const { username, password } = req.body
    if (username === "admin" && password === "123123") {
        // 登录成功后，将用户信息放入到session中
        // 这里仅仅是将loginUser添加到了内存中的session中
        //  而没有将值写入到文件中
        req.session.loginUser = username

        // 为了使得session可以立刻存储，需要手动调用save
        req.session.save(()=>{
            res.redirect("/students/list")
        })
    } else {
        res.send("用户名或密码错误")
    }
})
app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持</h1>")
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})
```

```js
const express = require("express")
const router = express.Router()
let STUDENT_ARR = require("../data/students.json")
const fs = require("fs/promises")
const path = require("path")
// 引入uuid
const uuid = require("uuid").v4

router.use((req, res, next) => {
    // 获取一个请求头referer
    const referer = req.get("referer")
    // console.log("请求来自：", referer)
    // if(!referer || !referer.startsWith("http://localhost:3000/")){
    //     res.status(403).send("你没有这个权限！")
    //     return
    // }

    // 登录以后，req.session.loginUser是undefined
    if (req.session.loginUser) {
        next()
    } else {
        res.redirect("/")
    }
})

// 学生列表的路由
router.get("/list", (req, res) => {
    // session的默认有效期是一次会话
    // if (req.session.loginUser) {
    //     res.render("students", { stus: STUDENT_ARR })
    // } else {
    //     res.redirect("/")
    // }

    // 生成一个token
    const csrfToken = uuid()

    // 将token添加到session中
    req.session.csrfToken = csrfToken

    req.session.save(() => {
        res.render("students", {
            stus: STUDENT_ARR,
            username: req.session.loginUser,
            csrfToken
        })
    })
})

// 添加学生的路由
router.post("/add", (req, res, next) => {
    // 客户端发送的token
    const csrfToken = req.body._csrf
    const sessionToken = req.session.csrfToken
    req.session.csrfToken = null

    // 将客户端的token和 session中的token进行比较
    if (sessionToken=== csrfToken) {
        const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1

        const newUser = {
            id,
            name: req.body.name,
            age: +req.body.age,
            gender: req.body.gender,
            address: req.body.address
        }

        STUDENT_ARR.push(newUser)


        req.session.save(() => {
            //调用next交由后续路由继续处理
            next()
        })
        
    }else{
        res.status(403).send("token错误")
    }
})

// 删除学生的路由
router.get("/delete", (req, res, next) => {
    const id = +req.query.id

    STUDENT_ARR = STUDENT_ARR.filter((stu) => stu.id !== id)

    next()
})

router.post("/update-student", (req, res, next) => {
    const { id, name, age, gender, address } = req.body
    const student = STUDENT_ARR.find((item) => item.id == id)

    student.name = name
    student.age = +age
    student.gender = gender
    student.address = address
    next()
})

router.get("/to-update", (req, res) => {
    const id = +req.query.id
    const student = STUDENT_ARR.find((item) => item.id === id)

    res.render("update", { student })
})

// 处理存储文件的中间件
router.use((req, res) => {
    fs.writeFile(
        path.resolve(__dirname, "../data/students.json"),
        JSON.stringify(STUDENT_ARR)
    )
        .then(() => {
            res.redirect("/students/list")
        })
        .catch(() => {
            res.send("操作失败！")
        })
})

module.exports = router
```

# d7 操作mongodb数据库

## 01 简介

1.Mongoose是一个让我们可以通过Node来操作MongoDB的模块。

2.Mongoose是一个对象文档模型(ODM)库,它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能。在大多数情况下，它被用来把结构化的模式应用到一个MongoDB集合，并提供了验证和类型转换等好处

3.mongoose中的对象：

- Schema  模式对象（Schema对象定义约束了数据库中的文档结构）
- Model  模型对象（Model对象作为集合中的所有文档的表示，相当于MongoDB数据库中的集合collection）
- Document  文档对象（Document表示集合中的具体文档，相当于集合中的一个具体的文档）

**mongoose的好处**

> 1. 可以为文档创建一个模式结构(Schema)
> 2. 可以对模型中的对象/文档进行验证
> 3. 数据可以通过类型转换转换为对象模型
> 4. 可以使用中间件来应用业务逻辑挂钩
> 5. 比Node原生的MongoDB驱动更容易

**安装**

```bash
npm i -S mongoose
```

## 02 连接数据库

`config/db.config.js`

```js
// 1.引入mongoose
const mongoose = require("mongoose");

// 2.连接mongodb数据库
// 指定连接数据库后不需要存在，当你插入第一条数据库后会自动创建数据库
/*
mongoose.connect('mongodb://数据库地址:端口号/数据库名',{useMongoClient:true})
如果端口号是默认端口号(27017)则可以省略不写
*/
mongoose.connect('mongodb://127.0.0.1:27017/ds2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

// 3.监听mongodb数据库的连接状态
// 绑定数据库连接成功事件
mongoose.connection.once("open", function () {
    console.log("连接成功");
});
// 绑定数据库连接失败事件
mongoose.connection.once("close", function () {
    console.log("数据库连接已经断开");
});

// 4.断开数据库连接(一般不用)
mongooes.disconnect();
```

> `注:MongoDB数据库，一般情况下，只需要连接一次，连接一次后，除非项目停止服务器关闭，否则连接一般不会断开`

**在bin目录下的www文件中使用直接require(“../config/db.config.js”)进行数据库连接的启动**

![image-20221103204502381](https://i0.hdslb.com/bfs/album/585a2a31647d3662dd1af7fd3aa86f639073e082.png)

## 03 创建模式对象和模型对象

数据库中的 Schema，为数据库对象的集合。schema 是 mongoose 里会用到的一种数据模式，可以理解为表结构的定义；每个 schema会映射到 mongodb 中的一个 collection，它不具备操作数据库的能力。

- 每个 schema 都会映射到一个 MongoDB collection 并定义这个collection里的文档结构
- 支持的字段类型

| 类型     | 作用         |
| -------- | ------------ |
| String   | 定义字符串   |
| Number   | 定义数字     |
| Date     | 定义日期     |
| Buffer   | 定义二进制   |
| Boolean  | 定义布尔值   |
| Mixed    | 定义混合类型 |
| ObjectId | 定义对象ID   |
| Array    | 定义数组     |

`model/UserModel.js`

```js
const mongoose = require("mongoose")
const Schema=mongooes.Schema;
//创建模式对象
const UserType=new Schema({
    name:{
           type: 'string',
           //添加约束，保证数据的完整性，让数据按规矩统一
           require: true
        },
    age:Number,
    gender:{
        type:String,
        // 默认值
        default:'female'
    },
    address:String
})

//创建模型对象
//通过Schema来创建Model
//Model代表的是数据库中的集合，通过Model才能对数据库进行操作
//mongoose.model(modelName,schema)
//建立映射关系，students是集合,mongoose会自动将集合变成复数比如student会变成students
//大写也会被自动转换为小写，比如Users会变成users
const UserModel=mongoose.model("UserModel",UserType，"user"); 
//第一个参数表示创建的集合的名称，第二个参数表示利用的模式对象，第三个参数是强行指定集合名称

module.exports  = UserModel 
```

![image-20220619145550360](https://img-blog.csdnimg.cn/609a88b5e2f840269695406093bf1225.png)

## 04 文档新增

### 4.1 save()

- 操作的是文档

案例：

```js
var mongoose = require('mongoose')
const UserModel = require('../model/UserModel');

//链式调用 通过new 一个Model创建一个 document
new UserModel({name:"小明",age:18}).save((err,docs) => {
    if(!err){
        console.log(docs)
        res.send({
          code: 200,
          data: {
            id: docs._id,
          },
        })
        //{ _id: 6017bd1cf4cc8544d8ed2a8a, name: '小明', age: 18, __v: 0 }
    }
})   
```

### 4.2 create()

- 操作模型

- Model.create(doc(s), [callback])

- 参数：

  [doc(s)]：文档对象或文档对象数组

  [callback]：回调函数

```js
var mongoose = require('mongoose')
const UserModel = require('../model/UserModel');

UserModel.create({name:"小明",age:18},{name:"小红",age:10},(err,doc1,doc2) => {
   if(!err){
        console.log(doc1)
        //{ _id: 6017be2d77c8dd01242624bb, name: '小明', age: 18, __v: 0 }
        console.log(doc2)
        //{ _id: 6017be2d77c8dd01242624bc, name: '小红', age: 10, __v: 0 }
    }
})
```

其它：

```js
//Model.createOne(doc, [callback]);		创建一个对象
//Model.createMany(doc, [callback]);		创建多个对象
//	-doc是需要插入的文档
//	-callback(err) 是回调函数，可以用来提示是否创建成功了
```

### 4.3 insertMany()

- Model.insertMany(doc(s), [options], [callback])
- 返回值为一个数组
- 案例：

```js
UserModel.insertMany({name:"小明",age:18},{name:"小芳",age:14},(err,docs) => {
   if(!err){
        console.log(docs)
        /*[{ _id: 6017befb5c36d64d08b72576, name: '小明', grades: 68, __v: 0 },
           { _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 }]*/
    }
})
```

## 05 文档查询

| _id                      | name | grades | __v  |
| ------------------------ | ---- | ------ | ---- |
| 6017befb5c36d64d08b72576 | 小明 | 68     | 0    |
| 6017befb5c36d64d08b72577 | 小芳 | 94     | 0    |
| 6017c455ba09d355a49ec8eb | 小红 | 52     | 0    |
| 6017c455ba09d355a49ec8ec | 小刚 | 46     | 0    |

### 5.1 find()

- Model.find(conditions, [projection], [options], [callback])

- 参数

		conditions：查询条件
		
		[projection]：控制返回字段
		
		[options]：配置查询参数
		
		[callback]：回调函数–function(err,docs){}

- 案例：

  ```js
  var mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/student',(err) => {
      if(!err){
          var schema = new mongoose.Schema({name:String,grades:Number})
          var stuModel = mongoose.model('grades',schema)
          //查询所有数据
          stuModel.find((err,docs) => {
             if(!err){
              	console.log(docs)
          	}
          })        
         /* [{ _id: 6017befb5c36d64d08b72576, name: '小明', grades: 68, __v: 0 },
             { _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 },
             { _id: 6017c455ba09d355a49ec8eb, name: '小红', grades: 52, __v: 0 },
             { _id: 6017c455ba09d355a49ec8ec, name: '小刚', grades: 46, __v: 0 }]*/
          
          //查询成绩大于60以上的数据
          stuModel.find({grades:{$gte:60}},(err,docs) => {
              if(!err){
                   console.log(docs)
               }
           })
          /*[{ _id: 6017befb5c36d64d08b72576, name: '小明', grades: 68, __v: 0 },
             { _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 }]*/
          
          //查询成绩大于60以上且名字里存在‘芳’的数据
          stuModel.find({name:/芳/,grades:{$gte:60}},(err,docs) => {
              if(!err){
                   console.log(docs)
               }
           })
          /*[
          *     { _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 }
          * ]*/
          
          //查询名字里存在‘明’的数据且只输出‘name’字段
          //_id默认会返回
          stuModel.find({name:/明/},{name:1,_id:0},(err,docs) => {
              if(!err){
                   console.log(docs)
               }
           })
          // [{name: '小明'}]
          
          //跳过前两条数据并限制只输出一条数据
          stuModel.find(null,null,{skip:2,limit: 1},(err,docs) => {
              if(!err){
                   console.log(docs)
               }
           })
          /*[{ _id: 6017c455ba09d355a49ec8eb, name: '小红', grades: 52, __v: 0 }*/
      }
  })
  ```

### 5.2 findById()

- Model.findById(id, [projection], [options], [callback])
- 案例：

```js
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',(err) => {
    if(!err){
        var schema = new mongoose.Schema({name:String,grades:Number})
        var stuModel = mongoose.model('grades',schema)
        //保存查询数据的_id
        var aIDArr = []
        
        //查询所有数据
        stuModel.find((err,docs) => {
           if(!err){
            	docs.forEach((item,index,arr)=>{
                    aIDArr.push(item._id)
                })
                //显示第 0 个元素的所有字段
                stuModel.findById(aIDArr[0],(err,doc)=>{
                    if(!err){
                        console.log(doc)
                    }
                })
               // { _id: 6017befb5c36d64d08b72576, name: '小明', grades: 68, __v: 0 }
               
                //显示第 0 个元素且只输出name字段
                stuModel.findById(aIDArr[0],{name:1,_id:0},(err,doc)=>{
                    if(!err){
                        console.log(doc)
                    }
                })
               // { name: '小明' }
               
                //显示第 0 个元素且输出最少的字段(_id默认输出)
                stuModel.findById(aIDArr[0],{lean:true},(err,doc)=>{
                    if(!err){
                        console.log(doc)
                    }
                })
               // { _id: 6017befb5c36d64d08b72576 }
        	}
        })
    }
})
```

### 5.3 findOne()

- 返回查询到的数据的第一个
- Model.findOne([conditions], [projection], [options], [callback])
- 案例：

```js
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',(err) => {
    if(!err){
        var schema = new mongoose.Schema({name:String,grades:Number})
        var stuModel = mongoose.model('grades',schema)
        //找出age>80的文档中的第一个文档
        stuModel.findOne({grades:{$gt:80}},(err,doc) => {
           if(!err){
            	console.log(doc)
        	}
        })
        //{ _id: 6017befb5c36d64d08b72577, name: '小芳', grades: 94, __v: 0 }

        //找出age>80的文档中的第一个文档，且只输出name字段
        stuModel.findOne({grades:{$gt:80}},{name:1,_id:0},(err,doc) => {
            if(!err){
                 console.log(doc)
             }
         })
         //{ name: '小芳' }

        //找出age>80的文档中的第一个文档，且输出包含name字段在内的最短字段
        stuModel.findOne({grades:{$gt:80}},{lern:true},(err,doc) => {
            if(!err){
                 console.log(doc)
             }
         })
         //{ _id: 6017befb5c36d64d08b72577 }
    }
})
```

### 5.4 复杂查询【$where】

- $where 可以使用任意的 JavaScript 作为查询的一部分，包含JavaScript 表达式的字符串或者函数

- 案例

  ```js
  var mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/student',(err) => {
      if(!err){
          var schema = new mongoose.Schema({name:String,grades:Number})
          //添加一个测试字段
          // schema.add({test:Number})
          var stuModel = mongoose.model('grades',schema)
          //添加两条数据
          // stuModel.create({name:"小花",grades:76,test:76},{name:"小兰",grades:60,test:30},(err,docs)=>{
          //     console.log(docs)
          // })
  
          //字符串 es5中this与obj指向一样，es6中只能用obj
          stuModel.find({$where:"this.grades == this.test" || "obj.grades == obj.test"},(err,doc) => {
             if(!err){
              	console.log(doc)
          	}
          })
          //[{_id: 6017d7cb8a95cb2a00aae3ae,name: '小花',grades: 76,test: 76,__v: 0}]
  
          //函数
          stuModel.find({$where:function() {
              return this.grades == this.test || obj.grades == obj.test*2
          }},(err,doc) => {
              if(!err){
                   console.log(doc)
               }
           })
           /*[{_id: 6017d7cb8a95cb2a00aae3ae,name: '小花',grades: 76,test: 76,__v: 0},
              {_id: 6017d7cb8a95cb2a00aae3af,name: '小兰',grades: 60,test: 30,__v: 0}]*/
      }
  })
  ```

### 5.5 常用查询条件

```bash
$or　　　　 或关系

$nor　　　 或关系取反

$gt　　　　 大于

$gte　　　 大于等于

$lt　　　　 小于

$lte　　　 小于等于

$ne　　　　 不等于

$in　　　　 在多个值范围内

$nin　　　 不在多个值范围内

$all　　　 匹配数组中多个值

$regex　　 正则，用于模糊查询

$size　　　 匹配数组大小

$maxDistance　 范围查询，距离（基于LBS）

$mod　　　　 取模运算

$near　　　 邻域查询，查询附近的位置（基于LBS）

$exists　　 字段是否存在

$elemMatch　 匹配内数组内的元素

$within　　　 范围查询（基于LBS）

$box　　　　 范围查询，矩形范围（基于LBS）

$center　　　 范围醒询，圆形范围（基于LBS）

$centerSphere　范围查询，球形范围（基于LBS）

$slice　　　　 查询字段集合中的元素（比如从第几个之后，第N到第M个元素
```

### 5.6 特定类型查询

| _id                      | name | grades | __v  | test |
| ------------------------ | ---- | ------ | ---- | ---- |
| 6017befb5c36d64d08b72576 | 小明 | 68     | 0    | 1    |
| 6017befb5c36d64d08b72577 | 小芳 | 94     | 0    | 3    |
| 6017c455ba09d355a49ec8eb | 小红 | 52     | 0    | 5    |
| 6017c455ba09d355a49ec8ec | 小刚 | 46     | 0    | 2    |
| 6017d7cb8a95cb2a00aae3ae | 小花 | 76     | 0    | 4    |
| 6017d7cb8a95cb2a00aae3af | 小兰 | 60     | 0    | 6    |

**方法**

| 方法     | 作用     |
| -------- | -------- |
| sort     | 排序     |
| skip     | 跳过     |
| limit    | 限制     |
| select   | 显示字段 |
| exect    | 执行     |
| count    | 计数     |
| distinct | 去重     |

> exec(）和 then()
>
> 两者返回的都是 promise对象
> exec一般用于独立的动作一次性执行，
> then则用于连续性的动作
> 从其方法名也可以区别它们的用法，exec就是执行的意思，then就是然后怎么怎么，
> exec和then的参数是有所不同的，前者是 callback(err,doc)，后者则是 resolved(doc),rejected(err)

案例：

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
var stuModel = mongoose.model('grades', Schema);

// 按test从小到大排序
// 1是升序，-1是降序
stuModel.find().sort({test:1}).exec((err,docs)=>{
  console.log(docs)
})
// 按test从大到小排列
stuModel.find().sort('-test').exec((err,docs)=>{
  console.log(docs)
})
// 跳过1个，显示其他
stuModel.find().skip(1).exec((err,docs)=>{
  console.log(docs)
})
// 显示2个
stuModel.find().limit(2).exec((err,docs)=>{
  console.log(docs)
})
// 显示name、grades字段，不显示id字段
stuModel.find().select('name grades -id').exec((err,docs)=>{
  console.log(docs)
})
// 跳过第1个后，只显示2个数据，按照grades由大到小排序，且不显示id字段
stuModel.find().skip(1).limit(2).sort('-grades').select('-id').exec((err,docs)=>{
  console.log(docs)
  /[{ name: '小明', grades: 78, v: 0, test: 1 },
     { name: '小花', grades: 76, test: 4, v: 0 }]/
})
// 显示集合stuModel中的文档数量
stuModel.find().count((err,count)=>{
  console.log(count)
  //6
})
// 返回集合stuModel中的grades的值
stuModel.find().distinct('grades',(err,distinct)=>{
  console.log(distinct)
  //[ 46, 52, 60, 76, 78, 94 ]
})
```

## 06 文档更新

### 6.1 update()

- Model.update(conditions, doc, [options], [callback])

- 参数

  conditions：查询条件

  doc：需要修改的数据（插入的数据）

  [options]：控制选项

  > safe (boolean)： 默认为true。安全模式。
  > upsert (boolean)： 默认为false。如果不存在则创建新记录。
  > multi (boolean)： 默认为false。是否更新多个查询记录。
  > runValidators： 如果值为true，执行Validation验证。
  > setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
  > strict (boolean)： 以strict模式进行更新。
  > overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。

- [callback]：回调函数

- 若设置了查询条件，当数据库不满足时默认什么也不发生

- update() 方法中的回调函数不能省略，否则数据不会更新，当回调无有用信息时可以使用exec()简化

  ```js
  stuModel.update({name:'小明'},{$set:{test:34}}.exec())
  ```

- 案例

  ```js
  //第一步，引入mongoose
  const mongoose = require('mongoose')
  //第二步，连接数据库
  mongoose.connect('mongodb://localhost:27017/student',err=>{
    if(!err){
      //第三步，创建模板
      var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
      // var Schema = new Schema()
      //第四步，将模板映射到集合并创建
      var stuModel = mongoose.model('grades',Schema)
  
      //查询name为小明的数据，并将其test更改为34
      //若有多个文档，默认只更新第一个
      stuModel.update({name:'小明'},{$set:{test:34}},(err,raw)=>{
        console.log(raw)
      })
        
       //{ n: 1, nModified: 1, ok: 1 }
  	 //6017befb5c36d64d08b72576	小明	68	0	34
    }
  })
  ```

### 6.2 updateOne()

- Model.updateOne(conditions, doc, [options], [callback])

- 与update()相似，唯一区别为updateOne() 默认更新一个文档，即使设置{multi:true}也无法只更新一个文档

### 6.3 updateMany()

- Model.updateMany(conditions, doc, [options], [callback])

- 与update()相似，唯一区别为updateMany() 默认更新多个文档，即使设置{multi:false}也无法只更新一个文档

### 6.4 find()+save()

用于复杂更新

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',err=>{
  if(!err){
     var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
     var stuModel = mongoose.model('grades',Schema)
	
     //查询成绩小于60的数据，并在其名字后添加‘：差生’字段
     stuModel.find({grades:{$lt:60}},(err,docs)=>{
      console.log(docs);
      /*[{test: 0,_id: 6017c455ba09d355a49ec8eb,name: '小红',grades: 52,__v: 0},
        {test: 0,_id: 6017c455ba09d355a49ec8ec,name: '小刚',grades: 46,__v: 0}]*/
      
      docs.forEach((item,index,arr) => {
        item.name += '：差生'
        //将修改后的数据保存
        item.save()
      })
      console.log(docs)
      /*[{test: 0,_id: 6017c455ba09d355a49ec8eb,name: '小红：差生',grades: 52,__v: 0},
        {test: 0,_id: 6017c455ba09d355a49ec8ec,name: '小刚：差生',grades: 46,__v: 0}]*/
    })
  }
})
```

### 6.5 findOne() + save()

- 用于复杂更新
- findOne()返回值为文档对象

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',err=>{
  if(!err){
     var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
     var stuModel = mongoose.model('grades',Schema)
	
     //查询成绩小于60的数据，并在其名字后添加‘：差生’字段
     stuModel.findOne({name:'小明'},(err,doc)=>{
      console.log(doc);
      //{test: 34,_id: 6017c455ba09d355a49ec8eb,name: '小明',grades: 68,__v: 0},
      doc.age += 10
      doc.save()
      console.log(docs)
      //{test: 34,_id: 6017c455ba09d355a49ec8eb,name: '小明',grades: 78,__v: 0}
    })
  }
})
```

### 6.6 fingOneAndUpdate()

Model.findOneAndUpdate([conditions], [update], [options], [callback])

### 6.7 findByIdAndUpdate()

Model.findByIdAndUpdate([conditions], [update], [options], [callback])

## 07 文档删除

### 7.1 deleteOne()

- 会删除符合条件的所有数据
- Model的deleteOne（）

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',err=>{
  if(!err){
     var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
     var stuModel = mongoose.model('grades',Schema)
     //删除名字中包含‘差生’的数据
	 stuModel.deleteOne({name:/差生/},function(err){})
     // 回调函数不能省略，但可以使用exec() 简写
     //stuModel.deleteOne({name:/差生/}).exec()
    })
  }
})
```

- 文档的deleteOne（）

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student',err=>{
  if(!err){
     var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
     var stuModel = mongoose.model('grades',Schema)
     //删除名字中包含‘差生’的数据
	 stuModel.find({name:/差生/},function(err,docs){
         docs.forEach((item,index,arr)=>{
             item.deleteOne((err,doc)=>{
                 //doc为被删除的值
                 console.log(doc)
             })
         })
     })
    })
  }
})
```

### 7.2 findOneAndRemove()

- 删除符合条件的一条数据

- Model.findOneAndRemove(conditions, [options], [callback])

- 回调不可省略，但可以使用exec() 简写

```js
stuModel.findOneAndRemove({name:/差生/}).exec()
```

### 7.3 findByIdAndRemove()

- 通过id删除数据（id是唯一的）
- Model.findByIdAndRemove(conditions, [options], [callback])
- 回调不可省略，但可以使用exec() 简写

## 08 前后钩子

- 前后钩子即 pre() 和 post() 方法（中间件）

- 中间件在schema上指定，类似静态方法或实例方法等

- 可以在执行以下操作时设置前后钩子

  >  init
  >  validate
  >  save
  >  remove
  >  count
  >  find
  >  findOne
  >  findOneAndRemove
  >  findOneAndUpdate
  >  insertMany
  >  update

- 【pre()】：在执行某些操作前执行
- 【post】：在执行某些操作前后执行，不可以使用next()

案例：

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({ name:String,grades:Number,test:{type:Number,default:0}})
Schema.pre('find',function(next){
    console.log('我是pre方法1');
    next();
});
Schema.pre('find',function(next){
    console.log('我是pre方法2');
    next();
});
Schema.post('find',function(docs){
  console.log('我是post方法1');
});
Schema.post('find',function(docs){
  console.log('我是post方法2');
});  
var stuModel = mongoose.model('grades', Schema);
stuModel.find(function(err,docs){
    console.log(docs[0]);
})    
/*
我是pre方法1
我是pre方法2
我是post方法1
我是post方法2
{test: 34, _id: 6017befb5c36d64d08b72576,name: '小明',grades: 78,__v: 0}
*/
```

## 09 文档验证

- 保证保存文档时，可以按照Schema设置的字段进行设置

### 9.1 【required】：数据必填

```js
//将name设置为必填字段，如果没有name字段，文档将不被保存，且出现错误提示
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:Number
})
var stuModel = mongoose.model('students', Schema);
new stuModel({age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//报错：name: Path `name` is required.
```

###  9.2 【default】：默认值

```js
//设置age字段的默认值为18，如果不设置age字段，则会取默认值
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:String,
  age:{
    type:Number,
    default:18
  }
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'李雷'}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//{ age: 18, _id: 6018f3bd7e51343e6c4f212b, name: '李雷', __v: 0 }
```

### 9.3 【min】【max】：最小/大值

- 只适用于数字

```js
//将age的取值范围设置为[0,10]。如果age取值为20，文档将不被保存，且出现错误提示
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:String,
  age:{
    type:Number,
    min:10,
    max:18
  }
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'李雷',age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//age: Path `age` (20) is more than maximum allowed value (18).
```

### 9.4 【match】：正则匹配

- 只适用于字符串

```js
//将name的match设置为必须存在'01'字符。如果name不存在'01'，文档将不被保存，且出现错误提示
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:{type:String,match:/01/},
  age:Number,
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'李雷',age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//name: Path `name` is invalid (李雷).
```

### 9.5【enum】：枚举匹配

- 只适用于字符串

```js
//将name的枚举取值设置为['zs','ls','ww']，如果name不在枚举范围内取值，文档将不被保存，且出现错误提示
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:{type:String,enum:['zs','ls','ww']},
  age:Number,
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'lss',age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

//name: ValidatorError: `lss` is not a valid enum value for path `name`.
```

### 9.6 【validate】：自定义匹配

- validate实际上是一个函数，函数的参数代表当前字段，返回true表示通过验证，返回false表示未通过验证

```js
//定义名字name的长度必须在4个字符以上
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/student')
var Schema =new mongoose.Schema({
  name:{type:String,validate:nameLength},
  age:Number,
})
var stuModel = mongoose.model('students', Schema);
new stuModel({name:'abcd',age:20}).save((err,doc)=>{
  if(err){
    return console.log(err)
  }
  console.log(doc)
})

function nameLength(arg){
  if(arg.length>4){
    return true
  }
  return false
}

//name: Validator failed for path `name` with value `abcd`
```

# d8 操作mysql数据库

## 01 mysql 介绍

付费的商用数据库：

- Oracle，典型的高富帅；
- SQL Server，微软自家产品，Windows定制专款；
- DB2，IBM的产品，听起来挺高端；
- Sybase，曾经跟微软是好基友，后来关系破裂，现在家境惨淡。

这些数据库都是不开源而且付费的，最大的好处是花了钱出了问题可以找厂家解决，不过在Web的世界里，常常需要部署成千上万的数据库服务器，当然不能把大把大把的银子扔给厂家，所以，无论是Google、Facebook，还是国内的BAT，无一例外都选择了免费的开源数据库：

- MySQL，大家都在用，一般错不了；
- PostgreSQL，学术气息有点重，其实挺不错，但知名度没有MySQL高；
- sqlite，嵌入式数据库，适合桌面和移动应用。

作为一个JavaScript全栈工程师，选择哪个免费数据库呢？当然是MySQL。因为MySQL普及率最高，出了错，可以很容易找到解决方法。而且，围绕MySQL有一大堆监控和运维的工具，安装和使用很方便。

![image-20220420083146539](https://i0.hdslb.com/bfs/album/8fc1c58bb05d52c4afa0641a099c92d078a55789.png)

## 02 与非关系数据库区别

关系型和非关系型数据库的主要差异是数据存储的方式。关系型数据天然就是表格式的，因此存储在数据表的行和列中。数据表可以彼此关联协作存储，也很容易提取数据。

与其相反，非关系型数据不适合存储在数据表的行和列中，而是大块组合在一起。非关系型数据通常存储在数据集中，就像文档、键值对或者图结构。你的数据及其特性是选择数据存储和提取方式的首要影响因素。

**关系型数据库最典型的数据结构是表，由二维表及其之间的联系所组成的一个数据组织**
优点：
1、易于维护：都是使用表结构，格式一致；
2、使用方便：SQL语言通用，可用于复杂查询；
3、复杂操作：支持SQL，可用于一个表以及多个表之间非常复杂的查询。
缺点：
1、读写性能比较差，尤其是海量数据的高效率读写；
2、固定的表结构，灵活度稍欠；
3、高并发读写需求，传统关系型数据库来说，硬盘I/O是一个很大的瓶颈。

**非关系型数据库严格上不是一种数据库，应该是一种数据结构化存储方法的集合，可以是文档或者键值对等。**

优点：

1、格式灵活：存储数据的格式可以是key,value形式、文档形式、图片形式等等，文档形式、图片形式等等，使用灵活，应用场景广泛，而关系型数据库则只支持基础类型。
2、速度快：nosql可以使用硬盘或者随机存储器作为载体，而关系型数据库只能使用硬盘；
3、高扩展性；
4、成本低：nosql数据库部署简单，基本都是开源软件。

缺点：

1、不提供sql支持；
2、无事务处理；
3、数据结构相对复杂，复杂查询方面稍欠。

## 03 MySQL2的历史以及选择原因

MySQL2 项目是 [MySQL-Native](https://github.com/sidorares/nodejs-mysql-native) 的延续。 协议解析器代码从头开始重写，api 更改为匹配流行的 [mysqljs/mysql](https://github.com/mysqljs/mysql)。 MySQL2 团队正在与 [mysqljs/mysql](https://github.com/mysqljs/mysql) 团队合作，将共享代码分解并移至 [mysqljs](https://github.com/mysqljs/mysql) 组织下。

MySQL2 大部分 API 与 [mysqljs](https://github.com/mysqljs/mysql) 兼容，并支持大部分功能。 MySQL2 还提供了更多的附加功能

- 更快、更好的性能
- [支持预处理](https://github.com/sidorares/node-mysql2/tree/master/documentation/Prepared-Statements.md)
- MySQL二进制日志协议
- [MySQL Server](https://github.com/sidorares/node-mysql2/tree/master/documentation/MySQL-Server.md)
- 对编码和排序规则有很好的支持
- [Promise封装](https://github.com/sidorares/node-mysql2/tree/master/documentation/Promise-Wrapper.md)
- 支持压缩
- SSL 和 [Authentication Switch](https://github.com/sidorares/node-mysql2/tree/master/documentation/Authentication-Switch.md)
- [自定义流](https://github.com/sidorares/node-mysql2/tree/master/documentation/Extras.md)
- [连接池](https://github.com/sidorares/node-mysql2/tree/master/documentation_zh-cn#using-connection-pools)

MySQL2 可以跨平台使用，毫无疑问可以安装在 Linux、Mac OS 或 Windows 上。

```bash
npm install --save mysql2
```

## 04 连接数据库

`config/db.config.js`

```js
const mysql = require('mysql2/promise')

// 通过createPool方法连接服务器
const db = mysql.createPool({
  host: '127.0.0.1', // 表示连接某个服务器上的mysql数据库
  user: 'root', // 数据库的用户名 （默认为root）
  password: '123456', // 数据库的密码 (默认为root)
  database: 'dbtest11', // 创建的本地数据库名称
})

// 测试数据库是否连接成功
db.getConnection((err, conn) => {
  conn.connect(err => {
    if (err) {
      console.log('连接失败~')
    } else {
      console.log('连接成功~')
    }
  })
})

module.exports = db
```

## 05 查询

- 导入mysql
- 通过createPool方法将mysql数据库连接到服务器，并声明一个db变量
- 通过db.query方法测试是否连接成功
- 将数据返回给客户端
  - 导入express
  - 创建服务器
  - 启动服务器
  - 注册路由
  - 通过db.query（查询数据库）来执行sql语句
  - 如果执行成功将数据响应给客户端

```js
var express = require('express')
const db = require('../config/db.config')
var router = express.Router()

// 通过nodejs获取数据库中的数据  并返回给客户端-
router.get('/', async (req, res) => {
  // 通过db.query方法来执行mysql  测试是否连接成功
  // 查询语句 data 得到的是一个数组，  增删改得到的是受影响的行数
  let users = await db.query('select * from users')
  console.log(users[0])
  res.send({
    ok: 1,
    data: users[0],
  })
})

module.exports = router
```

控制台输出：

![image-20221105230812798](https://i0.hdslb.com/bfs/album/8ab5e75aff0d880a7842e5c9faff295ff16936f8.png)

返回的数据：

![image-20221105230828022](https://i0.hdslb.com/bfs/album/2b34f7577230de56f5d481588c7758ea024d53f4.png)

## 06 插入

```js
// 给user中添加用户名和密码
router.get('/addUser', async (req, res) => {
  const sql = 'insert into users (userid,department_id) values (?,?)' // 构建sql语句
  // 执行sql语句
  let ret = await db.query(sql, ['Mary', 2])
  console.log(ret)
  res.send({
    ok: 1,
  })
})
```

控制台输出：

![image-20221105231625375](https://i0.hdslb.com/bfs/album/e881a7c9d4663f1f81817f0a4d899a0428c67b64.png)

## 07 修改

````js
// 修改数据
router.get('/updateUser', async (req, res) => {
  const sql = 'update users set userid=?,department_id=? where id=?' // 构建sql语句
  // 执行sql语句
  let ret = await db.query(sql, ['Jerry', 10, 8])
  console.log(ret)
  res.send({
    ok: 1,
  })
})
````

控制台输出：

![image-20221106095506641](https://i0.hdslb.com/bfs/album/be9866defbe7223d33530db79638606752fc3b9f.png)

## 08 删除

```js
// 删除数据
router.get('/deleteUser', async (req, res) => {
  const sql = 'delete from users where id=?' // 构建sql语句
  // 执行sql语句
  let ret = await db.query(sql, [8])
  console.log(ret)
  res.send({
    ok: 1,
  })
})
```

控制台输出：

![image-20221106100105915](https://i0.hdslb.com/bfs/album/45f7756833e7a6b94fe54c92ae3c350e12614d92.png)



# d9 接口规范和业务分层

## 01 接口规范-RESTful架构

### 1.1 什么是REST

REST全称是Representational State Transfer，中文意思是表述（编者注：通常译为表征）性状态转移。 它首次出现在2000年Roy Fielding的博士论文中，Roy Fielding是HTTP规范的主要编写者之一。 他在论文中提到："我这篇文章的写作目的，就是想在符合架构原理的前提下，理解和评估以网络为基础的应用软件的架构设计，得到一个功能强、性能好、适宜通信的架构。REST指的是一组架构约束条件和原则。" 如果一个架构符合REST的约束条件和原则，我们就称它为RESTful架构。

REST本身并没有创造新的技术、组件或服务，而隐藏在RESTful背后的理念就是使用Web的现有特征和能力， 更好地使用现有Web标准中的一些准则和约束。虽然REST本身受Web技术的影响很深， 但是理论上REST架构风格并不是绑定在HTTP上，只不过目前HTTP是唯一与REST相关的实例。 所以我们这里描述的REST也是通过HTTP实现的REST。

**理解RESTful**

要理解RESTful架构，需要理解Representational State Transfer这个词组到底是什么意思，它的每一个词都有些什么涵义。

下面我们结合REST原则，围绕资源展开讨论，从资源的定义、获取、表述、关联、状态变迁等角度，列举一些关键概念并加以解释。

- 资源与URI
- 统一资源接口
- 资源的表述
- 资源的链接
- 状态的转移

### 1.2 资源与URI

REST全称是表述性状态转移，那究竟指的是什么的表述? 其实指的就是资源。任何事物，只要有被引用到的必要，它就是一个资源。资源可以是实体(例如手机号码)，也可以只是一个抽象概念(例如价值) 。下面是一些资源的例子：

- 某用户的手机号码
- 某用户的个人信息
- 最多用户订购的GPRS套餐
- 两个产品之间的依赖关系
- 某用户可以办理的优惠套餐
- 某手机号码的潜在价值

要让一个资源可以被识别，需要有个唯一标识，在Web中这个唯一标识就是URI(Uniform Resource Identifier)。

URI既可以看成是资源的地址，也可以看成是资源的名称。如果某些信息没有使用URI来表示，那它就不能算是一个资源， 只能算是资源的一些信息而已。URI的设计应该遵循可寻址性原则，具有自描述性，需要在形式上给人以直觉上的关联。这里以github网站为例，给出一些还算不错的URI：

- https://github.com/git
- https://github.com/git/git
- https://github.com/git/git/blob/master/block-sha1/sha1.h
- https://github.com/git/git/commit/e3af72cdafab5993d18fae056f87e1d675913d08
- https://github.com/git/git/pulls
- https://github.com/git/git/pulls?state=closed
- https://github.com/git/git/compare/master…next

下面让我们来看看URI设计上的一些技巧:

- 使用_或-来让URI可读性更好

曾经Web上的URI都是冰冷的数字或者无意义的字符串，但现在越来越多的网站使用_或-来分隔一些单词，让URI看上去更为人性化。 例如国内比较出名的开源中国社区，它上面的新闻地址就采用这种风格， 如http://www.oschina.net/news/38119/oschina-translate-reward-plan。

- 使用/来表示资源的层级关系

例如上述/git/git/commit/e3af72cdafab5993d18fae056f87e1d675913d08就表示了一个多级的资源， 指的是git用户的git项目的某次提交记录，又例如/orders/2012/10可以用来表示2012年10月的订单记录。

- 使用?用来过滤资源

很多人只是把?简单的当做是参数的传递，很容易造成URI过于复杂、难以理解。可以把?用于对资源的过滤， 例如/git/git/pulls用来表示git项目的所有推入请求，而/pulls?state=closed用来表示git项目中已经关闭的推入请求， 这种URL通常对应的是一些特定条件的查询结果或算法运算结果。

- ,或;可以用来表示同级资源的关系

有时候我们需要表示同级资源的关系时，可以使用,或;来进行分割。例如哪天github可以比较某个文件在随意两次提交记录之间的差异，或许可以使用/git/git /block-sha1/sha1.h/compare/e3af72cdafab5993d18fae056f87e1d675913d08;bd63e61bdf38e872d5215c07b264dcc16e4febca作为URI。 不过，现在github是使用…来做这个事情的，例如/git/git/compare/master…next。

### 1.3 统一资源接口

RESTful架构应该遵循统一接口原则，统一接口包含了一组受限的预定义的操作，不论什么样的资源，都是通过使用相同的接口进行资源的访问。接口应该使用标准的HTTP方法如GET，PUT和POST，并遵循这些方法的语义。

如果按照HTTP方法的语义来暴露资源，那么接口将会拥有安全性和幂等性的特性，例如GET和HEAD请求都是安全的， 无论请求多少次，都不会改变服务器状态。而GET、HEAD、PUT和DELETE请求都是幂等的，无论对资源操作多少次， 结果总是一样的，后面的请求并不会产生比第一次更多的影响。

下面列出了GET，DELETE，PUT和POST的典型用法:

#### 1.3.1 GET

- 安全且幂等
- 获取表示
- 变更时获取表示（缓存）

- 200（OK） - 表示已在响应中发出

- 204（无内容） - 资源有空表示
- 301（Moved Permanently） - 资源的URI已被更新
- 303（See Other） - 其他（如，负载均衡）
- 304（not modified）- 资源未更改（缓存）
- 400 （bad request）- 指代坏请求（如，参数错误）
- 404 （not found）- 资源不存在
- 406 （not acceptable）- 服务端不支持所需表示
- 500 （internal server error）- 通用错误响应
- 503 （Service Unavailable）- 服务端当前无法处理请求

#### 1.3.2 POST

- 不安全且不幂等
- 使用服务端管理的（自动产生）的实例号创建资源
- 创建子资源
- 部分更新资源
- 如果没有被修改，则不过更新资源（乐观锁）

- 200（OK）- 如果现有资源已被更改

- 201（created）- 如果新资源被创建
- 202（accepted）- 已接受处理请求但尚未完成（异步处理）
- 301（Moved Permanently）- 资源的URI被更新
- 303（See Other）- 其他（如，负载均衡）
- 400（bad request）- 指代坏请求
- 404 （not found）- 资源不存在
- 406 （not acceptable）- 服务端不支持所需表示
- 409 （conflict）- 通用冲突
- 412 （Precondition Failed）- 前置条件失败（如执行条件更新时的冲突）
- 415 （unsupported media type）- 接受到的表示不受支持
- 500 （internal server error）- 通用错误响应
- 503 （Service Unavailable）- 服务当前无法处理请求

#### 1.3.3 PUT

- 不安全但幂等
- 用客户端管理的实例号创建一个资源
- 通过替换的方式更新资源
- 如果未被修改，则更新资源（乐观锁）

- 200 （OK）- 如果已存在资源被更改

- 201 （created）- 如果新资源被创建
- 301（Moved Permanently）- 资源的URI已更改
- 303 （See Other）- 其他（如，负载均衡）
- 400 （bad request）- 指代坏请求
- 404 （not found）- 资源不存在
- 406 （not acceptable）- 服务端不支持所需表示
- 409 （conflict）- 通用冲突
- 412 （Precondition Failed）- 前置条件失败（如执行条件更新时的冲突）
- 415 （unsupported media type）- 接受到的表示不受支持
- 500 （internal server error）- 通用错误响应
- 503 （Service Unavailable）- 服务当前无法处理请求

#### 1.3.4 DELETE

- 不安全但幂等
- 删除资源

- 200 （OK）- 资源已被删除

- 301 （Moved Permanently）- 资源的URI已更改
- 303 （See Other）- 其他，如负载均衡
- 400 （bad request）- 指代坏请求
- 404 （not found）- 资源不存在
- 409 （conflict）- 通用冲突
- 500 （internal server error）- 通用错误响应
- 503 （Service Unavailable）- 服务端当前无法处理请求

下面我们来看一些实践中常见的问题:

- POST和PUT用于创建资源时有什么区别?

POST和PUT在创建资源的区别在于，所创建的资源的名称(URI)是否由客户端决定。 例如为我的博文增加一个java的分类，生成的路径就是分类名/categories/java，那么就可以采用PUT方法。不过很多人直接把POST、GET、PUT、DELETE直接对应上CRUD，例如在一个典型的rails实现的RESTful应用中就是这么做的。

我认为，这是因为rails默认使用服务端生成的ID作为URI的缘故，而不少人就是通过rails实践REST的，所以很容易造成这种误解。

- 客户端不一定都支持这些HTTP方法吧?

的确有这种情况，特别是一些比较古老的基于浏览器的客户端，只能支持GET和POST两种方法。

在实践上，客户端和服务端都可能需要做一些妥协。例如rails框架就支持通过隐藏参数_method=DELETE来传递真实的请求方法， 而像Backbone这样的客户端MVC框架则允许传递_method传输和设置X-HTTP-Method-Override头来规避这个问题。

- 统一接口是否意味着不能扩展带特殊语义的方法?

统一接口并不阻止你扩展方法，只要方法对资源的操作有着具体的、可识别的语义即可，并能够保持整个接口的统一性。

像WebDAV就对HTTP方法进行了扩展，增加了LOCK、UPLOCK等方法。而github的API则支持使用PATCH方法来进行issue的更新，例如:

```
PATCH /repos/:owner/:repo/issues/:number
```

不过，需要注意的是，像PATCH这种不是HTTP标准方法的，服务端需要考虑客户端是否能够支持的问题。

- 统一资源接口对URI有什么指导意义?

统一资源接口要求使用标准的HTTP方法对资源进行操作，所以URI只应该来表示资源的名称，而不应该包括资源的操作。

通俗来说，URI不应该使用动作来描述。例如，下面是一些不符合统一接口要求的URI:

- GET /getUser/1
- POST /createUser
- PUT /updateUser/1
- DELETE /deleteUser/1

如果GET请求增加计数器，这是否违反安全性?

安全性不代表请求不产生副作用，例如像很多API开发平台，都对请求流量做限制。像github，就会限制没有认证的请求每小时只能请求60次。

但客户端不是为了追求副作用而发出这些GET或HEAD请求的，产生副作用是服务端"自作主张"的。

另外，服务端在设计时，也不应该让副作用太大，因为客户端认为这些请求是不会产生副作用的。

- 直接忽视缓存可取吗?

即使你按各个动词的原本意图来使用它们，你仍可以轻易禁止缓存机制。 最简单的做法就是在你的HTTP响应里增加这样一个报头： Cache-control: no-cache。 但是，同时你也对失去了高效的缓存与再验证的支持(使用Etag等机制)。

对于客户端来说，在为一个REST式服务实现程序客户端时，也应该充分利用现有的缓存机制，以免每次都重新获取表示。

- 响应代码的处理有必要吗?

HTTP的响应代码可用于应付不同场合，正确使用这些状态代码意味着客户端与服务器可以在一个具备较丰富语义的层次上进行沟通。

例如，201（"Created"）响应代码表明已经创建了一个新的资源，其URI在Location响应报头里。

假如你不利用HTTP状态代码丰富的应用语义，那么你将错失提高重用性、增强互操作性和提升松耦合性的机会。

如果这些所谓的RESTful应用必须通过响应实体才能给出错误信息，那么SOAP就是这样的了，它就能够满足了。

### 1.4 资源的表述

上面提到，客户端通过HTTP方法可以获取资源，是吧? 不，确切的说，客户端获取的只是资源的表述而已。 资源在外界的具体呈现，可以有多种表述(或成为表现、表示)形式，在客户端和服务端之间传送的也是资源的表述，而不是资源本身。 例如文本资源可以采用html、xml、json等格式，图片可以使用PNG或JPG展现出来。

资源的表述包括数据和描述数据的元数据，例如，HTTP头"Content-Type" 就是这样一个元数据属性。

那么客户端如何知道服务端提供哪种表述形式呢?

答案是可以通过HTTP内容协商，客户端可以通过Accept头请求一种特定格式的表述，服务端则通过Content-Type告诉客户端资源的表述形式。

以github为例，请求某组织资源的json格式的表述形式:

![image-20221108163406411](https://i0.hdslb.com/bfs/album/f4c9f595588f15b10a5fea0ff5f542d2ae556340.png)

#### 1.4.1 在URI里边带上版本号

　下面我们来看一些实践上常见的设计:

有些API在URI里边带上版本号，例如:

- http://api.example.com/1.0/foo
- http://api.example.com/1.2/foo
- http://api.example.com/2.0/foo

如果我们把版本号理解成资源的不同表述形式的话，就应该只是用一个URL，并通过Accept头部来区分，还是以github为例，它的Accept的完整格式是:application/vnd.github[.version].param[+json]

对于v3版本的话，就是Accept: application/vnd.github.v3。对于上面的例子，同理可以使用使用下面的头部:

- Accept: vnd.example-com.foo+json; version=1.0
- Accept: vnd.example-com.foo+json; version=1.2
- Accept: vnd.example-com.foo+json; version=2.0

#### 1.4.2 使用URI后缀来区分表述格式

像rails框架，就支持使用/users.xml或/users.json来区分不同的格式。 这样的方式对于客户端来说，无疑是更为直观，但混淆了资源的名称和资源的表述形式。 我个人认为，还是应该优先使用内容协商来区分表述格式。

#### 1.4.3 如何处理不支持的表述格式

当服务器不支持所请求的表述格式，那么应该怎么办？若服务器不支持，它应该返回一个HTTP 406响应，表示拒绝处理该请求。下面以github为例，展示了一个请求XML表述资源的结果：

![image-20221108163547723](https://i0.hdslb.com/bfs/album/6050323726a28fe5a7449f56ab752aa9b732bb30.png)

### 1.5 资源的链接

我们知道REST是使用标准的HTTP方法来操作资源的，但仅仅因此就理解成带CURD的Web数据库架构就太过于简单了。

这种反模式忽略了一个核心概念："超媒体即应用状态引擎（hypermedia as the engine of application state）"。 超媒体是什么?

当你浏览Web网页时，从一个连接跳到一个页面，再从另一个连接跳到另外一个页面，就是利用了超媒体的概念：把一个个把资源链接起来.

要达到这个目的，就要求在表述格式里边加入链接来引导客户端。在《RESTful Web Services》一书中，作者把这种具有链接的特性成为连通性。下面我们具体来看一些例子。

下面展示的是github获取某个组织下的项目列表的请求，可以看到在响应头里边增加Link头告诉客户端怎么访问下一页和最后一页的记录。 而在响应体里边，用url来链接项目所有者和项目地址。

![image-20221108163612111](https://i0.hdslb.com/bfs/album/4c14385dbc630d2f69184f10ea6d1a54d7fc2d7a.png)

　　又例如下面这个例子，创建订单后通过链接引导客户端如何去付款。

![image-20221108163626264](https://i0.hdslb.com/bfs/album/97028d06e82cb78954ee2ce1007628bafa4f7c1a.png)

上面的例子展示了如何使用超媒体来增强资源的连通性。很多人在设计RESTful架构时，使用很多时间来寻找漂亮的URI，而忽略了超媒体。所以，应该多花一些时间来给资源的表述提供链接，而不是专注于"资源的CRUD"。

### 1.5 状态的转移

有了上面的铺垫，再讨论REST里边的状态转移就会很容易理解了。

不过，我们先来讨论一下REST原则中的无状态通信原则。初看一下，好像自相矛盾了，既然无状态，何来状态转移一说?

其实，这里说的无状态通信原则，并不是说客户端应用不能有状态，而是指服务端不应该保存客户端状态。

#### 1.5.1 应用状态与资源状态

实际上，状态应该区分应用状态和资源状态，客户端负责维护应用状态，而服务端维护资源状态。

客户端与服务端的交互必须是无状态的，并在每一次请求中包含处理该请求所需的一切信息。

服务端不需要在请求间保留应用状态，只有在接受到实际请求的时候，服务端才会关注应用状态。

这种无状态通信原则，使得服务端和中介能够理解独立的请求和响应。

在多次请求中，同一客户端也不再需要依赖于同一服务器，方便实现高可扩展和高可用性的服务端。

但有时候我们会做出违反无状态通信原则的设计，例如利用Cookie跟踪某个服务端会话状态，常见的像J2EE里边的JSESSIONID。

这意味着，浏览器随各次请求发出去的Cookie是被用于构建会话状态的。

当然，如果Cookie保存的是一些服务器不依赖于会话状态即可验证的信息（比如认证令牌），这样的Cookie也是符合REST原则的。

#### 1.5.2 应用状态的转移

状态转移到这里已经很好理解了， "会话"状态不是作为资源状态保存在服务端的，而是被客户端作为应用状态进行跟踪的。客户端应用状态在服务端提供的超媒体的指引下发生变迁。服务端通过超媒体告诉客户端当前状态有哪些后续状态可以进入。

这些类似"下一页"之类的链接起的就是这种推进状态的作用——指引你如何从当前状态进入下一个可能的状态。

## 02 业务分层

![image-20220620210337550](https://i0.hdslb.com/bfs/album/c94cdee3e81ad772ae369539d521741546e12fa3.png)

> M层可以替换为services文件夹，因为model文件夹存储数据库模型了

## 03 业务分层演示

### 3.1 原先代码的写法

![image-20221108162718013](https://i0.hdslb.com/bfs/album/40d5ee746688edfef2091335af113506b911402f.png)

`config/db.config.js`

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/ds')
//插入集合和数据,数据库ds2会自动创建

// 监听mongodb数据库的连接状态
// 绑定数据库连接成功事件
mongoose.connection.once('open', function () {
  console.log('连接成功')
})
// 绑定数据库连接失败事件
mongoose.connection.once('close', function () {
  console.log('数据库连接已经断开')
})
```

`model/UserModel.js`

```js
const mongoose = require('mongoose')

const userType = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
})

const UserModel = mongoose.model('UserModel', userType, 'users')

module.exports = UserModel
```

`app.js`

```js
var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
```

`routes/user.js`

```js
var express = require('express')
var router = express.Router()
const UserModel = require('../model/UserModel')

// 获取用户
router.get('/', (req, res) => {
  const { page, limit } = req.query
  UserModel
    .find({ $where: 'obj.username !== ""' })
    .sort({
      age: -1,
      name: -1,
    })
    .then(data => res.send(data))
})

// 添加用户
router.post('/', function (req, res, next) {
  const { username, password, age } = req.body
  new UserModel({ username, password, age }).save((err, docs) => {
     res.send({
       code: 200,
       data: {
         id: docs._id,
       },
     })
   })
})

// 修改用户
router.put('/:id', function (req, res, next) {
  const { username, password, age } = req.body
  UserModel
    .updateOne(
      {
        _id: req.params.id,
      },
      {
        username: '更新',
      },
    )
    .then(data => {
      res.send({
        ok: 1,
      })
    })
})

// 删除用户
router.delete('/:id', function (req, res, next) {
  const { username, password, age } = req.body
  UserModel
    .deleteOne({
      _id: req.params.id,
    })
    .then(data => {
      res.send({
        ok: 1,
      })
    })
})
module.exports = router
```

### 3.2 用业务分层修改代码

![image-20221108162652289](https://i0.hdslb.com/bfs/album/b778fe5909ab1a0b57c32562f16f7b67cb467e2c.png)

`config/db.config.js`、`model/UserModel.js`、`app.js`不变

`router/user.js`

```js
var express = require('express')
var router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getUser)

router.post('/', userController.addUser)

router.put('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)

module.exports = router
```

`controllers/userController.js`

```js
const userService = require('../services/userService')

const userController = {
  async getUser(req, res, next) {
    const { page, limit } = req.query
    let data = await userService.getUser(page, limit)
    res.send(data)
  },
  async addUser(req, res, next) {
    const { username, password, age } = req.body
    let data = await userService.addUser({ username, password, age })
    res.send(data)
  },
  async updateUser(req, res, next) {
    let data = await userService.updateUser(req.params.id)
    res.send(data)
  },
  async deleteUser(req, res, next) {
    let data = await userService.deleteUser(req.params.id)
    res.send(data)
  },
}

module.exports = userController
```

`services/userService.js`

```js
const userModel = require('../model/userModel')

const userService = {
  getUser(page, limit) {
    return userModel
      .find({}, { _id: 0 })
      .sort({
        age: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit)
  },
  addUser({ username, password, age }) {
    return userModel.create({
      username,
      password,
      age,
    })
  },
  updateUser(_id) {
    return userModel.updateOne(
      {
        _id,
      },
      {
        username: '更新',
      },
    )
  },
  deleteUser(_id) {
    return userModel.deleteOne({
      _id,
    })
  },
}

module.exports = userService
```





# d10 登录鉴权-Cookie

## 01 什么是认证（Authentication）

通俗地讲就是验证当前用户的身份，证明“你是你自己”（比如：你每天上下班打卡，都需要通过指纹打卡，当你的指纹和系统里录入的指纹相匹配时，就打卡成功）

互联网中的认证：
- 用户名密码登录
- 邮箱发送登录链接
- 手机号接收验证码
- 只要你能收到邮箱/验证码，就默认你是账号的主人

## 02 什么是授权（Authorization）

用户授予第三方应用访问该用户某些资源的权限
- 你在安装手机应用的时候，APP 会询问是否允许授予权限（访问相册、地理位置等权限）
- 你在访问微信小程序时，当登录时，小程序会询问是否允许授予权限（获取昵称、头像、地区、性别等个人信息）

实现授权的方式有：`cookie`、`session`、`token`、`OAuth`

## 03 什么是凭证（Credentials）

**实现认证和授权的前提是需要一种媒介（证书） 来标记访问者的身份**

> 在互联网应用中，一般网站（如掘金）会有两种模式，游客模式和登录模式。游客模式下，可以正常浏览网站上面的文章，一旦想要点赞/收藏/分享文章，就需要登录或者注册账号。当用户登录成功后，服务器会给该用户使用的浏览器颁发一个令牌（`token`），这个令牌用来表明你的身份，每次浏览器发送请求时会带上这个令牌，就可以使用游客模式下无法使用的功能。

## 04 什么是 Cookie

- **HTTP 是无状态的协议**（对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息）：每个请求都是完全独立的，服务端无法确认当前访问者的身份信息，无法分辨上一次的请求发送者和这一次的发送者是不是同一个人。所以服务器与浏览器为了进行会话跟踪（知道是谁在访问我），就必须主动的去维护一个状态，这个状态用于告知服务端前后两个请求是否来自同一浏览器。而这个状态需要通过 `cookie` 或者 `session` 去实现
- **cookie 存储在客户端**： cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
- **cookie 是不可跨域的**： 每个 cookie 都会绑定单一的域名，无法在别的域名下获取使用，**一级域名和二级域名之间是允许共享使用的**（靠的是 domain）。

| 属性                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `name=value`                                                 | 键值对，设置 `Cookie` 的名称及相对应的值，都必须是字符串类型。如果值为 Unicode 字符，需要为字符编码。如果值为二进制数据，则需要使用 `BASE64` 编码。 |
| `domain`                                                     | 指定 `cookie` 所属域名，默认是当前域名                       |
| `path`                                                       | 指定 cookie 在哪个路径（路由）下生效，默认是 '/'。           |
| 如果设置为 /abc，则只有 /abc 下的路由可以访问到该 cookie，如：/abc/read。 |                                                              |
| `maxAge`                                                     | cookie 失效的时间，单位秒。如果为整数，则该 cookie 在 maxAge 秒后失效。如果为负数，该 cookie 为临时 cookie ，关闭浏览器即失效，浏览器也不会以任何形式保存该 cookie 。如果为 0，表示删除该 cookie 。默认为 -1。- 比 expires 好用。 |
| `expires`                                                    | 过期时间，在设置的某个时间点后该 cookie 就会失效。           |
| 一般浏览器的 cookie 都是默认储存的，当关闭浏览器结束这个会话的时候，这个 cookie 也就会被删除 |                                                              |
| `secure`                                                     | 该 cookie 是否仅被使用安全协议传输。安全协议有 HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false。 |
| 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效 |                                                              |
| `httpOnly`                                                   | 如果给某个 cookie 设置了 httpOnly 属性，则无法通过 JS 脚本 读取到该 cookie 的信息，但还是能通过 Application 中手动修改 cookie，所以只是在一定程度上可以防止 XSS 攻击，不是绝对的安全 |

 **Cookie的特点**

1. cookie保存在浏览器本地，只要不过期关闭浏览器也会存在。
2. 正常情况下cookie不加密，用户可轻松看到
3. 用户可以删除或者禁用cookie
4. cookie可以被篡改
5. cookie可用于攻击
6. cookie存储量很小，大小一般是4k
7. 发送请求自动带上登录信息

## 05 Cookie的使用

1. 安装

```shell
pnpm install cookie-parser --save
```

2. 引入

```js
const cookieParser=require("cookie-parser");
```

3. 设置中间件

```js
app.use(cookieParser());
```

4. 设置cookie

```js
res.cookie("name",'zhangsan',{maxAge: 1000*60*60, httpOnly: true});
//res.cookie(名称,值,{配置信息})
```

5. 获取cookie

```js
req.cookies.name;
```


下面是一个基础实例：

```js
const express=require("express");
const cookieParser=require("cookie-parser");

var app=express();

//设置中间件
app.use(cookieParser());

app.get("/",function(req,res){
	res.send("首页");
});

//设置cookie
app.get("/set",function(req,res){
    //如果不进行任何设置,有效期默认为1个会话，浏览器关闭即失效
   // res.cookie('isLogin','true');
	res.cookie("userName",'张三',{maxAge: 1000*60*60, httpOnly: true});
	res.send("设置cookie成功");
});

//获取cookie
app.get("/get",function(req,res){
	console.log(req.cookies.userName);
	res.send("获取cookie成功，cookie为："+ req.cookies.userName);
});

app.listen(8080);
```


当访问set路由后会设置cookie，当访问get路由后会获取到设置的cookie值。当然你也可以在其他页面继续获取当前cookie，以实现cookie共享。cookie和session都可以在网页的响应头看到set-cookie

## 06 关于cookie加密

cookie加密是让客户端用户无法的获取cookie明文信息，是数据安全的重要部分；一般的我们可以在保存cookie时对cookie信息进行加密，或者在res.cookie中对option对象的signed属性设置设置成true即可。

```js
const express = require("express");
const cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser('secret'));//签名 （加密） 要指定秘钥 ，什么名字都星行，列如："xiaoxuesheng"

app.get("/",function(req,res){
	res.send("主页");
});

//获取cookie
app.use(function(req,res,next){
	console.log(req.signedCookies.name);
	next();
});

//设置cookie
app.use(function(req,res,next){
	console.log(res.cookie("name","zhangsan",{httpOnly: true,maxAge: 200000,signed: true}));
	res.end("cookie为："+req.signedCookies.name);
});

app.listen(8080);
```

## 07 使用 cookie 时需要考虑的问题

- 因为存储在客户端，容易被客户端篡改，使用前需要验证合法性
- 不要存储敏感数据，比如用户密码，账户余额
- 使用 httpOnly 在一定程度上提高安全性
- 尽量减少 cookie 的体积，能存储的数据量不能超过 4kb
- 设置正确的 domain 和 path，减少数据传输
- cookie 无法跨域
- 一个浏览器针对一个网站最多存 20 个Cookie，浏览器一般只允许存放 300 个Cookie
- 移动端对 cookie 的支持不是很好，而 session 需要基于 cookie 实现，所以移动端常用的是 token

## 08 什么是 Session

- 什么session?
  Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了session是一种特殊的cookie。cookie是保存在客户端的，而session是保存在服务端。
- 为什么要用session?
  由于cookie 是存在用户端，而且它本身存储的尺寸大小也有限，最关键是用户可以是可见的，并可以随意的修改，很不安全。那如何又要安全，又可以方便的全局读取信息呢？于是，这个时候，一种新的存储会话机制：session 诞生了。

![image-20220620212335597](https://i0.hdslb.com/bfs/album/dacfa03c50bd2e7d2225a7cd3e61291d5da00f63.png)

**session 认证流程：**

- 用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的 Session
- 请求返回时将此 Session 的唯一标识信息 SessionID 返回给浏览器
- 浏览器接收到服务器返回的 SessionID 信息后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名
- 当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。

> 根据以上流程可知，SessionID 是连接 Cookie 和 Session 的一道桥梁，大部分系统也是根据此原理来验证用户登录状态。

## 09 Cookie 和 Session 的区别

> 举一个例子
>
> - cookie就像去理发店办了张会员卡，下次去带会员卡（在响应头中设置cookie，以后改域名下每次请求的请求头都会附带cookie）
> - session就像去理发店办了张卡，但卡留在了那，记住卡号就行。

- **安全性**： Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的。
- **存取值的类型不同**：Cookie 只支持存字符串数据，想要设置其他类型的数据，需要将其转换成字符串，Session 可以存任意数据类型。
- **有效期不同**： Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效。
- **存储大小不同**： 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源。

## 10 Session 的使用

1. 安装express-session

```shell
pnpm install express-session --save
```

2. 引入express-session模块

```js
const session=require("express-session");
```

3. 设置session

```js
app.use(session(options));
```

主要方法 : session(options)

通过option来设置session存储，除了session ID外，session中的任何数据都不存储在cookie中。

**参数**

```js
 cookie: {
  // Cookie Options
  // 默认为{ path: '/', httpOnly: true, secure: false, maxAge: null }
   /** maxAge: 设置给定过期时间的毫秒数（date）
  * expires: 设定一个utc过期时间，默认不设置，http>=1.1的时代请使用maxAge代替之（string）
  * path: cookie的路径（默认为/）（string）
  * domain: 设置域名，默认为当前域（String）
  * sameSite: 是否为同一站点的cookie（默认为false）（可以设置为['lax', 'none', 'none']或 true）
  * secure: 是否以https的形式发送cookie（false以http的形式。true以https的形式）true 是默认选项。 但是，它需要启用 https 的网站。 如果通过 HTTP 访问您的站点，则不会设置 cookie。 如果使用的是 secure: true，则需要在 express 中设置“trust proxy”。
  * httpOnly: 是否只以http(s)的形式发送cookie，对客户端js不可用（默认为true，也就是客户端不能以document.cookie查看cookie）
  * signed: 是否对cookie包含签名（默认为true）
  * overwrite: 是否可以覆盖先前的同名cookie（默认为true）*/
  },
    
  // 默认使用uid-safe这个库自动生成id
  genid: req => genuuid(),  
    
  // 设置会话的名字，默认为connect.sid
  name: 'value',  
  
  // 设置安全 cookies 时信任反向代理（通过在请求头中设置“X-Forwarded-Proto”）。默认未定义（boolean）
  proxy: undefined,
    
  // 是否强制保存会话，即使未被修改也要保存。默认为true
  resave: true, 
    
  // 强制在每个响应上设置会话标识符 cookie。 到期重置为原来的maxAge，重置到期倒计时。默认值为false。
  rolling: false,
    
  // 强制将“未初始化”的会话保存到存储中。 当会话是新的但未被修改时，它是未初始化的。 选择 false 对于实现登录会话、减少服务器存储使用或遵守在设置 cookie 之前需要许可的法律很有用。 选择 false 还有助于解决客户端在没有会话的情况下发出多个并行请求的竞争条件。默认值为 true。
  saveUninitialized: true,
    
  // 用于生成会话签名的密钥,必须项  
  secret: 'secret',
  
  // 会话存储实例，默认为new MemoryStore 实例。
  store: new MemoryStore(),
  
  // 设置是否保存会话，默认为keep。如果选择不保存可以设置'destory'
  unset: 'keep'
```

**Api**

`req.session`

要存储或访问会话数据，只需使用请求属性 req.session，它以JSON的形式存储序列化，对JS开发非常友好。

如下列代码示例：

```js
const express=require("express");
const session=require("express-session");
const MongoStore = require("connect-mongo");

var app=express();

//配置中间件
//session会自带一个httpOnly
app.use(
  session({
    name: 'session-id',
    secret: "this is session", // 服务器生成 session 的签名
    resave: true,     //每次是否都刷新到期时间
    saveUninitialized: true, //强制将为初始化的 session 存储(该session_id是没有用的)
    cookie: {
      maxAge: 1000 * 60 * 10,// 过期时间
      secure: false, // 为 true 时候表示只有 https 协议才能访问cookie
    },
	//自动在mongodb中创建一个数据库存储session，并且过期时间也会同步刷新
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/ds2_session',
      ttl: 1000 * 60 * 10 // 过期时间
  }),
  })
);

// 授权中间件，在这个之后的路由，除了错误处理，都是需要授权的。
app.use((req, res, next) => {
  //排除login相关的路由和接口（因为login就不需要重定向到login了）
  if (req.url.includes("login")) {
    next()
    return
  }
  if (req.session.user) {
    //重新设置以下sesssion
    req.session.mydate = Date.now()//加这个设置才能访问刷新过期时间
    next()
  } else {
    //是接口, 就返回错误码
    //不是接口，就重定向（因为ajax请求是不能重定向的，只能前端接收错误码做处理）
    req.url.includes("api")
      ? res.status(401).json({ ok: 0 }) : res.redirect("/login")
  }
})

app.use('/login',function(req,res){
	//设置session
	req.session.userinfo='张三';
	res.send("登陆成功！");
});

app.use('/',function(req,res){
	//获取session
	if(req.session.userinfo){
		res.send("hello "+req.session.userinfo+"，welcome");
	}else{
		res.send("未登陆");
	}
});

app.listen(8080);
```

![image-20221108150424052](https://i0.hdslb.com/bfs/album/6351d283ba74996b94e380a564de7c868723cb8e.png)

**前端错误处理**

```js
      update.onclick=  ()=>{
        fetch("/api/user/6257ad33341e112715f25cb5",{
          method:"PUT",
          body:JSON.stringify({
            username:"修改的名字",
            password:"修改的密码",
            age:1 
          }),
          headers:{
            "Content-Type":"application/json"
          }
        }).then(res=>res.json()).then(res=>{
          console.log(res)
           //session验证失败会返回ok:0
          if(res.ok===0){
            location.href="/login"
          }
        })
      }
```

## 11 express-session 的其它用法

### 方法

1. .regenerate(callback)

要重新生成会话，只需调用该方法。 完成后，将在 req.session 处初始化一个新的 SID 和 Session 实例，并调用回调。

2. .destroy(callback)

销毁会话并取消设置 req.session 属性。 完成后，将调用回调。

3. **.**reload(callback)

从存储重新加载会话数据并重新填充 req.session 对象。 完成后，将调用回调。

4. .save(callback**)**

将会话保存回 store，用内存中的内容替换 store 上的内容。

如果会话数据已更改，则在 HTTP 响应结束时自动调用此方法。

在某些情况下调用此方法很有用，例如重定向、long-lived请求或在 WebSockets 中。

5. .touch()

更新 .maxAge 属性。 通常不需要调用，因为会话中间件会为您执行此操作。


以下演示通过销毁session的方式来退出登录

```js
app.use('/login',function(req,res){
	//设置session
	req.session.userinfo='张三';
	res.send("登陆成功！");
});

app.use('/loginOut',function(req,res){
	//注销session
	req.session.destroy(function(err){
		res.send("退出登录！"+err);
	});
});

app.use('/',function(req,res){
	//获取session
	if(req.session.userinfo){
		res.send("hello "+req.session.userinfo+"，welcome to index");
	}else{
		res.send("未登陆");
	}
});

app.listen(8080);
```

当我们进入到主页时，未显示任何信息，进入login路由后，自动设置session，这是回到主页则显示session信息，之后进入loginOut路由已注销session信息，再回到首页显示为`hello 张三, welcome to index`。

### 属性

1. .id

每个会话都有一个与之关联的唯一 ID。 该属性是 req.sessionID 的别名，不能修改。 添加它是为了使会话 ID 可从会话对象访问。

2. .cookie

每个会话都有一个唯一的 cookie 对象。 这允许您更改每个访问者的会话 cookie。 例如，我们可以将 req.session.cookie.expires 设置为 false 以使 cookie 仅在用户代理的持续时间内保留。

3. .Cookie.maxAge

req.session.cookie.maxAge 将返回以毫秒为单位的剩余时间，我们也可以调整 req.session.cookie.expires 属性，expires是返回Date()对象。安全性上说使用maxAge更好，过期时间是服务器给的，倒计时一过自动就没了。而expires是写死的时间，很容易修改浏览器的时间达到骗过有效期的目的。

4. .Cookie.originalMaxAge

属性返回会话 cookie 的原始 maxAge，以毫秒为单位。

5. req.sessionID

要获取已加载会话的 ID，请访问请求属性 req.sessionID。 这只是在加载/创建会话时设置的只读值。

### Store

前面提到服务器会保存session，那具体保存在哪里呢？在配置session选项中有个store，如果不指定的话，默认会使用new MemoryStore()保存在内存中。内存有个特点就是断电或服务器重启数据就没了，所以通常我们可以指定其他的store中间件来保存session，比如file-store，或是数据库redis等等。如果要查看默认的store的话，你可以提前先创建一个变量，当store有了名字，就可以后面使用store的api来调用了。

```js
const store = new MemoryStore() // 创建个MemoryStore实例
app.use(session({
    ...
    store
}))

app.use((req, res, next) => {
  store.get(req.sessionId, (err, session) => {
    // 这里就可以操作内存中的store数据了。
  })
})
```

### **store.all(callback)**

此可选方法用于将存储中的所有会话作为数组获取。 callback中第一个为error，第二个是sessions。

### **store.destroy(sid, callback)**

这个必需的方法用于在给定会话 ID (sid) 的情况下从存储中销毁/删除会话。 callback的对象为error。

### **store.clear([callback])**

此方法用于从存储中删除所有会话.callback的对象为error。

### **store.length(callback)**

此方法用于获取商店中所有会话的数量。 callback中第一个为error，第二个是len。

### **store.get(sid, callback)**

这个方法第一个参数为会话 ID (sid) 。 callback中第一个为error，第二个是session。

找不到不会错误，而是在session返回null 或 undefined。

### **store.set(sid, session, callback)**

这个方法用于新建或修改session 保存在store中。 callback的对象为error。

### **store.touch(sid, session, callback)**

这个方法用给定会话 ID (sid) 和会话 (session)来“touch”对应的session。callback的对象为error。

这主要用于当存储将自动删除空闲会话并且此方法用于向存储发出信号给定会话处于活动状态时，可能会重置空闲计时器。

## 12 什么是 Token（令牌）

### 12.1 Acesss Token

- 访问资源接口（API）时所需要的资源凭证
- 简单 token 的组成： uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）
- 特点：
  - 服务端无状态化、可扩展性好
  - 支持移动端设备
  - 安全
  - 支持跨程序调用
- `token` 的身份验证流程：

![image-20221107232241864](https://i0.hdslb.com/bfs/album/8ac75ad617c60df2eadc8ee51e25309f9bff4bd2.png)

1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名与密码
3. 验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端
4. 客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 localStorage 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 token
6. 服务端收到请求，然后去验证客户端请求里面带着的 token ，如果验证成功，就向客户端返回请求的数据

- 每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里
- 基于 token 的用户认证是一种服务端无状态的认证方式，服务端不用存放 token 数据。用解析 token 的计算时间换取 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库
- token 完全由应用管理，所以它可以避开同源策略

### 12.2 Refresh Token

- 另外一种 `token——refresh token`
- `refresh token` 是专用于刷新 access token 的 token。如果没有 refresh token，也可以刷新 access token，但每次刷新都要用户输入登录用户名与密码，会很麻烦。有了 refresh token，可以减少这个麻烦，客户端直接用 refresh token 去更新 access token，无需用户进行额外的操作。

![image-20221107232317906](https://i0.hdslb.com/bfs/album/3eae487e7388066531659df5637a0b6af29007b9.png)

- `Access Token` 的有效期比较短，当 Acesss Token 由于过期而失效时，使用 Refresh Token 就可以获取到新的 Token，如果 Refresh Token 也失效了，用户就只能重新登录了。
- `Refresh Token` 及过期时间是存储在服务器的数据库中，只有在申请新的 Acesss Token 时才会验证，不会对业务接口响应时间造成影响，也不需要向 Session 一样一直保持在内存中以应对大量的请求。

### 12.3 Token 和 Session 的区别

- `Session` 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。而 Token 是令牌，访问资源接口（API）时所需要的资源凭证。`Token` 使服务端无状态化，不会存储会话信息。
- `Session` 和 `Token` 并不矛盾，作为身份认证 Token 安全性比 Session 好，因为每一个请求都有签名还能防止监听以及重放攻击，而 Session 就必须依赖链路层来保障通讯安全了。如果你需要实现有状态的会话，仍然可以增加 Session 来在服务器端保存一些状态。
- 所谓 Session 认证只是简单的把 User 信息存储到 Session 里，因为 SessionID 的不可预测性，暂且认为是安全的。而 Token ，如果指的是 OAuth Token 或类似的机制的话，提供的是 认证 和 授权 ，认证是针对用户，授权是针对 App 。其目的是让某 App 有权利访问某用户的信息。这里的 Token 是唯一的。不可以转移到其它 App上，也不可以转到其它用户上。Session 只提供一种简单的认证，即只要有此 SessionID ，即认为有此 User 的全部权利。是需要严格保密的，这个数据应该只保存在站方，不应该共享给其它网站或者第三方 App。所以简单来说：如果你的用户数据可能需要和第三方共享，或者允许第三方调用 API 接口，用 Token 。如果永远只是自己的网站，自己的 App，用什么就无所谓了。

## 13 什么是 JWT

### 13.1 简介

- JSON Web Token（简称 JWT）是目前最流行的跨域认证解决方案。
- 是一种认证授权机制。
- JWT 是为了在网络应用环境间传递声明而执行的一种基于 JSON 的开放标准（RFC 7519）。JWT 的声明一般被用来在身份提供者和服务提供者间传递被认证的- 用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上。
- 可以使用 HMAC 算法或者是 RSA 的公/私秘钥对 JWT 进行签名。因为数字签名的存在，这些传递的信息是可信的。

**JWT 认证流程：**

 首先，前端通过Web表单将自己的用户名和密码发送到后端的接口，这个过程一般是一个POST请求。建议的方式是通过SSL加密的传输(HTTPS)，从而避免敏感信息被嗅探
后端核对用户名和密码成功后，将包含用户信息的数据作为JWT的Payload，将其与JWT Header分别进行Base64编码拼接后签名，形成一个JWT Token，形成的JWT Token就是一个如同lll.zzz.xxx的字符串
后端将JWT Token字符串作为登录成功的结果返回给前端。前端可以将返回的结果保存在浏览器中，退出登录时删除保存的JWT Token即可
前端在每次请求时将JWT Token放入HTTP请求头中的Authorization属性中(解决XSS和XSRF问题)
后端检查前端传过来的JWT Token，验证其有效性，比如检查签名是否正确、是否过期、token的接收方是否是自己等等
验证通过后，后端解析出JWT Token中包含的用户信息，进行其他逻辑操作(一般是根据用户信息得到权限等)，返回结果

![jwt](https://img-blog.csdnimg.cn/img_convert/900b3e81f832b2f08c2e8aabb540536a.png)

### 13.2 Token 和 JWT 的区别

**相同：**

- 都是访问资源的令牌
- 都可以记录用户的信息
- 都是使服务端无状态化
- 都是只有验证成功后，客户端才能访问服务端上受保护的资源

**区别：**

- **Token**：服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户信息，然后验证 Token 是否有效。
- **JWT**： 将 Token 和 Payload 加密后存储于客户端，服务端只需要使用密钥解密进行校验（校验也是 JWT 自己实现的）即可，不需要查询或者减少查询数据库，因为 JWT 自包含了用户信息和加密的数据。

## 14 为什么要用JWT?

**传统Session认证的弊端**

我们知道HTTP本身是一种无状态的协议，这就意味着如果用户向我们的应用提供了用户名和密码来进行用户认证，认证通过后HTTP协议不会记录下认证后的状态，那么下一次请求时，用户还要再一次进行认证，因为根据HTTP协议，我们并不知道是哪个用户发出的请求，所以为了让我们的应用能识别是哪个用户发出的请求，我们只能在用户首次登录成功后，在服务器存储一份用户登录的信息，这份登录信息会在响应时传递给浏览器，告诉其保存为cookie，以便下次请求时发送给我们的应用，这样我们的应用就能识别请求来自哪个用户了，这是传统的基于session认证的过程。

![session](https://img-blog.csdnimg.cn/img_convert/29cfe2cc7bd13bc659227e62c3e89063.png)

**然而，传统的session认证有如下的问题：**

- 每个用户的登录信息都会保存到服务器的session中，随着用户的增多，服务器开销会明显增大
- 由于session是存在与服务器的物理内存中，所以在分布式系统中，这种方式将会失效。虽然可以将session统一保存到Redis中，但是这样做无疑增加了系统的复杂性，对于不需要redis的应用也会白白多引入一个缓存中间件
- 对于非浏览器的客户端、手机移动端等不适用，因为session依赖于cookie，而移动端经常没有cookie
- 因为session认证本质基于cookie，所以如果cookie被截获，用户很容易收到跨站请求伪造攻击。并且如果浏览器禁用了cookie，这种方式也会失效
- 前后端分离系统中更加不适用，后端部署复杂，前端发送的请求往往经过多个中间件到达后端，cookie中关于session的信息会转发多次
- 由于基于Cookie，而cookie无法跨域，所以session的认证也无法跨域，对单点登录不适用

**JWT认证的优势**

对比传统的session认证方式，JWT的优势是：

- 简洁：JWT Token数据量小，传输速度也很快
- 因为JWT Token是以JSON加密形式保存在客户端的，所以JWT是跨语言的，原则上任何web形式都支持
- 不需要在服务端保存会话信息，也就是说不依赖于cookie和session，所以没有了传统session认证的弊端，特别适用于分布式微服务
- 单点登录友好：使用Session进行身份认证的话，由于cookie无法跨域，难以实现单点登录。但是，使用token进行认证的话， token可以被保存在客户端的任意位置的内存中，不一定是cookie，所以不依赖cookie，不会存在这些问题
- 适合移动端应用：使用Session进行身份认证的话，需要保存一份信息在服务器端，而且这种方式会依赖到Cookie（需要 Cookie 保存 SessionId），所以不适合移动端

> 因为这些优势，目前无论单体应用还是分布式应用，都更加推荐用JWT token的方式进行用户认证

## 15 jwt 应用

**封装方法**

![image-20220623101216020](https://i0.hdslb.com/bfs/album/b07414b5443ea2bf58e79e626686508cbd478f8e.png)

```js
//jsonwebtoken 封装
const jwt = require("jsonwebtoken")
const secret = "dselegent"

const JWT = {
    //生成签名
    //expiresIn是过期时间，例'24h'
	//value是要传入的数据
    generate(value,expiresIn){
        return jwt.sign(value,secret,{expiresIn})
    },
    verify(token){
        try{
            return jwt.verify(token,secret)//返回的是解析后的token，原始数据+自带的数据构成的对象
        }catch(e){
            return false//通过上面按个方法会自动解出是否过期，可是会报错，所以用try-catch
        }
    }
}

module.exports = JWT
```

**router/login.js**

```js
  async login(req, res, next) {
    const { username, password } = req.body;

    let data = await userService.login({ username, password });//存储数据库
     //因为存储成功返回的data对象并不是简单的对象，不能直接用，只能取出要用的值
    if (data) {
      const token = jwt.generate({
        id:data._id,
        username:data.username
      },"10s")
      res.header("Authorization",token)//将token设置到响应头
      res.send({ok: 1});
    }
  }
```

**login.html**

```html
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
       //拦截器，
       axios.interceptors.request.use(function (config) {
            // console.log("请求发出前，执行的方法")
            // Do something before request is sent
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        axios.interceptors.response.use(function (response) {
          console.log(response);
            // console.log("请求成功后 ，第一个调用的方法")
            const {authorization } = response.headers
            authorization && localStorage.setItem("token",authorization)
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    </script>
        用户名:
        <input id="username" />
      <div>
        密码:
        <input type="password" id="password" />
      </div>
      <div><button id="login">登录</button></div>

    <script>
      var username = document.querySelector('#username');
      var password = document.querySelector('#password');
      var login = document.querySelector('#login');

      login.onclick = () => {
        axios.post("/users/login", {
                username: username.value,
                password: password.value,
            }).then(res => {
                console.log(res.data)
                if (res.data.ok === 1) {
                    //存储token
                    location.href = "/"
                } else {
                    alert("用户名密码不匹配")
                }
            })
      };
    </script>
```

**需要token才能进入的页面**

```ejs
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
  //拦截器，
  axios.interceptors.request.use(function (config) {
     //携带token
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    console.log(response);
    const {authorization} = response.headers
    //这里是如果有新的token返回（说明这次发请求的没有过期），就重新设置
    //如果过期了，后端会发错误码，前端处理重定向登录
    authorization && localStorage.setItem("token", authorization)
    return response;
  }, function (error) {
    if(error.response.status===401){
      localStorage.removeItem("token")
      location.href = "/login"
    }
    return Promise.reject(error);
  });
</script>

<body>
<div>
  <div>
    用户名:
    <input id="username" />
  </div>
  <div>
    密码:
    <input type="password" id="password" />
  </div>
  <div>
    年龄:
    <input type="number" id="age" />
  </div>

  <div>
    <button id="loginpost">注册</button>
  </div>
  <div>
    <button id="update">更新</button>
  </div>
  <div>
    <button id="delete">删除</button>
  </div>
</div>

<table border="1">
  <thead>
    <tr>
      <th>名字</th>
      <th>年龄</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
<script>
  var register = document.querySelector('#loginpost');
  var username = document.querySelector('#username');
  var password = document.querySelector('#password');
  var age = document.querySelector('#age');
  let tbody = document.querySelector('tbody');

  register.onclick = () => {
    axios.post("/users", {
    username: username.value,
    password: password.value,
    age: age.value
  }).then(res => {
    console.log(res.data)
  })
  };

    axios.get("/users?page=1&limit=10").then(res => {
  res = res.data
  var tbody = document.querySelector("tbody")
  tbody.innerHTML = res.map(item => `
  <tr>
      <td>${item.username}</td>
      <td>${item.age}</td>
    </tr>`).join("")
})
    //退出登录
     exit.onclick = () => {
   localStorage.removeItem("token")
   location.href = "/login"
 }
</script>
```

**token处理中间件**

```js
//node中间件校验
app.use((req,res,next)=>{
  // 如果token有效 ,next() 
  // 如果token过期了, 返回401错误
  if(req.url==="/login"){
    next()
    return;
  }
	//Authorization会变成authorization
    //链判断运算符如果？前面判断为真就会继续执行后面的，判断为假就不会执行后面
    //这里因为如果没有token，前面是undefined,去使用undefined是会报错的
    
    //如果有token就验证，没token就通过
    //(直接访问/能通过，但是有个那个页面自动获取数据的axios，在那里就会发送authorization请求头，进入token验证)
  const token = req.headers["authorization"]?.split(" ")[1]
  if(token){
    var payload = JWT.verify(token)
     //验证成功就生成一个新token重置有效时间，
    // 验证失败就返回错误码让前端跳到登录页
    if(payload){
      const newToken = JWT.generate({
        id:payload.id,
        username:payload.username
      },"1d")
      res.header("Authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }
})

```

# d11 跨域

## 01 什么是跨域

跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制。浏览器从一个域名的网页去请求另一个域名的资源时，出现域名、端口、协议任一不同，都属于跨域。

同源策略限制了以下行为：

- Cookie、LocalStorage 和 IndexDB 无法读取

- DOM 和 JS 对象无法获取

- Ajax请求发送不出去


下面举个例子：

```ruby
http://www.yyy.cn/index.html 调用 http://www.xxxyyy.cn/server.php 非跨域

http://**www.xxxyyy.cn**/index.html 调用  http://**www.xxx.cn**/server.php  跨域,主域不同

http://**abc**.xxxyyy.cn/index.html 调用  http://**def**.xxx.cn/server.php  跨域,子域名不同

http://www.xxx.cn:**8080**/index.html 调用  http://www.xxx.cn/server.php  跨域,端口不同

**https**://www.xxx.cn/index.html 调用  **http**://www.xxx.cn/server.php  跨域,协议不同
```

## 02 跨域资源共享CORS

这是目前主流的解决方案。

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。 它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。IE8+：IE8/9需要使用XDomainRequest对象来支持CORS。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。 因此，实现CORS通信的关键是**服务器**。

基本只需要对**服务器**动手脚，前端代码跟同源时一样，也就是不跨域时一样。

**这种方式分为两种请求：**

**一种是简单请求，另一种是非简单请求。只要满足下面条件就是简单请求**

请求方式为HEAD、POST 或者 GET

http头信息不超出以下字段：

```dart
Accept、Accept-Language 

Content-Language

Last-Event-ID

Content-Type(限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain)
```

为什么要分为简单请求和非简单请求，因为浏览器对这两种请求方式的处理方式是不同的。

### 2.1 简单请求

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。 下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。

```cpp
GET /cors HTTP/1.1

Origin: http://api.bob.com

Host: api.alice.com

Accept-Language: en-US

Connection: keep-alive

User-Agent: Mozilla/5.0

...
```

Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。 浏览器发现，这个响应头信息没有包含Access-Control-Allow-Origin字段，就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。

注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。

如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段：

```dart
  Access-Control-Allow-Origin: http://api.bob.com

  Access-Control-Allow-Credentials: true

  Access-Control-Expose-Headers: FooBar

  Content-Type: text/html; charset=utf-8
```

上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头

**Access-Control-Allow-Origin **:该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求

**Access-Control-Allow-Credentials**: 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

**Access-Control-Expose-Headers**:该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。

**withCredentials 属性**

上面说到，CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。

另一方面，开发者必须在AJAX请求中打开withCredentials属性。

```js
var xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容

// 前端设置是否带cookie

xhr.withCredentials = true;

xhr.open('post', 'http://www.domain2.com:8080/login', true);

xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

xhr.send('user=admin');

xhr.onreadystatechange = function() {

    if (xhr.readyState == 4 && xhr.status == 200) {

        alert(xhr.responseText);

    }

};
```

```js
// jquery
$.ajax({
        ...
       xhrFields: {
             withCredentials: true    // 前端设置是否带cookie
       },
       crossDomain: true,  // 会让请求头中包含跨域的额外信息，但不会含cookie
        ...
});
```

否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。 但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。

**需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号\*，必须指定明确的、与请求网页一致的域名。**同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

### 2.2 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）——浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

```csharp
var url = 'http://api.alice.com/cors';

var xhr = new XMLHttpRequest();

xhr.open('PUT', url, true);

xhr.setRequestHeader('X-Custom-Header', 'value');

xhr.send();
```

浏览器发现，这是一个非简单请求，就自动发出一个"**预检**"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的HTTP头信息。



```cpp
  OPTIONS /cors HTTP/1.1

  Origin: http://api.bob.com

  Access-Control-Request-Method: PUT

  Access-Control-Request-Headers: X-Custom-Header

  Host: api.alice.com

  Accept-Language: en-US

  Connection: keep-alive

  User-Agent: Mozilla/5.0...
```

"预检"请求用的请求方法是**OPTIONS**，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。

除了Origin字段，"预检"**请求头**信息包括两个特殊字段。

Access-Control-Request-Method：该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。

Access-Control-Request-Headers：该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header

**预检请求的回应**

服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应

```dart
HTTP/1.1 200 OK

Date: Mon, 01 Dec 2008 01:15:39 GMT

Server: Apache/2.0.61 (Unix)

Access-Control-Allow-Origin: http://api.bob.com

Access-Control-Allow-Methods: GET, POST, PUT

Access-Control-Allow-Headers: X-Custom-Header

Content-Type: text/html; charset=utf-8

Content-Encoding: gzip

Content-Length: 0

Keep-Alive: timeout=2, max=100

Connection: Keep-Alive

Content-Type: text/plain
```

上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出报错信息。

服务器回应的其他CORS相关字段如下：

```bash
Access-Control-Allow-Methods: GET, POST, PUT

Access-Control-Allow-Headers: X-Custom-Header

Access-Control-Allow-Credentials: true

Access-Control-Max-Age: 1728000
```

Access-Control-Allow-Methods：该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

Access-Control-Allow-Headers：如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

Access-Control-Allow-Credentials： 该字段与简单请求时的含义相同。

Access-Control-Max-Age： 该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

**浏览器正常请求回应**

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。

```csharp
PUT /cors HTTP/1.1

Origin: http://api.bob.com

Host: api.alice.com

X-Custom-Header: value

Accept-Language: en-US

Connection: keep-alive

User-Agent: Mozilla/5.0...
```

浏览器的正常CORS请求。上面头信息的Origin字段是浏览器自动添加的。下面是服务器正常的回应。

```dart
Access-Control-Allow-Origin: http://api.bob.com

Content-Type: text/html; charset=utf-8
```

Access-Control-Allow-Origin字段是每次回应都必定包含的

## 03 Nodejs 跨域处理

### 3.1 设置允许域名跨域

-  设置允许所有域名跨域

```js
var express = require('express');
var app = express();
 
// 设置允许所有域名跨域：
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
```

- 设置允许多个域名跨域：

```javascript
app.all("*",function(req,res,next){
  var orginList=[
      "http://www.bibi.com",
      "http://www.qq.com",
      "http://www.baidu.com"
  ]
  // 防止undefined 报错
  if(!req.headers.origin){
    return
  }
   if(orginList.includes(req.headers.origin.toLowerCase())){
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin",req.headers.origin);
        if (req.method.toLowerCase() == 'options'){
          res.sendStatus(200);  //让options尝试请求快速结束
        }
        else{
          next();
        }
    } else {
      res.sendStatus(500)
    }
})
```

### 3.2 利用中间件 cors

安装 npm i cors -S

使用方式一 ： 为所有源启用跨域

```js
const  cors = require('cors')
 app.use(cors())
 app.listen(8000, function () {
   console.log('start')
 })
```

使用方式二 ： 按条件配置

```js
 var express = require('express')
 var cors = require('cors')
 var app = express()
 var whitelist = ['http://example1.com', 'http://example2.com']
//  异步配置
  var corsOptions;
 var corsOptionsDelegate = function (req, callback) {
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true} //在CORS响应中反映(启用)请求的起源
  } else {
     corsOptions = { origin: false} // 拦截请求
  }
  callback(null, corsOptions) //  error  options
}

 app.all("*", cors(corsOptionsDelegate), function (req, res, next) {
 if(corsOptions.origin  === true){
    if (req.method.toLowerCase() == 'options'){
      res.sendStatus(200);  //让options尝试请求快速结束
     }
     else{
      next();
     }
   } else {
    res.sendStatus(500); //被拦截
   }
 })
  app.post('/cors',(req,res)=> {
  res.send('ok')
})
 app.listen(8000, function () {
   console.log('start')
 })
```

# d12 文件上传

## 01 初始化准备

### 1.1 安装依赖

首先创建一个`express-multer-upload`工程项目，然后在项目中下好各种依赖包。

**multer中间件**

Multer 是一个 node.js 中间件，用于处理 `multipart/form-data` 类型的表单数据，它主要用于上传文件。

**注意**: Multer 不会处理任何非 `multipart/form-data` 类型的表单数据。

下面是我下载的依赖以及版本。

![image-20221231143824464](https://i0.hdslb.com/bfs/album/b61fccbd8e385d376270ad9ba3a8bf7e77a260e5.png)

### 1.2  项目结构划分

本着以比较规范的形式去完成这个项目，所以有必要进行合理的项目结构划分。如下：

![image-20221231144220130](https://i0.hdslb.com/bfs/album/fae1b84fb6e88e92b54428a9ba2fd93b0ad4680a.png)

## 02 multer上传逻辑

### 2.1 multer配置

在 multer 目录下创建 **multerConfig.js**，编写如下代码：

- 引入依赖
- 封装处理路径函数
- 设置 multer 的配置对象
- 为 multer 添加配置

```js
// 1. 引入依赖
const multer = require('multer')
const path = require('path') 

// 2. 封装处理路径函数
const handlePath = (dir) => {
  return path.join(__dirname, './', dir)
}

// 3. 设置 multer 的配置对象
const storage = multer.diskStorage({
  // 3.1 存储路径
  destination: function(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype==='image/gif') {
      cb(null, handlePath('../../public'))
    } else {
      cb({ error: '仅支持 jpg/png/gif 格式的图片！' })
    }
  },
  //  3.2 存储名称
  filename: function (req, file, cb) {
    // 将图片名称分割伪数组，用于截取图片的后缀
    const fileFormat = file.originalname.split('.')
    // 自定义图片名称
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

// 4. 为 multer 添加配置
const multerConfig = multer({
  storage: storage,
  limits: { fileSize: 2097152 } // 2M
})

module.exports = multerConfig
```

在该配置中可以设置文件保存的地址、文件名称、限制上传的文件格式、文件大小

### 2.2 upload上传逻辑

在 multer 目录下创建 **upload.js**，编写如下代码：

```js
// 引入配置好的 multerConfig
const multerConfig = require('./multerConfig')

// 上传到服务器地址
const BaseURL = 'http://localhost:3001' 
// 上传到服务器的目录
const imgPath = '/public/'

// 封装上传图片的接口
function uploadAvatar(req, res) {
  return new Promise((resolve, reject) => {
    multerConfig.single('file')(req, res, function (err) {
      if (err) {
        // 传递的图片格式错误或者超出文件限制大小，就会reject出去
        reject(err)
      } else {
        // 拼接成完整的服务器静态资源图片路径
        resolve(BaseURL + imgPath + req.file.filename)
      }
    })
  })
}

module.exports = uploadAvatar
```

上述代码主要是封装了一个上传文件的方法，当图片上传成功时就将拼接好的图片链接 `resolve` 出去。该方法会在控制器中被调用。

注意：上面的 `multerConfig.single('file')` 表示单文件上传，并且字段名为 "file"，后面上传图片的字段必须保持一致

## 03 编写控制器，定义路由

### 3.1 编写控制器

在 controllers 目录下创建 **UserController.js**，编写如下代码：

```js
const uploadAvatar = require('../multer/upload')

// 用户的逻辑控制器
const UserController = {
  // 头像图片上传
  async upload(req, res) {
    try {
      const uploadRes = await uploadAvatar(req, res)
      res.send({
        meta: { code: 200, msg: '上传成功！' },
        data: { img_url: uploadRes}
      })
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = UserController
```

上述代码主要是编写了一个用户控制器类 `UserController`，以及一个图片上传的方法 `upload`。

在 `upload` 中调用了上传图片的接口 `uploadAvatar`，得到成功或失败的结果，在响应给客户端。

### 3.2 定义路由

1. 在 routers 目录下创建 **index.js**，编写如下代码：

```js
const express = require('express')

// 导入用户逻辑
const userController = require('../controllers/UserController')

// 创建路由对象
const router = express.Router()

// 设置路由
router.post('/upload/avatar', userController.upload)

// 导入路由对象
module.exports = router
```

2. 定义了路由之后还需要在 **app.js** 中注册路由，添加如下代码：

```js
// 导入定义的路由
const router = require('./src/routers/index')

// 注册路由
app.use('/user', router)
```

在 app.js 中，增加上面两行代码即可完成路由注册

## 04 上传图片

接下来进入测试环节，借助 postman 工具进行测试

![image-20221231144808803](https://i0.hdslb.com/bfs/album/67de24fa073b3e001ef3b10e55a0d1ef2f359fe4.png)

可以看到，成功的拿到了响应的数据，里面也包含了图片的链接地址

注意点：

- 表单必须是 form-data 格式
- 文件的字段必须与后端保持一致

## 05 图片名称优化

由于这是一个用户上传头像图片的功能，当用户第二次上传头像时，需要将原先的图片删除掉，否则旧的图片会一直保存在服务器中。

一开始的想法是使用用户id作为图片名称，这样每一次上传图片，都会把原来的图片覆盖掉。但是这样会有两个问题

- 不同格式的图片会残留（jpg、png、gif），不会被覆盖掉
- 如果可以覆盖，但是图片链接地址不会有变化，存入数据库时也是跟上一次的图片地址是相同的，这样会导致前端页面不会根据静态资源中头像图片变化而变化

所以这里采用的做法是先对图片的名称进行拼接优化，改为如下的形式：

```bash
时间戳.用户id.jpg
```

这样既能保证每一张图片都不重复，而且还附带了用户的id

注：可以使用 md5 对时间戳进行加密，以确保唯一性。这里为了方便就直接使用时间戳。

## 06 图片名称优化实现

这个过程其实就是删除旧图片，重命名新图片为规定的格式，可以编写一个函数来实现。

### 6.1 图片去重删除和重命名

- 查找指定路径下的所有图片文件，进行遍历
- 先查询该id命名的文件是否存在，存在则删除
- 根据新存入的文件名(时间戳.jpg)，找到对应文件，然后重命名为: `时间戳.id.jpg`

在**upload.js**，编写如下代码：

```js
const fs = require('fs')

// 对图片进行去重删除和重命名
const hanldeImgDelAndRename = (id, filename, dirPath) => {
  // TODO 查找该路径下的所有图片文件
  fs.readdir(dirPath, (err, files) => {
    for (let i in files) {
      // 当前图片的名称
      const currentImgName = path.basename(files[i])
      // 图片的名称数组：[时间戳, id, 后缀]
      const imgNameArr = currentImgName.split('.')

      // TODO 先查询该id命名的文件是否存在，有则删除
      if (imgNameArr[1] === id) {
        const currentImgPath = dirPath + '/' + currentImgName
        fs.unlink(currentImgPath, (err) => { })
      }

      // TODO 根据新存入的文件名(时间戳.jpg)，找到对应文件，然后重命名为: 时间戳.id.jpg
      if (currentImgName === filename) {
        const old_path = dirPath + '/' + currentImgName
        const new_path = dirPath + '/' + imgNameArr[0] + '.' + id  + path.extname(files[i])
        // 重命名该文件
        fs.rename(old_path, new_path, (err) => { })
      }
    }
  })
}
```

函数执行过程分析：

1. 该函数主要调用了 `fs` 内置模块中的 `readdir` 进行指定路径查询文件，再进行遍历
2. 将图片名称分割为数组，取出id与传入的id进行判断，符合条件则调用 `fs` 内置模块中的 `fs.unlink()` 方法删除文件
3. 根据新存入的文件名(时间戳.jpg)，找到对应文件，然后重命名为: `时间戳.id.jpg`。然后调用 `fs` 内置模块中的 `fs.rename()` 方法重命名文件

### 6.2 修改 uploadAvatar 接口

完成图片去重删除和重命名 `hanldeImgDelAndRename` 方法后，还需要在 **upload.js** 中原先的上传接口方法 `uploadAvatar` 中进行调用，修改为如下代码：

```js
const path = require('path')
// 封装处理路径函数
const handlePath = (dir) => {
  return path.join(__dirname, './', dir)
}

// 上传接口的 请求参数req  响应参数res
function uploadAvatar(req, res) {
  return new Promise((resolve, reject) => {
    multerConfig.single('file')(req, res, function (err) {
      if (err) {
        reject(err)
      } else {
        // 对图片进行去重删除和重命名
        hanldeImgDelAndRename(req.body.id, req.file.filename, handlePath('../../public'))
        const img = req.file.filename.split('.')
        resolve({
          id: req.body.id,
          // 重新返回符合规定的图片链接地址
          img_url: BaseURL + imgPath + img[0] + '.' + req.body.id + '.' + img[1]
        })
      }
    })
  })
}
```

注意：在上传文件时，必须携带 id 字段，这样 `req.body.id` 才能获取到传入的 id。

## 07 最终测试

### 7.1 第一次上传

![image-20221231145520966](https://i0.hdslb.com/bfs/album/091fb78bd9060b86acfb97692aac08896e7145cf.png)

可以看到，图片上传成功，并且图片的名称也是按照我们的规定进行拼接，后端服务器也成功保存了上传的图片。

![image-20221231145533537](https://i0.hdslb.com/bfs/album/c9b36c3e07689163cdf719f27613600efc655764.png)

### 7.2 第二次上传

![image-20221231145555139](https://i0.hdslb.com/bfs/album/f8cc5e1e10251493e090ee2030861d3d279c7bed.png)

第二次上传，成功的将相同 id 的旧图片进行了删除，并且重命名了图片名称。

###  7.3 第三次上传

这里还可以上传不同 id 以表示不同用户上传头像来进行测试，如下：

![image-20221231145616872](https://i0.hdslb.com/bfs/album/7fcff0c72d96af7a77e65901326d43e211c58635.png)

可以看到，不同 id 之间上传的图片是互不干扰的，只有当 id 匹配时才会进行替换和重命名。

最后只需要在控制器当中，把获取到的图片链接地址保存到数据库即可，这里可以根据用户 id 进行保存。

## 08 ajax上传

```      html
<div class="ajax">
  <p>ajax上传</p>
  <form>
    <input type="text" name="username" />
    <input type="password" name="password" />
    <input type="file" name="avatar" />
    <button type="button">上传</button>
  </form>
  <img />
</div>

<script>
  let btn = document.querySelector('.ajax [type=button]');
  var username = document.querySelector('.ajax [name=username]');
  var password = document.querySelector('.ajax [name=password]');
  var avatar = document.querySelector('.ajax [name=avatar');

  avatar.addEventListener('change', () => {
    // 创建预览地址
    let httpUrl = window.webkitURL.createObjectURL(new Blob(avatar.files));
    document.querySelector('img').src = httpUrl;
  });

  btn.addEventListener('click', () => {
    // 要处理成表单对象上传
    const formsdata = new FormData();
    formsdata.append('username', username.value);
    formsdata.append('password', password.value);
    // 追加name值，和文件对象
    formsdata.append('avatar', avatar.files[0]);

    axios
      .post('/user/upload/avatar', formsdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    })
      .then(res => {
      document.querySelector('img').src = res.data.imgPath;
    });
  });
</script>
```
