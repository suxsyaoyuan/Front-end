# React

# d1 React入门

## 01 React简介

**React**是Web前端框架

> **React** 是一个用于构建用户界面的 JavaScript ，用来为现代的网络构建用户界面。React起源于Facebook，由Facebook的软件工程师 Jordan Walke 开发，2012年部署于 Instagram，2013年开源。除此之外，React还有React Native框架，通过它让我们可以直接使用 JavaScript 来编写原生应用。

目前市面上比较主流的前端框架:

+ React
+ Vue
+ Angular[NG]

主流的思想：不在直接去操作DOM，而是改为“数据驱动思想"。

> 操作DOM思想：
>
> - 操作DOM比较消耗性能主要原因就是:可能会导致DOM重排(回流)/重绘
> - 操作起来也相对来讲麻烦一些
> - ...

数据驱动思想:

- 我们不会在直接操作DOM
- 我们去操作数据厂当我们修改了数据，框架会按照相关的数据，让页面重新渲染
- 框架底层实现视图的渲染，也是基于操作DOM完成的
- 构建了一套虚拟DOM->真实DOM的渲染体系
- 有效避免了DOM的重排/重绘
- 开发效率更高、最后的性能也相对较好

React的特点：

- 虚拟DOM
- 声明式
- 基于组件
- 支持服务器端渲染
- 快速、简单、易学

React框架采用的是MVC体系

MVC：model数据层+view视图层 +controller控制层

- 我们需要按照专业的语法去构建视图(页面)：

  React中是基于jsx语法来构建视图的

- 构建数据层：

  但凡在视图中，需要“动态”处理的(需要变化的，不论是样式还是内容)，我们都要有对应的数据模型

- 控制层：

  当我们在视图中(或者根据业务需求)进行某些操作的时候，都是去修改相关的数据，然后React框架会按照最新的数据，重新渲染视图，以此让用户看到最新的效果!

  > 数据驱动视图的渲染：单向驱动
  >
  > react中没有视图驱动数据，视图中的表单内容改变，想要修改数据，需要开发者自己去写代码实现!
  >
  > - 自己监听表单元素的change事件
  >
  > - 在事件触发的时候获取最新的表单内容
  >
  > - 手动修改状态
  >
  > - 把状态值手动赋给表单的 value属性
  >
  >   【类似于把Vue中的v-model自己实现了一遍】

Vue框架采用的是MVVM体系

MVVM：model数据层+view视图层+viewModel数据/视图监听层

- 数据驱动视图的渲染：监听数据的更新，让视图重新染

- 视图驱动数据的更改：监听页面中表单元素内容改变，自动去修改相关的数据

  > “双向驱动”

## 02 三个API

React的常规开发方式并不是通过浏览器引入外部js脚本来使用，但在入门阶段我们暂且先使用这种方式来简单体会一下React。

使用React开发Web项目，我们需要引入两个js脚本：

```
react.development.js
```

- react 是react核心库，只要使用react就必须要引入
- 下载地址：https://unpkg.com/react@18.0.0/umd/react.development.js

```
react-dom.development.js
```

- react-dom 是react的dom包，使用react开发web应用时必须引入
- 下载地址：https://unpkg.com/react-dom@18.0.0/umd/react-dom.development.js

```js
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>Hello React</title>
    <script src="script/react.development.js"></script>
    <script src="script/react-dom.development.js"></script>
</head>
<body>
<script>
/*
   React就是用来代替DOM的
*/

// 通过DOM向页面中添加一个div
// 创建一个div
// const div = document.createElement('div'); // 创建一个dom元素
// 向div中设置内容
// div.innerText = '我是一个div';
// 获取root
// const root = document.getElementById('root');
// 将div添加到页面中
// root.appendChild(div);
        
<div id="root"></div>
<script>
  // 用React向页面中添加一个div
  /*
    *   React.createElement()
    *       - 用来创建一个React元素
    *       - 参数：
    *           1. 元素名（组件名）
    *           2. 元素中的属性
    *           3. 元素的子元素（内容）
    * */
    const div = React.createElement('div', {}, '我是React创建的div'); // 创建一个React元素
    // 获取根元素对应的React元素
    // ReactDOM.createRoot() 用来创建React根元素，需要一个DOM元素作为参数 document操作的是DOM元素
    // 根据 document.getElementById('root') DOM元素 创建 React元素
    const root = ReactDOM.createRoot(document.getElementById('root'));

    // 将div渲染到根元素中
    root.render(div);    

</script>
</body>
</html>
```

#### React.createElement()

`React.createElement(type, [props], [...children])`  用来创建一个React元素

参数：

1. 元素的名称（html标签必须小写）

2. 标签中的属性：

   · class属性需要使用className来设置

   · 在设置事件时，属性名需要修改为驼峰命名法

3. 元素的内容（子元素）

注意点：

- React元素最终会通过**虚拟DOM**转换为真实的DOM元素

  > DOM元素是最终显示在网页里的元素 React元素是我们实际操作的元素

- React元素一旦创建就无法修改，只能通过新创建的元素进行替换

```js
// 创建一个React元素
const button = React.createElement('button', {
    type: 'button',
    className: 'hello',
    onClick: () => {
        alert('你点我干嘛')
    }
}, '点我一下');
// 通过一个方法把一个元素中所有东西都创建了

// 创建第一个div 用react调用react元素  只有才与DOM相关时才调用ReactDOM
const div = React.createElement('div', {}, '我是一个div', button);
// 获取根元素
const root = ReactDOM.createRoot(document.getElementById('root'));
// 将元素在根元素中显示
root.render(div);

// 获取按钮对象
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    // 点击按钮后，修改div中button的文字为click me
    const button = React.createElement('button', {
        type: 'button',
        className: 'hello',
        onClick: () => {
            alert('你点我干嘛')
        }
    }, 'click me');

    // 修改React元素后，必须重新对根元素进行渲染
    // root.render(button); 这样会把div替换掉 
    
    // 创建一个div 用新的div替换旧的div
    const div = React.createElement('div', {}, '我是一个div', button);
    // 当调用render渲染页面时，React会自动比较两次渲染的元素，只在真实DOM中更新发生变化的部分
    // 没发生变化的保持不变
    root.render(div);
});
```

#### ReactDOM.createRoot()

`createRoot(container[, options])`

用来创建React的根容器，容器用来放置React元素

#### root.render()

`root.render(element)`  用来将React元素渲染到根元素中

 - 根元素中所有的内容都会被删除，被React元素所替换

- 当重复调用render()时，React会将两次的渲染结果进行比较，会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。
- 不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。

```js
// 创建第一个div
const div = React.createElement('div', {}, '我是一个div2', button);

// ReactDOM.render(div, document.getElementById('root')); // 老版本的React中使用方法

// 获取根元素 根元素就是React元素要插入的位置
const root = ReactDOM.createRoot(document.getElementById('root'));
// 将元素在根元素中显示
root.render(div);
```

## 03 JSX（JavaScript and xml）

JSX 是 JavaScript 的语法扩展，JSX 使得我们可以以类似于 HTML 的形式去使用 JS。（JSX就是React.createElement()的语法糖）

JSX便是React中声明式编程的体现方式。声明式编程，简单理解就是以结果为导向的编程。在React中可以通过JSX（JS扩展）来创建React元素，JSX需要被翻译为JS代码，才能被React执行。所以我们所编写的JSX代码，最终都会转换为以调用`React.createElement()`创建元素的代码。

```js
import React from 'react';  
// react语法核心
import ReactDOM from 'react-dom/client';
// 构建HTML的核心
const root = ReactDOM.createRoot(document.getElementById('root'));
// 获取页面中的#root容器，作为根容器【不能直接把HTML/body作为根容器】
root.render( <div>我是一个div</div>;);
// 基于render渲染自己编写的视图，把渲染后的内容全部插入到#root中进行渲染
```

#### **注意事项**

1. 不要加引号。

2. 每一个构建的视图，有且只有一个根节点。

   > <></> fragment空标记，即能作为容器把一堆内容包裹起来，保证只有一个根节点，还不占层级结构。

3. html标签小写开头，React组件大写开头。

4. 动态绑定数据使用**“{ }胡子语法”**，大括号中存放的是“JS表达式”

   + 可以直接放数组：把数组中的每一项都呈现出来

   + 一般情况下不能直接渲染对象，但是如果是JSX的虚拟DOM对象，是直接可以渲染的

   （JS表达式：有返回值的语句：

   1. 变量
   2. 数学运算
   3. 判断：三元运算符
   4. 循环：借助于数组的迭代方法 map
   5. JSX也是表达式）
   
5. 胡子语法中嵌入不同的值，所呈现出来的特点

   + number/string：值是啥，就渲染出来啥

   + boolean/null/undefined/Symbol/BigInt：渲染的内容是空

     【布尔类型、Null 、Symbol、BigInt以及 Undefined 将会忽略】

   + 除数组对象外，其余对象一般都不支持在{}中进行渲染，但是也有特殊情况：`JSX虚拟DOM对象`

   + 给元素设置style行内样式，要求必须写成一个对象格式

   + 数组对象：把数组的每一项都分别拿出来染并不是变为字符串染，中间没有逗号

   + 函数对象：不支持在{}中染，但是可以作为函数组件，用<Component/>方式渲染

   + ...

6. 给元素设置样式【属性正常写（class使用className，style必须用style={{color:red'...}}）】

   + 行内样式：需要基于对象的格式处理，直接写样式字符串会报错

     ```js
     <h2 style={{
     color:'red'
     fontSize:'18px'
     //样式属性要基于驼峰命名法处理
     >
     ```

   + 设置样式类名：需要把class替换为className

     ```js
     <h2 className="box">
     ```

7. 标签必须正常闭合

8. JSX中遍历数组中的每一项，动态绑定多个JSX元素，一般都是基于数组中的map来实现的

   > 和vue一样，循环绑定的元豪要设置key值 

   (作用：用于DOM-DIFF差异化对比)

> JSX语法具备过滤效果(过滤非法内容)，有效防止XSS攻击
>
> 扩展思考：总结常见的XSS攻击和预防方案?

**举例**

```js
/* 需求一: 基于数据的值，来判断元素的显示隐藏 */
let flag = false,isRun = true;
root.render(
    <>
        {/* 控制元素的display样式: 不论显示还是隐藏，元素本身都染出来了 */}
        <button style={{display: flag ? 'block': 'none'}}>按钮1</button>
        <br />
    
        {/* 控制元素渲染或者不染 */}
        {flag ? <button>按钮2</button> : null}
        <br />
        <button>{isRun ? '正在处理中...' :'立即提交注册'}</button>
    </>
```

```js
/* 需求二:从服务器获取了一组列表数据，循环动态绑定相关的内容 */
let data = [{
        id: 1,
        title:'欢迎大家来珠峰学习'
        },{
        id: 2,
        title:'期望大家可以把React学好'
        },{
        id: 3,
        title:'大家有问题可以随时找我'
        }];
root.render(
     <>
        <h2 className="title">今日新闻</h2>
        <ul className="news-box">
            {data.map((item, index) => {
        /* 循环创建的元素一定设置key属性，属性值是本次循环中的“唯一值”【优化DOM-DIFF】 */
            return <li key={item.id}>
                <em>{index + 1}</em>
                &nbsp;&nbsp;
                <span>{item.title}</span>
                </li>;
        })} //[li,li,li]
        </ul>

        {/*扩展需求:没有数组，就是想单独循环五次 */}
        {new Array(5).fill(null).map((_, index) => {
            /* 数组的fill方法 把稀疏数组填充为密集数组 就可以使用数组的迭代方法了*/
            return <button key={index}>
                           按钮{index+1}
                </button>;
        })};
    </>
)
```

#### 底层渲染机制

- 第一步：把我们编写的JSX语法，编译为虚拟DOM对象【virtualDOM】

  虚拟DOM对象：框架自己内部构建的一套对象体系(对象的相关成员都是React内部规定的)，基于这些属性描述出，我们所构建视图中的，DOM节点的相关特征。

  > 虚拟DOM的好处：
  >
  > 1. 降低API复杂度
  > 2. 解决兼容问题
  > 3. 提升性能（减少DOM的不必要操作）

  @1 基于 babel-preset-react-app 把JSX编译为 React,createElement(...)这种格式。

  只要是元素节点，必然会基于createElement进行处理。

  React.createElement(ele,props,...children)

  + ele：元素标签名或组件

  + props：元素的属性集合(对象)如果没有设置过任何的属性，则此值是null；

  + children：第三个及以后的参数，都是当前元素的子节点
    - className的处理：value存储的是样式类名
    - style的处理：value存储的是样式对象
    - 子节点的处理：value存储的children属性值

  @2 再把` createElement `方法执行，创建出virtualDOM虚拟DOM对象，也有称之为； JSX元素、JSX对象、ReactChild对象...

  ```js
  virtualDOM = {
  $$typeof: Symbol(react.element)，
  ref: null,
  key: null,
  type:标签名或组件]，
  //存储了元素的相关属性 && 子节点信息
  props:{
  元素的相关属性，
  children:子节点信息 【没有子节点则没有这个属性、属性值可能是一个值、也可能是一个数组】
  ```

- 第二步:把构建的virtualDOM渲染为真实DOM

  真实DOM:浏览器页面中，最后染出来，让用户看见的DOM元素。

  基于ReactDOM中的render方法处理的。

  ```js
  v16
  ReactDOM.render(
  <>...</>
  document.getElementById('root')
  
  v18
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <>...</>
  );
  ```

> 补充说明：第一次渲染页面是直接从vrtualDOM->真实DOM；但是后期视图更新的时候，需要经过一个DOM-DIFF的对比，计算出补丁包PATCH(两次视图差异的部分)，把PATCH补丁包进行染。【只对变化的元素进行修改，没有发生的变化不予处理】

## 04 Fragment

在React中，JSX必须有且只有一个根元素。这就导致了在有些情况下我们不得不在子元素的外部添加一个额外的父元素，像是这样：

```js
import React from 'react';

const MyComponent = () => {
    return (
        <div>
            <div>我是组件1</div>
            <div>我是组件2</div>
            <div>我是组件3</div>
        </div>
    );
};

export default MyComponent;
```

上边这段代码中，组件内部需要引入三个组件（使用三个div表示）。由于是三个组件，根据JSX的语法必须在三个组件的外部在套一个div，三个组件才能够正常使用，但是这个外层的div在最终的页面中没有任何的实质性作用。

遇到这种情况我们就非常希望能有一种方式可以引入多个组件，但又不会在最终的网页中添加多余的结构，那么我们可以定义这样一个组件：

```js
import React from 'react';

const MyFragment = (props) => {
    return props.children;
};

export default MyFragment;
```

MyFragment这个组件非常简单，它会直接返回当前组件内部的所有子元素，不会产生新的元素，可以将上边组件中的外层div，修改为MyFragmet：

```js
import React from 'react';
import MyFragment from "./MyFragment";

const MyComponent = () => {
    return (
        <MyFragment>
            <div>我是组件1</div>
            <div>我是组件2</div>
            <div>我是组件3</div>
        </MyFragment>
    );
};

export default MyComponent;
```

这样一来，网页中就不会出现多余的div了。

实际上在React中已经为我们提供好了一个现成的组件帮助我们完成这个工作，这个组件可以通过React.Fragment使用，上述案例，也可以修改成这样：

```js
import React from 'react';

const MyComponent = () => {
    return (
        <React.Fragment>
            <div>我是组件1</div>
            <div>我是组件2</div>
            <div>我是组件3</div>
        </React.Fragment>
    );
};

export default MyComponent;
```

也可以修改引入React的方式，直接使用Fragment：

```js
import React, {Fragment} from 'react';

const MyComponent = () => {
    return (
        <Fragment>
            <div>我是组件1</div>
            <div>我是组件2</div>
            <div>我是组件3</div>
        </Fragment>
    );
};

export default MyComponent;
```

不过最爽的是，在React中为我们提供了一种更加便捷的方式，直接使用<></>代替Fragment更加简单：

```js
import React from 'react';

const MyComponent = () => {
    return (
        <>
            <div>我是组件1</div>
            <div>我是组件2</div>
            <div>我是组件3</div>
        </>
    );
};

export default MyComponent;
```

> <React.Fragment></React.Fragment>
> 
><Fragment></Fragment>
> 
> <></>

```js
// 获取根元素
const root = ReactDOM.createRoot(document.getElementById('root'));
document.getElementById('btn').onclick = function (){
        // 重新渲染页面
        // 创建一个数据
    const data = ['唐僧', '孙悟空', '猪八戒', '沙和尚'];
    // 创建列表
    const list = <ul>
        {/*data.map(item => <li key={item}>{item}</li>)*/}
        {data.map((item, index) => <li key={index}>{item}</li>)}
    </ul>;
    // 渲染元素
    root.render(list);

/*
*	旧数据
*       ul
*           li>孙悟空
*           li>猪八戒
*           li>沙和尚
*	新数据
*       ul
*           li>孙悟空
*           li>猪八戒
*           li>沙和尚
*   比较两次数据时，React会先比较父元素，父元素如果不同，直接所有元素全部替换
*       父元素一致，在去逐个比较子元素，直到找到所有发生变化的元素为止
*   上例中，新旧两组数据完全一致，所以没有任何DOM对象被修改
*
* 旧数据
*       ul
*           li>孙悟空
*           li>猪八戒
*           li>沙和尚
* 新数据
*       ul
*           li>tom
*           li>猪八戒
*           li>沙和尚
*
*  上例中，只有第一个li发生变化，所以只有第一个li被修改，其他元素不变

*  当我们在JSX中显示数组中，数组中每一个元素都需要设置一个唯一key，否则控制台会显示红色警告
*       重新渲染页面时，React会按照顺序依次比较对应的元素，当渲染一个列表时如果不指定key，同样也会按照顺序进行比较，
*       如果列表的顺序永远不会发生变化，这么做当然没有问题，但是如果列表的顺序会发生变化，这可能会导致性能问题出现
*
*   旧数据
*       ul
*           li>孙悟空
*           li>猪八戒
*           li>沙和尚
*   新数据
*       ul
*           li>孙悟空
*           li>猪八戒
*           li>沙和尚
*           li>唐僧
*
*   上例中，在列表的最后添加了一个新元素，并没有改变其他的元素的顺序，所以这种操作不会带来性能问题
*
*   旧数据
*       ul
*           li>孙悟空
*           li>猪八戒
*           li>沙和尚
*   新数据
*       ul
*           li>唐僧
*           li>孙悟空
*           li>猪八戒
*           li>沙和尚
*
*   上例中，在列表的最前边插入了一个新元素，其他元素内容并没有发生变化，
*       但是由于新元素插入到了开始位置，其余元素的位置全都发生变化，而React默认是根据位置比较元素
*       所以 此时，所有元素都会被修改
*
*   为了解决这个问题，React为列表设计了一个key属性，
*       key的作用相当于ID，只是无法在页面中查看，当设置key以后，再比较元素时，
*       就会比较相同key的元素，而不是按照顺序进行比较
*   在渲染一个列表时，通常会给列表项设置一个唯一的key来避免上述问题
*       （这个key在当前列表中唯一即可）
*       注意：
*           1.开发中一般会采用数据的id作为key
*           2.尽量不要使用元素的index作为key
*               索引会跟着元素顺序的改变而改变，所以使用索引做key跟没有key是一样的
*                   唯一的不同就是，控制台的警告没了
*               当元素的顺序不会发生变化时，用索引做key也没有什么问题
*   旧数据
*       ul
*           li(key=孙悟空)>孙悟空
*           li(key=猪八戒)>猪八戒
*           li(key=沙和尚)>沙和尚
*   新数据
*       ul
*           li(key=唐僧)>唐僧
*           li(key=孙悟空)>孙悟空
*           li(key=猪八戒)>猪八戒
*           li(key=沙和尚)>沙和尚
* */
};
```

# d2 创建React项目

## 01 手动创建

常规的React项目需要使用npm（或yarn）作为包管理器来对项目进行管理。并且React官方为了方便我们的开发，为我们提供react-scripts包。包中提供了项目开发中的大部分依赖，大大的简化了项目的开发。

#### 开发步骤：

- 创建项目，目录结构如下

```js
根目录
    - public
        - index.html （添加标签 <div id="root"></div>）
    - src
        - App.js
        - index.js
```

- 进入项目所在目录，并执行命令：`npm init -y` 或 `yarn init -y`
- 安装项目依赖：`npm install react react-dom react-scripts -S` 或 `yarn add react react-dom react-scripts`
- 运行`npx react-scripts start`启动项目（初次启动需要输入y确认）
- 或者将`react-scripts start`设置到`package.json`的scripts选项中，然后通过`npm start`启动（初次启动需要输入y确认）”scripts”: { “start”: “react-scripts start” }

#### index.html：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>React项目</title>
</head>
<body>
<div id="root"></div>
<!--
    public/index.html是首页的模板，webpack在编译文件时，会以index.html为模板生成index.html
-->
</body>
</html>
```

#### App.js：

```js
const App = () => {
   return <h1>Hello React!</h1>
}
export default App;
```

#### index.js：

```js
// src/index.js 是js的入口文件
// 引入ReactDOM
import ReactDOM from 'react-dom/client';
import App from "./App";

// 获取一个根容器
const root = ReactDOM.createRoot(document.getElementById('root'));
// 将App渲染进根容器
root.render(App);
```

## 02 自动创建

### create-react-app

1. 打开命令行
2. 进入到项目所在目录
3. 使用如下命令：`npx create-react-app 项目名`

```js
npm i create-react-app -g
create-react-app -version
create-react-app my-react-app
//my-react-app由数字、小写字母、_组成
create-react-app react_music --template typescript
//同时支持ts
```

#### 项目目录结构：

```bash
react-app
    ├─ node_modules
    ├─ public
        ├─ favicon.ico
        ├─ index.html
        ├─ logo192.png
        ├─ logo512.png
        
            ├─ manifest.json
            ├─ robots.txt
    ├─ src
        ├─ App.css
        ├─ App.js
        ├─ App.test.js
        ├─ index.css
        ├─ index.js
        ├─ logo.svg
        ├─ reportWebVitals.js
        ├─ setupTests.js		
    ├─ package.json
```

#### Package.Json

```json
"dependencies": {
    "@testing-library/jest-dom": "^5.16.4",  // 单元测试相关包
    "@testing-library/react": "^13.2.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"  // 性能统计相关包
  },
  "scripts": {
    "start": "react-scripts start", // 启动
    "build": "react-scripts build", // 打包
    "test": "react-scripts test",  // test命令，用于单元测试可通过npm run test或yarn test调用
    "eject": "react-scripts eject" // eject命令，暴露项目的webpack配置文件，调用后可手动配置webpack，不可回退！慎用！
  }
```

#### Node_modules

node的包目录

#### Public

public用来存放首页模板及静态资源，该目录中除了`index.html`都可以删除

- index.html 首页模板（不能删）

  ```js
  <!DOCTYPE html>
  <html lang="en"> <!-- 最好改成zh -->
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> <!-- 收藏图标路径 %PUBLIC_URL% 表示根目录路径 -->
      <meta name="viewport" content="width=device-width, initial-scale=1" /> <!-- 完美视口 保留 -->
      <meta name="theme-color" content="#000000" /> <!-- 手机状态栏的颜色，可根据需要修改 -->
      <meta
        name="description"
        content="Web site created using create-react-app"
      /> <!-- 网页的描述，可根据需要修改 -->
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> <!-- iOS主屏图标，可删 -->
      <!--
        manifest.json provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
      -->
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> <!-- PWA配置文件路径，可删 -->
      <!--
        Notice the use of %PUBLIC_URL% in the tags above.
        It will be replaced with the URL of the `public` folder during the build.
        Only files inside the `public` folder can be referenced from the HTML.
  
        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run build`.
      -->
      <title>React App</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript> <!-- JS禁用时，显示的提示文字 -->
      <div id="root"></div> <!-- 根容器 -->
      <!--
        This HTML file is a template.
        If you open it directly in the browser, you will see an empty page.
  
        You can add webfonts, meta tags, or analytics to this file.
        The build step will place the bundled scripts into the <body> tag.
  
        To begin the development, run `npm start` or `yarn start`.
        To create a production bundle, use `npm run build` or `yarn build`.
      -->
    </body>
  </html>
  ```

- favicon.ico 收藏夹图标（可以删，开发中会替换为自己的图标）

- logoxxx.png React的Logo（删）

- manifest.json（PWA的配置文件，大部分情况没啥用，删）

- robots.txt（搜索引擎配置文件，可删）

#### src

源码目录 

- index.js  

  项目入口文件，不能删

  ```js
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );
  ```

- index.css  

  index.js  的样式表，可改可删

- App.js  

  主组件，可改可删

- App.css  

  App.js的样式表，可改可删

- xxx.test.js  

  带有test的都是单元测试的文件，可删，关于单元测试后边会单独介绍

- reportWebVitals.js

  应用性能统计相关的代码，简单说用户在使用应用时，该模块可以统计用户加载应用所花费的时间，并且根据需要发送给统计服务器，如果没有相关需求可删

### 修改配置

#### 1 craco

- yarn add @craco/craco@alpha -D

- 创建craco.config.js

  ```js
  const path = require('path')
  module.exports = {
    // webpack 配置
    webpack: {
      // 配置别名
      alias: {
        // 约定：使用 @ 表示 src 文件所在路径
        '@': path.resolve(__dirname, 'src')
        // ....其他的一些配置
      }
    },
    style: {
      postcssOptions: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    },
    //配置代理解决跨域
    devServer: {
      proxy: {
        '/api': {
          target: 'http://codercba.com:9002',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
  ```

- 再配置tsconfig.json

  ```js
  "baseUrl": ".",
  //点表示当前目录 C:\Users\苏渺\Desktop\Front\WebProject\07-仿网易云\react_music> 
  "paths": {
    "@/*": [
      "src/*"
    ]
  ```

- 再配置package.json

  ```js
  "scripts": {
      "start": "craco start",
      "build": "craco build",
      "test": "craco test",
      "eject": "react-scripts eject"
    },
  ```

#### 2 暴露配置项&修改配置项

```js
yarn eject //暴露配置项 不暴露
//一旦暴露 就无法还原 先提交
git add .
git commit -m 'init'
yarn eject //再一遍即可
// 多了两个文件夹config/scripts
// 会直接基于node执行对应的入口文件
// package.json重新安装各依赖项：babel、...
```

babel-preset-react-app：

对@babel/preset-env语法包的重写 让它可以识别react语法 把ES6转为ES5

babel：

类似于babel.config.js 对babel-loader的额外配置

sass（create-react-app默认）

##### 处理less

```js
yarn add less less-loader@8
yarn remove sass-loader
// webpack.config.js中修改72、73、508、509、520、531、543行
```

> create-React-App脚手架默认规则的修改：直接去暴露的源码中修改

##### 配置别名

```js
// 312行
alias:{
'@'：path.appSrc
...
}
```

##### 修改域名和端口号

```js
// scripts/start.js 47/48行
const DEFAULT_PORT = parseInt(process.env.PORT,10 || 3000)
const HOST = process.env.HOST || '127.0.1';
```

如果想基于环境变量的方式来改

```js
yarn add cross-env
package.json 64行修改为
"start"："cross-env 8000 node scripts/start.js"
```

##### 修改浏览器兼容

```js
// package.json中修改兼容列表 对postcss-loader、babel-loader生效 
// 无法处理ES6内置API的兼容 [babel/polyfull]
"browerslist"：{}
```

##### 处理proxy跨域

新建src/setupProxy.js

yarn add http-proxy-middleware

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/zhi", {
            target: "http://news-at.zhihu.com/api/4",
            changeOrigin: true,
            ws: true,
            pathRewrite: { "^/azhi": "" }
        }))
};
```

yarn start

```js
// 测试
...
fetch('/zhi/news/latest')
    .then(response=>response.json())
	.then(value=>{console.log(value);});
```

### 代码规范

#### editconfig配置

```js
# http://editorconfig.org
# 不依赖vscode 也能维护一致的代码风格

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

#### prettier配置

yarn add prettier -D

代码规范 .prettierrc

```js
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true, //使用单引号
  "trailingComma": "none",  //是否在对象和数组的最后一项后添加逗号
  "semi": false  //在语句的末尾不使用分号
}
```

在package.json中配置一个scripts

```
"prettier": "prettier --writer ."
```

创建.prettierignore忽略文件

```
/build/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

#### eslint

yarn add eslint -D

npx eslint --init

得到.eslintrc.js

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    semi: 'off'
  }
}
```

yarn add eslint-plugin-prettier eslint-config-prettier -D

# d3 React组件化开发

> 没有像vue中那样明确全局和局部的概念，可以理解为都是局部组件，不过可以把组件注册到react中，这样每个组件只需要导入react即可使用。

- 函数式组件

  > 第一次渲染组件，把函数执行，产生一个私有的上下文，把解析出来的props[含children]传递过来[但是冻结]，对函数返回的JSX对象[virtuaDOM]进行渲染。当我们点击按钮的时候，会把绑定的小函数执行：修改上级上下文的变量，私有变量值发生了改变，但是视图不会更新。
  >
  > 如果需要在第一次渲染完毕后，基于组件的某些操作，让组件可以更新，以呈现不同的效果：动态组件[方法：类组件、Hooks组件]（函数组件中使用Hooks函数）

  - 不具备状态、生命周期、ref等内容，函数组件第一次渲染完毕后，组件中的内容，不会根据组件内的某些操作，所以称他为静态组件。除非在父组件中，重新调用这个函数组件[可以传递不同的属性信息]。
  - 但是具备属性和插槽，父组件可以控制其重新渲染。
  - 基于FP函数式编程思想设计
  - 优势：渲染速度快
  - 弊端：无法实现组件动态更新

  > Hooks组件：函数组件动态化

- 类组件

  + 具备状态、生命周期、ref、属性和插槽等内容，可以灵活的控制组件的更新，基于钩子函数也可以灵活掌握不同阶段处理不同的事情
  + 渲染流程繁琐，渲染速度相对较慢
  + 基于OOP面向对象编程思想设计

## 01 函数式组件

在React中网页被拆分为了一个一个组件，组件是独立可复用的代码片段。具体来说，组件可能是页面中的一个按钮，一个对话框，一个弹出层等。

### 创建

基于函数的组件：一个会返回JSX（React元素）的普通的JS函数

```js
// App.js
const App = function App(){
    return <h1>我是一个React的组件！</h1>
}

export default App;
```

或者使用箭头函数

```js
const App = () => {
    return <h1>我是一个React的组件！</h1>;
};

export default App;
```

函数式组件主要有两个注意点：

1. 函数名首字母大写（大驼峰命名法）
2. 返回值是一个JSX（React元素）

### 调用

在其他文件中使用时，需要先通过import进行引入：

```js
// index.js
import ReactDOM from "react-dom/client";
import App from "./App";  //可以忽略后缀名

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
```

引入后通过 `<组件名/>` 或 `<组件名></组件名>` 即可引入组件。

> 调用组件的时候，可以给调用的组件传递各种各样的设置
>
> - 如果设置的属性值不是字符串格式，需要基于{}嵌套
> - 调用组件的时候，我们可以把一些数据/信息基于属性props的方式，传递给组件
> - 基于双闭合调用的方式，还可以传递子节点（props.children）

在一个组件中可以直接使用其他组件，比如有如下`Button.js`:

```js
const Button = () => {
    return <button>我是一个按钮</button>;
};

export default Button;
```

在`App.js`中可以直接引入该组件：

```js
import Button from "./Button";

const App = () => {
    return <div>
        <h1>我是一个React的组件！</h1>
        <Button/>
    </div>;
};

export default App;
```

### 属性props的处理

##### 只读

 [props对象被冻结了]

> 关于对象的规则设置：
>
> 冻结 Object.freeze(obj) [都不可]
>
> 密封 Object.seal(obj) [可以修改、其余不可]
>
> 不可扩展 Object.preventExtensions(obj) 把对象设置为不可扩展 [不能新增、其余都可]

##### 作用

父组件调用子组件时候，可以基于属性，把不同的消息传递给子组件；子组件接收相应的属性值，呈现出不同的效果，让组件的复用性更强。

```js
<Button bgColor='red' color='white'>我是一个按钮</Button>
```

上边的案例中我们设置了两个属性，这些属性会被封装到一个对象中并作为参数传递给Button组件，只需要在Button组件中定义一个参数即可获取，通常这个参数我们会命名为props，像这样：

```js
import './Button.css';
const Button = (props) => {
    return <button style={{backgroundColor:props.bgColor, color:props.color}}>						{props.children}
		</button>;
};

export default Button;
```

在组件内部可以通过props.xxx来访问外部传递进的属性，从而达到动态设置的目的。

需要注意的是，标签体也可以设置为props的一个属性，叫做children，可以通过`props.children`来获取标签体的内容。

还有一点一定要记住，props中的属性是只读属性是无法修改的，但是可以做一些规则校验。

+ 设置默认值：通过把函数当作对象，设置静态的私有属性方法，来设置默认规则校验 

  ```js
  defaultProps={}
  ```

+ 设置其他：数据值格式、是否必传

  ```js
  import PropTypes from ' prop-types' 
  函数组件.propTypes{
      title:PropTypes.string.isRequired,  //字符串、必传
      x:PropTypes.number  //类型是数字
      // 多种校验规则中的一个
      y:PropTypes.oneOfType{[
          PropTypes.number,
          PropTypes.bool,
      ]}
  }
  ```

不管成功还是失败，都会把属性给props，如果不符合的会抛出错误，但不影响属性的获取。

就想修改：把props的某个属性值赋值给其他内容

```js
let x = props.x
x = 1000； 
```

##### 插槽处理机制

① 基于传递属性的方式 把相关信息（数据值） 传递给子组件

>  接收传递过来的属性，很具传递的值不同，让子组件显示不同的效果。
>
> - 写死 基于传递进来的属性 判断显示与隐藏
> - 不写内容 预留位置 调用组件时传递 [结构]

②【插槽处理机制】预留插槽位置 不写内容 调用组件时 把插槽信息[子节点信息] 传递给组件

> 和属性一样 让组件具有更强的复用性
>
> - 传递数据值 用属性
> - 传递HTML结构 用插槽

###### 匿名插槽

```js
import react from 'react'

const Demo = function Demo(props){
let { title,x,children } = props;
//要对children的类型做处理
children = React.children.toArray(children); //count/forEach/map/

return <>
    {children[0]}
	<br/> 
     </>
}
```

调用组件时 要保证顺序

###### 具名插槽

给插槽起名字 不用考虑顺序

- 给传递的插槽信息名字 属性值是我们设定的插值

- 按照插槽名字 筛选出不同的插槽信息【传递过来的插槽信息都是编译为viryualDOM后传递过来的 而不是传递的标签】
- 将筛选出来的具体插槽信息，放在指定的位置在进行渲染 

### React.Memo

React组件会在两种情况下发生重新渲染。第一种，当组件自身的state发生变化时。第二种，当组件的父组件重新渲染时。第一种情况下的重新渲染无可厚非，state都变了，组件自然应该重新进行渲染。但是第二种情况似乎并不是总那么的必要。我们来看一个demo，现有如下三个组件，分别为App组件、A组件和B组件：

App.js

```js
const App = () => {
    const [count, setCount] = useState(1);

    const clickHandler = () => {
        setCount(prevState => prevState + 1);
    };

    return (
        <div>
            <h2>App -- {count}</h2>
            <button onClick={clickHandler}>增加</button>

            <A/>
        </div>
    );
};
```

A.js

```js
const A = () => {
    const [count, setCount] = useState(1);

    const clickHandler = () => {
      setCount(prevState => prevState + 1);
    };

    return (
        <div>
            <h2>组件A -- {count}</h2>
            <button onClick={clickHandler}>增加</button>
            <B/>
        </div>
    );
};

export default A;
```

