# JavaScript 进阶 - 第1天

> 学习作用域、变量提升、闭包等语言特征，加深对 JavaScript 的理解，掌握变量赋值、函数声明的简洁语法，降低代码的冗余度。

- 理解作用域对程序执行的影响
- 能够分析程序执行的作用域范围
- 理解闭包本质，利用闭包创建隔离作用域
- 了解什么变量提升及函数提升
- 掌握箭头函数、解析剩余参数等简洁语法

# d1  作用域

> 了解作用域对程序执行的影响及作用域链的查找机制，使用闭包函数创建隔离作用域避免全局变量污染。

作用域（scope）规定了变量能够被访问的“范围”，离开了这个“范围”变量便不能被访问，作用域分为全局作用域和局部作用域。

### 01  局部作用域

局部作用域分为函数作用域和块作用域。

#### A   函数作用域

在函数内部声明的变量只能在函数内部被访问，外部无法直接访问。

```html
<script>
  // 声明 counter 函数
  function counter(x, y) {
    // 函数内部声明的变量
    const s = x + y
    console.log(s) // 18
  }
  // 设用 counter 函数
  counter(10, 8)
  // 访问变量 s
  console.log(s)// 报错
</script>
```

总结：

1. 函数内部声明的变量，在函数外部无法被访问
2. 函数的参数也是函数内部的局部变量
3. 不同函数内部声明的变量无法互相访问
4. 函数执行完毕后，函数内部的变量实际被清空了

#### B  块级作用域

在 JavaScript 中使用 `{}` 包裹的代码称为代码块，代码块内部声明的变量外部将【有可能】无法被访问。

```html
<script>
  {
    // age 只能在该代码块中被访问
    let age = 18;
    console.log(age); // 正常
  }
  
  // 超出了 age 的作用域
  console.log(age) // 报错
  
  let flag = true;
  if(flag) {
    // str 只能在该代码块中被访问
    let str = 'hello world!'
    console.log(str); // 正常
  }
  
  // 超出了 age 的作用域
  console.log(str); // 报错
  
  for(let t = 1; t <= 6; t++) {
    // t 只能在该代码块中被访问
    console.log(t); // 正常
  }
  
  // 超出了 t 的作用域
  console.log(t); // 报错
</script>
```

JavaScript 中除了变量外还有常量，常量与变量本质的区别是【常量必须要有值且不允许被重新赋值】，常量值为对象时其属性和方法允许重新赋值。

```html
<script>
  // 必须要有值
  const version = '1.0.0';

  // 不能重新赋值
  // version = '1.0.1';

  // 常量值为对象类型
  const user = {
    name: '小明',
    age: 18
  }

  // 不能重新赋值
  user = {};

  // 属性和方法允许被修改
  user.name = '小小明';
  user.gender = '男';
</script>
```

总结：

1. `let` 声明的变量会产生块作用域，`var` 不会产生块作用域
2. `const` 声明的常量也会产生块作用域
3. 不同代码块之间的变量无法互相访问
4. 推荐使用 `let` 或 `const`

注：开发中 `let` 和 `const` 经常不加区分的使用，如果担心某个值会不小被修改时，则只能使用 `const` 声明成常量。

### 02  全局作用域

**`<script>` 标签**和 **`.js` 文件**的【最外层】就是所谓的全局作用域，在此声明的变量在函数内部也可以被访问。

```html
<script>
  // 此处是全局
  
  function sayHi() {
    // 此处为局部
  }

  // 此处为全局
</script>
```

**全局作用域中声明的变量，任何其它作用域都可以被访问**，如下代码所示：

```html
<script>
    // 全局变量 name
    const name = '小明'
  
  	// 函数作用域中访问全局
    function sayHi() {
      // 此处为局部
      console.log('你好' + name)
    }

    // 全局变量 flag 和 x
    const flag = true
    let x = 10
  
  	// 块作用域中访问全局
    if(flag) {
      let y = 5
      console.log(x + y) // x 是全局的
    }
</script>
```

总结：

1. 为 `window` 对象动态添加的属性默认也是全局的，不推荐！
2. 函数中未使用任何关键字声明的变量为全局变量，不推荐！！！
3. 尽可能少的声明全局变量，防止全局变量被污染

JavaScript 中的作用域是程序被执行时的底层机制，了解这一机制有助于规范代码书写习惯，避免因作用域导致的语法错误。

### 03  作用域链

在解释什么是作用域链前先来看一段代码：

```html
<script>
  // 全局作用域
  let a = 1
  let b = 2
  // 局部作用域
  function f() {
    let c
    // 局部作用域
    function g() {
      let d = 'yo'
    }
  }
</script>
```

函数内部允许创建新的函数，`f` 函数内部创建的新函数 `g`，会产生新的函数作用域，由此可知作用域产生了嵌套的关系。父子关系的作用域关联在一起形成了链状的结构，作用域链的名字也由此而来。

**作用域链本质上是底层的变量查找机制，在函数被执行时，会优先查找当前函数作用域中查找变量，如果当前作用域查找不到则会依次逐级查找父级作用域直到全局作用域，**如下代码所示：

```html
<script>
  // 全局作用域
  let a = 1
  let b = 2

  // 局部作用域
  function f() {
    let c
    // let a = 10;
    console.log(a) // 1 或 10
    console.log(d) // 报错
    
    // 局部作用域
    function g() {
      let d = 'yo'
      // let b = 20;
      console.log(b) // 2 或 20
    }
    
    // 调用 g 函数
    g()
  }

  console.log(c) // 报错
  console.log(d) // 报错
  
  f();
</script>
```

总结：

1. 嵌套关系的作用域串联起来形成了作用域链

2. 相同作用域链中按着从小到大的规则查找变量

3. 子作用域能够访问父作用域，父级作用域无法访问子级作用域

   > 这是因为作用域链的查找规则是从内向外、由近及远的。父作用域的作用域链中不包括子作用域的变量对象。

### 04  垃圾回收机制

**内存的生命周期：**

①内存分配

②内存使用

③内存回收

说明：全局变量一般不会回收

一般情况下局部变量的值，不用了，会被自动回收

**内存泄露：**程序中分配的内存由于某种原因程序没有释放或者无法释放

堆栈空间分配说明：（js没有堆栈 这里只是方便理解）

1. 栈(操作系统)：由操作系统自动分配释放函数的参数值、局部变量等，**基本数据类型**放到栈里面
2. 堆(操作系统)：一般由程序员分配释放，若程序员不释放，由垃圾回收机制回收。**复杂数据类型**放到堆里面

**垃圾回收机制算法说明：**

- 引用计数法

  相互引用 不能回收 导致内存泄漏

- 标记清除法

  核心思路：从根部扫描对象，能查找到的就是使用的，查找不到的就要回收

### 05  闭包（Closure）

闭包是一种比较特殊和函数，使用闭包能够访问函数作用域中的变量。

从代码形式上看闭包是一个做为返回值的函数，如下代码所示：

1. 闭包 : 内层函数 + 外层函数变量 （捆绑）

```js
function outer() {
   const a = 1
   function f() {
     console.log(a)
   }
   f()
 }
 outer()
```

2. 闭包的应用： 实现数据的私有/统计函数的调用次数

```js
let count = 1
function fn() {
    count++
    console.log(`函数被调用${count}次`)
}
```

3. 闭包的写法  统计函数的调用次数

