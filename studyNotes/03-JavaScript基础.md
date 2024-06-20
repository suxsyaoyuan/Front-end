# JavaScript 基础 - 第1天

> 了解变量、数据类型、运算符等基础概念，能够实现数据类型的转换，结合四则运算体会如何编程。

- 体会现实世界中的事物与计算机的关系
- 理解什么是数据并知道数据的分类
- 理解变量存储数据的“容器”
- 掌握常见运算符的使用，了解优先级关系
- 知道 JavaScript 数据类型隐式转换的特征

# d1 介绍

> 掌握 JavaScript 的引入方式，初步认识 JavaScript 的作用

### 引入方式

JavaScript 程序不能独立运行，它需要被嵌入 HTML 中，然后浏览器才能执行 JavaScript 代码。通过 `script` 标签将 JavaScript 代码引入到 HTML 中，有两种方式：

#### 内部方式

通过 `script` 标签包裹 JavaScript 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 引入方式</title>
</head>
<body>
  <!-- 内联形式：通过 script 标签包裹 JavaScript 代码 -->
  <script>
    alert('嗨，欢迎来传智播学习前端技术！')
  </script>
</body>
</html>
```

#### 外部形式

一般将 JavaScript 代码写在独立的以 .js 结尾的文件中，然后通过 `script` 标签的 `src` 属性引入

```javascript
// demo.js
document.write('嗨，欢迎来传智播学习前端技术！')
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 引入方式</title>
</head>
<body>
  <!-- 外部形式：通过 script 的 src 属性引入独立的 .js 文件 -->
  <script src="demo.js"></script>
</body>
</html>
```

如果 script 标签使用 src 属性引入了某 .js 文件，那么 标签的代码会被忽略！！！如下代码所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 引入方式</title>
</head>
<body>
  <!-- 外部形式：通过 script 的 src 属性引入独立的 .js 文件 -->
  <script src="demo.js">
    // 此处的代码会被忽略掉！！！！
    alert(666);  
  </script>
</body>
</html>
```

###  注释和结束符

通过注释可以屏蔽代码被执行或者添加备注信息，JavaScript 支持两种形式注释语法：

#### 单行注释

使用 `// ` 注释单行代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 注释</title>
</head>
<body>
  
  <script>
    // 这种是单行注释的语法
    // 一次只能注释一行
    // 可以重复注释
    document.write('嗨，欢迎来传智播学习前端技术！');
  </script>
</body>
</html>
```

#### 多行注释

使用 `/* */` 注释多行代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 注释</title>
</head>
<body>
  
  <script>
    /* 这种的是多行注释的语法 */
    /*
      更常见的多行注释是这种写法
      在些可以任意换行
      多少行都可以
      */
    document.write('嗨，欢迎来传智播学习前端技术！')
  </script>
</body>
</html>
```

**注：编辑器中单行注释的快捷键为 `ctrl + /`**

### 结束符

在 JavaScript 中 `;` 代表一段代码的结束，多数情况下可以省略 `;` 使用回车（enter）替代。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 结束符</title>
</head>
<body>
  
  <script> 
    alert(1);
    alert(2);
    alert(1)
    alert(2)
  </script>
</body>
</html>
```

实际开发中有许多人主张书写 JavaScript 代码时省略结束符 `;`

### 输入和输出

输出和输入也可理解为人和计算机的交互，用户通过键盘、鼠标等向计算机输入信息，计算机处理后再展示结果给用户，这便是一次输入和输出的过程。

举例说明：如按键盘上的方向键，向上/下键可以滚动页面，按向上/下键这个动作叫作输入，页面发生了滚动了这便叫输出。

#### 输出

JavaScript 可以接收用户的输入，然后再将输入的结果输出：

```
alert()`、`document.wirte()
```

以数字为例，向 `alert()` 或 `document.write()`输入任意数字，他都会以弹窗形式展示（输出）给用户。

####  输入

向 `prompt()` 输入任意内容会以弹窗形式出现在浏览器中，一般提示用户输入一些内容。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 输入输出</title>
</head>
<body>
  
  <script> 
    // 1. 输入的任意数字，都会以弹窗形式展示
    document.write('要输出的内容')
    alert('要输出的内容');

    // 2. 以弹窗形式提示用户输入姓名，注意这里的文字使用英文的引号
    prompt('请输入您的姓名:')
  </script>
</body>
</html>
```

# d2 变量

> 理解变量是计算机存储数据的“容器”，掌握变量的声明方式

变量是计算机中用来存储数据的“容器”，它可以让计算机变得有记忆，通俗的理解变量就是**使用【某个符号】来代表【某个具体的数值】（数据）**

变量是程序在内存中申请的一块用来存放数据的空间。

为什么需要变量：有一些数据需要保存。

变量是什么：变量是一个容器，用来保存数据的。

```html
<script>
  // x 符号代表了 5 这个数值
  x = 5
  // y 符号代表了 6 这个数值
  y = 6
    
  //举例： 在 JavaScript 中使用变量可以将某个数据（数值）记录下来！

  // 将用户输入的内容保存在 num 这个变量（容器）中
  num = prompt('请输入一数字!')

  // 通过 num 变量（容器）将用户输入的内容输出出来
  alert(num)
  document.write(num)
</script>
```

### 01 声明

声明(定义)变量有两部分构成：声明关键字、变量名（标识）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 声明和赋值</title>
</head>
<body>
  
  <script> 
    // let 变量名
    // 声明(定义)变量有两部分构成：声明关键字、变量名（标识）
    // let 即关键字，所谓关键字是系统提供的专门用来声明（定义）变量的词语
    // age 即变量的名称，也叫标识符
    let age
  </script>
</body>
</html>
```

关键字是 JavaScript 中内置的一些英文词汇（单词或缩写），它们代表某些特定的含义，如 `let` 的含义是声明变量的，看到 `let`  后就可想到这行代码的意思是在声明变量，如 `let age;` 

`let` 和 `var` 都是 JavaScript 中的声明变量的关键字，推荐使用 `let` 声明变量！！！

### 02 赋值

声明（定义）变量相当于创造了一个空的“容器”，通过赋值向这个容器中添加数据。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 声明和赋值</title>
</head>
<body>
  
  <script> 
    // 声明(定义)变量有两部分构成：声明关键字、变量名（标识）
    // let 即关键字，所谓关键字是系统提供的专门用来声明（定义）变量的词语
    // age 即变量的名称，也叫标识符
    let age
    // 赋值，将 18 这个数据存入了 age 这个“容器”中
    age = 18
    // 这样 age 的值就成了 18
    document.write(age)
    
    // 也可以声明和赋值同时进行
    let str = 'hello world!'
    alert(str);
  </script>
</body>
</html>
```

### 03 关键字

JavaScript 使用专门的关键字 `let` 和 `var` 来声明（定义）变量，在使用时需要注意一些细节：

以下是使用 `let` 时的注意事项：

1. 允许声明和赋值同时进行
2. 不允许重复声明
3. 允许同时声明多个变量并赋值
4. JavaScript 中内置的一些关键字不能被当做变量名

以下是使用 `var` 时的注意事项：

2. 允许声明和赋值同时进行
2. 允许重复声明
3. 允许同时声明多个变量并赋值

大部分情况使用 `let` 和 `var` 区别不大，但是 `let` 相较 `var` 更严谨，因此推荐使用 `let`，后期会更进一步介绍二者间的区别。

### 04 变量名命名规则

关于变量的名称（标识符）有一系列的规则需要遵守：

- 由字母（A—Za—z）、数字（0—9）、下划线（）、美元符号（5）组成，如： usrAge， num01， name
- 严格区分大小写。var app；和var App；是两个变量
- 不能以数字开头。18age是错误的
- 不能是关键字、保留字。例如： var， for， while
- 变量名必须有意义。MMD BBD  nl— age
- 遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。myFirstName
- 尽量不要使用 name 作为变量名
- JavaScript 内部已占用于单词（关键字或保留字）不允许使用

注：所谓关键字是指 JavaScript 内部使用的词语，如 `let` 和`var`，保留字是指 JavaScript 内部目前没有使用的词语，但是将来可能会使用词语。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 变量名命名规则</title>
</head>
<body>
  
  <script> 
    let age = 18 // 正确
    let age1 = 18 // 正确
    let _age = 18 // 正确

    // let 1age = 18; // 错误，不可以数字开头
    let $age = 18 // 正确
    let Age = 24 // 正确，它与小写的 age 是不同的变量
    // let let = 18; // 错误，let 是关键字
    let int = 123 // 不推荐，int 是保留字
  </script>
</body>
</html>
```

### 05 常量

概念：使用 const 声明的变量称为“常量”。

使用场景：当某个变量永远不会改变的时候，就可以使用 const 来声明，而不是let。

命名规范：和变量一致

~~~javascript
const PI = 3.14
~~~

>注意： 常量不允许重新赋值,声明的时候必须赋值（初始化）

# d3 数据类型

> 计算机世界中的万事成物都是数据。

在计算机中，不同的数据所需占用的存储空间是不同的，为了便于把数据分成所需内存大小不同的数据，充分利用存储空间，于是定义了不同的数据类型。

简单来说，数据类型就是数据的类别型号。比如姓名“张三” ，年龄18，这些数据的类型是不一样的。

计算机程序可以处理大量的数据，为了方便数据的管理，将数据分成了不同的类型：

注：通过 typeof 关键字检测数据类型

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    // 检测 1 是什么类型数据，结果为 number
    document.write(typeof 1)
  </script>
</body>
</html>
```

**JavaScript中的简单数据类型及其说明如下：**

| **简单数据类型** | **说明**                                                 | **默认值**    |
| ---------------- | -------------------------------------------------------- | ------------- |
| **Number**       | **数字型，包含整值和浮点值，如21、0.21**                 | **0**         |
| **Boolean**      | **布尔值类型，如true、 false，等价于1和0**               | **false**     |
| **String**       | **字符串类型，如“张三”注意js 里面，字符串都带引号**      | **""**        |
| **Undefined**    | **var a; 声明了变量a但是没有给值，此时a =undefinedNull** | **undefined** |
| **Null**         | **var a = null; 声明了变量a为空值**                      | **null**      |