B.js

```js
const B = () => {
    return (
        <div>
            <h2>组件B</h2>
        </div>
    );
};

export default B;
```

三个组件的引用关系为，A组件是App的子组件、B组件是A组件的子组件：App –> A –> B

当App组件发生重新渲染时，A和B组件都会发生重渲染。当A组件重新渲染时，B组件也会重新渲染。B组件中没有state，甚至连props都没有设置。换言之，B组件无论如何渲染，每次渲染的结果都是相同的，虽然重渲染并不会应用到真实DOM上，但很显然这种渲染是完全没有必要的。为了减少像B组件这样组件的渲染，React为我们提供了一个方法`React.memo()`。

该方法是一个高阶函数，可以用来根据组件的props对组件进行缓存，当一个组件的父组件发生重新渲染，而子组件的props没有发生变化时，它会直接将缓存中的组件渲染结果返回而不是再次触发子组件的重新渲染，这样一来就大大的降低了子组件重新渲染的次数。

现在对上述案例中的B组件进行如下修改：

```js
const B = () => {
    console.log('B渲染');
    return (
        <div>
            <h2>组件B</h2>
        </div>
    );
};

export default React.memo(B);
/*
*   React.memo() 是一个高阶组件：
*       它接收另一个组件作为参数，并且会返回一个包装过的新组件
*       包装过的新组件就会具有缓存功能，包装过后，只有组件的props发生变化，才会触发组件的重新的渲染，否则总是返回缓存中结果
* */
```

修改后的代码中，并没有直接将B组件向外导出，而是在B组件外层套了一层函数`React.memo()`，这样一来，返回的B组件就增加了缓存功能，只有当B组件的props属性发生变化时，才会触发组件的重新渲染。memo只会根据props判断是否需要重新渲染，和state和context无关，state或context发生变化时，组件依然会正常的进行重新渲染。

### 函数组件模板

```js
import React, { memo } from 'react'
import type { ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  // ReactElement|string|...
}

// FC：FunctionComponent 指定Template为函数组件类型 传入泛型参数 指定props应该有的类型
const Template: React.FC<IProps> = () => {
  return (
    <div>Template</div>
  )
}

export default memo(Template)
```

在VSCode中配置用户代码片段

```js
"react typescript": {
  "prefix": "tsr",
  "body": [
    "import React, { memo } from 'react'",
    "import type { ReactNode } from 'react'",
    "",
    "interface IProps {",
    "  children?: ReactNode",
    "}",
    "",
    "const ${1:Home}: React.FC<IProps> = () => {",
    "  return <div>Template</div>",
    "}",
    "",
    "export default memo(${1:Home})"
  ],
  "description": "react typescript"
}
```

## 02 类组件

除了函数组件外，在React中还有一种类组件，但类组件使用起来并不方便，所以在React中类组件的使用场景越来越少。

```js
/*
*   VS Code中的快捷方式：
*       rsf --> 函数组件
*       rcc --> 类组件
* */
import React, {Component} from 'react';
import './App.css';
import User from "./components/User";

class App extends Component {
    render() {
        return (
            <div className="app">
                <User name='猪八戒' age={28} gender={'男'}/>
            </div>
        );
    }
}
export default App;
```

### props

​	类组件的props是存储到类的实例对象中，可以直接通过实例对象访问 this.props

### state

​	类组件中state统一存储到了实例对象的state属性中，可以通过 this.state来访问，通过this.setState()对其进行修改当我们通过this.setState()修改state时，React只会修改设置了的属性。

​	函数组件中，响应函数直接以函数的形式定义在组件中，但是在类组件中，响应函数是以类的方法来定义，之前的属性都会保留，但是这你仅限于直接存储于state中的属性。

### setState

React18中，对于setState的操作，采用了 `批处理`！

- 构建了队列机制
- 统一更新，提高视图更新的性能
- 处理流程更加稳健

在React 18之前，我们只在 `React合成事件/周期函数`期间批量更新；默认情况下，React中不会对 promise、setTimeout、原生事件处理（native event handlers）或其它React默认不进行批处理的事件进行批处理操作！

### **Ref**

- 受控组件：基于修改数据/状态，让视图更新，达到需要的效果
- 非受控组件：基于ref获取DOM元素，操作DOM元素来实现需求和效果

第一次渲染完毕，虚拟DOM已经变为真实DOM：此时可以获取需要操作的DOM元素。

获取原生的DOM对象：

1. 可以使用传统的document来对DOM进行操作
2. 直接从React处获取DOM对象

**基于ref获取DOM元素1**

```
<h1 ref="titlebox">....</h1>
```

获取：this.refs.titleBox

> React严格模式下会报错

**基于ref获取DOM元素2**

```
<h1 ref={x=>this.xxx=x}>....</h1>
```

把ref属性值设置为一个函数 ref={x=>this.xxx=x}

+ x是函数的形参：存储当前的DOM元素
+ x直接挂载到实例的某个属性上

获取：this.xxx

**基于ref获取DOM元素3**

基于React.createRef()方法创建一个REF对象

```
this.xxx. = React.createRef() => this.xxx = {current：null}
ref = {REF对象(this.xxx)}
```

获取：this.xxx.current

> 类组件中基于ref可以做的事情：
>
> - 给标签设置ref：获取当前DOM元素
> - 给类组件设置ref：获取当前调用组件创建的实例
>
> - 给函数组件设置值ref，直接报错，但我们让其配合React.forwardRef实现ref的转发：获取函数子组件内部的某个元素

```js
import React, {Component} from 'react';
class User extends Component {
    /* 获取DOM对象
        1.创建一个属性，用来存储DOM对象
        	divRef = React.createRef();
        2.将这个属性设置为指定元素的ref值
    */
    
    // 创建属性存储DOM对象
    divRef = React.createRef();

    // 向state中添加属性
    state = {
        count: 0,
        test: '哈哈',
        obj: {name: '孙悟空', age: 18}
    };

    // 为了省事，在类组件中响应函数都应该以箭头函数的形式定义
    clickHandler = () => {
        // this.setState({count: 10});
        // this.setState(prevState => {
        //     return {
        //         count: prevState + 1
        //     }
        // });
        
        /*this.setState({
            obj:{...this.state.obj, name:'沙和尚'}
        });*/

        console.log(this.divRef);
    };


    render() {
        // console.log(this.props);
        // console.log(this.divRef);

        return (
            <div ref={this.divRef}>
                <h1>{this.state.count} --- {this.state.test}</h1>
                <h2>{this.state.obj.name} --- {this.state.obj.age}</h2>
                <button onClick={this.clickHandler}>点</button>
                <ul>
                    <li>姓名：{this.props.name}</li>
                    <li>年龄：{this.props.age}</li>
                    <li>性别：{this.props.gender}</li>
                </ul>
            </div>
        );
    }
}

export default User;
```

# d4 React的事件处理机制

## 01 事件绑定

React中的事件处理类似于在HTML标签中通过属性来设置事件，像是这样：

```html
<button onclick="alert('你点我干嘛');">点我一下</button>
```

这是传统DOM中绑定事件的方式之一，onclick全都小写是事件的名字，它的值是一组JS代码，当事件触发时，JS代码便会执行。记住这一点，传统DOM中事件属性的JS代码在事件触发时执行！

React中的事件绑定是这样的：

```html
const clickHandler = ()=> {
    alert('你点我干嘛');
};
const ele = <button onClick={clickHandler}>我是一个按钮</button>;
<br/>
<a href="https://www.baidu.com" onClick={clickHandler}>超链接</a>
```

两者长得很像，但是也有很大的区别：

1. React事件使用的是驼峰命名法

   > onclick  ----  onClick

2. 事件属性值需要的是一个函数对象，而不是调用函数

   > onclick="alert('你点我干嘛')
   >
   > onClick={()=> {alert('你点我干嘛');};}

3. 在React中，无法通过return false取消默认行为

   > event.preventDefault(); // 取消默认行为
   >
   > event.stopPropagation(); // 取消事件的冒泡

React事件名使用的是驼峰命名法而不是纯小写事件，所以在React中设置事件时onclick应该写为onClick，其他的事件也是如此。

React事件的属性值需要的是一个回调函数，函数会在触发时执行，所以上例中我写的clickHandler是没有加()的，如果加了()函数会在赋值时立刻执行，而赋值给onClick事件的将是函数的返回值undefined，这将导致事件的设置失效，这一点你可以自己试试看。

## 02 事件对象

React事件也会产生事件对象，在事件的响应函数中可以定义第一个参数来获取事件对象：

```js
const clickHandler = (e)=> {
    // e 表示事件对象
    console.log(e);
    alert('你点我干嘛');
};
```

React中的事件对象同样不是原生的事件对象，是经过React包装后的事件对象，由于对象进行过包装，所以使用过程中我们无需再去考虑兼容性问题。

使用事件对象可以完成像原生DOM中事件对象的各种操作，比如取消默认行为和取消事件的冒泡：

```js
const clickHandler = (e)=> {
    e.preventDefault(); // 取消默认行为
    e.stopPropagation(); // 取消事件的传播
    ....
    clientX/clientY
    pageX/pageY
    target
    type
    nativeEvent:基于这个属性可以获取浏览器内置的原生的事件对象
};
```

## 03 bind

bind在React事件绑定中的应用：

+ 绑定的方法是一个普通函数，需要改变函数中this是实例

  > 类组件 onClick={this.showAlert.bind(this)}

+ 想给函数传递指定的实参，可以基于bind预先处理[bind会把合成事件对象作为最后一个实参传递给函数]

**注意**

- 移动端click 单击事件（移动端的click会存在300ms延迟）

  > 使用FastClick解决

- PC端click 点击

连着点击两下，PC端会触发：两次click、一次dbclick，移动端：不会触发click，只会触发dbclick；

单击事件：第一次点击后，监测300ms，看是否有第二次点击事件，如果没有就是单击，

单手指事件模型：touch、touchstart、touchmove、tounchend

> 在React中，循环给元素绑定的合成事件，本身就是基于事件委托处理的，所以无需再单独的设置事件委托的处理机制。

# d5 Hooks

关于React中的钩子函数，我们已经非常熟悉了。钩子函数的功能非常的强大，而它的使用又十分简单。关于钩子函数的使用，我们只需记住两点：

1. 钩子只能在React组件和自定义钩子中使用
2. 钩子不能在嵌套函数或其他语句（if、switch、white、for等）中使用

**React中自带的钩子函数：**

- useState
- useEffect
- useContext
- useReducer
- useCallback
- useRef
- useMemo
- useImperativeHandle
- useLayoutEffect
- useDebugValue（18.0新增）
- useDeferredValue（18.0新增）
- useTransition（18.0新增）
- useId（18.0新增）
- useSyncExternalStore（18.0新增）
- useInsertionEffect（18.0新增）

## 01 useState

> props中的所有属性都是不可变的，这使得React组件不能随着props的改变而改变。但在实际的开发中，我们更希望的是数据发生变化时，页面也会随着数据一起变化。React为我们提供了state用来解决这个问题。state和props类似，都是一种存储属性的方式，但是不同点在于state只属于当前组件，其他组件无法访问。并且state是可变的，当其发生变化后组件会自动重新渲染，以使变化在页面中呈现。

目的：在函数组件中使用状态，并且后期基于状态的修改，可以让组件更新。

语法：

```js
const [state, setState] = useState(initialState);
```

- 它需要一个值作为参数，这个值就是state的初始值。
- 函数会返回一个数组：[状态值，修改状态的方法]，数组中有两个元素，第一个元素是存储了值的变量，第二个元素是一个函数用来对值进行修改。
- 执行setState（value）：修改状态值为value，通知视图更新。

函数组件不是类组件，所以没有实例的概念 [调用组件不再是创建类的实例，而是把函数执行，产生一个私有上下文而已，所以，在函数组件中不涉及this的处理]

> state相当于一个变量，只是这个变量在React中进行了注册，React会监控这个变量的变化，当state发生变化时，会自动触发组件的重新渲染，使得我们的修改可以在页面中呈现出来。state也可以被认为是一个变量，但是它的定义方式不太一样，我们以函数组件为例来介绍state的使用方式（类组件咱们后边再说）。在函数中使用state我们需要使用一种钩子（hook）函数。钩子函数可以在函数组件中“勾出”React的特性，换句话说我们要用一个函数“勾出”state。

例：

```js
import React, {useState} from 'react';

const Clock = () => {
    const [date, setDate] = useState(new Date().toLocaleTimeString());
//	该函数会返回一个数组：
//		数组中第一个元素，是初始值：初始值只用来显示数据，直接修改不会触发组件的重新渲染
//      数组中的第二个元素，是一个函数，通常会命名为setXxx：这个函数用来修改state，调用其修改state后会触发组件的重新渲染，并且使用函数中的值作为新的state值
    const clickHandler = ()=>{
        setDate(new Date().toLocaleTimeString());
    };
    return (
        <div>
        {date}
            <div><button onClick={clickHandler}>刷新</button></div>
        </div>
    );
};

export default Clock;
```

函数组件的每一次渲染或者是更新，都是把函数重新执行，产生一个全新的私有上下文：

- 内部的代码也需要重新执行
- 涉及的函数也需要重新创建 {这些函数的作用域（函数执行的上级上下文），是每一次执行DEMO产生的闭包}
- 每一次执行DEMO函数，也会把useState重新执行，但是：
  - 执行useState，只有第一次，设置的初始值会生效，其余以后再执行，获取的状态值都是最新的状态值
  - 返回的修改状态的方法，每一次都是返回一个新的

使用useState()“勾出”的变量就是一个普通变量，它里边存储了初始化的值，这个变量和其他变量没什么大区别，同样修改这个变量的值也不会对组件产生实质性的影响，所以不要尝试直接为state赋值。useState()“勾出”的函数用来修改state的值，他需要一个新的state值作为参数，调用后会触发组件的重新渲染，从而使得页面刷新，在每次的重新渲染中都会使用新的state值作为参数。有了state，使得React组件可以随着某个值的改变而改变，我们无需再在某个值发生变化后重新手动对界面进行构建，React会替我们完成这些工作，大大降低了我们开发的难度。

但是state中还隐藏着一些不太容易发现的问题，现在假设我们需要开发一个计数器组件，这个组件非常简单，有一个按钮和一个数字，每点击一次按钮数字就会增加1。这个组件的实现很简单：

```js
//Counter.js
import React, {useState} from 'react';
const Counter = () => {
    const [count, setCount] = useState(1);   //解构
    const clickHandler = ()=> {
        setCount(count+1);
    }

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={clickHandler}>+1</button>
        </div>
    );
};

export default Counter;
```

在`clickHandler()`中，我们调用了`setCount(count+1)`来对count进行更新，每次更新都是在前一次值的基础上增加1。这个代码这么写在大部分的场景下都不会带来任何的问题，但是在某些情况下就不一定了：state实际就是一个被React管理的变量，当我们通过setState()修改变量的值时，会触发组件的自动重新渲染，只有state值发生变化时，组件才会重新渲染。如果直接修改旧的state对象，由于对象还是那个对象，所以不会生效：

- 当state的值是一个对象时，修改时是使用新的对象去替换已有对象
- 当通过setState去修改一个state时，并不表示修改当前的state，它修改的是组件下一次渲染时state值。

在React中我们通过`setState()`修改状态都是异步完成的，换句话说并不是调用完`setState()`后状态立刻就发生变化，而是需要等上一段时间，当然这段时间不会很长。像上边的案例中state的修改虽然是异步完成的，但是由于功能比较简单，等待时间几乎可以忽略不计。但随着功能复杂度的提升，这个间隔会逐渐增多。

所以当调用setState()需要用旧state的值时，一定要注意：

- 有可能出现计算错误的情况
- 为了避免这种情况，可以通过为setState()传递回调函数的形式来修改state值

> 假设调用`setState()`后1秒state的值才会真的改变，这时如果我们连续点击按钮2次，第1次点击按钮时count值是1，第2次点击速度比较快，从而两次间隔没有超过1秒，此时的count值依然是1，这就导致我点击了两次按钮，但是值只增加了1次，因为两次count+1中的count都是1。为了演示问题，可以将上述案例的`setCount()`放入到一个延时调用中，这样一来，点击按钮后1秒`setCount()`才会调用，如果我们在1秒内点击按钮多次，你会发现按钮数值只会增加一次，很显然我们不希望这种情况出现。
>

```js
const [counter, setCounter] = useState(1);
const [user, setUser] = useState({ name: '孙悟空', age: 18 });
const addHandler = () => {
    setTimeout(() => {
        // setCounter(counter + 1); // 将counter值修改为2
        setCounter((prevCounter) => {
            /*
             setState()中回调函数的返回值将会成为新的state值
             回调函数执行时，React会将最新的state值作为参数传递
            */
            return prevCounter + 1;
        });
        // setCounter(prevState => prevState + 1);
    }, 1000);
};
```

要解决这个问题，其实也不难，在`setState()`时除了直接传递一个指定值以外，React还允许我们通过一个回调函数来修改state，回调函数的返回值就是新的state的值，使用回调函数的好处是，这个回调函数会确保上一次的`setState()`调用完成后才被调用，同时会使用最新的state值作为回调函数的第一个参数。这样一来就有效的避免了无法正确获取上一个state值的问题。上边案例中的` setCount(count+1);`可以改成这个样子：

```js
setCount(prevState => prevState+1);
```

这样一来，函数中的prevState总是上次修改后的最新state，避免再次出现点击多次按钮只修改一次的问题。总的来说，当我们修改一个state的值而需要依赖于前边的值进行计算时，最安全的方式就是通过回调函数而不是直接修改。

> ```js
> // 浅复制①
> const newUser = Object.assign({}, user);
> newUser.name = '猪八戒';
> setUser(newUser);
> 
> // 浅复制②
> setUser({ ...user, name: '猪八戒' });
> ```

注意点：

- 在修改值之前，先把原有的所有状态，都展开赋给新对象，再去修改要改动的哪一项值即可

- 需要多个状态，把useState执行多次即可

- 基于useState创建出来的“修改状态的方法”，他们执行也是异步的

  > 原理：基于异步操作&更新队列，实现状态的批处理
  >
  > （遇见flushSync会立即刷新更新队列，可以将异步变为同步

- 函数式更新：如果新的state值需要通过使用先前的state值计算得出，那么可以将函数传递给setState，该函数先前的state，并返回一个更新后的值

- 惰性初始state：如果初始state需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的state，此函数只在初始渲染时被调用

- 性能优化：调用state Hook的更新函数，并传入当前的state时，React将跳过组件的渲染

  > 原因：React使用Object.is比较算法来比较新旧state（注意：不是因为DOM-DIFF

## 02 useEffect

React组件有部分逻辑都可以直接编写到组件的函数体中的，像是对数组调用filter、map等方法，像是判断某个组件是否显示等。但是有一部分逻辑如果直接写在函数体中，会影响到组件的渲染，这部分会产生“副作用”的代码，是一定不能直接写在函数体中。例如，如果直接将修改state的逻辑编写到了组件之中，就会导致组件不断的循环渲染，直至调用次数过多内存溢出。

### 1 React.StrictMode

编写React组件时，我们要极力的避免组件中出现那些会产生“副作用”的代码。同时，如果你的React使用了严格模式，也就是在React中使用了`React.StrictMode`标签，那么React会非常“智能”的去检查你的组件中是否写有副作用的代码，当然这个智能是加了引号的，我们来看看React官网的文档是如何说明的：

Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking the following functions:

- Class component `constructor`, `render`, and `shouldComponentUpdate` methods
- Class component static `getDerivedStateFromProps` method
- Function component bodies
- State updater functions (the first argument to `setState`)
- Functions passed to `useState`, `useMemo`, or `useReducer`

上文的关键字叫做“double-invoking”即重复调用，这句话是什么意思呢？

大概意思就是，React并不能自动替你发现副作用，但是它会想办法让它显现出来，从而让你发现它。那么它是怎么让你发现副作用的呢？

React的严格模式，在处于开发模式下，会主动的重复调用一些函数，以使副作用显现。所以在处于开发模式且开启了React严格模式时，这些函数会被调用两次：

- 类组件的的 `constructor`, `render`, 和 `shouldComponentUpdate` 方法
- 类组件的静态方法 `getDerivedStateFromProps`
- 函数组件的函数体
- 参数为函数的`setState`
- 参数为函数的`useState`, `useMemo`, or `useReducer`

重复的调用会使副作用更容易凸显出来，你可以尝试着在函数组件的函数体中调用一个`console.log`你会发现它会执行两次，如果你的浏览器中安装了React Developer Tools，第二次调用会显示为灰色。如果你无法通过浏览器正常安装[React Developer Tools](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220512111133423.zip)可以通过点击这里下载。

### 2 使用Effect

```js
Too many re-renders.
- 当我们直接在函数体中调用setState时，就会触发上述错误
```

问题：不是说过，当新的state值和旧值相同时，它是不会触发组件的重新渲染的

setState()的执行流程（函数组件）：setCount() --> dispatchSetDate()

​	--> 会先判断，组件当前处于什么阶段：

- 如果是渲染阶段 --> 不会检查state值是否相同

- 如果不是渲染阶段 --> 会检查state的值是否相同

     - 如果值不相同，则对组件进行重新渲染

     - 如果值相同，则不对组件进行重新渲染

          > 如果值相同，React在一些情况下会继续执行当前组件的渲染，但是这个渲染不会触发其子组件的渲染，这次渲染不会产生实际的效果。
          > 这种情况通常发生在值第一次相同时

为了解决这个问题React专门为我们提供了钩子函数`useEffect()`，Effect的翻译过来就是副作用，专门用来处理那些不能直接写在组件内部的代码。哪些代码不能直接写在组件内部呢？像是：获取数据、记录日志、检查登录、设置定时器等。简单来说，就是那些和组件渲染无关，但却有可能对组件产生副作用的代码。

useEffect：在函数组件中，使用生命周期

```js
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */
});

useEffect(callback); //没设置依赖
+ 在第一次渲染完毕后，执行callback
+ 在组件每一次更新完毕后，也执行callback
```

`useEffect()`中的回调函数会在组件每次渲染完毕之后执行，这也是它和写在函数体中代码的最大的不同，函数体中的代码会在组件渲染前执行，而`useEffect()`中的代码是在组件渲染后才执行，这就避免了代码的执行影响到组件渲染。通过使用这个Hook，我设置了React组件在渲染后所要执行的操作。React会将我们传递的函数保存（我们称这个函数为effect），并且在DOM更新后执行调用它。React会确保effect每次运行时，DOM都已经更新完毕。

### 3 清除Effect

组件的每次重新渲染effect都会执行，有一些情况里，两次effect执行会互相影响。比如，在effect中设置了一个定时器，总不能每次effect执行都设置一个新的定时器，所以我们需要在一个effect执行前，清除掉前一个effect所带来的影响。要实现这个功能，可以在effect中将一个函数作为返回值返回，像是这样：

```js
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */
 
    return () => {
        /* 这个函数会在下一次effect执行栈调用 */
    };
});
// 在Effect的回调函数中，可以指定一个函数作为返回值
// 这个函数可以称其为清理函数，它会在下次Effect执行前调用，可以在这个函数中，做一些工作来清除上次Effect执行所带来的的影响
```

effect返回的函数，会在下一次effect执行前调用，我们可以在这个函数中清除掉前一次effect执行所带来的影响。

### 4 限制Effect

组件每次渲染effect都会执行，这似乎并不总那么必要。因此在`useEffect()`中我们可以限制effect的执行时机，在`useEffect()`中可以将一个数组作为第二个参数传递，像是这样：

```js
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */

    return () => {
        /* 这个函数会在下一次effect执行前调用 */
    };
}, [a, b]);
```

上例中，数组中有两个变量a和b，设置以后effect只有在变量a或b发生变化时才会执行。这样即可限制effect的执行次数，也可以直接传递一个空数组，如果是空数组，那么effect只会执行一次。

默认情况下，useEffect()中的函数，会在组件渲染完成后调用，并且是每次渲染完成后都会调用，在useEffect()可以传递一个第二个参数，第二个参数是一个数组，在数组中可以指定Effect的依赖项，指定后，只有当依赖发生变化时，Effect才会被触发，通常会将Effect中使用的所有的局部变量都设置为依赖项，这样一来可以确保这些值发生变化时，会触发Effect的执行。

```js
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */
},[a,b]);

useEffect(callback,[依赖的状态(多个状态)]);
+ 只有第一次渲染完毕后，才会执行callback，
+ 当依赖的状态值，或多个依赖中的一个，发生改变，也会触发callback执行
+ 但是依赖的状态如果没有发生改变，在组件更新的时候，callback是不会执行的
```

如果依赖项设置了一个空数组，则意味Effect只会在组件初始化时触发一次。

```js
useEffect(()=>{
    /* 编写那些会产生副作用的代码 */
},[]);

useEffect(callback,[]); //设置了，但是没依赖
+ 只有第一次渲染完毕后，才会执行callback，每一次视图更新完毕后，callback不再执行
```

注意：

- useEffect必须在函数最外层上下文中调用，不能将其嵌入到条件判断、循环等操作语句中

- 从服务器异步获取数据，useEffect如果设置返回值，则返回值必须是一个函数（代表组件销毁时触发）

  > useEffect( async() => {
  >
  > },[]);
  >
  > // callback经过async的修饰 返回的是一个promise，不行

函数组件中，遇到：修改某个状态（或者视图更新后），想去做一些事情，要用到新修改的状态值，此时：不能直接在代码下面编写，也不能把修改状态改为同步的，因为只有在函数重新执行，产生的新的闭包中，才可以获取最新的状态值，所以：基于useEffect设置状态的依赖，在依赖的状态发生改变后，去做想做的事																			

### 5 使用Effect修改练习

在《汉堡到家》的练习中，存在着一个bug。当我们在购物车或结账界面减少商品的数量全部为0时（购物车中没有商品时）。购物车或结账页面并不能自动关闭，这里我们就可以借用Effect来解决问题。可以直接修改`Cart.js`直接向组件中添加如下的代码：

```js
useEffect(() => {
    if(ctx.totalAmount === 0) {
        setShowCheckout(false);
        setShowDetails(false);
    }
}, [ctx]);
```

这样一来，当购物车中的商品发生变化时，就会触发useEffect，从而检查商品的总数量，如果总数量为0的话就会将购物车详情页和结账也直接隐藏。

除了`Cart.js`以外，FilterMeals组件也存在一个问题，首先，该组件中的表单项我们并没有使用state，所以这个组件是一个非受控组件，虽然目前看来没什么太大的问题，但是我们还是应该处理一下，因为受控组件使用时会更加的灵活，可以适用于更多的场景。其次、该组件的主要作用是过滤汉堡的列表，当用户输入关键字时它可以根据关键字的内容对食物列表进行过滤。问题正在于此，由于每次用户输入都需要过滤，这就意味着它的过滤频率过高了。举个例子，用户要输入“汉堡”这个关键字，他需要一次输入h-a-n-g-b-a-o七个字母，由于每次输入都会触发一次过滤，所以在“汉堡”打出来之前，列表完全是一个空白的状态，同时无用的过滤也对应用的性能造成了一定的影响。怎么办呢？同样可以使用Effect来解决这个问题，修改FilterMeals中的代码如下：

```js
const [keyword, setKeyword] = useState('');

useEffect(() => {
    const timer = setTimeout(() => {
        props.onFilter(keyword);
    }, 1000);

    return () => {
        clearTimeout(timer);
    };
}, [keyword]);

const inputChangeHandler = e => {
    setKeyword(e.target.value.trim());
};
```

## 03 UseLayoutEffect

useLayoutEffect的方法签名和useEffect一样，功能也类似。不同点在于，useLayoutEffect的执行时机要早于useEffect，它会在DOM改变后调用。在老版本的React中它和useEffect的区别比较好演示，React18中，useEffect的运行方式有所变化，所以二者区别不好演示。

useLayoutEffect使用场景不多，实际开发中，在effect中需要修改元素样式，且使用useEffect会出现闪烁现象时可以使用useLayoutEffect进行替换。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/06/20220622111732278.png)

## 04 useRef

> React中所有的操作默认都是在React元素上进行，然后再通过虚拟DOM应用到真实页面上的。这样做的好处我们不在赘述。虽然如此，在React中依然为我们提供了可以直接访问原生DOM对象的方式。ref就是干这个事的。ref是reference的简写，换句话说就是用来获取真实DOM对象的引用。咱们丑话还是要说在前边，虽然可以获取到DOM对象，但是轻易不要这么做，如果必须要获取，也尽量是读取而不要修改，如果必需要修改也要尽量减少修改的次数，总之能不用就不用。

步骤：

1. 创建一个存储DOM对象的容器

   * 使用 useRef() 钩子函数

   * 钩子函数的注意事项：

     ① React中的钩子函数只能用于函数组件或自定义钩子

     ② 钩子函数只能直接在函数组件中调用

   ```js
   const divRef = useRef()
   ```

   我们要获取元素的真实DOM对象，首先我们需要使用useRef()这个钩子函数获取一个对象，这个对象就是一个容器，React会自动将DOM对象传递到容器中。

2. 将容器设置为想要获取DOM对象元素的ref属性

   ```js
   <h1 ref={xxx}>....</h1>
   // React会自动将当前元素的DOM对象，设置为容器current属性
   ```

   创建对象后，还需要在被获取引用的元素上添加一个ref属性，该属性的值就是刚刚我们所声明的变量，像是这样`ref={divRef}`这句话的意思就是将对象的引用赋值给变量divRef。这两个步骤缺一不可，都处理完了，就可以通过divRef来访问原生DOM对象了。

> React.createRef()也可以在函数组件中使用，但是useRef()在每次组件更新的时候（函数重新执行），再次执行useRef()的时候，不会创建新的REF对象，获取到的还是第一次创建的那个REF对象，可以保证性能。

举例：

```js
import React, {useRef} from 'react';
const MyComponent = () => {
    // 创建一个存储DOM对象的容器
    const divRef = useRef();
    const clickHandler = () => {
        console.log(divRef);
    };
    return (
    // 将容器设置为想要获取DOM对象元素的ref属性 react会自动把当前DOM对象设置为容器的current属性
            <div ref={divRef} onClick={clickHandler}>一个div</div>           
    );
};

export default MyComponent;
```

useRef()返回的是一个普通的JS对象，JS对象中有一个current属性，它指向的便是原生的DOM对象。所以我们直接创建一个js对象，也可以代替useRef()。

区别：

- 我们自己创建的对象，组件每次渲染时都会重新创建一个新的对象
- 而通过`useRef()`创建的对象，可以确保组件每次的重渲染获取到的都是相同的对象。

> 上例中，如果想访问div的原生DOM对象，只需通过`divRef.current`即可访问，它可以调用DOM对象的各种方法和属性，但还是要再次强调：慎用！尽量减少在React中操作原生的DOM对象，如果实在非得操作也尽量是那些不会对数据产生影响的操作，像是设置焦点、读取信息等。

## 05 UseImperativeHandle

在React中可以通过forwardRef来指定要暴露给外部组件的ref：

```js
const MyButton = forwardRef((props, ref) => {
    return <button ref={ref}>自定义按钮</button>
});
```

上例中，MyButton组件将button的ref作为组件的ref向外部暴露，其他组件在使用MyButton时，就可以通过ref属性访问：

```js
<MyButton ref={btnRef}/>
```

通过useImperativeHandle可以手动的指定ref要暴露的对象，比如可以修改MyButton组件如下：

```js
const MyButton = forwardRef((props, ref) => {

    useImperativeHandle(ref,()=> {
        return {
            name:'孙悟空'
        };
    });

    return <button>自定义按钮</button>
});
```

useImperativeHandle的第二个参数是一个函数，函数的返回值会自动赋值给ref（current属性）。

上例中，我们将返回值为`{name:'孙悟空'}`，当然返回孙悟空没有什么意义。实际开发中，我们可以将一些操作方法定义到对象中，这样可以有效的减少组件对DOM对象的直接操作。

```js
const MyButton = forwardRef((props, ref) => {
    const btnRef = useRef();

    useImperativeHandle(ref,()=> {
        return {
            setDisabled(){
                btnRef.current.disabled = true;
            }
        };
    });

    return <button ref={btnRef}>自定义按钮</button>
});

const App = () => {
    
    const btnRef = useRef();

    const clickHandler = () => {
        btnRef.current.setDisabled();
    };

    return <div>
        <MyButton ref={btnRef}/>
        <button onClick={clickHandler}>点击</button>
    </div>;
};
```

## 06 useCallback

useCallback（） 是一个钩子函数，用来创建React中的回调函数。

> = 用来缓存响应函数
>
> useCallback 创建的回调函数不会总在组件重新渲染时重新创建

useCallback()
    *       参数：
       1. 回调函数
       2. 依赖数组
          - 当依赖数组中的变量发生变化时，回调函数才会重新创建
          - 如果依赖没有没有更新，或者不指定依赖数组，则获取的一直是第一次创建的函数堆，不会创建新的函数出来
          - 一定要将回调函数中使用到的所有变量都设置到依赖数组中【除了（setState）】

```js
import React, {useCallback, useState} from 'react';
import A from "./components/A";

const App = () => {
    console.log('App渲染');
    const [count, setCount] = useState(1);

    // const clickHandler = () => {
    //     setCount(prevState => prevState + 1);
    // };

    const [num, setNum] = useState(1);

    const clickHandler = useCallback(() => {
        setCount(prevState => prevState + num);
        setNum(prevState => num + 1);
    }, [num]);

    return (
        <div>
            <h2>App -- {count}</h2>
            <button onClick={clickHandler}>增加</button>
            <A onAdd={clickHandler}/>
        </div>
    );
};

export default App;
```

useCallback使用：父组件嵌套子组件，父组件要把内部的一个函数，基于属性传递给子组件，此时因为当父组件更新的时候，传递给子组件的属性仅仅是一个函数（基本是不变的），所以不想子组件跟着更新：

- 传递给子组件的属性（函数），每一次需要的是相同的堆内存地址（一致），基于useCallback处理

- 在子组件内部做处理，验证父组件传递的属性是否发生变化，如果没有变化，则让子组件不再更新

  > 函数组件基于React.memo函数，对新老传递的属性作比较

## 07 UseMemo

> 函数组件的每一次更新，都是把函数重新执行：
>
> + 产生一个闭包
> + 内部的代码也要重新执行一遍
>
> 诉求：在函数每一次重新执行的时候，如果依赖的状态值没有发生变化，此操作逻辑不应该去执行，只有状态值发生改变，才去执行。

useMemo和useCallback十分相似，useCallback用来缓存函数对象，useMemo用来缓存函数的执行结果。

在组件中，会有一些函数具有十分的复杂的逻辑，执行速度比较慢。为了避免这些执行速度慢的函数返回执行，可以通过useMemo来缓存它们的执行结果，像是这样：

```js
const result = useMemo(()=>{
    return 复杂逻辑函数();
},[依赖项])
// 返回谁就缓存谁
```

useMemo具备“计算缓存”，useMemo中的函数会在依赖项发生变化时执行，注意！是执行，这点和useCallback不同，useCallback是创建。执行后返回执行结果，如果依赖项不发生变化，则一直会返回上次的结果，不会再执行函数。这样一来就避免复杂逻辑的重复执行。

> useMemo就是一个优化的Hook函数，如果函数组件中，有消耗性能/时间的计算操作，则尽可能用useMemo缓存起来，设置对应的依赖，可以提高组件更新的速度。

## 08 useContext

在React中组件间的数据通信是通过props进行的，父组件给子组件设置props，子组件给后代组件设置props，props在组件间自上向下（父传子）的逐层传递数据。但并不是所有的数据都适合这种传递方式，有些数据需要在多个组件中共同使用，如果还通过props一层一层传递，麻烦自不必多说。