```js
function outer() {
  let count = 1  //外层变量
  function fn() {  //里层函数
    count++
    console.log(`函数被调用${count}次`)
  }
  return fn
}
const re = outer()   //全局 关闭的时候才回收 fun、fn函数、i i不会被回收
// const re = function fn() { //普通形式
//   count++
//   console.log(`函数被调用${count}次`)  这个count作为全局变量很容易被修改 所以写成闭包形式
// }
re()
re()
// const fn = function() { }  函数表达式
```

4. 闭包存在的问题： 可能会造成内存泄漏

总结：

1. 怎么理解闭包？

​	**闭包 = 内层函数 + 外层函数的变量** 

2. 闭包的作用？

   - 封闭数据，提供操作，**外部也可以访问函数内部的变量**

   - 实现数据私有（统计函数调用的次数）

   - 闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来


3. 闭包可能引起的问题？

   内存泄漏（return了一个函数fn，fn、fun、i一直使用，没有被回收）

### 06 变量提升

变量提升是 JavaScript 中比较“奇怪”的现象，它允许在变量声明之前即被访问。

**将所有var声明的变量提升到当前作用域最前面，只提升声明，不提升赋值。**

```html
<script>
  // 访问变量 str
  console.log(str + 'world!');

  // 声明变量 str
  var str = 'hello ';
</script>
```

总结：

1. 变量在未声明即被访问时会报语法错误
2. 变量在声明之前即被访问，变量的值为 `undefined`
3. `let/const` 声明的变量不存在变量提升，推荐使用 `let`
4. 变量提升出现在相同作用域当中
5. 实际开发中推荐先声明再访问变量

注：关于变量提升的原理分析会涉及较为复杂的词法分析等知识，而开发中使用 `let` 可以轻松规避变量的提升，因此在此不做过多的探讨，有兴趣可[查阅资料](https://segmentfault.com/a/1190000013915935)。

# d2 函数

> 知道函数参数默认值、动态参数、剩余参数的使用细节，提升函数应用的灵活度，知道箭头函数的语法及与普通函数的差异。

### 01 函数提升

函数提升与变量提升比较类似，是指函数在声明之前即可被调用。

把函数声明提升到当前作用域最前面，只提升函数声明，不提升函数调用。

```html
<script>
  // 调用函数
  foo()
  // 声明函数
  function foo() {
    console.log('声明之前即被调用...')
  }

  // 不存在提升现象
  bar()  // 错误
  var bar = function () {
    console.log('函数表达式不存在提升现象...')
  }
</script>
```

总结：

1. 函数提升能够使函数的声明调用更灵活
2. **函数表达式不存在提升的现象**，函数表达式必须先声明和赋值后调用
3. 函数提升出现在相同作用域当中

### 02 函数参数

函数参数的使用细节，能够提升函数应用的灵活度。

#### A 默认值

```html
<script>
  // 设置参数默认值
  function sayHi(name="小明", age=18) {
    document.write(`<p>大家好，我叫${name}，我今年${age}岁了。</p>`);
  }
  // 调用函数
  sayHi();
  sayHi('小红');
  sayHi('小刚', 21);
</script>
```

总结：

1. 声明函数时为形参赋值即为参数的默认值
2. 如果参数未自定义默认值时，参数的默认值为 `undefined`
3. 调用函数时没有传入对应实参时，参数的默认值被当做实参传入

#### B 动态参数（arguments）

`arguments` 是函数内部内置的伪数组变量，它包含了调用函数时传入的所有实参。（不确定传递多少个实参）

```html
<script>
  // 求和函数，计算所有参数的和
  function sum() {
    // console.log(arguments)  arguments动态参数 只存在于函数里面
    let s = 0
    for(let i = 0; i < arguments.length; i++) {
      s += arguments[i]
    }
    console.log(s)
  }
  // 调用求和函数
  sum(5, 10)// 两个参数
  sum(1, 2, 4) // 两个参数
</script>
```

总结：

1. `arguments` 是一个伪数组，只存在于函数中
2. `arguments` 的作用是动态获取函数的实参

#### C 剩余参数（...）

剩余参数允许我们将一个不定数量的参数表示为一个数组

```javascript
<script>
  function config(baseURL, ...other) {
    console.log(baseURL) // 得到 'http://baidu.com'
    console.log(other)  // other  得到 ['get', 'json']  使用的时候不需要写...
  }
  // 调用函数
  config('http://baidu.com', 'get', 'json');
</script>
```

总结：

1. `...` 是语法符号，置于最末函数形参之前，**用于获取多余的实参**
2. 借助 `...` 获取的剩余实参，是个**真数组**

#### D 展开运算符

展开运算符：将一个数组展开

```javascript
const arr =[1,2,3]   
console.log(...arr)   //123
//...arr === 1,2,3
//1 求数组最大值
console.log(Math.max(...arr))  //3
// 2. 合并数组
const arr2 = [3, 4, 5]
const arr = [...arr1, ...arr2]
console.log(arr)  //123345
```

说明：不会修改原数组

运用场景：求最大值、合并数组

> 剩余参数：函数参数使用 得到真数组
>
> 展开运算符：数组中使用 数组展开

### 03 箭头函数

#### A 基础语法

箭头函数是一种声明函数的简洁语法，它与普通函数并无本质的区别，差异性更多体现在语法格式上。

箭头函数更适用于那些本来需要匿名函数的地方。

```html
<body>
  <script>
    // const fn = function () {
    //   console.log(123)
    // }
    // 1. 箭头函数 基本语法
    // const fn = () => {
    //   console.log(123)
    // }
    // fn()
    // 可以传参数
    // const fn = (x) => {
    //   console.log(x)
    // }
    // fn(1)
    // 2. 只有一个形参的时候，可以省略小括号
    // const fn = x => {
    //   console.log(x)
    // }
    // fn(1)
    // // 3. 只有一行代码的时候，我们可以省略大括号
    // const fn = x => console.log(x)
    // fn(1)
    // 4. 只有一行代码的时候，可以省略return
    // const fn = x => x + x
    // console.log(fn(1))
    // 5. 箭头函数可以直接返回一个对象（加括号的函数体返回对象字面量表达式）
    // const fn = (uname) => ({ uname: uname })  //属性名：属性值
    // console.log(fn('刘德华'))
  </script>
</body>
```

总结：

1. 箭头函数属于表达式函数，因此不存在函数提升
2. 箭头函数只有一个参数时可以省略圆括号 `()`
3. 箭头函数函数体只有一行代码时可以省略花括号 `{}`，并自动做为返回值被返回

#### B 箭头函数参数

箭头函数中没有 `arguments`，只能使用 `...` 动态获取实参

~~~html
<body>
  <script>
    // 1. 利用箭头函数来求和
    const getSum = (...arr) => {
      let sum = 0
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
      }
      return sum
    }
    const result = getSum(2, 3, 4)
    console.log(result) // 9
  </script>
~~~

#### C 箭头函数 this

箭头函数不会创建自己的this，它只会从自己的**作用域链的上一层**沿用this。