> 值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol
>
> 引用数据类型：对象(Object)、数组(Array)、函数(Function)

### 01  数值类型

即我们数学中学习到的数字，可以是整数、小数、正数、负数

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    let score = 100 // 正整数
    let price = 12.345 // 小数
    let temperature = -40 // 负数

    document.write(typeof score) // 结果为 number
    document.write(typeof price) // 结果为 number
    document.write(typeof temperature) // 结果为 number
  </script>
</body>
</html>
```

JavaScript 中的数值类型与数学中的数字是一样的，分为正数、负数、小数等。

常见：**二**进制、八进制、十进制、十六进制

0123: 0 开头表示八进制

0b11: 0b 开头表示二进制

0x11: 0x 开头表示十六进制

直接打印出来会转化为十进制

```js
console.log(Number.MAX_VALUE);  // 最大值
console.log(Number.MIN_VALUE);  // 最小值
console.log(Infinity);  // Infinity：无穷大
console.log(-Infinity);  // -Infinity：无穷小
console.log(NaN);  // NaN：Not a number，代表一个非数值。
console.log(isNaN(12));
// isNaN 方法用来判断一个变量和或者一个值是数字类型，若不是数字类型则返回 true；否则返回 false
```



### 02 字符串类型

通过单引号（ `''`） 、双引号（ `""`）或反引号包裹的数据都叫字符串，单引号和双引号没有本质上的区别，推荐使用单引号。

注意事项：

1. 无论单引号或是双引号必须成对使用
2. 单引号/双引号可以互相嵌套，但是不以自已嵌套自已
3. 必要时可以使用转义符 `\`，输出单引号或双引号
   - `\n` 换行符
   - `\t`  tab 缩进
   - `\b` 空格

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    let user_name = '小明' // 使用单引号
    let gender = "男" // 使用双引号
    let str = '123' // 看上去是数字，但是用引号包裹了就成了字符串了
    let str1 = '' // 这种情况叫空字符串
    
    documeent.write(typeof user_name) // 结果为 string
    documeent.write(typeof gender) // 结果为 string
    documeent.write(typeof str) // 结果为 string
      
    //获取字符串长度 length
      console.log(str.length);
  </script>
</body>
</html>
```



### 03 布尔类型

表示肯定或否定时在计算机中对应的是布尔类型数据，它有两个固定的值 `true` 和 `false`，表示肯定的数据用 `true`，表示否定的数据用 `false`。

布尔型（true，false）在参与加法时当作 1 和 0 使用。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  <script> 
    //  pink老师帅不帅？回答 是 或 否
    let isCool = true // 是的，摔死了！
    isCool = false // 不，套马杆的汉子！

    document.write(typeof isCool) // 结果为 boolean
  </script>
</body>
</html>
```

### 04 undefined

未定义是比较特殊的类型，只有一个值 undefined，只声明变量，不赋值的情况下，变量的默认值为 undefined，一般很少【直接】为某个变量赋值为 undefined。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 数据类型</title>
</head>
<body>
  
  <script> 
    // 只声明了变量，并末赋值
    let tmp;
    document.write(typeof tmp) // 结果为 undefined
  </script>
</body>
</html>
```

**注：JavaScript 中变量的值决定了变量的数据类型。**

```js
console.log(undefined+1); // NaN
console.log(undefined+NaN); // NaN
console.log(undefined+true); // NaN
console.log(undefined+'aaa'); // undefinedaaa
console.log(undefined+undefined); // NaN
```

### 05 空值 Null

```js
console.log(null+1); // 1
console.log(null+undefined); // NaN
console.log(null+NaN); // NaN
console.log(null+true); // 1
console.log(null+'aaa'); // nullaaa
console.log(null+null); // 0
```

### 06 获取变量数据类型

#### A typeof 获取变量数据类型

使用 typeof 运算符查看变量的数据类型：

两种形式：`typeof (variable)`、`typeof variable` 返回一个字符串，值为该变量的数据类型。

```js
Var num = 10;
console.log(typeof num); // number 蓝色

Var flag= false;
console.log(typeof flag); // boolean 深蓝色

Var str= ‘aaa’;
console.log(typeof str);   // string 黑色

Var vari = undefined;
console.log(typeof vari);// undefined

Var timer = null;
console.log(typeof timer); // object
console.log(typeof NaN); // number
console.log(typeof Infinity); // number
prompt得到的值是字符型
```

> 以字符串的形式返回类型名称：例如 string
>
> typeof null 会返回 "object" —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 object。

#### B 字面量

字面量是在源代码中一个固定的表示法，通俗来说，就是字面量如何表达这个值。

- 数字字面量：1、0

- 字符串字面量：mphy、aaa

- 布尔字面量：true、false

### 07 类型转换

> 理解弱类型语言的特征，掌握显式类型转换的方法

在 JavaScript 中数据被分成了不同的类型，如数值、字符串、布尔值、undefined，在实际编程的过程中，不同数据类型之间存在着转换的关系。

#### A 隐式转换

某些**运算符**被执行时，系统内部自动将数据类型进行转换，这种转换称为隐式转换。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 隐式转换</title>
</head>
<body>
  <script> 
    let num = 13 // 数值
    let num2 = '2' // 字符串

    // 结果为 132
    // 原因是将数值 num 转换成了字符串，相当于 '13'
    // 然后 + 将两个字符串拼接到了一起
    console.log(num + num2)

    // 结果为 11
    // 原因是将字符串 num2 转换成了数值，相当于 2
    // 然后数值 13 减去 数值 2
    console.log(num - num2)

    let a = prompt('请输入一个数字')
    let b = prompt('请再输入一个数字')

    alert(a + b);
  </script>
</body>
</html>
```

注：数据类型的隐式转换是 JavaScript 的特征，后续学习中还会遇到，目前先需要理解什么是隐式转换。

```js
console.log('123' - 0); // 123
console.log('123' - ''); // 123
console.log('100px' - ''); // NaN
console.log('10' + '2'); // 102
console.log('10' - '2'); // 8
console.log('10' + '3.2'); // 103.2
console.log('10' - '3.2'); // 6.8
console.log('12'\*3); // 36
```



#### B 显式转换

编写程序时过度依靠系统内部的隐式转换是不严禁的，因为隐式转换规律并不清晰，大多是靠经验总结的规律。为了避免因隐式转换带来的问题，通常根逻辑需要对数据进行显示转换。

##### 1 转换为数字型

| **方式**                | 说明                           | 案例                                 |
| ----------------------- | ------------------------------ | ------------------------------------ |
| **parseInt(str) 函数**  | **string->整数型**             | **parseInt('10')**                   |
| **parseFloat() 函数**   | **string->浮点型**             | **parseFloat('3.14')**               |
| **Number() 强转换函数** | **string->数字型**             | **Number('12')**                     |
| **JS 隐式转换**         | **算术运算符隐式转换为数字型** | **'12'-  0 或 '12' - '' 或 '12'\*1** |

```js
//parseInt(str) 函数
console.log(parseInt('123')); // 123  整数  去单位
console.log(parseInt('120px')); // 120
console.log(parseInt('3.14159')); // 3

//parseFloat() 函数
console.log(parseFloat('3.14')); // 3.14  小数  去单位
console.log(parseFloat('999')); // 999

//Number
console.log(Number('100')); // 100
console.log(Number('100.32')); // 100.32
console.log(Number('100px')); // NaN
```

通过 `Number` 显示转换成数值类型，当转换失败时结果为 `NaN`（Not a Number）即不是一个数字。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 隐式转换</title>
</head>
<body>
  <script>
    let t = '12'
    let f = 8
    // 显式将字符串 12 转换成数值 12
    t = Number(t)

    // 检测转换后的类型
    // console.log(typeof t);
    console.log(t + f) // 结果为 20

    // 并不是所有的值都可以被转成数值类型
    let str = 'hello'
    // 将 hello 转成数值是不现实的，当无法转换成
    // 数值时，得到的结果为 NaN （Not a Number）
    console.log(Number(str))
  </script>
</body>
</html>
```

##### 2 转换成字符串

```js
//1）变量.toString() 方法
var num = 12;
console.log(num.toString());

//2）String(变量) 方法
console.log(String(num));

//3）加号 + 拼接字符串
console.log(num + '');

//一般用第三种方式，隐式转换。
引申：数字字符长转数字
var str = '123'
console.log(str - '');
```

注意：

数字字符串（'12.3'，12）之间进行加法运算实际上是字符串的拼接，结果还是字符串；而数字字符串之间的减法运算是算术运算，结果是数字型。

一个数字字符长和一个数字相乘，结果是算数运算结果，为数字型。

##### 3 转换为布尔型

```js
// 使用 Boolean() 函数转换：
·'', 0, NaN, null, undefined（5个）转换值为 false
console.log(Boolean('')); // false
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false

// 其他的转换值均为 true
console.log(Boolean([])); // truevar sex;
console.log(sex);
// 结果是undefined
```

 

### 08 拓展

#### A 标识符

标识（zhi）符：就是指开发人员为变量、属性、函数、参数取的名字。标识符不能是关键字或保留字。

#### B 关键字

关键字：是指JS本身已经使用了的字，不能再用它们充当变量名、方法名。

包括: break, case, catch, continue, default, devare, do, else, finally. for, function, if, in instanceof, new. return, switch, this, throw, try, typeof, var, void, while, with等。

#### C 保留字

保留字：实际上就是预留的“关键字” ，意思是现在虽然还不是关键字，但是未来可能会成为关键字，同样不能使用它们当变量名或方法名。

包括: boolean, byte, char, class, const, debugger, double, enum, export, extends fimal, float. goto, implements, import, int, interface, long, mative, package private, protected, public, short, static, super, synchronized, throws, transient volatile等。

#### D 基本数据类型

8 种基本数据类型中，前 7 种为基本数据类型，最后 1 种为复杂数据类型（object）。

number：用于任何类型的数字：整数或浮点数，在 ±(253−1)范围内的整数。

bigint：用于任意长的整数。

string：字符串，一个字符串可以包含 0 个或多个字符，没有单独的单字符类型。

boolean：值为 true 或 false

null：未知的值，只有一个 null 值的独立类型。

undefined：未定义得值，只有一个 undefined 值的独立类型。

symbol：用于唯一的标识符。

