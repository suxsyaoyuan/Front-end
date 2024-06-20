# d0

## 1. 移动端基础

### 1.1 浏览器现状

PC端常见浏览器 & 移动端常见浏览器

| PC端常见浏览器                                               | 移动端常见浏览器                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 360浏览器、谷歌浏览器、火狐浏览器、QQ浏览器、百度浏览器、搜狗浏览器、IE浏览器。 | UC浏览器，QQ浏览器，欧朋浏览器，百度手机浏览器，360安全浏览器，谷歌浏览器，搜狗手机浏览器，猎豹浏览器，以及其他杂牌浏览器。 |

国内的UC和QQ，百度等手机浏览器都是根据Webkit修改过来的内核，国内尚无自主研发的内核，就像国内的手机操作系统都是基于Android修改开发的-样。
**总结：兼容移动端主流浏览器，处理Webkit内核浏览器即可。**

### 1.2 手机屏幕现状

- 移动端设备屏幕尺寸非常多， 碎片化严重。
- Android设备有多种分辨率: 480x800， 480x854， 540x960， 720x1280 ， 1080x1920等， 还有传说中的2K ， 4k屏。
- 近年来iPhone的碎片化也加剧了， 其设备的主要分辨率有: 640x960， 640x1 136， 750x1334， 1242x2208等。
- 作为开发者无需关注这些分辨率，因为我们常用的尺寸单位是px。

### 1.3 移动端调试方法

- Chrome DevTools（谷歌浏览器）的模拟手机调试
- 搭建本地web服务器，手机和服务器一个局域网内，通过手机访问服务器
- 使用外网服务器，直接IP或域名访问

### 1.4 总结

- 移动端浏览器我们主要对webkit内核进行兼容
- 我们现在开发的移动端主要针对手机端开发
- 现在移动端碎片化比较严重，分辨率和屏幕尺寸大小不一
- 学会用谷歌浏览器模拟手机界面以及调试

## 2. 视口

视口（viewport）就是浏览器显示页面内容的屏幕区域。视口可以分为布局视口、视觉视口和理想视口

### 2.1 布局视口 layout viewport

- 一般移动设备的浏览器都默认设置了一个布局视口，用于解决早期的PC端页面在手机上显示的问题。
- iOS， Android基本都将这个视口分辨率设置为980px ，所以PC上的网页大多都能在手机上呈现，只不过元素看上去很小，一般默认可以通过手动缩放网页。

![1](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/front-end/1.79jc9yhphdw0.jpg)

### 2.2 视觉视口 visual viewport

- 字面意思，它是用户正在看到的网站的区域。注意:是网站的区域。
- 我们可以通过缩放去操作视觉视口， 但不会影响布局视口，布局视口仍保持原来的宽度。

![2](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/front-end/2.2ycuucitoz6.jpg)

### 2.3 理想视口 ideal viewport

- 为了使网站在移动端有最理想的浏览和阅读宽度而设定
- 理想视口个对设备来讲，是最理想的视口尺寸
- 需要手动添写 `meta` 视口标签通知浏览器操作
- meta视口标签的主要目的：**布局视口的宽度应该与理想视口的宽度一致，简单理解就是设备有多宽，我们布局的视口就多宽**

### 2.4 meta视口标签

```html
 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=no">Copy to clipboardErrorCopied
```

| 属性            | 解释说明                                                     |
| --------------- | ------------------------------------------------------------ |
| `width`         | 宽度设置的是 `viewport` 宽度，可以设置 `device-width` 特殊值 |
| `initial-scale` | 初始缩放比，大于 0 的数字                                    |
| `maximum-scale` | 最大缩放比，大于 0 的数字                                    |
| `minimum-scale` | 最小缩放比，大于 0 的数字                                    |
| `user-scalable` | 用户是否可以缩放，yes 或 no ( 1或0)                          |

### 2.5 总结