Context为我们提供了一种在不同组件间共享数据的方式，它不再拘泥于props刻板的逐层传递，而是在外层组件中统一设置，设置后内层所有的组件都可以访问到Context中所存储的数据。换句话说，Context类似于JS中的全局作用域，可以将一些公共数据设置到一个同一个Context中，使得所有的组件都可以访问到这些数据。

Context相当于一个公共的存储空间，我们可以将多个组件中都需要访问的数据统一存储到一个Context中，这样无需通过props逐层传递，即可使组件访问到这些数据。

**创建Context：**

```js
const MyContext = React.createContext(defaultValue);
```

`React.createContext(defaultValue)`用来创建一个Context对象，它需要一个初始值作为参数，这个初始值可以是一个原始值，也可以是一个JS对象。调用以后，方法将会返回一个Context对象，这个对象非常关键，当我们想在其他组件中访问Context中的数据时，必须要通过这个对象。

由于Context对象需要在不同的组件中被使用，所以通常我们会将Context对象设置到一个单独的模块中并设置为默认导出像是这样：

```js
import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
    addItem: () => {
    },
    removeItem: () => {
    }
});

export default CartContext;
```

在这个案例中我们暴露的数据比较简单，就是一个简单的JS对象，其中包含了三个属性和一个方法，并最中将产生的Context对象作为默认模块向外部导出。

如果想访问到Context中的数据，我们需要先将Context引入到当前组件中，然后通过Context对象访问其中的数据。

**使用方式一：**

**可以通过Consumer标签来访问到Context中的数据：**

1. 引入context

2. 使用 Xxx.Consumer 组件来创建元素

```js
import React from 'react';
import TestContext from '../store/test-context';  //首先我们需要引入之前创建的Context

const MyComponent = () => {

    return (
        <TestContext.Consumer>
        // Consumer的标签体必须是一个函数，这个函数会在组件渲染时调用并且将Context中存储的数据作为参数传递进函数，该函数的返回值将会作为组件被最终渲染到页面中。
        // 这里我们将参数命名为了ctx，在回调函数中我们就可以通过ctx.xxx访问到Context中的数据。
        // 如果需要访问多个Context可以使用多个Consumer嵌套即可。
            {(ctx)=>{
                return (
                    <ul>
                        <li>{ctx.name}</li>
                        <li>{ctx.age}</li>
                        <li>{ctx.gender}</li>
                    </ul>
                );
            }}
        </TestContext.Consumer>

    );
};

export default MyComponent;
```

**使用方式二：**

1. 导入Context

2. 使用钩子函数`useContext()`获取到context

   > useContext() 需要一个Context作为参数传递给钩子函数
   >
   > 它会将Context中数据获取并作为返回值返回

```js
import React, {useContext} from 'react';
import TestContext from '../store/test-context';

const MyComponent = () => {

    const ctx = useContext(TestContext);

    return (
        <ul>
            <li>{ctx.name}</li>
            <li>{ctx.age}</li>
            <li>{ctx.gender}</li>
        </ul>
    );
};

export default MyComponent;
```

像上边那样使用Context并不十分常见，因为这种方式中Context的值是写死的，并不是在组件中指定的。

所以React还提供了Provider，用来在组件中指定Context值：

> Xxx.Provider：表示数据的生产者，可以使用它来指定Context中的数据
>
> 通过value来指定Context中存储的数据，这样一来，在该组件的所有的子组件中都可以通过Context来访问它所指定数据，当我们通过Context访问数据时，他会读取离他最近的Provider中的数据，如果没有Provider，则读取Context中的默认数据。

```js
import React from "react";
import MyComponent from "./component/MyComponent";
import TestContext from "./store/test-context";

const App = () => {
    
    return <TestContext.Provider value={{name:'猪八戒', age:28, gender:'男'}}>
        <MyComponent/>
    </TestContext.Provider>;
};

export default App;
```

Provider译为生产者，和Consumer消费者对应。

Provider会设置在外层组件中，通过value属性来指定Context的值。这个Context值在所有的Provider子组件中都可以访问。Context的搜索流程和JS中函数作用域类似，当我们获取Context时，React会在它的外层查找最近的Provider，然后返回它的Context值。如果没有找到Provider，则会返回Context模块中设置的默认值。

## 09 useReducer

### 1 useState()的不足

在React的函数组件中，我们可以通过useState()来创建state。这种创建state的方式会给我们返回两个东西state和setState()。state用来读取数据，而setState()用来设置修改数据。但是这种方式也存在着一些不足，因为所有的修改state的方式都必须通过setState()来进行，如果遇到一些复杂度比较高的state时，这种方式似乎就变得不是那么的优雅。

举个例子，之前的《汉堡到家》的练习中，`App.js`中有一个state叫做`cartData`用来存储购物车数据。但是这个数据本身是比较复杂的，它包括了多个属性：

```js
const [cartData, setCartData] = useState({
    items: [],
    totalAmount: 0,
    totalPrice: 0
});
```

同时购物车，也需要多个操作方法，像是添加食物、删除食物、清除购物车，而useState()只给我们提供了一个setCartData()方法，所以我们不得不在继续创建出三个不同的方法以实现出不同的功能：

```js
const addItem = (meal) => {
    const newCart = {...cartData};
    if (newCart.items.indexOf(meal) === -1) {
        newCart.items.push(meal);
        meal.amount = 1;
    } else {
        meal.amount += 1;
    }
    newCart.totalAmount += 1;
    newCart.totalPrice += meal.price;
    setCartData(newCart);
};

const removeItem = (meal) => {
    const newCart = {...cartData};
    meal.amount -= 1;
    if (meal.amount === 0) {
        newCart.items.splice(newCart.items.indexOf(meal), 1);
    }
    newCart.totalAmount -= 1;
    newCart.totalPrice -= meal.price;
    setCartData(newCart);
};

const clearCart = () => {
    const newCart = {...cartData};
    newCart.items.forEach(item => delete item.amount);
    newCart.items = [];
    newCart.totalAmount = 0;
    newCart.totalPrice = 0;
    setCartData(newCart);
};
```

这三个函数定义在了`App.js`中，是操作`cartData`的三个函数。就这带来一些问题，首先，三个方法都是操作cartData的，但是它们被定义在`App.js`中和其他的函数混杂在了一起，维护起来并不方便。其次，三个方法并不是`App.js`自己调用，而是通过`Context`传递给其他组件调用，由于是三个函数所以我们不得不在`Context`中分别传递三个属性，也不方便。再有，如果后期我需要再添加新的功能，依然不可避免的要定义新的函数，并且修改`Context`。总之，就是各种不便利，这种不便还会随着项目复杂的提升而增加。

### 2 useReducer()横空出世

为了解决复杂`State`带来的不便，`React`为我们提供了一个新的使用`State`的方式。`Reducer`横空出世，reduce单词中文意味减少，而reducer我觉得可以翻译为“当你的state的过于复杂时，你就可以使用的可以对state进行整合的工具”。当然这是个玩笑话，个人认为`Reducer`可以翻译为“整合器”，它的作用就是将那些和同一个`state`相关的所有函数都整合到一起，方便在组件中进行调用。当然工具都有其使用场景，`Reducer`也不例外，它只适用于那些比较复杂的`state`，对于简单的`state`使用`Reducer`只能是徒增烦恼。但是由于初学，我们会先用一个简单的案例来对其进行演示，实际应用我们后边会以`cartData`作为演示。

 useReducer是对useState的升级处理：

- 普通需求处理的时候，基本都是useState直接处理，不会使用useReducer

- 但是如果一个组件的逻辑很复杂，需要大量的状态/大量修改状态的逻辑，此时使用useReducer管理这些状态会更好一些

  @1 不需要再基于useState一个个的去创建状态了

  @2 有状态修改的逻辑，全部统一化处理了

语法：

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

它的返回值和`useState()`类似，第一个参数是`state`用来读取`state`的值，第二个参数同样是一个函数，不同于`setState()`这个函数我们可以称它是一个“派发器”，通过它可以向`reducer()`发送不同的指令，控制`reducer()`做不同的操作。

它的参数有三个，第三个我们暂且忽略，只看前两个。`reducer()`是一个函数，也是我们所谓的“整合器”。它的返回值会成为新的`state`值。当我们调用`dispatch()`时，`dispatch()`会将消息发送给`reducer()`，`reducer()`可以根据不同的消息对`state`进行不同的处理。`initialArg`就是`state`的初始值，和`useState()`参数一样。

参数：

- reducer : 整合函数

  对于我们当前state的所有操作都应该在该函数中定义，该函数的返回值，会成为state的新值

  reducer在执行时，会收到两个参数：

  - state 当前最新的state
  - action 它需要一个对象，在对象中会存储dispatch所发送的指令

- initialArg : state的初始值，作用和useState()中的值是一样，返回值是一个数组：

  - 第一个参数，state 用来获取state的值

  - 第二个参数，state 修改的派发器

    > 通过派发器可以发送操作state的命令，具体的修改行为将会由另外一个函数(reducer)执行

上代码：

```js
import {useReducer, useState} from 'react';
// 为了避免重复写 通常reducer会定义到组件外面
// 可以根据action中不同type来执行不同的操作
const reducer = (state, action) => {
    switch(action.type){
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
    }
};

function App() {
    const [count, countDispath] = useReducer(reducer,1);

    return (
        <div className="App">
            {count}
            <div>
                <button onClick={()=>countDispath({type:'sub'})}>-</button>
                <button onClick={()=>countDispath({type:'add'})}>+</button>
            </div>
        </div>
    );
}

export default App;
```

### 3 使用useReducer修改练习

```js
// 修改`App.js`
...略...
const cartReducer = (state, action) => {
    const newCart = {...state};
    switch (action.type){
        case 'ADD_ITEM':
            if (newCart.items.indexOf(action.meal) === -1) {
                newCart.items.push(action.meal);
                action.meal.amount = 1;
            } else {
                action.meal.amount += 1;
            }
            newCart.totalAmount += 1;
            newCart.totalPrice += action.meal.price;
            return newCart;
        case 'REMOVE_ITEM':
            action.meal.amount -= 1;
            if (action.meal.amount === 0) {
                newCart.items.splice(newCart.items.indexOf(action.meal), 1);
            }
            newCart.totalAmount -= 1;
            newCart.totalPrice -= action.meal.price;
            return newCart;
        case 'CLEAR_CART':
            newCart.items.forEach(item => delete item.amount);
            newCart.items = [];
            newCart.totalAmount = 0;
            newCart.totalPrice = 0;
            return newCart;
        default:
            return state;
    }
};

const App = () => {

    ...略...

    const [cartData, cartDispatch] = useReducer(cartReducer, {
        items: [],
        totalAmount: 0,
        totalPrice: 0
    });

    ...略...

    return (
        <CartContext.Provider value={{...cartData, cartDispatch}}>
            <div>
                <FilterMeals onFilter={filterHandler}/>
                <Meals
                    mealsData={mealsData}
                />
                <Cart/>

            </div>
        </CartContext.Provider>
    );
};

export default App;
```

在其他组件中，需要操作购物车时，只需先获取`CartContext`然后通过`ctx.cartDispath`操作购物车：

```js
const ctx = useContext(CartContext); // 加载context
ctx.cartDispatch({type:'CLEAR_CART'}); // 清空购物车
ctx.cartDispatch({type:'ADD_ITEM', meal:props.meal}); // 添加食物
ctx.cartDispatch({type:'REMOVE_ITEM', meal:props.meal}); // 删除食物
```

## 10 UseDebugValue

用来给自定义钩子设置标签，标签会在React开发工具中显示，用来调试自定义钩子，不常用。

```js
import {useDebugValue, useEffect} from "react";

const useMyHook = () => {

    useDebugValue('哈哈');

    useEffect(()=>{
        console.log('自定义钩子的代码');
    });

};

export default useMyHook;
```

## 11 UseDeferredValue

useDeferredValue用来设置一个延迟的state，比如我们创建一个state，并使用useDeferredValue获取延迟值：

```js
const [queryStr, setQueryStr] = useState('');
const deferredQueryStr = useDeferredValue(queryStr);
```

上边的代码中queryStr就是一个常规的state，deferredQueryStr就是queryStr的延迟值。设置延迟值后每次调用setState后都会触发两次组件的重新渲染。第一次时，deferredQueryStr的值是queryStr修改前的值，第二次才是修改后的值。换句话，延迟值相较于state来说总会慢一步更新。

延迟值可以用在这样一个场景，一个state需要在多个组件中使用。一个组件的渲染比较快，而另一个组件的渲染比较慢。这样我们可以为该state创建一个延迟值，渲染快的组件使用正常的state优先显示。渲染慢的组件使用延迟值，慢一步渲染。当然必须结合React.memo或useMemo才能真正的发挥出它的作用。

```js
const App = () => {

    const [count, setCount] = useState(1);

    // useDeferredValue 需要一个state的作为参数，会为该state创建一个延迟值
    // 当设置了延迟值后，每次state修改时都会触发两次重新的渲染
    // 这两次执行对于其他的部分没有区别，但是延迟值两次执行的值是不同的
    // 第一次执行时 延迟值是state的旧值， 第二次执行时，延迟值是state的新值
    // 延迟值，总是会比原版的state，慢一步更新
    const deferredCount = useDeferredValue(count);
    // console.log(count, deferredCount);

    const [filterWord, setFilterWord] = useState('');
    const deferredFilterWord = useDeferredValue(filterWord);

    const changeHandler = (e) => {
        setFilterWord(e.target.value);
    };

    return (
        <div>
            <h1>App</h1>
            <h3>{count}</h3>
            <button onClick={()=>setCount(prevState => prevState + 1)}>点我</button>
            <hr/>

            {/*
                当我们多个组件使用同一个state时，
                    组件有可能会互相影响
                    一个组件卡顿，会导致所有组件都卡
                    此时就可以使用延迟值
            */}
            <input
                onChange={changeHandler}
                value={filterWord}
                type="text"/>

            <StudentList filterWord={deferredFilterWord}/>

        </div>


    );
};
```

## 12 UseTransition

当我们在组件中修改state时，会遇到复杂一些的state，当修改这些state时，甚至会阻塞到整个应用的运行，为了降低这种state的影响，React为我们提供了useTransition，通过useTransition可以降低setState的优先级。

useTransition会返回一个数组，数组中有两个元素，第一个元素是isPending，它是一个变量用来记录transition是否在执行中。第二个元素是startTransition，它是一个函数，可以将setState在其回调函数中调用，这样setState方法会被标记为transition并不会立即执行，而是在其他优先级更高的方法执行完毕，才会执行。

除了useTransition外，React还直接为为我们提供了一个startTransition函数，在不需要使用isPending时，可以直接使用startTransition也可以达到相同的效果。

## 13 UseId

生成唯一id，使用于需要唯一id的场景，但不适用于列表的key。

```js
import React, {
    useDeferredValue,
    useEffect, useId,
    useInsertionEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState, useTransition
} from 'react';
import Some from "./components/Some";
import useMyHook from "./hooks/useMyHook";
import StudentList from "./components/StudentList";

function sum(a, b){
    const begin = Date.now();

    while (1){
        if(Date.now() - begin > 3000){
            break;
        }
    }

    console.log('函数执行了');
    return a + b;
}

const App = () => {

    const [count, setCount] = useState(1);
    const [filterWord, setFilterWord] = useState('');
    const [filterWord2, setFilterWord2] = useState('');

    const id = useId();
    const [isPending, startTransition] = useTransition();
    // const deferredFilterWord = useDeferredValue(filterWord);
    const changeHandler = (e) => {
        setFilterWord(e.target.value);

        // startTransition 的回调函数中设置setState会其他的setState生效后才执行
        startTransition(()=>{
            setFilterWord2(e.target.value);
        });
    };

    return (
        <div>
            <h1>App</h1>
            <h3>{count}</h3>
            <button onClick={()=>setCount(prevState => prevState + 1)}>点我</button>
            <hr/>


            <label htmlFor={"keyword-"+id}>关键词</label>
            <input
                id={"keyword-"+id}
                onChange={changeHandler}
                value={filterWord}
                type="text"/>

            {!isPending && <StudentList filterWord={filterWord2}/>}

        </div>

    );
};

export default App;
```

## 14 自定义钩子函数

随着练习功能的增多，我们编写的React代码变得越来越复杂。像是上节课中我编写的React代码，仅仅是增加了一个加载数据的功能，我们就需要向`App.js`中引入了三个state和一个钩子函数，随着这种代码的增多`App.js`中的代码会变得越来越多，难以维护。所以我们就迫切的需要一个东西可以将这些代码存储起来，一来可以降低单个文件中的代码数量，二来也可以让这些代码方便在多个组件中复用。但是问题就来了，这些代码无论是state还是effect其实都是钩子函数，但是钩子函数又不是说随便在哪都能写的，这要怎么处理呢？

我们在刚刚介绍钩子函数时就说过，钩子函数只能运行在函数组件或自定义钩子中，所以要提取这些代码我们只有一个选择，那就是自定义钩子。自定义钩子是个什么玩意？它其实一点也不神秘，自定钩子就是一个普通的函数。普通函数怎么定义，它就怎么定义。但是它又不那么普通，因为钩子函数的名字必须以use开头，使用use开头后，React就能自动识别出它是一个钩子函数，这样才会以钩子函数的方式去处理它。

**自定义钩子作用：**提取封装一些公共的处理逻辑。

**使用钩子**

1. 创建一个函数，命名为useXxx
2. 在函数中正常调用React中的各种钩子
3. 在组件中引用钩子

这个步骤看着是不是特别草率，但事实其实就这么一回事。当函数使用use开头后，React就允许我们在其中调用React的钩子函数，所以我们就可以通过自定义的钩子函数，将组件中的涉及到钩子的代码封装起来，方便调用。

**例学生列表**

src/hooks/useFetch.js

```js
/*
*   React中的钩子函数只能在函数组件或自定钩子中调用，当我们需要将React中钩子函数提取到一个公共区域时，就可以使用自定义钩子
*   自定义钩子其实就是一个普通函数，只是它的名字需要使用use开头
* */
import {useCallback, useState} from "react";

// reqObj 用来存储请求的参数
/*
*   {
*       url 请求的地址
*       method 请求方法
*
*   }
*
* cb 回调函数，请求发送成功后执行
* */
export default function useFetch(reqObj, cb) {
    const [data, setData] = useState([]);
    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);
    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    //body不能在调用useFetch时传 useFetch一加载就调用 收不到最新的数据 所以要在调用时候传
    const fetchData = useCallback(async (body) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/'+reqObj.url, {
                method:reqObj.method || 'get',
                headers:{
                    "Content-type":"application/json"
                },
                body:body?JSON.stringify({data:body}):null,

            });
            //判断请求是否加载成功
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
                cb && cb();
            } else {
                throw new Error('数据加载失败！');
            }
        } catch (e) {
            console.log(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);


    // 设置返回值
    return {
        loading,
        error,
        data,
        fetchData
    };
}
```

App.js调用钩子

```js
const App = () => {
    const {data:stuData, loading, error, fetchData} = useFetch();
// data:stuData 重命名
    useEffect(() => {
        fetchData();
    }, []);

    const loadDataHandler = () => {
        fetchData();
    };

    return (
        <StuContext.Provider value={{fetchData}}>
            <div className="app">
                <button onClick={loadDataHandler}>加载数据</button>
                {(!loading && !error) && <StudentList stus={stuData}/>}
                {loading && <p>数据正在加载中...</p>}
                {error && <p>数据加载异常！</p>}
            </div>
        </StuContext.Provider>

    );
};

export default App;
```

这样一来，将App.js中发送请求相关的钩子都编写到useFetch中，并将App中会用到的变量作为返回值返回，而作为App来说，只需要调用useFetch，即可获取到stuData、loading、error等数据以及fetchData函数，这样一来大大简化了App中的代码，同时使得其他组件也可以通过useFetch来发送请求加载数据。

等等，好像还有个问题，我们将请求地址在useFetch中写死了，难道我们只向一个地址发请求吗？这样做不合适吧？当然不合适，我们可以将钩子中那些会发生的变化的值作为参数传递，比如请求地址，如此一来我们就可以向任意地址发送请求啦！

Student.js调用钩子

```js
import React, {useCallback, useContext, useState} from 'react';
import StuContext from "../store/StuContext";
import StudentForm from "./StudentForm";
import useFetch from "../hooks/useFetch";

const Student = (props) => {
    // {stu:{name, age, gender, address}} = props
    // props {stu:{id:xxx, attributes:{name:xxx, age:xxx}}}
    // {stu:{id, attributes:{name, age, gender, address}}}
    const [isEdit, setIsEdit] = useState(false);

    const ctx = useContext(StuContext);

    const {loading, error, fetchData:delStu} = useFetch({
        url:`students/${props.stu.id}`,
        method:'delete'
    }, ctx.fetchData);

    const deleteHandler = () => {
        // 删除学生
        // http://localhost:1337/api/students/4
        // props.stu.id
        delStu();

    };

    const cancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <>
            {!isEdit &&
                <tr>
                    <td>{props.stu.attributes.name}</td>
                    <td>{props.stu.attributes.gender}</td>
                    <td>{props.stu.attributes.age}</td>
                    <td>{props.stu.attributes.address}</td>
                    <td>
                        <button onClick={deleteHandler}>删除</button>
                        <button onClick={() => setIsEdit(true)}>修改</button>

                    </td>
                </tr>
            }

            {isEdit && <StudentForm stu={props.stu} onCancel={cancelEdit}/>}

            {loading && <tr>
                <td colSpan={5}>正在删除数据...</td>
            </tr>}
            {error && <tr>
                <td colSpan={5}>删除失败...</td>
            </tr>}
        </>

    );
};

export default Student;
```

studentForm.js调用钩子

```js
import React, {useCallback, useContext, useState} from 'react';
import './StudentForm.css';
import StuContext from "../store/StuContext";
import useFetch from "../hooks/useFetch";

const StudentForm = (props) => {
    const [inputData, setInputData] = useState({
        name: props.stu ? props.stu.attributes.name : '',
        age: props.stu ? props.stu.attributes.age : '',
        gender: props.stu ? props.stu.attributes.gender : '男',
        address: props.stu ? props.stu.attributes.address : ''
    });

   const ctx = useContext(StuContext);
   // 添加&修改
   const {loading, error, fetchData:updateStudent} = useFetch({
       url:props.stu?`students/${props.stu.id}`:'students',
       method:props.stu?'put':'post',
   }, ctx.fetchData);

    const nameChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, name: e.target.value}));
    };

    const ageChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, age: +e.target.value}));
    };

    const genderChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, gender: e.target.value}));
    };

    const addressChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, address: e.target.value}));
    };

    const submitHandler = () => {
        //console.log(inputData);
        updateStudent(inputData);
    };

    const updateHandler = () => {
        updateStudent(inputData);
    };


    return (
        <>
            <tr className="student-form">
                <td><input
                    onChange={nameChangeHandler}
                    value={inputData.name}
                    type="text"/></td>
                <td>
                    <select
                        onChange={genderChangeHandler}
                        value={inputData.gender}
                    >
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </td>
                <td><input
                    onChange={ageChangeHandler}
                    value={inputData.age}
                    type="text"/></td>
                <td><input
                    onChange={addressChangeHandler}
                    value={inputData.address}
                    type="text"/></td>
                <td>

                    {props.stu && <>
                        <button onClick={()=>props.onCancel()}>取消</button>
                        <button onClick={updateHandler}>确认</button>
                    </>}
                    {!props.stu &&
                        <button
                            onClick={submitHandler}
                        >添加
                        </button>
                    }

                </td>
            </tr>
            {loading && <tr>
                <td colSpan={5}>添加中...</td>
            </tr>}
            {error && <tr>
                <td colSpan={5}>添加失败</td>
            </tr>}
        </>

    );
};

export default StudentForm;
```

# d6 样式

在vue开发中，基于`scoped`为组件设置样式私有化。

```css
<style lang="less" scoped>
.banner-box {
  box-sizing: border-box;
  height: 375px;
  background: #eee;
  overflow: hidden;
}
:deep(.van-swipe__indicators) {
    left: auto;
    right: 20px;
    transform: none;
}
</style>
```

但是react项目中并没有类似于这样的机制，如果我们想保证“团队协作开发”中，各组件间的样式不冲突，我们则需要基于特定的方案进行处理。

## 01 内联样式

在React中可以直接通过标签的style属性来为元素设置样式。style属性需要的是一个对象作为值，来为元素设置样式。

```js
<div style={{color:'red'}}>
    我是Div
</div>
```

传递样式时，需要注意如果样式名不符合驼峰命名法，需要将其修改为符合驼峰命名法的名字。比如：background-color改为backgroundColor。

如果内联样式编写过多，会导致JSX变得异常混乱，此时也可以将样式对象定义到JSX外，然后通过变量引入。

样式过多，JSX会比较混乱：

```js
const StyleDemo = () => {
    return (
        <div style={{color:'red', backgroundColor:'#bfa', fontSize:20, borderRadius:12}}>
            我是Div
        </div>
    );
};

export default StyleDemo;
```

可以这样修改：

```js
import React from 'react';

const StyleDemo = () => {
    const divStyle = {color: 'red', backgroundColor: '#bfa', fontSize: 20, borderRadius: 12}

    return (
        <div style={divStyle}>
            我是Div
        </div>
    );
};
export default StyleDemo;
```

相比第一段代码来说，第二段代码中JSX结构更加简洁。

**在内联样式中使用State**

设置样式时，可以根据不同的state值应用不同的样式，比如我们可以在组件中添加一个按钮，并希望通过点击按钮可以切换div的边框，代码可以这样写：

```js
import React, {useState} from 'react';

const StyleDemo = () => {

    const [showBorder, setShowBorder] = useState(false);

    const divStyle = {
        color: 'red',
        backgroundColor: '#bfa',
        fontSize: 20,
        borderRadius: 12,
        border: showBorder?'2px red solid':'none'
    };

    const toggleBorderHandler = ()=> {
      setShowBorder(prevState => !prevState);
    };

    return (
        <div style={divStyle}>
            我是Div
            <button onClick={toggleBorderHandler}>切换边框</button>
        </div>
    );
};

export default StyleDemo;
```

上例中添加一个新的state，命名为showBorder，代码是这样的`const [showBorder, setShowBorder] = useState(false);`当该值为true时，我们希望div可以显示一条2像素的红色边框，当为false时，我们希望div没有边框。默认值为false。

divStyle的最后一个属性是这样设置的`border: showBorder?'2px red solid':'none'`，这里我们根据showBorder的值来设置border样式的值，如果值为true，则设置边框，否则边框设置为none。

`toggleBorderHandler` 是负责修改showBorder的响应函数，当我们点击按钮后函数会对showBorder进行取反，这样我们的样式就可以根据state的不同值而呈现出不同的效果了。

内联样式的优点：

- **使用简单：** 简单的以组件为中心来实现样式的添加
- **扩展方便：** 通过使用对象进行样式设置，可以方便的扩展对象来扩展样式
- **避免冲突：** 最终都编译为元素的行内样式，不存在样式冲突的问题

在大型项目中，内联样式可能并不是一个很好的选择，因为内联样式还是有局限性的：

- **不能使用伪类：** 这意味着 :hover、:focus、:actived、:visited 等都将无法使用
- **不能使用媒体查询：** 媒体查询相关的属性不能使用
- **减低代码可读性：** 如果使用很多的样式，代码的可读性将大大降低
- **没有代码提示：** 当使用对象来定义样式时，是没有代码提示的

## 02 外部样式表

外部样式是将样式编写到外部的css文件中，然后直接通过import进行引入，上述案例修改为外部样式表是这个样子：

StyleDemo.css

```css
.myDiv{
    color: red;
    background-color: #bfa;
    font-size: 20px;
    border-radius: 12px;
}

.redBorder{
    border: 2px red solid;
}
```

StyleDemo.js

```js
import React, {useState} from 'react';
import './StyleDemo.css';

const StyleDemo = () => {

    const [showBorder, setShowBorder] = useState(false);

    const toggleBorderHandler = ()=> {
      setShowBorder(prevState => !prevState);
    };

    return (
        <div className={`myDiv${showBorder?' redBorder':''}`}>
            我是Div
            <button onClick={toggleBorderHandler}>切换边框</button>
        </div>
    );
};

export default StyleDemo;
```

上边的案例中，将样式编写到了外部的css文件中，然后通过import引入到了当前模块中。在JSX中通过为元素添加了class使得样式生效。同时，在设置class时使用了模板字符串，根据showBorder的值判断是否添加redBorder这个类。

上边两个案例中无论是内联样式还是外部样式表最终的实现效果都是一样的，但要是让我从这两种方式中选的话我更加倾向于选择第二种，第二种方式中将JSX和CSS分别写到了不同的文件中，我们维护起来更加的方便。

但是以这种方式使用样式也会存在一个问题，直接通过import引入的样式都是全局样式，如果不同的样式表中出现了相同的类名，会出现相互覆盖情况，这一点要尤为注意！

> 注意：
>
> 1. CSS就是标准的CSS语法，各种选择器、样式、媒体查询之类正常写即可。
> 2. 尽量将js文件和css文件的文件名设置为相同的文件名。
> 3. 引入样式时直接import，无需指定名字，且引入样式必须以./或../开头。
> 4. 这种形式引入的样式是全局样式，有可能会被其他样式覆盖。

CSS样式表的优点：

- **结构样式分离：** 实现了样式和JavaScript的分离
- **使用CSS所有功能：** 此方法允许我们使用CSS的任何语法，包括伪类、媒体查询等
- **使用缓存：** 可对样式文件进行强缓存或协商缓存
- **易编写**：CSS样式表在书写时会有代码提示

当然，CSS样式表也是有缺点的：

- **产生冲突：** CSS选择器都具有相同的全局作用域，很容易造成样式冲突
- **性能低：** 预编译语言的嵌套，可能带来的就是超长的`选择器前缀`，性能低！
- **没有真正的动态样式：** 在CSS表中难以实现动态设置样式

## 03 CSS Module

如果没有类名冲突的问题，外部CSS样式表不失为是一种非常好的编写样式的方式。为了解决这个问题React中还为我们提供了一中方式，CSS Module。

我们可以将CSS Module理解为外部样式表的一种进化版，它的大部分使用方式都和外部样式表类似，不同点在于使用CSS Module后，网页中元素的类名会自动计算生成并确保唯一，所以使用CSS Module后，我们再也不用担心类名重复了！

CSS Module在React中已经默认支持了（前提是使用了react-scripts），所以无需再引入其他多余的模块。

使用CSS Module时需要遵循如下几个步骤：

1. 使用CSS Module编写的样式文件的文件名必须为`xxx.module.css`

   ```css
   /*
   StyleDemo.module.css
   */
   
   .myDiv {
       color: red;
       background-color: #bfa;
       font-size: 20px;
       border-radius: 12px;
   }
   ```

2. 在组件中引入样式的格式为`import xxx from './xxx.module.css'`

3. 设置类名时需要使用`xxx.yyy`的形式来设置

   ```js
   /*
   StyleDemo.js
   */
   import styles from './StyleDemo.module.css';
   const StyleDemo = () => {
       return (
           <div className={styles.myDiv}>
               我是Div
           </div>
       );
   };
   
   export default StyleDemo;
   ```

这就是一个简单的CSS Module的案例，设置完成后你可以自己通过开发者工具查看元素的class属性，你会发现class属性和你设置的并不完全一样，这是因为CSS Module通过算法确保了每一个模块中类名的唯一性。

总之，相较于标准的外部样式表来说，CSS Module就是多了一点——确保类名的唯一，通过内部算法避免了两个组件中出现重复的类名，如果你能保证不会出现重复的类名，其实直接使用外部样式表也是一样的。

## 04 React-JSS

JSS是一个CSS创作工具，它允许我们使用JavaScript以生命式、无冲突和可重用的方式来描述样式。JSS 是一种新的样式策略！ React-JSS 是一个框架集成，可以在 React 应用程序中使用 JSS。它是一个单独的包，所以不需要安装 JSS 核心，只需要 React-JSS 包即可。React-JSS 使用新的 Hooks API 将 JSS 与 React 结合使用。 

```javascript
import React from 'react';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
    personal: {
        width: '300px',
        height: '200px',
        // 基于 & 实现样式嵌套
        '& span': {
            color: 'green'
        }
    },
    title: {
        // 使用动态值
        color: props => props.color,
        fontSize: '16px'
    },
    // 使用动态值
    subTitle: props => {
        return {
            color: props.color,
            fontSize: '14px'
        };
    }
});
const Demo = function Demo(props) {
    const { personal, title, subTitle } = useStyles(props);
    return <div className={personal}>
        <h1 className={title}>珠峰培训</h1>
        <h2 className={subTitle}>珠峰培训</h2>
        <span>珠峰培训</span>
    </div>;
};
export default Demo;
```

编译后的效果：

```js
// html结构 
<div class="personal-0-2-16">
    <h1 class="title-0-2-17 title-d0-0-2-19">珠峰培训</h1>
    <h2 class="subTitle-0-2-18 subTitle-d1-0-2-20">珠峰培训</h2>
    <span>珠峰培训</span>
</div>

// css样式
.personal-0-2-16{
    width: 300px;
    height: 200px;
}
.title-d0-0-2-19{
    color: red;
}
.title-0-2-17{
    font-size: 16px;
}
.personal-0-2-16 span{
    color: green;
}
```

但是从 react-jss 第10版本之后，不支持在类组件中使用，只能用于函数组件中！

## 05 styled-components

目前在React中，还流行 CSS-IN-JS 的模式：也就是把CSS像JS一样进行编写；

其中比较常用的插件就是 `styled-components`！

> $ yarn add styled-components
> https://styled-components.com/docs/basics#getting-started

**创建一个样式的js文件，例如：style.js**

想要有语法提示，可以安装vscode插件：vscode-styled-components

```javascript
import styled from "styled-components";

// 创建公共的样式变量
const colorBlue = "#1677ff",
    colorRed = "#ff4d4f";

// 基础用法
export const VoteBox = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    width: 300px;

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #DDD;

        .title {
            font-size: 18px;
            line-height: 50px;
        }

        .num {
            font-size: 18px;
            color: ${colorRed};
        }
    }

    .ant-btn {
        margin-right: 15px;
    }
`;

// 使用传递的属性，动态设置样式  &&  给属性设置默认值！！
export const VoteMain = styled.div.attrs(props => {
    return {
        color: props.color || colorBlue
    }
})`
    padding: 15px 0;

    p {
        line-height: 35px;
        color:${props => props.color};
        font-size: ${props => props.size}px;
    }
`;
```

**组件中使用**

```javascript
import { VoteBox, VoteMain } from './style';

const Demo = function Demo() {
    return <VoteBox>
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">0</span>
        </div>
        <VoteMain size={16}>
            <p>支持人数：0人</p>
            <p>反对人数：0人</p>
            <p>支持比率：--</p>
        </VoteMain>
        <div className="footer">
            <Button type="primary">支持</Button>
            <Button type="primary" danger>反对</Button>
        </div>
    </VoteBox>
};

export default Demo;
```

## 0 引入FontAwesome

安装依赖：

```
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/react-fontawesome@latest
```

引入组件：

```
 import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