~~~html
 <script>
    // 以前this的指向：  谁调用的这个函数，this 就指向谁
    // console.log(this)  // window
    // // 普通函数
    // function fn() {
    //   console.log(this)  // window
    // }
    // window.fn()
    // // 对象方法里面的this
    // const obj = {
    //   name: 'andy',
    //   sayHi: function () {
    //     console.log(this)  // obj
    //   }
    // }
    // obj.sayHi()

    // 2. 箭头函数的this  是上一层作用域的this 指向
    // const fn = () => {
    //   console.log(this)  // window
    // }
    // fn()
    // 对象方法箭头函数 this
    // const obj = {
    //   uname: 'pink老师',
    //   sayHi: () => {
    //     console.log(this)  // this 指向谁？ 箭头函数没有this 沿用obj的this window
    //   }
    // }
    // obj.sayHi()

    const obj = {
      uname: 'pink老师',
      sayHi: function () {
        console.log(this)  // obj
        let i = 10
        const count = () => {
          console.log(this)  // 上一级sayHi函数的this 指向调用者 obj 
        }
        count()
      }
    }
    obj.sayHi()
    // DOM事件回调函数为了简便，不推荐是用箭头函数，如果使用的话，指向的是this
  </script>
~~~

# d3 解构赋值

> 知道解构的语法及分类，使用解构简洁语法快速为变量赋值。

解构赋值是一种快速为变量赋值的简洁语法，本质上仍然是为变量赋值，分为数组解构、对象解构两大类型。

### 01 数组解构

数组解构是**将数组的单元值快速批量赋值给一系列变量**的简洁语法，如下代码所示：

```html
<script>
  // 普通的数组
  let arr = [1, 2, 3]
  // 批量声明变量 a b c 
  // 同时将数组单元值 1 2 3 依次赋值给变量 a b c
  let [a, b, c] = arr
  let [a, b, c] = [1, 2, 3]
  console.log(a); // 1
  console.log(b); // 2
  console.log(c); // 3
    //交换变量
    let a = 1
    let b = 2;  //这里必须有分号
    [b,a] = [a,b]
</script>
```

总结：

1. 赋值运算符 `=` 左侧的 `[]` 用于批量声明变量，右侧数组的单元值将被赋值给左侧的变量
2. 变量的顺序对应数组单元值的位置依次进行赋值操作
3. 变量的数量大于单元值数量时，多余的变量将被赋值为  `undefined`
4. 变量的数量小于单元值数量时，可以通过 `...` 获取剩余单元值，但只能置于最末位

```js
const [a, b, ...c] = [1, 2, 3, 4]
console.log(a) // 1
console.log(b) // 2
console.log(c) // [3, 4]  真数组
```

5. 防止 `undefined` 传递单元值的情况允许初始化变量的默认值，且只有单元值为 `undefined` 时默认值才会生效

6. 按需导入赋值

```js
const [a, b, , d] = [1, 2, 3, 4]*
console.log(a) // 1
console.log(b) // 2
console.log(d) // 4
```

7. 支持多维解构赋值，比较复杂后续有应用需求时再进一步分析

```js
const arr = [1, 2, [3, 4]]
const [a, b, c] = [1, 2, [3, 4]]
console.log(a) // 1
console.log(b) // 2
console.log(c) // [3,4]

const [a, b, [c, d]] = [1, 2, [3, 4]]
console.log(a) // 1
console.log(b) // 2
console.log(c) // 3
console.log(d) // 4
```

> 必须加分号的两种情况：立即执行函数、数组

### 02 对象解构

对象解构是**将对象属性和方法快速批量赋值给一系列变量**的简洁语法，如下代码所示：

```html
<script>
  // 普通对象
  const user = {
    name: '小明',
    age: 18
  };
  // 批量声明变量 name age
  // 同时将数组单元值 小明  18 依次赋值给变量 name  age
  const {name, age} = user

  console.log(name) // 小明
  console.log(age) // 18
</script>
```

总结：

1. 赋值运算符 `=` 左侧的 `{}` 用于批量声明变量，右侧对象的属性值将被赋值给左侧的变量
2. 对象属性的值将被赋值给与属性名**相同**的变量（变量和属性名要一致  可以改名 *原名字：改的名字*）
3. 对象中找不到与变量名一致的属性时变量值为 `undefined`
4. 允许初始化变量的默认值，属性不存在或单元值为 `undefined` 时默认值才会生效

注：支持多维解构赋值

~~~html
<body>
  <script>
    // 1. 这是后台传递过来的数据
    const msg = {
      "code": 200,
      "msg": "获取新闻列表成功",
      "data": [
        {
          "id": 1,
          "title": "5G商用自己，三大运用商收入下降",
          "count": 58
        },
        {
          "id": 2,
          "title": "国际媒体头条速览",
          "count": 56
        },
        {
          "id": 3,
          "title": "乌克兰和俄罗斯持续冲突",
          "count": 1669
        },

      ]
    }

    // 需求1： 请将以上msg对象  采用对象解构的方式 只选出  data 方面后面使用渲染页面
    // const { data } = msg
    // console.log(data)
    // 需求2： 上面msg是后台传递过来的数据，我们需要把data选出当做参数传递给 函数
    // const { data } = msg
    // msg 虽然很多属性，但是我们利用解构只要 data值
    function render({ data }) {
      // const { data } = arr
      // 我们只要 data 数据
      // 内部处理
      console.log(data)

    }
    render(msg)

    // 需求3， 为了防止msg里面的data名字混淆，要求渲染函数里面的数据名改为 myData
    function render({ data: myData }) {
      // 要求将 获取过来的 data数据 更名为 myData
      // 内部处理
      console.log(myData)

    }
    render(msg)

  </script>
~~~

### 0 综合案例

#### A forEach遍历数组

forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数

>注意：  
>
>1.forEach 主要是遍历数组
>
>2.参数当前数组元素是必须要写的， 索引号可选。

~~~html
<body>
  <script>
    // forEach 就是遍历  加强版的for循环  适合于遍历数组对象
    const arr = ['red', 'green', 'pink']
    const result = arr.forEach(function (item, index) {
      console.log(item)  // 数组元素 red  green pink
      console.log(index) // 索引号
    })
    // console.log(result)   //foreach没有返回值 map可以返回一个数组
  </script>
</body>
~~~

#### B filter筛选数组

filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素

主要使用场景： 筛选数组符合条件的元素，并返回筛选之后元素的新数组

~~~html
<body>
  <script>
    const arr = [10, 20, 30]
    // const newArr = arr.filter(function (item, index) {
    //   // console.log(item)   //item必须写
    //   // console.log(index)  //index可以省略
    //   return item >= 20
    // })
    // 返回的符合条件的新数组 filter只能写 > < 筛选
    // map返回的是和原数组长度相同的数组 可以操作 + - =
    // forEach不会返回新数组
    const newArr = arr.filter(item => item >= 20)  
    // const newArr = arr.filter((item) => {  //箭头函数一个元素小括号可以省略
    // return item>= 20)
    // }  //只有一行可以省略大括号、return   
    console.log(newArr)
  </script>
</body>
~~~



# JavaScript 进阶 - 第2天

> 了解面向对象编程的基础概念及构造函数的作用，体会 JavaScript 一切皆对象的语言特征，掌握常见的对象属性和方法的使用。

- 了解面向对象编程中的一般概念
- 能够基于构造函数创建对象
- 理解 JavaScript 中一切皆对象的语言特征
- 理解引用对象类型值存储的的特征
- 掌握包装类型对象常见方法的使用

# d4 深入对象

> 了解面向对象的基础概念，能够利用构造函数创建对象。

创建对象的三种方法：字面量、new Object、构造函数

### 01 构造函数

构造函数是专门用于创建对象的函数，如果一个函数使用 `new` 关键字调用，那么这个函数就是构造函数。

构造函数是**快速创建多个类似的对象**，大写字母开头、需要用new实例化的函数。