object：用于更复杂的数据结构。

> 值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol
>
> 引用数据类型：对象(Object)、数组(Array)、函数(Function)

# JavaScript 基础 - 第2天

> 理解什么是流程控制，知道条件控制的种类并掌握其对应的语法规则，具备利用循环编写简易ATM取款机程序能力

- 运算符
- 语句
- 综合案例


# d4 运算符

### 01 算术运算符

数字是用来计算的，比如：乘法 * 、除法 / 、加法 + 、减法 - 等等，所以经常和算术运算符一起。

算术运算符：也叫数学运算符，主要包括加、减、乘、除、取余（求模）等

| 运算符 | 作用                                                 |
| ------ | ---------------------------------------------------- |
| +      | 求和                                                 |
| -      | 求差                                                 |
| *      | 求积                                                 |
| /      | 求商                                                 |
| **%**  | 取模（取余数），开发中经常用于作为某个数字是否被整除 |

> 注意：在计算失败时，显示的结果是 NaN （not a number）

```javascript
// 算术运算符
console.log(1 + 2 * 3 / 2) //  4 
let num = 10
console.log(num + 10)  // 20
console.log(num + num)  // 20

// 1. 取模(取余数)  使用场景：  用来判断某个数是否能够被整除
console.log(4 % 2) //  0  
console.log(6 % 3) //  0
console.log(5 % 3) //  2
console.log(3 % 5) //  3

// 2. 注意事项 : 如果我们计算失败，则返回的结果是 NaN (not a number)
console.log('pink老师' - 2)
console.log('pink老师' * 2)
console.log('pink老师' + 2)   // pink老师2
```

#### A 浮点数的精度问题

浮点数值的最高精度是17位小数，但在进行算术计算时其精确度远远不如整数。

```js
var result =0.1+0.2; //结果不是0.3，而是： 0.30000000000000004 
console.log(0.07 * 100); //结果不是7，而是： 7.000000000000001
```

注意：JS 中不要直接用浮点数之间进行运算，会产生精度误差。不要直接拿两个浮点数进行比较！

#### B 表达式和返回值

表达式：是由数字、运算符、变量等以能求得数值的有意义排列方法所得的组合简单理解：是由数字、运算符、变量等组成的式子

返回值：表达式最终都会有一个结果，返回给我们，我们称为返回值

### 02 赋值运算符

赋值运算符：对变量进行赋值的运算符

 =     将等号右边的值赋予给左边, 要求左边必须是一个容器

| 运算符 | 作用     |
| ------ | -------- |
| +=     | 加法赋值 |
| -+     | 减法赋值 |
| *=     | 乘法赋值 |
| /=     | 除法赋值 |
| %=     | 取余赋值 |

```javascript
<script>
let num = 1
// num = num + 1
// 采取赋值运算符
// num += 1
num += 3
console.log(num)
</script>
```

### 03 自增/自减运算符

| 符号 | 作用 | 说明                       |
| ---- | ---- | -------------------------- |
| ++   | 自增 | 变量自身的值加1，例如: x++ |
| --   | 自减 | 变量自身的值减1，例如: x-- |

1. ++在前和++在后在单独使用时二者并没有差别，而且一般开发中我们都是独立使用
2. ++在后（后缀式）我们会使用更多

> 注意：
>
> 1. 只有变量能够使用自增和自减运算符
>
> 2. ++、-- 可以在变量前面也可以在变量后面，比如: x++  或者  ++x 
>
>    放在变量前面时，我们可以称为前置递增（递减）运算符，放在变量后面时，我们可以称为后置递增（递减）运算符。
>
>    前置递增运算符 	`++i`
>
>    前置递减运算符 	`--i`
>
>    后置递增运算符 	`i++`
>
>    后置递减运算符 	`i--`

```javascript
<script>
    // let num = 10
    // num = num + 1
    // num += 1
    // // 1. 前置自增
    // let i = 1
    // ++i
    // console.log(i)

    // let i = 1
    // console.log(++i + 1)
    // 2. 后置自增
    // let i = 1
    // i++
    // console.log(i)
    // let i = 1
    // console.log(i++ + 1)

    // 了解 
    let i = 1
    console.log(i++ + ++i + i)
  </script>
```

```js
// 前置：先自加，后运算（先已后人）
Var a=10;
Console.log(++a  + 10);  21  a=++a=11

// 后置：先原值运算，后自加（先人后己）
Console.log(a++  + 10);  20  a++=10  a=11
Console.log(a++  +  ++a);   22  a++=10  a=11  ++a=12

// 开发时，大多使用后置递增/减，并且代码独占一行，例如：num++; 或者num--;
```



### 04 比较运算符

使用场景：比较两个数据大小、是否相等，根据比较结果返回一个布尔值（true / false）

| 运算符 | 作用                                   |
| ------ | -------------------------------------- |
| >      | 左边是否大于右边                       |
| <      | 左边是否小于右边                       |
| >=     | 左边是否大于或等于右边                 |
| <=     | 左边是否小于或等于右边                 |
| ===    | 左右两边是否`类型`和`值`都相等（重点） |
| ==     | 左右两边`值`是否相等                   |
| !=     | 左右值不相等                           |
| !==    | 左右两边是否不全等                     |

```javascript
<script>
  console.log(3 > 5)
  console.log(3 >= 3)
  console.log(2 == 2)
  // 比较运算符有隐式转换 把'2' 转换为 2  双等号 只判断值
  console.log(2 == '2')  // true
  // console.log(undefined === null)
  // === 全等 判断 值 和 数据类型都一样才行
  // 以后判断是否相等 请用 ===  
  console.log(2 === '2')
  console.log(NaN === NaN) // NaN 不等于任何人，包括他自己
  console.log(2 !== '2')  // true  
  console.log(2 != '2') // false 
  console.log('-------------------------')
  console.log('a' < 'b') // true
  console.log('aa' < 'ab') // true
  console.log('aa' < 'aac') // true
  console.log('-------------------------')
</script>
```

```js
''、0、false 之间（或 '1'、1、true之间）进行 == 比较的结果为 true
NaN 与其他任何数据类型之间 == 比较结果为 false
null 只有在和自身以及 undefined 之间 == 比较时结果为 true
undefined 只有在和自身以及 null 之间 == 比较时结果为 true
数字和数字字符串的值相等，则 == 比较的结果为 true
以上这些例子在全等比较 === 下的结果均为 false

console.log('18' == 18); // true
console.log('' == false); // truw
console.log('' == 0); // truw
console.log(0 == false); // true
console.log('1' == 1 == true); // true

// console.log('NaN与其他值比较:');
console.log(NaN == 0); // false
console.log(NaN == ''); // false
console.log(NaN == NaN); // false
console.log(NaN == null); // false
console.log(NaN == false); // false
console.log(NaN == undefined); // false

// console.log('null与其他值：');
console.log(null == null); // true
console.log(null == undefined); // true
console.log(null == 0); // false
console.log(null == ''); // false
console.log(null == NaN); // false
console.log(null == false); // false

// console.log('undefined与其他值比较:');
console.log(undefined == null);  // true
console.log(undefined == undefined);  // true
console.log(undefined == 0);  // false
console.log(undefined == '');  // false
console.log(undefined == NaN);  // false
console.log(undefined == false);  // false
```



### 05 逻辑运算符

使用场景：可以把多个布尔值放到一起运算，最终返回一个布尔值

| 符号 | 名称   | 日常读法 | 特点                       | 口诀           |
| ---- | ------ | -------- | -------------------------- | -------------- |
| &&   | 逻辑与 | 并且     | 符号两边有一个假的结果为假 | 一假则假       |
| \|\| | 逻辑或 | 或者     | 符号两边有一个真的结果为真 | 一真则真       |
| !    | 逻辑非 | 取反     | true变false  false变true   | 真变假，假变真 |

| A     | B     | A && B | A \|\| B | !A    |
| ----- | ----- | ------ | -------- | ----- |
| false | false | false  | false    | true  |
| false | true  | false  | true     | true  |
| true  | false | false  | true     | false |
| true  | true  | true   | true     | false |

```javascript
<script>
    // 逻辑与 一假则假
    console.log(true && true)
    console.log(false && true)
    console.log(3 < 5 && 3 > 2)
    console.log(3 < 5 && 3 < 2)
    console.log('-----------------')
    // 逻辑或 一真则真
    console.log(true || true)
    console.log(false || true)
    console.log(false || false)
    console.log('-----------------')
    // 逻辑非  取反
    console.log(!true)
    console.log(!false)

    console.log('-----------------')

    let num = 6
    console.log(num > 5 && num < 10)
    console.log('-----------------')
  </script>
```

**逻辑中断（短路操作）**

原理：多个表达式进行逻辑运算，当左边的表达式值可以确定最终结果时，不再继续运算右边其余的表达式。

```js
// 逻辑与 &&：
// 语法：expr1 && expr2 && ...
// 若 expr1 为真，则返回 expr2
// 若 expr1 为假，则返回 expr1
console.log(123 && 456); // 456
console.log(false && 123); // false
console.log(1 && 2 && 3); // 3
console.log(1 && 1 && false && 2); // false

// 逻辑或 ||：
// 语法：expr1 || expr2 || 
// 若 expr1 为假，则返回 expr2
// 若 expr1 为真，则返回 expr1
console.log(0 || 12); // 12
console.log(true ||  false || 2); // true
console.log(0 || false || true || -2); // true
```



### 06 运算符优先级

