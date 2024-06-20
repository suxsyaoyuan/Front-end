# Echarts

# 01 介绍

常见的数据可视化库：

- D3.js   目前 Web 端评价最高的 Javascript 可视化工具库(入手难)  
- ECharts.js   百度出品的一个开源 Javascript 数据可视化库   
- Highcharts.js  国外的前端数据可视化库，非商用免费，被许多国外大公司所使用  
- AntV  蚂蚁金服全新一代数据可视化解决方案  等等
- Highcharts 和 Echarts 就像是 Office 和 WPS 的关系

Echarts：

ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖矢量图形库 [ZRender](https://github.com/ecomfe/zrender)，提供直观，交互丰富，可高度个性化定制的数据可视化图表。

大白话：

- 是一个JS插件
- 性能好可流畅运行PC与移动设备
- 兼容主流浏览器
- 提供很多常用图表，且可**定制**。
  - [折线图](https://www.echartsjs.com/zh/option.html#series-line)、[柱状图](https://www.echartsjs.com/zh/option.html#series-bar)、[散点图](https://www.echartsjs.com/zh/option.html#series-scatter)、[饼图](https://www.echartsjs.com/zh/option.html#series-pie)、[K线图](https://www.echartsjs.com/zh/option.html#series-candlestick)

官网地址：<https://www.echartsjs.com/zh/index.html>

ECharts 包含了以下特性：

- **丰富的可视化类型**: 提供了常规的折线图、柱状图、散点图、饼图、K线图，用于统计的盒形图，用于地理数据可视化的地图、热力图、线图，用于关系数据可视化的关系图、treemap、旭日图，多维数据可视化的平行坐标，还有用于 BI 的漏斗图，仪表盘，并且支持图与图之间的混搭。
- **多种数据格式无需转换直接使用**: 内置的 dataset 属性（4.0+）支持直接传入包括二维表，key-value 等多种格式的数据源，此外还支持输入 TypedArray 格式的数据。
- **千万数据的前端展现**: 通过增量渲染技术（4.0+），配合各种细致的优化，ECharts 能够展现千万级的数据量。
- **移动端优化**: 针对移动端交互做了细致的优化，例如移动端小屏上适于用手指在坐标系中进行缩放、平移。 PC 端也可以用鼠标在图中进行缩放（用鼠标滚轮）、平移等。
- **多渲染方案，跨平台使用**: 支持以 Canvas、SVG（4.0+）、VML 的形式渲染图表。
- **深度的交互式数据探索**: 提供了 图例、视觉映射、数据区域缩放、tooltip、数据刷选等开箱即用的交互组件，可以对数据进行多维度数据筛取、视图缩放、展示细节等交互操作。
- **多维数据的支持以及丰富的视觉编码手段**: 对于传统的散点图等，传入的数据也可以是多个维度的。
- **动态数据**: 数据的改变驱动图表展现的改变。
- **绚丽的特效**: 针对线数据，点数据等地理数据的可视化提供了吸引眼球的特效。
- **通过 GL 实现更多更强大绚丽的三维可视化**: 在 VR，大屏场景里实现三维的可视化效果。
- **无障碍访问（4.0+）**: 支持自动根据图表配置项智能生成描述，使得盲人可以在朗读设备的帮助下了解图表内容，让图表可以被更多人群访问！

# 02 使用步骤

官方教程：[五分钟上手ECharts](https://www.echartsjs.com/zh/tutorial.html#5 分钟上手 ECharts)

> 引入echarts 插件文件到html页面中、准备一个有宽、高的DOM容器、初始化echarts实例对象、指定配置项和数据(option)、将配置项设置给echarts实例对象。

- 下载echarts  https://github.com/apache/incubator-echarts/tree/4.5.0  
- 引入echarts  `dist/echarts.min.js`

```html
<script src="js/echarts.min.js"></script>
```

- 准备一个具备大小的DOM容器

```html
<div id="main" style="width: 600px;height:400px;"></div>
```

- ###### 初始化echarts实例对象

```js
var myChart = echarts.init(document.getElementById('main'));
```

- 指定配置项和数据(option)

```js
var option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
```

- 将配置项设置给echarts实例对象

```js
myChart.setOption(option);
```

整体的代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入echarts.js文件 -->
    <script src="./lib/echarts.min.js"></script>  
    <script>
        onload=()=>{
            // 初始化echarts实例对象 其中init函数参数为dom元素，决定图标最终展示的位置
            var myECharts = echarts.init(document.querySelector('#root'));
            // 准备配置项！
            var option ={
                xAxis:{   //直角坐标系中的x轴
                    type:'category',  //类目轴
                    data:['兰博基尼','劳斯莱斯','梅赛德斯']  //具体的类目
                },
                yAxis:{  //直角坐标系中的y轴
                    type:'value'  //数值轴 从series中取得数据
                },
                series:[  //系列列表，每个系列通过type决定自己的图表类型
                    {
                        name:'价格',   
                        type:'bar',  //图表类型
                        data:[50000000,52000000,49000000]
                    }
                ]
            }
            // 将配置项设置给echarts实例对象
            myECharts.setOption(option);
        }
    </script>
</head>
<body>
    <!-- 准备一个图表容器盒子 -->
    <div id="root" style="width: 700px; height: 500px;"></div>
</body>
</html>
```

# 03 三种引入方式

## 3.1 使用script标签引入

我们可以在直接下载 echarts.min.js 并用 `<script>` 标签引入。

[echarts.min.js(4.7.0)](https://cdn.staticfile.org/echarts/4.7.0/echarts.min.js)

另外，开发环境下可以使用源代码版本 echarts.js 并用 `<script>` 标签引入，源码版本包含了常见的错误提示和警告。

[echarts.js(4.7.0)](https://cdn.staticfile.org/echarts/4.7.0/echarts.js)

我们也可以在 ECharts 的官网上直接下载更多丰富的版本，包含了不同主题跟语言，下载地址：https://echarts.apache.org/zh/download.html。

这些构建好的 echarts 提供了下面这几种定制：

- 完全版：`echarts/dist/echarts.js`，体积最大，包含所有的图表和组件，所包含内容参见：`echarts/echarts.all.js`。
- 常用版：`echarts/dist/echarts.common.js`，体积适中，包含常见的图表和组件，所包含内容参见：`echarts/echarts.common.js`。
- 精简版：`echarts/dist/echarts.simple.js`，体积较小，仅包含最常用的图表和组件，所包含内容参见：`echarts/echarts.simple.js`。

![image-20220728190830134](https://i0.hdslb.com/bfs/album/96ee88b4af60d447475e0df7bd6ef7c81fcab45a.png)

![image-20220728190941509](https://i0.hdslb.com/bfs/album/15080083e000c5412f5a96c395f7554c66cb4e83.png)

**使用例子如下：**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>第一个 ECharts 实例</title>
    <!-- 引入 echarts.js 文件-->
 
    <!-- 方式一：通过<script>引入 -->
    <script src="../EChart/echarts.js"></script>
</head>
 
<body>
    <div id="chart" style="width: 500px;height:500px;"></div>
    <script type="text/javascript">
        var Chart = echarts.init(document.getElementById('chart'));
        var option = {
            title: {
                text: 'My Chart Example'
            },
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["语文", "数学", "英语", "生物", "地理", "化学"]
            },
            yAxis: {},
            series: [{
                name: '科目',
                type: 'bar',
                data: [90, 80, 100, 70, 88, 93]
            }]
        };
 
        Chart.setOption(option);
    </script>
</body>
</html>
```

## 3.2 使用CDN方法

以下推荐国外比较稳定的两个 CDN，国内还没发现哪一家比较好，目前还是建议下载到本地。

- **Staticfile CDN（国内）** : https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js
- **jsDelivr**：https://cdn.jsdelivr.net/npm/echarts@4.3.0/dist/echarts.min.js。
- **cdnjs** : https://cdnjs.cloudflare.com/ajax/libs/echarts/4.3.0/echarts.min.js

**具体例子如下：**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>第一个 ECharts 实例</title>
    <!-- 引入 echarts.js 文件-->
 
    <!-- 方式二 -->
    <script src=" https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>
    <!-- 或者 方式三  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.3.0/echarts.min.js"></script>
 
</head>
 
<body>
    <div id="chart" style="width: 500px;height:500px;"></div>
    <script type="text/javascript">
        var Chart = echarts.init(document.getElementById('chart'));
        var option = {
            title: {
                text: 'My Chart Example'
            },
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["语文", "数学", "英语", "生物", "地理", "化学"]
            },
            yAxis: {},
            series: [{
                name: '科目',
                type: 'bar',
                data: [90, 80, 100, 70, 88, 93]
            }]
        };
 
        Chart.setOption(option);
    </script>
</body>
 
</html>
```

## 3.3 npm方法

  第三种是通过`NPM`方式实现。

  需要注意的是，用NPM安装EChart，NPM的版本必须大于3.0。

 1.查看npm版本：npm 

 2.升级或安装cnpm：npm install cnpm -g

 3.升级npm：cnpm install npm -g

 4.通过cnpm获取echarts：cnpm install echarts --save

安装完成后 ECharts 和 zrender 会放在 node_modules 目录下。

![image-20220728191337397](https://i0.hdslb.com/bfs/album/7ffb680dff4547ab3d5a58d68281f868592e985c.png)

   然后，我们可以直接在项目代码中使用 require('echarts') 来使用。

**例子如下：**

```html
    <script type="text/javascript">
        var charts = require('echarts');
         var Chart = charts.init(document.getElementById('chart'));
        var option = {
            title: {
                text: 'My Chart Example'
            },
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["语文", "数学", "英语", "生物", "地理", "化学"]
            },
            yAxis: {},
            series: [{
                name: '科目',
                type: 'bar',
                data: [90, 80, 100, 70, 88, 93]
            }]
        };
 
        Chart.setOption(option);
    </script>
```

# 04 基础配置

**可查询官方手册：**[Documentation - Apache ECharts](https://echarts.apache.org/zh/option.html#title)

> 需要了解的主要配置：`series` `xAxis` `yAxis` `grid` `tooltip` `title` `legend` `color` 

- series

  - 系列列表。每个系列通过 `type` 决定自己的图表类型
  - 大白话：图标数据，指定什么类型的图标，可以多个图表重叠。

- xAxis：直角坐标系 grid 中的 x 轴

  - boundaryGap: 坐标轴两边留白策略 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。

- yAxis：直角坐标系 grid 中的 y 轴

- grid：直角坐标系内绘图网格。 

- title：标题组件

- tooltip：提示框组件

- legend：图例组件

- color：调色盘颜色列表

- stack：数据堆叠，同个类目轴上系列配置相同的stack值后 后一个系列的值会在前一个系列的值上相加。

> echarts改不了y轴的值？
> 首先要知道type坐标轴类型有:
> 1. 'value'数值轴，适用于连续数据。
> 2.'category'类目轴，适用于离散的类目数据，为该
> 类型时必须通过data设置类目数据。
> 3.'time'时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
> 4.log'对数轴。适用于对数数据。
>
> axislabel中的{value}就是y轴的每个值，是连续值，它是本身有给出固定的数值，0,50,100,150,200这样，可以设置最大值最小值，可以根据数值间隔interval更改y轴的值，官方名词这个值叫刻度标签值好像是。


## 4.1 title标题

title：标题

- 文字样式 textStyle
- 标题边框
  - borderWidth
  - borderColor
  - borderRadius
- 标题位置
  - top
  - bottom
  - left
  - right

```js
title:{  //标题
    text:'汽车价格柱状图',  //标题文字
    textStyle:{  //文字样式
    	color:'#4DBCFF'
    },
    borderWidth:1,  //标题边框宽度
    borderColor:'#302C3A', //边框颜色
    borderRadius:5,  //边框圆角
    left:30  //标题位置偏移
},
```

## 4.2 tooltip提示

tooltip：提示

- 触发类型：trigger
  - item
  - axis
- 触发时机：triggerOn
  - mousemove
  - click
- 格式化：formatter
  - 模板字符串
  - 回调函数

```js
tooltip: {  //提示
    trigger: 'item',  //触发类型  item/axis
    triggerOn: 'click',  //触发时机  mousemove/click
    formatter(arg) {
        // console.log(arg)
        return arg.name + '的价格：' + arg.data
    }  //格式化
},
```

## 4.3 toolbox工具按钮

toolbox：工具按钮

- saveAsImage：导出图片
- dataView：数据视图
- restore：重置
- dataZoom：区域缩放
- magicType：切换图表类型

```js
toolbox:{  //工具
    feature:{  
        saveAsImage:{},  //导出图片
        dataView:{},  //数据视图
        restore:{},  //重置
        dataZoom:{},  //区域缩放
        magicType:{  //切换图表类型
            type:['bar','line']  //line:折线图
        }
    }
},
```

## 4.4 legend图例筛选

legend：图例筛选

```js
legend:{
	data:['价格','人气']
},

//与系列配合
series: [  //系列列表，每个系列通过type决定自己的图表类型
    {
        name: '价格',
        type: 'bar',  //图表类型（柱状图）
        data: [50000000, 52000000, 49000000, 25000000, 36000000]
    },
    {
        name: '人气',
        type: 'bar',  //图表类型（柱状图）
        data: [50052118, 42358004, 49447899, 95880012, 36000000]
    }
]
```

## 注释：以下为直角坐标系中的常用配置

## 4.5 grid网格 

网格 grid

```js
grid:{
    show:true,
    borderWidth:5,
    borderColor:'skyblue',
    width:500,
    height:350,
    top:50,
    left:100,
},
```

## 4.6 axis坐标轴 

坐标轴 axis

- 分为 xAxis（x轴），yAxis（y轴）
- 轴类型 type
  - value：数值轴，自动会从目标数据中读取数据
  - category：类目轴，该类型必须通过data设置类目数据
- 显示位置 position
  - xAxis：可以取值为top或者bottom
  - yAxis：可以取值为left或者right

## 4.7 dataZoom区域缩放 

区域缩放 dataZoom

- 用于区域缩放，对数据范围过滤，x轴y轴等候可以拥有
- dataZoom是一个数组，可以配置多个缩放区域
- 类型 type
  - slider：滑块
  - inside：内置，通过鼠标滚轮
- 指明作用轴
  - xAxisIndex
  - yAxisIndex
- 指明初始缩放情况
  - start：起始百分比
  - end：终止百分比

## 4.8 series中的type类型

**系列列表**

每个系列通过 type 决定自己的图表类型:

```js
series: [{
    name: '销量',  // 系列名称
    type: 'bar',  // 系列图表类型
    data: [5, 20, 36, 10, 10, 20]  // 系列中的数据内容
}]
```

每个系列通过 type 决定自己的图表类型：

- **type: 'bar'**：柱状/条形图
- **type: 'line'**：折线/面积图
- **type: 'pie'**：饼图
- **type: 'scatter'**：散点（气泡）图
- **type: 'effectScatter'**：带有涟漪特效动画的散点（气泡）
- **type: 'radar'**：雷达图
- **type: 'tree'**：树型图
- **type: 'treemap'**：树型图
- **type: 'sunburst'**：旭日图
- **type: 'boxplot'**：箱形图
- **type: 'candlestick'**：K线图
- **type: 'heatmap'**：热力图
- **type: 'map'**：地图
- **type: 'parallel'**：平行坐标系的系列
- **type: 'lines'**：线图
- **type: 'graph'**：关系图
- **type: 'sankey'**：桑基图
- **type: 'funnel'**：漏斗图
- **type: 'gauge'**：仪表盘
- **type: 'pictorialBar'**：象形柱图
- **type: 'themeRiver'**：主题河流
- **type: 'custom'**：自定义系列

## 4.9 小结

**常见类型**

| 类型           | 配置                                                         |
| -------------- | ------------------------------------------------------------ |
| 柱状图 bar     | seriess[].type、xAxis、yAxis、markPoint、markLine、label、barWidth |
| 折线图 line    | seriess[].type、xAxis、yAxis、markPoint、markLine、markArea、smooth、lineStyle、areaStyle、boundaryGap、scale |
| 散点图 scatter | seriess[].type、xAxis、yAxis、symbolSize、itemStyle、showEffectOn、rippleEffect、scale |
| 饼图 pie       | seriess[].type、label、radius、roseType、selectedMode、selectedOffset |
| 地图 map       | seriess[].type、geo、map、roam、zoom、center、label、GeoIndex、visualMap、coordinateSystem |
| 雷达图 radar   | seriess[].type、radar、indicator、label、areaStyle、shape    |
| 仪表盘 gauge   | seriess[].type、max、min、itemStyle                          |

**常见配置项**

| 配置项   | 具体配置项                                                   |
| :------- | ------------------------------------------------------------ |
| grid     | show、borderWidth、borderColor、left、top、right、bottom、width、height |
| axis     | type、data、position                                         |
| dataZoom | type、xAxisIndex、yAxisIndex、start、end                     |

**这三个只适合直角坐标系（柱状图** bar**、折线图** line**、散点图** scatter**）**

| 配置项      | 具体配置项                                                   |
| ----------- | ------------------------------------------------------------ |
| **title**   | textStyle、borderWidth、borderColor、borderRadius、left、top、right、bottom |
| **tooltip** | trigger、triggerOn、formatter                                |
| **toolbox** | feature、saveAsImage、dataView、restore、dataZoom、magicType |
| **legend**  | data                                                         |

**使用场景**

- **柱状图**：柱状图描述的是分类数据，呈现的是每一一个分类中有多少
- **折线图**：折线图常用来分析数据随时间的变化趋势
- **散点图**：散点图可以帮助我们推断出不同维度数据之间的相关性
- **饼图**：饼图可以很好地帮助用户快速了解不同分类的数据的占比情况
- **地图**：地图主要可以帮助我们从宏观的角度快速看出不同地理位置上数据的差异
- **雷达图**：雷达图可以用来分析多个维度的数据与标准数据的对比情况。
- **仪表盘**：仪表盘可以更直观的表现出某个指标的进度或实际情况

## 4.10 案例

```html
<!DOCTYPE html>
<html>
 
<head>
    <meta charset="utf-8">
    <title>第一个 ECharts 实例</title>
    <!--步骤一： 引入 echarts.js 文件-->
    <script src="../EChart/echarts.js"></script>
</head>
 
<body>
    <!-- 步骤二：定义一个容器，用于绘制图表 -->
    <div id="chart" style="width: 500px;height:500px;"></div>
 
    <!-- 步骤三：配置图表相关属性 -->
    <script type="text/javascript">
        var Chart = echarts.init(document.getElementById('chart'));//获取ID为chart的组件，再这里绘制图表
        //option 中的都是图表的相关属性
        var option = {
            //1.图表额标题
            title: {
                text: 'My Chart Example'
            },
            //2.图表的图例
            legend: {
                //这一种是可以自己设置图例样式
                // data: [{
                //     name: '科目',
                //     // 强制设置图形为圆。
                //     icon: 'circle',
                //     // 设置文本为红色
                //     textStyle: {
                //         color: 'red'
                //     }
                // }]
                x: '75%', //设置图例X轴位置
                y: '10px',//设置Y轴位置
                orient: 'Vertical', //图例列表的布局朝向。
                data: ['科目']   //这一种是简单模式
            },
            //3.提示信息（鼠标放到图表上时会显示提示信息）
            tooltip: {
                show: true
            },
            //4.要再X轴显示的项
            xAxis: {
                data: ["语文", "数学", "英语", "生物", "地理", "化学"]
            },
            //5.要再y轴显示的项
            yAxis: {},
            //6.设置系列列表
            series: [{
                name: '科目', //系列名称
                type: 'bar',//这个系例图表的类型
                color: ['MediumPurple'],//设置颜色，这个属于调色盘，放到系列中，只针对本系列设置颜色，如果放到option下，就是对所有的系列进行这个调色盘设置。
                data: [90, 80, 100, 70, 88, 93]  //系列中的数据
            }]
        };
 
        //7.设置刚指定的配置项和数据显示图表
        Chart.setOption(option);
    </script>
</body>
 
</html>
```

**上面代码效果如图显示：** 

![image-20220728192900995](https://i0.hdslb.com/bfs/album/882c8684fbe71c2e73e20f41a8360a7a7fee5746.png)





# 05 各个配置项详细说明总结

```js
theme = {
    // 全图默认背景
    // backgroundColor: 'rgba(0,0,0,0)',

    // 默认色板
    color: ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
            '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
            '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
            '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],

    // 图表标题
    title: {
        x: 'left',                 // 水平安放位置，默认为左对齐，可选为：
                                   // 'center' ¦ 'left' ¦ 'right'
                                   // ¦ {number}（x坐标，单位px）
        y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                   // 'top' ¦ 'bottom' ¦ 'center'
                                   // ¦ {number}（y坐标，单位px）
        //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#ccc',       // 标题边框颜色
        borderWidth: 0,            // 标题边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 标题内边距，单位px，默认各方向内边距为5，
                                   // 接受数组分别设定上右下左边距，同css
        itemGap: 10,               // 主副标题纵向间隔，单位px，默认为10，
        textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: '#333'          // 主标题文字颜色
        },
        subtextStyle: {
            color: '#aaa'          // 副标题文字颜色
        }
    },

    // 图例
    legend: {
        orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                   // 'horizontal' ¦ 'vertical'
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
                                   // 'center' ¦ 'left' ¦ 'right'
                                   // ¦ {number}（x坐标，单位px）
        y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                   // 'top' ¦ 'bottom' ¦ 'center'
                                   // ¦ {number}（y坐标，单位px）
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#ccc',       // 图例边框颜色
        borderWidth: 0,            // 图例边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 图例内边距，单位px，默认各方向内边距为5，
                                   // 接受数组分别设定上右下左边距，同css
        itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
                                   // 横向布局时为水平间隔，纵向布局时为纵向间隔
        itemWidth: 20,             // 图例图形宽度
        itemHeight: 14,            // 图例图形高度
        textStyle: {
            color: '#333'          // 图例文字颜色
        }
    },

    // 值域
    dataRange: {
        orient: 'vertical',        // 布局方式，默认为垂直布局，可选为：
                                   // 'horizontal' ¦ 'vertical'
        x: 'left',                 // 水平安放位置，默认为全图左对齐，可选为：
                                   // 'center' ¦ 'left' ¦ 'right'
                                   // ¦ {number}（x坐标，单位px）
        y: 'bottom',               // 垂直安放位置，默认为全图底部，可选为：
                                   // 'top' ¦ 'bottom' ¦ 'center'
                                   // ¦ {number}（y坐标，单位px）
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#ccc',       // 值域边框颜色
        borderWidth: 0,            // 值域边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 值域内边距，单位px，默认各方向内边距为5，
                                   // 接受数组分别设定上右下左边距，同css
        itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
                                   // 横向布局时为水平间隔，纵向布局时为纵向间隔
        itemWidth: 20,             // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
        itemHeight: 14,            // 值域图形高度，线性渐变垂直布局高度为该值 * 10
        splitNumber: 5,            // 分割段数，默认为5，为0时为线性渐变
        color:['#1e90ff','#f0ffff'],//颜色 
        //text:['高','低'],         // 文本，默认为数值文本
        textStyle: {
            color: '#333'          // 值域文字颜色
        }
    },

    toolbox: {
        orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                   // 'horizontal' ¦ 'vertical'
        x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                   // 'center' ¦ 'left' ¦ 'right'
                                   // ¦ {number}（x坐标，单位px）
        y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                   // 'top' ¦ 'bottom' ¦ 'center'
                                   // ¦ {number}（y坐标，单位px）
        color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
        backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
        borderColor: '#ccc',       // 工具箱边框颜色
        borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
                                   // 接受数组分别设定上右下左边距，同css
        itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
                                   // 横向布局时为水平间隔，纵向布局时为纵向间隔
        itemSize: 16,              // 工具箱图形宽度
        featureImageIcon : {},     // 自定义图片icon
        featureTitle : {
            mark : '辅助线开关',
            markUndo : '删除辅助线',
            markClear : '清空辅助线',
            dataZoom : '区域缩放',
            dataZoomReset : '区域缩放后退',
            dataView : '数据视图',
            lineChart : '折线图切换',
            barChart : '柱形图切换',
            restore : '还原',
            saveAsImage : '保存为图片'
        }
    },

    // 提示框
    tooltip: {
        trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
        showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        hideDelay: 100,            // 隐藏延迟，单位ms
        transitionDuration : 0.4,  // 动画变换时间，单位s
        backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
        borderColor: '#333',       // 提示边框颜色
        borderRadius: 4,           // 提示边框圆角，单位px，默认为4
        borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
                                   // 接受数组分别设定上右下左边距，同css
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle : {          // 直线指示器样式设置
                color: '#48b',
                width: 2,
                type: 'solid'
            },
            shadowStyle : {                       // 阴影指示器样式设置
                width: 'auto',                   // 阴影大小
                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
            }
        },
        textStyle: {
            color: '#fff'
        }
    },

    // 区域缩放控制器
    dataZoom: {
        orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                   // 'horizontal' ¦ 'vertical'
        // x: {number},            // 水平安放位置，默认为根据grid参数适配，可选为：
                                   // {number}（x坐标，单位px）
        // y: {number},            // 垂直安放位置，默认为根据grid参数适配，可选为：
                                   // {number}（y坐标，单位px）
        // width: {number},        // 指定宽度，横向布局时默认为根据grid参数适配
        // height: {number},       // 指定高度，纵向布局时默认为根据grid参数适配
        backgroundColor: 'rgba(0,0,0,0)',       // 背景颜色
        dataBackgroundColor: '#eee',            // 数据背景颜色
        fillerColor: 'rgba(144,197,237,0.2)',   // 填充颜色
        handleColor: 'rgba(70,130,180,0.8)'     // 手柄颜色
    },

    // 网格
    grid: {
        x: 80,
        y: 60,
        x2: 80,
        y2: 60,
        // width: {totalWidth} - x - x2,
        // height: {totalHeight} - y - y2,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: '#ccc'
    },

    // 类目轴
    categoryAxis: {
        position: 'bottom',    // 位置
        nameLocation: 'end',   // 坐标轴名字位置，支持'start' | 'end'
        boundaryGap: true,     // 类目起始和结束两端空白策略
        axisLine: {            // 坐标轴线
            show: true,        // 默认显示，属性show控制显示与否
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#48b',
                width: 2,
                type: 'solid'
            }
        },
        axisTick: {            // 坐标轴小标记
            show: true,       // 属性show控制显示与否，默认不显示
            interval: 'auto',
            // onGap: null,
            inside : false,    // 控制小标记是否在grid里 
            length :5,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#333',
                width: 1
            }
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            interval: 'auto',
            rotate: 0,
            margin: 8,
            // formatter: null,
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#333'
            }
        },
        splitLine: {           // 分隔线
            show: true,        // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#ccc'],
                width: 1,
                type: 'solid'
            }
        },
        splitArea: {           // 分隔区域
            show: false,       // 默认不显示，属性show控制显示与否
            // onGap: null,
            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        position: 'left',      // 位置
        nameLocation: 'end',   // 坐标轴名字位置，支持'start' | 'end'
        nameTextStyle: {},     // 坐标轴文字样式，默认取全局样式
        boundaryGap: [0, 0],   // 数值起始和结束两端空白策略
        splitNumber: 5,        // 分割段数，默认为5
        axisLine: {            // 坐标轴线
            show: true,        // 默认显示，属性show控制显示与否
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#48b',
                width: 2,
                type: 'solid'
            }
        },
        axisTick: {            // 坐标轴小标记
            show: false,       // 属性show控制显示与否，默认不显示
            inside : false,    // 控制小标记是否在grid里 
            length :5,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#333',
                width: 1
            }
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            rotate: 0,
            margin: 8,
            // formatter: null,
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#333'
            }
        },
        splitLine: {           // 分隔线
            show: true,        // 默认显示，属性show控制显示与否
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#ccc'],
                width: 1,
                type: 'solid'
            }
        },
        splitArea: {           // 分隔区域
            show: false,       // 默认不显示，属性show控制显示与否
            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
            }
        }
    },

    polar : {
        center : ['50%', '50%'],    // 默认全局居中
        radius : '75%',
        startAngle : 90,
        splitNumber : 5,
        name : {
            show: true,
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#333'
            }
        },
        axisLine: {            // 坐标轴线
            show: true,        // 默认显示，属性show控制显示与否
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#ccc',
                width: 1,
                type: 'solid'
            }
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
            show: false,
            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#333'
            }
        },
        splitArea : {
            show : true,
            areaStyle : {
                color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
            }
        },
        splitLine : {
            show : true,
            lineStyle : {
                width : 1,
                color : '#ccc'
            }
        }
    },

    // 柱形图默认参数
    bar: {
        barMinHeight: 0,          // 最小高度改为0
        // barWidth: null,        // 默认自适应
        barGap: '30%',            // 柱间距离，默认为柱形宽度的30%，可设固定值
        barCategoryGap : '20%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值
        itemStyle: {
            normal: {
                // color: '各异',
                barBorderColor: '#fff',       // 柱条边线
                barBorderRadius: 0,           // 柱条边线圆角，单位px，默认为0
                barBorderWidth: 1,            // 柱条边线线宽，单位px，默认为1
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            },
            emphasis: {
                // color: '各异',
                barBorderColor: 'rgba(0,0,0,0)',   // 柱条边线
                barBorderRadius: 0,                // 柱条边线圆角，单位px，默认为0
                barBorderWidth: 1,                 // 柱条边线线宽，单位px，默认为1
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            }
        }
    },

    // 折线图默认参数
    line: {
        itemStyle: {
            normal: {
                // color: 各异,
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                lineStyle: {
                    width: 2,
                    type: 'solid',
                    shadowColor : 'rgba(0,0,0,0)', //默认透明
                    shadowBlur: 5,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3
                }
            },
            emphasis: {
                // color: 各异,
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            }
        },
        //smooth : false,
        //symbol: null,         // 拐点图形类型
        symbolSize: 2,          // 拐点图形大小
        //symbolRotate : null,  // 拐点图形旋转控制
        showAllSymbol: false    // 标志图形默认只有主轴显示（随主轴标签间隔隐藏策略）
    },

    // K线图默认参数
    k: {
        // barWidth : null          // 默认自适应
        // barMaxWidth : null       // 默认自适应 
        itemStyle: {
            normal: {
                color: '#fff',          // 阳线填充颜色
                color0: '#00aa11',      // 阴线填充颜色
                lineStyle: {
                    width: 1,
                    color: '#ff3200',   // 阳线边框颜色
                    color0: '#00aa11'   // 阴线边框颜色
                }
            },
            emphasis: {
                // color: 各异,
                // color0: 各异
            }
        }
    },

    // 散点图默认参数
    scatter: {
        //symbol: null,      // 图形类型
        symbolSize: 4,       // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
        //symbolRotate : null,  // 图形旋转控制
        large: false,        // 大规模散点图
        largeThreshold: 2000,// 大规模阀值，large为true且数据量>largeThreshold才启用大规模模式
        itemStyle: {
            normal: {
                // color: 各异,
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            },
            emphasis: {
                // color: '各异'
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            }
        }
    },

    // 雷达图默认参数
    radar : {
        itemStyle: {
            normal: {
                // color: 各异,
                label: {
                    show: false
                },
                lineStyle: {
                    width: 2,
                    type: 'solid'
                }
            },
            emphasis: {
                // color: 各异,
                label: {
                    show: false
                }
            }
        },
        //symbol: null,         // 拐点图形类型
        symbolSize: 2           // 可计算特性参数，空数据拖拽提示图形大小
        //symbolRotate : null,  // 图形旋转控制
    },

    // 饼图默认参数
    pie: {
        center : ['50%', '50%'],    // 默认全局居中
        radius : [0, '75%'],
        clockWise : false,          // 默认逆时针
        startAngle: 90,
        minAngle: 0,                // 最小角度改为0
        selectedOffset: 10,         // 选中是扇区偏移量
        itemStyle: {
            normal: {
                // color: 各异,
                borderColor: '#fff',
                borderWidth: 1,
                label: {
                    show: true,
                    position: 'outer'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                labelLine: {
                    show: true,
                    length: 20,
                    lineStyle: {
                        // color: 各异,
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            emphasis: {
                // color: 各异,
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                label: {
                    show: false
                    // position: 'outer'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                labelLine: {
                    show: false,
                    length: 20,
                    lineStyle: {
                        // color: 各异,
                        width: 1,
                        type: 'solid'
                    }
                }
            }
        }
    },

    map: {
        mapType: 'china',   // 各省的mapType暂时都用中文
        mapLocation: {
            x : 'center',
            y : 'center'
            // width    // 自适应
            // height   // 自适应
        },
        showLegendSymbol : true,       // 显示图例颜色标识（系列标识的小圆点），存在legend时生效
        itemStyle: {
            normal: {
                // color: 各异,
                borderColor: '#fff',
                borderWidth: 1,
                areaStyle: {
                    color: '#ccc'//rgba(135,206,250,0.8)
                },
                label: {
                    show: false,
                    textStyle: {
                        color: 'rgba(139,69,19,1)'
                    }
                }
            },
            emphasis: {                 // 也是选中样式
                // color: 各异,
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                areaStyle: {
                    color: 'rgba(255,215,0,0.8)'
                },
                label: {
                    show: false,
                    textStyle: {
                        color: 'rgba(139,69,19,1)'
                    }
                }
            }
        }
    },

    force : {
        // 数据map到圆的半径的最小值和最大值
        minRadius : 10,
        maxRadius : 20,
        density : 1.0,
        attractiveness : 1.0,
        // 初始化的随机大小位置
        initSize : 300,
        // 向心力因子，越大向心力越大
        centripetal : 1,
        // 冷却因子
        coolDown : 0.99,
        // 分类里如果有样式会覆盖节点默认样式
        itemStyle: {
            normal: {
                // color: 各异,
                label: {
                    show: false
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                nodeStyle : {
                    brushType : 'both',
                    color : '#f08c2e',
                    strokeColor : '#5182ab'
                },
                linkStyle : {
                    strokeColor : '#5182ab'
                }
            },
            emphasis: {
                // color: 各异,
                label: {
                    show: false
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                nodeStyle : {},
                linkStyle : {}
            }
        }
    },

    chord : {
        radius : ['65%', '75%'],
        center : ['50%', '50%'],
        padding : 2,
        sort : 'none', // can be 'none', 'ascending', 'descending'
        sortSub : 'none', // can be 'none', 'ascending', 'descending'
        startAngle : 90,
        clockWise : false,
        showScale : false,
        showScaleText : false,
        itemStyle : {
            normal : {
                label : {
                    show : true
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                lineStyle : {
                    width : 0,
                    color : '#000'
                },
                chordStyle : {
                    lineStyle : {
                        width : 1,
                        color : '#666'
                    }
                }
            },
            emphasis : {
                lineStyle : {
                    width : 0,
                    color : '#000'
                },
                chordStyle : {
                    lineStyle : {
                        width : 2,
                        color : '#333'
                    }
                }
            }
        }
    },

    island: {
        r: 15,
        calculateStep: 0.1  // 滚轮可计算步长 0.1 = 10%
    },

    markPoint : {
        symbol: 'pin',         // 标注类型
        symbolSize: 10,        // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
        //symbolRotate : null, // 标注旋转控制
        itemStyle: {
            normal: {
                // color: 各异，
                // borderColor: 各异,     // 标注边线颜色，优先于color 
                borderWidth: 2,            // 标注边线线宽，单位px，默认为1
                label: {
                    show: true,
                    position: 'inside' // 可选为'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            },
            emphasis: {
                // color: 各异
                label: {
                    show: true
                    // position: 'inside'  // 'left'|'right'|'top'|'bottom'
                    // textStyle: null     // 默认使用全局文本样式，详见TEXTSTYLE
                }
            }
        }
    },

    markLine : {
        // 标线起始和结束的symbol介绍类型，如果都一样，可以直接传string
        symbol: ['circle', 'arrow'],  
        // 标线起始和结束的symbol大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
        symbolSize: [2, 4],
        // 标线起始和结束的symbol旋转控制
        //symbolRotate : null,
        itemStyle: {
            normal: {
                // color: 各异,           // 标线主色，线色，symbol主色
                // borderColor: 随color,     // 标线symbol边框颜色，优先于color 
                borderWidth: 2,          // 标线symbol边框线宽，单位px，默认为2
                label: {
                    show: false,
                    // 可选为 'start'|'end'|'left'|'right'|'top'|'bottom'
                    position: 'inside',  
                    textStyle: {         // 默认使用全局文本样式，详见TEXTSTYLE
                        color: '#333'
                    }
                },
                lineStyle: {
                    // color: 随borderColor, // 主色，线色，优先级高于borderColor和color
                    // width: 随borderWidth, // 优先于borderWidth
                    type: 'solid',
                    shadowColor : 'rgba(0,0,0,0)', //默认透明
                    shadowBlur: 5,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3
                }
            },
            emphasis: {
                // color: 各异
                label: {
                    show: false
                    // position: 'inside' // 'left'|'right'|'top'|'bottom'
                    // textStyle: null    // 默认使用全局文本样式，详见TEXTSTYLE
                },
                lineStyle : {}
            }
        }
    },

    textStyle: {
        decoration: 'none',
        fontFamily: 'Arial, Verdana, sans-serif',
        fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal'
    },

    // 默认标志图形类型列表
    symbolList : [
      'circle', 'rectangle', 'triangle', 'diamond',
      'emptyCircle', 'emptyRectangle', 'emptyTriangle', 'emptyDiamond'
    ],
    loadingText : 'Loading...',
    // 可计算特性配置，孤岛，提示颜色
    calculable: false,              // 默认关闭可计算特性
    calculableColor: 'rgba(255,165,0,0.6)',       // 拖拽提示边框颜色
    calculableHolderColor: '#ccc', // 可计算占位提示颜色
    nameConnector: ' & ',
    valueConnector: ' : ',
    animation: true,
    animationThreshold: 2500,       // 动画元素阀值，产生的图形原素超过2500不出动画
    addDataAnimation: true,         // 动态数据接口是否开启动画效果
    animationDuration: 2000,
    animationEasing: 'ExponentialOut'    //BounceOut
}
```

# 06 柱状图

## 6.1 常见效果：

- 标记

  - markPoint：标记点（最大值，最小值）
  - markLine：标记线（平均值）

- 显示

  - label：数值显示
  - barWidth：柱宽度
  - 调换x轴y轴实现横向柱状图


## 6.2 柱状图1（两大步骤）

- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表

### 6.2.1 找官网实例

引入到html页面中

~~~javascript
// 柱状图1模块
(function() {
  // 实例化对象
  let myChart = echarts.init(document.querySelector(".bar .chart"));
  // 指定配置和数据
  let option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  // 把配置给实例对象
  myChart.setOption(option);
})();
~~~

### 6.2.2 根据需求定制

根据需求定制

- 修改图表柱形颜色  #2f89cf


   - 修改图表大小  top 为 10px   bottom 为  4%    grid决定我们的柱状图的大小

   ~~~JavaScript
   // color设置我们线条的颜色 注意后面是个数组
      color: ['#2f89cf'],
  // 网格配置  grid可以控制线形图 柱状图 图表离上下左右边的距离
      grid: {
        left: '0%',
        top: '10px',
        right: '0%',
        bottom: '4%',
        // 是否显示刻度标签 如果是true 就显示 否则反之
        containLabel: true,
      },
   ~~~

   - X轴相关设置  xAxis
     - 文本颜色设置为   rgba(255,255,255,.6)   字体大小为 12px
     - X轴线的样式 不显示

   ~~~JavaScript
   // 设置x轴标签文字样式
  // x轴的文字颜色和大小
        axisLabel: {
          color: "rgba(255,255,255,.6)",
          fontSize: "12"
        },
      //  坐标轴轴线相关设置。
      axisLine: {
        // 是否显示坐标轴轴线。
        show: false,
        // 如果想要设置单独的线条样式
        lineStyle: {
          color: 'rgba(255,255,255,.1)',
          width: 1,
          type: 'solid',
        },
      },
   ~~~

   - Y 轴相关定制
     - 文本颜色设置为   rgba(255,255,255,.6)   字体大小为 12px
     - Y 轴线条样式 更改为  1像素的  rgba(255,255,255,.1) 边框
     - 分隔线的颜色修饰为  1像素的  rgba(255,255,255,.1)   

   ~~~JavaScript
        // 修改刻度标签 相关样式
        axisLabel: {
          color: 'rgba(255,255,255,.6) ',
          fontSize: 12,
        },
        // y轴坐标轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
            width: 2,
          },
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
   ~~~

   - 修改柱形为圆角以及柱子宽度  series 里面设置

   ~~~JavaScript
// 线的数据
series: [
      {
        // 移入提示文字
        name: '直接访问',
        type: 'bar',
        // 柱子的宽度
        barWidth: '35%',
        // 数据
        data: [200, 300, 300, 900, 1500, 1200, 600],
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },
    ],
   ~~~

   - 更换对应数据

   ~~~JavaScript
// x轴中更换data数据
 data: [ "旅游行业","教育培训", "游戏行业", "医疗行业", "电商行业", "社交行业", "金融行业" ],
// series 更换数据
 data: [200, 300, 300, 900, 1500, 1200, 600]
   ~~~

- 让图表跟随屏幕自适应

~~~javascript
  window.addEventListener("resize", function() {
    myChart.resize();
  });
~~~

**完整代码**

```js
// 柱形图1
(function () {
  // 实例化对象
  const barEchart = echarts.init(document.querySelector('.bar>.chart'));
  // 指定配置和数据
  const barOptions = {
    // color设置我们线条的颜色 注意后面是个数组
    color: ['#2f89cf'],
    // 图表的提示框组件
    tooltip: {
      // 触发方式
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    // 网格配置  grid可以控制线形图 柱状图 图表离上下左右边的距离
    grid: {
      left: '0%',
      top: '10px',
      right: '0%',
      bottom: '4%',
      // 是否显示刻度标签 如果是true 就显示 否则反之
      containLabel: true,
    },
    // 设置x轴的相关配置
    xAxis: {
      // 坐标轴类型 类目轴，适用于离散的类目数据
      type: 'category',
      /*
      类目数据，在类目轴（type: 'category'）中有效。
      如果没有设置 type，但是设置了 axis.data，则认为 type 是 'category'。
      */
      data: ['旅游行业', '教育培训', '游戏行业', '医疗行业', '电商行业', '社交行业', '金融行业'],
      // 是否让我们的线条和坐标轴有缝隙
      boundaryGap: true,
      // 坐标轴刻度相关设置。
      axisTick: {
        // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
        alignWithLabel: true,
      },
      // 修改刻度标签 相关样式
      axisLabel: {
        color: 'rgba(255,255,255,.6) ',
        fontSize: '10',
      },
      //  坐标轴轴线相关设置。
      axisLine: {
        // 是否显示坐标轴轴线。
        show: false,
        // 如果想要设置单独的线条样式
        lineStyle: {
          color: 'rgba(255,255,255,.1)',
          width: 1,
          type: 'solid',
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        // 修改刻度标签 相关样式
        axisLabel: {
          color: 'rgba(255,255,255,.6) ',
          fontSize: 12,
        },
        // y轴坐标轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
            width: 2,
          },
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
      },
    ],
    series: [
      {
        // 移入提示文字
        name: '直接访问',
        type: 'bar',
        // 柱子的宽度
        barWidth: '35%',
        // 数据
        data: [200, 300, 300, 900, 1500, 1200, 600],
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },
    ],
  };
  // 把配置给实例对象
  barEchart.setOption(barOptions);
  window.addEventListener('resize', _ => barEchart.resize());
})();
```

<img src="https://i0.hdslb.com/bfs/album/dd0317b888c72464d8d9168792f0f1591d6e31b3.png" alt="image-20220728230034650"  />

## 6.3 柱状图2

- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表

需求1： 修改图形大小 grid

~~~javascript
  // 图标位置
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%"
    },
~~~

需求2： 不显示x轴 

~~~javascript
   xAxis: {
      show: false
    },
~~~

需求3： y轴相关定制

- 不显示y轴线和相关刻度

~~~javascript
//不显示y轴线条
axisLine: {
    show: false
        },
// 不显示刻度
axisTick: {
   show: false
},
~~~

- y轴文字的颜色设置为白色

~~~javascript
   axisLabel: {
          color: "#fff"
   },
~~~

需求4： 修改第一组柱子相关样式（条状）

~~~javascript
name: "条",
// 柱子之间的距离
barCategoryGap: 50,
//柱子的宽度
barWidth: 10,
// 柱子设为圆角
itemStyle: {
    normal: {
      barBorderRadius: 20,       
    }
},
~~~

- 设置第一组柱子内百分比显示数据

~~~javascript
// 图形上的文本标签
label: {
    normal: {
         show: true,
         // 图形内显示
         position: "inside",
         // 文字的显示格式
         formatter: "{c}%"
     }
},
~~~

- 设置第一组柱子不同颜色

~~~javascript
// 声明颜色数组
var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
// 2. 给 itemStyle  里面的color 属性设置一个 返回值函数
  itemStyle: {
          normal: {
            barBorderRadius: 20,  
            // params 传进来的是柱子对象
            console.log(params);
            // dataIndex 是当前柱子的索引号
            return myColor[params.dataIndex];
          }
         
},
~~~

需求5： 修改第二组柱子的相关配置（框状）

~~~javascript
  	    name: "框",
        type: "bar",
        barCategoryGap: 50,
        barWidth: 15,
        itemStyle: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15
        },
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
~~~

需求6： 给y轴添加第二组数据

~~~javascript
yAxis: [
      {
      type: "category",
      data: ["印尼", "美国", "印度", "中国", "世界人口(万)"],
      // 不显示y轴的线
      axisLine: {
        show: false
      },
      // 不显示刻度
      axisTick: {
        show: false
      },
      // 把刻度标签里面的文字颜色设置为白色
      axisLabel: {
        color: "#fff"
      }
    },
      {
        show: true,
        data: [702, 350, 610, 793, 664],
           // 不显示y轴的线
      axisLine: {
        show: false
      },
      // 不显示刻度
      axisTick: {
        show: false
      },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#fff"
          }
        }
      }
    ],
~~~

需求7： 设置两组柱子层叠以及更换数据

~~~javascript
// 给series  第一个对象里面的 添加 
// 控制当前数据使用哪一个y轴
// 左边的y坐标轴的索引是0
// 右边边的y坐标轴的索引是1
yAxisIndex: 0,
// 给series  第二个对象里面的 添加 
yAxisIndex: 1,
// series 第一个对象里面的data
data: [70, 34, 60, 78, 69],
// series 第二个对象里面的data
data: [100, 100, 100, 100, 100],
// y轴更换第一个对象更换data数据
data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
// y轴更换第二个对象更换data数据
data:[702, 350, 610, 793, 664],
~~~

**完整代码**

```js
var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector('.bar2 .chart'));
  // 2. 指定配置和数据
  var option = {
    grid: {
      top: '10%',
      left: '22%',
      bottom: '10%',
      // containLabel: true,
    },
    // 不显示x轴的相关信息
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        type: 'category',
        // 数据反转
        inverse: true,
        data: ['HTML5', 'CSS3', 'javascript', 'VUE', 'NODE'],
        // 不显示y轴的线
        axisLine: {
          show: false,
        },
        // 不显示刻度
        axisTick: {
          show: false,
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: '#fff',
        },
      },
      {
        data: [702, 350, 610, 793, 664],
        inverse: true,
        // 不显示y轴的线
        axisLine: {
          show: false,
        },
        // 不显示刻度
        axisTick: {
          show: false,
        },
        // 把刻度标签里面的文字颜色设置为白色
        axisLabel: {
          color: '#fff',
        },
      },
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        data: [70, 34, 60, 78, 69],
        // yAxisIndex: 0,
        // 修改第一组柱子的圆角
        itemStyle: {
          barBorderRadius: 20,
          // 此时的color 可以修改柱子的颜色
          color: params => myColor[params.dataIndex],
          // params 传进来的是柱子对象
          // console.log(params);
          // dataIndex 是当前柱子的索引号
        },
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 10,
        // 显示柱子内的文字
        label: {
          show: true,
          position: 'inside',
          // {c} 会自动的解析为 数据  data里面的数据
          formatter: '{c}%',
        },
      },
      {
        name: '框',
        type: 'bar',
        barCategoryGap: 50,
        barWidth: 15,
        yAxisIndex: 1,
        data: [100, 100, 100, 100, 100],
        itemStyle: {
          color: 'none',
          borderColor: '#00c1de',
          borderWidth: 3,
          barBorderRadius: 15,
        },
      },
    ],
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    myChart.resize();
  });
```

![image-20220729153320110](https://i0.hdslb.com/bfs/album/8d39c7b47fb60ff7defb9225183f2313cf5a1c8e.png)

# 07 折线图

## 7.1 常见效果

常见效果

- 标记
  - markPoint：标记点（最大值，最小值）
  - markLine：标记线（平均值）
  - markArea：标注区间
- 线条控制
  - smooth：平滑
  - lineStyle：线条样式
- 填充风格
  - areaStyle：填充区域风格
- 紧挨边缘
  - boundaryGap (配置在xAxis中)
- 缩放：脱离0值比例
  - scale
- 堆叠图（当有多个系列使图表显得杂乱无章时使用）
  - atack
- 显示
  - label：数值显示

## 7.2 折线图1 人员变化模块制作

- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表

需求1： 修改折线图大小，显示边框设置颜色：#012f4a，并且显示刻度标签。

```
     // 设置网格样式
     grid: { 
       top: '20%',
       left: '3%',
       right: '4%',
       bottom: '3%',
       show: true,// 显示边框
       borderColor: '#012f4a',// 边框颜色
       containLabel: true // 包含刻度文字在内
     },
```

需求2： 修改图例组件中的文字颜色 #4c9bfd， 距离右侧 right 为 10%

```
  // 图例组件
     legend: {
       textStyle: {
         color: '#4c9bfd' // 图例文字颜色
       },
       right: '10%' // 距离右边10%
     },
```

需求3： x轴相关配置

- 刻度去除
- x轴刻度标签字体颜色：#4c9bfd
- 剔除x坐标轴线颜色（将来使用Y轴分割线)
- 轴两端是不需要内间距 boundaryGap

```
     xAxis: {
       type: 'category',
       data: ["周一", "周二"],
       axisTick: {
          show: false // 去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd' // 文本颜色
        },
        axisLine: {
          show: false // 去除轴线
        },
        boundaryGap: false  // 去除轴内间距
     },
```

需求4： y轴的定制

- 刻度去除
- 字体颜色：#4c9bfd
- 分割线颜色：#012f4a

```
     yAxis: {
       type: 'value',
       axisTick: {
         show: false  // 去除刻度
       },
       axisLabel: {
         color: '#4c9bfd' // 文字颜色
       },
       splitLine: {
         lineStyle: {
           color: '#012f4a' // 分割线颜色
         }
       }
     },
```

需求5： 两条线形图定制

- 颜色分别：#00f2f1  #ed3f35
- 把折线修饰为圆滑 series 数据中添加 smooth 为 true

```
     color: ['#00f2f1', '#ed3f35'],
     series: [{
       name:'新增粉丝',
       data: [820, 932, 901, 934, 1290, 1330, 1320],
       type: 'line',
       // 折线修饰为圆滑
       smooth: true,
       },{
       name:'新增游客',
       data: [100, 331, 200, 123, 233, 543, 400],
       type: 'line',
       smooth: true,
     }]
```

需求6： 配置数据

```
 // x轴的文字
 xAxis: {
   type: 'category',
   data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
 // 图标数据
     series: [{
       name:'新增粉丝',
       data:  [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
       type: 'line',
       smooth: true
     },{
       name:'新增游客',
       data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],     
       type: 'line',
       smooth: true
       }
     }]
```

需求7： 新增需求  点击 2020年   2021年 数据发生变化

以下是后台送过来数据（ajax请求过来的）

```
  var yearData = [
       {
         year: '2020',  // 年份
         data: [  // 两个数组是因为有两条线
              [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
              [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
           ]
       },
       {
         year: '2021',  // 年份
         data: [  // 两个数组是因为有两条线
              [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
             [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
           ]
       }
      ];
```

- tab栏切换事件
- 点击2020按钮   需要把 series 第一个对象里面的data  换成  2020年对象里面data[0] 
- 点击2020按钮   需要把 series 第二个对象里面的data  换成  2020年对象里面data[1] 
- 2021 按钮同样道理

完整代码：

```js
// 折线图1
(function () {
  const myChart = echarts.init(document.querySelector('.line1>.chart'));
  const yearData = [
    {
      year: '2020', // 年份
      data: [
        // 两个数组是因为有两条线
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      ],
    },
    {
      year: '2021', // 年份
      data: [
        // 两个数组是因为有两条线
        [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
        [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
      ],
    },
  ];
  const myOptions = {
    // 通过这个color修改两条线的颜色
    color: ['#00f2f1', '#ed3f35'],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // 如果series 对象有name 值，则 legend可以不用写data
      // 修改图例组件 文字颜色
      textStyle: {
        color: '#4c9bfd',
      },
      // 这个10% 必须加引号
      right: '10%',
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true, // 显示边框
      borderColor: '#012f4a', // 边框颜色
      containLabel: true, // 包含刻度文字在内
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisTick: {
        show: false, // 去除刻度线
      },
      axisLabel: {
        color: '#4c9bfd', // 文本颜色
      },
      axisLine: {
        show: false, // 去除轴线
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false, // 去除刻度线
      },
      axisLabel: {
        color: '#4c9bfd', // 文本颜色
      },
      axisLine: {
        show: false, // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a', // 分割线颜色
        },
      },
    },
    series: [
      {
        name: '新增粉丝',
        data: yearData[0].data[0],
        type: 'line',
        smooth: true,
      },
      {
        name: '新增游客',
        data: yearData[1].data[0],
        type: 'line',
        smooth: true,
      },
    ],
  };
  myChart.setOption(myOptions);
  document.querySelector('.line1').addEventListener('click', e => {
    const a = e.target;
    if (a.tagName !== 'A') return;
    document.querySelector('.line1 a.active').classList.remove('active');
    e.target.classList.add('active');
    myOptions.series[0].data = yearData[0].data[e.target.dataset.id];
    myOptions.series[1].data = yearData[1].data[e.target.dataset.id];
    myChart.setOption(myOptions);
  });
  window.addEventListener('resize', _ => myChart.resize());
})();
```

![image-20220729161855377](https://i0.hdslb.com/bfs/album/7f7eaf66a989fac6812cabf1ca0e96876a5e3051.png)

## 7.3 折线图2 播放量模块制作

- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表

需求1： 更换图例组件文字颜色 rgba(255,255,255,.5)  文字大小为12

~~~javascript
 legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
},
~~~

需求2： 修改图表大小

~~~javascript
grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },
~~~

需求3： 修改x轴相关配置

- 修改文本颜色为rgba(255,255,255,.6)  文字大小为 12
- x轴线的颜色为   rgba(255,255,255,.2)

~~~javascript
     // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
     axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
         // x轴线的颜色为   rgba(255,255,255,.2)
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },
~~~

需求4： 修改y轴的相关配置

~~~javascript
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
	   // 修改分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      
~~~

需求5： 修改两个线模块配置(注意在series 里面定制)

~~~javascript
       //第一条 线是圆滑
       smooth: true,
        // 单独修改线的样式
        lineStyle: {
            color: "#0184d5",
            width: 2 
        },
         // 填充区域
        areaStyle: {
              // 渐变色，只需要复制即可
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
                },
                {
                  offset: 0.8,
                  color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 8,
        // 设置拐点颜色以及边框
       itemStyle: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
~~~

~~~javascript
       name: "转发量",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
         },
         areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
         itemStyle: {
            color: "#00d887",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
~~~

需求6： 更换数据

~~~javascript
// x轴更换数据
data: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"],
// series  第一个对象data数据
 data: [ 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],
// series  第二个对象data数据
 data: [ 130, 10, 20, 40,30, 40, 80,60,20, 40, 90, 40,20, 140,30, 40, 130,20,20, 40, 80, 70, 30, 40,30, 120, 20,99,50, 20],

~~~

**完整代码**

```js
// 折线图2 模块制作
(function() {
  var myChart = echarts.init(document.querySelector(".line2 .chart"));
  var option = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      top: "0%",
      data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },

    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        // x轴更换数据
        data: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "26",
          "28",
          "29",
          "30"
        ],
        // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        // x轴线的颜色为   rgba(255,255,255,.2)
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        // 修改分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "邮件营销",
        type: "line",
        smooth: true,
        // 单独修改当前线条的样式
        lineStyle: {
          color: "#0184d5",
          width: "2"
        },
        // 填充颜色设置
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
              },
              {
                offset: 0.8,
                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        // 设置拐点
        symbol: "circle",
        // 拐点大小
        symbolSize: 8,
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#0184d5",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        data: [
          30,
          40,
          30,
          40,
          30,
          40,
          30,
          60,
          20,
          40,
          30,
          40,
          30,
          40,
          30,
          40,
          30,
          60,
          20,
          40,
          30,
          40,
          30,
          40,
          30,
          40,
          20,
          60,
          50,
          40
        ]
      },
      {
        name: "联盟广告",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        data: [
          130,
          10,
          20,
          40,
          30,
          40,
          80,
          60,
          20,
          40,
          90,
          40,
          20,
          140,
          30,
          40,
          130,
          20,
          20,
          40,
          80,
          70,
          30,
          40,
          30,
          120,
          20,
          99,
          50,
          20
        ]
      }
    ]
  };
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
```

![屏幕截图 2022-07-30 183240](https://i0.hdslb.com/bfs/album/11768b2dc68d0af0a2eb70b4206f4bfae027925c.png)





# 08 饼图

## 8.1 常见效果

- 显示数值
  - label
    - show
    - formatter （回调函数）
- 圆环
  - radius：饼半径，设置两个半径即圆环radius:[‘30%’,‘80%’]
- 南丁格尔图 （饼图的每一个区域的半径不一样，随着数值变化）
  - roseType:‘radius’
- 选中效果
  - selectedMode：设置选中效果 single/multiple
  - selectedOffset：设置选中偏移量

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./node_modules/echarts/dist/echarts.min.js"></script>
    <script>
        onload =function(){
            // 初始化echarts实例对象 其中init函数参数为dom元素，决定图标最终展示的位置
            var myECharts = echarts.init(document.querySelector('#root'));
            // 准备数据
            var domeData=[
                {name:'吃喝',value:700},
                {name:'学习',value:9000},
                {name:'出行',value:2000},
                {name:'服饰',value:1825},
                {name:'玩乐',value:654},
                {name:'其他',value:269}
            ]
            // 准备配置项！
            var option = {
                series:[
                    {
                        type:'pie',  //饼图
                        data:domeData,
                        label:{
                            show:true,
                            formatter(arg){
                                // console.log(arg)
                                return `${arg.name}-${arg.value}-${arg.percent}%`
                            }
                        },
                        // radius:100, 
                        // radius:'50%', //百分比参照的是高度及宽度较小的一个的一半的百分比
                        // radius:['30%','80%'], //设置为数组，第0个元素表示内圆半径，第1个表示外圆半径
                        roseType:'radius',
                        selectedMode:'single',  //设置选中效果 single/multiple
                        selectedOffset:15  //设置选中偏移量
                    }
                ]
            }
            // 将配置项设置给echarts实例对象
            myECharts.setOption(option)
        }
    </script>
</head>

<body>
    <!-- 准备一个图表容器盒子 -->
    <div id="root" style="width: 700px; height: 700px;"></div>
</body>

</html>
```

8.1

## 8.2 饼形图 1年龄分布模块制作

- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表

定制图表需求1： 

- 修改图例组件在底部并且居中显示。 
- 每个小图标的宽度和高度修改为 10px   
- 文字大小为12 颜色  rgba(255,255,255,.5)

~~~javascript
 legend: {
      // 距离底部为0%
      bottom: "0%",
      // 小图标的宽度和高度
      itemWidth: 10,
      itemHeight: 10,
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      // 修改图例组件的文字为 12px
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
 },
~~~

定制需求2：

- 修改水平居中 垂直居中
- 修改内圆半径和外圆半径为    ["40%", "60%"]   pink老师友情提示，带有直角坐标系的比如折线图柱状图是 grid修改图形大小，而我们饼形图是通过 radius 修改大小

~~~javascript
series: [
      {
        name: "年龄分布",
        type: "pie",
        // 设置饼形图在容器中的位置
        center: ["50%", "50%"],
        //  修改内圆半径和外圆半径为  百分比是相对于容器宽度来说的
        radius: ["40%", "60%"],
        // 不显示标签文字
        label: { show: false },
        // 不显示连接线
        labelLine: { show: false },
      }
    ]
~~~

定制需求3：更换数据

~~~javascript
// legend 中的data  可省略
data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
//  series 中的数据
 data: [
          { value: 1, name: "0岁以下" },
          { value: 4, name: "20-29岁" },
          { value: 2, name: "30-39岁" },
          { value: 2, name: "40-49岁" },
          { value: 1, name: "50岁以上" }
 ] ,
~~~

定制需求4： 更换颜色

~~~javascript
color: [
          "#065aab",
          "#066eab",
          "#0682ab",
          "#0696ab",
          "#06a0ab",
        ],
~~~

~~~javascript
 // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
~~~

**完整代码**

```js
// 饼形图1
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  // 2.指定配置
  var option = {
    color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },

    legend: {
      bottom: "0%",
      // 修改小图标的大小
      itemWidth: 10,
      itemHeight: 10,
      // 修改图例组件的文字为 12px
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "年龄分布",
        type: "pie",
        // 这个radius可以修改饼形图的大小
        // radius 第一个值是内圆的半径 第二个值是外圆的半径
        radius: ["40%", "60%"],
        // 饼图的位置
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        // 图形边上的文字
        label: {
          show: false,
          position: "center"
        },
        // 链接文字和图形的线是否显示
        labelLine: {
          show: false
        },
        data: [
          { value: 1, name: "0岁以下" },
          { value: 4, name: "20-29岁" },
          { value: 2, name: "30-39岁" },
          { value: 2, name: "40-49岁" },
          { value: 1, name: "50岁以上" }
        ]
      }
    ]
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
```

![屏幕截图 2022-07-30 183259](https://i0.hdslb.com/bfs/album/ea0b97d8dce547f1be7fcf0e5a66dc3be3cc04d3.png)

## 8.3 饼形图2 地区分布模块制作（南丁格尔玫瑰图）

- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表

第二步：按照需求定制

- 需求1：颜色设置

```js
color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
```

- 需求2：修改饼形图大小 ( series对象)

```javascript
radius: ['10%', '70%'],
```

- 需求3： 把饼形图的显示模式改为 半径模式

```javascript
 roseType: "radius",
```

- 需求4：数据使用更换（series对象 里面 data对象）

```js
          { value: 20, name: '云南' },
          { value: 26, name: '北京' },
          { value: 24, name: '山东' },
          { value: 25, name: '河北' },
          { value: 20, name: '江苏' },
          { value: 25, name: '浙江' },
          { value: 30, name: '四川' },
          { value: 42, name: '湖北' }
```

- 需求5：字体略小些  10 px ( series对象里面设置 )

  饼图图形上的文本标签可以控制饼形图的文字的一些样式。   label 对象设置

```javascript
series: [
      {
        name: "面积模式",
        type: "pie",
        radius: [30, 110],
        center: ["50%", "50%"],
        roseType: "radius",
        // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
        label: {
          fontSize: 10
        },
      }
    ]
  };
```

- 需求6：防止缩放的时候，引导线过长。引导线略短些   (series对象里面的  labelLine  对象设置  ) 
  - 连接图表 6 px
  - 连接文字 8 px

```js
        // 文字调整
        label:{
          fontSize: 10
        },
        // 引导线调整
        labelLine: {
          // 连接扇形图线长
          length: 6,
          // 连接文字线长
          length2: 8
        }
     }
    ],

```

- 需求6：浏览器缩放的时候，图表跟着自动适配。

```javascript
// 监听浏览器缩放，图表对象调用缩放resize函数
window.addEventListener("resize", function() {
    myChart.resize();
  });
```

**完整代码**

```js
// 饼形图2 地区分布模块
(function() {
  var myChart = echarts.init(document.querySelector(".pie2 .chart"));
  var option = {
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      bottom: "0%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "地区分布",
        type: "pie",
        radius: ["10%", "70%"],
        center: ["50%", "50%"],
        roseType: "radius",
        // 图形的文字标签
        label: {
          fontSize: 10
        },
        // 链接图形和文字的线条
        labelLine: {
          // length 链接图形的线条
          length: 6,
          // length2 链接文字的线条
          length2: 8
        },
        data: [
          { value: 20, name: "云南" },
          { value: 26, name: "北京" },
          { value: 24, name: "山东" },
          { value: 25, name: "河北" },
          { value: 20, name: "江苏" },
          { value: 25, name: "浙江" },
          { value: 30, name: "四川" },
          { value: 42, name: "湖北" }
        ]
      }
    ]
  };
  myChart.setOption(option);
  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();
```

![屏幕截图 2022-07-30 183313](https://i0.hdslb.com/bfs/album/ad471d6c5ffb3a68f7cc33f43336bae3c28fe199.png)



# 09 可视化项目

## 1-项目介绍

应对现在数据可视化的趋势，越来越多企业需要在很多场景(营销数据，生产数据，用户数据)下使用，可视化图表来展示体现数据，让数据更加直观，数据特点更加突出。我们引入 '立可得' 数据可视化项目。

该项目除了使用了基础的DIV+CSS布局，还引入了一些C3技术，还引入了各类图表的绘制，以及高级的地图数据可视化案例。主要功能有：饼状图、柱状图、线形图、地图 ...

## 2-使用技术

完成该项目需要具备以下知识：

- div + css 布局
- flex 布局
- css3动画
- css3渐变
- css3边框图片
- 原生js + jquery 使用
- rem适配
- **echarts基础**

粗略代码统计：

- css  580行
- html  450行
- js 400行 (有效)

## 3-Echarts-介绍

## 4-Echarts-体验

## 5-Echarts-基础配置

## 6-REM适配

- flexible.js 

  > flexible.js 检测浏览器宽度 修改html文字大小

- rem单位

  > 页面元素根据rem适配大小 配合人cssrem插件 

- flex布局

  > 快速布局

设计稿是1920px 

PC端适配： 宽度在 1024~1920之间页面元素宽高自适应

1. flexible.js 把屏幕分为 24 等份

2. cssrem 插件的基准值是  80px 

   > 插件-配置按钮---配置扩展设置--Root Font Size 重启vscode软件保证生效
   >

3. 要把屏幕宽度约束在1024~1920之间有适配，实现代码：

   ```js
   // 实现rem适配
   @media screen and (max-width: 1024px) {
        html {
            font-size: 42.66px !important;
        }
    }
   
    @media screen and (min-width: 1920px) {
        html {
            font-size: 80px !important;
        }
    }
   ```

## 7-基础布局

html结构：

```html
<body>
  <div class="viewport">
  	<div class="column">
      <!--概览-->                                    
    	<div></div>
			<!--监控-->                                    
    	<div></div> 
			<!--点位-->                                    
    	<div></div>                                           
    </div>
    <div class="column">
      <!--地图-->                                    
    	<div></div>
			<!--用户-->                                    
    	<div></div>                                          
    </div>
    <div class="column">
      <!--订单-->                                    
    	<div></div>
			<!--销售-->                                    
    	<div></div>                                  
    	<div>
      	<!--渠道-->                                    
    		<div></div>
      	<!--季度-->                                    
    		<div></div>
      </div>
			<!--排行-->                                    
    	<div></div>                                     
    </div>                        
  </div>
</body>
```

- 效果图： 1920px *  1078px 
- body 设置背景图 ，行高1.15
- viewport 主体容器，限制最小宽度1024px，与最大宽度1920px，最小高度780px。
  - 需要居中显示
  - 使用logo.png做为背景图，在容器内显示
  - 内间距 88px 20px 0
- column 列容器，分三列，占比 3：4：3
  - 中间容器外间距  32px  20px 0

css样式：

```css
/* 基础布局 */
body{
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  font-size: 0.5rem;
  line-height: 1.15;
  background: url(../images/bg.jpg) no-repeat 0 0 / cover;
}
h4,h3,ul{
  margin: 0;
  padding: 0;
  font-weight: normal;
}
ul{
  list-style: none;
}
a{
  text-decoration: none;
}
.viewport{
  max-width: 1920px;
  min-width: 1024px;
  margin: 0 auto;
  min-height: 780px;
  padding: 3.667rem 0.833rem 0;
  background: url(../images/logo.png) no-repeat 0 0 / contain;
  display: flex;
}
.column{
  flex: 3;
  position: relative;
}
.column:nth-child(2){
  flex: 4;
  margin: 1.333rem 0.833rem 0;
}
```

## 8-边框图片

> css3中自适应边框图片运用：

![1576483576664](docs/media/1576483576664.png)

组合写法：

```css
border-image: url("images/border.jpg") 167/20px round;
```

拆分写法：

```css
border-image-source: url("images/border.jpg");
border-image-slice: 167 167 167 167;
border-image-width: 20px;
border-image-repeat: round;
```

解释：

- 边框图片资源地址
- 裁剪尺寸（上 右 下 左）单位默认px，可使用百分百。
- 边框图片的宽度，默认边框的宽度。
- 平铺方式：
  - stretch 拉伸（默认）
  - repeat 平铺，从边框的中心向两侧开始平铺，会出现不完整的图片。
  - round 环绕，是完整的使用切割后的图片进行平铺。

DEMO代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>边框图片</title>
    <style>
        ul{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        li{
            width: 350px;
            height: 160px;
            border: 20px solid #ccc;
            margin-top: 20px;
        }
        li:nth-child(1){
            /*border-image: url("images/border.jpg") 167/20px round;*/
            border-image-source: url("images/border.jpg");
            border-image-slice: 167 167 167 167;
            border-image-width: 20px;
            /*环绕  是完整的使用切割后的图片进行平铺*/                    
            border-image-repeat: round; 
        }
        li:nth-child(2){
            /*平铺 从边框的中心向两侧开始平铺 会出现不完整的图片*/                                         
          border-image: url("images/border.jpg") 167/20px repeat;
        }
        li:nth-child(3){
            /*默认的平铺方式*/
            border-image: url("images/border.jpg") 167/20px stretch;
        }
    </style>
</head>
<body>
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
</body>
</html>
```

## 9-公用面板样式

> 所有的面板的基础样式是一致的，提前布局好。

面板 .panel 

容器 .inner   内边距是 上下24px  左右 36px

```css
/* 公共面板样式  */
.panel {
  position: relative;
  border: 15px solid transparent;
  /* 边框图片宽度默认和边框的宽度一样 */
  border-width: 0.6375rem 0.475rem 0.25rem 1.65rem;
  border-image-source: url(../images/border.png);
  /* 切割 上右下左 不加单位 内容是贴这边框下沿显示的*/
  border-image-slice: 51 38 20 132;
  margin-bottom: 0.25rem;
}
/* 内容盒子 */
.inner {
  position: absolute;
  top: -0.6375rem;
  left: -1.65rem;
  right: -0.475rem;
  bottom: -0.25rem;
  padding: 0.3rem 0.45rem;
}
.panel h3 {
  font-size: 0.25rem;
  color: #fff;
  font-weight: 400;
}
```

通过类名调用字体图标：

HTML页面引入字体图标中的css文件

```html
<link rel="stylesheet" href="fonts/icomoon.css" />
```

标签直接调用那个图标对应的类名（类名在css文件中标注）

```html
<span class="icon-dot"></span>
```

> 一定注意路径问题

## 10-概览区域(overview)-布局

html结构：

```html
<div class="overview panel">
<div class="inner">
  <ul>
    <li>
      <h4>2,190</h4>
      <span>
        <i class="icon-dot" style="color: #006cff"></i>
        设备总数
      </span>
    </li>
    <li class="item">
      <h4>190</h4>
      <span>
        <i class="icon-dot" style="color: #6acca3"></i>
        季度新增
      </span>
    </li>
    <li>
      <h4>3,001</h4>
      <span>
        <i class="icon-dot" style="color: #6acca3"></i>
        运营设备
      </span>
    </li>
    <li>
      <h4>108</h4>
      <span>
        <i class="icon-dot" style="color: #ed3f35"></i>
        异常设备
      </span>
    </li>
    </ul>
</div>
</div>
```

样式描述：

- 容器高度 110px
- h4字体  28px   #fff   左边距 4.8px   下间隙 8px
- span字体  16px  #4c9bfd

```css
/* 概览区域 */

.overview {
    height: 1.375rem;
}
.overview ul {
    display: flex;
    justify-content: space-between;
}
.overview ul li h4 {
    font-size: .35rem;
    color: #fff;
    margin: 0 0 .1rem .06rem;
}
.overview ul li span {
    font-size: .2rem;
    color: #4c9bfd;
}
```

## 11-监控区域(monitor)-布局

html结构：

```html
      <!--监控-->
      <div class="monitor panel">
        <div class="inner">
          <div class="tabs">
            <a href="javascript:;" class="active">故障设备监控</a>
            <a href="javascript:;" >异常设备监控</a>
          </div>
          <div class="content">
            <div class="head">
              <span class="col">故障时间</span>
              <span class="col">设备地址</span>
              <span class="col">异常代码</span>
            </div>
            <div class="marquee-view">
              <div class="marquee">
                <div class="row">
                  <span class="col">20180701</span>
                  <span class="col">11北京市昌平西路金燕龙写字楼</span>
                  <span class="col">1000001</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190601</span>
                  <span class="col">北京市昌平区城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190704</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000003</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20180701</span>
                  <span class="col">北京市昌平区建路金燕龙写字楼</span>
                  <span class="col">1000004</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000005</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000006</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建西路金燕龙写字楼</span>
                  <span class="col">1000007</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000008</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000009</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190710</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000010</span>
                  <span class="icon-dot"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="head">
              <span class="col">异常时间</span>
              <span class="col">设备地址</span>
              <span class="col">异常代码</span>
            </div>
            <div class="marquee-view">
              <div class="marquee">
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000001</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190703</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190704</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190705</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190706</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190707</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190708</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190709</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190710</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
```

**监控区域 monitor 大盒子的高度是 480px**

结构解释：

- .tabs  标签选项   加上active激活选项  默认激活第一个选项
- .content  切换内容  加上`style="display: block;"`显示内容   默认激活第一个内容

样式描述：

- .inner 容器内间距  24px  0
- .tabs 容器内间距 0 36px
  - a 容器  颜色： #1950c4  内间距：0 27px  字体：18px
  - 第一个a容器  去除左侧内间距   加上右侧2px宽度边框#00f2f1
  - 激活的时候  颜色白色
- .content容器
  - 占满剩余高度  flex:1
  - 默认隐藏
- .head 容器
  - 行高 1.05  背景 rgba(255, 255, 255, 0.1)  内间距  12px 36px  颜色 #68d8fe 字体大小 14px
- row 容器
  - 行高 1.05  内间距  12px 36px  颜色 #68d8ff 字体大小 12px
  - .icon-dot 字体图标   绝对定位  左边0.2rem  透明度0
  - 鼠标经过后：背景 rgba(255, 255, 255, 0.1)  透明度1
- col容器
  - 宽度：1rem   2.5rem    1rem
  - 第二个col   一行不换行  溢出  省略

```css
/* 监控区域 */
.monitor{
  height: 6rem;
}
.monitor .inner{
  padding: .3rem 0;
  display: flex;
  flex-direction: column;
}
.monitor .tabs{
  padding: 0 .45rem;
  margin-bottom: 0.225rem;
  display: flex;
}
.monitor .tabs a{
  color:#1950c4;
  font-size: 0.225rem;
  padding: 0 .3375rem;
}
.monitor .tabs a:first-child{
  padding-left: 0;
  border-right: 0.025rem solid #00f2f1;
}
.monitor .tabs a.active{
  color: #fff;
}
.monitor .content{
  flex: 1;
  position: relative;
  display: none;
}
.monitor .head{
  display: flex;
  justify-content: space-between;
  line-height: 1.05;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.15rem 0.45rem;
  color: #68d8fe;
  font-size: 0.175rem;
}
.monitor .marquee-view {
  position: absolute;
  top: 0.5rem;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.monitor .row{
  display: flex;
  justify-content: space-between;
  line-height: 1.05;
  font-size: 0.15rem;
  color: #61a8ff;
  padding: 0.15rem 0.45rem;
}
.monitor .row .icon-dot{
  position: absolute;
  left: 0.2rem;
  opacity: 0;
}
.monitor .row:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #68d8fe;
}
.monitor .row:hover .icon-dot{
  opacity: 1;
}
.monitor .col:first-child{
  width: 1rem;
}
.monitor .col:nth-child(2){
  width: 2.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.monitor .col:nth-child(3){
  width: 1rem;
}
```

## 12-监控区域-效果

切换功能：

- 绑定 标签页点击 事件
- 当前容器加active其他容器移除active
- index对应的内容容器显示其他容器隐藏

```js
  // 切换
 $(".monitor .tabs").on("click", "a", function() {
    $(this).addClass("active").siblings("a").removeClass("active");
    // console.log($(this).index());
    //   选取对应索引号的content
    $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
  });
```

动画功能：

- 实现思路：
  - 先克隆列表，追加在后面
  - marquee-view 占满剩余高度，溢出隐藏
    - 绝对定位，top 1.6rem bottom 0 
    - 宽度100%，溢出隐藏
  - 使用animation实现动画
  - 使用 translateY 向上位移 50%
  - 动画时间15s，匀速播放，循环执行。

js代码：

```js
  // 动画
  $(".marquee-view .marquee").each(function() {
    // console.log($(this));
    var rows = $(this).children().clone();
    $(this).append(rows);
  });
```

css代码：

```css
/* 通过CSS3动画滚动marquee */
.marquee-view .marquee {
  animation: move 15s linear infinite;
}
@keyframes move {
  0% {
  }
  100% {
    transform: translateY(-50%);
  }
}
/* 3.鼠标经过marquee 就停止动画 */
.marquee-view .marquee:hover {
  animation-play-state: paused;
}
```

## 13-点位区域(point)-饼图

html结构：

```html
      <!-- 点位 -->
      <div class="point panel">
        <div class="inner">
          <h3>点位分布统计</h3>
          <div class="chart">
            <div class="pie"></div>
            <div class="data">
              <div class="item">
                <h4>320,11</h4>
                <span>
                  <i class="icon-dot" style="color: #ed3f35"></i>
                  点位总数
                </span>
              </div>
              <div class="item">
                <h4>418</h4>
                <span>
                  <i class="icon-dot" style="color: #eacf19"></i>
                  本月新增
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
```

css样式：

point 盒子高度为 340px

```css
/* 点位 */
.point {
  height: 4.25rem;
}
.point .chart {
  display: flex;
  margin-top: 0.3rem;
  justify-content: space-between;
}
.point .pie {
  width: 3.9rem;
  height: 3rem;
  margin-left: -0.125rem;
  background-color: pink;
}
.point .data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.1rem;
  padding: .45rem .375rem;
  box-sizing: border-box;
  background-image: url(../images/rect.png);
  background-size: cover;
}
.point h4 {
  margin-bottom: 0.15rem;
  font-size: .35rem;
  color: #fff;
}
.point span {
  display: block;
  color: #4c9bfd;
  font-size: .2rem;
}
```

ECharts图表实现步骤：

- 从官方示例中找到类似图表，适当修改，引入到HTML页面中。
- 按照产品需求，来定制图表。

### 1. HTML引入图表

~~~JavaScript
// 点位分布统计模块
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie"));
  // 2. 指定配置项和数据
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    series: [
      {
        name: "面积模式",
        type: "pie",
        radius: [30, 110],
        center: ["75%", "50%"],
        roseType: "area",
        data: [
          { value: 10, name: "rose1" },
          { value: 5, name: "rose2" },
          { value: 15, name: "rose3" },
          { value: 25, name: "rose4" },
          { value: 20, name: "rose5" },
          { value: 35, name: "rose6" },
          { value: 30, name: "rose7" },
          { value: 40, name: "rose8" }
        ]
      }
    ]
  };

  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
})();

~~~

### 2. 定制需求

第一步：参考官方例子，熟悉里面参数具体含义

```js
option = {
    // 提示框组件
    tooltip: {
      // trigger 触发方式。  非轴图形，使用item的意思是放到数据对应图形上触发提示
      trigger: 'item',
      // 格式化提示内容：
      // a 代表series系列图表名称  
      // b 代表series数据名称 data 里面的name    
      // c 代表series数据值 data 里面的value   
      // d代表  当前数据/总数据的比例
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 控制图表
    series: [
      {
        // 图表名称
        name: '点位统计',
        // 图表类型
        type: 'pie',
        // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
        // 饼形图半径。 可以是像素。也可以是百分比（ 基于DOM容器大小）第一项是内半径，第二项是外半径（通过它可以实现饼形图大小）
        radius: ['10%', '70%'],
        // 图表中心位置 left 50%  top 50%  距离图表DOM容器
        center: ['50%', '50%'],
        // radius 半径模式，另外一种是 area 面积模式
        roseType: 'radius',
        // 数据集 value 数据的值 name 数据的名称
        data: [
                {value:10, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
            ]
        }
    ]
};
```

第二步：按照需求定制

- 需求1：颜色设置


```js
color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
```

- 需求2：修改饼形图大小 ( series对象)

~~~javascript
radius: ['10%', '70%'],
~~~

- 需求3： 把饼形图的显示模式改为 半径模式

~~~javascript
 roseType: "radius",
~~~

- 需求4：数据使用更换（series对象 里面 data对象）

```js
          { value: 20, name: '云南' },
          { value: 26, name: '北京' },
          { value: 24, name: '山东' },
          { value: 25, name: '河北' },
          { value: 20, name: '江苏' },
          { value: 25, name: '浙江' },
          { value: 30, name: '四川' },
          { value: 42, name: '湖北' }
```

- 需求5：字体略小些  10 px ( series对象里面设置 )

  饼图图形上的文本标签可以控制饼形图的文字的一些样式。   label 对象设置

~~~javascript
series: [
      {
        name: "面积模式",
        type: "pie",
        radius: [30, 110],
        center: ["50%", "50%"],
        roseType: "radius",
        // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
        label: {
          fontSize: 10
        },
      }
    ]
  };
~~~

- 需求6：防止缩放的时候，引导线过长，引导线略短些。   (series对象里面的  labelLine  对象设置  ) 
  - 连接图表 6 px
  - 连接文字 8 px

```html
        // 文字调整
        label:{
          fontSize: 10
        },
        // 引导线调整
        labelLine: {
          // 连接扇形图线长
          length: 6,
          // 连接文字线长
          length2: 8
        } 
      }
    ],
```

- 需求6：浏览器缩放的时候，图表跟着自动适配。

~~~JavaScript
// 监听浏览器缩放，图表对象调用缩放resize函数
window.addEventListener("resize", function() {
    myChart.resize();
  });
~~~

点位统计完整JavaScript代码：

~~~javascript
// 点位分布统计模块
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie"));
  // 2. 指定配置项和数据
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    series: [
      {
        name: "点位统计",
        type: "pie",
        // 如果radius是百分比则必须加引号
        radius: ["10%", "70%"],
        center: ["50%", "50%"],
        roseType: "radius",
        data: [
          { value: 20, name: "云南" },
          { value: 26, name: "北京" },
          { value: 24, name: "山东" },
          { value: 25, name: "河北" },
          { value: 20, name: "江苏" },
          { value: 25, name: "浙江" },
          { value: 30, name: "四川" },
          { value: 42, name: "湖北" }
        ],
        // 修饰饼形图文字相关的样式 label对象
        label: {
          fontSize: 10
        },
        // 修饰引导线样式
        labelLine: {
          // 连接到图形的线长度
          length: 6,
          // 连接到文字的线长度
          length2: 8
        }
      }
    ]
  };

  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function() {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();
~~~

## 14-地图区域 (map) -预留布局

html结构：

```html
      <!-- 地图 -->
      <div class="map">
        <h3>
          <span class="icon-cube"></span>
          设备数据统计
        </h3>
        <div class="chart">
          <div class="geo"></div>
        </div>
      </div>
```

css样式：

```css
/* 地图  */
.map {
  height: 7.225rem;
  margin-bottom: 0.25rem;
  display: flex;
  flex-direction: column;
}
.map h3 {
  line-height: 1;
  padding: 0.2rem 0;
  margin: 0;
  font-size: 0.25rem;
  color: #fff;
  font-weight: 400;
}
.map .icon-cube {
  color: #68d8fe;
}
.map .chart {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.05);
}
.map .geo {
  width: 100%;
  height: 100%;
}
```

注意第二列（column)  有个外边距（上面 32px 左右 20px  下是 0）

~~~css
.viewport .column:nth-child(2) {
    flex: 4;
    margin: .4rem .25rem 0;
}
~~~

## 15-用户统计 (users) -布局

html结构：

```html
      <!-- 用户 -->
      <div class="users panel">
        <div class="inner">
          <h3>全国用户总量统计</h3>
          <div class="chart">
            <div class="bar"></div>
            <div class="data">
              <div class="item">
                <h4>120,899</h4>
                <span>
                  <i class="icon-dot" style="color: #ed3f35"></i>
                  用户总量
                </span>
              </div>
              <div class="item">
                <h4>248</h4>
                <span>
                  <i class="icon-dot" style="color: #eacf19"></i>
                  本月新增
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
```

css样式：

```css
/* 用户模块 */
.users {
  height: 4.25rem;
  display: flex;
}
.users .chart {
  display: flex;
  margin-top: .3rem;
}
.users .bar {
  width: 7.35rem;
  height: 3rem;
}
.users .data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.1rem;
  padding: .45rem .375rem;
  box-sizing: border-box;
  background-image: url(../images/rect.png);
  background-size: cover;
}
.users h4 {
  margin-bottom: .15rem;
  font-size: .35rem;
  color: #fff;
}
.users span {
  display: block;
  color: #4c9bfd;
  font-size: 0.2rem;
}
```

## 16-用户统计 (users) -柱状图

实现步骤：

- 从官方示例中找到最接近项目需求的例子，适当修改, 引入到HTML页面中
- 按照产品需求，来定制图表。

第一步：参考官方示例 + 分析

```js
(function () {
// 1. 实例化对象
var myChart = echarts.init(document.querySelector(".bar"));
// 2. 指定配置和数据
var option = {
    // 工具提示
    tooltip: {
      // 触发类型  经过轴触发axis  经过轴触发item
      trigger: 'axis',
      // 轴触发提示才有效
      axisPointer: {    
        // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
        type: 'shadow'        
      }
    },
    // 图表边界控制
    grid: {
      // 距离 上右下左 的距离
      left: '3%',
      right: '4%',
      bottom: '3%',
      // 是否包含文本
      containLabel: true
    },
    // 控制x轴
    xAxis: [
      {
        // 使用类目，必须有data属性
        type: 'category',
        // 使用 data 中的数据设为刻度文字
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // 刻度设置
        axisTick: {
          // true意思：图形在刻度中间
          // false意思：图形在刻度之间
          alignWithLabel: true
        }
      }
    ],
    // 控制y轴
    yAxis: [
      {
        // 使用数据的值设为刻度文字
        type: 'value'
      }
    ],
    // 控制x轴
    series: [
      {
        // 图表数据名称
        name: '用户统计',
        // 图表类型
        type: 'bar',
        // 柱子宽度
        barWidth: '60%',
        // 数据
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
    
  // 3. 把配置给实例对象
  myChart.setOption(option);
})();
```

第二步：按照需求修改

- 需求1： 修改柱子的颜色

~~~javascript
// 修改线性渐变色方式 1
color: new echarts.graphic.LinearGradient(
     // (x1,y2) 点到点 (x2,y2) 之间进行渐变
     0, 0, 0, 1,
     [
          { offset: 0, color: '#00fffb' }, // 0 起始颜色
          { offset: 1, color: '#0061ce' }  // 1 结束颜色
    ]
 ),
// 修改线性渐变色方式 2
color: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    globalCoord: false // 缺省为 false
},
~~~



- 需求2： 提示框组件放到柱子上触发， 没有阴影等效果

~~~javascript
//提示框组件
tooltip: {
    trigger: 'item',
   // axisPointer: {            // 坐标轴指示器，坐标轴触发有效  这个模块我们此时不需要删掉即可
       // type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
   // }
},
~~~

- 需求3： 修改柱形图表大小，   以及相关网格。
  - 饼形图修改图表大小是通过  series 对象里面的 radius 
  - 柱形图修改图标大小是通过  series 对象里面的 grid 对象  left  right 等
  - 显示网格  show: true，网格颜色是  borderColor

~~~javascript
// 直角坐标系内绘图网格（区域）
grid: {
   top: '3%',
   right: '3%',
   bottom: '3%',
   left: '0%',
   //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
   containLabel: true,
   // 是否显示直角坐标系网格
   show: true,
   //grid 四条边框的颜色
   borderColor: 'rgba(0, 240, 255, 0.3)'
},

~~~


- 需求4： X 轴调整
  - 柱子在刻度之间
  - 剔除刻度不显示
  - 刻度标签文字颜色  #4c9bfd   通过 axisLabel 对象设置
  - 修改x轴线的颜色    axisLine  里面的   lineStyle

~~~javascript
    // 控制x轴
    xAxis: [
      {
        // 使用类目，必须有data属性
        type: 'category',
        // 使用 data 中的数据设为刻度文字
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // 刻度设置
        axisTick: {
           // true意思：图形和刻度居中中间
           // false意思：图形在刻度之间
           alignWithLabel: false,
           // 不显示刻度
           show: false
        },        
        // x坐标轴文字标签样式设置
        axisLabel: {
          color: '#4c9bfd'
       },
       // x坐标轴颜色设置
       axisLine:{
          lineStyle:{
              color:'rgba(0, 240, 255, 0.3)',
              // width:8,  x轴线的粗细
              // opcity: 0,   如果不想显示x轴线 则改为 0
             }
        }
      }
~~~
- 需求5： Y 轴调整
  - 剔除刻度不显示
  - Y轴文字颜色  #4c9bfd   通过 axisLabel 对象设置
  - Y轴分割线颜色   splitLine 对象里面 lineStyle 对象设置
~~~javascript
    // 控制y轴
    yAxis: [
      {
        // 使用类目，必须有data属性
        type: 'category',
        // 使用 data 中的数据设为刻度文字
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // 刻度设置
        axisTick: {
           // 不显示刻度
           show: false
        },        
        // y坐标轴文字标签样式设置
        axisLabel: {
          color: '#4c9bfd'
       },
       // y坐标轴颜色设置
        axisLine:{
          lineStyle:{
               color:'rgba(0, 240, 255, 0.3)',
              // width:8,  x轴线的粗细
              // opcity: 0,   如果不想显示x轴线 则改为 0
             }
        },
        // y轴 分割线的样式 
         splitLine: {
            lineStyle: {
                color: 'rgba(0, 240, 255, 0.3)'
            }
         }     
    ],
~~~

- 需求6：调整数据，与省略图形定制

```js
// series
data: [2100,1900,1700,1560,1400,1200,1200,1200,900,750,600,480,240]
```

```js
// xAxis
data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆']
```

- 省略图形

  - 经过图形才显示提示，且省略的柱子不需要提示
  - 图形单独设置颜色

  ```js
  // 中间省略的数据  准备三项
  var item = {
      name:'',
      value: 1200,
      // 柱子颜色
      itemStyle: {
        color: '#254065'
      },
       // 鼠标经过柱子颜色
      emphasis: {
        itemStyle: {
          color: '#254065'
        }
      },
      // 工具提示隐藏
      tooltip: {
        extraCssText: 'opacity:0'
      },
    }
  ```

  ```diff
  // series配置data选项在中使用
  data: [2100,1900,1700,1560,1400,item,item,item,900,750,600,480,240],
  ```

~~~javascript
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function() {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
~~~

## 17-订单区域（order）-布局

html结构：

```html
      <!-- 订单 -->
      <div class="order panel">
        <div class="inner">
          <!-- 筛选 -->
          <div class="filter">
            <a href="javascript:;"  class="active">365天</a>
            <a href="javascript:;" >90天</a>
            <a href="javascript:;" >30天</a>
            <a href="javascript:;" >24小时</a>
          </div>
          <!-- 数据 -->
          <div class="data">
            <div class="item">
              <h4>20,301,987</h4>
              <span>
                <i class="icon-dot" style="color: #ed3f35;"></i>
                订单量
              </span>
            </div>
            <div class="item">
              <h4>99834</h4>
              <span>
                <i class="icon-dot" style="color: #eacf19;"></i>
                销售额(万元)
              </span>
            </div>
          </div>
        </div>
      </div>
```

css样式：

```css
/* 订单 */
.order {
  height: 1.875rem;
}
.order .filter {
  display: flex;
}
.order .filter a {
  display: block;
  height: 0.225rem;
  line-height: 1;
  padding: 0 0.225rem;
  color: #1950c4;
  font-size: 0.225rem;
  border-right: 0.025rem solid #00f2f1;
}
.order .filter a:first-child {
  padding-left: 0;
}
.order .filter a:last-child {
  border-right: none;
}
.order .filter a.active {
  color: #fff;
  font-size: 0.25rem;
}
.order .data {
  display: flex;
  margin-top: 0.25rem;
}
.order .item {
  width: 50%;
}
.order h4 {
  font-size: 0.35rem;
  color: #fff;
  margin-bottom: 0.125rem;
}
.order span {
  display: block;
  color: #4c9bfd;
  font-size: 0.2rem;
}
```



## 18-订单区域（order）-效果

实现步骤：

- 提前准备数据
- 点击后切tab激活样式
- 点击后切换数据内容
- 开启定时器动态切换数据

```js
// 订单功能
(function(){
  // 1. 准备数据
  var data = {
    day365: { orders: '20,301,987', amount: '99834' },
    day90: { orders: '301,987', amount: '9834' },
    day30: { orders: '1,987', amount: '3834' },
    day1: { orders: '987', amount: '834' }
  }
  // 获取显示 订单数量 容器
  var $h4Orders = $('.order h4:eq(0)')
  // 获取显示 金额数量 容器
  var $h4Amount = $('.order h4:eq(1)')
  $('.order').on('click','.filter a',function(){
    // 2. 点击切换激活样式
    $(this).addClass('active').siblings().removeClass('active')
    // 3. 点击切换数据
    var currdata = data[this.dataset.key]
    $h4Orders.html(currdata.orders)
    $h4Amount.html(currdata.amount)
  })
  // 4. 开启定时器切换数据
  var index = 0
  var $allTab = $('.order .filter a')
  setInterval(function(){
    index ++ 
    if (index >= 4) index = 0
    $allTab.eq(index).click()
  },5000)
})();
```



## 19-销售统计( sales )-布局

html结构：

```html
      <!-- 销售额 -->
      <div class="sales panel">
        <div class="inner">
          <div class="caption">
            <h3>销售额统计</h3>
            <a href="javascript:;" class="active" >年</a>
            <a href="javascript:;" >季</a>
            <a href="javascript:;" >月</a>
            <a href="javascript:;" >周</a>
          </div>
          <div class="chart">
            <div class="label">单位:万</div>
            <div class="line"></div>
          </div>
        </div>
      </div>
```

css样式：

~~~css
/* 销售区域 */
.sales {
  height: 3.1rem;
}
.sales .caption {
  display: flex;
  line-height: 1;
}
.sales h3 {
  height: 0.225rem;
  padding-right: 0.225rem;
  border-right: 0.025rem solid #00f2f1;
}
.sales a {
  padding: 0.05rem;
  font-size: 0.2rem;
  margin: -0.0375rem 0 0 0.2625rem;
  border-radius: 0.0375rem;
  color: #0bace6;
}
.sales a.active {
  background-color: #4c9bfd;
  color: #fff;
}
.sales .inner {
  display: flex;
  flex-direction: column;
}
.sales .chart {
  flex: 1;
  padding-top: 0.1875rem;
  position: relative;
}
.sales .label {
  position: absolute;
  left: 0.525rem;
  top: 0.225rem;
  color: #4996f5;
  font-size: 0.175rem;
}
.sales .line {
  width: 100%;
  height: 100%;
}
~~~



## 19-销售统计( sales )-线形图

实现步骤：

- 寻找官方的类似示例，给予分析, 引入到HTML页面中
- 按照需求来定制它。

**第一步：**寻找官方的类似示例，给予分析。

官方参考示例：<https://www.echartsjs.com/examples/zh/editor.html?c=line-stack>

```js
// 销售统计模块
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".line"));
  // 2. 指定配置和数据
  var option = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["邮件营销", "联盟广告"]
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "邮件营销",
        type: "line",
        stack: "总量",
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "联盟广告",
        type: "line",
        stack: "总量",
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  };

  // 3. 把配置和数据给实例对象
  myChart.setOption(option);
})();
```

**第二步：**按照需求来定制它。

- 需求1： 修改折线图大小，显示边框设置颜色：#012f4a，并且显示刻度标签。

```js
    // 设置网格样式
    grid: { 
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true,// 显示边框
      borderColor: '#012f4a',// 边框颜色
      containLabel: true // 包含刻度文字在内
    },
```

- 需求2： 修改图例组件中的文字颜色 #4c9bfd， 距离右侧 right 为 10%

~~~javascript
 // 图例组件
    legend: {
      textStyle: {
        color: '#4c9bfd' // 图例文字颜色
      },
      right: '10%' // 距离右边10%
    },
~~~

- 需求3： x轴相关配置
  - 刻度去除
  - x轴刻度标签字体颜色：#4c9bfd
  - 剔除坐标轴线颜色（将来使用Y轴分割线)
  - 轴两端是不需要内间距 boundaryGap

~~~JavaScript
    xAxis: {
      type: 'category',
      data: ["周一", "周二"],
	  axisTick: {
         show: false // 去除刻度线
       },
       axisLabel: {
         color: '#4c9bfd' // 文本颜色
       },
       axisLine: {
         show: false // 去除轴线
       },
       boundaryGap: false  // 去除轴内间距
    },
~~~

- 需求4： y轴的定制
  - 刻度去除
  - 字体颜色：#4c9bfd
  - 分割线颜色：#012f4a

~~~javascript
    yAxis: {
      type: 'value',
      axisTick: {
        show: false  // 去除刻度
      },
      axisLabel: {
        color: '#4c9bfd' // 文字颜色
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a' // 分割线颜色
        }
      }
    },
~~~

- 需求5： 两条线形图定制
  - 颜色分别：#00f2f1  #ed3f35
  - 把折线修饰为圆滑 series 数据中添加 smooth 为 true

```js
    color: ['#00f2f1', '#ed3f35'],
	series: [{
      name:'预期销售额',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      // 折线修饰为圆滑
      smooth: true,
      },{
      name:'实际销售额',
      data: [100, 331, 200, 123, 233, 543, 400],
      type: 'line',
      smooth: true,
    }]
```

- 需求6： 配置数据

```js
// x轴的文字
xAxis: {
  type: 'category',
  data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
```

```js
// 图标数据
    series: [{
      name:'预期销售额',
      data:  [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      type: 'line',
      smooth: true
    },{
      name:'实际销售额',
      data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],     
      type: 'line',
      smooth: true
      }
    }]
```

总结：现在给的是年份数据，还需要切换效果。



## 19-销售统计( sales )-切换效果

实现步骤：

- 1. 准备切换需要依赖的数据 4组
- 2. 绑定点击事件

  - 切换激活  tab  的样式
  - 切换图表依赖的数据（重新渲染图表）
- 3. 开启定时器，进行切换， 鼠标经过sales停止定时器，离开开启定时器

第一步：准备数据，使用数据

```js
  var data = {
    year: [
      [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
    ],
    quarter: [
      [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
      [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
    ],
    month: [
      [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
      [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
    ],
    week: [
      [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
      [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
    ]
  }
```

~~~javascript
    series: [{
      name:'预期销售额',
      data: data.year[0],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#00f2f1'
      }
    },{
      name:'实际销售额',
      data: data.year[1],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#ed3f35'
      }
    }]
~~~

第二步：点击后切换

```js
  // 切换
  $('.sales').on('click', '.caption a', function(){
    // 样式
    $(this).addClass('active').siblings().removeClass('active')
    // currData 当前对应的数据  
    // this.dataset.type 标签上的data-type属性值，对应data中的属性                  
    var currData = data[this.dataset.type]
    // 修改图表1的数据
    option.series[0].data = currData[0]
    // 修改图表2的数据                  
    option.series[1].data = currData[1]
    // 重新设置数据  让图标重新渲染                  
    myChart.setOption(option)
  })
```

第三步：tab栏自动切换效果

 - 开启定时器每隔3s，自动让a触发点击事件即可
 - 鼠标经过sales，关闭定时器，离开开启定时器

```js
var as = $(".sales .caption a");
  var index = 0;
  var timer = setInterval(function() {
    index++;
    if (index >= 4) index = 0;
    as.eq(index).click();
  }, 1000);
  // 鼠标经过sales，关闭定时器，离开开启定时器
  $(".sales").hover(
    function() {
      clearInterval(timer);
    },
    function() {
      clearInterval(timer);
      timer = setInterval(function() {
        index++;
        if (index >= 4) index = 0;
        as.eq(index).click();
      }, 1000);
    }
  );
```

自动缩放

~~~javascript
 // 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function() {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
~~~



## 20-渠道区域&销售进度-布局

html结构：

~~~html
     <!-- 渠道 季度 -->
     <div class="wrap">
          <div class="channel panel">
            <div class="inner">
              <h3>渠道分布</h3>
              <div class="data">
                <div class="radar"></div>
              </div>
            </div>
          </div>
          <div class="quarter panel">
            <div class="inner">
              <h3>一季度销售进度</h3>
              <div class="chart">
                <div class="box">
                  <div class="gauge"></div>
                  <div class="label">75<small> %</small></div>
                </div>
                <div class="data">
                  <div class="item">
                    <h4>1,321</h4>
                    <span>
                      <i class="icon-dot" style="color: #6acca3"></i>
                      销售额(万元)
                    </span>
                  </div>
                  <div class="item">
                    <h4>150%</h4>
                    <span>
                      <i class="icon-dot" style="color: #ed3f35"></i>
                      同比增长
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

~~~

css样式：

~~~css
/* 渠道区块 */
.wrap {
  display: flex;
}
.channel,
.quarter {
  flex: 1;
  height: 2.9rem;
}
.channel {
  margin-right: 0.25rem;
}
.channel .data {
  overflow: hidden;
}
.channel .data .radar {
  height: 2.1rem;
  width: 100%;
  background-color: pink;
}
.channel h4 {
  color: #fff;
  font-size: 0.4rem;
  margin-bottom: 0.0625rem;
}
.channel small {
  font-size: 50%;
}
.channel span {
  display: block;
  color: #4c9bfd;
  font-size: 0.175rem;
}
/* 季度区块 */
.quarter .inner {
  display: flex;
  flex-direction: column;
  margin: 0 -0.075rem;
}
.quarter .chart {
  flex: 1;
  padding-top: 0.225rem;
}
.quarter .box {
  position: relative;
}
.quarter .label {
  transform: translate(-50%, -30%);
  color: #fff;
  font-size: 0.375rem;
  position: absolute;
  left: 50%;
  top: 50%;
}
.quarter .label small {
  font-size: 50%;
}
.quarter .gauge {
  height: 1.05rem;
}
.quarter .data {
  display: flex;
  justify-content: space-between;
}
.quarter .item {
  width: 50%;
}
.quarter h4 {
  color: #fff;
  font-size: 0.3rem;
  margin-bottom: 0.125rem;
}
.quarter span {
  display: block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #4c9bfd;
  font-size: 0.175rem;
}
~~~

## 21-渠道分布(channel)-雷达图

实现步骤：

- 寻找官方的类似示例，给予分析，并引入到HTML页面中
- 按照需求来定制它

第一步： 参考类似实例： <https://www.echartsjs.com/examples/zh/editor.html?c=radar-aqi>

~~~javascript
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".radar"));
  // 2.指定配置
  var dataBJ = [[55, 9, 56, 0.46, 18, 6, 1]];
  var lineStyle = {
    normal: {
      width: 1,
      opacity: 0.5
    }
  };
  var option = {
    backgroundColor: "#161627",
    radar: {
      indicator: [
        { name: "AQI", max: 300 },
        { name: "PM2.5", max: 250 },
        { name: "PM10", max: 300 },
        { name: "CO", max: 5 },
        { name: "NO2", max: 200 },
        { name: "SO2", max: 100 }
      ],
      shape: "circle",
      splitNumber: 5,
      name: {
        textStyle: {
          color: "rgb(238, 197, 102)"
        }
      },
      splitLine: {
        lineStyle: {
          color: [
            "rgba(238, 197, 102, 0.1)",
            "rgba(238, 197, 102, 0.2)",
            "rgba(238, 197, 102, 0.4)",
            "rgba(238, 197, 102, 0.6)",
            "rgba(238, 197, 102, 0.8)",
            "rgba(238, 197, 102, 1)"
          ].reverse()
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(238, 197, 102, 0.5)"
        }
      }
    },
    series: [
      {
        name: "北京",
        type: "radar",
        lineStyle: lineStyle,
        data: dataBJ,
        symbol: "none",
        itemStyle: {
          color: "#F9713C"
        },
        areaStyle: {
          opacity: 0.1
        }
      }
    ]
  };
  // 3.把配置和数据给对象
  myChart.setOption(option);
})();
~~~

第二步： 按照需求来定制它

- 需求1： 去掉背景颜色，调整雷达图大小 65%

~~~javascript
radar:{
    center: ['50%', '50%'],
    // 外半径占据容器大小
    radius: '65%',
}  
~~~

需求2： 指示器轴的分割段数为4条（4个圆圈）  

~~~javascript
radar:{
    center: ['50%', '50%'],
    // 外半径占据容器大小
    radius: '65%',
    // 指示器轴的分割段数
    splitNumber: 4,
}  
~~~

需求3： 雷达图分割线设为白色半透明 0.5

~~~javascript
 // 坐标轴在 grid 区域中的分隔线（圆圈）
   splitLine: {
        lineStyle: {
           color: 'rgba(255, 255, 255, 0.5)',
           // width: 2,
           // type: 'dashed'
           }
   },
~~~

需求4： 雷达图 坐标轴轴线相关设置(竖线) axisLine 

~~~javascript
// 坐标轴轴线相关设置(竖线)axisLine
axisLine: {
       show: true,
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.5)'
                // width: 1,
                // type: 'solid'
             }
 },
~~~



需求5： 修饰雷达图文字颜色为 #4c9bfd

~~~javascript
name: {
    // 修饰雷达图文本颜色
     textStyle: {
       color: '#4c9bfd'
     }
},
~~~

需求6： 修饰 区域填充样式   series 对象

-  区域填充的背景颜色设置为：  rgba(238, 197, 102, 0.6)

~~~javascript
 areaStyle: {
     color: 'rgba(238, 197, 102, 0.6)',
},
~~~

- 区域填充的线条颜色为白色

~~~javascript
// 线条样式
  lineStyle: {
         normal: {
              color: '#fff',
              // width: 1
         }
},
~~~

需求7： 标记的图形(拐点）设置  注意 series 里面设置

- 用圆点显示， 拐点的大小设置为 5
- 小圆点设置为白色
- 在小圆点上显示相关数据，颜色设置为白色，10像素

~~~javascript
// symbol 标记的样式(拐点），还可以取值'rect' 方块 ,'arrow' 三角等
symbol: 'circle', 
// 拐点的大小  
symbolSize: 5, 
// 小圆点（拐点）设置为白色
itemStyle: {
       color: '#fff'
},
// 在圆点上显示相关数据
label: {
     show: true,
     color: '#fff',
     fontSize: 10
},    
~~~

需求8： 鼠标经过显示提示框组件

~~~javascript
tooltip: {
    show: true,
    // 控制提示框组件的显示位置
    position: ['60%', '10%'],
},
~~~



需求9： 更换数据

~~~javascript
 // 雷达图的指示器 内部填充数据
  indicator: [
        { name: '机场', max: 100 },
        { name: '商场', max: 100 },
        { name: '火车站', max: 100 },
        { name: '汽车站', max: 100 },
        { name: '地铁', max: 100 }
 ],
~~~

~~~javascript
data: [[90, 19, 56, 11, 34]],
~~~

整个代码

~~~javascript
// 销售渠道模块 雷达图
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".radar"));
  // 2.指定配置

  var option = {
    tooltip: {
      show: true,
      // 控制提示框组件的显示位置
      position: ["60%", "10%"]
    },
    radar: {
      indicator: [
        { name: "机场", max: 100 },
        { name: "商场", max: 100 },
        { name: "火车站", max: 100 },
        { name: "汽车站", max: 100 },
        { name: "地铁", max: 100 }
      ],
      // 修改雷达图的大小
      radius: "65%",
      shape: "circle",
      // 分割的圆圈个数
      splitNumber: 4,
      name: {
        // 修饰雷达图文字的颜色
        textStyle: {
          color: "#4c9bfd"
        }
      },
      // 分割的圆圈线条的样式
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255, 0.5)"
        }
      },
      splitArea: {
        show: false
      },
      // 坐标轴的线修改为白色半透明
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.5)"
        }
      }
    },
    series: [
      {
        name: "北京",
        type: "radar",
        // 填充区域的线条颜色
        lineStyle: {
          normal: {
            color: "#fff",
            width: 1,
            opacity: 0.5
          }
        },
        data: [[90, 19, 56, 11, 34]],
        // 设置图形标记 （拐点）
        symbol: "circle",
        // 这个是设置小圆点大小
        symbolSize: 5,
        // 设置小圆点颜色
        itemStyle: {
          color: "#fff"
        },
        // 让小圆点显示数据
        label: {
          show: true,
          fontSize: 10
        },
        // 修饰我们区域填充的背景颜色
        areaStyle: {
          color: "rgba(238, 197, 102, 0.6)"
        }
      }
    ]
  };
  // 3.把配置和数据给对象
  myChart.setOption(option);
  // 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function() {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();

~~~



## 22-销售进度 (quarter) -饼状图

实现步骤：

- 寻找官方的类似示例，给予分析,引入到HTML页面中
- 按照需求来定制它。

**第一步**：参考官方示例：https://www.echartsjs.com/examples/zh/editor.html?c=pie-doughnut

~~~javascript
// 销售模块 饼形图 半圆形 设置方式
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".gauge"));
  // 2. 指定数据和配置
  var option = {
    series: [
      {
        name: "销售进度",
        type: "pie",
        radius: ["50%", "70%"],
        //是否启用防止标签重叠策略
        // avoidLabelOverlap: false,
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{ value: 100 }, { value: 100 }, { value: 200 }]
      }
    ]
  };
  // 3. 把数据和配置给实例对象
  myChart.setOption(option);
})();
~~~

**第二步**：进行定制

需求1：改成半圆，图表大一些，让`50%`文字在中心。

~~~javascript
  var option = {
    series: [
      {
        type: 'pie',
        // 放大图形
        radius: ['130%', '150%'],  
        // 移动下位置  套住50%文字
        center: ['48%', '80%'],   
        label: {
          normal: {
            show: false
          }
        },  
        // 起始角度，支持范围[0, 360]
        startAngle: 180,
        data: [
          { value: 100 }, // 不需要名称
          { value: 100,}, // 不需要名称
          { value: 200, itemStyle: { color: 'transparent' } } // 透明隐藏第三块区域
        ]
      }
    ]
  }
~~~

需求2：鼠标经过无需变大，修改第一段颜色渐变#00c9e0->#005fc1，修改第二段颜色#12274d。

~~~javascript
       // 鼠标经过不变大
       hoverOffset: 0,  
        data: [
          {
            value: 100,
            itemStyle: {
              // 颜色渐变#00c9e0->#005fc1
              color: new echarts.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0,
                0,
                0,
                1,
                [
                  { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                  { offset: 1, color: "#005fc1" } // 1 结束颜色
                ]
              )
            }
          },  
        { value: 100, itemStyle: { color: '#12274d' } }, // 颜色#12274d
~~~



## 23-热销排行（top）-布局

html结构：

```html
      <!-- 排行榜 -->
      <div class="top panel">
        <div class="inner">
          <div class="all">
            <h3>全国热榜</h3>
            <ul>
              <li>
                <i class="icon-cup1" style="color: #d93f36;"></i>
                可爱多
              </li>
              <li>
                <i class="icon-cup2" style="color: #68d8fe;"></i>
                娃哈啥
              </li>
              <li>
                <i class="icon-cup3" style="color: #4c9bfd;"></i>
                喜之郎
              </li>
            </ul>
          </div>
          <div class="province">
            <h3>各省热销 <i class="date">// 近30日 //</i></h3>
            <div class="data">
              <ul class="sup">
                <li>
                  <span>北京</span>
                  <span>25,179 <s class="icon-up"></s></span>
                </li>
                <li>
                  <span>河北</span>
                  <span>23,252 <s class="icon-down"></s></span>
                </li>
                <li>
                  <span>上海</span>
                  <span>20,760 <s class="icon-up"></s></span>
                </li>
                <li>
                  <span>江苏</span>
                  <span>23,252 <s class="icon-down"></s></span>
                </li>
                <li>
                  <span>山东</span>
                  <span>20,760 <s class="icon-up"></s></span>
                </li>
              </ul>
              <ul class="sub">
                <!-- <li><span></span><span> <s class="icon-up"></s></span></li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
```

css样式：

```css
/* 排行榜 */
.top {
  height: 3.5rem;
}
.top .inner {
  display: flex;
}
.top .all {
  display: flex;
  flex-direction: column;
  width: 2.1rem;
  color: #4c9bfd;
  font-size: 0.175rem;
  vertical-align: middle;
}
.top .all ul {
  padding-left: 0.15rem;
  margin-top: 0.15rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.top .all li {
  overflow: hidden;
}
.top .all [class^="icon-"] {
  font-size: 0.45rem;
  vertical-align: middle;
  margin-right: 0.15rem;
}
.top .province {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #fff;
}
.top .province i {
  padding: 0 0.15rem;
  margin-top: 0.0625rem;
  float: right;
  font-style: normal;
  font-size: 0.175rem;
  color: #0bace6;
}
.top .province s {
  display: inline-block;
  transform: scale(0.8);
  text-decoration: none;
}
.top .province .icon-up {
  color: #dc3c33;
}
.top .province .icon-down {
  color: #36be90;
}
.top .province .data {
  flex: 1;
  display: flex;
  margin-top: 0.175rem;
}
.top .province ul {
  flex: 1;
  line-height: 1;
  margin-bottom: 0.175rem;
}
.top .province ul li {
  display: flex;
  justify-content: space-between;
}
.top .province ul span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.top .province ul.sup {
  font-size: 0.175rem;
}
.top .province ul.sup li {
  color: #4995f4;
  padding: 0.15rem;
}
.top .province ul.sup li.active {
  color: #a3c6f2;
  background-color: rgba(10, 67, 188, 0.2);
}
.top .province ul.sub {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 0.15rem;
  background-color: rgba(10, 67, 188, 0.2);
}
.top .province ul.sub li {
  color: #52ffff;
  padding: 0.125rem 0.175rem;
}
.clock {
  position: absolute;
  top: -0.45rem;
  right: 0.5rem;
  font-size: 0.25rem;
  color: #0bace6;
}
.clock i {
  margin-right: 5px;
  font-size: 0.25rem;
}
@media screen and (max-width: 1600px) {
  .top span {
    transform: scale(0.9);
  }
  .top .province ul.sup li {
    padding: 0.125rem 0.15rem;
  }
  .top .province ul.sub li {
    padding: 0.0625rem 0.15rem;
  }
  .quarter span {
    transform: scale(0.9);
  }
}
```



## 23-热销排行（top）-效果

**实现思路**：

- 准备后台返回的真实数据
- 利用数据渲染各省热销模块 sup 模块  (拼接html格式字符串，进行渲染)
- 当鼠标进入 tab 的时候
  - 激活当前的tab样式，删除其他tab的样式
  - 渲染各省热销 sub 模块  (拼接html格式字符串，进行渲染)
- 默认激活第一个tab的效果
- 开启定时器，按依次切换

**预备知识**：

- 扩展知识：ES6模版字符

```js
// 模版字符
var star = {
        name: "刘德华",
        age: 18
      };
//   以前的写法 拼接的时候引号很容易出问题
console.log("我的名字是" + star.name + "我的年龄是" + star.age);
//   ES6 模板字符写法
console.log(`我的名字是${star.name}我的年龄是${star.age}`);
console.log(`<span>${star.name}</span><span>${star.age}</span>`);
```

**开始实现**：

第一步：得到后台数据（实际开发中，这个数据通过ajax请求获得）

```js
    var hotData = [
      {
        city: '北京',  // 城市
        sales: '25, 179',  // 销售额
        flag: true, //  上升还是下降
        brands: [   //  品牌种类数据
          { name: '可爱多', num: '9,086', flag: true },
          { name: '娃哈哈', num: '8,341', flag: true },
          { name: '喜之郎', num: '7,407', flag: false },
          { name: '八喜', num: '6,080', flag: false },
          { name: '小洋人', num: '6,724', flag: false },
          { name: '好多鱼', num: '2,170', flag: true },
        ]
      },
      {
        city: '河北',
        sales: '23,252',
        flag: false,
        brands: [
          { name: '可爱多', num: '3,457', flag: false },
          { name: '娃哈哈', num: '2,124', flag: true },
          { name: '喜之郎', num: '8,907', flag: false },
          { name: '八喜', num: '6,080', flag: true },
          { name: '小洋人', num: '1,724', flag: false },
          { name: '好多鱼', num: '1,170', flag: false },
        ]
      },
      {
        city: '上海',
        sales: '20,760',
        flag: true,
        brands: [
          { name: '可爱多', num: '2,345', flag: true },
          { name: '娃哈哈', num: '7,109', flag: true },
          { name: '喜之郎', num: '3,701', flag: false },
          { name: '八喜', num: '6,080', flag: false },
          { name: '小洋人', num: '2,724', flag: false },
          { name: '好多鱼', num: '2,998', flag: true },
        ]
      },
      {
        city: '江苏',
        sales: '23,252',
        flag: false,
        brands: [
          { name: '可爱多', num: '2,156', flag: false },
          { name: '娃哈哈', num: '2,456', flag: true },
          { name: '喜之郎', num: '9,737', flag: true },
          { name: '八喜', num: '2,080', flag: true },
          { name: '小洋人', num: '8,724', flag: true },
          { name: '好多鱼', num: '1,770', flag: false },
        ]
      },
       {
        city: '山东',
        sales: '20,760',
        flag: true,
        brands: [
          { name: '可爱多', num: '9,567', flag: true },
          { name: '娃哈哈', num: '2,345', flag: false },
          { name: '喜之郎', num: '9,037', flag: false },
          { name: '八喜', num: '1,080', flag: true },
          { name: '小洋人', num: '4,724', flag: false },
          { name: '好多鱼', num: '9,999', flag: true },
        ]
      }
    ]
```

第二步：根据数据渲染各省热销 sup 模块内容

- 删掉原先自带小li
- 遍历数据 $.each()  
- 拼接字符串把数据渲染到 li 的span 里面
- 追加给 .sup 盒子

~~~javascript
 var supHTML = "";
  $.each(hotData, function(index, item) {
    // console.log(item);
    supHTML += `<li><span>${item.city}</span><span> ${item.sales} <s class=
    ${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
  });
  $(".sup").html(supHTML);
~~~



第三步：当数据进入 tab 的时候

- 激活当前的tab样式，删除其他tab的样式
- 渲染各省热销 sub 模块 
  - 注意鼠标进入tab， 只遍历 当前索引号对应的 城市对象里面的 brands 
  -  拼接html格式字符串，进行渲染

```js
 
```

第四步：默认激活第一个tab

```js
  // 所有的LI
  var $lis = $('.province .sup li')
  // 第一个默认激活
  $lis.eq(0).mouseenter()
```

第五步：开启定时切换

- 定时器里面 mouseenter 冲突问题的解决方案

  **定时器里面不加mousenter 事件**，而是直接重新渲染数据就可以(执行鼠标经过事件里面的代码)

  最好把渲染的代码封装到函数里面

```js
 var index = 0;
  var timer = setInterval(function() {
    index++;
    if (index >= 5) index = 0;
    // lis.eq(index).mouseenter();
    render(lis.eq(index));
  }, 2000);

  $(".province .sup").hover(
    // 鼠标经过事件
    function() {
      clearInterval(timer);
    },
    // 鼠标离开事件
    function() {
      clearInterval(timer);
      timer = setInterval(function() {
        index++;
        if (index >= 5) index = 0;
        // lis.eq(index).mouseenter();
        render(lis.eq(index));
      }, 2000);
    }
  );
```

## 24-Echarts-社区介绍

> [社区](https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)就是一些，活跃的echart使用者，交流和贡献定制好的图表的地方。

在这里可以找到一些基于echart的高度定制好的图表，相当于基于jquery开发的插件，这里是基于echarts开发的第三方的图表。

## 25-Echarts-map使用（扩展）

参考社区的例子：https://gallery.echartsjs.com/editor.html?c=x0-ExSkZDM  (模拟飞机航线)

实现步骤：

- 第一需要下载china.js提供中国地图的js文件
- 第二个因为里面代码比较多，我们新建一个新的js文件 myMap.js 引入
- 使用社区提供的配置即可。

需要修改：

- 去掉图例组件和标题组件
- 去掉背景颜色
- 修改地图省份背景  #142957
- 地图放大通过  zoom   设置为1.2即可

~~~javascript
geo: {
  map: 'china',
  zoom: 1.2,
  label: {
    emphasis: {
      show: false
    }
  },
  roam: false,
  itemStyle: {
    normal: {
      areaColor: '#142957',
      borderColor: '#0692a4'
    },
    emphasis: {
      areaColor: '#0b1c2d'
    }
  }
},
~~~

总结：这例子是扩展案例，大家以后可以多看看社区里面的案例。