```html
<script>
 function Pig(uname, age) {
      this.uname = uname  //对象的属性名 = 形参
      this.age = age
    }
    const p = new Pig('佩奇', 6)  //使用 `new` 关键字调用函数的行为被称为实例化

  // 定义函数
  function foo() {
    console.log('通过 new 也能调用函数...');
  }
  // 调用函数
  new foo;
</script>
```

总结：

2. 使用 `new` 关键字调用函数的行为被称为**实例化**

   > **new实例化执行过程：**
   >
   > - **创建空的新对象**
   > - **构造函数this指向新对象**
   > - **执行构造函数代码，修改this，给对象追加属性**
   > - **返回新对象**

3. 实例化构造函数时没有参数时可以省略 `()`

4. 构造函数的返回值即为新创建的对象

5. 构造函数内部的 `return` 返回的值无效

6. `new Object()` 、`new Date()` 也是实例化的构造函数

注：实践中为了从视觉上区分构造函数和普通函数，习惯将构造函数的首字母大写。

### 02 实例成员

通过构造函数创建的对象称为实例对象，实例对象中的属性和方法称为实例成员。

```html
<script>
  // 构造函数
  function Person() {
    // 构造函数内部的 this 就是实例对象
    // 实例对象中动态添加属性
    this.name = '小明'  //实例属性
    // 实例对象动态添加方法
    this.sayHi = () => {   //实例方法
      console.log('大家好~')
    }
  }
  // 实例化，p1 是实例对象
  // p1 实际就是 构造函数内部的 this
  const p1 = new Person()
  console.log(p1)
  console.log(p1.name) // 访问实例属性
  p1.sayHi() // 调用实例方法
</script>
```

总结：

1. 构造函数内部 `this` 实际上就是实例对象，为其动态添加的属性和方法即为实例成员
2. 为构造函数传入参数，动态创建**结构相同但值不同**的对象
3. 构造函数创建的实例对象彼此**独立**互不影响。

### 03 静态成员

在 JavaScript 中底层函数本质上也是对象类型，因此允许直接为函数动态添加属性或方法，构造函数的属性和方法被称为静态成员。

```html
<script>
  // 构造函数
  function Person(name, age) {
    // 省略实例成员
  }
  // 静态属性
  Person.eyes = 2
  Person.arms = 2
  // 静态方法
  Person.walk = function () {
    console.log('^_^人都会走路...')
    // this 指向 Person
    console.log(this.eyes)
  }
</script>
```

总结：

1. 静态成员指的是添加到构造函数本身的属性和方法
2. 一般公共特征的属性或方法静态成员设置为静态成员
3. 静态成员方法中的 `this` 指向构造函数本身

# d5 内置构造函数

> 掌握各引用类型和包装类型对象属性和方法的使用。

在 JavaScript 中**最主要**的数据类型有 6 种，分别是字符串、数值、布尔、undefined、null 和 对象，常见的对象类型数据包括数组和普通对象。其中字符串、数值、布尔、undefined、null 也被称为简单类型或基础类型，对象也被称为引用类型。

在 JavaScript 内置了一些构造函数，绝大部的数据处理都是基于这些构造函数实现的，JavaScript 基础阶段学习的 `Date` 就是内置的构造函数。

```html
<script>
  // 实例化
	let date = new Date();
  
  // date 即为实例对象
  console.log(date);
</script>
```

甚至字符串、数值、布尔、数组、普通对象也都有专门的构造函数，用于创建对应类型的数据。

> 为什么字符串可以使用length？为什么能使用属性？
>
> js底层把基本数据类型包装成了复杂数据类型，类似于转换为对象了，对象就有属性和方法了，就能使用了。

### 01 Object

`Object` 是内置的构造函数，用于创建普通对象。

学习三种静态方法（静态方法就是只有构造函数Object可以调用的）

```html
<script>
  const o = { uname: 'pink', age: 18 }
    // 1.获得所有的属性名
    console.log(Object.keys(o))  //返回数组['uname', 'age']
    // 2. 获得所有的属性值
    console.log(Object.values(o))  //  ['pink', 18]
    // 3. 对象的拷贝 给对象添加属性
    // const oo = {}
    // Object.assign(oo, o)  把o拷贝给oo
    // console.log(oo)
    Object.assign(o, { gender: '女' })
    console.log(o)
</script>
```

总结：

1. 推荐使用字面量方式声明对象，而不是 `Object` 构造函数
2. `Object.assign` 静态方法创建新的对象
3. `Object.keys` 静态方法获取对象中所有属性
4. `Object.values` 表态方法获取对象中所有属性值

### 02 Array

`Array` 是内置的构造函数，用于创建数组。

```html
<script>
  // 构造函数创建数组
  let arr = new Array(5, 7, 8);
    
  // 字面量方式创建数组
  let list = ['html', 'css', 'javascript']
</script>
```

数组赋值后，无论修改哪个变量另一个对象的数据值也会相当发生改变。

#### A `Array.from(lis) ` 

把伪数组转换为真数组

```js
const lis = document.querySelectorAll('ul li')
// console.log(lis)
// lis.pop() 删除 报错
const liss = Array.from(lis)
liss.pop()
```

#### B `reduce` 

累计器

```js
arr.reduce(function(累计值, 当前值){}, 起始值)   //两个参数：回调函数、初始值
const = [1,5,8]
// 1.没有初始值 
arr.reduce(function (prev, item) {
return prev + item
})
// 没有初始值，则上一次值是数组的第一个数组元素的值1+5   
// 第一次循环，把返回值给作为下一次循环的上一次值6+8  比数组元素个数少一个
// console.log(tatal)   //14
// 2.有初始值  10+1  11+5  16+8
arr.reduce(function (prev, item) {
return prev + item
}, 10)
// console.log(tatal)   //24
// 3.箭头函数写法
const arr = [1, 2, 3]
const re = arr.reduce((prev, item) => prev + item)
console.log(re)
```

案例：计算薪资

```js
const arr = [{
      name: '张三',
      salary: 10000
    }, {
      name: '李四',
      salary: 10000
    }, {
      name: '王五',
      salary: 20000
    },
    ]
    // 涨薪的钱数  10000 * 0.3 
    // const money = arr.reduce(function (prev, item) {
    //   return prev + item.salary * 1.3
    // }, 0)   //这里第一个元素是对象 所以初始值不能省
    const money = arr.reduce((prev, item) => prev + item.salary * 1.3, 0)  //item也可以叫别的名字
    console.log(money)
```

总结：

1. 推荐使用字面量方式声明数组，而不是 `Array` 构造函数

2. 实例方法 `forEach` 用于遍历数组，替代 `for` 循环

3. 实例方法 `filter` 过滤数组单元值，生成新**数组**

4. 实例方法 `map` 迭代原数组，生成新数组（遍历的同时还有返回值）

5. **实例方法 `join` 数组元素拼接为字符串，返回字符串**

6. **实例方法  `find`  查找元素， 返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 `undefined`**

   ```js
   arr.find(callback[,thinArg])   //callback三个参数：element、index、array
   //找小米这个对象，并且返回这个对象
   const arr = [
         {
           name: '小米',
           price: 1999
         },
         {
           name: '华为',
           price: 3999
         },
       ]
   const mi = arr.find(item => item.name === '小米')   //返回的是数组元素
   ```

   

7. **实例方法`every` 检测数组所有元素是否都符合指定条件，如果所有元素都通过检测返回 true，否则返回 false**（每一个）

   ```js
   arr.every(callback(element[,index[,array]])[,thisArg])
       const arr1 = [10, 20, 30]
       const flag = arr1.every(item => item >= 10)  //true
       const flag = arr1.every(item => item >= 20)  //flase
   ```

   