![img](file:///C:\Users\苏渺\AppData\Local\Temp\ksohtml13276\wps2.jpg) 

> 逻辑运算符优先级： ！> && >  ||  
>
> 一元运算符里面的逻辑非优先级很高
>

### 07 拓展：特殊运算符

#### A 数字转化：单目运算符 +

单目运算符 + 作用于数字无效，结果不变。但是可以用来转化非数字类型为数字，等效于 Number()。

```js
var x = false;
var y = "";
var z = "123.4";
console.log(+x); // 0
console.log(+y); // 0
console.log(+z); // 123.4
```

用于非数字型之间的数学运算，很简洁：

```js
var a = "12";
var b = "24";
console.log(+a + +b); // 36
```

#### B 逗号运算符 ,

逗号运算符能让我们处理多个语句，使用 , 将它们分开。每个语句都运行了，但是只有最后的语句的结果会被返回。

```js
var a = (3 + 4, 5 + 6);
console.log(a); // 11
```

#### C 布尔值转换符 !!

两个相邻的非逻辑运算符组成的 !!，可以将一个值转换为对应的布尔值。等效于 Boolean()。

```js
console.log(!!"0"); // true
console.log(!!0); // false
console.log(!!undefined); //false
console.log(!!"aaa"); // true
```

#### D 空值合并运算符 ??

我们将值既不是 null 也不是 undefined 的表达式定义为已定义的值（defined）。即：??。

a ?? b 结果为：

若 a 已定义，则结果为 a

若 a 不是已定义的，则结果为 b

等价于：(a !== null && a !== undefined) ? a : b;



# d5 语句

### 01 分支语句

分支语句可以根据条件判定真假，来选择性的执行想要的代码

分支语句包含：

1. if分支语句（重点）
2. 三元运算符
3. switch语句

#### A if 分支语句

语法：

~~~javascript
if(条件表达式) {
  // 满足条件要执行的语句
}
~~~

小括号内的条件结果是布尔值，为 true 时，进入大括号里执行代码；为false，则不执行大括号里面代码

小括号内的结果若不是布尔类型时，会发生类型转换为布尔值，类似Boolean()

如果大括号只有一个语句，大括号可以省略，但是，俺们不提倡这么做~

~~~javascript
<script>
    // 单分支语句
    // if (false) {
    //   console.log('执行语句')
    // }
    // if (3 > 5) {
    //   console.log('执行语句')
    // }
    // if (2 === '2') {
    //   console.log('执行语句')
    // }
    //  1. 除了0 所有的数字都为真
    //   if (0) {
    //     console.log('执行语句')
    //   }
    // 2.除了 '' 所有的字符串都为真 true
    // if ('pink老师') {
    //   console.log('执行语句')
    // }
    // if ('') {
    //   console.log('执行语句')
    // }
    // // if ('') console.log('执行语句')

    // 1. 用户输入
    let score = +prompt('请输入成绩')
    // 2. 进行判断输出
    if (score >= 700) {
      alert('恭喜考入黑马程序员')
    }
    console.log('-----------------')

  </script>
~~~

#### B if双分支语句

如果有两个条件的时候，可以使用 if else 双分支语句

~~~javascript
if (条件表达式){
  // 满足条件要执行的语句
} else {
  // 不满足条件要执行的语句
}
~~~

例如：

~~~javascript
 <script>
    // 1. 用户输入
    let uname = prompt('请输入用户名:')
    let pwd = prompt('请输入密码:')
    // 2. 判断输出
    if (uname === 'pink' && pwd === '123456') {
      alert('恭喜登录成功')
    } else {
      alert('用户名或者密码错误')
    }
  </script>
~~~

#### C if 多分支语句

使用场景： 适合于有多个条件的时候

~~~javascript
 <script>
    // 1. 用户输入
    let score = +prompt('请输入成绩：')
    // 2. 判断输出
    if (score >= 90) {
      alert('成绩优秀，宝贝，你是我的骄傲')
    } else if (score >= 70) {
      alert('成绩良好，宝贝，你要加油哦~~')
    } else if (score >= 60) {
      alert('成绩及格，宝贝，你很危险~')
    } else {
      alert('成绩不及格，宝贝，我不想和你说话，我只想用鞭子和你说话~')
    }
  </script>
~~~

#### D  三元运算符（三元表达式）

**使用场景**： 一些简单的双分支，可以使用  三元运算符（三元表达式），写起来比 if  else双分支 更简单

**符号**：? 与 : 配合使用

语法：

~~~javascript
条件 ? 表达式1 ： 表达式2
~~~

例如：

~~~javascript
// 三元运算符（三元表达式）
// 1. 语法格式
// 条件 ? 表达式1 : 表达式2 

// 2. 执行过程 
// 2.1 如果条件为真，则执行表达式1
// 2.2 如果条件为假，则执行表达式2

// 3. 验证
// 5 > 3 ? '真的' : '假的'
console.log(5 < 3 ? '真的' : '假的')

// let age = 18 
// age = age + 1
//  age++

// 1. 用户输入 
let num = prompt('请您输入一个数字:')
// 2. 判断输出- 小于10才补0
// num = num < 10 ? 0 + num : num
num = num >= 10 ? num : 0 + num
alert(num)
~~~

#### E switch语句（了解）

使用场景： 适合于有多个条件的时候，也属于分支语句，大部分情况下和 if多分支语句 功能相同

注意：

1. switch case语句一般用于等值判断, if适合于区间判断
2. switchcase一般需要配合break关键字使用 没有break会造成case穿透
3. if 多分支语句开发要比switch更重要，使用也更多

例如：

~~~javascript
// switch分支语句
// 1. 语法
// switch (表达式) {
//   case 值1:
//     代码1
//     break

//   case 值2:
//     代码2
//     break
//   ...
//   default:
//     代码n
// }

<script>
  switch (2) {
    case 1:
    console.log('您选择的是1')
    break  // 退出switch
    case 2:
    console.log('您选择的是2')
    break  // 退出switch
    case 3:
    console.log('您选择的是3')
    break  // 退出switch
    default:
    console.log('没有符合条件的')
  }
</script>
~~~

#### F if 多分支语句和 switch的区别：

1. 共同点

   - 都能实现多分支选择， 多选1 
   - 大部分情况下可以互换

2. 区别：

   - switch…case语句通常处理case为比较**确定值**的情况，而if…else…语句更加灵活，通常用于**范围判断**(大于，等于某个范围)。
   - switch 语句进行判断后直接执行到程序的语句，效率更高，而if…else语句有几种判断条件，就得判断多少次
   - switch 一定要注意 必须是 ===  全等，一定注意 数据类型，同时注意break否则会有穿透效果
   - 结论：
     - 当分支比较少时，if…else语句执行效率高。
     - 当分支比较多时，switch语句执行效率高，而且结构更清晰。

#### G 断点调试

**作用：**学习时可以帮助更好的理解代码运行，工作时可以更快找到bug

浏览器打开调试界面

1. 按F12打开开发者工具
2. 点到源代码一栏 （ sources ）
3. 选择代码文件

**断点：**在某句代码上加的标记就叫断点，当程序执行到这句有标记的代码时会暂停下来



### 02 循环语句

使用场景：重复执行 指定的一段代码，比如我们想要输出10次 '我学的很棒'

学习路径：

1.while循环

2.for 循环（重点）

#### A while循环

while :  在…. 期间， 所以 while循环 就是在满足条件期间，重复执行某些代码。

**语法：**

~~~javascript
while (条件表达式) {
   // 循环体    
}
~~~

例如：

~~~javascript
// while循环: 重复执行代码

// 1. 需求: 利用循环重复打印3次 '月薪过万不是梦，毕业时候见英雄'
let i = 1
while (i <= 3) {
  document.write('月薪过万不是梦，毕业时候见英雄~<br>')
  i++   // 这里千万不要忘了变量自增否则造成死循环
}
~~~

循环三要素：

1.初始值 （经常用变量）

2.终止条件

3.变量的变化量

例如：

~~~javascript
<script>
  // // 1. 变量的起始值
  // let i = 1
  // // 2. 终止条件
  // while (i <= 3) {
  //   document.write('我要循环三次 <br>')
  //   // 3. 变量的变化量
  //   i++
  // }
  // 1. 变量的起始值
  let end = +prompt('请输入次数:')
let i = 1
// 2. 终止条件
while (i <= end) {
  document.write('我要循环三次 <br>')
  // 3. 变量的变化量
  i++
}

</script>
~~~

#### B do...while循环

```js
do {
//循环体
i++
}while (condition);
dowhile 不同的地方在于dowhile先执行一次循环体 再判断条件 
```

```js
var n = 5
do {
  console.log('hello');
} while (--n)
```

#### C for循环

> 掌握 for 循环语句，让程序具备重复执行能力

`for` 是 JavaScript 提供的另一种循环控制的话句，它和 `while` 只是语法上存在差异。

##### 1 for语句的基本使用

1. 实现循环的 3 要素

```html
<script>
  // 1. 语法格式
  // for(起始值; 终止条件; 变化量) {
  //   // 要重复执行的代码
  // }

  // 2. 示例：在网页中输入标题标签
  // 起始值为 1
  // 变化量 i++
  // 终止条件 i <= 6
  for(let i = 1; i <= 6; i++) {
    document.write(`<h${i}>循环控制，即重复执行<h${i}>`)
  }
</script>
```

2. 变化量和死循环，`for` 循环和 `while` 一样，如果不合理设置增量和终止条件，便会产生死循环。


3. 跳出和终止循环

```html
<script>
    // 1. continue 
    for (let i = 1; i <= 5; i++) {
        if (i === 3) {
            continue  // 结束本次循环，继续下一次循环
        }
        console.log(i)
    }
    // 2. break
    for (let i = 1; i <= 5; i++) {
        if (i === 3) {
            break  // 退出结束整个循环
        }
        console.log(i)
    }
</script>
```

结论：

- `JavaScript` 提供了多种语句来实现循环控制，但无论使用哪种语句都离不开循环的3个特征，即起始值、变化量、终止条件，做为初学者应着重体会这3个特征，不必过多纠结三种语句的区别。
- 起始值、变化量、终止条件，由开发者根据逻辑需要进行设计，规避死循环的发生。
- 当如果明确了循环的次数的时候推荐使用`for`循环,当不明确循环的次数的时候推荐使用`while`循环

>注意：`for` 的语法结构更简洁，故 `for` 循环的使用频次会更多。

```js
for ([initExpr]; [condExpr]; [incExpr])**
  statement
// initExpr: 变量初始化
// condExpr: 循环条件
// incExpr：增量表达式
```

##### 2 for循环重复执行相同代码

```js
for (var step = 0; step < 5; step++) {
 // Runs 5 times, with values of step 0 through 4.
 console.log('Walking east one step');**
}
```

##### 3 for循环重复执行不同代码

```js
//计数器变量i
for(var i=1，i<=100;i++)
Console.log((‘这个人今年’** + i+’岁了’)
```

##### 4 for循环重复执某些操作

```js
Sum=sum+i   sum+=i
// Prompt取过来的成绩是字符串型 需要转换为数字型
// 一行打印五个星星  追加字符串  str=str+‘⭐’
```

##### 5 双重for循环

```js
for(外层初始化变量；条件表达式；操作表达式){
for(里层初始化变量；条件表达式；操作表达式)
//执行语句
}
外层循环一次，里面循环执行全部
打印五行五列星星：
var Str=’’;
//外层打印五行
for（var i =1；i<=5;i++）{
for（var i =1；i<=5;i++）//里层打印五列
str=str+‘⭐’;
}
str=str+‘\n’;
}
```

#### D 中止循环

`break`   中止整个循环，一般用于结果已经得到, 后续的循环不需要的时候可以使用（提高效率）  

`continue`  中止本次循环，一般用于排除或者跳过某一个选项的时候

~~~javascript
<script>
    // let i = 1
    // while (i <= 5) {
    //   console.log(i)
    //   if (i === 3) {
    //     break  // 退出循环
    //   }
    //   i++
    // }

    let i = 1
    while (i <= 5) {
      if (i === 3) {
        i++
        continue
      }
      console.log(i)
      i++

    }
  </script>
~~~

#### E 无限循环

1.`while(true)` 来构造“无限”循环，需要使用break退出循环。（常用）

2.`for(;;) `也可以来构造“无限”循环，同样需要使用break退出循环。

~~~javascript
// 无限循环  
// 需求： 页面会一直弹窗询问你爱我吗？
// (1). 如果用户输入的是 '爱'，则退出弹窗
// (2). 否则一直弹窗询问

// 1. while(true) 无限循环
// while (true) {
//   let love = prompt('你爱我吗?')
//   if (love === '爱') {
//     break
//   }
// }

// 2. for(;;) 无限循环
for (; ;) {
  let love = prompt('你爱我吗?')
  if (love === '爱') {
    break
  }
}
~~~

## 0 综合案例-ATM存取款机

分析：

①：提示输入框写到循环里面（无限循环）

②：用户输入4则退出循环 break

③：提前准备一个金额预先存储一个数额 money

④：根据输入不同的值，做不同的操作

​     (1)  取钱则是减法操作， 存钱则是加法操作，查看余额则是直接显示金额

​     (2) 可以使用 if else if 多分支 来执行不同的操作

完整代码：

~~~javascript
<script>
  // 1. 开始循环 输入框写到 循环里面
  // 3. 准备一个总的金额
  let money = 100
while (true) {
  let re = +prompt(`
请您选择操作：
1.存钱
2.取钱
3.查看余额
4.退出
`)
  // 2. 如果用户输入的 4 则退出循环， break  写到if 里面，没有写到switch里面， 因为4需要break退出循环
  if (re === 4) {
    break
  }
  // 4. 根据输入做操作
  switch (re) {
    case 1:
      // 存钱
      let cun = +prompt('请输入存款金额')
      money = money + cun
      break
      case 2:
      // 存钱
      let qu = +prompt('请输入取款金额')
      money = money - qu
      break
      case 3:
      // 存钱
      alert(`您的银行卡余额是${money}`)
      break
  }
}
</script>
~~~

#  JavaScript 基础 - 第3天

# d6 数组

> 知道什么是数组及其应用的场景，掌握数组声明及访问的语法。

### 01 数组是什么？

**数组：**(Array)是一种可以按顺序保存数据的数据类型

> 数组可以把一组相关的数据一起存放，并提供方便的访问方式。
>
> 数组是一组数据的集合，一组数据存储在单个变量名下的优雅方式。

**使用场景：**如果有多个数据可以用数组保存起来，然后放到一个变量中，管理非常方便

### 02 数组的基本使用

#### A 定义数组和数组单元

```html
<script>
  // 1. 语法，使用 [] 来定义一个空数组
  // 定义一个空数组，然后赋值给变量 classes
  // let classes = [];

  // 2. 定义非空数组
  let classes = ['小明', '小刚', '小红', '小丽', '小米']
</script>
```

通过 `[]` 定义数组，数据中可以存放真正的数据，如小明、小刚、小红等这些都是数组中的数据，我们这些数据称为数组单元，数组单元之间使用英文逗号分隔。

#### B 创建数组

##### 1 new Array 创建数组对象

```js
var arr = new Array(); //创建空数组
var arr1 = new Array(2);//创建指定长度的数组，有2个空数组元素
var arr2 = new Array(2, 3);//放有指定元素的数组（[2, 3]）
```

##### 2 数组字面量创建数组

```
var arr = [];//创建空数组
var arr = [1, 2, 3];//创建一般数组
```

数组内可以存放不同类型的元素，例如 ['abc', 1, true, undefined]，数据类型没有限制。

数组里的数据用逗号分割。

数组里的数据成为数据元素。

声明数组并赋值成为数组的初始化。

#### C 访问数组和数组索引

使用数组存放数据并不是最终目的，关键是能够随时的访问到数组中的数据（单元）。其实 JavaScript 为数组中的每一个数据单元都编了号，通过数据单元在数组中的编号便可以轻松访问到数组中的数据单元了。

我们将数据单元在数组中的编号称为索引值，也有人称其为下标。

索引值实际是按着数据单元在数组中的位置依次排列的，注意是从` 0` 开始的。

观察上图可以数据单元【小明】对应的索引值为【0】，数据单元【小红】对应的索引值为【2】

```html
<script>
  let classes = ['小明', '小刚', '小红', '小丽', '小米']
  
  // 1. 访问数组，语法格式为：变量名[索引值]
  document.write(classes[0]) // 结果为：小明
  document.write(classes[1]) // 结果为：小刚
  document.write(classes[4]) // 结果为：小米
  
  // 2. 通过索引值还可以为数组单重新赋值
  document.write(classes[3]) // 结果为：小丽
  // 重新为索引值为 3 的单元赋值
  classes[3] = '小小丽'
  document.wirte(classes[3]); // 结果为： 小小丽
</script>
```

#### D 遍历数组

通过for循环。

```js
// 方式一：
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// 方式二：
for (const i in arr) {
  console.log(arr[i]);
}
```

#### E 数据单元值类型

数组做为数据的集合，它的单元值可以是任意数据类型

```html
<script>
  // 6. 数组单值类型可以是任意数据类型

  // a) 数组单元值的类型为字符类型
  let list = ['HTML', 'CSS', 'JavaScript']
  // b) 数组单元值的类型为数值类型
  let scores = [78, 84, 70, 62, 75]
  // c) 混合多种类型
  let mixin = [true, 1, false, 'hello']
</script>
```

#### F 数组长度属性

重申一次，数组在 JavaScript 中并不是新的数据类型，它属于对象类型。

```html
<script>
  // 定义一个数组
  let arr = ['html', 'css', 'javascript']
  // 数组对应着一个 length 属性，它的含义是获取数组的长度
  console.log(arr.length) // 3
</script>
```

**获取数组长度：**

```js
var len = arr.length;
// 数据的长度是元素的个数，与索引号不同。
Var arr=[,,,,,]
for (var i = 0; i < arr.length; i++) {
  sum+=arr[i];//  我们加的是数组元素
}
console.log(sum);
```

#### G 新增数组元素

##### 1 修改length长度

```js
Arr.length = 5;
console.log(arr[5]); //undefined
```

##### 2 修改索引号——追加数组元素

```js
Arr1[3] = ‘pink’
// 索引号已经占领，会替换。
// 不要直接给数组名赋值，否则数组元素都无。
Arr[i]=i +1;
newArr[j]=arr[i]
j++
Newarr[newArr.length]=arr[i]
```

### 03 操作数组

数组做为对象数据类型，不但有 `length` 属性可以使用，还提供了许多方法：

1. push 动态向数组的尾部添加一个单元
2. unshit 动态向数组头部添加一个单元
3. pop 删除最后一个单元
4. shift 删除第一个单元
5. splice 动态删除任意单元

使用以上4个方法时，都是直接在原数组上进行操作，即成功调任何一个方法，原数组都跟着发生相应的改变。并且在添加或删除单元时 `length` 并不会发生错乱。

```html
<script>
  // 定义一个数组
  let arr = ['html', 'css', 'javascript']

  // 1. push 动态向数组的尾部添加一个单元
  arr.push('Nodejs')
  console.log(arr)
  arr.push('Vue')

  // 2. unshit 动态向数组头部添加一个单元
  arr.unshift('VS Code')
  console.log(arr)

  // 3. splice 动态删除任意单元
  arr.splice(2, 1) // 从索引值为2的位置开始删除1个单元
  console.log(arr)

  // 4. pop 删除最后一个单元
  arr.pop()
  console.log(arr)

  // 5. shift 删除第一个单元
  arr.shift()
  console.log(arr)
</script>
```



`reverse()`	颠倒数组中元素顺序，无参数	会改变原数组，返回新数组

`sort()`	对数组的元素进行排序	会改变原数组，返回新数组

sort 方法对数组进行原地排序，但是默认按照字典序排序。需要传入一个比较函数 cmp(a, b)，然后得到我们需要的排序效果。

```js
var arr = [1, 4, 17, 12, 9];
arr.sort();
console.log(arr); // [ 1, 12, 17, 4, 9 ]
var cmp = (a, b) => a - b;
arr.sort(cmp);
console.log(arr); // [ 1, 4, 9, 12, 17 ]
//其中，var cmp = (a, b) => a - b; 为升序，b - a 为降序。
```



```js
//交换两个变量
if（arr[j]> arr[j+1]）{
Var temp= arr[j]
arr[j]=  arr[j+1]
arr[j+1]= temp
}
```

### 04 数组与字符串互转

#### A 数组转换为字符串

`toString()`	将数组转换成字符串，逗号分隔每一个	返回一个字符串	不改变

`join('分隔符')`	把数组中的所有元素转换为一个字符串，以指定符号分割	返回一个字符串	不改变

```JS
var a = ['a', 'b', 'c', 'd', 'e'];
console.log(a.toString());  // a,b,c,d,e
console.log(a.join('')); // abcde
console.log(a.join('-')); // a-b-c-d-e
console.log(a); // [ 'a', 'b', 'c', 'd', 'e' ]
```

#### B 字符串转换为数组

使用 split() 方法。

```JS
var str = 'blue-green-pink-red';
var res = str.split('-');
console.log(res); // [ 'blue', 'green', 'pink', 'red' ]
```



# JavaScript 基础 - 第4天

> 理解封装的意义，能够通过函数的声明实现逻辑的封装，知道对象数据类型的特征，结合数学对象实现简单计算功能。

- 理解函数的封装的特征
- 掌握函数声明的语法
- 理解什么是函数的返回值
- 知道并能使用常见的内置函数

# d7 函数

> 理解函数的封装特性，掌握函数的语法规则

函数：就是封装了一段可被重复调用执行的代码块。通过此代码块可以实现大量代码的重复使用。

封装：把一个或者多个功能通过函数的方式封装起来，对外只提供一个简单的函数接口。

### 01 声明和调用

函数可以把具有相同或相似逻辑的代码“包裹”起来，通过函数调用执行这些被“包裹”的代码逻辑，这么做的优势是有利于精简代码方便复用。

#### 声明（定义）

声明（定义）一个完整函数包括关键字、函数名、形式参数、函数体、返回值5个部分

```js
function 函数名(){
// 函数体
}
//函数名一般是动词

```

#### 调用

声明（定义）的函数必须调用才会真正被执行，使用 `()` 调用函数。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 声明和调用</title>
</head>
<body>
  <script>
    // 声明（定义）了最简单的函数，既没有形式参数，也没有返回值
    function sayHi() {
      console.log('嗨~')
    }
    // 函数调用，这些函数体内的代码逻辑会被执行
    // 函数名()     
    sayHi()
    // 可以重复被调用，多少次都可以
    sayHi()
  </script>
</body>
</html>
```

> 注：函数名的命名规则与变量是一致的，并且尽量保证函数名的语义。

小案例： 小星星

~~~javascript
<script>
        // 函数声明
        function sayHi() {
            // document.write('hai~')
            document.write(`*<br>`)
            document.write(`**<br>`)
            document.write(`***<br>`)
            document.write(`****<br>`)
            document.write(`*****<br>`)
            document.write(`******<br>`)
            document.write(`*******<br>`)
            document.write(`********<br>`)
            document.write(`*********<br>`)
        }
        // 函数调用
        sayHi()
        sayHi()
        sayHi()
        sayHi()
        sayHi()
    </script>
~~~

###  02 参数

通过向函数传递参数，可以让函数更加灵活多变，参数可以理解成是一个变量。

声明（定义）一个功能为打招呼的函数

- 传入数据列表
- 声明这个函数需要传入几个数据
- 多个数据用逗号隔开

```html
<script>
    // 声明（定义）一个功能为打招呼的函数
    // function sayHi() {
    //   console.log('嗨~')
    // }
    // 调用函数
    // sayHi()
	

    // 这个函数似乎没有什么价值，除非能够向不同的人打招呼
    // 这就需要借助参数来实现了
    function sayHi(name) {
      // 参数 name 可以被理解成是一个变量
      console.log(name)
      console.log('嗨~' + name)
    }

    // 调用 sayHi 函数，括号中多了 '小明'
    // 这时相当于为参数 name 赋值了
    sayHi('小明')// 结果为 小明

    // 再次调用 sayHi 函数，括号中多了 '小红'
    // 这时相当于为参数 name 赋值了
    sayHi('小红') // 结果为 小红
  </script>
</body>
</html>
```

总结：

1. 声明（定义）函数时的形参没有数量限制，当有多个形参时使用 `,` 分隔
2. 调用函数传递的实参要与形参的顺序一致

#### 形参和实参

形参：声明函数时写在函数名右边小括号里的叫形参（形式上的参数）

实参：调用函数时写在函数名右边小括号里的叫实参（实际上的参数）

```js
// 声明时传入的为形参，调用时传入的为实参。
function 函数名（形参1，形参2...）
}
函数名（实参1，实参2...）
```

形参可以理解为是在这个函数内声明的变量（比如 num1 = 10）实参可以理解为是给这个变量赋值

> - 形参和实参个数相等，输出正确结果
>
> - 实参个数多于形参，只取到形参的个数
>
> - 实参个数少于形参，多的形参定义为undefined，结果为NaN
> - 函数可以带也可以不带参数
> - 形参的默认值是 undefined
> - 开发中尽量保持形参和实参个数一致

```html
<script>
    // 声明（定义）一个计算任意两数字和的函数
    // 形参 x 和 y 分别表示任意两个数字，它们是两个变量
    function count(x, y) {
      console.log(x + y);
    }
    // 调用函数，传入两个具体的数字做为实参
    // 此时 10 赋值给了形参 x
    // 此时 5  赋值给了形参 y
    count(10, 5); // 结果为 15