```

引入图标：

```
import {faPlus} from "@fortawesome/free-solid-svg-icons";
```

使用组件：

```
<FontAwesomeIcon icon={faPlus}/>
```

## 0 UI组件库

Vue：

- PC端：element-ui、antd for vue、iview

- 移动端：vant、cube

React：

- 移动端：antdmobile

- PC端：ant.design、antd pro 分析页 （--- 管理系统）


### Ant Design

```
yarn add antd
```

按钮、分割线、栅格、锚点、面包屑导航、下拉菜单、导航菜单、自动完成、日期选择框、Form表单、上传、徽标数、Table表格、...

按钮（Button）：type（按钮类型 primary）、block（和父盒子一样宽）、danger（红色）、disabled（无效）、href、...

标签（Tag）：color、...

表格（Table）：dataSource={}、columns={}、loading={}、pagination={false}【分页器】、rowKey=“id”【循环创建每一行时指定的唯一值】、

> columns：dataIndex（想把数据中的那一个字段值放在此列渲染）、render（进行更复杂的渲染）、width（百分比）、...

Modal对话框：title=""、open={modalVisible}、confirmLoading={confirmLoading}【控制确定按钮的Loading状态：提交的防抖处理】、onCancel={this.closeModal}【单独设置关闭对话框方法】、...

Form表单：<From.Item label=""><Input.TextArea rows={4}><Input.TextArea /> <From.Item/>、

​					<From.Item><DatePicker showTime /> <From.Item/>、...

不借助Form表单组件自带的操作功能，完全自己手动实现表单操作，需要：

- 准备状态
- 检测视图的变化，去修改状态
- 提交信息

> 向服务器发送数据请求——失败：
> + 请求失败：向服务器发送请求，服务器没有响应对应的信息，HTTP状态码不是2开始的，或者压根就没有返回任何的信息
>
> + 服务器返回信息了，状态码也是200，但是返回的内容不是我们想要的
>
> （网络层失败 && 业务层失败）

修改UI组件库中的样式：

- 找到选然后的内容，观察它的样式类和相关样式
- 按照样式类去修改样式，只要保证我们自己写的样式权重高即可（基于!important）

# d7 React 复合组件通信方案

大前端时代下，项目开发中，基本都采用 “工程化” + “组件化”！

**工程化**：基于gulp、webpack、vite、rollup等，实现代码转换、文件优化、代码分割、模块合并、自动刷新、代码校验、自动发布等！

**组件化**

- 普通业务组件：SPA单页面应用、业务拆分等
- 通用业务组件：具备复用性的业务模块
- 通用功能组件：UI组件库中的组件
  ……

而组件化开发中，必然会涉及 “父子组件、祖先和后代组件、平行组件、兄弟组件” 等，这就是所谓的 “复合组件”！我们今天要研究的话题就是：复合组件之间的通信(或数据传输)问题！！

## 01 基于props属性，实现父子(或兄弟)组件间的通信

`Vote.jsx`  父组件具备：

​			supNum/oppNum状态 

​			change 修改状态的方法

① 基于属性把supNum/oppNum传递给子组件

② 基于属性把change方法传递给子组件

③ 子组件在按钮点击时，把传递的change方法执行，这样就可以修改父组件中的状态

### 类组件

`Vote.jsx`

```javascript
import React from 'react';
...
class Vote extends React.Component {
    // 设置初始状态
    state = {
        supNum: 10,
        oppNum: 5
    };
    // 修改状态的方法
    change = type => {
        let { supNum, oppNum } = this.state;
        if (type === 'sup') {
            this.setState({ supNum: supNum + 1 });
            return;
        }
        this.setState({ oppNum: oppNum + 1 });
    };
    render() {
        let { supNum, oppNum } = this.state;
        return <div className="vote-box">
            <header className="header">
                <h2 className="title">React真的很不错!!</h2>
                <span className="num">{supNum + oppNum}人</span>
            </header>
            <VoteMain supNum={supNum} oppNum={oppNum} />
            <VoteFooter change={this.change} />
        </div>;
    }
};
export default Vote;
```

`VoteMain.jsx`

```js
import React from 'react';
import PropTypes from 'prop-types';
class VoteMain extends React.PureComponent {
    // 初始化属性 & 规则校验
    static defaultProps = {
        supNum: 0,
        oppNum: 0
    };
    static propTypes = {
        supNum: PropTypes.number,
        oppNum: PropTypes.number
    };
    render() {
        let { supNum, oppNum } = this.props;
        let total = supNum + oppNum,
            ratio = '--';
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%';
        return <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
            <p>支持比率：{ratio}</p>
        </div>;
    }
};
export default VoteMain;

```

`VoteFooter.jsx`

```JS
import React from 'react';
import PropTypes from 'prop-types';
class VoteFooter extends React.PureComponent {
    // 初始化属性 & 规则校验
    static propTypes = {
        change: PropTypes.func.isRequired
    };
    render() {
        let { change } = this.props;
        return <div className="footer">
            <button onClick={change.bind(null, 'sup')}>支持</button>
            <button onClick={change.bind(null, 'opp')}>反对</button>
        </div>;
    }
};
export default VoteFooter;
```

### 函数组件

`Vote.jsx`

```javascript
import React, { useState, useCallback } from 'react';
...
const Vote = function Vote() {
    // 定义状态
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);
    // 定义修改状态的函数
    const change = useCallback(type => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    }, [supNum, oppNum]);
    return <div className="vote-box">
        <header className="header">
            <h2 className="title">React真的很不错!!</h2>
            <span className="num">{supNum + oppNum}人</span>
        </header>
        <VoteMain supNum={supNum} oppNum={oppNum} />
        <VoteFooter change={change} />
    </div>;
};
export default Vote;
```

`VoteMain.jsx`

```js
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
const VoteMain = function VoteMain(props) {
    // 获取传递的属性值
    let { supNum, oppNum } = props;
    // 计算/缓存支持比率
    let ratio = useMemo(() => {
        let total = supNum + oppNum;
        return total > 0 ? (supNum / total * 100).toFixed(2) + '%' : '--';
    }, [supNum, oppNum]);
    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
        <p>支持比率：{ratio}</p>
    </div>;
};
// 初始化属性 & 规则校验
VoteMain.defaultProps = {
    supNum: 0,
    oppNum: 0
};
VoteMain.propTypes = {
    supNum: PropTypes.number,
    oppNum: PropTypes.number
};
export default VoteMain;
```

`VoteFooter.jsx`

```JS
import React, { memo } from 'react';
import PropTypes from 'prop-types';
const VoteFooter = function VoteFooter(props) {
    let { change } = props;
    return <div className="footer">
        <button onClick={change.bind(null, 'sup')}>支持</button>
        <button onClick={change.bind(null, 'opp')}>反对</button>
    </div>;
};
// 初始化属性 & 规则校验
VoteFooter.propTypes = {
    change: PropTypes.func.isRequired
};
export default memo(VoteFooter);
```

**单向数据流**

理解一：属性的传递方向是单向的

- 父组件可基于属性把信息传给子组件
- 子组件无法基于属性给父组件传信息；但可以把父组件传递的方法执行，从而实现子改父！

理解二：关于生命周期函数的延续

- 组件第一次渲染
  - 父 willMount -> 父 render
  - 子 willMount -> 子 render -> 子 didMount
  - 父 didMount
- 组件更新
  - 父 shouldUpdate -> 父 willUpdate -> 父 render
  - 子 willReciveProps -> 子 shouldUpdate -> 子 willUpdate -> 子 render -> 子 didUpdate
  - 父 didUpdate

## 02 基于context上下文，实现祖先/后代(或平行)组件间的通信

`Vote.jsx`  祖先组件具备：

​			supNum/oppNum状态 

​			change 方法

① 存放到上下文中，供后代组件使用，组件状态更改，上下文中也会同步最新的信息

② 后台组件中如果需要使用，则直接去上下文中获取即可

③ 点击按钮执行change方法，修改组件中的状态信息，同时最新的状态信息也会同步到上下文中

`ThemeContext.js`

```js
// 创建上下文对象
import { createContext } from 'react';
const ThemeContext = createContext();
export default ThemeContext;
```

### 类组件

`Vote.jsx`

```javascript
import React from 'react';
...
import ThemeContext from '@/ThemeContext';
class Vote extends React.Component {
    // 设置初始状态
    state = {
        supNum: 10,
        oppNum: 5
    };
    // 修改状态的方法
    change = type => {
        let { supNum, oppNum } = this.state;
        if (type === 'sup') {
            this.setState({ supNum: supNum + 1 });
            return;
        }
        this.setState({ oppNum: oppNum + 1 });
    };
    render() {
        let { supNum, oppNum } = this.state;
        return <ThemeContext.Provider
            value={{
                supNum,
                oppNum,
                change: this.change
            }}>
            <div className="vote-box">
                <header className="header">
                    <h2 className="title">React真的很不错!!</h2>
                    <span className="num">{supNum + oppNum}人</span>
                </header>
                <VoteMain />
                <VoteFooter />
            </div>
        </ThemeContext.Provider>;
    }
};
export default Vote;
```

`VoteMain.jsx`

```javascript
import React from 'react';
import ThemeContext from '@/ThemeContext';
class VoteMain extends React.Component {
    // 获取上下文信息
    static contextType = ThemeContext;
    render() {
        let { supNum, oppNum } = this.context;
        let total = supNum + oppNum,
            ratio = '--';
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%';
        return <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
            <p>支持比率：{ratio}</p>
        </div>;
    }
};
export default VoteMain;
```

`VoteFooter.jsx`

```js
import React from 'react';
import ThemeContext from '@/ThemeContext';
class VoteFooter extends React.Component {
    render() {
        return <ThemeContext.Consumer>
            {context => {
                let { change } = context;
                return <div className="footer">
                    <button onClick={change.bind(null, 'sup')}>
                        支持
                    </button>
                    <button onClick={change.bind(null, 'opp')}>
                        反对
                    </button>
                </div>;
            }}
        </ThemeContext.Consumer>;
    }
};
export default VoteFooter;
```

### 函数组件

`Vote.jsx`

```javascript
import React, { useState } from 'react';
...
import ThemeContext from '@/ThemeContext';
const Vote = function Vote() {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);
    const change = type => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    };
    return <ThemeContext.Provider
        value={{
            supNum,
            oppNum,
            change
        }}>
        <div className="vote-box">
            <header className="header">
                <h2 className="title">React真的很不错!!</h2>
                <span className="num">{supNum + oppNum}人</span>
            </header>
            <VoteMain />
            <VoteFooter />
        </div>
    </ThemeContext.Provider>;
};
export default Vote;
```

`VoteMain.jsx`

```js
import React, { useContext, useMemo } from 'react';
import ThemeContext from '@/ThemeContext';
const VoteMain = function VoteMain() {
    // 获取上下文中的信息
    let { supNum, oppNum } = useContext(ThemeContext);
    let ratio = useMemo(() => {
        let total = supNum + oppNum;
        return total > 0 ? (supNum / total * 100).toFixed(2) + '%' : '--';
    }, [supNum, oppNum]);
    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
        <p>支持比率：{ratio}</p>
    </div>;
};
export default VoteMain;
```

`VoteFooter.jsx`

```js
import React, { useContext } from 'react';
import ThemeContext from '@/ThemeContext';
const VoteFooter = function VoteFooter() {
    let { change } = useContext(ThemeContext);
    return <div className="footer">
        <button onClick={change.bind(null, 'sup')}>支持</button>
        <button onClick={change.bind(null, 'opp')}>反对</button>
    </div>;
};
export default VoteFooter;
```

在真实项目中

- 父子通信（或具备相同父亲的兄弟组件）：我们一般都是基于props属性实现
- 其他组件之间的通信：我们都是基于 redux / react-redux 或者 mobx 去实现

后面的课程中，我们会详细讲解 redux / react-redux 等内容。

# d8 React公共状态管理方案

React框架中**公共状态管理**的解决方案：

- redux + react-redux
- dva「redux-saga 」或 umi
- MobX

## 01 Redux

### 1 关于Redux

#### 什么是 Redux ？

Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理。

Redux 除了和 React 一起用外，还支持其它框架；它体小精悍（只有2kB，包括依赖），却有很强大的插件扩展生态。

Redux 提供的模式和工具使您更容易理解应用程序中的状态何时、何地、为什么以及如何更新，以及当这些更改发生时，您的应用程序逻辑将如何表现。

A Predictable State Container for JS Apps是Redux官方对于Redux的描述，这句话可以这样翻译“一个专为JS应用设计的可预期的状态容器”，简单来说Redux是一个可预测的状态容器，什么玩意？这几个字单独拿出来都认识，连到一起后怎么就不像人话了？别急，我们一点一点看。

**状态（State）**

state直译过来就是状态，使用React这么久了，对于state我们已经是非常的熟悉了。state不过就是一个变量，一个用来记录（组件）状态的变量。组件可以根据不同的状态值切换为不同的显示，比如，用户登录和没登录看到页面应该是不同的，那么用户的登录与否就应该是一个状态。再比如，数据加载与否，显示的界面也应该不同，那么数据本身就是一个状态。换句话说，状态控制了页面的如何显示。

但是需要注意的是，状态并不是React中或其他类似框架中独有的。所有的编程语言，都有状态，所有的编程语言都会根据不同的状态去执行不同的逻辑，这是一定的。所以状态是什么，状态就是一个变量，用以记录程序执行的情况。

**容器（Container）**

容器当然是用来装东西的，状态容器即用来存储状态的容器。状态多了，自然需要一个东西来存储，但是容器的功能却不是仅仅能存储状态，它实则是一个状态的管理器，除了存储状态外，它还可以用来对state进行查询、修改等所有操作。（编程语言中容器几乎都是这个意思，其作用无非就是对某个东西进行增删改查）

**可预测（Predictable）**

可预测指我们在对state进行各种操作时，其结果是一定的。即以相同的顺序对state执行相同的操作会得到相同的结果。简单来说，Redux中对状态所有的操作都封装到了容器内部，外部只能通过调用容器提供的方法来操作state，而不能直接修改state。这就意味着外部对state的操作都被容器所限制，对state的操作都在容器的掌控之中，也就是可预测。

总的来说，**Redux是一个稳定、安全的状态管理器**。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220520223232744.png)

#### 为什么是Redux？

问：不对啊？React中不是已经有state了吗？为什么还要整出一个Redux来作为状态管理器呢？

答：state应付简单值还可以，如果值比较复杂的话并不是很方便。

问：复杂值可以用useReducer嘛！

答：的确可以啊！但无论是state还是useReducer，state在传递起来还是不方便，自上至下一层一层的传递并不方便啊！

问：那不是还有context吗？

答：的确使用context可以解决state的传递的问题，但依然是简单的数据尚可，如果数据结构过于复杂会使得context变得异常的庞大，不方便维护。

Redux可以理解为是reducer和context的结合体，使用Redux即可管理复杂的state，又可以在不同的组件间方便的共享传递state。当然，Redux主要使用场景依然是大型应用，大型应用中状态比较复杂，如果只是使用reducer和context，开发起来并不是那么的便利，此时一个有一个功能强大的状态管理器就变得尤为的重要。

#### 什么时候应该用 Redux

- 在应用的大量地方，都存在大量的状态
- 应用状态会随着时间的推移而频繁更新
- 更新该状态的逻辑可能很复杂
- 中型和大型代码量的应用，很多人协同开发

#### Redux 库和工具

Redux 是一个小型的独立 JS 库， 但是它通常与其他几个包一起使用：

- `React-Redux`

React-Redux是我们的官方库，它让 React 组件与 Redux 有了交互，可以从 store 读取一些 state，可以通过 dispatch actions 来更新 store。

- `Redux Toolkit`

Redux Toolkit 是我们推荐的编写 Redux 逻辑的方法。 它包含我们认为对于构建 Redux 应用程序必不可少的包和函数。 Redux Toolkit 构建在我们建议的最佳实践中，简化了大多数 Redux 任务，防止了常见错误，并使编写 Redux 应用程序变得更加容易。

- `Redux DevTools 拓展`

Redux DevTools Extension 可以显示 Redux 存储中状态随时间变化的历史记录，这允许您有效地调试应用程序。

### 2 使用redux

使用Redux之前，你需要先明确一点Redux是JS应用的状态容器，它并不是只能在React使用，而是可以应用到任意的JS应用中（包括前端JS，和服务器中Node.js）。总之，凡是JS中需要管理的状态的Redux都可以胜任。

#### A redux基础工作流程

① 创建全局公共的容器，用来存贮各组件需要的公共信息

```js
const store = createStore([reducer])
```

> 在创建的store容器中，存储两部分内容：
>
> - 公共状态：各组件需要共享的信息
> - 事件池：存放一些让组件可以更新的方法
>
> 当公共状态发生改变时，会自动立即通知事件池中的方法执行，这些方法的执行，主要目的就是让指定的组件更新，而组件一更新，就可以获取最新的公共状态信息进行渲染。

② 在组件内部，获取公共状态信息，然后渲染

```js
store.getStore()=>{}
```

> 需要使用公共状态的组件，基于 getState方法获取即可。

③ 把“让组件可以更新”的方法放在公共容器的事件池中

```js
store.subscribe(函数)
```

> 后期公共状态改了，事件池的方法会按照顺序依次执行，也就是让对应的组件更新，组件只要更新，就可以从store容器中获取最喜欢的状态渲染。

④ 创建容器的时候，需要传递reducer

```js
let initial = {
    profile: null
}

export default function baseReducer(state = initial, action) {
    state = { ...state }
    let { type } = action
    switch (type) {
        case AT.BASE_QUERY_USER_INFO:
            state.profile = action.profile
            break
        case AT.BASE_REMOVE_USER_INFO:
            state.profile = null
            break
        default:
    }
    return state
}
```

> [reducer] 状态统一修改
>
> 不能直接修改公共状态，所有状态的更改都必须在reducer函数中完成。

⑤ 基于dispatch派发任务，通知reducer执行修改状态

```js
store.dispatch({
  type:xx;
   ...
})
```

> 组件内部，可以基于 dispatch 派发通知reducer执行 【传递action 派发对象】，从而实现状态更改。
>
> PS: action 派发的行为对象中，必须包含type行为标识属性。

#### B 在网页中直接使用

我们先来在网页中使用以下Redux，在网页中使用Redux就像使用jQuery似的，直接在网页中引入Redux的库文件即可：

```js
<script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>
```

网页中我们实现一个简单的计数器功能，页面长成这样：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220520223449874.png)

代码这样：

```
<button id="btn01">减少</button>
<span id="counter">1</span>
<button id="btn02">增加</button>
```

我们要实现的功能很简单，点击减少数字变小，点击增加数字变大。如果用传统的DOM编写，可以创建一个变量用以记录数量，点击不同的按钮对变量做不同的修改并设置到span之中，其中count就是一个状态，只是这个状态没有专门的管理器，它的所有操作都在事件的响应函数中进行处理，这种状态就是不可预测的状态，因为在任何的函数中都可以对这个状态进行修改，没有任何安全限制。不过就这个功能而言，这可能已经是最简单的代码了。一会我们使用了Redux，代码会变得复杂一些，但是还是那句话，这里我们只是找一个简单的场景做一个演示，Redux的真实使用场景依然是大型应用中的复杂state。

Redux是一个状态容器，所以使用Redux必须先创建容器对象，它的所有操作都是通过容器对象来进行的，创建容器的方式有多种，我们先说一种好理解的：

```
Redux.createStore(reducer, [preloadedState], [enhancer])
```

createStore用来创建一个Redux中的容器对象，它需要三个参数：reducer、preloadedState、enhancer。

- reducer是一个函数，是state操作的整合函数，每次修改state时都会触发该函数，它的返回值会成为新的state。

- preloadedState就是state的初始值，可以在这里指定也可以在reducer中指定。

- enhancer增强函数用来对state的功能进行扩展，暂时先不理它。


三个参数中，只有reducer是必须的，来看一个Reducer的示例：

```js
const countReducer = (state = {count:0}, action) => {
    switch (action.type){
        case 'ADD':
            return {count:state.count+1};
        case 'SUB':
            return {count:state.count-1};
        default:
            return state
    }
};
```

reducer用来整合关于state的所有操作，容器修改state时会自动调用该函数，函数调用时会接收到两个参数：state和action，state表示当前的state，可以通过该state来计算新的state。`state = {count:0}`这是在指定state的默认值，如果不指定，第一次调用时state的值会是undefined。也可以将该值指定为createStore()的第二个参数。action是一个普通对象，用来存储操作信息。

将reducer传递进createStore后，我们会得到一个store对象：

```js
const store = Redux.createStore(countReducer);
```

store对象创建后，对state的所有操作都需要通过它来进行：

读取state：

```
store.getState()
```

修改state：

```
store.dispatch({type:'ADD'})
```

dipatch用来触发state的操作，可以将其理解为是想reducer发送任务的工具。它需要一个对象作为参数，这个对象将会成为reducer的第二个参数action，需要将操作信息设置到对象中传递给reducer。action中最重要的属性是type，type用来识别对state的不同的操作，上例中’ADD’表示增加操作，’SUB’表示减少的操作。

除了这些方法外，store还拥有一个subscribe方法，这个方法用来订阅state变化的信息。该方法需要一个回调函数作为参数，当store中存储的state发生变化时，回调函数会自动调用，我们可以在回调函数中定义state发生变化时所要触发的操作：

```js
store.subscribe(()=>{
    // store中state发生变化时触发
});
```

如此一来，刚刚的代码被修改成了这个样子：

```js
const btn01 = document.getElementById('btn01');
const btn02 = document.getElementById('btn02');
const counterSpan = document.getElementById('counter');

/*
*   state 表示当前state，可以根据这个state生成新的state
*   action 是一个js对象，它里边会保存操作的信息
* */
const countReducer = (state = {count:0}, action) => {
    switch (action.type){
        case 'ADD':
            return {count:state.count+1};
        case 'SUB':
            return {count:state.count-1};
        default:
            return state
    }
};

const store = Redux.createStore(countReducer);

store.subscribe(()=>{
    counterSpan.innerText = store.getState().count;
});

btn01.addEventListener('click', ()=>{
    store.dispatch({type:'SUB'});
});

btn02.addEventListener('click', ()=>{
    store.dispatch({type:'ADD'});
});
```

修改后的代码相较于第一个版本要复杂一些，同时也解决了之前代码中存在的一些问题：

1. 前一个版本的代码state就是一个变量，可以任意被修改。state不可预测，容易被修改为错误的值。新代码中使用了Redux，Redux中的对state的所有操作都封装到了reducer函数中，可以限制state的修改使state可预测，有效的避免了错误的state值。
2. 前一个版本的代码，每次点击按钮修改state，就要手动的修改counterSpan的innerText，非常麻烦，这样一来我们如果再添加新的功能，依然不能忘记对其进行修改。新代码中，counterSpan的修改是在store.subscribe()的回调函数中进行的，state每次发生变化其值就会随之变化，不需要再手动修改。换句话说，state和DOM元素通过Redux绑定到了一起。

通过上例也不难看出，Redux中最最核心的东西就是这个store，只要拿到了这个store对象就相当于拿到了Redux中存储的数据。在加上Redux的核心思想中有一条叫做“单一数据源”，也就是所有的state都会存储到一课对象树中，并且这个对象树会存储到一个store中。所以到了React中，组件只需获取到store即可获取到Redux中存储的所有state。

**网页中使用redux的步骤：**

1. 引入redux核心包
2. 创建reducer整合函数
3. 通过reducer对象创建store
4. 对store中的state进行订阅
5. 通过dispatch派发state的操作指令

#### C redux工程化

redux工程化其实就是“按模块划分”

- reducer的模块化管理

  ```js
  const reducer = combineReducers({
      base: baseReducer,
      collect: collectReducer
  })
  export default reducer
  ```

- 派发行为标识的统一管理：派发的行为标识唯一性

  ```js
  export const BASE_QUERY_USER_INFO = 'BASE_QUERY_USER_INFO'
  export const BASE_REMOVE_USER_INFO = 'BASE_REMOVE_USER_INFO'
  
  export const COLLECT_QUERY = 'COLLECT_QUERY'
  export const COLLECT_REMOVE = 'COLLECT_REMOVE'
  export const COLLECT_CLEAR = 'COLLECT_CLEAR'
  ```

  > 每次dispatch派发的时候 都会去每个模块的reducer中找一遍 把所有和派发行为标识匹配的逻辑执行，所以，派发的行为标识必须是唯一的。

- 派发行为对象的分模块管理

  ```js
  const action = {
      base: baseAction,
      collect: collectAction
  }
  export default action
  ```

  > actionCreator

#### D 在React中使用Redux

当我们需要在React中使用Redux时，我们除了需要引入Redux核心库外，还需要引入react-redux库，以使React和redux适配，可以通过npm或yarn安装：

```js
npm install -S redux react-redux
yarn add redux react-redux
```

接下来我们尝试在Redux，添加一些复杂的state，比如一个学生的信息：

```js
{name:'孙悟空', age:18, gender:'男', address:'花果山'}
```

##### 创建reducer：

```js
/* const reducer = function reducer(state=initial,action){} */
const reducer = (state = {
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山'
}, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            };
        case 'SET_AGE':
            return {
                ...state,
                age: action.payload
            };
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.payload
            };
        case 'SET_GENDER':
            return {
                ...state,
                gender: action.payload
            };
        default :
            return state
    }

};
```

reducer的编写和之前的案例并没有本质的区别，只是这次的数据和操作方法变得复杂了一些。以SET_NAME为例，当需要修改name属性时，dispatch需要传递一个有两个属性的action，action的type应该是字符串”SET_NAME”，payload应该是要修改的新名字，比如要将名字修改为猪八戒，则dispatch需要传递这样一个对象`{type:'SET_NAME',payload:'猪八戒'}`。

##### 创建store：

```js
const store = createStore(reducer);
```

创建store和前例并无差异，传递reducer进行构建即可。

##### 设置provider：

Provider：把store注册到上下文中

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
```

创建store后，需要引入react-redux中提供的Provider组件，将其设置到所有组件的最外层，并且将刚刚创建的store设置为组件的store属性，只有这样才能使得Redux中的数据能被所有的组件访问到。

##### 访问数据：

```js
const stu = useSelector(state => state);
```

react-redux还为我们提供一个钩子函数useSelector，用于获取Redux中存储的数据，它需要一个回调函数作为参数，回调函数的第一个参数就是当前的state，回调函数的返回值，会作为useSelector的返回值返回，所以`state => state`表示直接将整个state作为返回值返回。现在就可以通过stu来读取state中的数据了：

```
<p>
    {stu.name} -- {stu.age} -- {stu.gender} -- {stu.address}
</p>
```

##### 操作数据：

```
const dispatch = useDispatch();
```

useDispatch同样是react-redux提供的钩子函数，用来获取redux的派发器，对state的所有操作都需要通过派发器来进行。

##### 通过派发器修改state：

```
dispatch({type:'SET_NAME', payload:'猪八戒'})
dispatch({type:'SET_AGE', payload:28})
dispatch({type:'SET_GENDER', payload:'女'})
dispatch({type:'SET_ADDRESS', payload:'高老庄'})
```

完整代码：

```js
import ReactDOM from 'react-dom/client';
import {Provider, useDispatch, useSelector} from "react-redux";
import {createStore} from "redux";

const reducer = (state = {
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山'
}, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            };
        case 'SET_AGE':
            return {
                ...state,
                age: action.payload
            };
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.payload
            };
        case 'SET_GENDER':
            return {
                ...state,
                gender: action.payload
            };
        default :
            return state
    }

};

const store = createStore(reducer);

const App = () =>{
    const stu = useSelector(state => state);
    const dispatch = useDispatch();
    return  <div>
        <p>
            {stu.name} -- {stu.age} -- {stu.gender} -- {stu.address}
        </p>
        <div>
            <button onClick={()=>{dispatch({type:'SET_NAME', payload:'猪八戒'})}}>改name</button>
            <button onClick={()=>{dispatch({type:'SET_AGE', payload:28})}}>改age</button>
            <button onClick={()=>{dispatch({type:'SET_GENDER', payload:'女'})}}>改gender</button>
            <button onClick={()=>{dispatch({type:'SET_ADDRESS', payload:'高老庄'})}}>改address</button>
        </div>
  </div>
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Provider store={store}>
            <App/>
        </Provider>
    </div>

);
```

##### connect

把公共状态和派发任务当做属性传递给属性

- 自动获取上下文中的store
- 自动把“让组件更新的方法”注册到store事件池中

```js
/* export default connect(mapStateProps，mapDispatechProps)(要渲染的组件) */

const Detail = function Detail({
    navigate, params, location,
    profile, queryLoginInfo,
    collectList, queryStoreList, removeStore
}) 
...
export default connect(
    // mapStateProps：可以获取到redux中的公共状态，把需要的信息作为属性传递给组件
    state => {
        // state：存储到redux容器中，所有模块的公共状态信息
        // 返回对象中的信息，就是要作为属性传递给组件的信息
        return {
            profile: state.base.profile,
            collectList: state.collect.list
        }
    },
    // mapDispatechProps：把需要派发的任务作为属性传递给组件 
    {
        queryLoginInfo: action.base.queryLoginInfo,
        queryStoreList: action.collect.queryStoreList,
        removeStore: action.collect.removeStore
    }
)(Detail)
```

##### redux中间件

###### redux-logger

每一次派发，在控制台输出派发日志，方便对redux的操作进行调试。

> 输出的内容：派发之前的状态、派发的行为、派发后的内容

###### redux-thunk/redux-promise

实现异步派发

每一次派发的时候，需要传递给reducer的action对象中的内容，是需要异步获取的：在派发的时候 需要先向服务器发请求，把数据拿到后，再进行派发。

> 在不适用任何中间件的情况下，actionCreator对象中，是不支持异步操作的，且返回的是promise，派发任务的对象是那个promise实例，不具备type属性，会报错，我们要保证方法执行，要必须立即返回标准的action对象。

1. 首先方法返回一个函数 [也是对象]，内部给函数设置一个type属性，属性值不会和reducer中的逻辑匹配，没有修改任何状态

   > 实际上的处理：
   >
   > dispatch进行了重写：第一次点击按钮，用到的dispatch其实是重写的dispatch，传递给dispatch的是一个没有type的函数，此时不会报错，但也不会通知reducer执行，仅仅是返回的这个函数执行了

2. 把返回的函数执行，把派发的方法dispatch传递给函数

   > 接下来，在函数中，自己搞异步操作，异步操作成功后，自己再手动基于dispatch进行派发即可

redux-thunk与redux-promise相同点：

都是派发两次

- 第一次派发两次的是，重写后的dispatch，这个方法不会去校验对象是否有type属性，也不会在乎传递的对象是否为标准普通对象
- 此次派发，仅仅是为了第二次派发做准备
  - redux-thunk：把返回的函数执行，把真正的dispatch传递给函数
  - redux-promise：监听返回的promise实例，在实例为成功后，需要基于真正的dispatch，把成功的结果再进行派发

redux-thunk与redux-promise不同点：

- redux-thunk的第二次派发是手动处理的
- redux-promise是自动处理

###### redux-saga

暂略

redux在真实项目中的运用：

1. 实现组件之间的信息共享或通信
2. 对数据进行缓存/存储

### 3 问题

问题：

1. 如果state过于复杂，将会非常难以维护

   可以通过对state分组来解决这个问题，创建多个reducer，然后将其合并为一个

2. state每次操作时，都需要对state进行复制，然后再去修改

3. case后边的常量维护起来会比较麻烦

#### 复杂的State

上例中的数据结构已经变得复杂，但是距离真实项目还有一定的差距。因为Redux的核心思想是所有的state都应该存储到同一个仓库中，所以只有一个学生数据确实显得有点单薄，现在将数据变得复杂一些，出来学生数据外，还增加了一个学校的信息，于是state的结构变成了这样：

```
{
    stu:{
        name: '孙悟空',
        age: 18,
        gender: '男',
        address: '花果山' 
    },
    school:{
        name:'花果山一小',
        address:'花果山大街1号'
    }
}
```

数据结构变得复杂了，我们需要对代码进行修改，首先看reducer：

```
const reducer = (state = {
    stu: {
        name: '孙悟空',
        age: 18,
        gender: '男',
        address: '花果山'
    },
    school: {
        name: '花果山一小',
        address: '花果山大街1号'
    }

}, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                stu: {
                    ...state.stu,
                    name: action.payload
                }
            };
        case 'SET_AGE':
            return {
                ...state,
                stu: {
                    ...state.stu,
                    age: action.payload
                }
            };
        case 'SET_ADDRESS':
            return {
                ...state,
                stu: {
                    ...state.stu,
                    address: action.payload
                }
            };
        case 'SET_GENDER':
            return {
                ...state,
                stu: {
                    ...state.stu,
                    gender: action.payload
                }
            };
        case 'SET_SCHOOL_NAME':
            return {
                ...state,
                school: {
                    ...state.school,
                    name:action.payload
                }
            };
        case 'SET_SCHOOL_ADDRESS':
            return {
                ...state,
                school: {
                    ...state.school,
                    address: action.payload
                }
            }
        default :
            return state;
    }

};
```

数据层次变多了，我们在操作数据时也变得复杂了，比如修改name的逻辑变成了这样：

```
case 'SET_NAME':
    return {
         ...state,
        stu: {
            ...state.stu,
            name: action.payload
    }
};
```

同时数据加载的逻辑也要修改，之前我们是将整个state返回，现在我们需要根据不同情况获取state，比如获取学生信息要这么写：

```
const stu = useSelector(state => state.stu);
```

获取学校信息：

```
const school = useSelector(state => state.school);
```

完整代码：

```js
import ReactDOM from 'react-dom/client';
import {Provider, useDispatch, useSelector} from "react-redux";
import {createStore} from "redux";

const reducer = (state = {
    stu: {
        name: '孙悟空',
        age: 18,
        gender: '男',
        address: '花果山'
    },
    school: {
        name: '花果山一小',
        address: '花果山大街1号'
    }

}, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                stu: {
                    ...state.stu,
                    name: action.payload
                }
            };
        case 'SET_AGE':
            return {
                ...state,
                stu: {
                    ...state.stu,
                    age: action.payload
                }
            };
        case 'SET_ADDRESS':
            return {
                ...state,
                stu: {
                    ...state.stu,
                    address: action.payload
                }
            };
        case 'SET_GENDER':
            return {
                ...state,
                stu: {
                    ...state.stu,
                    gender: action.payload
                }
            };
        case 'SET_SCHOOL_NAME':
            return {
                ...state,
                school: {
                    ...state.school,
                    name:action.payload
                }
            };
        case 'SET_SCHOOL_ADDRESS':
            return {
                ...state,
                school: {
                    ...state.school,
                    address: action.payload
                }
            }
        default :
            return state;
    }

};

const store = createStore(reducer);

const App = () => {
    const stu = useSelector(state => state.stu);
    const school = useSelector(state => state.school);
    const dispatch = useDispatch();
    return <div>
        <p>
            {stu.name} -- {stu.age} -- {stu.gender} -- {stu.address}
        </p>
        <div>
            <button onClick={() => {
                dispatch({type: 'SET_NAME', payload: '猪八戒'});
            }}>改name
            </button>
            <button onClick={() => {
                dispatch({type: 'SET_AGE', payload: 28});
            }}>改age
            </button>
            <button onClick={() => {
                dispatch({type: 'SET_GENDER', payload: '女'});
            }}>改gender
            </button>
            <button onClick={() => {
                dispatch({type: 'SET_ADDRESS', payload: '高老庄'});
            }}>改address
            </button>
        </div>

        <hr/>

        <p>
            {school.name} -- {school.address}
        </p>
        <div>
            <button onClick={()=>{dispatch({type:'SET_SCHOOL_NAME', payload:'高老庄小学'})}}>改学校name</button>
            <button onClick={()=>{dispatch({type:'SET_SCHOOL_ADDRESS', payload:'高老庄中心大街15号'})}}>改学校address</button>
        </div>
    </div>;
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Provider store={store}>
            <App/>
        </Provider>
    </div>
);
```

麻烦确实是麻烦了一些，但是还好功能实现了。

#### 多个Reducer

上边的案例的写法存在一个非常严重的问题！将所有的代码都写到一个reducer中，会使得这个reducer变得无比庞大，现在只有学生和学校两个信息。如果数据在多一些，操作方法也会随之增多，reducer会越来越庞大变得难以维护。