8. 实例方法`some` 检测数组中的元素是否满足指定条件   **如果数组中有**元素满足条件返回 true，否则返回 false（有一个）

9. 实例方法 `concat`  合并两个数组，返回生成新数组

10. 实例方法 `sort` 对原数组单元值排序  

11. 实例方法 `splice` 删除或替换原数组单元

12. 实例方法 `reverse` 反转数组

13. 实例方法 `findIndex`  查找元素的索引值

案例：

```js
    <div></div>
	const spec = { size: '40cm*40cm', color: '黑色' }
    // 1. 所有的属性值回去过来  数组
    // Object.values(spec)
    // 2. 转换为字符串  数组join('/') 把数组根据分隔符转换为字符串
    // Object.values(spec).join('/')
    // 把值给div
    document.querySelector('div').innerHTML = Object.values(spec).join('/')
```



### 03 包装类型

在 JavaScript 中的字符串、数值、布尔具有对象的使用特征，如具有属性和方法，如下代码举例：

```html
<script>
  // 字符串类型
  const str = 'hello world!'
 	// 统计字符的长度（字符数量）
  console.log(str.length)
  
  // 数值类型
  const price = 12.345
  // 保留两位小数
  price.toFixed(2) // 12.34
</script>
```

**之所以具有对象特征的原因是字符串、数值、布尔类型数据是 JavaScript 底层使用 Object 构造函数“包装”来的，被称为包装类型。**

#### A String

`String` 是内置的构造函数，用于创建字符串。

```html
<script>
  // 使用构造函数创建字符串
  let str = new String('hello world!');

  // 字面量创建字符串
  let str2 = '你好，世界！';

  // 检测是否属于同一个构造函数
  console.log(str.constructor === str2.constructor); // true
  console.log(str instanceof String); // false
</script>
```

总结：

1. **实例属性 `length` 用来获取字符串的度长**
2. **实例方法 `split('分隔符')` 用来将字符串拆分成数组**
3. **实例方法 `substring（需要截取的第一个字符的索引[,结束的索引号]）` 用于字符串截取，结束的索引号不包含想要截取的部分**
4. **实例方法 `startsWith(检测字符串[, 检测位置索引号])` 检测是否以某字符开头**
5. **实例方法 `includes(搜索的字符串[, 检测位置索引号])` 判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false，区分大小写**
6. 实例方法 `toUpperCase` 用于将字母转换成大写
7. 实例方法 `toLowerCase` 用于将就转换成小写
8. 实例方法 `indexOf`  检测是否包含某字符
9. 实例方法 `endsWith` 检测是否以某字符结尾
10. 实例方法 `replace` 用于替换字符串，支持正则匹配
11. 实例方法 `match` 用于查找字符串，支持正则匹配

注：String 也可以当做普通函数使用，这时它的作用是强制转换成字符串数据类型。

转换为字符串：

```js
  const num = 10
  console.log(String(num))
  console.log(num.toString())
```

#### B Number

`Number` 是内置的构造函数，用于创建数值。

```html
<script>
  // 使用构造函数创建数值
  let x = new Number('10')
  let y = new Number(5)

  // 字面量创建数值
  let z = 20

</script>
```

总结：

1. 推荐使用字面量方式声明数值，而不是 `Number` 构造函数
2. 实例方法 `toFixed` 用于设置保留小数位的长度



# JavaScript 进阶 - 第3天

> 了解构造函数原型对象的语法特征，掌握 JavaScript 中面向对象编程的实现方式，基于面向对象编程思想实现 DOM 操作的封装。

- 了解面向对象编程的一般特征
- 掌握基于构造函数原型对象的逻辑封装
- 掌握基于原型对象实现的继承
- 理解什么原型链及其作用
- 能够处理程序异常提升程序执行的健壮性

# d6 编程思想

> 学习 JavaScript 中基于原型的面向对象编程序的语法实现，理解面向对象编程的特征。

### 01 面向过程

面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依次

调用就可以了。

（蛋炒饭）

### 02 面向对象

面向对象是把事务分解成为一个个对象，然后由对象之间分工与合作。

（盖浇饭）

在面向对象程序开发思想中，每一个对象都是功能中心，具有明确分工。

面向对象编程具有灵活、代码可复用、容易维护和开发的优点，更适合多人合作的大型软件项目。

面向对象的特性：

- 封装性


- 继承性
- 多态性

# d7 构造函数

对比以下通过面向对象的构造函数实现的封装：

```html
<script>
  function Person() {
    this.name = '佚名'
    // 设置名字
    this.setName = function (name) {
      this.name = name
    }
    // 读取名字
    this.getName = () => {
      console.log(this.name)
    }
  }

  // 实例对像，获得了构造函数中封装的所有逻辑
  let p1 = new Person()
  p1.setName('小明')
  console.log(p1.name)

  // 实例对象
  let p2 = new Person()
  console.log(p2.name)
</script>
```

封装是面向对象思想中比较重要的一部分，js面向对象可以通过构造函数实现的封装。

同样的将变量和函数组合到了一起并能通过 this 实现数据的共享，所不同的是借助构造函数创建出来的实例对象之

间是彼此不影响的

>总结：
>
>1. 构造函数体现了面向对象的封装特性
>2. 构造函数实例创建的对象彼此独立、互不影响

封装是面向对象思想中比较重要的一部分，js面向对象可以通过构造函数实现的封装。

前面我们学过的构造函数方法很好用，但是 存在`浪费内存`的问题

# d8 原型对象

构造函数通过原型分配的函数是所有对象所 共享的。

- JavaScript 规定，**每一个构造函数都有一个 prototype 属性**，指向另一个对象，所以我们也称为**原型对象**，这个对象可以挂载函数，对象实例化不会多次创建原型上函数，节约内存
- 我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以**共享这些方法**。
- 构造函数和原型对象中的this 都指向 实例化的对象

```js
function Person() { ... }
// 每个函数都有 prototype 属性（原型对象）
console.log(Person.prototype)
```

了解了 JavaScript 中构造函数与原型对象的关系后，再来看原型对象具体的作用，如下代码所示：

```js
function Person() {
    // 此处未定义任何方法
    //公共属性写在构造函数中
}

// 为构造函数的原型对象添加方法
Person.prototype.sayHi = function () {  //公共方法写在原型对象中
console.log('Hi~');
}

// 实例化
let p1 = new Person();
p1.sayHi(); // 输出结果为 Hi~
```

构造函数 `Person` 中未定义任何方法，这时实例对象调用了原型对象中的方法 `sayHi`，接下来改动一下代码：

```html
<script>
  function Person() {
    // 此处定义同名方法 sayHi
    this.sayHi = function () {
      console.log('嗨!');
    }
  }

  // 为构造函数的原型对象添加方法
  Person.prototype.sayHi = function () {    
    console.log('Hi~');
  }

  let p1 = new Person();
  p1.sayHi(); // 输出结果为 嗨!
</script>
```

构造函数 `Person` 中定义与原型对象中相同名称的方法，这时实例对象调用则是构造函中的方法 `sayHi`。

通过以上两个简单示例不难发现 JavaScript 中对象的工作机制：**当访问对象的属性或方法时，先在当前实例对象是查找，然后再去原型对象查找，并且原型对象被所有实例共享。**