- 视口就是浏览器显示页面内容的屏幕区域
- 视口分为布局视口、视觉视口和理想视口
- 我们移动端布局想要的是理想视[ 就是手机屏幕有多宽，我们的布局视口就有多宽
- 想要理想视口，我们需要给我们的移动端页面添加meta视口标签

### 2.6 标准的viewport设置

- 视口宽度和设备保持一致：`width=device-width`
- 视口的默认缩放比例 1.0：`initial-scale=1.0`
- 不允许用户自行缩放：`user-scalable=no`
- 最大允许的缩放比例 1.0：`maximum-scale=1.0`
- 最小允许的缩放比例 1.0：`minimum-scale=1.0`

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=no">Copy to clipboardErrorCopied
```

## 3. 二倍图

### 3.1 物理像素&物理像素比

- 物理像素点指的是屏幕显示的最小颗粒，是物理真实存在的。这是商在出厂时就设置好了，比如苹果6\7\8是750*1334
- 我们开发时候的1px不是一定等于1个物理像素的心
- PC端页面，1个px等于1个物理像素的,但是移动端就不尽相同
- **一个px的能显示的物理像素点的个数，称为物理像素比**或屏幕像素比
- PC端和早前的手机屏幕/普通手机屏幕：1CSS像素= 1 物理像素的，物理像素比为 1。而移动端就不尽相同，例如iphone6/7/8的物理像素比为 2。
- Retina (视网膜屏幕)是一种显示技术，可以将把更多的物理像素点压缩至一块屏幕里，从而达到更高的分辨率,并提高屏幕显示的细腻程度。

### 3.2 二倍图

准备的图片比实际大小大 2 倍，这就是二倍图。

### 3.3 二倍图解决方案

- 我们需要一个 50*50 像素（CSS像素）的图片，直接放到 iphone8 里面会放大 2 倍 100* 100 会模糊。
- 我们采取的是 放一个 100*100 图片然后手动的把这个图片缩小为 50* 50（css像素）
- 我们准备的图片比我们实际需要的大小大 2 倍，这就方式就是2倍图

### 3.4 多倍图

- 对于一张50px * 50px的图片，在手机Retina屏中打开,按照刚才的物理像素比会放大倍数,这样会造成图片模糊
- 在标准的viewport设置中,使用倍图来提高图片质量,解决在高清设备中的模糊问题
- 通常使用二倍图,因为iPhone 6\7\8的影响，但是现在- 还存在3倍图4倍图的情况,这个看实际开发公司需求
- 背景图片注意缩放问题
- **实际开发中，使用PS切图可以按照需要切出2/3倍图**。

### 3.5 背景缩放 background-size

background size属性规定背景图像的尺寸

```css
background-size: 背景图片宽度 背景图片高度 | 宽度 | 百分比 | cover | contain;
```

- 只写一个参数肯定是宽度高度省略了会 等比例缩放
- 单位可以给百分比
- cover 完全覆盖盒子，图片可能有部分显示不全
- contain 是盒子完全包含图片，图片拉伸到最大

## 4. 移动端开发选择

### 4.1 移动端主流方案

#### 4.1.1 单独制作移动端页面（主流）

> 京东商城手机版、淘宝触屏版

通常情况下，网址域名前面加m（mobile）可以打开移动端。通过判断设备，如果是移动设备打开，则 **跳到移动端页面。**

#### 4.1.2 响应式页面兼容移动端（其次）

> 三星手机官网：[www.samsung.com。](http://www.samsung.com./)

通过判断屏幕宽度来改编样式，响应式兼容不同终端。
缺点：**制作麻烦，需要花费大量精力取调兼容新问题。**

### 4.2 总结

现在市场常见的移动端开发有 **单独制作移动端页面** 和 **响应式页面** 两种方案。
现在市场 **主流的选择还是单独制作移动端页面**。



## 6.移动端布局推荐

`flex` + `less` + `vw` 

## 5. 移动端技术解决方案

### 5.1 移动端浏览器

移动端浏览器基本以 webkit 内核为主，因此我们就考虑 webkit 兼容性问题。
我们可以放心使用 H5 和 CSS3 样式。
同时我们浏览器的私有前缀，只需要考虑加上 webkit 就行。

### 5.2 CSS初始化

移动端初始化推荐使用 normalize.css，优点：

- 保护了有价值的默认值
- 修复了浏览器的bug
- 是模块化的
- 拥有详细的文档

官网：https://necolas.github.io/normalize.css/

### 5.3 CSS3 盒子模型 box-sizing

- 传统盒子模型宽度计算：盒子宽度 = CSS中设置的 width + border + padding
- CSS3 传统盒子模型：盒子宽度 = CSS中设置的 width（包含了border+padding）。也就是说，CSS3盒子模型的padding和border不会再撑大盒子了。

```css
/* CSS3盒子模型 */
box-sizing: border-box;
/* 传统盒子模型 */
box-sizing: content-box;Copy to clipboardErrorCopied
```

传统 or CSS3盒子模型？

- 移动端可以全部CSS3盒子模型
- PC端如果完全需要兼容，就用传统默默是；不考虑兼容性，选择CSS3盒子模型。

### 5.4 特殊样式

```css
/* CSS3盒子模型 */
box-sizing: border-box;
-webkit-box-sizing: border-box;
/* 点击高亮需要清除，设置为 transparent 完全透明 */
-webkit-tap-highlight-color: transparent;
/* 在移动端默认外观在ios上加上这个属性才能给按钮和输入框自定义样式 */
-webkit-appearance: none;
/* 禁用长按页面时弹出的菜单 */
img, a {-webkit-touch-callout: none;}
```

## 6. 移动端常见布局

### 6.1 移动端技术选型

#### 6.1.1 单独制作移动端页面（主流）

- 流式布局（百分比布局）
- flex 弹性布局（强烈推荐）
- less + rem + 媒体查询布局
- 混合布局

#### 6.1.2 响应式页面兼容移动端（其次）

- 媒体查询
- bootstrap

# d1 流式布局

- 流式布局，就是百分比布局，也称非固定像素布局。
- 通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充
- 流式布局方式是移动web开发使用的比较常见的布局方式。 ![FlowLayout1](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/FrontEnd/FlowLayout1.556mbehtar80.png)
- `max-width` 最大宽度（`max-height` 最大高度）
- `min-width` 最小宽度（`min-height` 最小高度）

## 01 流式布局举例

```css
/* 1. 主体大盒子设置为 100% */
body {
    width: 100%;
    min-width: 320px;
    max-width: 640px;
}
/* 2. 主体的某一块区域，不设置高度和宽度 */
/* 3. 该区域内的部分按照比例分配宽度，设置浮动。 */
.seckill div:nth-child(2) ul li {
    /* 共6块区域，1/6=16.66% */
    width: 16.66%;
    display: block;
    float: left;
}
/* 4. 小区域内部放置的图片设置宽度为 100% */
.seckill div:nth-child(2) ul li img {
    width: 100%;
}Copy to clipboardErrorCopied
```

## 02 流式布局案例：京东移动端首页

- 案例模板：https://m.jd.com/
- 代码参考（本人）：https://www.aliyundrive.com/s/u8SmJQP1vjy

### 2.1 二倍精灵图做法

- 在 firework 里面把精灵图等比例缩放为原来的一半（使用fireworks修改宽度和高度即可缩放）
- 之后根据大小测坐标（然后测量x、y坐标）
- 注意代码里 `background-size` 也要写：精灵图原来宽度的一半

```css
background: url(../images/jd-sprites.png) no-repeat -81px 0;
/* 原始图大小为400px左右 */
background-size: 200px auto;Copy to clipboardErrorCopied
```

### 2.2 图片格式

##### ① DPG图片压缩技术

京东自主研发推出DPG图片压缩技术，经测试该技术，可直接节省用户近50%的浏览流量，**极大的提升了用户的网页打开速度**。能够兼容jpeg，实现全平台、全部浏览器的兼容支持，经过内部和外部上万张图片的人眼浏览测试后发现，**压缩后的图片和webp的清晰度对比没有差距**。

##### ② webp 图片格式

谷歌开发的一种旨在 **加快图片加载速度** 的图片格式。图片压缩体积大约只有JPEG的2/3，并能 **节省大量的服务器宽带资源和数据空间**。

# d2 flex布局

> [Flex 布局教程：语法篇 - 阮一峰的网络日志 (ruanyifeng.com)](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 01 flex 布局原理

flex 是 flexible Box 的缩写，意为 “弹性布局”，用来为盒状模型提供最大的灵活性，**任何一个容器都可以指定为 flex 布局**。

- 为父盒子设为 `flex` 布局后，子元素的 `float`、`clear`、`vertical-align` 属性将失效。
- 伸缩布局 = 弹性布局 = 伸缩盒布局 = 弹性盒布 = flex 布局

采用 Flex 布局的元素，称为 **Flex容器**（flex container），简称 “容器”。它的所有子元素自动成为容器成员，称为 **Flex项目**（flex item），简称 “项目”。

- flex项目本身也可以成为容器，称为子容器。则上一级则称为父容器。
- 子容器可以横向排列也可以纵向排列。
- 原理总结：**通过给父盒子添加flex属性，来控制子盒子的位置和排列方式**。

![Flex1](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/FrontEnd/Flex1.1414v8dfngcg.png)

## 02 flex 布局父项常见属性

### .1 常见父项属性

以下由 6 个属性是对父元素设置的。

- `flex-direction`：设置主轴方向
- `justify-content`：设置主轴上的子元素排列方式
- `flex-wrap`：设置子元素是否换行
- `align-content`：设置侧轴上的子元素的排列方式（多行）
- `align-items`：设置侧轴上的子元素排列方式（单行）
- `flex-flow`：复合属性，相当于同时设置了 `flex-direction` 和 `flex-wrap`

### .2 flex-direction ⭐

`flex-direction` 设置主轴方向。

#### .2.1 主轴与侧轴

在 flex 布局中，分为主轴和侧轴两个方向，同时的叫法有：行和列、x轴和y轴。

- 默认主轴方向为 x 轴方向，水平向右
- 默认侧轴方向为 y 轴方向，垂直向下

![Flex2](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/FrontEnd/Flex2.5l3abdtll5c0.png)

#### .2.2 属性值

`flex-direction` 属性决定主轴的方向（即项目的排列方向）
注意：主轴和侧轴是会变化的，取决于 `flex-direction` 设置谁为主轴，则另外一个即为侧轴。子元素是靠主轴来排列的。

| 属性值         | 说明             |
| -------------- | ---------------- |
| row            | 默认值，从左到右 |
| row-reverse    | 从右到左         |
| column         | 从上到下         |
| column-reverse | 从下到上         |

### .3 justify-content ⭐

`justify-content` 设置 **主轴** 上子元素排列方式。

> Warning
>
> 使用此属性之前一定要确定好主轴是哪个。

| 属性值        | 说明                                        |
| ------------- | ------------------------------------------- |
| flex-start    | 默认值，从头部开始，若主轴是x轴，则从左到右 |
| flex-end      | 从尾部开始排列                              |
| center        | 在主轴剧中对齐（若主轴是x，则水平居中）     |
| space-around  | 平分剩余空间                                |
| space-between | **先向两边贴紧，再平分剩余空间（重要）**    |

### .4 flex-wrap ⭐

`flex-wrap` 设置子元素是否换行。
默认情况下，项目都排在一条线（又称轴线）上，`flex-wrap` 属性定义，**flex 布局中默认是不换行的**。

> Tip
>
> 若父盒子一行上装不开，则会缩小子元素的宽度，从而仍然一行显示。

| 属性值       | 说明           |
| ------------ | -------------- |
| nowrap       | 默认值，不换行 |
| wrap         | 换行           |
| wrap-reverse | 反向换行       |

### .5 align-items ⭐

`align-items` 设置侧轴上的子元素排列方式（单行）。

该属性控制子项在侧轴（默认是y轴）上的排列方式，**在子项为单项的时候使用**。

| 属性值     | 说明                 |
| ---------- | -------------------- |
| flex-start | 从上到下             |
| flex-end   | 从下到上             |
| center     | 挤在一起（垂直居中） |
| strech     | 拉伸（默认值）       |

### .6 align-content

`align-content` **设置侧轴上的子元素的排列方式（多行）**

设置子项在侧轴上的排列方式并且 **只能用于子项出现换行的情况（多行），在单行下是没有效果的**。

| 属性值        | 说明                                   |
| ------------- | -------------------------------------- |
| flex          | 默认值，在侧轴的头部开始排列           |
| flex-end      | 在侧轴的尾部开始排列                   |
| center        | 在侧轴中间显示                         |
| space-around  | 子项在侧轴平分剩余空间                 |
| space-between | 子项在侧轴先分布在两头，再平分剩余空间 |
| strech        | 设置子项元素高度任意平分父元素高度     |

### .7 align-content 和 align-items 区别

- `align-items` 适用于单行情况下，只有上下对齐、居中和拉伸
- `align-content` 适用于 **换行（多行）**情况下（单行情况下无效），可以设置上对齐、下对齐、居中、拉伸以及平分剩余空间等属性值

> Tip
>
> 单行用 `align-items`，多行用 `align-content`。

### .8 flex-flow 以及小总结的复合属性。

```css
flex-flow: row wrap;Copy to clipboardErrorCopied
```

- `flex-direction`：设置主轴方向
- `justify-container`：设置主轴上的子元素排列方式
- `flex-wrap`：设置子元素是否换行
- `align-content`：设置侧轴上的子元素的排列方式（多行）
- `align-items`：设置侧轴上的子元素的排列方式（单行）
- `flex-flow` ：复合属性，相当于同时设置了 `flex-direction` 和 `flow-wrap`

## 03 flex 布局子项常见属性

order：指定了项目的排列顺序。

`order` 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 `0`。注意：和 `z-index` 不一样。

flex-grow：定义了在有可用空间时的放大比例。

flex-shrink：定义了在空间不足时的缩小比例。

flex-basis：指定了项目在分配空间前的初始大小。

flex：这是flex-grow、flex-shrink和flex-basis的简写形式。

align-self：允许单个项目独立于其他项目在交叉轴上对齐。

### .1 order属性

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

### .2 flex-grow属性

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png)

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

### .3 flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

### .4 flex-basis属性

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

### .5 flex 属性 

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

> `flex` 属性定义子项目 **分配剩余空间**，用 `flex` 表示占多少份数。`flex` 的值可以是整数，可以是百分数。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

> Tip
>
> 例如要平分一个盒子，则不给定子元素宽度（高度），然后给每一个子元素设置属性：`flex: 1`。

### .6 align-self

`align-self` 控制子项自己在侧轴上的排列方式。

`align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `strech`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

| 属性值       | 描述                                  |
| ------------ | ------------------------------------- |
| `auto`       | 默认值，继承父盒子的 align-items 值。 |
| `strech`     | 元素被拉伸以适应容器。                |
| `center`     | 元素位于容器的中心                    |
| `flex-start` | 元素位于容器的开头                    |
| `flex-end`   | 元素位于容器的结尾                    |





# d3 rem 布局

## 01 rem 基础

`rem`（root em）是一个单位，类似于 `em`。区别：

- `em` 是相对于父元素字体大小。
- `rem` 的基准是 **相对于html元素的字体大小**。

比如，根元素（html）设置 `font-size: 12px`，非根元素设置 `width: 2rem`，则换成 `px` 就是 `24px`。
优点：**通过修改html元素字体的大小来改变页面中元素的大小从而整体控制整个页面**。

## 02 媒体查询

### 2.1 定义

媒体查询（Media Query）是 CSS3 的新语法。

- 使用 `@media` 查询，可以针对不同的媒体类型定义不同的样式
- `@media` **可以针对不同屏幕尺寸设置不同的样式**
- 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面
- 目前针对很多苹果手机、安卓手机、平板等设备都用到媒体查询

### 2.2 语法规范

```css
@media mediatype and|not|only (media feature) {
    CSS3-Code;
}
```

- 以 `@media` 开头
- mediatype 是媒体类型
- 关键字 `and`、`not`、`only`
- `media feature` 媒体特性，必须有小括号

#### 2.2.1 mediatype 查询类型

将不同终端设备划分成不同的类型，称为媒体类型。

| 值       | 解释说明                           |
| -------- | ---------------------------------- |
| `all`    | 用于所有设备                       |
| `print`  | 用于打印机和打印浏览               |
| `screen` | 用于电脑屏幕，平板电脑，智能手机等 |

#### 2.2.2 关键字 and not only

关键字将媒体类型特性连接到一起作为媒体查询的条件。

- `and`：可以将多个类型或多个媒体类型连接到一起成为媒体查询的条件
- `not`：排除某个媒体类型，相当于 “非” 的意思，可以省略
- `only`：指定某个特定的媒体类型，可以省略

#### 2.2.3 媒体特性

每种媒体类型都具体各自不同的特性，根据不同媒体类型的媒体特性设置不同的展示风格。我们暂且了解三个，注意他们要加小括号包含。

| 值          | 解释                               |
| ----------- | ---------------------------------- |
| `width`     | 定义输出设备中页面可见区域的宽度   |
| `min-width` | 定义输出设备中页面最小可见区域宽度 |
| `max-width` | 定义输出设备中页面最大可见区域宽度 |

**媒体查询的价值：媒体查询可以根据不同的屏幕尺寸改变不同的样式。**

举例

```css
/* 在屏幕上并且最大的宽度是800像素设置我们想要的样式 */
@media screen and (max-width: 800px) {
    body {
        background-color: pink;
    }
}
/* 在屏幕上并且最大的宽度是500像素设置我们想要的样式 */
@media screen and (max-width: 500px){
    body {
        background-color: purple;
    }
}
```

### 2.3 媒体查询+rem实现元素动态大小变化

`rem` 单位是跟着 `html` 来走的，有了 `rem` 页面元素可以设置不同大小尺寸媒体查询可以根据不同设备宽度来修改样式。
**媒体查询+rem** 就可以实现不同设备宽度，实现页面元素大小的动态变化。

```css
@media screen and (min-width: 320px) {
    html {
        font-size: 50px;
    }
}
@media screen and (min-width: 640px) {
    html {
        font-size: 100px;
    }
}
```

### 2.4 引入资源（理解）

当样式比较繁多的时候，我们可以针对不同的媒体使用不同 stylesheets（样式表）。原理，**就是直接在 link 中判断设备的尺寸，然后引用不同的css文件**。

#### 2.4.1 语法规范

```css
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
```

举例

```css
/* 当屏幕大于 640px，一行显示两个 */
/* 小于 640px 的，一行显示一个 */
<link rel="stylesheet" href="style320.css" media="screen and (min-width: 320px)">
<link rel="stylesheet" href="style640.css" media="screen and (min-width: 640px)">
```

> Tip：
>
> 引入资源就是针对于不同的屏幕尺寸，调用不同的css文件

## 03 rem 适配方案

### 3.1 rem 适配方案

1. 让一些不能等比自适应的元素，达到当设备尺寸发生改变的时候，等比例适配当前设备。
2. 使用媒体查询根据不同设备按比例设置html的字体大小，然后页面元素使用rem做尺寸单位，当html字体大小变化元素尺寸也会发生变化，从而达到等比缩放的适配。

### 3.2 rem 实际开发适配方案

1. 按照设计稿与设备宽度的比例，动态计算并设置html根标签的font-size大小;（媒体查询）
2. CSS中，设计稿元素的宽、高、相对位置等取值，按照同等比例换算为rem为单位的值。

### 3.3 rem 适配方案技术使用（市场主流）

#### 方案1

- less
- 媒体查询
- rem

#### 方案2（推荐）

- flexible.js
- rem

> Tip
>
> 两种方案都存在，方案2更简单，目前不需要了解里面的代码。

### 3.4 rem 实际开发适配方案1

rem + 媒体查询 + less技术

##### 设计稿常见尺寸宽度

| 设备          | 常见宽度                                                     |
| ------------- | ------------------------------------------------------------ |
| iphone45      | 640px                                                        |
| **iphone678** | **750px**                                                    |
| Android       | 常见320px、360px、375px、384px、400px、720px。**大部分4.7~5寸的安卓设备为720px** |

> Tip
>
> 一般情况下，我们以一套或两套效果图适应大部分的屏幕，放弃极端屏或对其优雅降级，牺牲一些效果 **现在基本以750为准**。

##### 动态设置 html 标签 font-size 大小

假设设计稿是750px，**假设我们把整个屏幕划分为15等份（划分标准不一可以是20份也可以是10等份）**，每一份作为 html 字体大小，这里就是 50px，那么在 320px 设备的时候，字体大小为 320/15 就是 21.33px，用我们页面元素的大小除以不同的 html 字体大小会发现他们比例还是相同的

比如我们以 750 为标准设计稿，一个 100*100像素 的页面元素在750屏幕下，就是 100/50 转换为 rem 是 2rem * 2rem 比例是 1 比 1，320 屏幕下，html 字体大小为 21.33 则 2rem = 42.66px，此时宽和高都是42.66但是宽和高的比例还是 1 比 1，但是已经能实现不同屏幕下页面光素盒子等比例缩放的效果

###### 具体步骤

1. 首先选一套标准尺寸，例如以 750 为准
2. 用 **屏幕尺寸** 除以 **划分的份数**，得到 html 里面的文字尺寸大小。此时我们知道，不同屏幕下得到的文字大小是不一样的。
3. **页面元素的 rem 值** = **页面元素在750像素下的px值** / **html里面的文字大小**

### 3.5 rem 适配方案2

##### 简洁高效的 rem 适配方案 [flexible.js]

> Tip
>
> 技术方案1（less+媒体查询+rem）效果很好，但是过于繁琐。因此介绍第二种 rem 方案。

手机淘宝团队出的简洁高效移动端适配库。我们再也 **不需要在写不同屏幕的媒体查询**，因为里面js做了处理。

它的原理是把 **当前设备划分为10等份**，但是不同设备下，比例还是一致的。

我们要做的，**就是确定好我们当前设备的html文字大小就可以了**。比如当前设计稿是750px，那么我们只需要把html文字大小设置为75px(750px/10)就可以里面页面元素rem值：页面元素的px值/ 75。 剩余的，**让flexible.js来去算**。

flexible.js 项目地址：https://github.com/amfe/lib-flexible

##### 使用适配方案2制作苏宁移动端首页

- 方案：我们采取单独制作移动页面方案
- 技术：布局采取rem适配布局2（flexible.js + rem）
- 设计图：本设计图采用 750px 设计尺寸

###### 前期准备

引入 normalize.css 和 flexible.js，将相关文件和文件夹创建好。

###### vscode cssrem 插件

自动将 `px` 单位转换成 `rem` 的插件。

**需要手动设置cssroot字体大小为75**。

###### 注意

flexible.js 按照屏幕尺寸修改 html 的 `font-size` 大小，当处于PC端口时，宽度会过大。需要额外设置一个媒体查询：

```css
/* search-content */
/* 若设备屏幕超过 750px，则按照 750设计稿布局 */
@media screen  and (min-width: 750px) {
    html {
        font-size: 75px !important;
    }
}
```

# d4 vw/vh布局

未来的趋势：

1. 省去各种判断和修改
2. 代表：bilibili、小米……

## 01 vw/vh是什么？

- vw/vh 是一个相对单位（类似 em 和 rem 相对单位）
  - vw 是：viewport width 视口宽度单位
  - vh 是：viewport height 视口高度单位
- 相对视口的尺寸计算结果
  - 1vw = 1/100 视口宽度
  - 1vh = 1/100 视口高度

例如：

当前屏幕视口是 375px，则 1vw 就是 3.75px，如果当前屏幕视口为 414px，则 1vw 就是 4.14px。

**注意：和百分比有区别，百分比是相对于父元素来说的，而 vw 和 vh 总是针对于当前视口来说的。**

## 02 vw/vh怎么用？

- 超级简单，元素单位直接使用新单位 vw/vh 即可
- 因为 vw/vh 是相对单位，所以不同视口（屏幕）下，宽高一起变化完成适配

> 直接使用即可！永远滴神！

【案例】

```css
div {
    width: 10vw;
    height: 10vh;
    background-color: pink;
}
```

 **如何还原设计稿？**

前提：我们设计稿按照 iPhone 6/7/8 来设计，有个盒子是 50px * 50px 的，如何使用 vw 呢？

分析：

1. 设计稿参照 iPhone 6/7/8，所以视口宽度尺寸是 375px（设计原型图平台切换到 2x 模式再测量，因为 UI 设计图是 750px 的）

2. 那么 1vw 是多少像素？

   375px / 100 = 3.75px

3. 我们元素的目标是多少像素？

   50px * 50px

4. 那么 50 * 50 是多少个 vw？

   50 / 3.75 = 13.3333vw

> 在像素大厨等 UI 软件中，直接选择 vw 单位然后测量即可，不用人工计算。

## 03 vw注意事项

- 因为涉及到大量除法且有除不尽的情况，所以还是适应 LESS 搭配更好点

- 我们本质是根据视口宽度来等比例缩放页面元素高度和宽度的，所以开发中使用 vw 就基本够用了。vh 很少使用（高度变化时，我们一般不需要元素大小进行变化，所以用不到 vh）

  ```css
  div {
      /* 都用vm */
      width: 13.333333vw;
      height: 12.666666vw;
      font-size: 5.333333vw;
      background-color: pink;
  }
  ```

- 兼容性，网站：https://caniuse.com/

> 目前适用于移动端，PC 端不适用。

## 04 VSCode px->vw 插件

![](https://i0.hdslb.com/bfs/album/911c795fd54971b3cda2cab06ade197bf65735e0.png)

记得进行设置：

> 打开 px2vw 插件主页、点击设置按钮、点击扩展设置。

![](https://i0.hdslb.com/bfs/album/e4e3af30b5d81f3c426e2aa311ed7214067ddaf6.png)

# d5 响应式布局（Bootstrap）

## 01 响应式开发原理

就是使用**媒体查询**针对不同宽度的设备进行布局和样式的设置，从而适配不同设备的目的。

| 设备划分                 | 尺寸区间              |
| ------------------------ | --------------------- |
| 超小屏幕（手机）         | `w < 768px`           |
| 小屏设备（平板）         | `768px <= w < 992px`  |
| 中等屏幕（桌面显示器）   | `992px <= w < 1200px` |
| 宽屏设备（大桌面显示器） | `w >= 1200px`         |

## 02 响应式布局容器

响应式 **需要一个父级作为布局容器，来配合子级元素来实现变化效果。**

原理就是在不同屏幕下，通过媒体查询来改变这个布局容器的大小，再改变里面子元素的排列方式和大小，从而实现不同屏幕下，看到不同的页面布局和样式变化。

平时我们的响应式尺寸划分（但是我们也可以根据实际情况自己定义划分）：

- 超小屏幕（手机，小于768px）：设置宽度为 `100%`
- 小屏幕（平板，大于等于768px）：设置宽度为 `750px`
- 中等屏幕（桌面显示器，大于等于992px）：宽度设置为 `970px`
- 大屏幕（大桌面显示器，大于等于1200px）：宽度设置为 `1170px`

代码实现：
HTML部分：

```html
<!-- 布局容器 -->
<div class="container"></div>
```

CSS部分：

```css
.container {
    height: 150px;
    margin: 0 auto;
    background-color: pink;
}
/* 超小屏幕 小于 768 布局容器宽度为 100% */
@media screen and (max-width: 767px) {
    .container {
        width: 100%;
    }
}
/* 小屏幕 大于等于 768，布局容器 750px */
@media screen and (min-width: 768px) {
    .container {
        width: 750px;
    }
}
/* 中等屏幕 */
@media screen and (min-width: 992px) {
    .container {
        min-width: 970px;
    }
}
/* // 大屏幕 */
@media screen and (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}
```

## 03 案例：响应式导航

- 当我们屏幕大于等于 800 像素，我们给 `nav` 宽度为 800px，因为里面子盒子需要浮动，所以 `nav` 需要清除浮动。
- `nav` 里面包含 8 个小 `li` 盒子，每个盒子的宽度定为 100px，高度为30px，浮动一行显示。
- 当我们屏幕缩放，宽度小于 800 像素的时候，`nav` 盒子宽度修改为 100% 宽度。
- `nav` 里面的8个小 `li`，宽度修改为 33.33%，这样一行就只能显示 3 个小 `li` ，剩余下行显示。

代码： HTML部分:

```html
<div class="container">
    <ul>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
        <li>导航栏</li>
    </ul>
</div>
```

CSS部分：

```css
* {
    padding: 0;
    margin: 0;
}

ul {
    list-style: none;
}

.container {
    width: 750px;
    margin: 0 auto;
}

.container ul li {
    width: 93.75px;
    height: 30px;
    background-color: green;
    float: left;
}

@media screen and (max-width: 767px) {
    .container {
        width: 100%;
    }
    .container ul li {
        width: 33.33%;
    }
}  
```

## 04 Bootstrap

### 1 Bootstrap 简介

Bootstrap 来自 Twitter（推特），是目前最受欢迎的前端框架。Bootstrap 是基于HTML、CSS 和JAVASCRIPT 的，它简洁灵活，使得Web 开发更加快捷。

- 中文官网：http://www.bootcss.com/
- 官网：http://getbootstrap.com/

框架：顾名思义就是一套架构，它有一套比较完整的网页功能解决方案，而且控制权在框架本身，有预制样式库、组件和插件。使用者要按照框架所规定的某种规范进行开发。

Bootstrap 优点：

- 标准化的 html+css 编码规范
- 提供了一套简洁、直观、强悍的组件
- 有自己的生态圈，不断的更新迭代
- 让开发更简单，提高了开发的效率

### 2 Bootstrap 使用

在现阶段我们还没有接触JS相关课程，所以我们只考虑使用它的样式库。 控制权在框架本身，使用者要按照框架所规定的某种规范进行开发。 Bootstrap 使用四步曲：

- 创建文件夹结构
- 创建 html 骨架结构
- 引入相关样式文件
- 书写内容

1. 创建文件夹结构

   ```
   bootstrap
     -css
     -fonts
     -js
   css
   images
   index.htmlCopy to clipboardErrorCopied
   ```

2. HTML 骨架结构

   ```html
   <!--要求当前网页使用IE浏览器最高版本的内核来渲染-->
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <!--视口的设置：视口的宽度和设备一致，默认的缩放比例和PC端一致，用户不能自行缩放-->
   <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
   <!--[if lt IE 9]>
   <!-- 解决ie9以下浏览器对html5新增标签的不识别，并导致CSS不起作用的问题 -->
   <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
   <!--解决ie9以下浏览器对css3 Media Query 的不识别-->
   <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
   <![endif]-->Copy to clipboardErrorCopied
   ```

3. 引入相关样式文件

   ```html
   <!-- Bootstrap 核心样式-->
   <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">Copy to clipboardErrorCopied
   ```

4. 书写内容

   - 直接拿 Bootstrap 预先定义好的样式来使用
   - 修改 Bootstrap 原来的样式，注意权重问题
   - 学好 Bootstrap 的关键在于知道它定义了哪些样式，以及这些样式能实现什么样的效果

### 3 布局容器

Bootstrap 需要为页面内容和栅格系统包裹一个 `.container` 容器，它提供了两个作此用处的类。

1. ```
   container
   ```

    

   类

   - 响应式布局的容器固定宽度
   - 大屏( >=1200px) 宽度定为1170px
   - 中屏( >=992px) 宽度定为970px
   - 小屏( >=768px) 宽度定为750px
   - 超小屏(100%)

2. ```
   container-fluid
   ```

   类

   - 流式布局容器百分百宽度
   - 占据全部视口（viewport）的容器。

### 4 Bootstrap 栅格系统

#### 4.1 栅格系统简介

栅格系统英文为 “grid systems”，也有人翻译为 “网格系统”，它是指将页面布局划分为等宽的列，然后通过列数的定义来模块化页面布局。

Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。

#### 4.2 栅格选型参数

栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。 ![bootstrap1](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/JavaScript/bootstrap1.1m7bvtbk5nb4.png)

- 按照不同屏幕划分为 1~12 等份
- 行（row）可以去除父容器作用15px的边距
- xs-extra small：超小；sm-small：小；md-medium：中等；lg-large：大；
- 列（column）大于12，多余的 “列（column）”所在的元素将被作为一个整体另起一行排列
- 每一列默认有左右15像素的 `padding`
- 可以同时为一列指定多个设备的类名，以便划分不同份数例如 `class="col-md-4 col-sm-6"`

例如，`col-lg-3 col-md-4 col-sm-6 col-xm-12` 表示随着屏幕尺寸的缩小，每一行能放的盒子变为 4、3、2、1。

```html
<!-- 有12个，则可以占满一行 -->
<div class="row">
    <div class="col-lg-3 col-md-4 col-sm-6 col-xm-12">1</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xm-12">2</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xm-12">3</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xm-12">4</div>
</div>
<!-- 有12个，则可以占满一行，不同份数表示了所占比例 -->
<div class="row">
    <div class="col-lg-1">1</div>
    <div class="col-lg-2">2</div>
    <div class="col-lg-3">3</div>
    <div class="col-lg-6">4</div>
</div>
<!-- 不足12个，则空出多余 -->
<div class="row">
    <div class="col-lg-3">1</div>
    <div class="col-lg-3">2</div>
    <div class="col-lg-3">3</div>
    <div class="col-lg-2">4</div>
</div>
<!-- 超出12个，则放到下一行 -->
<div class="row">
    <div class="col-lg-3">1</div>
    <div class="col-lg-3">2</div>
    <div class="col-lg-3">3</div>
    <div class="col-lg-4">4</div>
</div>Copy to clipboardErrorCopied
```

以上代码布局效果如下： ![bootstrap2](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/JavaScript/bootstrap2.4p4qg771eju0.png)

#### 4.3 列嵌套

栅格系统内置的栅格系统将内容再次嵌套。简单理解就是一个列内再分成若干份小列。我们可以通过添加一个新的 `.row` 元素和一系列 `.col-sm-*` 元素到已经存在的 `.col-sm-*` 元素内。

```html
<div class="container">
    <div class="row">
        <div class="col-md-4">
            <div class="row">
                <div class="col-md-6">第一小列</div>
                <div class="col-md-6">第二小列</div>
            </div>
        </div>
        <div class="col-md-4">第二列</div>
        <div class="col-md-4">第三列</div>
    </div>
</div>Copy to clipboardErrorCopied
```

布局效果如下： ![bootstrap3](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/docs/bootstrap3.6h721zqvizg0.png)

#### 4.4 列偏移

使用 `.col-md-offset-*` 类可以将列向右侧偏移。这些类实际是通过使用 `*` 选择器为当前元素增加了左侧的边距（margin）。

```html
<div class="container">
    <div class="row">
        <div class="col-md-4">1</div>
        <div class="col-md-4 col-md-offset-4">2</div>
    </div>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">0</div>
    </div>
</div>Copy to clipboardErrorCopied
```

布局效果如下： ![bootstrap4](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/docs/bootstrap4.6be7qk9e7a00.png)

#### 4.5 列排序

通过使用 `.col-md-push-*` 和 `.col-md-pull-*` 类就可以很容易的改变列（`column`）的顺序。

```html
<div class="container">
    <div class="row">
        <div class="col-md-4">左侧盒子</div>
        <div class="col-md-8">右侧盒子</div>
    </div>
    <div class="row">
        <div class="col-md-4 col-md-push-8">左侧盒子</div>
        <div class="col-md-8 col-md-pull-4">右侧盒子</div>
    </div>
</div>Copy to clipboardErrorCopied
```

布局效果如下： ![bootstrap5](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/docs/bootstrap5.5cko3xntd2c0.png)

#### 4.6 响应式工具

为了加快对移动设备友好的页面开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示 或隐藏页面内容。除了有 `.hidden-xm` 等响应式隐藏工具类外，还有 `.visible-xm` 等响应式显示工具类，当屏幕处于超小屏幕（手机）时显示。

![bootstrap6](https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/docs/bootstrap6.shwuo5yaj4w.png)

### 5 阿里百秀首页案例

- 技术选型：HTML5/CSS3/Bootstrap3
- 项目地址：https://github.com/Hacker-C/Alibaixiu
- 域名访问：[https://alibaixiu.vercel.app](https://alibaixiu.vercel.app/)

# d6 grid布局

## 01 概述

网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。

<img src="https://i0.hdslb.com/bfs/album/2729550f5b4e45483dd0521776047c455a544861.png" alt="img" style="zoom:50%;" />

上图这样的布局，就是 Grid 布局的拿手好戏。

Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内多个项目的位置。但是它们也存在重大区别。

Flex 布局是轴线布局，只能指定 “项目” 针对轴线的位置，可以看作是**一维布局**。（善于单行单列）

Grid 布局则是将容器划分成 “行” 和 “列” 产生单元格，然后指定 “项目所在” 的单元格，可以看作是**二维布局**。

Grid 布局远比 Flex 布局强大。

> 目前 Grid 布局的浏览器兼容性不是太好，移动端比 PC 端要好得多。

## 02 基本概念

![webp](https://i0.hdslb.com/bfs/album/8967e17bdb9223a952bc90d8307b69f264fb1f75.jpg)

### 2.1 容器和项目

采用网格布局的区域，称为 “容器”（container）。容器内部采用网格定位的子元素，称为 “项目”（item）。

```html
<div>
  <div><p>1</p></div>
  <div><p>2</p></div>
  <div><p>3</p></div>
</div>
```

上面代码中，最外层的 `<div>` 元素就是容器，内层的三个 `<div>` 元素就是项目。

注意：项目只能是容器的顶层子元素，不包含项目的子元素，比如上面代码的 `<p>` 元素就不是项目。Grid 布局只对项目生效。

### 2.2 行和列

容器里面的水平区域称为 “行”（row），垂直区域称为 “列”（column）。

<img src="https://i0.hdslb.com/bfs/album/f33c8a992cb3b51f0a5a3e78cef3193163eb096b.png" alt="img" style="zoom:50%;" />

上图中，水平的深色区域就是 “行”，垂直的深色区域就是 “列”。

### 2.3 单元格

行和列的交叉区域，称为 “单元格”（cell）。

正常情况下，`n` 行和 `m` 列会产生 `n x m` 个单元格。比如，3 行 3 列会产生 9 个单元格。

### 2.4 网格线

划分网格的线，称为 “网格线”（grid line）。水平网格线划分出行，垂直网格线划分出列。

正常情况下，`n` 行有 `n + 1` 根水平网格线，`m` 列有 `m + 1` 根垂直网格线，比如三行就有四根水平网格线。

<img src="https://i0.hdslb.com/bfs/album/7530d44a520865ed6cf9f44c0480daaf2e843a2e.png" alt="img" style="zoom: 67%;" />

上图是一个 4 x 4 的网格，共有 5 根水平网格线和 5 根垂直网格线。

## 03 容器属性

Grid 布局的属性分成两类。一类定义在容器上面，称为**容器属性**；另一类定义在项目上面，称为**项目属性**。这部分先介绍容器属性。

### 3.1 display 属性

`display: grid` 指定一个容器采用网格布局。

- 默认情况下，容器元素都是块级元素

![img](https://i0.hdslb.com/bfs/album/15bc7e7000e8c29525336ffd00acf8fa5fd8cf60.png)

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">
    <title>默认情况下，容器元素都是块级元素</title>
    <style>
        span {
            font-size: 2em;
        }

        #container {
            display: grid;
            /* grid-template-columns属性定义每一列的列宽 */
            grid-template-columns: 50px 50px 50px;
            /* grid-template-rows属性定义每一行的行高 */
            grid-template-rows: 50px 50px 50px;
        }

        .item {
            font-size: 2em;
            text-align: center;
            border: 1px solid #e5e4e9;
        }

        .item-1 {
            background-color: #ef342a;
        }

        .item-2 {
            background-color: #f68f26;
        }

        .item-3 {
            background-color: #4ba946;
        }

        .item-4 {
            background-color: #0376c2;
        }

        .item-5 {
            background-color: #c077af;
        }

        .item-6 {
            background-color: #f8d29d;
        }

        .item-7 {
            background-color: #b5a87f;
        }

        .item-8 {
            background-color: #d0e4a9;
        }

        .item-9 {
            background-color: #4dc7ec;
        }
    </style>
</head>
<body>
<span>foo</span>
<div id="container">
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
    <div class="item item-6">6</div>
    <div class="item item-7">7</div>
    <div class="item item-8">8</div>
    <div class="item item-9">9</div>
</div>
<span>bar</span>
</body>
</html>
```

- 容器元素也可以设成行内元素。

![img](https://i0.hdslb.com/bfs/album/f0cbf1115b811a2f03686463d7fd057675f9235e.png)

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">
    <title>容器元素也可以设置为行内元素</title>
    <style>
        span {
            font-size: 2em;
        }

        #container {
            display: inline-grid;
            /* grid-template-columns属性定义每一列的列宽 */
            grid-template-columns: 50px 50px 50px;
            /* grid-template-rows属性定义每一行的行高 */
            grid-template-rows: 50px 50px 50px;
        }

        .item {
            font-size: 2em;
            text-align: center;
            border: 1px solid #e5e4e9;
        }

        .item-1 {
            background-color: #ef342a;
        }

        .item-2 {
            background-color: #f68f26;
        }

        .item-3 {
            background-color: #4ba946;
        }

        .item-4 {
            background-color: #0376c2;
        }

        .item-5 {
            background-color: #c077af;
        }

        .item-6 {
            background-color: #f8d29d;
        }

        .item-7 {
            background-color: #b5a87f;
        }

        .item-8 {
            background-color: #d0e4a9;
        }

        .item-9 {
            background-color: #4dc7ec;
        }
    </style>
</head>
<body>
<span>foo</span>
<div id="container">
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
    <div class="item item-6">6</div>
    <div class="item item-7">7</div>
    <div class="item item-8">8</div>
    <div class="item item-9">9</div>
</div>
<span>bar</span>
</body>
</html>
```

> 注意，设为网格布局以后，容器子元素（项目）的 `float`、`display: inline-block`、`display: table-cell`、`vertical-align` 和 `column-*` 等设置都将失效。

### 3.2 grid-template-columns 属性，grid-template-rows 属性

容器指定了网格布局以后，接着就要划分行和列。

`grid-template-columns` 属性定义每一列的列宽，`grid-template-rows` 属性定义每一行的行高。

> 若只指定了 `grid-template-columns`，没有指定 `grid-template-rows` 或是指定的  `grid-template-rows` 行数不够，那么浏览器会自动增加行以确保能装下容器里的所有项目（增加行的高度由浏览器自行决定，一般行的高度为：恰好能装下项目内容）。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;  //3列
  grid-template-rows: 100px 100px 100px;  //3行
}
```

上面代码指定了一个三行三列的网格，列宽和行高都是 `100px`。

<img src="https://i0.hdslb.com/bfs/album/7bda51a2a535c4d781a1c3a5f8a4aaa87de1adb8.png" alt="img" style="zoom:50%;" />

除了使用绝对单位，也可以使用百分比。

> 百分比是基于容器宽度的比例。

```css
.container {
  display: grid;
  /* 100 ÷ 3 ≈ 33.33333333333333（一般保留两位小数即可）*/
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

**（1）repeat()**

有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用 `repeat()` 函数，简化重复的值。上面的代码用 `repeat()` 改写如下。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}
```

`repeat()` 接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。

`repeat()` 重复某种模式也是可以的。

```css
grid-template-columns: repeat(2, 100px 20px 80px);
/* 100px 20px 80px 100px 20px 80px */
```

上面代码定义了 6 列，第一列和第四列的宽度为 `100px`，第二列和第五列为 `20px`，第三列和第六列为 `80px`。

<img src="https://i0.hdslb.com/bfs/album/0ac7a520f35bac1cde134c0974f4760deb7a7c23.png" alt="img" style="zoom:50%;" />

**（2）auto-fill 关键字**

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用 `auto-fill` 关键字表示自动填充。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

上面代码表示每列宽度 `100px`，然后自动填充，直到容器不能放置更多的列，然后换行继续依次排列。

<img src="https://i0.hdslb.com/bfs/album/bb329a4740bf0330af65f903ad136ed6da0c9dab.png" alt="img" style="zoom:50%;" />

> auto-fill 尽可能多
>
> auto-fit 尽可能少

**（3）fr 关键字**

`fr`：剩余空间分配数。

fr单位被用于在一系列长度值中分配剩余空间，如果多个已指定了多个部分，则剩下的空间根据各自的数字按比例分配。简单来说fr就是讲剩余空间等比例划分，然后将剩余空间按照一定的比例分给容器。

如果两列的宽度分别为 `1fr` 和 `2fr`，就表示后者是前者的两倍。

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

上面代码表示两个相同宽度的列。

<img src="https://i0.hdslb.com/bfs/album/de3dc2e7a33393de88ba844a8e26c29a63469f58.png" alt="img" style="zoom: 33%;" />

`fr` 可以与绝对长度的单位结合使用，这时会非常方便。

```css
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```

上面代码表示，第一列的宽度为 150 像素，第二列的宽度是第三列的一半。

<img src="https://i0.hdslb.com/bfs/album/0d69856921eb1c34a39ccc423ee2753bdbf864f1.png" alt="image-20220227180532881" style="zoom:33%;" />

**（4）minmax()**

`minmax()` 函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
grid-template-columns: 1fr 1fr minmax(auto, min-content);
grid-template-columns: 1fr 1fr minmax(100px, max-content);
```

上面代码中，`minmax(100px, 1fr)` 表示列宽不小于 `100px`，不大于 `1fr`。

![1](https://i0.hdslb.com/bfs/album/19bd0f1c75ed0ce732cb30a8c13a91ea5fe8b695.gif)

**（5）auto 关键字**

`auto` 关键字表示由浏览器自己决定长度。

```css
grid-template-columns: 100px auto 100px;
```

上面代码中，第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了 `min-width`，且这个值大于最大宽度。

**（6）网格线的名称**

`grid-template-columns` 属性和 `grid-template-rows` 属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

上面代码指定网格布局为 3 行 3 列，因此有 4 根垂直网格线和 4 根水平网格线。方括号里面依次是这八根线的名字。

网格布局允许同一根线有多个名字，比如 `[fifth-line row-5]`。

**（7）布局实例**

`grid-template-columns` 属性对于网页布局非常有用。两栏式布局只需要一行代码。

```css
.wrapper {
  display: grid;
  grid-template-columns: 70% 30%;
}
```

上面代码将左边栏设为 70%，右边栏设为 30%。

传统的十二网格布局，写起来也很容易。

```css
grid-template-columns: repeat(12, 1fr);
```

### 3.3 grid-row-gap 属性，grid-column-gap 属性，grid-gap 属性

`grid-row-gap` 属性设置行与行的间隔（行间距），`grid-column-gap` 属性设置列与列的间隔（列间距）。

```css
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
```

上面代码中，`grid-row-gap` 用于设置行间距，`grid-column-gap` 用于设置列间距。

<img src="https://i0.hdslb.com/bfs/album/ab2d32f340b80ea9a3d5414f296945ba8621eb70.png" alt="img" style="zoom:50%;" />

`grid-gap` 属性是 `grid-column-gap` 和 `grid-row-gap` 的合并简写形式，语法如下。

```css
grid-gap: <grid-row-gap> <grid-column-gap>;
```

因此，上面一段 CSS 代码等同于下面的代码。

```css
.container {
  grid-gap: 20px 20px;
}
```

如果 `grid-gap` 省略了第二个值，浏览器认为第二个值等于第一个值。

> 根据最新标准，上面三个属性名的 `grid-` 前缀已经删除，`grid-column-gap` 和 `grid-row-gap` 写成 `column-gap` 和 `row-gap`，`grid-gap` 写成 `gap`。

### 3.4 grid-template-areas 属性

网格布局允许指定 “区域”（area），一个区域由单个或多个单元格组成。`grid-template-areas` 属性用于定义区域。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```

上面代码先划分出9个单元格，然后将其定名为 `a` 到 `i` 的九个区域，分别对应这九个单元格。

多个单元格合并成一个区域的写法如下。

```css
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
```

上面代码将 9 个单元格分成 `a`、`b`、`c` 三个区域。

下面是一个布局实例。

```css
grid-template-areas: "header header header"
                     "main main sidebar"
                     "footer footer footer";
```

上面代码中，顶部是页眉区域 `header`，底部是页脚区域 `footer`，中间部分则为 `main` 和 `sidebar`。

如果某些区域不需要利用，则使用 “点”（`.`）表示。

```css
grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
```

上面代码中，中间一列为点，表示没有用到该单元格，或者该单元格不属于任何区域。

> 注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为 `区域名-start`，终止网格线自动命名为 `区域名-end`。
>
> 比如，区域名为 `header`，则起始位置的水平网格线和垂直网格线叫做 `header-start`，终止位置的水平网格线和垂直网格线叫做 `header-end`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>区域</title>
    <style>
        .container {
            width: 980px;
            height: 600px;
            margin: 10px auto;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
                                "header header header"
                                "main main sidebar"
                                "footer footer footer";
        }

        .header {
            grid-area: header;
            background-color: red;
        }

        .main {
            grid-area: main;
            background-color: green;
        }

        .sidebar {
            grid-area: sidebar;
            background-color: blue;
        }

        .footer {
            grid-area: footer;
            background-color: gray;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header"></div>
    <div class="main"></div>
    <div class="sidebar"></div>
    <div class="footer"></div>
</div>
</body>
</html>
```

![image-20220227184302178](https://i0.hdslb.com/bfs/album/81a3c64d60d7a2c8111ea0404ad4b3ca983044b5.png)

### 3.5 grid-auto-flow 属性

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是 “先行后列”，即先填满第一行，再开始放入第二行，即下图数字的顺序。

<img src="https://i0.hdslb.com/bfs/album/7bda51a2a535c4d781a1c3a5f8a4aaa87de1adb8.png" alt="img" style="zoom:50%;" />

这个顺序由 `grid-auto-flow` 属性决定，默认值是 `row`，即 “先行后列”。也可以将它设成 `column`，变成 “先列后行”。

```css
grid-auto-flow: column;
```

上面代码设置了 `column` 以后，放置顺序就变成了下图。

<img src="https://i0.hdslb.com/bfs/album/720f94e4f0fcf584362634a6e9a011c99fde4dd3.png" alt="img" style="zoom:50%;" />

`grid-auto-flow` 属性除了设置成 `row` 和 `column`，还可以设成 `row dense` 和 `column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

下面的例子让 1 号项目和 2 号项目各占据两个单元格，然后在默认的 `grid-auto-flow: row` 情况下，会产生下面这样的布局。

<img src="https://i0.hdslb.com/bfs/album/e7b63c4e053828a45ff96705907f44b3c85cc7d0.png" alt="img" style="zoom:50%;" />

上图中，1 号项目后面的位置是空的，这是因为 3 号项目默认跟着 2 号项目，所以会排在 2 号项目后面。

现在修改设置，设为 `row dense`，表示 “先行后列”，并且尽可能紧密填满，尽量不出现空格。

```css
grid-auto-flow: row dense;
```

上面代码的效果如下。

<img src="https://i0.hdslb.com/bfs/album/54b532fbca61efb06b09c8e3b62dea2ceaa5b1ca.png" alt="img" style="zoom:50%;" />

上图会先填满第一行，再填满第二行，所以 3 号项目就会紧跟在 1 号项目的后面。8 号项目和 9 号项目就会排到第四行。

如果将设置改为 `column dense`，表示 “先列后行”，并且尽量填满空格。

```css
grid-auto-flow: column dense;
```

上面代码的效果如下。

<img src="https://i0.hdslb.com/bfs/album/7d32bdff8491eb68e07b45cafcad42021b545d2d.png" alt="img" style="zoom:50%;" />

上图会先填满第一列，再填满第 2 列，所以 3 号项目在第一列，4 号项目在第二列。8 号项目和 9 号项目被挤到了第四列。

[瀑布流]

### 3.6 justify-items 属性，align-items 属性，place-items 属性

`justify-items` 属性设置单元格内容的水平位置（左中右），`align-items` 属性设置单元格内容的垂直位置（上中下）。

```css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```

这两个属性的写法完全相同，都可以取下面这些值。

> - start：对齐单元格的起始边缘。
> - end：对齐单元格的结束边缘。
> - center：单元格内部居中。
> - stretch：拉伸，占满单元格的整个宽度（默认值）。

```css
.container {
  justify-items: start;
}
```

上面代码表示，单元格的内容左对齐，效果如下图。

![img](https://i0.hdslb.com/bfs/album/4bfb4eb6d827eb24072f94cf2fa744534b8f7b6d.png)

```css
.container {
  align-items: start;
}
```

上面代码表示，单元格的内容头部对齐，效果如下图。

![img](https://i0.hdslb.com/bfs/album/501ac28d9e1306c1dfc3af381bc1f1d1b2a4d345.png)

`place-items` 属性是 `align-items` 属性和 `justify-items` 属性的合并简写形式。

```css
place-items: <align-items> <justify-items>;
```

下面是一个例子。

```css
place-items: start end;
```

如果省略第二个值，则浏览器认为与第一个值相等。

### 3.7 justify-content 属性，align-content 属性，place-content 属性

`justify-content` 属性是整个内容区域在容器里面的水平位置（左中右），`align-content` 属性是整个内容区域的垂直位置（上中下）。

```css
.container {
	justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
	align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```

这两个属性的写法完全相同，都可以取下面这些值。（下面的图都以 `justify-content` 属性为例，`align-content` 属性的图完全一样，只是将水平方向改成垂直方向。）

> - start - 对齐容器的起始边框。

![img](https://i0.hdslb.com/bfs/album/af4a3d2bbfd66c22785b3682d26ed6726fabfbcd.png)

> - end - 对齐容器的结束边框。

![img](https://i0.hdslb.com/bfs/album/e31f94bb725893d6a55f37001ca1e733243d83ea.png)

> - center - 容器内部居中。

![img](https://i0.hdslb.com/bfs/album/2d3d12d17283e06deb570eecb29a2cc1e3a77955.png)

> - stretch - 项目大小没有指定时，拉伸占据整个网格容器。

![img](https://i0.hdslb.com/bfs/album/ba90587fff83e94d0513aeb8bdeb106087a50391.png)

> - space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。

![img](https://i0.hdslb.com/bfs/album/6e3c96971ff12f5928ce75f0cc6c94ab00272d4d.png)

> - space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。

![img](https://i0.hdslb.com/bfs/album/5c874eb112fdb09b5398bc37d9420c7add488aa9.png)

> - space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

![img](https://i0.hdslb.com/bfs/album/6fab85e3fba58e5a6e5ac13a749d0969a646306e.png)

`place-content` 属性是 `align-content` 属性和 `justify-content` 属性的合并简写形式。

```css
place-content: <align-content> <justify-content>
```

下面是一个例子。

```css
place-content: space-around space-evenly;
```

如果省略第二个值，浏览器就会假定第二个值等于第一个值。

### 3.8 grid-auto-columns 属性，grid-auto-rows 属性

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有 3 行，但是某一个项目指定在第 5 行。这时，浏览器会自动生成多余的网格，以便放置项目。

`grid-auto-columns` 属性和 `grid-auto-rows` 属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与 `grid-template-columns` 和 `grid-template-rows` 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

下面的例子里面，划分好的网格是 3 行 3 列，但是，8 号项目指定在第 4 行，9 号项目指定在第 5 行。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>grid-auto</title>
    <style>
        #container {
            display: grid;
            grid-template-columns: 100px 100px 100px;
            grid-template-rows: 100px 100px 100px;
            grid-auto-rows: 50px;
        }

        .item {
            font-size: 2em;
            text-align: center;
            border: 1px solid #e5e4e9;
        }

        .item-1 {
            background-color: #ef342a;
        }

        .item-2 {
            background-color: #f68f26;
        }

        .item-3 {
            background-color: #4ba946;
        }

        .item-4 {
            background-color: #0376c2;
        }

        .item-5 {
            background-color: #c077af;
        }

        .item-6 {
            background-color: #f8d29d;
        }

        .item-7 {
            background-color: #b5a87f;
        }

        .item-8 {
            background-color: #d0e4a9;
            grid-row-start: 4;
            grid-column-start: 2;
        }

        .item-9 {
            background-color: #4dc7ec;
            grid-row-start: 5;
            grid-column-start: 3;
        }
    </style>
</head>
<body>
<div id="container">
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
    <div class="item item-6">6</div>
    <div class="item item-7">7</div>
    <div class="item item-8">8</div>
    <div class="item item-9">9</div>
</div>
</body>
</html>
```

上面代码指定新增的行高统一为 50px（原始的行高为 100px）。

<img src="https://i0.hdslb.com/bfs/album/ca1fb291705d46ee27c028b27331fad282aab498.png" alt="img" style="zoom:50%;" />

### 3.9 grid-template 属性，grid 属性

`grid-template` 属性是 `grid-template-columns`、`grid-template-rows` 和 `grid-template-areas` 这三个属性的合并简写形式。

`grid` 属性是 `grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow` 这六个属性的合并简写形式。

从易读易写的角度考虑，还是建议不要合并属性，所以这里就不详细介绍这两个属性了。

## 04 项目属性

> 下面这些属性定义在项目上面。

### 4.1 grid-column-start 属性，grid-column-end 属性，grid-row-start 属性，grid-row-end 属性

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

- `grid-column-start` 属性：左边框所在的垂直网格线
- `grid-column-end` 属性：右边框所在的垂直网格线
- `grid-row-start` 属性：上边框所在的水平网格线
- `grid-row-end` 属性：下边框所在的水平网格线

```css
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}
```

上面代码指定，1 号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。

<img src="https://i0.hdslb.com/bfs/album/efa5d993b2a3296b7b14dbdb16a6bc0c379ded53.png" alt="img" style="zoom:50%;" />

上图中，只指定了 1 号项目的左右边框，没有指定上下边框，所以会采用默认位置，即上边框是第一根水平网格线，下边框是第二根水平网格线。

除了 1 号项目以外，其他项目都没有指定位置，由浏览器自动布局，这时它们的位置由容器的 `grid-auto-flow` 属性决定，这个属性的默认值是 `row`，因此会 “先行后列” 进行排列。读者可以把这个属性的值分别改成 `column`、`row dense` 和 `column dense`，看看其他项目的位置发生了怎样的变化。

下面的例子是指定四个边框位置的效果。

```css
.item-1 {
    grid-column-start: 1;
    grid-column-end: 3;  //可以用-1
    grid-row-start: 2;
    grid-row-end: 4;
}
```

<img src="https://i0.hdslb.com/bfs/album/9520dddf1a9772b9422709b79025e72c2981aed6.png" alt="img" style="zoom:50%;" />

这四个属性的值，除了指定为第几个网格线，还可以指定为网格线的名字。

```css
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}
```

上面代码中，左边框和右边框的位置，都指定为网格线的名字。

这四个属性的值还可以使用 `span` 关键字，表示 “跨越”，即左右边框（上下边框）之间跨越多少个网格。

```css
.item-1 {
  grid-column-start: span 2;
}
```

上面代码表示，1 号项目的左边框距离右边框跨越 2 个网格。

<img src="https://i0.hdslb.com/bfs/album/a79f91fb10774fb02ff9eda1b4138fa56de415b7.png" alt="img" style="zoom:50%;" />

这与下面的代码效果完全一样。

```css
.item-1 {
  grid-column-end: span 2;
}
```

> 使用这四个属性，如果产生了项目的重叠，则使用 `z-index` 属性指定项目的重叠顺序。
>
> > 在 CSS Grid 布局中，我们可以通过网格项目放置的方式，让不同的元素重叠在一起，并且通过 CSS 的 `z-index` 来控制网格项目在 `z` 轴上的层叠顺序。也就是说，以往需要使用 CSS 的 [`position` 的绝对定位（`absolute`）来实现的布局](https://www.w3cplus.com/css/css-position-and-z-index.html)，现在可以直接使用 CSS Grid 来解决。
> > 原文: https://www.w3cplus.com/css/overlapping-grid-layout.html © [w3cplus.com](https://www.w3cplus.com/)
> >
> > <img src="https://i0.hdslb.com/bfs/album/73ae3caba94597aa5377e324421870fd1a8fa56d.jpg" alt="img" style="zoom: 25%;" />
> >
> > <img src="https://i0.hdslb.com/bfs/album/344d017f370f6a8a386d339c281396d49775afeb.jpg" alt="img" style="zoom:25%;" />

### 4.2 grid-column 属性，grid-row 属性

`grid-column` 属性是 `grid-column-start` 和 `grid-column-end` 的合并简写形式，`grid-row` 属性是`grid-row-start` 属性和 `grid-row-end` 的合并简写形式。

```css
.item {
  grid-column: <start-line> / <end-line>;  //同时设置列开始结束
  grid-row: <start-line> / <end-line>;  //同时设置行开始结束
}
```

下面是一个例子。

```css
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```

上面代码中，项目 `item-1` 占据第一行，从第一根列线到第三根列线。

这两个属性之中，也可以使用 `span` 关键字，表示跨越多少个网格。

```css
.item-1 {
  background: #b03532;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
/* 等同于 */
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
```

上面代码中，项目 `item-1` 占据的区域，包括第一行 + 第二行、第一列 + 第二列。

<img src="https://i0.hdslb.com/bfs/album/9d9e0bb28aaf2773c7e7248e4328f1ffff0d5e69.png" alt="img" style="zoom:50%;" />

斜杠以及后面的部分可以省略，默认跨越一个网格。

```css
.item-1 {
  grid-column: 1;
  grid-row: 1;
}
```

上面代码中，项目 `item-1` 占据左上角第一个网格。

### 4.3 grid-area 属性

`grid-area` 属性指定项目放在哪一个区域。

```css
.item-1 {
    grid-area: e;
}
```

上面代码中，1 号项目位于 `e` 区域，效果如下图。

<img src="https://i0.hdslb.com/bfs/album/9ab03a62905e1159d9dd9f61caea448a66954805.png" alt="img" style="zoom:50%;" />

`grid-area` 属性还可用作 `grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end` 的合并简写形式，直接指定项目的位置。

```css
.item {
	grid-area: <row-start> / <column-start> / <row-end> / <column-end>;    
    //同时设置行列开始结束
}
```

下面是一个例子。

```css
.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```

<img src="https://i0.hdslb.com/bfs/album/5ecb9ee008a2f1ee5691bd6256f94e7a0f092671.png" alt="image-20220228102207300" style="zoom: 33%;" />

### 4.4 justify-self 属性，align-self 属性，place-self 属性

`justify-self` 属性设置单元格内容的水平位置（左中右），跟 `justify-items` 属性的用法完全一致，但只作用于单个项目。

`align-self` 属性设置单元格内容的垂直位置（上中下），跟 `align-items` 属性的用法完全一致，也是只作用于单个项目。

```css
.item {
    justify-self: start | end | center | stretch;
    align-self: start | end | center | stretch;
}
```

这两个属性都可以取下面四个值。

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

下面是 `justify-self: start` 的例子。

```css
.item-1  {
    justify-self: start;
}
```

<img src="https://i0.hdslb.com/bfs/album/d97149ca810107414bd95d92c73fe2ef67d3dc27.png" alt="image-20230130145300501" style="zoom: 50%;" />

`place-self` 属性是 `align-self` 属性和 `justify-self` 属性的合并简写形式。

```css
place-self: <align-self> <justify-self>;
```

下面是一个例子。

```css
place-self: center center;
```

如果省略第二个值，`place-self` 属性会认为这两个值相等。

## 05 grid 布局工具

[零代码 - 在线快速设计CSS网页布局 (lingdaima.com)](https://www.lingdaima.com/grid/)

![image-20220228120835928](https://i0.hdslb.com/bfs/album/13a0a3f27542882e8eac074663e83b3f2faac8a0.png)

# 预编译器

# d7 less

## 01 维护CSS的弊端

CSS 是一门非程序式语言，没有变量、函数、SCOPE（作用域）等概念。

- CSS 需要书写大量看似没有逻辑的代码，CSS 冗余度是比较高的
- 不方便维护及扩展，不利于复用
- CSS 没有很好的计算能力
- 非前端开发工程师来讲，往往会因为缺少 CSS 编写经验而很难写出组织良好且易于维护的 CSS 代码项目

## 02 Less介绍

Less（Leaner Style Sheets 的缩写）是一门 CSS 扩展语言，也称为 CSS 预处理器。

做为 CSS 的一种形式的扩展，它并没有减少 CSS 的功能，而是在现有的 CSS 语法上，为 CSS 加入程序式语言的特性。

它在 CSS 的语法基础上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了 CSS 的编写，并且降低了 CSS 的维护成本，就像它的名称所说的那样，Less 可以让我们用更少的代码做更多的事情。

Less 中文网址：[Less 快速入门 | Less.js 中文文档 - Less 中文网 (bootcss.com)](https://less.bootcss.com/)

常见的 CSS 预处理器：Sass、Less、Stylus

一句话：Less 是一门 CSS 预处理语言，它扩展了 CSS 的动态特性。

## 03.Less安装

**用node运行Less**

1. 安装 node.js，可选择版本（8.0），网址：http://nodejs.cn/download/
2. 检查是否安装成功，使用 cmd 命令输入 `node -v` 查看版本即可
3. 基于 node.js 在线安装 Less，使用 cmd 命令输入 `npm install -g less` 即可
4. 检查是否安装成功，使用 cmd 命令 `lessc -v` 查看版本即可

**vscode使用Less**

本质上，Less 包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 CSS 文件。

所以，我们需要把我们的 Less 文件，编译生成为 CSS 文件，这样我们的 HTML 页面才能使用。

【VSCode Less 插件】

vscode 的 Easy LESS 插件

这个插件可以自动将`less`文件转义成`css`文件
**关于配置**

![image-20220820200608896](https://i0.hdslb.com/bfs/album/414fbd1d48b8bce8313ae5ddc66469d7b3548974.png)

**settings.json配置如下**

```json
"less.compile": {
        "compress": true, // true => remove surplus whitespace
        "sourceMap": true, // true => generate source maps (.css.map files)将浏览器审查元素中css代码在css文件中的位置改成对应的less文件中的位置
        "out": true // false => DON'T output .css files (overridable per-file, see below)生成对应的css文件
    }
```

只要保存一下 less 文件，会自动生成 CSS 文件。

## 04 注释(Comments)

- 多行注释保留
- 单行注释不被保留在编译生成的 CSS 中

```less
/* 
 * 一个块注释
 * style comment! 
*/

// 这一行被注释掉了！
div {
  color: red;
}
```

## 05 变量(Variables)

变量是指没有固定值，可以改变的。因为我们 CSS 中的一些颜色和数值等经常使用。

`@变量名: 值;`

### 5.1 变量命名规范

- 必须有 `@` 为前缀
- 不能包含特殊字符
- 不能以数字开头
- 大小写敏感

`@color: pink;`

### 5.2 基本使用

```less
// 直接使用
body {
    color: @color;
}

a:hover {
    color: @color;
}
```

### 5.3 变量插值(Variable Interpolation)

变量用于选择器名、属性名、URL、`@import`语句

```less
@my-selector: banner;

// 需要添加 {}
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

```less
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

```less
// Variables
@images: '../img';

// Usage
body {
  color: #444;
  background: url('@{images}/white-sand.png');
}
```

```less
// Variables
@themes: '../../src/themes';

// Usage
@import '@{themes}/tidal-wave.less';
```

### 5.4 延迟加载(Lazy Evaluation)

当一个变量被声明多次，会取最后一次的值，并从当前作用域往外寻找变量。

```less
@var: 0;
.class {
  @var: 1;
  .brass {
    @var: 2;
    three: @var;
    @var: 3;
  }
  one: @var;
}
```

**编译后**

```css
.class {
  one: 1;
}
.class .brass {
  three: 3;
}
```

### 5.5 属性名变量(Properties as Variables)

```less
.widget {
  color: #efefef;
  background-color: $color;
}
```

**编译后**

```css
.widget {
  color: #efefef;
  background-color: #efefef;
}
```

## 06 嵌套(Nesting)

### 6.1 基本使用

Less 提供了使用嵌套(nesting)代替层叠或与层叠结合使用的能力

【我们经常用到选择器的嵌套】

```css
#header .logo {
    width: 300px;
}
```

【less 嵌套写法】

```less
#header {
    .logo {
        width: 300px;
    }
}
```

> 用 Less 书写的代码更加简洁，并且模仿了 HTML 的组织结构。

### 6.2 父选择器 (Parent Selectors)

在嵌套规则中， `&` 表示父选择器，常用于给现有选择器添加伪类。

```less
.header {
  a {
    color: blue;
    &:hover {
      color: green;
    }
  }
}
```

**编译后**

```css
.header a {
  color: blue;
}
.header a:hover {
  color: green;
}
```

你还可以使用此方法将伪选择器（pseudo-selectors）与混合（mixins）一同使用。下面是一个经典的 clearfix 技巧，重写为一个混合（mixin） (& 表示当前选择器的父级）：

```less
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```

## 07 混合(Mixins)

混合(Mixin)是一种将一组属性从一个规则集包含(或混入)到另一个规则集的方式，可理解为复制粘贴。

### 7.1 普通混合

1. 定义了一个bordered类
2. 如果希望在其它规则集中使用这些属性，只需像下面这样输入所需属性的类（class）名称即可

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#menu a {
  color: #111;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.post a {
  color: red;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

```less
// 使用类选择器时可以在选择器后边添加一个括号，这时我们实际上就创建了一个mixins
// 这种是不会被识别进css
.myMixin() {
  width: 400px;
  height: 400px;
}

.p4 {
  .myMixin; //.myMixin();都可以
}
```

### 7.2 带参数的混合(Parametric Mixins)

1. 混合带参数，参数需要按顺序传递

```less
.border(@width, @style, @color) {
  border: @width @style @color;
}
div {
  .border(1px, solid, #ccc);
}
```

```css
div {
  border: 1px solid #ccc;
}
```

2. 混合带参数并有默认值

需注意的是，就算有默认值，也要按顺序传递

```less
.border(@width, @style, @color: #ccc) {
  border: @width @style @color;
}
div {
  .border(1px, solid);
}

// 会出错
.border(@width: 1px, @style, @color) {
  border: @width @style @color;
}
div {
  .border(solid, #ccc);
}
```

### 7.3 命名参数

可以在向混合传参是指定参数名称，从而不需要按顺序传入

```less
.border(@width, @style, @color: #ccc) {
  border: @width @style @color;
}
div {
  .border(@style: solid, @color: red, @width: 100px);
}
```

### 7.4 @arguments 变量

`@arguments` 变量包含了传入的所有参数

```less
.box-shadow(@x: 0, @y: 0, @blur: 1px, @color: #000) {
  -webkit-box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px, 5px);
}
```

```css
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
  -moz-box-shadow: 2px 5px 1px #000;
  box-shadow: 2px 5px 1px #000;
}
```

### 7.5 匹配模式(Pattern-matching)

在多个相同的混合中(参数个数必须相同)，匹配特定的混合。

```less
.mixin(dark, @color) {
  color: darken(@color, 10%);
}
.mixin(light, @color) {
  color: lighten(@color, 10%);
}
// @_ 表示匹配所有
.mixin(@_, @color) {
  display: block;
}

@switch: light;

.class {
  .mixin(@switch, #888);
}
```

```css
.class {
  color: #a2a2a2;
  display: block;
}
```

### 7.6 运算(Operations)

任何数字、颜色或者变量都可以参与运算。就是 Less 提供了加（+）、减（-）、乘（*）、除（/）算术运算。

```less
/* Less 里面写 */
@width: 10px + 5;

div {
    border: @width solid red;
}

/* Less 甚至还可以这样 */
width: (@width + 5) * 2;
```

【生成的 css】

```css
div {
    border: 15px solid red;
}
```

注意：

- 乘号（*）和除号（/）的写法要牢记
- 运算符中间左右必须有个空格隔开 `1px + 5`
- 在新版本的 Less 中，除法有变动，应将 `100px / 10` 改为 `(100px / 10)`，否则没有效果
- 对于两个不同的单位的值之间的运算，运算结果的值取第一个值的单位
- 如果两个值之间只有一个值有单位，则运算结果就取该单位

计算结果以操作数最左侧的单位类型为准

```less
@conversion-1: 5cm + 10mm; // 6cm
@conversion-2: 2 - 3cm - 5mm; // -1.5cm
@conversion-3: 3.1 * 2cm; // 6.2cm
@conversion-4: 4px / 2; // 4px / 2

// conversion is impossible
@incompatible-units: 1cm - 1px; // 0.97354167cm

// example with variables
@base: 5%;
@filler: @base * 2; // 10%
@other: @base + @filler; // 15%

@color: #224488 / 2; // #112244
background-color: #112244 + #111; // #223355
```

## 08 继承(Extend)

Extend Syntax

- 继承可让多个选择器应用同一组属性，最终编译为并集选择器
- 其性能比混合高，但灵活性比混合低

```less
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
```

```css
nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
```

## 09 避免编译

通过加引号可以避免 Less 编译，直接把内容输出到 CSS 中

```less
.banner .inline .header {
  width: '100px + 100px';
  height: 100px + 100px;
}
```

```css
.banner .inline .header {
  width: '100px + 100px';
  height: 200px;
}
```

## 10 函数（Functions）

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。这些函数在Less 函数手册中有详细介绍。

函数的用法非常简单。下面这个例子将介绍如何利用 percentage 函数将 0.5 转换为 50%，将颜色饱和度增加 5%，以及颜色亮度降低 25% 并且色相值增加 8 等用法：

```less
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

## 11 导入（Importing）

你可以导入一个 .less 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 .less 扩展名，则可以将扩展名省略掉：

```less
@import url("syntax.less");//url可以不加但是可能会有问题
@import "library"; // library.less
@import "typo.css";
```

## 12 导出

**手动给每个less文件指定导出**

导出必须写到第一行

```less
// out: 路径/文件名
// out: ./mycss/pink.css
```

设置导出：  当面目录下，创建一个 mycss 文件夹， 生成 一个 pink.css （做了改名）

------

```less
// out: ./mycss/
```

设置导出：  当面目录下，创建一个 mycss 文件夹， 生成 一个 跟less一样的文件名（原名）

**less 禁止导出**

```less
// out: false
```

# d8 sass



# d9 Tailwind CSS