</script>
</body>
</html>
```

### 03 返回值

函数的本质是封装（包裹），函数体内的逻辑执行完毕后，函数外部如何获得函数内部的执行结果呢？要想获得函数内部逻辑的执行结果，需要通过 `return` 这个关键字，将内部执行结果传递到函数外部，这个被传递到外部的结果就是返回值。

```html
 <script>
    // 定义求和函数
    function count(a, b) {
      let s = a + b
      // s 即为 a + b 的结果
      // 通过 return 将 s 传递到外部
      return s
    }

    // 调用函数，如果一个函数有返回值
    // 那么可将这个返回值赋值给外部的任意变量
    let total = count(5, 12)
  </script>
</body>
</html>
```

总结：

1. 在函数体中使用return 关键字能将内部的执行结果交给函数外部使用
2. 函数内部只能出现1 次 return，并且 return 下一行代码不会再被执行，所以return 后面的数据不要换行写
3. return会立即结束当前函数
4. return只能返回一个值，最后一个
5. 用数组返回多个返回值
6. 函数可以没有return，这种情况默认返回值为 undefined

> **Break，continue，return区别：**
>
> Break：结束循环。
>
> Continue：跳出本次循环，继续执行下次循环。
>
> Return：不仅可以退出循环，还可以返回值，同时可以结束当前函数体内的代码。



### 04 arguments

arguments 是当前函数的一个内置对象，但也只有函数具有。

所有函数都内置了一个对象arguments，存储了传递的所有实参。

```js
function test() {
  return arguments;

}
console.log(test(1,2,3,4));
//输出：
Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