```html
<script>
	function Person() {
    // 此处定义同名方法 sayHi
    this.sayHi = function () {
      console.log('嗨!' + this.name)
    }
  }

  // 为构造函数的原型对象添加方法
  Person.prototype.sayHi = function () {
    console.log('Hi~' + this.name)   //原型对象里的this 指向实例对象
  }
  // 在构造函数的原型对象上添加属性
  Person.prototype.name = '小明'

  let p1 = new Person()
  p1.sayHi(); // 输出结果为 嗨!
  
  let p2 = new Person()
  p2.sayHi()
</script>
```

总结：**结合构造函数原型的特征，实际开发重往往会将封装的功能函数添加到原型对象中。**

### 01 constructor 属性


在哪里？ 每个原型对象里面都有个constructor 属性（constructor 构造函数）

作用：该属性指向该原型对象的构造函数， 简单理解，就是指向我的爸爸，我是有爸爸的孩子

**使用场景：**

如果有多个对象的方法，我们可以给原型对象采取对象形式赋值.

但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 constructor 就不再指向当前构造函数了

此时，我们可以在修改后的原型对象中，添加一个 constructor 指向原来的构造函数。

### 02 对象原型


对象都会有一个属性 `__proto__` 指向构造函数的 prototype 原型对象，之所以我们对象可以使用构造函数 prototype 原型对象的属性和方法，就是因为对象有 `__proto__ `原型的存在。

注意：

- `__proto__ `是JS非标准属性
- [[prototype]]和`__proto__`意义相同
- 用来表明当前实例对象指向哪个原型对象prototype
- `__proto__`对象原型里面也有一个 constructor属性，指向创建该实例对象的构造函数

### 03 原型继承

继承是面向对象编程的另一个特征，通过继承进一步提升代码封装的程度，JavaScript 中大多是借助原型对象实现继承的特性。龙生龙、凤生凤、老鼠的儿子会打洞描述的正是继承的含义。

```html
<body>
  <script>
    // 继续抽取   公共的部分放到原型上
     const Person1 = {
       eyes: 2,
       head: 1
     }
     const Person2 = {
       eyes: 2,
       head: 1
     }
    // 构造函数  new 出来的对象 结构一样，但是对象不一样
    function Person() {
      this.eyes = 2
      this.head = 1
    }
    // console.log(new Person)
    // 女人  构造函数   继承  想要 继承 Person
    function Woman() {}
    // Woman 通过原型来继承 Woman.prototype = Person  把公共的部分给原型 所有实例都能new访问了 通过对象原型[[prototypr]]访问
    // 父构造函数（父类）   子构造函数（子类）
    // 子类的原型 =  new 父类  
    Woman.prototype = new Person()   // {eyes: 2, head: 1} 
    Woman.prototype.constructor = Woman  // 指回原来的构造函数

    // 给女人添加一个方法 生孩子 挂在原型上 
    Woman.prototype.baby = function () {
      console.log('宝贝')
    }
    //但是这个baby也出现在了man中 因为他们的使用了同一个对象 其实是修改了person 所以不要使用同一个对象 但是不同对象要包含相同的属性和方法 就再构造函数 然后每次new 对象都不一样
    const red = new Woman()  
    console.log(red)
      
    // console.log(Woman.prototype)
    // 男人 构造函数  继承  想要 继承 Person
    function Man() {}
    // 通过 原型继承 Person
    Man.prototype = new Person()
    Man.prototype.constructor = Man
    const pink = new Man()
    console.log(pink)
  </script>
</body>
```

### 04 原型链

基于原型对象的继承使得不同构造函数的原型对象关联在一起，并且这种关联的关系是一种链状的结构，我们将原型对象的链状结构关系称为原型链。

我的理解是原型对象`prototype`之间，通过对象原型`__protot__`指向，形成的链状结构关系，给访问一个对象的属性或者方法的查找机制提供一条路线，首先查找这个对象自身有没有该属性，如果没有就查找它的原型（也就是 `__proto__`指向的` prototype `原型对象），如果还没有就查找原型对象的原型（Object的原型对象）。

ldh对象实例（`ldh.__proto__`）→Person prototype（`Person.prototype.__proto__`）→object  prototype（`Object.prototype.__proto__`）→null

```html
<body>
  <script>
    // function Objetc() {}
    console.log(Object.prototype)
    console.log(Object.prototype.__proto__)
    function Person() {
    }
    const ldh = new Person()
    // console.log(ldh.__proto__ === Person.prototype)
    // console.log(Person.prototype.__proto__ === Object.prototype)
    console.log(ldh instanceof Person)
    console.log(ldh instanceof Object)
    console.log(ldh instanceof Array)
    console.log([1, 2, 3] instanceof Array)
    console.log(Array instanceof Object)
  </script>
</body>
```

① 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。

② 如果没有就查找它的原型（也就是 `__proto__`指向的` prototype `原型对象）

③ 如果还没有就查找原型对象的原型（Object的原型对象）

④ 依此类推一直找到 Object 为止（null）

⑤`__proto__`对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线

⑥ 可以使用` instanceof `运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

> `实例.__proto__ === 类.prototype`

### 05 原型链继承

原型链继承是 JavaScript 实现继承的一种重要机制，通过将对象的原型指向另一个对象，实现属性和方法的共享。

# JavaScript 进阶 - 第4天

# d9 深浅拷贝

### 01 浅拷贝

（直接赋值 拷贝对象里栈的地址  如果重新赋值 原来的也会改变）

首先浅拷贝和深拷贝只针对引用类型

浅拷贝：拷贝的是地址（如果是一层对象 不相互影响）

常见方法：

1. 拷贝对象：`Object.assgin() `/ 展开运算符 ` {...obj} `拷贝对象
2. 拷贝数组：`Array.prototype.concat() ` 或者 ` [...arr] `

>如果是简单数据类型拷贝值，引用数据类型拷贝的是地址 (简单理解： 如果是单层对象，没问题，如果有多层就有问题)
>
>简单数据栈里存放的是值

### 02 深拷贝

首先浅拷贝和深拷贝只针对引用类型

深拷贝：拷贝的是对象，不是地址

常见方法：

1. 通过**递归**实现深拷贝
2. **lodash**/cloneDeep
3. 通过**JSON.stringify()**实现

#### A 递归实现深拷贝

函数递归：如果一个函数在内部可以调用其本身，那么这个函数就是递归函数

```js
  <script>
    let i = 1
    function fn() {
      console.log(`这是第${i}次`)
      if (i >= 6) {
        return
      }
      i++
      fn()  //内部自己调用自己
    }
    fn()  //刚开启 外面先调用一次 

//模拟setinterval效果
    function getTime() {
      document.querySelector('div').innerHTML = new Date().toLocaleString()
      setTimeout(getTime, 1000)
    }
    getTime()
  </script>
```

- 简单理解:函数内部自己调用自己, 这个函数就是递归函数
- 递归函数的作用和循环效果类似
- 由于递归很容易发生“栈溢出”错误（stack overflow），所以必须要加退出条件 return