Redux中是允许我们创建多个reducer的，所以上例中的reducer我们可以根据它的数据和功能进行拆分，拆分为两个reducer，像是这样：

```js
const stuReducer = (state = {
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山'
}, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            };
        case 'SET_AGE':
            return {
                ...state,
                age: action.payload
            };
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.payload
            };
        case 'SET_GENDER':
            return {
                ...state,
                gender: action.payload
            };
        default :
            return state;
    }

};

const schoolReducer = (state = {
    name: '花果山一小',
    address: '花果山大街1号'
}, action) => {
    switch (action.type) {
        case 'SET_SCHOOL_NAME':
            return {
                ...state,
                name: action.payload
            };
        case 'SET_SCHOOL_ADDRESS':
            return {
                ...state,
                address: action.payload
            };
        default :
            return state;
    }

};
```

修改后reducer被拆分为了stuReducer和schoolReducer，拆分后在编写每个reducer时，只需要考虑当前的state数据，不再需要对无关的数据进行复制等操作，简化了reducer的编写。于此同时将不同的功能编写到了不同的reducer中，降低了代码间的耦合，方便对代码进行维护。

拆分后，还需要使用Redux为我们提供的函数combineReducer将多个reducer进行合并，合并后才能传递进createStore来创建store。

```js
const reducer = combineReducers({
    stu:stuReducer,
    school:schoolReducer
});

const store = createStore(reducer);
```

combineReducer需要一个对象作为参数，对象的属性名可以根据需要指定，比如我们有两种数据stu和school，属性名就命名为stu和school，stu指向stuReducer，school指向schoolReducer。读取数据时，直接通过state.stu读取学生数据，通过state.school读取学校数据。

完整代码：

```js
import ReactDOM from 'react-dom/client';
import {Provider, useDispatch, useSelector} from "react-redux";
import {combineReducers, createStore} from "redux";

const stuReducer = (state = {
    name: '孙悟空',
    age: 18,
    gender: '男',
    address: '花果山'
}, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            };
        case 'SET_AGE':
            return {
                ...state,
                age: action.payload
            };
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.payload
            };
        case 'SET_GENDER':
            return {
                ...state,
                gender: action.payload
            };
        default :
            return state;
    }

};

const schoolReducer = (state = {

    name: '花果山一小',
    address: '花果山大街1号'

}, action) => {
    switch (action.type) {
        case 'SET_SCHOOL_NAME':
            return {
                ...state,
                name: action.payload
            };
        case 'SET_SCHOOL_ADDRESS':
            return {
                ...state,
                address: action.payload
            };
        default :
            return state;
    }

};

const reducer = combineReducers({
    stu:stuReducer,
    school:schoolReducer
});

const store = createStore(reducer);

const App = () => {
    const stu = useSelector(state => state.stu);
    const school = useSelector(state => state.school);
    const dispatch = useDispatch();
    return <div>
        <p>
            {stu.name} -- {stu.age} -- {stu.gender} -- {stu.address}
        </p>
        <div>
            <button onClick={() => {
                dispatch({type: 'SET_NAME', payload: '猪八戒'});
            }}>改name
            </button>
            <button onClick={() => {
                dispatch({type: 'SET_AGE', payload: 28});
            }}>改age
            </button>
            <button onClick={() => {
                dispatch({type: 'SET_GENDER', payload: '女'});
            }}>改gender
            </button>
            <button onClick={() => {
                dispatch({type: 'SET_ADDRESS', payload: '高老庄'});
            }}>改address
            </button>
        </div>

        <hr/>

        <p>
            {school.name} -- {school.address}
        </p>
        <div>
            <button onClick={() => {
                dispatch({type: 'SET_SCHOOL_NAME', payload: '高老庄小学'});
            }}>改学校name
            </button>
            <button onClick={() => {
                dispatch({type: 'SET_SCHOOL_ADDRESS', payload: '高老庄中心大街15号'});
            }}>改学校address
            </button>
        </div>
    </div>;
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Provider store={store}>
            <App/>
        </Provider>
    </div>
);
```

## 02 RTK（Redux Toolkit）

上边的案例我们一直在使用Redux核心库来使用Redux，除了Redux核心库外Redux还为我们提供了一种使用Redux的方式——Redux Toolkit。它的名字起的非常直白，Redux工具包，简称RTK。RTK可以帮助我们处理使用Redux过程中的重复性工作，简化Redux中的各种操作。

> 基于切片机制，把reducer和actionCreator混合在一起了

### 1 在React中使用RTK

安装，无论是RTK还是Redux，在React中使用时react-redux都是必不可少，所以使用RTK依然需要安装两个包：react-redux和@reduxjs/toolkit。

- npm

```
npm install react-redux @reduxjs/toolkit -S
```

- yarn

```
yarn add react-redux @reduxjs/toolkit
```

修改上边的例子：

使用RTK时，reducer依然可以使用之前的创建方式不变，但是不在需要合并reducer。RTK为我们提供了一个configureStore方法，它直接接收一个对象作为参数，可以将reducer的相关配置直接通过该对象传递，而不再需要单独合并reducer。

上例中代码：

```js
const reducer = combineReducers({
    stu:stuReducer,
    school:schoolReducer
});

const store = createStore(reducer);
```

修改为：

```js
import {configureStore} from '@reduxjs/toolkit'
const store = configureStore({
    // 指定reducer 按模块管理各个切片
    reducer:{
        stu:stuReducer,
        school:schoolReducer
    }
    // 使用中间件 不指定就默认集成了reduxThunk【如何设置 会整体替换默认值 就要手动指定reduxThunk】
    middleware:[]
});
export default store;
```

configureStore需要一个对象作为参数，在这个对象中可以通过不同的属性来对store进行设置，比如：reducer属性用来设置store中关联到的reducer，preloadedState用来指定state的初始值等，还有一些值我们会放到后边讲解。

reducer属性可以直接传递一个reducer，也可以传递一个对象作为值。如果只传递一个reducer，则意味着store中只有一个reducer。若传递一个对象作为参数，对象的每个属性都可以执行一个reducer，在方法内部它会自动对这些reducer进行合并。

### 2 RTK的API

#### CreateAction（一般不直接用）

action是reducer中的第二个参数，当我们通过dispatch向reducer发送指令时需要手动创建action对象并传递。action中常见的属性有两个一个是type用来指定操作的类型，一个是payload用来指定要传递的数据。

RTK为我们提供了一个方法createAction，用来帮助我们创建action。

```js
createAction(type, prepareAction?)
```

它的第一个参数为type，用来指定action中的type属性。第二个参数可选先忽略它。它的返回值是一个函数。我们可以这么调用：

```js
conconst setName= createAction('ADD');

setName(); // {type: 'ADD', payload: undefined}
setName('猪八戒'); // {type: 'ADD', payload: '猪八戒'}
```

返回值的函数我们可以调用，调用该函数后会得到一个对象，这个对象有两个属性type和payload，type属性值就是我们调用createAction传递的第一个参数，上例中type就是’ADD’。而payload属性就是我们调用该函数时传递的参数。

```
const add = createAction('SET_NAME');
add(); // {type: 'SET_NAME', payload: undefined}
add('猪八戒'); // {type: 'SET_NAME', payload: '猪八戒'}
```

简单说，createAction会返回一个函数，这个函数可以用来创建固定type属性值的对象，并且这个函数的第一个参数会成为新建对象的payload属性值。

可以通过creatAction修改之前的项目：

先创建四个action函数：

```
const setName = createAction('SET_NAME');
const setAge = createAction('SET_AGE');
const setAddress = createAction('SET_ADDRESS');
const setGender = createAction('SET_GENDER');
```

修改dispatch

```
dispatch(setName('猪八戒'));
dispatch(setAge(28));
dispatch(setGender('女'));
dispatch(setAddress('高老庄'));
```

createAction返回函数所创建的对象结构是固定的`{type:'xxx', payload:...}`，我们也可以通过向createAction传递第二个参数来指定payload的格式：

```
const add = createAction('ADD', (name, age, gender, address) => {
    return {
        payload:{
            name,
            age,
            gender,
            address
        }
    }
});

add('沙和尚', 38, '男', '流沙河'); // {"type":"ADD","payload":{"name":"沙和尚","age":38,"gender":"男","address":"流沙河"}}
```

#### CreateReucer（一般不用）

该方法用来是创建reducer的工具方法。

```
createReducer(initialState, builderCallback)
```

参数：

`initialState` —— state的初始值

`builderCallback` —— 带有builer的回调函数，可以同builer来设置reducer的逻辑

回调函数中会传递一个builder作为参数，通过通过builder可以将action和函数进行绑定，使用时可以通过传递指定的action来触发函数的调用。

builder有一个常用的方法addCase，addCase需要两个参数，第一个参数为action，第二个参数为回调函数。action直接传递通过createAction所创建的函数即可，第二个参数是一个回调函数，回调函数类似于reducer，第一个参数为state，第二个参数为action。但又和reducer不同，该回调函数中返回的state是一个代理对象，可以直接对该对象修改，RTK会自动完成其余操作。

示例：

```
// 创建action
const setName = createAction('setName');

// 创建reducer
const stuReducer = createReducer({
        name: '孙悟空',
        age: 18,
        gender: '男',
        address: '花果山'
    }, builder => {
        // 通过builder将action和回调函数进行绑定
        builder.addCase(setName, (state, action) => {
            // 这里的state是代理对象，可以直接对其进行修改
            state.name = action.payload;
        });
    }
);

// 配置reducer
const store = configureStore({
    reducer: {
        stu: stuReducer,
        school: schoolReducer
    }
});

// 发送指令修改name属性
dispatch(setName('猪八戒'));
```

无论是createAction和createReducer都不是RTK中的常用方式（要是这么写代码，可能得疯）。介绍他们只是希望你能了解一下RTK的运行方式。对于我们来创建reducer时最最常用的方式是：createSlice。

#### CreateSlice

createSlice是一个全自动的创建reducer切片的方法，在它的内部调用就是createAction和createReducer，之所以先介绍那两个也是这个原因。createSlice需要一个对象作为参数，对象中通过不同的属性来指定reducer的配置信息。

`createSlice(configuration object`

示例：

```js
const stuSlice= createSlice({
    // 设置切片的名字
    name:'stu',
    //  设置此切片对应reducer中的初始状态
    initialState:{
        name: '孙悟空',
        age: 18,
        gender: '男',
        address: '花果山'
    },
    // 编写不同业务逻辑下对公共状态的更改
    reducers:{
        setName(state, action){
            state.name = action.payload
        }
    }
});
```

配置对象中的属性：

- `initialState` —— state的初始值

- `name` —— reducer的名字，会作为action中type属性的前缀，不要重复

- `reducers` —— reducer的具体方法，需要一个对象作为参数，可以以方法的形式添加reducer，RTK会自动生成action对象。

createSlice返回的并不是一个reducer对象而是一个slice对象（切片对象）。这个对象中我们需要使用的属性现在有两个一个叫做actions，一个叫做reducer。

#### Actions

切片对象会根据我们对象中的reducers方法来自动创建action对象，这些action对象会存储到切片对象actions属性中：

```
stuSlice.actions; // {setName: ƒ}
```

上例中，我们仅仅指定一个reducer，所以actions中只有一个方法setName，可以通过解构赋值获取到切片中的action。

```js
const {setName} = stuSlice.actions;
```

开发中可以将这些取出的action对象作为组件向外部导出，导出其他组件就可以直接导入这些action，然后即可通过action来触发reducer。

#### Reducer

切片的reducer属性是切片根据我们传递的方法自动创建生成的reducer，需要将其作为reducer传递进configureStore的配置对象中以使其生效：

```js
const store = configureStore({
    reducer: {
        stu: stuSlice.reducer,
        school: schoolReducer
    }
});
```

总的来说，使用createSlice创建切片后，切片会自动根据配置对象生成action和reducer，action需要导出给调用处，调用处可以使用action作为dispatch的参数触发state的修改。reducer需要传递给configureStore以使其在仓库中生效。



完整代码：

> - 使用RTK来构建store(切片)
> - 引入Provider 让store生效
> - 通过dispatch派发state的操作指令

stuSlice

```js
// createSlice 创建reducer的切片
// 它需要一个配置对象作为参数，通过对象的不同的属性来指定它的配置
const stuSlice = createSlice({
    name:'stu', // 用来自动生成action中的type
    initialState:{
        name:'孙悟空',
        age:18,
        gender:'男',
        address:'花果山'
    }, // state的初始值
    reducers:{ // 指定state的各种操作，直接在对象中添加方法
        setName(state, action){
            // 可以通过不同的方法来指定对state的不同操作
            // 两个参数：state 这个state的是一个代理对象，可以直接修改
            state.name = action.payload;
        },
        setAge(state, action){
            state.age = action.payload;
        },
        setGender(state, action) {
            state.gender = action.payload;
        },
        setAddress(state, action) {
            state.gender = action.payload;
        }
    }
});

// 切片对象会自动的帮助我们生成action
// actions中存储的是slice自动生成action创建器（函数），调用函数后会自动创建action对象
// action对象的结构 {type:name/函数名, payload:函数的参数}
// 从切片中获取actionCreator 方法执行 返回需要派发的行为对象 后期我们会基于dispatch进行派发即可
export const {setName, setAge, setGender, setAddress} = stuSlice.actions;
// const nameAction = setName('哈哈');
// const ageAction = setAge(30);
// console.log(nameAction);
// console.log(ageAction);

export const {reducer:stuReducer} = stuSlice;
```

schoolSlice

```js
//创建学校的slice
import {createSlice} from "@reduxjs/toolkit";

const schoolSlice = createSlice({
    name:'school',
    initialState:{
        name:'花果山一小',
        address:'花果山大街28号'
    },
    reducers:{
        setName(state, action){
            state.name = action.payload;
        },
        setAddress(state, action){
            state.address = action.payload;
        }
    }
});

export const {setName, setAddress} = schoolSlice.actions;
export const {reducer:schoolReducer} = schoolSlice;
```

```js
//使用RTK来构建store
import {configureStore} from "@reduxjs/toolkit";
import {stuReducer} from "./stuSlice";
import {schoolReducer} from "./schoolSlice";

// 创建store 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
   reducer:{
       student:stuReducer,
       school:schoolReducer
   }
});

export default store;
```

 引入Provider 让store生效

```js
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // provider把store注入到项目当中去的
    <Provider store={store}>  //只会注入一个
        <App/>
    </Provider>
);
```

App

```js
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setName, setAge} from './store/stuSlice';
import {setName as setSchoolName, setAddress as setSchoolAddress} from "./store/schoolSlice";

const App = () => {
    // useSelector() 用来加载state中的数据
    // const student = useSelector(state => state.student);
    // // 引入学校的state
    // const school = useSelector(state => state.school);
    const {student, school} = useSelector(state => state);

    // 通过useDispatch()来获取派发器对象
    const dispatch = useDispatch();
    
    // 获取action的构建器
    return (
        <div>
            <p>
                {student.name} ---
                {student.age} ---
                {student.gender} ---
                {student.address}
            </p>
        <div>
            <button onClick={() => {
                dispatch(setName('猪八戒'));
            }}>改name</button>
            <button onClick={() => {
                dispatch(setAge(28));
            }}>改age
            </button>
            <button onClick={() => {
                dispatch(setGender('女'));
            }}>改gender
            </button>
            <button onClick={() => {
                dispatch(setAddress('高老庄'));
            }}>改address
            </button>
        </div>
            <hr/>

            <p>
                {school.name} ---
                {school.address}
            </p>
            <button onClick={()=>dispatch(setSchoolName('高老庄中小'))}>修改学校名字
</button>
            <button onClick={()=>dispatch(setSchoolAddress('高老庄府前街19号'))}>修改学校地址 </button>
        </div>
    );
};
export default App;
```

## 03 RTKQ（RTK Query）

RTK不仅帮助我们解决了state的问题，同时，它还为我们提供了RTK Query用来帮助我们处理数据加载的问题。RTK Query是一个强大的数据获取和缓存工具。在它的帮助下，Web应用中的加载变得十分简单，它使我们不再需要自己编写获取数据和缓存数据的逻辑。

Web应用中加载数据时需要处理的问题：

1. 根据不同的加载状态显示不同UI组件
2. 减少对相同数据重复发送请求
3. 使用乐观更新，提升用户体验
4. 在用户与UI交互时，管理缓存的生命周期

这些问题，RTKQ都可以帮助我们处理。首先，可以直接通过RTKQ向服务器发送请求加载数据，并且RTKQ会自动对数据进行缓存，避免重复发送不必要的请求。其次，RTKQ在发送请求时会根据请求不同的状态返回不同的值，我们可以通过这些值来监视请求发送的过程并随时中止。

**使用：**

RTKQ已经集成在了RTK中，如果我们已经在项目中引入了RTK则无需再引入其余的模块。如果你不想使用RTKQ给我们提供的发送请求的方式（简单封装过的fetch），你还需要引入一下你要使用的发送请求的工具。

- 创建了Api对象 自动生成钩子函数 导出
- 配置store 
- provider
- 使用钩子函数 返回对象 直接用

### 1 创建Api切片

RTKQ中将一组相关功能统一封装到一个Api对象中，比如：都是学生相关操作统一封装到StudentApi中，关于班级的相关操作封装到ClassApi中。接下来，我们尝试创建一个简单的Api，至于数据还是我们之前所熟悉的学生数据：

studentApi.js

```js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
// 创建Api对象
// createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),// 指定查询的基础信息，发送请求使用的工具
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents:build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                },
                // transformResponse 用来转换响应数据的格式
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;  //只需要data
                }
            }),
            
            getStudentById:build.query({
            query(id) {
                //http://localhost:1337/api/students/23
                return `students/${id}`;
            },
            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue.data;
            },
            keepUnusedDataFor:60, // 设置数据缓存的时间，单位秒 默认60s
        }),
        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery
} = studentApi;

export default studentApi;
```

上例是一个比较简单的Api对象的例子，我们来分析一下，首先我们需要调用`createApi()`来创建Api对象。这个方法在RTK中存在两个版本，一个位于`@reduxjs/toolkit/dist/query`下，一个位于`@reduxjs/toolkit/dist/query/react`下。react目录下的版本会自动生成一个钩子，方便我们使用Api。如果不要钩子，可以引入query下的版本，当然我不建议你这么做。

`createApi()`需要一个配置对象作为参数，配置对象中的属性繁多，我们暂时介绍案例中用到的属性：

- reducerPath

  用来设置reducer的唯一标识，主要用来在创建store时指定action的type属性，如果不指定默认为api。

- baseQuery

  用来设置发送请求的工具，就是你是用什么发请求，RTKQ为我们提供了fetchBaseQuery作为查询工具，它对fetch进行了简单的封装，很方便，如果你不喜欢可以改用其他工具，这里暂时不做讨论。

- fetchBaseQuery

  简单封装过的fetch调用后会返回一个封装后的工具函数。需要一个配置对象作为参数，baseUrl表示Api请求的基本路径，指定后请求将会以该路径为基本路径。配置对象中其他属性暂不讨论。

- endpoints

  Api对象封装了一类功能，比如学生的增删改查，我们会统一封装到一个对象中。一类功能中的每一个具体功能我们可以称它是一个端点。endpoints用来对请求中的端点进行配置。

  endpoints是一个回调函数，可以用普通方法的形式指定，也可以用箭头函数。回调函数中会收到一个build对象，使用build对象对点进行映射。回调函数的返回值是一个对象，Api对象中的所有端点都要在该对象中进行配置。

  对象中属性名就是要实现的功能名，比如获取所有学生可以命名为getStudents，根据id获取学生可以命名为getStudentById。属性值要通过build对象创建，分两种情况：

  - 查询：`build.query({})`

  - 增删改：`build.mutation({})`


例如：

```
getStudents: build.query({
    query() {
        return 'students'
    }
}),
```

先说query，query也需要一个配置对象作为参数（又他喵的是配置对象）。配置对象里同样有n多个属性，现在直说一个，query方法。注意不要搞混两个query，一个是build的query方法，一个是query方法配置对象中的属性，这个方法需要返回一个子路径，这个子路径将会和baseUrl拼接为一个完整的请求路径。比如：getStudets的最终请求地址是:

```
http://localhost:1337/api/`+`students`=`http://localhost:1337/api/students
```

可算是介绍完了，但是注意了这个只是最基本的配置。RTKQ功能非常强大，但是配置也比较麻烦。不过，熟了就好了。

上例中，我们创建一个Api对象studentApi，并且在对象中定义了一个getStudents方法用来查询所有的学生信息。如果我们使用react下的createApi，则其创建的Api对象中会自动生成钩子函数，钩子函数名字为useXxxQuery或useXxxMutation，中间的Xxx就是方法名，查询方法的后缀为Query，修改方法的后缀为Mutation。所以上例中，Api对象中会自动生成一个名为useGetStudentsQuery的钩子，我们可以获取并将钩子向外部暴露。

```js
// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery
} = studentApi;  //解构导出

export default studentApi;
```

### 2 创建Store对象

Api对象的使用有两种方式，一种是直接使用，一种是作为store中的一个reducer使用。store是我们比较熟悉的，所以先从store入手。

```js
import {configureStore} from "@reduxjs/toolkit";
import {studentApi} from "./studentApi";

export const store = configureStore({
    reducer:{
        [studentApi.reducerPath]:studentApi.reducer  //把api对象配置到store 用变量作为属性名
    },
    // 配置中间件 缓存生效
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(studentApi.middleware),
});
```

创建store并没有什么特别，只是注意需要添加一个中间件，这个中间件已自动生成了我们直接引入即可，中间件用来处理Api的缓存。

### 3 Provider

store创建完毕同样要设置Provider标签，让store生效。

```js
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
```

### 4 通过studentApi发送请求

接下来，我们来看看如果通过studentApi发送请求。由于我们已经将studentApi中的钩子函数向外部导出了，所以我们只需通过钩子函数即可自动加载到所有的学生信息。比如，现在在App.js中加载信息可以这样编写代码：

```js
import React from 'react';
import {useGetStudentsQuery} from "./store/studentApi";

const App = () => {
    // 调用Api查询数据
    // 这个钩子函数它会返回一个对象作为返回值，请求过程中相关数据都在该对象中存储
    const {data, isSuccess, isLoading} = useGetStudentsQuery(); // 调用Api中的钩子查询数据

    return (
        <div>
            {isLoading && <p>数据加载中...</p>}
            {isSuccess && data.data.map(item => <p key={item.id}>
                {item.attributes.name} ---
                {item.attributes.age} ---
                {item.attributes.gender} ---
                {item.attributes.address}
            </p>)}
        </div>
    );
};

export default App;
```

直接调用useGetStudentsQuery()它会自动向服务器发送请求加载数据，并返回一个对象。这个对象中包括了很多属性：

1. data – 最新返回的数据
2. currentData – 当前的数据
3. error – 错误信息
4. isUninitialized – 如果为true则表示查询还没开始
5. isLoading – 为true时，表示请求正在第一次加载
6. isFetching 为true时，表示请求正在加载
7. isSuccess 为true时，表示请求发送成功
8. isError 为true时，表示请求有错误
9. refetch 函数，用来重新加载数据

使用中可以根据需要，选择要获取到的属性值。

```js
import React from 'react';
import {useGetStudentsQuery} from "./store/studentApi";
import StudentList from "./components/StudentList";
const App = () => {
    const result = useGetStudentsQuery(null, {
        // useQuery可以接收一个对象作为第二个参数，通过该对象可以对请求进行配置
     
        // selectFromResult: result => {
        //     if (result.data) {
        //         result.data = result.data.filter(item => item.attributes.age < 18);
        //     }
        //
        //     return result;
        // }, // 用来指定useQuery返回的结果

        pollingInterval:0, // 设置轮询的间隔，单位毫秒 如果为0则表示不轮询 用于时效性比较强的数据
        skip:false, // 设置是否跳过当前请求，默认false
        /*
        skip:!props.stuId
        修改数据的时候 要先把原来数据加载出来 但是添加时不需要发请求也没传id 此时需要跳过请求
        */
        refetchOnMountOrArgChange:false, // 设置是否每次都重新加载数据 false正常使用缓存，
                                            // true每次都重载数据
                                            //数字，数据缓存的时间（秒）
        refetchOnFocus:false, // 是否在重新获取焦点时重载数据  
        refetchOnReconnect:true, // 是否在重新连接后重载数据
        /*
        需要提供支持setupListeners(store.dispatch) 
        设置以后才会支持refetchOnFocus refetchOnReconnect
        */
    });
    /*
        currentData: undefined // 当前参数的最新数据
        data: undefined // 最新的数据
        isError: false // 布尔值，是否有错误
        error: Error() // 对象，有错时才存在
        isFetching: true // 布尔值，数据是否在加载
        isLoading: true // 布尔值，数据是否第一次加载
        isSuccess: false // 布尔值，请求是否成功
        isUninitialized: false // 布尔值，请求是否还没有开始发送
        refetch: ƒ () // 一个函数，用来重新加载数据
        status: "pending" // 字符串，请求的状态
    * */
    const {data: stus, isSuccess, isLoading, refetch} = result; // 调用Api中的钩子查询数据

    return (
        <div>
            <button onClick={() => refetch()}>刷新</button>
            {isLoading && <p>数据加载中...</p>}
            {isSuccess && <StudentList stus={stus}/>}
        </div>
    );
};

export default App;
```

### 5 增删改

```js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
// 创建Api对象
//createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),// 指定查询的基础信息，发送请求使用的工具
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents:build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                },
                // transformResponse 用来转换响应数据的格式
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                }
            }),
            getStudentById:build.query({
                query(id) {
                    //http://localhost:1337/api/students/23
                    return `students/${id}`;
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },
                keepUnusedDataFor:60, // 设置数据缓存的时间，单位秒 默认60s
            }),
            delStudent:build.mutation({
                query(id) {
                    //http://localhost:1337/api/students/4
                    return {
                      // 如果发送的get请求，需要返回一个对象来设置请求的信息
                      url:`students/${id}`,
                      method:'delete'
                    };
                }
            }),
            addStudent:build.mutation({
                query(stu) {
                    return {
                        url:'students',
                        method:'post',
                        body:{data:stu}
                    }
                }
            }),
            updateStudent:build.mutation({
               query(stu) {
                   return {
                     url:`students/${stu.id}`,
                     method:'put',
                     body:{data:stu.attributes}
                   };
               }
            }),

        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useDelStudentMutation,
    useAddStudentMutation,
    useUpdateStudentMutation
} = studentApi;

export default studentApi;
```

```js
import React, {useCallback, useContext, useState} from 'react';
import StudentForm from "./StudentForm";
import {useDelStudentMutation} from "../store/studentApi";

const Student = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    // 获取删除的钩子，useMutation的钩子返回的是一个数组
    // 数组中有两个东西，第一个是操作的触发器，第二个是结果集
    const [delStudent, {isSuccess}] = useDelStudentMutation();


    const deleteHandler = () => {
        delStudent(props.stu.id);
    };

    const cancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <>
            {(!isEdit && !isSuccess) &&
                <tr>
                    <td>{props.stu.attributes.name}</td>
                    <td>{props.stu.attributes.gender}</td>
                    <td>{props.stu.attributes.age}</td>
                    <td>{props.stu.attributes.address}</td>
                    <td>
                        <button onClick={deleteHandler}>删除</button>
                        <button onClick={() => setIsEdit(true)}>修改</button>
                    </td>
                </tr>
            }

            {
                isSuccess && <tr>
                    <td colSpan="5">
                        数据已删除！
                    </td>
                </tr>
            }

            {isEdit && <StudentForm stuId={props.stu.id} onCancel={cancelEdit}/>}

            {/*{loading && <tr>*/}
            {/*    <td colSpan={5}>正在删除数据...</td>*/}
            {/*</tr>}*/}
            {/*{error && <tr>*/}
            {/*    <td colSpan={5}>删除失败...</td>*/}
            {/*</tr>}*/}
        </>

    );
};

export default Student;
```

```js
import React, {useCallback, useContext, useEffect, useState} from 'react';
import './StudentForm.css';
import {useAddStudentMutation, useGetStudentByIdQuery, useUpdateStudentMutation} from "../store/studentApi";

const StudentForm = (props) => {
    // 调用钩子来加载数据
    const {data:stuData, isSuccess, isFetching} = useGetStudentByIdQuery(props.stuId, {
        skip:!props.stuId,
        refetchOnMountOrArgChange:false
    });
    // 用户修改时，表单中的数据是数据库中最新的数据
    const [inputData, setInputData] = useState({
        name: '',
        age: '',
        gender: '男',
        address: ''
    });

    const [addStudent, {isSuccess:isAddSuccess}] = useAddStudentMutation();
    const [updateStudent, {isSuccess:isUpdateSuccess}] = useUpdateStudentMutation();

    // StudentForm一加载，应该去自动的加载最新的学生数据
    // console.log(props.stuId);
    // console.log(isSuccess, stuData);

    useEffect(()=>{
        if(isSuccess){
            setInputData(stuData.attributes);
        }
    }, [isSuccess])

    const nameChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, name: e.target.value}));
    };

    const ageChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, age: +e.target.value}));
    };

    const genderChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, gender: e.target.value}));
    };

    const addressChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, address: e.target.value}));
    };

    const submitHandler = () => {
        addStudent(inputData);
        // 重置数据
        setInputData({
            name: '',
            age: '',
            gender: '男',
            address: ''
        });
    };

    const updateHandler = () => {
        updateStudent({
            id:props.stuId,
            attributes:inputData
        });
        props.onCancel();
    };


    return (
        <>
            <tr className="student-form">
                <td><input
                    onChange={nameChangeHandler}
                    value={inputData.name}
                    type="text"/></td>
                <td>
                    <select
                        onChange={genderChangeHandler}
                        value={inputData.gender}
                    >
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </td>
                <td><input
                    onChange={ageChangeHandler}
                    value={inputData.age}
                    type="text"/></td>
                <td><input
                    onChange={addressChangeHandler}
                    value={inputData.address}
                    type="text"/></td>
                <td>

                    {props.stuId && <>
                        <button onClick={()=>props.onCancel()}>取消</button>
                        <button onClick={updateHandler}>确认</button>
                    </>}
                    {!props.stuId &&
                        <button
                            onClick={submitHandler}
                        >添加
                        </button>
                    }

                </td>
            </tr>
            {/*{loading && <tr>*/}
            {/*    <td colSpan={5}>添加中...</td>*/}
            {/*</tr>}*/}
            {/*{error && <tr>*/}
            {/*    <td colSpan={5}>添加失败</td>*/}
            {/*</tr>}*/}
        </>

    );
};

export default StudentForm;
```

### 6 数据标签

```js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
// 创建Api对象
const studentApi = createApi({
    reducerPath: 'studentApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/"
    }),
    tagTypes: ['student'], // 用来指定Api中的标签类型
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents: build.query({
                query() {
                    // 用来指定请求子路径
                    return 'students';
                },
                // transformResponse 用来转换响应数据的格式
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },

                providesTags: [{type: 'student', id: 'LIST'}]
            }),
            getStudentById: build.query({
                query(id) {
                    //http://localhost:1337/api/students/23
                    return `students/${id}`;
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },
                keepUnusedDataFor: 60, // 设置数据缓存的时间，单位秒 默认60s
                providesTags: (result, error, id) => [{type: 'student', id}]
                // 更细化 指定id失效
            }),
            delStudent: build.mutation({
                query(id) {
                    //http://localhost:1337/api/students/4
                    return {
                        // 如果发送的get请求，需要返回一个对象来设置请求的信息
                        url: `students/${id}`,
                        method: 'delete'
                    };
                }
            }),
            addStudent: build.mutation({
                query(stu) {
                    return {
                        url: 'students',
                        method: 'post',
                        body: {data: stu}
                    };
                },
                invalidatesTags: [{type: 'student', id: 'LIST'}]
            }),
            updateStudent: build.mutation({
                query(stu) {
                    return {
                        url: `students/${stu.id}`,
                        method: 'put',
                        body: {data: stu.attributes}
                    };
                },
                invalidatesTags: ((result, error, stu) =>
                    [{type: 'student', id: stu.id}, {type: 'student', id: 'LIST'}])
            }),

        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useDelStudentMutation,
    useAddStudentMutation,
    useUpdateStudentMutation
} = studentApi;

export default studentApi;
```

# d9 React路由管理方案

使用React这些工具所编写的项目通常都是单页应用（SPA）。单页应用中，整个应用中只含有一个页面，React会根据不同的状态在应用中显示出不同的组件。但是我们之前所编写应用还存在着一个问题，整个应用只存在一个页面，一个请求地址，这就使得用户只能通过一个地址访问应用，当我们点击组件中的不同链接时应用的地址是不会发生变化的。这又有什么问题呢？由于应用只有一个地址，所以我们通过该地址访问应用时，总会直接跳转到应用的首页。如此一来，我们便不敢随意的刷新页面，因为一旦刷新页面便直接跳转到首页。在对页面进行分享时，也只能分享网站的首页，而不能分享指定的页面。

怎么办呢？难道我们要将一个页面拆分为多个页面吗？很明显不能这么做，这么做以后应用的跳转便脱离了React的控制，增加应用的复杂度，提高了项目维护的成本。

为了解决这个问题，我们需要引入一个新的工具React Router，React Router为我们提供一种被称为客户端路由的东西，通过客户端路由可以将URL地址和React组件进行映射，当URL地址发生变化时，它会根据设置自动的切换到指定组件。并且这种切换完全不依赖于服务器。换句话说，在用户看来浏览器的地址栏确实发生了变化，但是这一变化并不由服务器处理，而是通过客户端路由进行切换。

React Router最新版本为6，版本6和版本5之间的变化跨度比较大，我们的课程会分别讲解两个版本。

## 01 路由设计模式

### 1 浏览器（history）路由

原理：利用H5的HistoryAPI完成路由的切换和组件的渲染！{可以不刷新页面}
https://developer.mozilla.org/zh-CN/docs/Web/API/History_API

根据不同的地址，到路由表中进行匹配，让容器渲染不同的内容 [组件]

- history.pushState

  > 地址跳转 新增历史记录

- history.go

- history.back

  > history.go(-1)

- history.forward

  > history.go(1)

- history.replaceState

  > 地址跳转 替换现有的历史记录

```js
<nav class="nav-box">
    <a href="/">首页</a>
    <a href="/product">产品中心</a>
    <a href="/personal">个人中心</a>
</nav>
<div class="view-box"></div>

<!-- IMPORT JS -->
<script>
    const viewBox = document.querySelector('.view-box'),
        navBox = document.querySelector('.nav-box');
    const routes = [{
        path: '/',
        component: '首页内容'
    }, {
        path: '/product',
        component: '产品中心内容'
    }, {
        path: '/personal',
        component: '个人中心内容'
    }];

    // 路由匹配 对path进行匹配
    const routerMatch = function routerMatch() {
        let path = location.pathname,
            text = "";
        routes.forEach(route => {
            if (route.path === path) {
                text = route.component;
            }
        });
        viewBox.innerHTML = text;
    };

    history.pushState({}, "", "/");
    routerMatch();

    // 控制路由切换
    navBox.addEventListener('click', function (ev) {
        let target = ev.target;
        // 点击A实现页面地址切换 但是不刷新页面
        if (target.tagName === 'A') {
            // 阻止默认行为
            ev.preventDefault();
            // 实现路由的跳转
            history.pushState({}, "", target.href);
            routerMatch();
        }
    });

    /* 
     popstate事件触发时机：
     1）点击浏览器的前进、后退按钮
     2）调用history.go/forward/back等方法
     注意：history.pushState/replaceState不会触发此事件
     */
    window.addEventListener('popstate', routerMatch);
</script>
```