函数的 arguments 是一种伪数组，并不是真正的数组，特性：

- 具有数组的 length 属性

- 按照索引方式进行存储

- 没有真正数组的一些方法 pop()、push()

### 05 匿名函数

函数的声明方式可以分为具名函数和匿名函数

匿名函数：没有名字的函数,无法直接使用。

#### A 函数表达式

~~~javascript
// 声明
let fn = function() { 
   console.log('函数表达式')
}
// 调用
fn()
// 变量里存的是值，函数表达式里面存的是函数。
// 函数表达式也可以进行传递函数。
~~~

#### B 立即执行函数

~~~javascript
(function(){ xxx  })();
(function(){xxxx}());
~~~

>无需调用，立即执行，其实本质已经调用了
>
>多个立即执行函数之间用分号隔开

### 06 作用域

通常来说，一段程序代码中所用到的名字并不总是有效和可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。

作用域的使用提高了程序逻辑的局部性，增强了程序的可靠性，减少了名字冲突。

#### A 全局作用域

作用于所有代码执行的环境(整个 script 标签内部)或者一个独立的 js 文件

处于全局作用域内的变量，称为全局变量

#### B 局部作用域

作用于函数内的代码环境，就是局部作用域。 因为跟函数有关系，所以也称为函数作用域。

处于局部作用域内的变量称为局部变量

>如果函数内部，变量没有声明，直接赋值，也当全局变量看，但是强烈不推荐
>
>但是有一种情况，函数内部的形参可以看做是局部变量。
>
>在能够访问到的情况下 先局部 局部没有在找全局

#### C 变量的作用域

##### 全局变量

在全局作用域下声明的变量叫做全局变量（在函数外部定义的变量）。

全局变量在代码的任何位置都可以使用

在全局作用域下var声明的变量是全局变量。

注意：在函数内部，没有使用var声明、直接赋值的变量也是全局变量

##### 局部变量

在局部作用域下声明的变量叫做局部变量（在函数内部定义的变量）

局部变量只能在该函数内部使用

在函数内部var声明的变量是局部变量

函数的形参实际上就是局部变量

##### 全局变量与局部变量区别

从执行效率来看：

全局变量：在任何一个地方都可以使用，只有在浏览器关闭时才会被销毁，因此比较占内存。

局部变量：只在函数内部使用，当其所在的代码块被执行时，会被初始化；

当代码块运行结束后，就会被销毁，因此更节省内存空间。

##### 块级作用域

块级作用域是指用 {} 包括起来的一段代码，例如 if 、while 等等。

ES6 以前，JS 没有块级作用域。

ES6 新增 let 和 const 之后才有了块级作用域。

函数作用域就是指变量只在函数内部起作用。

var 声明的是函数作用域的变量

let 声明的是块级作用域的变量

const 声明的是块级作用域的变量

#### D 作用域链

只要是代码，就至少有一个作用域

写在函数内部的局部作用域

如果函数中还有函数，那么在这个作用域中就又可以诞生一个作用域

根据在内部函数可以访问外部函数变量的这种机制，用链式查找决定哪些数据能被内部函数访问，就称作作用域链

（就近原则）

（站在目标，一层一层往外查找）

# d8 预解析

### 01 预解析

**Js引擎执行js代码分两步：**

预解析：把var function提升到当前作用于最前面，分为变量与解析、函数预解析

执行代码：自上往下

### 02 变量预解析

把所有的变量声明提升到当前作用域最前面，不提升赋值。

```js
log
Var num=10

===
Var num
log
Num=10
```

### 03 函数预解析

把所有的函数声明提升到当前作用域最前面，不调用函数。

**函数表达式调用必须写在函数表达式下面。**

```js
f1();
log.(c);
log.(b);
log.(a);

function  f1(){
var a = b = c = 9；//var a=9；b=9；c=9  bc直接赋值没有声明 当全局变量看
log.(c);
log.(b);
log.(a);
}

===
function  f1(){
var a；
a = b = c = 9；
log.(c);  //9
log.(b);  //9
log.(a);  //9
}
f1();
log.(c);  //9
log.(b);  //9
log.(a);  //a是局部变量  只能在函数内部调用  报错
//9 9 9 9 9 报错
```