~~~html
<body>
  <script>
    const obj = {
      uname: 'pink',
      age: 18,
      hobby: ['乒乓球', '足球'],
      family: {
        baby: '小pink'
      }
    }
    const o = {}
    // 拷贝函数  依次遍历把值取过来依次遍历
    function deepCopy(newObj, oldObj) {  
      debugger
      for (let k in oldObj) {
        // 处理数组的问题  一定先写数组 在写 对象 不能颠倒  因为数组属于对象
        if (oldObj[k] instanceof Array) {
          newObj[k] = []  //先给个空数组
          //  newObj[k] 接收 []  hobby
          //  oldObj[k]   ['乒乓球', '足球']
          deepCopy(newObj[k], oldObj[k])  //再调用 遍历循环 把值取出来 就有值了
        } else if (oldObj[k] instanceof Object) {  //处理对象
          newObj[k] = {}
          deepCopy(newObj[k], oldObj[k])
        }
        else {
          //  k  属性名 uname age    oldObj[k]  属性值  18
          // newObj[k]  === o.uname  给新对象添加属性  k是变量 不能采用object.k
          newObj[k] = oldObj[k]
        }
      }
    }
    deepCopy(o, obj) // 函数调用  两个参数 o 新对象  obj 旧对象
    console.log(o)
    o.age = 20
    o.hobby[0] = '篮球'
    o.family.baby = '老pink'
    console.log(obj)
    console.log([1, 23] instanceof Object)
  </script>
</body>
~~~

怎么实现深拷贝：采用函数递归实现，普通拷贝直接复制，数组和对象要再次递归，数组先，对象后。

#### B js库lodash里面cloneDeep内部实现了深拷贝

~~~html
<body>
  <!-- 先引用 -->
  <script src="./lodash.min.js"></script>
  <script>
    const obj = {
      uname: 'pink',
      age: 18,
      hobby: ['乒乓球', '足球'],
      family: {
        baby: '小pink'
      }
    }
    const o = _.cloneDeep(obj)
    console.log(o)
    o.family.baby = '老pink'
    console.log(obj)
  </script>
</body>
~~~

#### C JSON序列化

~~~html
<body>
  <script>
    const obj = {
      uname: 'pink',
      age: 18,
      hobby: ['乒乓球', '足球'],
      family: {
        baby: '小pink'
      }
    }
    // 把对象转换为 JSON 字符串  简单数据类型 直接存值
    // console.log(JSON.stringify(obj))  
    const o = JSON.parse(JSON.stringify(obj))
    //JSON.parse() 方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。
    console.log(o)
    o.family.baby = '123'
    console.log(obj)
  </script>
</body>
~~~

# d10 异常处理

> 了解 JavaScript 中程序异常处理的方法，提升代码运行的健壮性。

### 01 throw

异常处理是指预估代码执行过程中可能发生的错误，然后最大程度的避免错误的发生导致整个程序无法继续运行

总结：

1. throw 抛出异常信息，程序也会终止执行
2. throw 后面跟的是错误提示信息
3. Error 对象配合 throw 使用，能够设置更详细的错误信息

```html
<script>
  function counter(x, y) {

    if(!x || !y) {
      // throw '参数不能为空!';
      throw new Error('参数不能为空!')
    }

    return x + y
  }

  counter()
</script>
```

总结：

1. `throw` 抛出异常信息，程序也会终止执行
2. `throw` 后面跟的是错误提示信息
3. `Error` 对象配合 `throw` 使用，能够设置更详细的错误信息

### 02 try ... catch

```html
<script>
   function foo() {
      try {
        // 查找 DOM 节点
        const p = document.querySelector('.p')
        p.style.color = 'red'
      } catch (error) {
        // try 代码段中执行有错误时，会执行 catch 代码段
        // 查看错误信息
        console.log(error.message)
        // 终止代码继续执行
        return

      }
      finally {
          alert('执行')
      }
      console.log('如果出现错误，我的语句不会执行')
    }
    foo()
</script>
```

总结：

1. `try...catch` 用于捕获错误信息
2. 将预估可能发生错误的代码写在 `try` 代码段中
3. 如果 `try` 代码段中出现错误后，会执行 `catch` 代码段，并截获到错误信息


### 03 debugger

相当于断点调试

# d11 处理this

> 了解函数中 this 在不同场景下的默认值，知道动态指定函数 this 值的方法。

`this` 是 JavaScript 最具“魅惑”的知识点，不同的应用场合 `this` 的取值可能会有意想不到的结果，在此我们对以往学习过的关于【 `this` 默认的取值】情况进行归纳和总结。

### 01 普通函数

**普通函数**的调用方式决定了 `this` 的值，即【谁调用 `this` 的值指向谁】，如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this)  
  }
  // 函数表达式
  const sayHello = function () {
    console.log(this)
  }
  // 函数的调用方式决定了 this 的值
  sayHi() // window
  window.sayHi()
	

// 普通对象
  const user = {
    name: '小明',
    walk: function () {
      console.log(this)
    }
  }
  // 动态为 user 添加方法
  user.sayHi = sayHi
  uesr.sayHello = sayHello
  // 函数调用方式，决定了 this 的值
  user.sayHi()
  user.sayHello()
</script>
```

注： 普通函数没有明确调用者时 `this` 值为 `window`，严格模式下没有调用者时 `this` 的值为 `undefined`。

### 02 箭头函数

**箭头函数**中的 `this` 与普通函数完全不同，也不受调用方式的影响，事实上箭头函数中并不存在 `this` ！箭头函数中访问的 `this` 不过是箭头函数所在作用域的 `this` 变量。

```html
<script>
    
  console.log(this) // 此处为 window
  // 箭头函数
  const sayHi = function() {
    console.log(this) // 该箭头函数中的 this 为函数声明环境中 this 一致
  }
  // 普通对象
  const user = {
    name: '小明',
    // 该箭头函数中的 this 为函数声明环境中 this 一致
    walk: () => {
      console.log(this)
    },
    
    sleep: function () {
      let str = 'hello'
      console.log(this)
      let fn = () => {
        console.log(str)
        console.log(this) // 该箭头函数中的 this 与 sleep 中的 this 一致
      }
      // 调用箭头函数
      fn();
    }
  }

  // 动态添加方法
  user.sayHi = sayHi
  
  // 函数调用
  user.sayHi()
  user.sleep()
  user.walk()
</script>
```

在开发中【使用箭头函数前需要考虑函数中 `this` 的值】，**事件回调函数**使用箭头函数时，`this` 为全局的 `window`，因此DOM事件回调函数不推荐使用箭头函数，如下代码所示：

```html
<script>
  // DOM 节点
  const btn = document.querySelector('.btn')
  // 箭头函数 此时 this 指向了 window
  btn.addEventListener('click', () => {
    console.log(this)
  })
  // 普通函数 此时 this 指向了 DOM 对象
  btn.addEventListener('click', function () {
    console.log(this)
  })
</script>
```

同样由于箭头函数 `this` 的原因，**基于原型的面向对象也不推荐采用箭头函数**，如下代码所示：

```html
<script>
  function Person() {
  }
  // 原型对像上添加了箭头函数
  Person.prototype.walk = () => {
    console.log('人都要走路...')
    console.log(this); // window
  }
  const p1 = new Person()
  p1.walk()
</script>
```

### 03 改变this指向

以上归纳了普通函数和箭头函数中关于 `this` 默认值的情形，不仅如此 JavaScript 中还允许指定函数中 `this` 的指向，有 3 个方法可以动态指定普通函数中 `this` 的指向：

#### call

使用 `call` 方法调用函数，同时指定函数中 `this` 的值，使用方法如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this);
  }

  let user = {
    name: '小明',
    age: 18
  }

  let student = {
    name: '小红',
    age: 16
  }

  // 调用函数并指定 this 的值
  sayHi.call(user); // this 值为 user
  sayHi.call(student); // this 值为 student

  // 求和函数
  function counter(x, y) {
    return x + y;
  }

  // 调用 counter 函数，并传入参数
  let result = counter.call(null, 5, 10);
  console.log(result);
</script>
```