实际开发中，可以为BrowserRouter起一个别名Router，这样一来我们在切换Router时，只需要修改引用位置，而不需要修改其他代码，像是这样：

```js
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App/>
    </Router>
);
```

### 2 哈希（hash）路由

原理：每一次路由跳转，都是改变页面的hash值；并且监听hashchange事件，渲染不同的内容。

```js
<nav class="nav-box">
    <a href="#/">首页</a>
    <a href="#/product">产品中心</a>
    <a href="#/personal">个人中心</a>
</nav>
<div class="view-box"></div>

<!-- IMPORT JS -->
<script>
    // 路由容器 获取渲染内容的容器
    const viewBox = document.querySelector('.view-box');
    // 路由表：每当重新加载页面或者路由切换（切换哈希值），都先到这个路由表中进行匹配，根据当前的哈希值，匹配出要渲染的内容
    const routes = [{
        path: '/',
        component: '首页内容'
    }, {
        path: '/product',
        component: '产品中心内容'
    }, {
        path: '/personal',
        component: '个人中心内容'
    }];

    // 页面一加载，我们设置默认的hash值
    location.hash = '/';

    // 路由匹配的方法
    const routerMatch = function routerMatch() {
        let hash = location.hash.substring(1),
            text = "";
        routes.forEach(route => {
            if (route.path === hash) {
                text = route.component;
            }
        });
        viewBox.innerHTML = text;
    };
    routerMatch();
    // 检测hash值的变化 重新进行路由匹配
    window.addEventListener('hashchange', routerMatch);
</script>
```

使用BrowserRouter时，路径会直接根据url地址进行跳转，也就是我们在使用应用时在浏览器的地址栏看到的地址就和我们正常去访问网页一样。

使用HashRouter时，组件的跳转不再是以完整的url形式，而是通过url地址中的hash值进行跳转（url地址中#后的内容为hash值）。

BrowserRouter的地址栏

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/06/20220609180542950.png)

HashRouter的地址栏

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/06/20220609180515252.png)

为什么会有这两种Router呢？首先，你要明确我们的项目在开发完成后需要进行构建，构建后的代码需要放到服务器中，以供用户访问。服务器无非就是Nginx或Apache这些东西，服务器的主要功能是将url地址和网页进行映射。传统web项目中，每一个页面都对应一个文件，当用户访问/index.html时，服务器会自动返回根目录下的index.html。当用户访问/about.html时，服务器会返回根目录下about.html。换句话说url和文件的映射都是由服务器来完成的。

但是React项目不同，React项目所有的页面都是通过React进行渲染构建的。项目中只存在一个index.html没有那么多的页面（所以才叫单页应用）。当浏览器地址发生变化时，比如用户访问/about时，此时是不需要服务器介入的，react router会自动挂载对应的组件。

react router可以将url地址和组件进行映射，当用户访问某个地址时，与其对应的组件会自动的挂载，当我们通过点击Link构建的链接进行跳转时，跳转并没有经过服务器，所以没有问题，但是当我们刷新页面，或通过普通链接进行跳转时，会向服务器发送请加载数据，这时的请求并没有经过react router，找不到这个资源，所以会返回404。

这样一来，我们的项目只能够通过首页访问，然后点击链接跳转，刷新和直接通过路由访问都是不行的，一旦进行这些操作就会出现404。

怎么办呢？两种解决方式：

1. 使用HashRouter，HashRouter通过hash地址跳转，而服务器不会处理hash地址，这样地址就会交由React Router处理，路由便可正常跳转。缺点是url地址上总会多出一个#，但不妨碍使用。
2. 修改服务器映射规则，将所有的请求交给React处理，禁止服务器自动匹配页面。以nginx为例，可以将`nginx.conf`中的配置信息修改如下：

```js
location / {
    root   html;
    try_files $uri /index.html;
}
```

两种方式都可以解决404的问题，具体采用那种方案，需要根据你自己项目的实际情况选择。

## 02 React Router 5

### 安装

npm

```
npm install react-router-dom@5 -S
```

yarn

```
yarn add react-router-dom@5
```

### 使用

react router 使用步骤：

* 引入react-router-dom包

  > react router适用于web和原生项目，我们在web项目中使用，所以需要引入的包是react-router-dom。

* 在index.js中引入BrowserRouter/HashRouter组件

* 将BrowserRouter/HashRouter设置为根组件

```js
/* App.jsx */
import React from "react";
import { HashRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import A from './views/A';
import B from './views/B';
import C from './views/C';

const App = function App() {
    // 和Redux类似，要使得路由生效，需要使用Router组件将App组件包裹起来。
    return <HashRouter>
        {/* 导航区域 */}
        <nav className="nav-box">
            <Link to="/">A</Link>
            <Link to="/b">B</Link>
            <Link to="/c">C</Link>
        </nav>

        {/* 内容区域 */}
        <div className="content">
            // Switch：确保路由中，只有一项匹配，则不再继续向下匹配
            // exact：设置匹配模式为精确匹配
            <Switch>
                <Route exact path="/" component={A} />
                <Route path="/b" component={B} />
                // 在路由匹配成功后，可以基于component指定需要渲染的组件，也可以基于render指定一个函					数，基于函数的返回值，动态控制渲染的内容。
                <Route path="/c" render={() => {
                                if (1 === 1) {
                                    return <C />
                                }
                                return <Redirect to="/" />
                            }} />
                // 放在最后一项 path设置为*或者不写 意思是：以上都不匹配执行这个规则
                {/* <Route component={404组件} /> */}
    			// 也可以不设置404 而是重定向到默认地址
                <Redirect from="/" to="/" exact/>
            </Switch>
        </div>
    </HashRouter>;
};

export default App;
```

> `<Link>`等组件，需要放在`Router(BrowserRouter/HashRouter)`的内部！
>
> 每当页面加载或者路由切换的时候，都会去和每一个`<Route>`进行匹配
>
> - 和其中一个匹配成功后，还会继续向下匹配，所以需要基于`<Switch>`处理
>
> - 默认是“非精准”匹配的，所以我们需要基于`exact`处理

### 组件

#### Link组件

Link组件作用类似于a标签（超链接），并且Link组件在浏览器中也会被渲染为超链接。但是Link组件生成的链接点击后只会修改浏览器地址栏的url，并不会真的向服务器发送请求。这种方式有利于组件的渲染，所以在开发中应该使用Link组件而不是超链接。

```js
import React from 'react';
import {Link, NavLink} from "react-router-dom";
import classes from "./Menu.module.css";

const Menu = () => {
    /*
    *   在使用react router时，一定不要使用a标签来创建超链接
    *       因为a标签创建的超链接，会自动向服务器发送请求重新加载页面
    *       而我们不希望这种情况发生
    *
    *   可以使用Link组件来创建超链接
    *   NavLink和Link作用相似，只是可以指定链接激活后的样式
    * */
    return (
        <div>
            <ul>
                <li>
                    {/*<Link to="/">主页</Link>*/}
                    <NavLink
                        exact
                        // activeClassName={classes.active}
                        activeStyle={{textDecoration:"underline"}}
                        to="/">主页</NavLink>
                </li>
                <li>
                    {/*<Link to="/about">关于</Link>*/}
                    <NavLink
                        exact
                        // activeClassName={classes.active}
                        activeStyle={{textDecoration:"underline"}}
                        to="/about">关于</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
```

#### **NavLink组件**

特殊版本的Link，可以根据不同的情况设置不同的样式。

属性：

1. activeClassName —— 字符串 链接激活时的class
2. activeStyle —— 对象 链接激活时的样式
3. isActive —— 函数，可动态判断链接是否激活
4. style —— 函数，动态设置样式
5. className —— 函数，动态设置class值

NavLink和Link都可以实现路由跳转，只不过NavLink有自动匹配，并且设置选中样式「active」的特点！！

- 每一次路由切换完毕后「或者页面加载完」，都会拿当前最新的路由地址，和NavLink中的to「或者to中的pathname进行比较」，给匹配的这一项A，设置active样式类！！
- NavLink可与设置 exact 精准匹配属性
- 可以基于 activeClassName 属性重新设置选中的样式类名

```js
// 结构
<NavLink to="/a">A</NavLink>
<NavLink to="/b">B</NavLink>
<NavLink to="/c">C</NavLink>

// 样式
const NavBox = styled.nav`
   a{
    margin-right: 10px;
    color: #000;
    &.active{
        color:red;
    }
   }
`;
```

> navLink优势：能自己进行匹配、能加选中样式

#### Route组件

route组件是路由的映射组件，通过该组件将url地址和React组件进行映射，映射后当url地址变为指定地址时指定的组件就会显示，否则不显示。

```js
import {Route} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      App组件

        <Route exact path="/home" component={Home}/>
        <Route exact path="/about" component={About}/>
        {/*
            /student/:id 会匹配到 /student/xxx
        */}
        <Route path="/student/:id" component={Student}/>
        </div>
    </div>
  );
}

export default App;
```

上例中，路径`/home`和`<Home/>`组件进行了映射，路径`/about`和`<About/>`组件进行了映射。当访问`http://localhost:3000/about`时，about组件会自动渲染显示，访问`http://localhost:3000/home`时，home组件会自动渲染显示。

> 当Route的路径被访问，其对应组件就会自动挂载 
>
> 注意：默认情况下Route并不是严格匹配，只要url地址的头部和path一致，组件就会挂载，不会检查子路径

Route组件可以设置以下几个属性

1. path
2. exact
3. strict
4. component
5. render
6. children
7. location
8. sensitive

##### path

用来设置要映射的路径，可以是一个字符串或字符串数组。字符串用来匹配单个路径，数组可以匹配多个路径。看一个数组的例子：

```js
<Route path={["/about", "/hello"]}>
    <About/>
</Route>
```

使用数组映射后，当我们访问数组中的路径时都会使组件挂载。设置路径时也可以在路径中设置参数，比如：`/student/:id`其中id就是一个参数，可以动态的传递`:id`的值，换句话说`/student/1`或`/student/2`，都会触发组件挂载。

设置动态参数后，在组件的内部可以使用`useParams()`钩子来读取参数：

```js
const Student = () => {
    const {id} = useParams();
    return <div>学生id：{id}</div>
};

...略...
<Route path="/student/:id">
    <Student/>
</Route>
...略...
```

##### exact

路由的匹配默认并不是完整匹配，这意味着路由映射的地址是`/home`时，只要我们访问的路径是以`/home`开头就会触发组件的挂载，默认情况下是不会检查路由的子路径的。比如：`/home/hello`、`/home/abc`等都会导致home组件挂载。

exact属性用来设置路由地址是否完整匹配，它需要一个布尔值，默认为false，就像上边的情况。如果设置为true，那么只有地址和path完全一致时，组件才会挂载。

```
<Route path="/home" exact>
    <Home/>
</Route>
```

这样一来只有访问`/home`时，home组件才会挂载，差一个字母都不行哦！

##### strict

布尔值，默认值为false。false时，会匹配到以`/`结尾的路径。比如：path设置为`/home`默认情况下`/home/`也会导致组件挂载。设置为true时，以`/`结尾的路径不会被匹配。

component

设置路径匹配后需要挂载的组件。作用和Route的标签体类似。

```
<Route path="/home" component={Home}/>
```

和标签体指定组件不同，如果通过component属性指定组件，React Router会自动向组件中传递三个参数match、location和history。

##### component

component用来指定路由匹配后被挂载的组件

component需要直接传递组件的类，通过component构建的组件，它会自动创建组件并且会自动传递参数

- match -- 匹配的信息
  - isExact 检查路径是否完全匹配
  - params 请求的参数
- location -- 地址信息
- history -- 控制页面的跳转
  - push() 跳转页面
  - replace() 替换页面

###### match

对象，表示请求匹配的路径信息，其中包含四个属性：

- param —— 请求参数

   ```js
   import React from 'react';
   const STU_DATA = [
       {
           id:1,
           name:'孙悟空'
       },
       {
           id:2,
           name:'猪八戒'
       },
       {
           id:3,
           name:'沙和尚'
       },
       {
           id:4,
           name:'唐僧'
       },
   ];
   const Student = (props) => {
   
       const stu = STU_DATA.find(item => item.id === +props.match.params.id);
   
       return (
           <div>
               {stu.id} --- {stu.name}
           </div>
       );
   };
   
   export default Student;
   ```

- isExact —— 布尔值，请求路径是否完整匹配

- path —— 请求路径的规则

- url —— 匹配到的url地址

###### location

对象，表示浏览器地址栏的信息，请求完整路径、查询字符串等，可能具有的属性：

- pathname —— 请求的路径
- search —— 查询字符串
- hash —— hash字符串
- state —— 历史记录中的状态对象，可以用来在跳转时传递数据

###### history

对象，用来读取和操作浏览器的历史记录（页面跳转）等功能，属性：

- length —— 历史记录的数量
- action —— 当前历史记录的状态，pop（前进、后退、新记录创建、索引发生变化）；push（新记录添加）；replace（历史记录被替换）
- location —— location对象
- push() —— 添加新的历史记录
- replace() —— 替换历史记录
- go() —— 跳转到指定记录
- goBack() —— 回退
- goForward() —— 前进
- block() —— 用来阻止用户跳转行为，可以用Prompt组件代替

```js
import React from 'react';

const About = (props) => {
    // console.log(props);
    const clickHandler = ()=>{
        // push()需要一个location作为参数
        // props.history.push({
        //     pathname:'/student/2'
        // });

        props.history.replace({
            pathname:'/student/2',
            state:{name:'哈哈'}
        });
    };
    return (
        <div>
            <button onClick={clickHandler}>点我一下</button>
            <h2>关于我们，其实是师徒4人</h2>
            <ul>
                <li>孙悟空</li>
                <li>猪八戒</li>
                <li>沙和尚</li>
                <li>唐僧</li>
            </ul>
        </div>
    );
};

export default About;
```

##### render

render也是Route组件中的属性，和component类似，也用来指定路径匹配后需要挂载的组件。

只是render需要的是一个回调函数作为参数，组件挂载时，render对应的回调函数会被调用，且函数的返回值会成为被挂载的组件。

render的回调函数中会接收到一个对象作为参数，对象中包含三个属性，即match、location和history，我们可以根据需要选择是否将其传递给组件。

```js
<Route path="/student/:id" render={routeProps => <Student {...routeProps}/>} />
/*
                render 也可以用了指定要挂载的组件
                    render需要一个回调函数作为参数，回调函数的返回值会最终被挂载
                    render不会自动传递三个属性
*/
```

##### children

children实际上就是组件的组件体，设置方式有两种一个是通过组件体设置，一个是通过children属性设置。

它的值也有两种方式，一种直接传递组件，这样当路径匹配时组件会自动挂载。一种是传递一个回调函数，这样它和render的特点是一样的。

直接设置组件：

```js
<Route path="/student/:id" children={<Student/>} />
<Route path="/student/:id">
    <Student/>
</Route>
```

传递回调函数：

```js
<Route path="/student/:id" children={routeProps => <Student {...routeProps}/>} />
<Route path="/student/:id">
    {routeProps => <Student {...routeProps}/>}
</Route>
```

需要注意的时，当children接收到的是一个回调函数时，即使路径没有匹配组件也会被挂载到页面中（没有使用Switch标签的情况下），这一特性可以在一些特殊应用场景下发挥作用。如果不希望出现路径不匹配时组件被挂载的情况，最好选择使用render来代替。

#### Switch组件

Switch组件是Route组件的外部容器，可以将Route组件放入到Switch组件中。放入Switch组件中后，匹配路径时会自动自上向下对Route进行匹配，如果匹配到则挂载组件，并且一个Switch中只会有一个Route被挂载。如果将Route组件单独使用，那么所有的路径匹配的Route中的组件都会被挂载。

```js
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Student from "./components/Student";
import Hello from "./components/Hello";

function App() {
    return (
        <div className="App">
            <Menu/>
            {/*
                可以将Route统一放到一个Switch中，
                    一个Switch中只会有一个路由显示
            */}
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about">
                    <About/>
                </Route>

                <Route path="*">
                    <div>路径错误</div>
                </Route>
            </Switch>
        </div>

    );
}

export default App;
```

#### Prompt组件

prompt组件可以在用户离开页面前弹出提示。

属性：

- message 字符串/函数，设置离开前显示的提示信息
- when布尔值，设置是否显示提示

```js
import React, {useState} from 'react';
import {Prompt} from "react-router-dom";

const MyForm = () => {

    const [isPrompt, setIsPrompt] = useState(false);

    return (
        <div>
            <Prompt
                when={isPrompt}
                message={"将要离开页面！确认吗？"}/>
            <h2>表单</h2>
            <input
                type="text"
                onChange={e => setIsPrompt(e.target.value.trim().length !== 0)}
            />
        </div>
    );
};

export default MyForm;
```

#### Redirect组件

将请求重定向到一个新的位置，经常用来进行权限的处理。

例如：当用户已经登录时则正常显示组件，用户没有登录时则跳转到登录页面。

```js
const [isLogin, setIsLogin] = useState(false);
// Redirect 用于跳转页面 类似于replace
{isLogin && <SomeAuthComponent/>}
{!isLogin && <Redirect to={"/login"}></Redirect>}
```

```js
 <Route path={"/login"}>
    <Login/>
</Route>

<Route path="/form">
    {
        isLogin ? <MyForm/>:
            <Redirect to={"/login"}/>
    }
</Route>
```

上例中，如果isLogin的值为true，表示用户已经登录，若用户登录，则挂载对应组件。若isLogin值为false，则挂载Redirect组件触发重定向，重定向会使得路径跳转到登录页面。

属性：

- to —— 重定向的目标地址，可以是一个字符串也可以是一个对象
- from —— 需要重定向的地址
- push —— 布尔值，是否使用push方式对请求进行重定向

### 多级路由

> React中的路由默认是分散到各个组件中配置的

**构建路由表**：数组中每一项就是需要配置的路由规则

router/index.jsx

```js
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// 调用组件的时候 基于属性传递路由表进来 根据路由表 动态设置路由的匹配规则
const RouterView = function RouterView(props) {
    // 获取路由表
    let { routes } = props;
    return <Switch>
        // 循环设置路由匹配规则
        {routes.map((route, index) => {
            let { redirect, from, to, exact, path, name, component: Component, meta } = route,
                props = {};
            // 重定向的规则
            if (redirect) {
                props = { to };
                if (from) props.from = from;
                if (exact) props.exact = true;
                return <Redirect key={index} {...props} />
            }
            // 正常匹配规则
            props = { path };
            if (exact) props.exact = true;
            return <Route key={index} {...props} render={() => {
                // 做一些特殊的处理，例如：登录态检验、导航守卫等
                return <Component />;
            }} />;
        })}
    </Switch>;
};
export default RouterView;
```

router/routes.js

```javascript
import A from '../views/A';
import B from '../views/B';
import C from '../views/C';

/* 
一级路由 
  重定向选项
    + redirect:true
    + from:从哪来
    + to:定向的地址
    + exact:精准匹配
  正常选项
    + path:匹配路径
    + name:路由名称
    + component:需要渲染的组件
    + meta:路由元信息
    + exact:精准匹配
*/
const routes = [{
    redirect: true,
    from: '/',
    to: '/a',
    exact: true
}, {
    path: '/a',
    name: 'a',
    component: A,
    meta: {}
}, {
    path: '/b',
    name: 'b',
    component: B,
    meta: {}
}, {
    path: '/c',
    name: 'c',
    component: C,
    meta: {}
}, {
    redirect: true,
    to: '/a'
}];
export default routes;
```

router/aRoutes.js

```javascript
/* A组件的二级路由 */
import A1 from '../views/a/A1';
import A2 from '../views/a/A2';
import A3 from '../views/a/A3';

// 不能省略一级路由
const aRoutes = [{
    redirect: true,
    from: '/a',
    to: '/a/a1',
    exact: true
}, {
    path: '/a/a1',
    name: 'a-a1',
    component: A1,
    meta: {}
}, {
    path: '/a/a2',
    name: 'a-a2',
    component: A2,
    meta: {}
}, {
    path: '/a/a3',
    name: 'a-a3',
    component: A3,
    meta: {}
}];
export default aRoutes;
```

App.jsx

```xml
import { HashRouter, Link } from 'react-router-dom';
import RouterView from "./router";
import routes from "./router/routes";
const App = function App() {
    return <HashRouter>
        ...
        <div className="content">
            <RouterView routes={routes} />
        </div>
    </HashRouter>;
};
export default App;
```

views/A.jsx

```xml
import { Link } from 'react-router-dom';
import RouterView from "../router";
import aRoutes from "../router/aRoutes";
...
const A = function A() {
    return <DemoBox>
        ...
        <div className="content">
            <RouterView routes={aRoutes} />
        </div>
    </DemoBox>;
};
export default A;
```

### 路由懒加载

> 必做的性能优化方案

在真实项目中，如果我们事先把所有组件全部导入进来，再基于Route做路由匹配，这样最后项目打包的时候，所有组件全部打包到一个js中，这样js会非常大，第一次加载页面时，从服务器获取这个js文件会用很长时间，不好。

最好的解决方案：只把最开始展示的内容/组件打包到主js文件<bundle.js>中，其余的组件打包成独立的js。

> 分割打包、按需异步加载 => 路由懒加载【借助lazy和import】

RouterView.jsx

```xml
const RouterView = function RouterView(props) {
    ...
    return <Switch>
        {routes.map((route, index) => {
            ...
            return <Route key={index} {...props} render={() => {
        		// suspense：异步处理组件  路由懒加载一定需要suspense支持
                没有加载出来之前显示fallback内容
                return <Suspense fallback={<>加载中...</>}>
                    <Component />
                </Suspense>;
            }} />;
        })}
    </Switch>;
};
export default RouterView;
```

路由表

```javascript
import { lazy } from 'react';
import A from '../views/A';

const routes = [
...
{
    ...
    component: A
}, {
    ...
    component: lazy(() => import(/* webpackChunkName:"AChild" */'../views/B'))
    // 基于这个注释/* webpackChunkName:"AChild" */告诉webpack 可以将相同名字的打包到一个文件
}, {
    ...
    component: lazy(() => import('../views/C'))
    
}
...
];
export default routes;
```

### 在组件中获取路由对象信息

基于Route路由渲染的组件（受控组件），路由会默认给每个组件传递三个属性，获取方法：

① 基于props属性获取

> 只有基于Route路由匹配渲染的组件，才可以基于props属性获取这三个对象信息

② 基于Hook函数（函数组件）

> 只要在哈希路由/浏览器路由中渲染的组件，都可以基于Hook函数获取这些对象信息，即使这个组件并不是基于route渲染的

- history -> useHistory
- location -> useLocation
- match -> useRouteMatch

```js
import React from 'react';
import Hello from "./Hello";
import {Route, useRouteMatch} from "react-router-dom";

const About = (props) => {
    let history = useHistory(),
        location  = useLocation(),
        match = useRouteMatch();
    
    const {path} = useRouteMatch();
    
    const clickHandler = ()=>{...};
    
    return (
        <div>
            <button onClick={clickHandler}>点我一下</button>
            <h2>关于我们，其实是师徒4人</h2>
            <ul>
                <li>孙悟空</li>
                <li>猪八戒</li>
                <li>沙和尚</li>
                <li>唐僧</li>
            </ul>
            <Route path={`${path}/hello`}>
                <Hello/>
            </Route>
        </div>
    );
};

export default About;
```

> 如果当前组件是一个类组件，在哈希路由中，但是并没有经过route匹配渲染，获取三个对象信息：基于函数高阶组件，自己包裹一层进行处理。在v5版本中，自带了一个withRouter高阶函数，来解决这个问题。
>
> 【作用：让非受控组件具备受控组件的特征】

### 路由跳转方案

#### 方案一：Link跳转

```js
<Link to="/xxx">导航</Link>
<Link to={{
    pathname:'/xxx',
    search:'',
    state:{}
}}>导航</Link>
<Link to="/xxx" replace>导航</Link> // 替换现有记录
```

#### 方案二：编程式导航

```javascript
history.push('/c');
history.push({
    pathname: '/c',
    search: '',
    state: {}
});
history.replace('/c');
```

### 路由传参方案

#### 方案一：问号传参

特点：最常用的方案之一；

​			传递信息暴露到URL地址中：不安全而且有点丑，也有长度限制。

​			信息是显式的，即使在目标路由内刷新，传递的信息也在。

```javascript
// 传递
// history.push( '/c?id=100&name=zhufeng')
history.push({
    pathname: '/c',
    // search存储的就是问号传参信息，必须是urlencoded字符串
    // search: 'id=100&name=zhufeng'
    search:qs.stringify({
    	id:100,
    	name:'zhufeng'
})
});

// 接收
import { useLocation } from 'react-router-dom';
let { search } = useLocation();

/* 获取传递的问号参数信息
let {id,name} = qs.parse(location.search.substring(1))

let usp = new URLSearchParams(location.search)
usp.get('id')
usp.get('name')
*/
```

#### 方案二：路径参数

特点：目前主流方案之一；

​			把需要传递的值，作为路由路径中的一部分；

​			传递信息也在URL地址中：不安全也有长度限制。

​			信息都在地址中，即使在目标路由内刷新，传递的信息也在。

```javascript
// 路由表
{
    // :xxx 动态匹配规则
    // ? 可有可无
    path: '/c/:id?/:name?',
    ....
}

// 传递
history.push(`/c/100/zhufeng`);

//接收
import { Params,useRouteMatch } from 'react-router-dom';
let params  = useParams();
let match = useRouteMatch();
```

#### 方案三：隐式传参

特点：传递信息是隐式传递，不暴露在外面；

​			页面刷新，传递的信息就消失了。

```javascript
// 传递
history.push({
    pathname: '/c',
    state: {
        id: 100,
        name: 'zhufeng'
    }
})

// 接收
import { useLocation } from 'react-router-dom';
let { state } = useLocation();
/* let location = useLocation();
   location.state */
```

## 03 React Router 6

### 安装

npm

```
npm install react-router-dom@6 -S
```

yarn

```
yarn add react-router-dom@6
```

### 使用

- 所有路由匹配规则放在<Routes>中，每一条规则的匹配还是基于<Route>

- 不再基于component/render控制渲染的组件：而是基于element

- 不再需要Switch：默认一个匹配成功，就不再匹配下面的
- 不再需要exact：默认每一项都是精准匹配
- 原有的<Redirect/>操作，被<Navigate/>替换
- v6要求所有的路由，不再分散到各个组件中编写，统一写一起

```js
App.jsx

import React from "react";
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeHead from './components/HomeHead';

/* 导入需要的组件 */
import A from './views/A';
import B from './views/B';
import C from './views/C';
import A1 from './views/a/A1.jsx';
import A2 from './views/a/A2.jsx';
import A3 from './views/a/A3.jsx';

const App = function App() {
    return <HashRouter>
        <HomeHead />
        <div className="content">
            // <Routes>：v6 中新增加的组件，作用和Switch类似，都是用于Route的容器，Routes中Route只			有一个会被匹配
            <Routes>
                {/* 一级路由 「特殊属性 index」*/}
                <Route path="/" element={<Navigate to="/a" />} />
                <Route path="/a" element={<A />} >
                    {/* 二级路由 */}
                    <Route path="/a" element={<Navigate to="/a/a1" />} />
                    <Route path="/a/a1" element={<A1 />} />
                    <Route path="/a/a2" element={<A2 />} />
                    <Route path="/a/a3" element={<A3 />} />
                </Route>
    			// element：v6中，Route的component、render、children都变了，需要通过element来指					定要挂载的组件
                <Route path="/b" element={<B />} />
                <Route path="/c" element={<C />} />
                <Route path="*" element={<Navigate to="/a" />} />
            </Routes>
        </div>
    </HashRouter>;
};
export default App;
```

#### Routes组件

和版本5不同，6中的Route组件不能单独使用，而是必须要放到Routes组件中。简言之Routes就是一个存放Route的容器。

#### Route组件

Route作用和版本5的一样，只是变得更简单了，没有了那么多复杂的属性，并且Route组件必须放到Routes中，当浏览器的地址发生变化时，会自动对Routes中的所有Route进行匹配，匹配到的则显示，其余Route则不再继续匹配。可以将Route当成是一个类似于if语句的东西，路径（path）匹配则其中的组件便会被渲染。

- path —— 要匹配的路径
- element —— 路径匹配后挂载的组件，直接传JSX
- index —— 布尔值，路由是否作为默认组件显示

#### Navigate组件

类似于版本5中的Redirect组件，用来跳转页面，跳转到指定的路由地址：

- 默认：使用push跳转，无法回退
- 设置replace属性：不会新增历史记录，替换现有记录
- to值可以是一个对象：
  - pathname：跳转地址
  - search：问号传参信息

```js
import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
const About = () => {
    return (
        <div>
            <Navigate to="/student/1" replace/>

            <h2>关于我们，其实是四个人</h2>
            <ul>
                <li>刘备</li>
                <li>关羽</li>
                <li>张飞</li>
                <li>赵云</li>
            </ul>
            <Outlet/>
        </div>
    );
};

export default About;
```

#### Outlet组件

> Outlet：路由容器，用来渲染二级/多级路由匹配的内容

Outlet组件用来在父级路由中挂载子路由。在v6中Route组件是可以嵌套的，可以通过嵌套Route来构建出嵌套路由，像这样：

```js
<Route path='/students' element={<StudentList/>}>
    <Route path=':id' element={<Student/>}/>
</Route>
```

上例中，Route嵌套后，如果访问`/students`则会挂载StudentList组件，如果访问`/students/:id`则会自动在StudentList组件中对Student组件进行挂载。在StudentList组件中就可以使用Outlet来引用这些被挂载的组件。

```js
const StudentList = () => {
    return <div>
        学生列表
        <Outlet/>
    </div>
};
```

这样：

```js
<Route path="about" element={<About/>}>
    <Route path="hello" element={<Hello/>}></Route>
    <Route path="abc" element={<Abc/>}></Route>
</Route>
```

```js
import React from 'react';
import {Outlet} from "react-router-dom";

const About = () => {
    return (
        <div>
            <h2>关于我们，其实是四个人</h2>
            <ul>
                <li>刘备</li>
                <li>关羽</li>
                <li>张飞</li>
                <li>赵云</li>
            </ul>

            {/*
                Outlet 用来表示嵌套路由中的组件
                    当嵌套路由中的路径匹配成功了，Outlet则表示嵌套路由中的组件
                    当嵌套路由中的路径没有匹配成功，Outlet就什么都不是
            */}
            <Outlet/>
        </div>
    );
};

export default About;
```

### 路由表&路由懒加载

router/index.js

```javascript
import React, { Suspense } from "react";
import { Route, Routes, useNavigate, useParams, useSearchParams, useLocation, useMatch } from 'react-router-dom';
import routes from "./routes";

// 渲染内容的特殊处理
const Element = function Element(props) {
    let { component: Component, path } = props,
        options = {
            navigate: useNavigate(),
            params: useParams(),
            query: useSearchParams()[0],
            location: useLocation(),
            match: useMatch(path)
        };
    return <Component {...options} />;
};

// 递归创建路由规则
const createRoute = function createRoute(routes) {
    return <>
        {routes.map((item, index) => {
            return <Route key={index} path={item.path} element={<Element {...item} />}>
                // 基于递归方式 绑定子集路由
                {Array.isArray(item.children) ? createRoute(item.children) : null}
            </Route>;
        })}
    </>;
};

// 路由表管控
const RouterView = function RouterView() {
    return <Suspense fallback={<>正在加载中...</>}>
        <Routes>
            {createRoute(routes)}
        </Routes>
    </Suspense>;
};
export default RouterView;
```

router/routes.js

```javascript
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import A from '../views/A';
import aRoutes from './aRoutes';

const routes = [{
    path: '/',
    component: () => <Navigate to="/a" />
}, {
    path: '/a',
    name: 'a',
    component: A,
    meta: {},
    children: aRoutes
}, {
    path: '/b',
    name: 'b',
    component: lazy(() => import('../views/B')),
    meta: {}
}, {
    path: '/c',
    name: 'c',
    component: lazy(() => import('../views/C')),
    meta: {}
}, {
    path: '*',
    component: () => <Navigate to="/a" />
}];
export default routes;
```

router/aRoutes.js

```javascript
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const aRoutes = [{
    path: '/a',
    component: () => <Navigate to="/a/a1" />
}, {
    path: '/a/a1',
    name: 'a-a1',
    component: lazy(() => import('../views/a/A1')),
    meta: {}
}, {
    path: '/a/a2',
    name: 'a-a2',
    component: lazy(() => import('../views/a/A2')),
    meta: {}
}, {
    path: '/a/a3',
    name: 'a-a3',
    component: lazy(() => import('../views/a/A3')),
    meta: {}
}];
export default aRoutes;
```

App.jsx

```javascript
import React from "react";
import { HashRouter } from 'react-router-dom';
import HomeHead from './components/HomeHead';
import RouterView from "./router";

const App = function App() {
    return <HashRouter>
        <HomeHead />
        <div className="content">
            <RouterView />
        </div>
    </HashRouter>;
};

export default App;
```

### useRoutes

App.js

```js
import React from "react";
import { HashRouter,useRoutes} from 'react-router-dom';
import HomeHead from './components/HomeHead';
import A from '../views/A';

const App = function App() {
    const element = useRoutes([{
        path:'/',
        element:<Navigate to="/a" />
    },{
        path:'/a',
        element:<A/>,
        children:[{        
        	path:'/a',
        	element:<Navigate to="/a/a1" />
    	},{
        	path:'/a/a1',
        	element:<A1/>, 
        }]
    }]);
    return <>
            <HomeHead />
    		element;
    </>
};

export default App;
```

index.js中用<HashRouter>将<App/>包起来即可

### 在组件中获取路由对象信息

在v6中，想获取相关信息，只能基于Hook函数处理：

- useLocation —— 获取地址信息 pathname/search/state

- useNavigate —— 获取Navigate对象

  > 取代了useHistory

- useParams —— 获取请求参数

- useSearchParams —— 获取问号传参信息 URLSearchParams

- useMatch —— 检查路径是否匹配某个路由

  > 取代useRouteMatch，这个Hook基于params获取路由路径参数匹配的信息，6中没有

```js
import React from 'react';
import {useLocation, useParams, useMatch, useNavigate} from "react-router-dom";

const STU_DATA = [
    {
        id:1,
        name:'刘备'
    },
    {
        id:2,
        name:'关羽'
    },
    {
        id:3,
        name:'沙和尚'
    },
    {
        id:4,
        name:'唐僧'
    },
];

const Student = () => {
    // 可以使用useParams()来获取参数
    const {id} = useParams();

    const location = useLocation();// 获取当前的地址信息

    // 如果路径匹配，则返回一个对象，不匹配则返回null
    //const match = useMatch("/student/:id");// 用来检查当前url是否匹配某个路由

    // useNavigate获取一个用于条件页面的函数
    const nav = useNavigate();


    const stu = STU_DATA.find(item => item.id === +id);

    const clickHandler = () =>{
        // nav('/about'); // 使用push，会产生历史记录
        nav('/about', {replace: true}); // 使用replace 不会产生新的记录
    };

    return (
        <div>
            <button onClick={clickHandler}>点我一下</button>
            <h2>{stu.id} --- {stu.name}</h2>
        </div>
    );
};

export default Student;
```

总结：

- 函数组件&基于Route配渲染的：可以基于props获取路由信息、也可以自己使用Hook函数获取
- 类组件&基于Route匹配渲染的：只能基于属性获取，或者使用withRouterr自己写的
- 函数组件&不是Route匹配的：可以基于Hook自己处理、也可以使用withRouter
- 类组件&不是Route匹配的：只能使用withRouter

> 【都需要放在<HashRoute>内部】

### 路由跳转&传参