# JavaScript 基础 - 第5天

> 知道对象数据类型的特征，能够利用数组对象渲染页面

- 理解什么是对象，掌握定义对象的语法
- 掌握数学对象的使用

# d9 对象

> 对象是 JavaScript 数据类型的一种，之前已经学习了数值类型、字符串类型、布尔类型、undefined。对象数据类型可以被理解成是一种数据集合。它由属性和方法两部分构成。

在JavaScript中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、函数等。

对象是由属性和方法组成的。

属性：事物的特征，在对象中用属性来表示（常用名词）

方法：事物的行为，在对象中用方法来表示（常用动词）

保存一个人的完整信息，对象表达结构更清晰，更强大。

### 01 语法

声明一个对象类型的变量与之前声明一个数值或字符串类型的变量没有本质上的区别。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 声明字符串类型变量
    let str = 'hello world!'
    
    // 声明数值类型变量
    let num = 199

    // 声明对象类型变量，使用一对花括号
    // user 便是一个对象了，目前它是一个空对象
    let user = {}
  </script>
</body>
</html>
```

### 02 创建对象的三种方式

- 使用字面量创建对象
- 使用 new Object 创建对象
- 利用构造函数创建对象

#### A 字面量创建

使用对象字面量 {} 创建，包含属性和方法。

```js
var obj = {
  uname: 'Mia',
  age: 18,
  sayHi: function () {
  console.log('Hi!);
  }
}
```

- 属性方法采用键（属性名）值（属性值）对表示
- 多个属性或方法中间用逗号表示
- 方法冒号后面跟的是一个匿名函数

**使用对象的属性和方法:**

```js
调用对象的属性:
// 方法一
objectName.attrName
// 方法二
objectName['attrName']  // 不要忘记引号

调用对象的方法:
objectName.funcName();  //不要忘记括号
```

- 变量和属性都是用来存储数据
- 变量 单独声明并赋值  单独存在  使用时候直接写变量名
- 属性 在对象里面的不需要声明  使用时候必须是对象.属性
- 函数和方法都是实现某种功能
- 函数是单独声明 并且调用的 函数名  单独存在
- 方法 在对象里面  调用的时候  对象.方法

#### B 使用 newObject 创建对象

```JS
// 创建空对象
let obj = new Object();
//添加属性
obj.uname = 'MurphyChen';
obj.age = 18;
obj.sayHi = function() {
  console.log('Hi!');
}
```

**new 关键字的执行过程：**

- 在内存中创建一个空的对象；
- this 指向这个空对象；
- 执行构造函数里面的代码，给空对象添加属性和方法；
- 返回此对象。

#### C 利用构造函数创建对象

前两种创建对象的方法，每次都只能创建一个对象。但需要多个具有相同属性和方法的对象的时候，就需要使用***\*构造函数\****来创建。

构造函数将相同的属性和方法封装在一个函数里。

**构造函数语法：**

```js
// 定义
function 构造函数名(形参) {
  this.属性= value;
  this.方法 = function() {};
}
// 调用
new 构造函数名(实参);
```

- 构造函数名单词首字母均大写
- 函数不需要return返回值就可以返回结果
- 必须使用new
- 属性和方法前面必须添加this

```js
function Star(uname, age, sex) {
  this.name = uname;
  this.age = age;
this.sex = sex;
this.sing = function(song){
}
}
var ldh = new Star('刘德华', 18, '男');
var zxy = new Star('张学友', 19, '男');
console.log(typeof ldh); // object
console.log(ldh.sex); // 男
console.log(zxy.name); // 张学友
ldh.sing('冰雨')；
```

**构造函数和对象：**

- 构造函数相当于创建了一个抽象的类
- 对象是一个具体的事物
- 使用关键字 new 创建一个对象的过程称为类的实例化

### 03 属性和访问

数据描述性的信息称为属性，如人的姓名、身高、年龄、性别等，一般是名词性的。

1. 属性都是成 对出现的，包括属性名和值，它们之间使用英文 `:` 分隔
2. 多个属性之间使用英文 `,` 分隔
3. 属性就是依附在对象上的变量
4. 属性名可以使用 `""` 或 `''`，一般情况下省略，除非名称遇到特殊符号如空格、中横线等

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 通过对象描述一个人的数据信息
    // person 是一个对象，它包含了一个属性 name
    // 属性都是成对出现的，属性名 和 值，它们之间使用英文 : 分隔
    let person = {
      name: '小明', // 描述人的姓名
      age: 18, // 描述人的年龄
      stature: 185, // 描述人的身高
      gender: '男', // 描述人的性别
    }
  </script>
</body>
</html>
```

声明对象，并添加了若干属性后，可以使用 `.` 或 `[]` 获得对象中属性对应的值，我称之为属性访问。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 通过对象描述一个人的数据信息
    // person 是一个对象，它包含了一个属性 name
    // 属性都是成对出现的，属性名 和 值，它们之间使用英文 : 分隔
    let person = {
      name: '小明', // 描述人的姓名
      age: 18, // 描述人的年龄
      stature: 185, // 描述人的身高
      gender: '男', // 描述人的性别
    };
    
    // 访问人的名字
    console.log(person.name) // 结果为 小明
    // 访问人性别
    console.log(person.gender) // 结果为 男
    // 访问人的身高
    console.log(person['stature']) // 结果为 185
   // 或者
    console.log(person.stature) // 结果同为 185
  </script>
</body>
</html>
```

扩展：也可以动态为对象添加属性，动态添加与直接定义是一样的，只是语法上更灵活。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 声明一个空的对象（没有任何属性）
	let user = {}
    // 动态追加属性
    user.name = '小明'
    user['age'] = 18
    
    // 动态添加与直接定义是一样的，只是语法上更灵活
  </script>
</body>
</html>
```

### 04 方法和调用

数据行为性的信息称为方法，如跑步、唱歌等，一般是动词性的，其本质是函数。

1. 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
2. 多个属性之间使用英文 `,` 分隔
3. 方法是依附在对象中的函数
4. 方法名可以使用 `""` 或 `''`，一般情况下省略，除非名称遇到特殊符号如空格、中横线等

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象方法</title>
</head>
<body>

  <script>
    // 方法是依附在对象上的函数
    let person = {
      name: '小红',
      age: 18,
      // 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
      singing: function () {
        console.log('两只老虎，两只老虎，跑的快，跑的快...')
      },
      run: function () {
        console.log('我跑的非常快...')
      }
    }
  </script>
</body>
</html>
```

声明对象，并添加了若干方法后，可以使用 `.` 或 `[]` 调用对象中函数，我称之为方法调用。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象方法</title>
</head>
<body>

  <script>
    // 方法是依附在对象上的函数
    let person = {
      name: '小红',
      age: 18,
      // 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
      singing: function () {
        console.log('两只老虎，两只老虎，跑的快，跑的快...')
      },
      run: function () {
        console.log('我跑的非常快...')
      }
    }
    
    // 调用对象中 singing 方法
    person.singing()
    // 调用对象中的 run 方法
    person.run()

  </script>
</body>
</html>
```

扩展：也可以动态为对象添加方法，动态添加与直接定义是一样的，只是语法上更灵活。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象方法</title>
</head>
<body>

  <script>
    // 声明一个空的对象（没有任何属性，也没有任何方法）
	let user = {}
    // 动态追加属性
    user.name = '小明'
    user.['age'] = 18
    
    // 动态添加方法
    user.move = function () {
      console.log('移动一点距离...')
    }
    
  </script>
</body>
</html>
```

**注：无论是属性或是方法，同一个对象中出现名称一样的，后面的会覆盖前面的。**

### 05 null

null 也是 JavaScript 中数据类型的一种，通常只用它来表示不存在的对象。使用 typeof 检测类型它的类型时，结果为 `object`。

### 06 遍历对象

for...in 可以对数组和对象进行遍历。

~~~javascript
let obj = {
    uname: 'pink'
}
for(let k in obj) {
    // k 遍历属性名  字符串  带引号    obj.'uname'     k ===  'uname'
    // obj[k]  遍历属性值    obj['uname']   obj[k]
}
// for in 不提倡遍历数组 因为 k 是 字符串  
~~~

# d10 内置对象

Javascript中的对象分为3种：自定义对象、内置对象、浏览器对象

内置对象就是指JS语言自带的一些对象，这些对象供开发者使用，并提供了一些常用的或是最基本而必要的功能（属性和方法）

回想一下我们曾经使用过的 `console.log`，`console`其实就是 JavaScript 中内置的对象，该对象中存在一个方法叫 `log`，然后调用 `log` 这个方法，即 `console.log()`。

除了 `console` 对象外，JavaScritp 还有其它的内置的对象

### 01 Math

`Math` 是 JavaScript 中内置的对象，称为数学对象，这个对象下即包含了属性，也包含了许多的方法。

#### 属性

- Math.PI，获取圆周率

```javascript
// 圆周率
console.log(Math.PI);
```

#### 方法

- Math.random，生成 0 到 1 间的随机数

```javascript
// 0 ~ 1 之间的随机数, 包含 0 不包含 1
Math.random()
```

- Math.ceil，数字向上取整

```javascript
// 舍弃小数部分，整数部分加1
Math.ceil(3.4)
```

- Math.floor，数字向下取整

```javascript
// 舍弃小数部分，整数部分不变
Math.floor(4.68)
```

- Math.round，四舍五入取整

```javascript
// 取整，四舍五入原则
Math.round(5.46539)
Math.round(4.849)
```

- Math.max，在一组数中找出最大的

```javascript
// 找出最大值
Math.max(10, 21, 7, 24, 13)
```

- Math.min，在一组数中找出最小的

```javascript
// 找出最小值
Math.min(24, 18, 6, 19, 21)
```

- Math.pow，幂方法

```javascript
// 求某个数的多少次方
Math.pow(4, 2) // 求 4 的 2 次方
Math.pow(2, 3) // 求 2 的 3 次方
```

- Math.sqrt，平方根

```javascript
// 求某数的平方根
Math.sqrt(16)
```

数学对象提供了比较多的方法，这里不要求强记，通过演示数学对象的使用，加深对对象的理解。

### 02 Date

#### A 时间格式化

Date 对象是一个构造函数，需要使用 new 来创建日期对象（实例化）。

```js
// 1）若没有参数，则默认返回当前系统的当前时间
var date = new Date();
console.log(date);

//2）若有参数，则返回参数里面的时间。 参数常用写法
let date1 = new Date(2019, 10, 1); //返回的是11月？
console.log(date1);

// 2019-10-31T16:00:00.000Z
let date2 = new Date('2019-10-1 8:8:8');
console.log(date2);

// 2019-10-01T00:08:08.000Z
// 一般使用以下参数形式
let date3 = new Date('2019-10-1 10:10:10');
let date4 = new Date('2019/10/1');
```

常用返回日期格式（日期格式化）：

```js
let date = new Date();
console.log(date.getFullYear()); // 2021
console.log(date.getMonth() + 1); // 3，注意得到的月份要加 1
console.log(date.getDate()); // 15
console.log(date.getDay()); // 1 周日返回的是0
```



实例一：返回 今天是 2021 年 3 月 15 日 周一 的日期格式。

```js
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let dates = date.getDate();
let day = date.getDay();
let days = ['日', '一', '二', '三', '四', '五', '六']
console.log(`今天是：‘+ year’年‘+ month+’月+‘dates’+‘日’+ ’周‘+days[day]);
```

实例二：输出时分秒 15:06:09 格式化时间串。

```js
function getTime() {
let time = new Date();

var h = time.getHours();
h = h<10 ? ‘0’+h : h;

var m = time.getMinutes();
m = m<10 ? ‘0’+m : m;

var s = time.getSeconds();
s = s<10 ? ‘0’+s : s;

  return h + ':' + m  + ':' +s;
}
console.log(getTime());
```

 

#### B 时间戳（获取1971年1月1日至今过去的毫秒数）

```js
//1. valueOf()
let date = new Date();
console.log(date.valueOf());

//2. getTime()
console.log(date.getTime());

//3. 简单写法
let date1 = +new Date();
console.log(date1);

//4. H5新增写法
let date2 = Date.now();
console.log(date2);
// console.log(Date.now());
// 毫秒数是永远不会重复的
```

**倒计时案例**

输入时间减去剩余时间，但是不能直接用时分秒减，所以用时间戳做，再毫秒数转换为时分秒就行。

```js
function countDomn(time){
var nowTime = +new Date();  //返回当前时间总的毫秒数
var inputTime = +new Date(time);  //用户输入时间总的毫秒数
var times =(inputTime - nowTime)/ 1000;   //剩余总秒数
var d = parseInt(times / 60 / 60 / 24);   //天
var h = parseInt(times / 60 / 60 % 24);   //时
var m = parseInt(times / 60 % 60);   //分
var s = parseInt(times % 60);   //秒
return d +'天'+ h +'时'+ m +'分'+ s + '秒';
}
console.log(countDomn('2023-10-12 11:00:00'));
var date = new Date();
console.log(date);
```

### 03 数组对象

#### A 检测是否是数组

##### 1) Instanceof  运算符

```js
var arr = []
var obj = []

console.log(arr instanceof Array)
console.log(obj instanceof Array)
```

##### 2) Array.isArray()【H5新增】

```js
console.log(isArray([1, 2])); // true
console.log(isArray(1)); // false
```

#### B 添加/删除数组元素

##### 1） **push()**

末尾添加一个或多个元素，Push（）参数直接写数组元素就行，Push完毕之后，返回的是新数组的长度，原数组随之改变。

数据筛选时候可以用newArr.push(arr[i]);

##### 2） **unshift()**

向数组的开头添加一个或多个元素，参数直接写，unshift()返回的是新数组的长度，原数组随之改变。

##### 3） **pop()**	

删除数组最后一个元素，数组长度减 1，没有参数，修改了原数组，返回所删除元素的值。

##### 4） **shift()**	

删除数组的第一个元素，数组长度减 1，无参数，修改了原数组	返回第一个元素的值。

#### C 数组排序

##### 1）数组反转reverse

```js
arr.reverse()
```

##### 2）数组排序sort

```js
arr.sort(function(a,b){
return a-b;   //升序
return b-a;   //降序

});
console.log(arr)
```

#### D 数组索引

##### 1）IndexOf

返回该数组元素的索引号，从前面查找，只返回第一个满足条件的索引号，如果不存在，则返回-1。

```js
var  arr = [‘red’,’green’, ‘blue’,’pink’];
console.log(arr.indexOf(‘blue’));
```

##### 2）lastIndexOf

从后面开始查找，返回索引号，如果不存在，则返回-1。

```js
console.log(arr.lastIndexOf(‘blue’));
```

##### 3）案例：数组去重

遍历旧数组，用旧数组元素去查询新数组，如果该元素在新数组中没有出现过，就添加，否则不添加。

返回-1说明新数组没有，就存到新数组

#### E 数组转换为字符串

##### 1）toString();

##### 2）join(’分隔符’)；

join(’-’)；

join(’&’)；



> Concat()对象
>
> Slice()对象
>
> Splice()对象

### 04 字符串对象

#### A 基本包装类型

对象才有属性和方法

复杂数据类型才有属性和方法

> 那么为什么简单数据类型有 length 属性呢？
>
> 因为js会把简单数据类型包装成复杂数据类型。
>

基本包装类型：把简单数据类型包装成复杂数据类型，这样基本数据类型也有了属性和方法

**三种基本包装类型： String、Number、Boolean**

#### B 字符串的不可变

指的是里面的值不变。

虽然看上去是可以改变的，但其实是地址变了，内存中开辟了一个内存空间。

字符串中所有的方法都不会修改字符串本身，操作完成会返回一个新的字符串。

#### C 根据字符串返回位置

```js
str.indexOf('要查找的字符', [起始位置])
str.indexOf('c', 3);   //从索引号3位置开始往后查找
str.lastindexOf('要查找的字符', [起始位置]);
```

#### D 根据位置返回字符

##### 1）charAt()

```js
str.charAt(index);
//返回指定位置的字符  index字符串的索引号
```

##### 2）charCodeAt() 

```js
//获取指定位置处的字符的 ASCII 码
//返回该位置的字符的 ASCII 值。
//目的：一般用于判断用户按下了哪个键。
str.charCodeAt(i)
```

##### 3）str[index]   【H5 新增写法】

```js
//获取指定位置处字符
str[i];
//判断是否有该属性：对象[‘属性名’]
```

案例：统计出现次数最多的字符

```js
function findMost(str) {
  let res = {};
  for (const i in str) {
    if (str[i] in res) {
      res[str[i]]++;
    } else {
      res[str[i]] = 1;
    }
  }
  
  let temp = -Infinity;
  let ans;
  for (const k in res) {

    if (res[k] > temp) {
      temp = res[k];
      ans = k;
    }
  }

  return [ans, temp];
};
console.log(findMost("abbcaaa")); // [ 'a', 4 ]
```

#### E 字符串操作用法

##### 1）字符串拼接

```js
str.concat(str1, str2, str3, ...)
```

##### 2）获取子串，[start, start+length]

```js
str.substr(‘截取的起始位置’, ‘截取几个字符’)
// 从start位置开始  length取的个数
```

##### 3）切片，前闭后开：[start, end)

```js
str.slice(start, end)
```

##### 4）获取子串，前闭后开：[start, end)

```js
str.substring(start, end)
/* Warning
警告： 尽管 String.prototype.substr() 没有严格被废弃 (as in "removed from the Web standards"), 但它被认作是遗留的函数并且可以的话应该避免使用。
它并非JavaScript核心语言的一部分，未来将可能会被移除掉。如果可以的话，使用 substring() 替代它。
*/
```

##### 5）替换字符

```js
str.replace('被替换的字符', '替换为的字符');
str.replace('a', 'b');
replace只会替换第一个字符。
var str1=’asgffhosdfsabooujyt’
while(str1.indexOf(‘0’ !== -1)){
  str1 = str1.replace(‘o’,’*’);
}
console.log(str1)
```

##### 6）字符转换为数组

```js
str.split(‘分隔符’)
let str1 = 'red pink blue';
console.log(str1.split(' '))

// [ 'red', 'pink', 'blue' ]
let str2 = 'red&pink&blue';

console.log(str2.split('&'))
// [ 'red', 'pink', 'blue' ]
```

##### 7） toUpperCase()   //转为大写

##### 8） toLowerCase()   //转为小写

# d11 复杂类型

### 01 简单类型与复杂类型

简单类型：又叫做基本数据类型或者值类型，复杂类型又叫做引用类型。

值类型：简单数据/基本数据类型，在存储时变量中存的是值本身，因此叫做值类型。

例如 string, number, boolean, undefined, null

Null返回的是一个空的对象object

如果有个变量我们以后打算存储为对象，暂时没想好放啥，这个时候就给null

引用类型：复杂数据类型，在存储时变量中存储的仅仅是地址（引用），因此叫做引用数据类型。

通过 new 关键字创建的对象（系统对象、自定义对象），如 Object、Date 等。

### 02 堆和栈

堆栈空间分配区别︰

栈（操作系统）：由操作系统自动分配释放存放函数的参数值、局部变量的值等。其操作方式类似于数据结构中的栈；

简单数据类型存放到栈里面，直接开辟空间存放值。

堆（操作系统）︰存储复杂类型(对象)，一般由程序员分配释放，若程序员不释放，由垃圾回收机制回收。

复杂数据类型存放到堆里面

首先在栈里面存放地址（用十六进制表示，系统自动分配），这个地址指向堆里面的数据（真正的对象实例存放在堆空间中）。

### 03. 简单数据类型传参

函数的形参也可以看做是一个变量，当我们把一个值类型变量作为参数传给函数的形参时，其实是把变量在栈空间里的值复制了一份给形参，那么在方法内部对形参做任何修改，都不会影响到的外部变量。

值传递不改变实参

### 04. 复杂数据类型传参

函数的形参也可以看做是一个变量，当我们把引用类型变量传给形参时，其实是把变量在栈空间里保存的堆地址复制给了形参，形参和实参其实保存的是同一个堆地址，所以操作的是同一个对象。