总结：

> call()方法用来扩充调用它的函数的执行作用域，简而言之就是改变函数的this指向，它接收多个参数，第一个参数为执行作用域，第二个及以后的参数是传递给函数的参数。

1. `call` 方法能够在调用函数的同时指定 `this` 的值
2. 使用 `call` 方法调用函数时，第1个参数为 `this` 指定的值
3. `call` 方法的其余参数会依次自动传入函数做为函数的参数

#### apply

使用 `apply` 方法**调用函数**，同时指定函数中 `this` 的值，使用方法如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this)
  }

  let user = {
    name: '小明',
    age: 18
  }

  let student = {
    name: '小红',
    age: 16
  }

  // 调用函数并指定 this 的值
  sayHi.apply(user) // this 值为 user
  sayHi.apply(student) // this 值为 student

  // 求和函数
  function counter(x, y) {
    return x + y
  }
  // 调用 counter 函数，并传入参数
  let result = counter.apply(null, [5, 10])
  console.log(result)
</script>
```

总结：

1. `apply` 方法能够在调用函数的同时指定 `this` 的值
2. 使用 `apply` 方法调用函数时，第1个参数为 `this` 指定的值
3. `apply` 方法第2个参数为数组，数组的单元值依次自动传入函数做为函数的参数

#### bind

`bind` 方法并**不会调用函数**，而是创建一个指定了 `this` 值的新函数，使用方法如下代码所示：

> bind()依然用来改变函数this指向，但是它不会像call()与apply()方法那样立即执行这个函数，而是返回一个新的函数给外部，外部用一个变量去接收这个新函数并执行。

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this)
  }
  let user = {
    name: '小明',
    age: 18
  }
  // 调用 bind 指定 this 的值
  let sayHello = sayHi.bind(user);
  // 调用使用 bind 创建的新函数
  sayHello()
</script>
```

注：`bind` 方法创建新的函数，与原函数的唯一的变化是改变了 `this` 的值。

```js
// 需求，有一个按钮，点击里面就禁用，2秒钟之后开启 
document.querySelector('button').addEventListener('click', function () {  //这样写里面慎用箭头函数
      // 禁用按钮
      this.disabled = true  //这个this指向btn
      window.setTimeout(function () {
        // 在这个普通函数里面，我们要this由原来的window 改为 btn
        this.disabled = false   //这个this指向window
      }.bind(this), 2000)   // 这里的this 和 btn 一样  .bind(btn), 2000)
    })
```

#### call、apply、bind 总结

相同点:  都可以改变函数内部的this指向

区别点:

> 区别是call, apply是立即指向该函数，而bind是返回一个新的函数，用于下次调用。

- call和 apply 会调用函数,并且改变函数内部this指向
- call和 apply 传递的参数不一样,call 传递参数 aru1,aru2..形式 apply 必须数组形式[arg]
- bind 不会调用函数,可以改变函数内部this指向

主要应用场景:

- call 调用函数并且可以传递参数
- apply 经常跟数组有关系比如借助于数学对象实现数组最大值最小值
- bind 不调用函数,但是还想改变this指向比如改变定时器内部的this指向

# d12 防抖节流

### 01 防抖（debounce）

所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。（单位时间内频繁触发事件只执行最后一次）

使用场景：搜索框搜索输入、手机号邮箱验证输入检测

实现方式：

- `_.debounce(需要防抖的函数, 需要延迟的时间))`
- 手写防抖函数

```js
  <div class="box"></div>
  <script src="./lodash.min.js"></script>
  <script>
    const box = document.querySelector('.box')
    let i = 1  // 让这个变量++
    // 鼠标移动函数
    function mouseMove() {
      box.innerHTML = ++i
      // 如果里面存在大量操作 dom 的情况，可能会卡顿
    }
    // box.addEventListener('mousemove', mouseMove)
    // lodash 防抖的写法
    box.addEventListener('mousemove', _.debounce(mouseMove, 500))
```

（手写防抖函数）

案例：利用防抖实现性能优化 鼠标经过一次 记一次数

核心思路：

- 定义一个定时器变量（setTimeout）
- 每次鼠标滑动先判断是否有定时器了，如果有先消除之前的定时器
- 如果没有就开启定时器，存到变量里面
- 在定时器里面调用要执行的函数

```js
  <div class="box"></div>
  <script>
    const box = document.querySelector('.box')
    let i = 1  // 让这个变量++
    // 鼠标移动函数
    function mouseMove() {
      box.innerHTML = ++i
      // 如果里面存在大量操作 dom 的情况，可能会卡顿
    }
    // 防抖函数
    function debounce(fn, t) {
      let timeId
      return function () {  //这里要返回 不然一进网页就调用函数了
        // 如果有定时器就清除
        if (timeId) clearTimeout(timeId)
        // 开启定时器 200 给变量
        timeId = setTimeout(function () {
          fn()
        }, t)
      }
    }
    // box.addEventListener('mousemove', mouseMove)
    box.addEventListener('mousemove', debounce(mouseMove, 200))
  </script>
```

### 02 节流（throttle）

所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。（单位时间内频繁触发事件只执行一次）

使用场景：

高频事件：鼠标移动mousenmove、页面尺寸缩放resize、滚动条滚动scroll等

实现方式：

- `_.throttle(fun, 时间))`
- 手写节流函数

```js
box.addEventListener('mousemove', mouseMove)
// lodash 节流写法
box.addEventListener('mousemove', _.throttle(mouseMove, 500))
//500毫秒 不管出发多少次 只执行一次
```

（手写节流函数）

案例：鼠标移动 不管移动多少次 500毫秒才加1

核心思路：

- 定义一个定时器变量（setTimeout）
- 每次鼠标滑动先判断是否有定时器了，如果有先消除之前的定时器
- 如果没有就开启定时器，存到变量里面
- 在定时器里面调用要执行的函数
- 定时器里面要把定时器清空

```js
const box = document.querySelector('.box')
let i = 1  // 让这个变量++
// 鼠标移动函数
function mouseMove() {
    box.innerHTML = ++i
    // 如果里面存在大量操作 dom 的情况，可能会卡顿
}
// console.log(mouseMove)
// 节流函数 throttle 
function debounce(fn, t) {
      let timer = null
      return function () {
        if (!timer) {
        timeId = setTimeout(function () {
          fn()
        //清空定时器
        //clearTimeout(timeId)不用这个 因为定时器还在运作 在setTimeout里面是无法清除的
        timer = null
        }, t)
      }
    }
}
box.addEventListener('mousemove', throttle(mouseMove, 500))
```

案例：页面打开，可以记录上一次视频播放位置

```js
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  <script>
    // 1. 获取元素  要对视频进行操作
    const video = document.querySelector('video')
    video.ontimeupdate = _.throttle(() => {
      // ontimeupdate：事件在视频/音频当前的播放位置发生改变时触发
      // console.log(video.currentTime) 获得当前的视频时间
      // 把当前的时间存储到本地存储
      localStorage.setItem('currentTime', video.currentTime)
    }, 1000)

    // 打开页面触发事件，就从本地存储里面取出记录的时间， 赋值给  video.currentTime
    // onloadeddata：事件在当前帧的数据加载完成且还没有足够的数据播放视频/音频的下一帧触发
    video.onloadeddata = () => {
      video.currentTime = localStorage.getItem('currentTime') || 0  //逻辑中断 防止第一次打开为空
    }
```