路由跳转方案：

- <Link/><NavLink/> 点击跳转路由

- <Navigate/> 遇到这个组件就会跳转

- 编程式导航

  ```js
  // C组件的路由地址
  <Route path="/c/:id?/:name?" element={<C />} />
  
  /* 跳转及传参 */
  import { useNavigate } from 'react-router-dom';
  const B = function B() {
      const navigate = useNavigate();
      return <div className="box">
          B组件的内容
          <button onClick={() => {
              navigate('/c');
              navigate('/c', { replace: true });
              navigate(-1);
              navigate({
                  pathname: '/c/100/zxt',
                  search: 'id=10&name=zhufeng'
              });
              navigate('/c', { state: { x: 10, y: 20 } });
          }}>按钮</button>
      </div>;
  };
  export default B;
  ```

路由传参方案：

- 问号传参
- 路径传参
- 隐式传参

```javascript
/* 接收信息 */
import { useParams, useSearchParams, useLocation, useMatch } from 'react-router-dom';
const C = function C() {
    
    //获取路径参数信息
    let params = useParams();
    console.log('useParams:', params);

    //获取问号传参信息
    let [search] = useSearchParams();
    search = search.toString();
    console.log('useSearchParams:', search);

    //获取location信息「pathname/serach/state...」
    let location = useLocation();
    // location.search
    console.log('useLocation:', location);

    //获取match信息
    console.log('useMatch:', useMatch(location.pathname));

    navigate('/c',{
        replace:true,
        state:{
            id:100,
            name:'zhufeng'
        }
    })
    // v6中隐式传参传递的信息被保留下来了
    return <div className="box">
        C组件的内容
    </div>;
};
export default C;
```

## 04 应用

### 01 创建案例

主页 不需要权限就能访问的页面 Home.js

```js
import React from 'react';

const Home = () => {
    return (
        <div>
            <h2>这是主页</h2>
            <p>这个页面无需权限任何人都可以访问</p>
        </div>
    );
};

export default Home
```

Profile.js

```js
import React from 'react';

const Profile = () => {
    return (
        <div>
            <h2>用户信息的页面</h2>
            <p>该页面只有在登录后才能查看</p>
        </div>
    );
};

export default Profile;
```

HomePage.js

```js
//一个主页会有很多组件 挂载一个不合适 所以用到route时创建一个pages 把组件整合到一起 
import React from 'react';
import Home from "../components/Home";

const HomePage = () => {
    return (
        <div>
            <Home/>
        </div>
    );
};

export default HomePage;
```

ProfilePage.js

```js
import React from 'react';
import Profile from "../components/Profile";

const ProfilePage = () => {
    return (
        <div>
            <Profile/>
        </div>
    );
};

export default ProfilePage;

```

MainMeun.js

```js
// 菜单页面 
import React from 'react';
import {Link} from "react-router-dom";

const MainMenu = () => {
    return (
        <header>
            <ul>
                <li>
                    <Link to={"/"}>首页</Link>
                </li>
                <li>
                    <Link to={"/profile"}>用户信息</Link>
                </li>
            </ul>
        </header>
    );
};

export default MainMenu;
```

Layout.js

```js
// 网页布局结构
import React from 'react';
import MainMenu from "./MainMenu";

const Layout = props => {
    return (
        <div>
            <MainMenu/>
            <hr/>
            {props.children}  // 路由
        </div>
    );
};

export default Layout;
```

App.js

```js
import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"profile"} element={<ProfilePage/>}/>
            </Routes>
        </Layout>
    );
};

export default App;
```

### 02 创建表单

```js
// 修改App.js
<Route path={"auth-form"} element={<AuthPage/>}/>
// 修改MainMeun.js
<li>
    <Link to={"/auth-form"}>登录/注册</Link>
</li>
```

AuthPage.js

```js
import React from 'react';
import AuthForm from "../components/AuthForm";

const AuthPage = () => {
    return (
        <div>
            <AuthForm/>
        </div>
    );
};

export default AuthPage;
```

AuthForm.js

```js
import React, {useRef, useState} from 'react';

const AuthForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const usernameInp = useRef();
    const pwdInp = useRef();
    const emailInp = useRef();

    const submitHandler = (e) => {
        e.preventDefault(); //取消默认行为
        // 非受控
        // 获取用户输入的内容
        const username = usernameInp.current.value;
        const password = pwdInp.current.value;
        // 处理登录功能
        if(isLoginForm){
            console.log('登录 -->', username, password);
        }else{
            const email = emailInp.current.value;
            console.log('注册 -->', username, password, email);
        }

    };

    return (
        <div>
            <h2>{isLoginForm?"登录":"注册"}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInp} type="text" placeholder={"用户名"}/>
                </div>
                { // 如果是注册
                    !isLoginForm &&
                    <div>
                        <input ref={emailInp} type="email" placeholder={"电子邮件"}/>
                    </div>
                }
                <div>
                    <input ref={pwdInp} type="password" placeholder={"密码"}/>
                </div>
                <div>
                    <button>{isLoginForm?"登录":"注册"}</button>
                    <a href="#" onClick={
                        event => {
                            event.preventDefault();
                            setIsLoginForm(prevState => !prevState);  //切换登陆注册状态
                        }
                    }>
                        {
                            isLoginForm?
                            "没有账号？点击注册":
                            "已有账号？点击登录"}
                    </a>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
```

### 03 完成注册&登录功能

定义api接口

.\store\api\authApi.js

```js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:1337/api/'
    }),
    endpoints(build) {
        return {
            register:build.mutation({
                query(user) {
                    return {
                        url:'auth/local/register',
                        method:"post",
                        body:user, // username password email
                    }
                }
            }),

            //'auth/local' 登录功能的路径
            login:build.mutation({
                query(user) {
                    return {
                        url:'auth/local',
                        method:'post',
                        body:user // identifier
                    }
                }
            }),
        }
    }
});

export const {
    useRegisterMutation
} = authApi;
```

.\store\index.js

```js
import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./api/authApi";
import {setupListeners} from "@reduxjs/toolkit/query";

const store = configureStore({

    reducer:{
        [authApi.reducerPath]:authApi.reducer,
                auth:authSlice.reducer
    },

    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)

});

setupListeners(store.dispatch);

export default store;
```

.\src\index.js 让store生效

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
);
```

AuthForm.js

```js
import React, {useRef, useState} from 'react';
import {useLoginMutation, useRegisterMutation} from "../store/api/authApi";
import {useDispatch} from "react-redux";
import {login} from "../store/reducer/authSlice";
import {useNavigate} from "react-router-dom";

const AuthForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    // 引入注册的api
    const [regFn, {error:regError}] = useRegisterMutation();
    const [loginFn, {error:loginError}] = useLoginMutation();

    const usernameInp = useRef();
    const pwdInp = useRef();
    const emailInp = useRef();

    // 获取dispatch 派发器
    const dispatch = useDispatch();

    // 获取Navigate
    const navigate = useNavigate();
    const location = useLocation();

    // console.log("authForm-->", location.state.preLocation);

    const from = location.state?.preLocation?.pathname || "/";  //?.es11可选链操作符

    const submitHandler = (e) => {
        e.preventDefault();

        // 获取用户输入的内容
        const username = usernameInp.current.value;
        const password = pwdInp.current.value;
        // 处理登录功能
        if(isLoginForm){
            // console.log('登录 -->', username, password);
            loginFn({
                identifier:username,
                password
            }).then(res => {
                if(!res.error){
                    dispatch(login(
                        {
                            token:res.data.jwt,
                            user:res.data.user
                        }
                    ));
                    // 登录成功后，需要向系统中添加一个标识，标记用户的登录状态
                    // 登录状态（布尔值，token(jwt)，用户信息）
                    // 跳转页面到根目录 不能回退
                    navigate("/", {replace:true});
                }
            });
        }else{
            const email = emailInp.current.value;
            //console.log('注册 -->', username, password, email);
            regFn({
                username,
                password,
                email
            }).then(res => {
                if(!res.error){
                    // 注册成功
                    setIsLoginForm(true);
                }
            });
        }

    };

    return (
        <div>
            <p style={{color:'red'}}>
                {regError && "用户名或电子邮件重复"}
            </p>
            <p style={{color:'red'}}>
                {loginError && "用户名或密码错误"}
            </p>


            <h2>{isLoginForm?"登录":"注册"}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInp} type="text" placeholder={"用户名"}/>
                </div>
                {
                    !isLoginForm &&
                    <div>
                        <input ref={emailInp} type="email" placeholder={"电子邮件"}/>
                    </div>
                }
                <div>
                    <input ref={pwdInp} type="password" placeholder={"密码"}/>
                </div>
                <div>
                    <button>{isLoginForm?"登录":"注册"}</button>
                    <a href="#" onClick={
                        event => {
                            event.preventDefault();
                            setIsLoginForm(prevState => !prevState);
                        }
                    }>
                        {
                            isLoginForm?
                            "没有账号？点击注册":
                            "已有账号？点击登录"}
                    </a>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
```

.\store\reducer\authSlice.js 保存登陆状态 并且在.\store\index.js中对reduer进行配置

```js
import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLogged:false,
        token:null,
        user:null
    },
    reducers:{
        login(state, action){
            state.isLogged = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },//AuthForm.js中登录之后调用login方法
        logout(state, action){
            state.isLogged = false;
            state.token = null;
            state.user = null;
        }
    }
});

export const {
    login,
    logout} = authSlice.actions;
```

登录之后可以根据状态做一些判断

MainMenu.js

```js
import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/reducer/authSlice";

const MainMenu = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <header>
            <ul>
                <li>
                    <Link to={"/"}>首页</Link>
                </li>
                {
                    !auth.isLogged && <li>
                        <Link to={"/auth-form"}>登录/注册</Link>
                    </li>
                }

                {
                    auth.isLogged &&
                    <>
                        <li>
                            <Link to={"/profile"}>{auth.user.username}</Link>
                        </li>
                        <li>
                            <Link to={"/"}
                                onClick={()=>dispatch(logout())}
                            >登出</Link>
                        </li>
                    </>
                }

            </ul>
        </header>
    );
};

export default MainMenu;
```

限制登录后才能查看  验证 登陆了访问profile 没登陆重定向到登陆页面 让他登录 

App.js

```js
import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import NeedAuth from "./components/NeedAuth";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./store/reducer/authSlice";
import useAutoLogout from "./hooks/useAutoLogout";


const App = () => {
    useAutoLogout();
    return (
        <Layout>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"profile"} element={<NeedAuth><ProfilePage/></NeedAuth>}/>
                <Route path={"auth-form"} element={<AuthPage/>}/>
            </Routes>
        </Layout>
    );
};

export default App;
```

.\hooks\useAutoLogout.js 把钩子提取出来

```js
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {logout} from "../store/reducer/authSlice";

const useAutoLogout = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // 创建一个useEffect，用来处理登录状态
    useEffect(() => {
        const timeout = auth.expirationTime - Date.now(); //失效时间
        // 判断timeout的值
        if (timeout < 6000) {
            dispatch(logout());
            return;
        }
        const timer = setTimeout(() => {
            dispatch(logout());
        }, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [auth]);
};

export default useAutoLogout;
```

.\components\NeedAuth.js

```js
import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const NeedAuth = props => {
    const auth = useSelector(state => state.auth);
    const location = useLocation();

    return auth.isLogged ?
        props.children :
        <Navigate
            to={"/auth-form"}
            replace
            state={{preLocation: location}} //通过state 向后面的页面传数据
        />;
};

export default NeedAuth;
```

数据持久化 使用本地存储 authSlice.js

```js
import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return {
                isLogged: false,
                token: null, // 服务器发送给我们的token默认有效期为1个月
                user: null,
                expirationTime: 0 // 登录状态失效时间
            };
        }

        return {
            isLogged: true,
            token,
            user: JSON.parse(localStorage.getItem('user')),
            expirationTime: +localStorage.getItem('expirationTime')
        };

    },
    reducers: {
        login(state, action) {
            state.isLogged = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            // 获取当前时间戳
            const currentTime = Date.now();
            // 设置登录的有效时间
            const timeout = 1000 * 60 * 60 * 24 * 7; // 一周
            // const timeout = 10000 // 10s 正在用的时候自动登出吗？

            state.expirationTime = currentTime + timeout; // 设置失效日期

            // 将数据同时存储到本地存储中
            localStorage.setItem('token', state.token);
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem("expirationTime", state.expirationTime + "");
        },
        logout(state, action) {
            state.isLogged = false;
            state.token = null;
            state.user = null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('expirationTime');
        }
    }
});

export const {
    login,
    logout
} = authSlice.actions;
```

### 04 添加数据&添加服务器验证

App.js

```js
import StudentPage from "./pages/StudentPage";
<Routes>
    <Route path={"/"} element={<HomePage/>}/>
    <Route path={"profile"} element={<NeedAuth><ProfilePage/></NeedAuth>}/>
    <Route path={"auth-form"} element={<AuthPage/>}/>
    <Route path={"student"} element={<NeedAuth><StudentPage/></NeedAuth>}/>
</Routes>
```

StudentPage.js

```js
import React from 'react';
import StudentList from "../components/Student/StudentList";

const StudentPage = () => {
    return (
        <div>
            <StudentList/>
        </div>
    );
};

export default StudentPage;
```

StudentList.js

```js
import React from 'react';
import './StudentList.css';
import Student from "./Student";
import StudentForm from "./StudentForm";
import {useGetStudentsQuery} from "../../store/api/studentApi";

const StudentList = (props) => {

    const {data: stus, isSuccess} = useGetStudentsQuery();

    return (
            <table>
                <caption>学生列表</caption>
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>地址</th>
                    <th>操作</th>
                </tr>
                </thead>

                <tbody>

                {isSuccess && stus.map(stu => <Student key={stu.id} stu={stu}/> )}

                </tbody>

                <tfoot>
                    <StudentForm/>
                </tfoot>

            </table>
    );
};

export default StudentList;
```

Student.js

```js
import React, {useCallback, useContext, useState} from 'react';
import StudentForm from "./StudentForm";
import {useDelStudentMutation} from "../../store/api/studentApi";

const Student = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    // 获取删除的钩子，useMutation的钩子返回的是一个数组
    // 数组中有两个东西，第一个是操作的触发器，第二个是结果集
    const [delStudent, {isSuccess}] = useDelStudentMutation();


    const deleteHandler = () => {
        delStudent(props.stu.id);
    };

    const cancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <>
            {(!isEdit && !isSuccess) &&
                <tr>
                    <td>{props.stu.attributes.name}</td>
                    <td>{props.stu.attributes.gender}</td>
                    <td>{props.stu.attributes.age}</td>
                    <td>{props.stu.attributes.address}</td>
                    <td>
                        <button onClick={deleteHandler}>删除</button>
                        <button onClick={() => setIsEdit(true)}>修改</button>
                    </td>
                </tr>
            }

            {
                isSuccess && <tr>
                    <td colSpan="5">
                        数据已删除！
                    </td>
                </tr>
            }

            {isEdit && <StudentForm stuId={props.stu.id} onCancel={cancelEdit}/>}

            {/*{loading && <tr>*/}
            {/*    <td colSpan={5}>正在删除数据...</td>*/}
            {/*</tr>}*/}
            {/*{error && <tr>*/}
            {/*    <td colSpan={5}>删除失败...</td>*/}
            {/*</tr>}*/}
        </>

    );
};

export default Student;
```

StudentForm.js

```js
import React, {useCallback, useContext, useEffect, useState} from 'react';
import './StudentForm.css';
import {useAddStudentMutation, useGetStudentByIdQuery, useUpdateStudentMutation} from "../../store/api/studentApi";

const StudentForm = (props) => {
    // 调用钩子来加载数据
    const {data:stuData, isSuccess, isFetching} = useGetStudentByIdQuery(props.stuId, {
        skip:!props.stuId,
        refetchOnMountOrArgChange:false
    });
    // 用户修改时，表单中的数据是数据库中最新的数据
    const [inputData, setInputData] = useState({
        name: '',
        age: '',
        gender: '男',
        address: ''
    });

    const [addStudent, {isSuccess:isAddSuccess}] = useAddStudentMutation();
    const [updateStudent, {isSuccess:isUpdateSuccess}] = useUpdateStudentMutation();

    // StudentForm一加载，应该去自动的加载最新的学生数据
    // console.log(props.stuId);
    // console.log(isSuccess, stuData);

    useEffect(()=>{
        if(isSuccess){
            setInputData(stuData.attributes);
        }
    }, [isSuccess])

    const nameChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, name: e.target.value}));
    };

    const ageChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, age: +e.target.value}));
    };

    const genderChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, gender: e.target.value}));
    };

    const addressChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, address: e.target.value}));
    };

    const submitHandler = () => {
        addStudent(inputData);
        // 重置数据
        setInputData({
            name: '',
            age: '',
            gender: '男',
            address: ''
        });
    };

    const updateHandler = () => {
        updateStudent({
            id:props.stuId,
            attributes:inputData
        });
        props.onCancel();
    };


    return (
        <>
            <tr className="student-form">
                <td><input
                    onChange={nameChangeHandler}
                    value={inputData.name}
                    type="text"/></td>
                <td>
                    <select
                        onChange={genderChangeHandler}
                        value={inputData.gender}
                    >
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </td>
                <td><input
                    onChange={ageChangeHandler}
                    value={inputData.age}
                    type="text"/></td>
                <td><input
                    onChange={addressChangeHandler}
                    value={inputData.address}
                    type="text"/></td>
                <td>

                    {props.stuId && <>
                        <button onClick={()=>props.onCancel()}>取消</button>
                        <button onClick={updateHandler}>确认</button>
                    </>}
                    {!props.stuId &&
                        <button
                            onClick={submitHandler}
                        >添加
                        </button>
                    }

                </td>
            </tr>
            {/*{loading && <tr>*/}
            {/*    <td colSpan={5}>添加中...</td>*/}
            {/*</tr>}*/}
            {/*{error && <tr>*/}
            {/*    <td colSpan={5}>添加失败</td>*/}
            {/*</tr>}*/}
        </>

    );
};

export default StudentForm;
```

studentapi.js

```js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

// 创建Api对象
//createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi() 需要一个对象作为参数
const studentApi = createApi({
    reducerPath: 'studentApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:1337/api/",
        prepareHeaders:(headers, {getState})=>{
            // 获取用户的token
            const token = getState().auth.token;
            if(token){
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        } // 用来统一设置请求头

    }),// 指定查询的基础信息，发送请求使用的工具
    tagTypes: ['student'], // 用来指定Api中的标签类型
    endpoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents: build.query({
                query() {
                    // 用来指定请求子路径
                    return {
                        url:'students'
                    }

                },
                // transformResponse 用来转换响应数据的格式
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },

                providesTags: [{type: 'student', id: 'LIST'}]
            }),
            getStudentById: build.query({
                query(id) {
                    //http://localhost:1337/api/students/23
                    return `students/${id}`;
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data;
                },
                keepUnusedDataFor: 60, // 设置数据缓存的时间，单位秒 默认60s
                providesTags: (result, error, id) => [{type: 'student', id}]
            }),
            delStudent: build.mutation({
                query(id) {
                    //http://localhost:1337/api/students/4
                    return {
                        // 如果发送的get请求，需要返回一个对象来设置请求的信息
                        url: `students/${id}`,
                        method: 'delete'
                    };
                }
            }),
            addStudent: build.mutation({
                query(stu) {
                    return {
                        url: 'students',
                        method: 'post',
                        body: {data: stu}
                    };
                },
                invalidatesTags: [{type: 'student', id: 'LIST'}]
            }),
            updateStudent: build.mutation({
                query(stu) {
                    return {
                        url: `students/${stu.id}`,
                        method: 'put',
                        body: {data: stu.attributes}
                    };
                },
                invalidatesTags: ((result, error, stu) =>
                    [{type: 'student', id: stu.id}, {type: 'student', id: 'LIST'}])
            }),

        };
    }// endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
});

// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useDelStudentMutation,
    useAddStudentMutation,
    useUpdateStudentMutation
} = studentApi;

export default studentApi;
```

# d10 处理表单

## 01 创建表单

表单是网页中必不可少的组件，本节课我们来看看在React中如何处理表单，首先我们先来创建一个简单的表单组件：

```js
import React from 'react';
const MyForm = () => {
    return (
        <form>
            <div>
                用户名 <input type="text"/>
            </div>
            <div>
                密码 <input type="password"/>
            </div>
            <div>
                电子邮件 <input type="email"/>
            </div>

            <div>
                <button>提交</button>
            </div>
        </form>
    );
};

export default MyForm;
```

首先使用React定义表单和之前传统网页中的表单有一些区别，传统网页中form需要指定action和method两个属性，而表单项也必须要指定name属性，这些属性都是提交表单所必须的。但是在React中定义表单时，这些属性通通都可以不指定，因为React中的表单所有的功能都需要通过代码来控制，包括获取表单值和提交表单，所以这些东西都可以在函数中指定并通过AJAX发送请求，无需直接在表单中设置。

## 02 处理表单数据（双向绑定）

首先我们来研究一下如何获取表单中的用户所填写的内容，要获取用户所填写的内容我们必须要监听表单onChange事件，在表单项发生变化时获取其中的内容，在响应函数中通过事件对象的target.value来获取用户填写的内容。

事件响应函数大概是这个样子：

```js
const nameChangeHandler= e => {
     //e.target.value 表示当前用户输入的值
};
```

然后我们再将该函数设置为input元素的onChange事件的响应函数：

```js
<div>
    用户名 <input type="text" onChange={nameChangeHandler}/>
</div>
```

这样一来当用户输入内容时，nameChangeHandler就会被触发，从而通过e.target.value来获取用户输入的值。通常我们还会为表单项创建一个state用来存储值：

```js
const [inputName, setInputName] = useState(''); 
const nameChangeHandler = e => {
    //e.target.value 表示当前用户输入的值
    setInputName(e.target.value);
 };
```

上例中用户名存储到了变量inputName中，inputName也会设置为对应表单项的value属性值，这样一来当inputName发生变化时，表单项中的内容也会随之改变：

```js
<div>
    用户名 <input type="text" onChange={nameChangeHandler} value={inputName}/>
</div>
```

如此设置后，当用户输入内容后会触发onChange事件从而调用nameChangeHandler函数，在函数内部调用了setInputName设置了用户输入的用户名。

换句话说用户在表单中输入内容会影响到state的值，同时当我们修改state的值时，由于表单项的value属性值指向了state，表单也会随state值一起改变。

这种绑定方式我们称为双向绑定，即表单会改变state，state也可以改变表单，在开发中使用双向绑定的表单项是最佳实践。

那么表单的提交要如何处理呢？表单提交同样需要通过事件来处理，提交表单的事件通过form标签的onSubmit事件来绑定，处理表单的方式因情况而已，但是一定要注意，必须要取消默认行为，否则会触发表单的默认提交行为：

```js
const formSubmitHandler = e => {
    e.preventDefault();
    /*
     * username : inputName
     * password : pwdInput
     * email : inputEmail     
     * */
};
```

为表单绑定事件：

```js
<form onSubmit={formSubmitHandler}>
......
</form>
```

如此我们便有了一个简单的表单案例，完整代码如下：

```js
import React, {useState} from 'react';
const MyForm = () => {
    const [inputName, setInputName] = useState('');
    const [inputPwd, setInputPwd] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const nameChangeHandler = e => {
        setInputName(e.target.value);
    };

    const pwdChangeHandler = e => {
        setInputPwd(e.target.value)
    };

    const emailChangeHandler = e => {
        setInputEmail(e.target.value)
    };

    const formSubmitHandler = e => {
      e.preventDefault();
      /*
      * username : inputName
      * password : pwdInput
      * email : inputEmail
      * */
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <div>
                用户名 <input type="text" onChange={nameChangeHandler} value={inputName}/>
            </div>
            <div>
                密码 <input type="password" onChange={pwdChangeHandler} value={inputPwd}/>
            </div>
            <div>
                电子邮件 <input type="email" onChange={emailChangeHandler} value={inputEmail}/>
            </div>

            <div>
                <button>提交</button>
            </div>
        </form>
    );
};

export default MyForm;
```

在这个案例中，表单的所有功能包括输入、显示、提交全部都由React所处理。这种表单项在React中被称为受控组件，即表单项受React控制。当然也存在有不受控组件，但那种组件使用机会少且需要通过原生DOM去操作表单，并不建议使用，所以这里便不再赘述了。

> 练习

```js
import React, { useState } from 'react';
import Card from "../UI/Card/Card";
import './LogsForm.css';

const LogsForm = () => {
    /*
    *   当表单项发生变化时，获取用户输入的内容
    * */
    // 创建三个变量，用来存储表单中的数据
    // let inputDate = '';
    // let inputDesc = '';
    // let inputTime = 0;

    const [inputDate, setInputDate] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [inputTime, setInputTime] = useState('');

    // 也可以将表单数据统一到一个state中
    /* const [formData, setFormData] = useState({
        inputDate:'',
        inputDesc:'',
        inputTime:''
    });
    // 之后的inputDate、、要改成formData.inputDate、、
*/
    
    // 创建一个响应函数，监听日期的变化
    const dateChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）
        // console.log(e.target.value);
        setInputDate(e.target.value);
        
        /* setFormData({
            ...formData,
            inputDate: e.target.value
        });
        */
    };

    // 监听内容的变化
    const descChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）
        //console.log(e.target.value);
        setInputDesc(e.target.value);
    };

    //监听时长的变化
    const timeChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）
        //console.log(e.target.value);
        setInputTime(e.target.value);
    };

    // 当表单提交时，汇总表单中的数据
    /*
    *   在React中，通常表单不需要自行提交
    *       而是要通过React提交
    * */
    const formSubmitHandler = (e) => {
        // 取消表单的默认行为
        e.preventDefault();
        // 获取表单项中的数据日期、内容、时长
        // 将数据拼装为一个对象
        const newLog = {
            date: new Date(inputDate),
            desc: inputDesc,
            time: +inputTime
        };

        // 清空表单项
        setInputDate('');
        setInputDesc('');
        setInputTime('');

        console.log(newLog);

        /*
        *   提交表单后如何清空表单中的旧数据
        *       现在这种表单，在React我们称为非受控组件
        *
        *   我们可以将表单中的数据存储到state中，
        *       然后将state设置为表单项value值，
        *       这样当表单项发生变化，state会随之变化，
        *       反之，state发生变化，表单项也会跟着改变，这种操作我们就称为双向绑定
        *       这样一来，表单就成为了一个受控组件
        * */

    };

    return (
        <Card className="logs-form">
            <form onSubmit={formSubmitHandler}>
                <div className="form-item">
                    <label htmlFor="date">日期</label>
                    <input onChange={dateChangeHandler} value={inputDate} id="date" type="date" />
                </div>
                <div className="form-item">
                    <label htmlFor="desc">内容</label>
                    <input onChange={descChangeHandler} value={inputDesc} id="desc" type="text" />
                </div>
                <div className="form-item">
                    <label htmlFor="time">时长</label>
                    <input onChange={timeChangeHandler} value={inputTime} id="time" type="number" />
                </div>
                <div className="form-btn">
                    <button>添加</button>
                </div>
            </form>
        </Card>
    );
};

export default LogsForm;
```

## 03 添加日志

> - state提升——一个数据需要被多个组件使用时，将数据放入到这些组件最近的共同的祖先元素中
> - 把子组件数据传给父组件——通过父组件传一个回调函数 调用这个回调函数 适用于简单场景

```js
// LogForm.js 
// 当要添加新的日志时，调用父组件传递过来的函数，就将LogsForm中的数据传递给了App组件
props.onSaveLog(newLog);
```

```js
// Logs.js 
/*
    *   logsData 用来存储学习的日志，
    *       这个数据除了当前组件Logs需要使用外，LogsForm也需要使用
    *       当遇到一个数据需要被多个组件使用时，我们可以将数据放入到这些组件共同的祖先元素中
    *       这样就可以使得多个组件都能方便的访问到这个数据
    *
    *   state的提升
    *
    * */
const Logs = (props) => {
    // 将数据放入JSX中  在Logs.js通过props访问 现在数据就提出来了
    const logItemDate = props.logsData.map(item => <LogItem 
                                           key={item.id} 
										date={item.date} 
										desc={item.desc}                                                      						time={item.time}/>);
    return <Card className="logs">
        {
            logItemDate
            // logsData.map(item => <LogItem {...item}/> )
        }
    </Card>
};
```

```js
// App.js
/*
*   LogsData已经传给了App.js之后下一步：
*   将LogsForm中的数据传递给App组件，然后App组件，将新的日志添加到数组LogData中！
*/
const [logsData, setLogsData] = useState([...])

// 定义一个函数 
const saveLogHandler = (newLog) => {
    // 向新的日志中添加id
    newLog.id = Date.now() + '';  // 时间戳转字符串
    // console.log('App.js -->',newLog); 父组件通过props向子组件传了个回调函数saveLogHandler 当子组件获取到了数据的时候 就调用这个回调函数 把数据传给了父组件
    
    // 将新的数据添加到数组中 数据应该存在state中 才能添加之后就重新渲染
    // logsData.push(newLog);
    setLogsData([newLog, ...logsData]); //把新数组加后面

};

return <div className="app">
    {/*引入LogsFrom*/}
    <LogsForm onSaveLog={saveLogHandler}/>   
    <Logs logsData={logsData}/>  //数据通过属性传 LogsData已经传给了App.js
</div>;
};

// 导出App
export default App;
```

## 04 删除日志

```js
// LogItem.js
// 删除item的响应函数
const deleteItemHandler = () => {
// 临时性 后面要自定义一个
const isDel = window.confirm('该操作不可恢复，确认吗？');
if (isDel){
    // 删除当前的item，要删除item，其实就是要从数据的state移除指定的数据 数据在App.js中

    // console.log(props.onDelLog);
    //props.onDelLog(props.logIndex);//LogItem其实不需要index Logs.js封好 这里就不用传index了
    props.onDelLog();  
}
};

return (
    <Card className="item">
        <MyDate date={props.date}/>
        {/* 日志内容的容器 */}
        <div className="content">
            {/*
              如果将组件中的数据全部写死，将会导致组件无法动态设置，不具有使用价值
                我们希望组件数据可以由外部设置，在组件间，父组件可以通过props（属性）向子组件传递数据
            */}
            <h2 className="desc">{props.desc}</h2>
            <div className="time">{props.time}分钟</div>
        </div>

    {/*    添加一个删除按钮*/}
         <div>
             <div onClick={deleteItemHandler} className='delete'>×</div>
         </div>
    </Card>
);
};


export default LogItem;
```

```js
// App.js
// 定义一个函数，从数据中删除一条日志 根据索引删 
const delLogByIndex = (index) => {
    setLogsData(prevState => {
        const newLog = [...prevState]; //浅复制
        newLog.splice(index, 1); //删一个
        return newLog;
    });
};// 需要传给LogItem 中间隔着Logs

// 定义一个函数，从数据中删除一条日志 根据id删
const delLogById = (id) => {
    setLogsData(prevState => {
        return prevState.filter(item => item.id !== id);
    });
};

return <div className="app">
    {/*引入LogsFrom*/}
    <LogsForm onSaveLog={saveLogHandler}/>
    <Logs logsData={logsData} onDelLog={delLogById}/>   //所以函数先传给Logs
</div>;
```

```js
// Logs.js 把函数再传给LogItem
// 将数据放入JSX中
const logItemDate = props.logsData.map((item, index) => <LogItem
                                                 onDelLog={()=>props.onDelLog(index)} 
													//把index闭包闭到函数里
                                                 key={item.id}
                                                 date={item.date}
                                                 desc={item.desc}
                                                 time={item.time}/>);
// 将数据放入JSX中
let logItemData = filterData.map(
    (item, index) => <LogItem
        onDelLog={() => props.onDelLog(item.id)}
        key={item.id}
        date={item.date}
        desc={item.desc}
        time={item.time}/>
);
```

## 05 空列表提示

```js
// 加一个判断
if (logItemData.length === 0) {
logItemData = <p className="no-logs">没要找到日志！</p>;
}

return <Card className="logs">
{
    logItemData
    // logItemData.length !== 0 ? logItemData : <p className="no-logs">没要找到日志！</p>
    // logsData.map(item => <LogItem {...item}/> )
}
</Card>
```

## 06 自定义模态窗口

```js
// confirmModal.js 先把这个窗口做出来
import './ComfirmModal.css';
import Card from "../Card/Card";
import BackDrop from "../BackDrop/BackDrop";

const ConfirmModal = props => {
    return <BackDrop> //把模态框放到遮罩层里面
        <Card className="confirmModal">
            <div className="confirmText">  
                <p>{props.confirmText}</p> 
                   // 这个信息应该用组件穿过来 不要写死
            </div>
            <div className="confirmButton">
                <button onClick={props.onOk} className="okButton">确认</button>
                <button onClick={props.onCancel}>取消</button>
                       // 点击取消 触发onClick事件 事件去调用onCancel这个回调函数
            </div>
        </Card>;
    </BackDrop>

};

export default ConfirmModal;
// 用到LogItem
```

```js
// LogItem.js 显示这个窗口
const LogItem = (props) => {
    // 添加一个state，记录是否显示确认窗口
    // 删除item的响应函数
    const deleteItemHandler = () => {
    // 显示确认窗口
        setShowConfirm(true);
    };

    //取消函数
    const cancelHandler = () => {
        setShowConfirm(false);
    };

    // 确认函数
    const okHandler = () => {
        props.onDelLog();
    };
     return (
        <Card className="item">

            {showConfirm && <ConfirmModal
                confirmText="该操作不可恢复！请确认"
                onCancel={cancelHandler} //分别给两个按钮绑定响应函数
                onOk={okHandler}
            />}
        </Card>
    );
};

export default LogItem;
```

```js
// 当弹出这个窗口的时候 应该把下面的遮起来 使其无法操作
// BackDrop.js 
import React from 'react';
import './BackDrop.css';

const BackDrop = (props) => {
    return (
        <div className="backDrop">
            {props.children}  //把组件的子元素放到遮罩层里面 才能正常显示
        </div>
    );
};

export default BackDrop;
```

## 07 portal

在React中，父组件引入子组件后，子组件会直接在父组件内部渲染。换句话说，React元素中的子组件，在DOM中，也会是其父组件对应DOM的后代元素。但是，在有些场景下如果将子组件直接渲染为父组件的后代，在网页显示时会出现一些问题。（组件默认会作为父组件的后代渲染到页面中）

比如，需要在React中添加一个会盖住其他元素的Backdrop组件，Backdrop显示后，页面中所有的元素都会被遮盖。很显然这里需要用到定位，但是如果将遮罩层直接在当前组件中渲染的话，遮罩层会成为当前组件的后代元素。如果此时，当前元素后边的兄弟元素中有开启定位的情况出现，且层级不低于当前元素时，便会出现盖住遮罩层的情况。（现在模态框是作为LogItem子元素出现的）

遮罩层的作用，是用来盖住其他元素的，它本就不该作为LogItem子的子元素出现，作为子元素了，就难免会出现类似问题。所以我们需要在LogItem子中使用遮罩，但是又不能使他成为LogItem子的子元素。怎么办呢？

React为我们提供了一个“传送门”可以将元素传送到指定的位置上。

通过ReactDOM中的createPortal()方法，可以在渲染元素时将元素渲染到网页中的指定位置。这个方法就和他的名字一样，给React元素开启了一个传送门，让它可以去到它应该去的地方。

Portal的用法：

- 在index.html中添加一个新的元素

- 在组件中通过ReactDOM.createPortal()将元素渲染到新建的元素中

- 参数：

  - jsx（修改前return后的代码）

  - 目标位置（DOM元素）

```html
// 在index.html中添加新元素：
<div id="backdrop"></div>
```

```js
//修改Backdrop组件：
import React from 'react';
import './Backdrop.css';
import ReactDOM from "react-dom";

const backdropDOM = document.getElementById('backdrop');  //获取backdrop根元素
const Backdrop = (props) => {
    return ReactDOM.createPortal(
    <div className="backdrop">
    {props.children}
    </div>, backdropRoot);
//ReactDOM.createPortal(传谁,目标位置)
};

export default Backdrop;
```

## 08 过滤日志

```js
// LogFilter.js
import React from 'react';
const LogFilter = props => {
    // 创建监听change事件的响应函数
    const changeHandler = e => {
        props.onYearChange(+e.target.value);  
    };

    return (
        <div>
            年份：<select onChange={changeHandler} value={props.year}>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
        </select>
        </div>
    );
};

export default LogFilter;
```

```js
// Logs.js
/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import Card from "../UI/Card/Card";
import './Logs.css';
import LogFilter from "./LogFilter/LogFilter";
import {useState} from "react";

const Logs = (props) => {

    // 创建一个存储年份的state
    const [year, setYear] = useState(2022);

    // 先过滤数据，只显示某一年的数据
    let filterData = props.logsData.filter(item => item.date.getFullYear() === year);

    // 创建一个修改年份的函数
    const changeYearHandler = (year) => {
        setYear(year);  // 调这个方法改年份
    };

    // 将数据放入JSX中 现在显示的应该是filterData里面的数据
    let logItemData = filterData.map(
        (item, index) => <LogItem
            onDelLog={() => props.onDelLog(item.id)}
            key={item.id}
            date={item.date}
            desc={item.desc}
            time={item.time}/>
    );

    return <Card className="logs">
        {/*引入年份的选择组件*/}
        <LogFilter
            year={year}
            onYearChange={changeYearHandler} //属性名={函数名} 访问的时候得通过属性名访问
        />
        {logItemData}
    </Card>
};

export default Logs;
```

# d11 增删改查

## 01 数据加载

### .1 使用fetch

```js
import React, {useEffect, useState} from 'react';
import StudentList from "./components/StudentList";
import './App.css';

const App = () => {

    const [stuData, setStuData] = useState([]);
    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);
    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    /*
    *   将写死的数据替换为从接口 http://localhost:1337/api/students中加载的数据
    *
    *   组件初始化时需要向服务器发送请求来加载数据
    * */
    useEffect(() => {
        //设置loading为true
        setLoading(true);
        // 重置错误
        setError(null);

        // 在effect中加载数据
        // fetch() 用来向服务器发送请求加载数据，是Ajax的升级版
        // 它需要两个参数：1.请求地址 2.请求信息
        fetch('http://localhost:1337/api/students')
            .then((res) => {
                // 判断是否正常返回响应信息
                if(res.ok){
                    // response表示响应信息
                    // console.log(res);
                    return res.json();// 该方法可以将响应的json直接转换为js对象
                }

                // 抛出一个错误
                throw new Error('数据加载失败！');
            })
            .then(data => {
                // 将加载到的数据设置到state中
                setStuData(data.data);

                // 数据加载完毕设置loading为false
                setLoading(false);
            })
            .catch((e) => {
                // catch中的回调函数，用来统一处理错误
                // catch一执行，说明上述代码出错了
                // 代码运行到这里，说明没有成功加载到数据
                setLoading(false);
                // 设置错误状态
                setError(e);
            });

    }, []);

    return (
        <div className="app">
            {(!loading && !error) && <StudentList stus={stuData}/>}
            {loading && <p>数据正在加载中...</p>}
            {error && <p>数据加载异常！</p>}
        </div>
    );
};

export default App;
```

### .2 使用await

```js
import React, { useCallback, useEffect, useState } from 'react';
import StudentList from "./components/StudentList";
import './App.css';
import StuContext from "./store/StuContext";

const App = () => {

    const [stuData, setStuData] = useState([]);

    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);

    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/students');
            //判断请求是否加载成功
            if (res.ok) {
                const data = await res.json();
                setStuData(data.data);
            } else {
                throw new Error('数据加载失败！');
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        //这里面不能传异步函数 赋值给变量 再调用
        fetchData();
    }, []);

    const loadDataHandler = () => {
        fetchData();
    };

    return (
        <StuContext.Provider value={{ fetchData }}>
            <div className="app">
                <button onClick={loadDataHandler}>加载数据</button>
                {(!loading && !error) && <StudentList stus={stuData} />}
                {loading && <p>数据正在加载中...</p>}
                {error && <p>数据加载异常！</p>}
            </div>
        </StuContext.Provider>

    );
};

export default App;
```

## 02 删除数据

```js
import React, {useCallback, useContext, useState} from 'react';
import StuContext from "../store/StuContext";

const Student = (props) => {
    // {stu:{name, age, gender, address}} = props
    // props {stu:{id:xxx, attributes:{name:xxx, age:xxx}}}
    // 解构 {stu:{id, attributes:{name, age, gender, address}}}
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ctx = useContext(StuContext);

    const delStu = useCallback(async ()=>{
            try{
                setLoading(true);
                setError(null);
                const res = await              fetch(`http://localhost:1337/api/students/${props.stu.id}`,{
                    method:'delete'
                });

                // 判断是否成功
                if(!res.ok){
                    throw new Error('删除失败！');
                }

                // const data = await res.json(); // 被删除的学生
                // 修改成功后，需要触发列表刷新
                ctx.fetchData();
            }catch (e){
                setError(e);
            }finally {
                setLoading(false);
            }

        },[]);


    const deleteHandler = () => {
        // 删除学生
        // http://localhost:1337/api/students/4
        // props.stu.id
        delStu();

    };

    return (
        <>
        <tr>
            <td>{props.stu.attributes.name}</td>
            <td>{props.stu.attributes.gender}</td>
            <td>{props.stu.attributes.age}</td>
            <td>{props.stu.attributes.address}</td>
            <td>
                <button onClick={deleteHandler}>删除</button>
            </td>
        </tr>

            {loading && <tr>
                <td colSpan={5}>正在删除数据...</td>
            </tr>}
            {error && <tr>
                <td colSpan={5}>删除失败...</td>
            </tr>}
        </>

    );
};

export default Student;
```

StuContext.js

```js
import React from "react";

const StuContext = React.createContext({
    fetchData: () => {
    }
});

export default StuContext;
```

## 03 增加数据

StudentList.js

```js
import React from 'react';
import Student from "./Student";
import './StudentList.css';
import StudentForm from "./StudentForm";

const StudentList = (props) => {
    return (
            <table>
                <caption>学生列表</caption>
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>地址</th>
                    <th>操作</th>
                </tr>
                </thead>

                <tbody>

                {props.stus.map(stu => <Student key={stu.id} stu={stu}/> )}

                </tbody>

                <tfoot>
                    <StudentForm/>
                </tfoot>

            </table>
    );
};

export default StudentList;
```

StudentForm.js

- 添加表单
- 用户输入数据传到数据库中

```js
import React, {useCallback, useContext, useState} from 'react';
import './StudentForm.css';
import StuContext from "../store/StuContext";

const StudentForm = () => {
    const [inputData, setInputData] = useState({
        name: '',
        age: '',
        gender: '男',
        address: ''
    });

    const ctx = useContext(StuContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 创建一个添加学生的方法
    const addStudent = useCallback(async (newStu)=>{
        try{
            setLoading(true);
            setError(null);
            //http://localhost:1337/api/students
            const res = await fetch('http://localhost:1337/api/students', {
                method:'post',
                body:JSON.stringify({data:newStu}), //转成json格式
                headers:{
                    "Content-type":"application/json"
                }
            });

            if(!res.ok){
                throw new Error('添加失败！');
            }

            // 添加成功，刷新列表
            ctx.fetchData();
        }catch (e){
            console.log(e);
            setError(e);
        }finally {
            setLoading(false);
        }
    }, []); //如果前面使用inputdata 这里没设置依赖 就收不到数据

    const nameChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, name: e.target.value}));
    };

    const ageChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, age: +e.target.value})); //转换类型
    };

    const genderChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, gender: e.target.value}));
    };

    const addressChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, address: e.target.value}));
    };

    const submitHandler = () => {
        //console.log(inputData);
        addStudent(inputData);
    };

    return (
        <>
        <tr className="student-form">
            <td><input
                onChange={nameChangeHandler}
                value={inputData.name}
                type="text"/></td>
            <td>
                <select
                    onChange={genderChangeHandler}
                    value={inputData.gender}
                >
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </td>
            <td><input
                onChange={ageChangeHandler}
                value={inputData.age}
                type="text"/></td>
            <td><input
                onChange={addressChangeHandler}
                value={inputData.address}
                type="text"/></td>
            <td>
                <button
                    onClick={submitHandler}
                >添加
                </button>
            </td>
        </tr>
            {loading && <tr><td colSpan={5}>添加中...</td></tr>}
            {error && <tr><td colSpan={5}>添加失败</td></tr>}
        </>

    );
};

export default StudentForm;
```

## 04 修改数据

student.js

```js
import React, {useCallback, useContext, useState} from 'react';
import StuContext from "../store/StuContext";
import StudentForm from "./StudentForm";

const Student = (props) => {
    // {stu:{name, age, gender, address}} = props
    // props {stu:{id:xxx, attributes:{name:xxx, age:xxx}}}
    // {stu:{id, attributes:{name, age, gender, address}}}
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const ctx = useContext(StuContext);
    
    // 取消编辑
    const cancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <>
        //不是编辑状态 显示这个
            {!isEdit && 
                <tr>
                    <td>{props.stu.attributes.name}</td>
                    <td>{props.stu.attributes.gender}</td>
                    <td>{props.stu.attributes.age}</td>
                    <td>{props.stu.attributes.address}</td>
                    <td>
                        <button onClick={deleteHandler}>删除</button>
                        <button onClick={() => setIsEdit(true)}>修改</button>

                    </td>
                </tr>
            }
//编辑状态 显示StudentForm 不应该显示空白 把这个学生数据也传过来 所以studentForm要用props拿到这个数据
            {isEdit && <StudentForm stu={props.stu} onCancel={cancelEdit}/>}

            {loading && <tr>
                <td colSpan={5}>正在删除数据...</td>
            </tr>}
            {error && <tr>
                <td colSpan={5}>删除失败...</td>
            </tr>}
        </>
    );
};

export default Student;
```

studentForm.js

```js
import React, {useCallback, useContext, useState} from 'react';
import './StudentForm.css';
import StuContext from "../store/StuContext";

const StudentForm = (props) => {
    const [inputData, setInputData] = useState({
        name: props.stu ? props.stu.attributes.name : '',
        age: props.stu ? props.stu.attributes.age : '',
        gender: props.stu ? props.stu.attributes.gender : '男',
        address: props.stu ? props.stu.attributes.address : ''
    });

    const ctx = useContext(StuContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // 创建一个修改数据的方法
    const updateStudent = useCallback(async (id, newStu)=>{
        try {
            setError(null);
            setLoading(true);
            const res = await fetch(`http://localhost:1337/api/students/${id}`,{
                method:'put',
                body:JSON.stringify({data:newStu}),
                headers:{
                    "Content-type":'application/json'
                }
            });

            if(!res.ok){
                throw new Error('修改失败！');
            }

            ctx.fetchData();
        }catch (e){
            setError(e);
        }finally {
            setLoading(false);
        }

    }, []);

    const nameChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, name: e.target.value}));
    };

    const ageChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, age: +e.target.value}));
    };

    const genderChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, gender: e.target.value}));
    };

    const addressChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, address: e.target.value}));
    };

    const submitHandler = () => {
        //console.log(inputData);
        addStudent(inputData);
    };


    return (
        <>
            <tr className="student-form">
                <td><input
                    onChange={nameChangeHandler}
                    value={inputData.name}
                    type="text"/></td>
                <td>
                    <select
                        onChange={genderChangeHandler}
                        value={inputData.gender}
                    >
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </td>
                <td><input
                    onChange={ageChangeHandler}
                    value={inputData.age}
                    type="text"/></td>
                <td><input
                    onChange={addressChangeHandler}
                    value={inputData.address}
                    type="text"/></td>
                <td>
                  // 如果有stu 修改状态下 就显示这两个按钮
                    {props.stu && <>
                        <button onClick={()=>props.onCancel()}>取消</button>
                        <button>确认</button>
                    </>}
                    {!props.stu &&
                        <button
                            onClick={submitHandler}
                        >添加
                        </button>
                    }

                </td>
            </tr>
            {loading && <tr>
                <td colSpan={5}>添加中...</td>
            </tr>}
            {error && <tr>
                <td colSpan={5}>添加失败</td>
            </tr>}
        </>

    );
};

export default StudentForm;
```

# d12 Strapi（服务器搭建）

前边课程中，我们React中的所有数据都是自己在代码中定义的静态数据。显然，真实开发中数据都需要从服务器中加载，所以在后续课程我们要开始学习如何在React中加载服务器中的数据。于是问题出现了，我们还没有服务器啊？难道要现写一个吗？写一个也不是不可以，但却有一点点麻烦，所以这节课我们来介绍一个为我们一个工具——Strapi，它可以帮助我们方便快捷的搭建起一个供我们使用的API服务器。

## 01 简介

Strapi是什么？官网是这么描述的“Strapi是完全使用JavaScript开发的，开源无头内容管理系统”，对于第一次接触它的同学会感觉莫名其妙，“无头内容管理系统”，什么玩意？简单来说，Strapi就是一个API的管理系统，通过Strapi我们可以直接以网页的形式去定义自己的API、包括设置模型、权限等功能。有了Strapi我们无需编写代码便可开发出功能强大的API。

## 02 创建项目

Strapi项目的创建和React项目类似，它也为我们提供了一个工具，可以快速的创建项目。首先进入到要存放项目的目录然后执行一下命令：

npm

```
npx create-strapi-app@latest server- --quickstart
npm install strapi
npx run develop
```

yarn

```
yarn create strapi-app server- --quickstart
yarn develop
```

项目创建后会自动启动，浏览器会自动打开链接地址：http://localhost:1337/admin，由于是第一次启动项目，所以会弹出一个注册窗口，这里需要注册一个新的管理员账号。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516153140474.png)

对于我们来说API服务器仅仅会运行在本地服务器中，所以账号什么的其实没那么重要，随意注册一个即可。注册完成后，点击Let’s start即可进入到项目页面。

## 03 配置语言

注册后，我们暂时先不急着查看项目的页面。因为项目的语言默认是英文的，我们需要先经过一些配置开启中文的支持。首先，在命令行中通过`ctrl+c`停止项目的运行，如果`ctrl+c`不能正常关闭服务器的话，你还需要在任务管理器中找到`node.js`的进程并将其结束。然后，在项目的根目录中找到`/src/admin/admin.example.js`。接着，在当前目录中对该文件进行复制名重命名为`admin.js`并修改其中代码：

```
export default {
  config: {
    locales: [
      'zh-Hans',
    ],
  },
  bootstrap(app) {
    console.log(app);
  },
};
```

然后在命令行中，进入项目目录执行如下命令`npm run build`或`yarn build`，重新对项目就构建。执行完毕后调用`npm start develop`或`yarn develop`启动项目。

再次进入项目后，点击管理界面的做下角，你的用户名的地方且选中Profile选项来进入配置页面：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516154519471.png)

在配置页面的最下方Inteface language中选中“中文(简体)”，点击save即可将语言设置为简体中文。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516154604626.png)

虽然，设置了简体中文，但是翻译并不是那么的彻底有些地方并没有完全翻译，但是还好并不影响我们的使用。

## 04 添加内容类型

Strapi是一个内容管理系统，何为内容呢？其实就是数据库中的数据类型。比如，一个用户信息就是一个内容、一件商品的信息也是一个内容，所以要想使用API需要先添加一个新的内容类型、然后再对齐添加对应的数据，最后才能够通过API访问到这些数据。下边我们尝试着添加一个新的类型students，用来存储学生的信息。

点击左侧导航栏中的Content-Type Builder，这是Strapi中的内容类型构建器，点击它可以进入类型定义的界面。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516161232525.png)

点击创建一个新的Content Type进入到定义界面

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516161346751.png)

在弹出的窗口中设置类型的名称，由于是学生信息所以命名为student，注意编写单数即可，Strapi会自动生成复数。填写后点击Continue。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516161426917.png)

接下来会进入到字段的定义界面，该界面用来定义一个类型中需要包含哪些数据：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516161647586.png)

学生我们要设置4个字段，分别为姓名（文本）、性别（文本）、年龄（数字类型）和地址（文本类型），我们一个一个的添加。

姓名：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516162411780.png)

性别：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516162822469.png)

年龄和地址：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516163450219.png)

添加完成后，点击右上角的Save按钮保存操作，点击save后服务器会自动重启，稍等即可。

## 05 添加数据

创建类型后，点击左上角的Content Manager来向系统中添加学生信息：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516163733988.png)

选中student，然后点击添加条目，尝试添加几条数据

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516163801258-1024x562.png)

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516163845649-1024x264.png)

保存后，点击发布按钮，数据才能正常访问，也可以在内容类型中设置自动发布。添加完成后列表中有如下的学生信息：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516164113122-1024x195.png)

添加内容类型实际上相当于数据库的建表，添加数据相当于向数据库中插入数据，我们的操作在Strapi中实际上也会转换为对数据库的操作。

## 06 设置API权限

数据设置完了，我们还需要开发API的访问权限，分别点击settings –> roles –> public

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516170117749.png)

public中设置的是公共访问API的权限，也就是无需登录即可访问。然后选中student，开始设置student的权限，这里我设置了student的所有权限，实际开发中，可以根据实际情况设置。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516170307522.png)create表示创建，delete表示删除，find表示查询，findOne查询指定，update修改。设置权限后点击save即可正常开始使用API了。

## 07 测试

查询功能可以直接通过浏览器测试，查询API的路径为`/api/students`使用时还需要添加上服务器的路径即`http://localhost:1337/api/students`，直接在浏览器中访问该地址，如果API设置成功，应当可以看到JSON格式的数据。

创建需要发送post请求，删除需要发送delete请求，修改需要发送put请求，这些请求可以通过postman操作。

创建：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516172142493-1024x785.png)

删除：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516172252853.png)

修改：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220516172533931.png)

## 08 总结

Strapi的使用起来并不复杂，大体步骤如下：

1. 创建项目
2. 注册用户
3. 修改语言
4. 创建内容类型
5. 添加数据
6. 设置权限

当然我们现在使用它的主要目的并不是将它使用到生产环境中，而是让它为我们测试React提供接口，所以它更多的功能我们暂且先放到一边，后边的课程中，我们会根据需要在对Strapi的相关知识进行扩充。

# d13 其他

## 01 HOC高阶组件

React高阶组件：利用JS中的闭包 [柯理化函数] 实现组件代理

可以在代理组件中，经过业务逻辑的处理，获取一些信息，最后基于属性等方案，传递给我们最终要渲染的组件

> 大函数执行返回小函数

```js
import React from "react"
const Demo = function Demo(props) {
    console.log('Demo中的属性:，props);
    return <div className="demo">
                我是DEMO
	</div>;
     };
// 执行ProxyTest方法，传递一个组件进来 
ComponentJconst ProxyTest = function ProxyTest(Component) {
    // Component->Demo
	return function HOC(props) {
	// console.log(props); //=>{x:10,y:20,enable:true]
    // 真实要染的是Demo组件: 把获取的props要传递给Demo
    /* 
    let [ x,y, enable } = props;
    return <Component x={x} y=fy} enable=fenable} />; */
	return <Component {...props} />;

    export default ProxyTest(Demo);
// 把函数执行的返回结果 [应该是一个组件]，基于ES6Module规范导出，供App导入使用
// 当前案例中，我们导出的是HOC [HOC: higher-order-componentsJ
```

## 02 DOM-DIFF算法

目的：尽可能保证最少的更新和渲染，尽可能使用旧的节点进行渲染

优化原则：

- 同级对比

- 深度优先原则
- 不同类型的元素，会产生不同的元素：销毁就结构，创建新结构
- 可以通过key标识移动的元素：如果不设置key，则默认元素的索引是key

处理原则：

- key和类型都相同：更新且复用旧节点
- key和类型有不同：删除旧的（8）、插入新的 Placement（2）、插入并更新，也就是挪动位置 PlacementAndUpdate（6）

> 把第一次渲染完毕的真实DOM，创建成Fiber链表格式 -> 旧节点
>
> 2秒后，按照最新的数据，创建出全套新的virtual DOM -> 新节点

具体的处理步骤：

> 第一轮主要处理节点的更新，第二轮主要处理节点的新增、删除和移动，移动时的原则时尽量少量的移动，如果必须有一个移动，新地位高的不动、低的动，key不同，推出第一轮循环。

第一轮循环：遍历Fiber链表，去virtualDOM 中找相同位置的新节点，进行对比【不是按照 key比，按照位置比】，对比的时候，先看key：

+ key一样：

  再看标签名和内容：

  ​				标签一样，内容也一样，则复用旧节点，啥都不处理

  ​				标签一样，内容不一样，则把旧节点标记为 4 【更新】

  ​				标签不一样，则旧节点标记8【删除】，新节点标记为 2【新增】

+ key不一样：直接跳出第一轮循环

第二轮循环：遍历virtualDOM，但是在遍历之前，会根据Fiber 链表，创建出Map 查找映射表，从virtualDOM的第一个节点开始遍历，第一轮循环处理过的可以不用管了，没处理过的则去Map 映射表中找到“相同key”的旧节点进行对比 ===>第二轮是遍历virtualDOM，按照key进行比较

> 查找映射表 Map ={ A:旧节点A，B:1旧节点B} 以key做为属性名，以旧节点作为属性值

如果找到相同key的旧节点：

+ 先对比标签和内容

+ 然后拿旧节点的权重值(旧索引值) 再和全局的最高权重值 (lastPlacedindex) 进行比较，来决定位置是否挪动

  > 旧索引：N     全局：M

  N>=M 一> 位置不变，让M=N

  N<M 一> 要挪动旧节点的位置了，标记为6，并且记录挪到哪 (一般都是上一个处理的节点后面)

如果找不到相同key的旧节点：说明此新节点是需要新增的，标记为 2

第二轮结束后，把没有比较过的旧节点，标记为 8

经过DOM-DIFF算法对比后，得到：需要删除的、需要更新的或者复用的、需要挪动位置且更新的、需要新增的

处理顺序：8 4 6 2

> 如果组件更新后，节点的 key值和节点所在的“顺序”没有变化过，只需要经过第一轮循环，就可以分析出：节点的更新规则，这种情况DOM-DIFF计算的性能也会提高。

循环创建的元素需要设置唯一的key，不建议使用索引，使用索引做key，如果一旦遇到：位置挪动、删除、新增，之前元素的索引都会改变，很难实现旧地复用，基本都是新的内容替换旧的内容来实现更新，所以应该使用不会因为位置变化而变化的key

# d14 Mobx

## Object.defineProperty

> 对象的规则限制：冻结、密封、扩展。

对象中的每一个成员，也有相关的规则限制：

+ Object.getOwnPropertyDescriptor(对象，成员)：获取对象中某个成员的规则
+ Object.getOwnPropertyDescriptors(对象)：获取对象中所有成员的规则
+ 规则：
  + configureable：是否可以删除
  + writable：是否可以更改
  + enumerable：是否可以枚举（能被for/in或者Object.keys列举出来的属性是可枚举的）
  + value：成员值

Object.defineProperty(obj,key,descriptors)

- 设置对象中某个成员的规则
  - 如果成员已经存在，即修改其规则
  - 如果不存在，则新增这个成员，并设置规则<默认所有规则都是false>
- 数据劫持
  - get(){}：获取成员信息的时候触发
  - set(val){}：设置成员值的时候触发 

## JS装饰器

对类、类属性、类方法之类的一种装饰，可以理解为在原有代码外层又包装了一层处理逻辑。这样就可以做到不直接修改代码，就实现某些功能。

create-react-app支持装饰器：

```jsx
yarn add `@babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties`
```

package.json

```jsx
"babel": {
  "presets": [ "react-app" ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        /* legacy：使用历史遗留（Stage-1）的装饰器中的语法和行为。它为提案从 Stage-1 到当前阶段 Stage-2 平稳过渡作铺垫*/
        "legacy": true
      }
    ],
    [
       "@babel/plugin-proposal-class-properties",
       {
         /* loose=false时，是使用Object.defineProperty定义属性，loose=ture，则使用赋值法直接定义 */
         "loose": true
       }
     ]
  ]
}
```

babel语法包和插件之间版本兼容：

```jsx
yarn add roadhog@2.5.0-bata.1
```

### 类的装饰器

在类声明之前被声明，可以用来监视，修改或替换类的定义。

@函数 

class xxx{}

创建类的时候，会把装饰器函数执行：

- target：当前装饰的这个类 
- 可以在这个装饰器函数中，给类设置一些静态私有的属性方法，或者设置原型上的属性方法

同一个装饰器可以作用在多个类上<需要基于class创建类>

装饰器函数执行的返回结果，会替换原有的类

同一个类上也可以使用多个装饰器，处理顺序：从下到上处理

### 类中属性/方法的装饰器

在给实例设置私有属性的时候，触发装饰器函数执行，以此来给属性进行装饰。

```jsx
const test =(target,name,descriptor) => {
    /* target：Demo.prototype
       name：'x'
       descriptor:{configure：true,...,initializer:f}
	*/
    /* target：Demo.prototype
       name：'getX'
       descriptor:{configure：true,...,value  :f}
	*/
}

class Demo{
	// @test x=100;
	@test
	x=100;
    
    @test
	getX(){};
}
```

## mobx5

> react：创建store 指定reducer 使用时拿到store getState获取公共状态 修改通过dispatch派发任务通知reducer根据不同行为标识修改

安装：

```jsx
yarn add mobx@5 mobx-react@6
```

实现一个简单的计数器累加效果：

```javascript
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

// 公共状态管理
class Store {
    // 公共状态
    @observable num = 10; // @observable把当前状态设置为可监听的
    // 修改公共状态的方法
    @action handle() {
        this.num++;
    }
}
const store = new Store;

// 组件监听 
/* 类组件
@observer // 检测公共状态变化
class Demo extends React.Component {
    render() {
        return <div>
			...
        </div>;
    }
}
*/

// 函数组件：不支持装饰器，我们则基于observer把其执行即可
const Demo = observer(function Demo() {
    return <div>
        <span>{store.num}</span>
        <br />
        <button onClick={() => {
            store.handle();
        }}>按钮</button>
    </div>;
}); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Demo />
);
```

observable：一个实现“监听值变化“的函数或者装饰器。

```javascript
import { observable, autorun } from 'mobx';

class Store {
    // 只有基于 observable 装饰器修饰的属性，在可以在修改其值后，监测到它的变化
    @observable x = 10;
}
let store = new Store;

// 监听用到的依赖，当依赖改变时会执行callback「最开始立即执行一次」
autorun(() => {
    console.log('autorun:', store.x);
});

// 一秒钟后改变内容
setTimeout(() => {
    store.x = 100;
}, 1000);
```

探索 observable 的原理

```javascript
import { observable, observe } from 'mobx';
// 经过observable处理后的数据，是基于ES6proxy做过数据劫持的，这样后期修改状态值，就可以在SETTER函数中去做一些特殊处理，例如：把依赖其值的监听器触发执行...
let obj = observable({
    x: 10,
    y: 20
});
// console.log(obj); //对象是经过ES6中的内置API：Proxy做了劫持处理的
/* observe：撞见监听器，对对象进行监听，当监听的对象做出变化时，触发callback执行
   observe(obj, change => {
   console.log('内容改变了：', change);
});
obj.x = 100;
*/

//----
// observable不能直接对原始值类型进行监听，需要基于observable.box处理
let x = observable.box(10);
observe(x, change => {
    console.log('内容改变了：', change);
});
console.log(x, x.get());
x.set(1000);  //修改
```

所以我们以后创建的公共状态信息，前面都要设置 `@observable` 装饰器。

computed：计算属性

```javascript
import { observable, autorun, computed, reaction } from 'mobx';
class Store {
    @observable x = 10;
    @observable count = 3;
    @observable price = 120;
    // 设置具备计算缓存的计算属性：依赖的状态值没有变化，方法不会重新执行，使用之前计算缓存的结果
    @computed get total() {
        console.log('OK');
        return this.count * this.price;
    }
}
let store = new Store;

autorun(() => {
    console.log('autorun:', store.total, store.x);
});

setTimeout(() => {
    store.x = 1000; // total计算属性不会重新执行 用之前缓存的结果
    store.count = 10; // total计算属性需要重新执行 计算出新的值
}, 1000);
```

reaction：和autorun一样，都是监听器，提供更细粒化的状态监测<默认是不会执行的>

```js
// 相比较于autorun，提供更精细的管控「第一次不会触发」
reaction(
    () => [store.total, store.x],
    () => {
        console.log('reaction:', store.total, store.x);
    }
);
```

action：修改公共状态的方法

```javascript
import { observable, autorun, action, configure } from 'mobx';

// mobx全局配置 设定只能基于action方法修改状态值 不允许单独就实例修改状态
configure({
    enforceActions: "observed"
});
// 修改多个状态，会让autorun监听器执行多次 不好 要异步批处理
class Store {
    @observable x = 10;
    // 修饰函数的装饰器，让函数中的状态变成异步批处理
    /* @action changeX(val) {
        this.x = val;
    }
    */
    // action.bound确保this永远是Store的实例 不设置是undefined
    @action.bound changeX(val) {
        this.x = val;
    }
}
let store = new Store;

autorun(() => {
    console.log('autorun:', store.x);
});
setTimeout(() => {
    store.changeX(1000);
    // store.x = 2000; 
    // Uncaught Error: [mobx] Since strict-mode is enabled, changing observed observable values outside actions is not allowed.
    /*
    // 基于runInAction代替action修饰器「即便设置enforceActions配置项，它也是被允许的」，和action修饰器具备相同的效果！！
    runInAction(() => {
        store.x = 1000;
    });
    */
}, 1000);
```

实现异步派发：

```javascript
// 模拟从服务器获取数据
const query = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(1000);
        }, 1000);
    });
};

class Store {
    @observable x = 10
    @action.bound async changeX() {
        let res = 0;
        try {
            res = await query();
        } catch (_) { }
        // 使用时候 需要在异步操作完成后 基于runInAction修改状态
        runInAction(() => {
            this.x = res;
        });
    }
}
let store = new Store;
autorun(() => {
    console.log('autorun:', store.x);
});
store.changeX(); // 返回promise实例 当异步操作结束后 实例会变为成功的 <可以了解到啥时候处理完>
```

基于mobx重构TASKOA案例

```js
/*结构目录*/
|- store
    |- TaskStore.js
    |- PersonalStore.js
    |- index.js
```

```js
/*index.js 合并各个板块下的store*/
import TaskStore from "./TaskStore";
import PersonalStore from "./PersonalStore";
import { configure } from 'mobx';

configure({
    enforceActions: 'observed'
});

class Store {
    constructor() {
        this.task = new TaskStore(this);
        this.personal = new PersonalStore(this);
    }
}
export default new Store();

/*
store = {
    task：{
    	taskList：null,
    	_proto_:TaskStore.prototype
    		queryTaskListAction
    		... 
	}
	personal:{
        info：null,
        _proto_:PersonalStore.prototype
    		queryInfoAction
    }
    _proto_:Store.prototype
}
*/
```

```js
/*PersonalStore.js*/
class PersonalStore {
    constructor(root) {
        this.root = root;
    }
    /*
    @observable info = null;
    @action.bound queryInfoAction() {
        // 。。。
    }
    */
}
export default PersonalStore;
```

```js
/*TaskStore.js*/
import { observable, action, runInAction } from 'mobx';
import { getTaskList } from '../api';、

class TaskStore {
    constructor(root) {
        // 最外层store的实例<包含各个板块store的实例> 可以基于this.root获取根store实例 基于根store实例访问其他板块store的实例
        this.root = root;
    }
    @observable taskList = null;
    
    // 异步获取全部任务
    @action.bound async queryTaskListAction() {
        let list = [];
        try {
            let result = await getTaskList(0);
            if (+result.code === 0) {
                list = result.list;
            }
        } catch (_) { }
        runInAction(() => {
            this.taskList = list;
        });
    }
    
    // 同步删除某个任务
    @action.bound removeTaskAction(id) {
        if (!Array.isArray(this.taskList)) return;
        this.taskList = this.taskList.filter(item => {
            return +item.id !== +id;
        });
    }
    
    // 同步修改某个任务
    @action.bound updateTaskAction(id) {
        if (!Array.isArray(this.taskList)) return;
        this.taskList = this.taskList.map(item => {
            if (+item.id === +id) {
                item.state = 2;
                item.complete = new Date().toLocaleString('zh-CN');
            }
            return item;
        });
    }
}
export default TaskStore;
```

在组件中的使用

```javascript
/* index.jsx */
import store from './store';
import { Provider } from 'mobx-react';
...
root.render(
    <ConfigProvider locale={zhCN}>
    //  <Provider task={store.task} personal={store.personal}>
        <Provider {...store}>
            <Task />
        </Provider>
    </ConfigProvider
);
```

```js
/* Task.jsx */
import { observer, inject } from 'mobx-react';

/* 类组件
@observer
@inject('task','personal')
*/

// 函数组件
const Task = function Task(props) {
    /* 获取TASK模块的Store实例 */
    let { task } = props;
    
    /* 定义需要的状态 */
    let [selectedIndex,setSelectedIndex] = useState(0),
        [],
        
    let [formIns] = Form.useForm();

    /* 关于TABLE和数据的处理 */
    useEffect(() => {
        (async () => {
            if (!task.taskList) {
                setTableLoading(true);
                await task.queryTaskListAction();
                setTableLoading(false);
            }
        })();
    }, []);
    
    useEffect(() => {
        let { taskList } = task;
        if (!taskList) taskList = [];
        if (selectedIndex !== 0) {
            taskList = taskList.filter(item => {
                return +item.state === selectedIndex;
            });
        }
        setTableData(taskList);
    }, [selectedIndex, task.taskList]);

    ......
    /* 关于删除和完成*/
    const removeHandle = async(id) =>{
        try{
            let {code} = await removeTask(id);
            if(+code===0){
                task.removeTaskAction(id);
                message.success('恭喜，操作成功。')
            } else { }
        } catch { } 
    }
};
export default inject('task')(observer(Task));
```

> 三装饰器：observable、computed、action
>
> 三监听器：observer、autorun、reaction

## mobx6

和mobx5的语法类似，只是去掉所有的装饰器，基于makeObservable、makeAutoObservable进行修饰处理即可。

```js
/*TaskStore.js*/
import { observable, action, runInAction, makeObservable, makeAutoObservable } from 'mobx';
import { getTaskList } from '../api';

class TaskStore {
    constructor(root) {
        this.root = root;
        /* 基于makeObservable给状态和方法设置装饰效果 捕获已经存在的对象属性并且使得它们可观察
        makeObservable(this, {
            taskList: observable,
            queryTaskListAction: action.bound,
            removeTaskAction: action.bound,
            updateTaskAction: action.bound
        }); */

        /* 
         makeAutoObservable 就像是加强版的 makeObservable，在默认情况下它将推断所有的属性
         推断规则：
            所有自有属性都成为 observable
            所有getters都成为 computed
            所有setters都成为 action
            所有prototype中的 functions 都成为 autoAction
            所有prototype中的 generator functions 都成为 flow
         */
        
        makeAutoObservable(this);
    }
    
    taskList = null;
    async queryTaskListAction() {
       ...
    }
    removeTaskAction(id) {
        ...
    }
    updateTaskAction(id) {
        ...
    }
}
export default TaskStore;
```

