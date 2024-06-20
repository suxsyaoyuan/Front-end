# AJAX

# 0 Rest Api

我们之前编写的服务器都是传统的服务器，服务器的结构是基于MVC模式

- ​    Model -- 数据模型
- ​    View -- 视图，用来呈现
- ​    Controller -- 控制器，复杂加载数据并选择视图来呈现数据

传统的服务器是直接为客户端返回一个页面，但是传统的服务器并不能适用于现在的应用场景

现在的应用场景，一个应用通常都会有多个客户端（client）存在
    web端    移动端（app）    pc端  

如果服务器直接返回html页面，那么服务器就只能为web端提供服务
其他类型的客户端还需要单独开发服务器，这样就提高了开发和维护的成本

如何解决这个问题？

传统的服务器需要做两件事情，第一个加载数据，第二个要将模型渲染进视图

解决方案就将渲染视图的功能从服务器中剥离出来，
服务器只负责向客户端返回数据，渲染视图的工作由客户端自行完成

分离以后，服务器只提供数据，一个服务器可以同时为多种客户端提供服务器
同时将视图渲染的工作交给客户端以后，简化了服务器代码的编写

### Rest

REpresentational State Transfer 

​    	表示层状态的传输

 Rest实际上就是一种服务器的设计风格

 它的主要特点就是，服务器只返回数据

 服务器和客户端传输数据时通常会使用JSON作为数据格式

- 请求的方法：

  ​        GET    加载数据

  ​        POST   新建或添加数据

  ​        PUT    添加或修改数据

  ​        PATCH  修改数据

  ​        DELETE 删除数据

  ​        OPTION 由浏览器自动发送，检查请求的一些权限

- API（接口） Endpoint（端点）

  ​        GET /user

  ​        POST /user

  ​        DELETE /user/:id

  ​        ...

```js
// rest风格服务器 这里只返回数据
const express = require("express")
const app = express()
const STU_ARR = [
    { id: "1", name: "孙悟空", age: 18, gender: "男", address: "花果山" },
    { id: "2", name: "猪八戒", age: 28, gender: "男", address: "高老庄" },
    { id: "3", name: "沙和尚", age: 38, gender: "男", address: "流沙河" }
]

app.use(express.urlencoded({ extended: true }))
// 解析json格式请求体的中间件
app.use(express.json())

app.use((req, res) => {
    // 设置响应头
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST")
    res.setHeader("Access-Control-Allow-Headers", "Content-type")
    // Access-Control-Allow-Origin 设置指定值时只能设置一个
    // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    // Access-Control-Allow-Methods 允许的请求的方式
    // Access-Control-Allow-Headers 允许传递的请求头
})

// 统一的api 路由功能统一 返回结果统一
// 定义学生信息的路由 查询所有学生
app.get("/students", (req, res) => {
    console.log("收到students的get请求")
    // 返回学生信息
    res.send({
        status: "ok",
        data: STU_ARR
    })
})

// 查询某个学生的路由 查询都用get 学生都用students 某个学生要用id所以不重复 
app.get("/students/:id", (req, res) => {
    const id = req.params.id
    const stu = STU_ARR.find((item) => item.id === id)

    // 将数据返回
    res.send({
        status: "ok",
        data: stu
    })
})

// 定义一个添加学生的路由
app.post("/students", (req, res) => {
    console.log("收到students的post请求", req.body)
    // 获取学生的信息
    const { name, age, gender, address } = req.body
    // 创建学生信息
    const stu = {
        id: +STU_ARR.at(-1).id + 1 + "",
        name,
        age: +age,
        gender,
        address
    }

    // 将学生信息添加到数组
    STU_ARR.push(stu)

    // 添加成功
    res.send({
        status: "ok",
        data: stu
    })
})

// 定义一个删除学生的路由 根据id删除学生
// app.delete()
app.delete("/students/:id", (req, res) => {
    // 获取学生的id
    const id = req.params.id
    // 遍历数组
    for (let i = 0; i < STU_ARR.length; i++) {
        if (STU_ARR[i].id === id) {
            //如果这个id存在 就删除当前 从i开始 删除一个
            const delStu = STU_ARR[i]
            STU_ARR.splice(i, 1)
            // 数据删除成功
            res.send({
                status: "ok",
                data: delStu  //删除的学生数据
            })
            return
        }
    }

    // 如果执行到这里，说明学生不存在
    res.status(403).send({
        status: "error",
        data: "学生id不存在"
    })   
})

// 定义一个修改学生的路由
// app.put()
app.put("/students", (req, res) => {
    // 获取数据
    const { id, name, age, gender, address } = req.body

    // 根据id查询学生
    const updateStu = STU_ARR.find((item) => item.id === id)

    if (updateStu) {
        updateStu.name = name
        updateStu.age = age
        updateStu.gender = gender
        updateStu.address = address

        res.send({
            status: "ok",
            data: updateStu
        })
    } else {
        res.status(403).send({
            status: "error",
            data: "学生id不存在"
        })
    }
})

app.listen(3000, () => {
    console.log("服务器已经启动！")
})
```

### postman

这是一个软件，通过它可以帮助向服务器发送各种请求帮助我们测试API。

# d1 AJAX简介

AJAX 全称为Asynchronous JavaScript And [XML](https://so.csdn.net/so/search?q=XML&spm=1002101.01.70)，就是异步的JS 和XML
通过AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：**无刷新获取数据**
AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

```js
<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>这是一个网页</title>
    </head>
    <body>
        // 两个服务器
        <h1>这是客户端</h1>
        <!-- 
        把服务器中的数据在网页中显示出来！
        -->
        <button id="btn">点我加载数据</button>
        <script>
            // 点击按钮以后，就去自动去加载服务器的数据
            const btn = document.getElementById("btn")
            btn.onclick = () => {
                // 向服务器发送请求了
                // https://restfulapi.net/http-status-codes/
                /* 
                    在js中向服务器发送的请求加载数的技术叫AJAX
                    AJAX
                        - A 异步  J JavaScript  A 和 X xml
                        - 异步的js和xml
                        - 它的作用就是通过js向服务器发送请求来加载数据
                        - xml是早期AJAX使用的数据格式
                            <student>
                                <name>孙悟空</name>    
                            </student>
                        - 目前数据格式都使用json
                            {"name" :"孙悟空"}
                            
                        - 可以选择的方案：
                            ① XMLHTTPRequest（xhr）
                            ② Fetch
                            ③ Axios（√ 学这个）
        </script>
    </body>
</html>

```

## 01 AJAX 的特点

### 1.1 AJAX 的优点

1. 可以无需刷新页面而与服务器端进行通信
2. 允许你根据用户事件来更新部分页面内容

### 1.2 AJAX 的缺点

1. 没有浏览历史，不能回退
2. 存在跨域问题(同源)
3. SEO 不友好

## 02 HTTP相关问题

### 2.1 MDN 文档

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview

### 2.2 HTTP 请求交互的基本过程

![process](https://i0.hdslb.com/bfs/album/7cdb21cf5df63e0f78839315e2953e03eed9de84.png)

1. 前后应用从浏览器端向服务器发送HTTP 请求(请求报文)
2. 后台服务器接收到请求后, 调度服务器应用处理请求, 向浏览器端返回HTTP响应(响应报文)
3. 浏览器端接收到响应, 解析显示响应体/调用监视回调

### 2.3 HTTP 报文

HTTP（hypertext transport protocol）协议『超文本传输协议』，协议详细规定了浏览器和万维网服务器之间互相通信的规则。

#### 2.3.1 请求报文

重点是格式与参数

```
行      POST  /s?ie=utf-8  HTTP/1 
头      Host: www.baidu.com
        Cookie: BAIDUID=AD3B0FA706E; BIDUPSID=AD3B0FA706;    
        Content-type: application/x-www-form-urlencoded
        User-Agent: chrome 83
空行
体      username=admin&password=admin
```

> 注:post请求才有请求体

**Request Headers**

| Request Header  | 说明                                                |
| --------------- | --------------------------------------------------- |
| Accept          | 浏览器可接收的数据格式（如：*/*）                   |
| Accept-Language | 客户端接收的语言类型（如：zh-CN,en-US）             |
| Connection      | 维护客户端和服务端的连接关系（如：Keep-Alive）      |
| Host            | 连接的目标主机和端口号（如：localhost:8080）        |
| User-Agent      | 客户端版本号的名字                                  |
| Accept-Encoding | 客户端能接收的压缩数据的类型（如：gzip）            |
| Cookie          | 客户端暂存服务端的信息                              |
| Content-type    | 发送数据的格式，get请求没有（如：application/json） |

#### 2.3.2 响应报文

```
行      HTTP/1  200  OK
头      Content-Type: text/html;charset=utf-8
        Set-Cookie: BD_CK_SAM=1;path=/
        Content-length: 2048
        Content-encoding: gzip
空行    
体      <html>
            <head>
            </head>
            <body>
                <h1>尚硅谷</h1>
            </body>
        </html>
        (html 文本/json 文本/js/css/图片...)
```

![network](https://i0.hdslb.com/bfs/album/7815086ab584cb98b96c542cde0f7347320364b8.png)

> - 负载(Payload)用来查看请求发送的查询字符串和form data
> - Preview用来查看解析后的返回数据
> - Response用来查看返回数据

**Response Headers**

| Response Headers | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| Content-Type     | 服务端发送的类型及采用的编码方式（如：text/html; charset=utf-8） |
| Content-Encoding | 服务端能够发送压缩编码类型（如：gzip）                       |
| Content-Length   | 服务端发送的压缩数据的长度（如：128）                        |
| Set-Cookie       | 服务端发送到客户端的暂存数据                                 |
| Cache-Control    | 缓存相关                                                     |
| Last-Modified    | 缓存相关                                                     |
| Etag             | 缓存相关                                                     |

#### 2.3.3 post请求体参数格式

1. Content-Type: application/x-www-form-urlencoded;charset=utf-8
   用于键值对参数，参数的键值用=连接, 参数之间用&连接
   例如: `name=%E5%B0%8F%E6%98%8E&age=12`
2. Content-Type: application/json;charset=utf-8
   用于 json 字符串参数
   例如: `{"name": "%E5%B0%8F%E6%98%8E", "age": 12}`
3. Content-Type: multipart/form-data
   用于文件上传请求

### 2.4 常见的响应状态码

**状态码**

- `1xx`：指示信息-表示请求已接收，继续处理
- `2xx`：成功-表示请求已被成功接收
- `3xx`：重定向-要完成请求必须进行更进一步的操作
- `4xx`：客户端错误-请求有语法错误或请求无法实现
- `5xx`：服务器错误-服务器未能实现合法的请求

**常见的http状态码**

- `200`：客户端请求成功
- `206`：客户发送带有`range`头的GET请求，服务器完成了它
- `301`：重定向（永久）
- `302`：重定向（临时）
- `304`：资源未被修改，有缓存
- `403`：请求被拒绝
- `404`：资源未找到
- `500`：服务器错误
- `504`：网关超时

### 2.5 不同类型的请求及其作用

1. `GET`: 从服务器端**读取**数据（查）
2. `POST`: 向服务器端**添加**新数据 （增）
3. `PUT`: 更新资源 （改）
4. `DELETE`: **删除**服务器端数据 （删）

# d2 原生AJAX 使用（xhr）

### 01 理解

1. 使用`XMLHttpRequest` (XHR)对象可以与服务器交互, 也就是发送ajax 请求
2. 前端可以获取到数据，而无需让整个的页面刷新。
3. 这使得Web 页面可以只更新页面的局部，而不影响用户的操作。

https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
`XMLHttpRequest`，AJAX 的所有操作都是通过该对象进行的

### 02 使用步骤

ajax 的请求过程：创建XMLHttpRequest对象、配置请求、接收响应数据、发送请求。

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/students")
xhr.onreadystatechange = function (){ }
xhr.send()
```

```js
// 我们要发请求 要先找到发请求的对象
// 创建一个新的xhr对象，xhr表示请求信息
const xhr = new XMLHttpRequest();
// 请求方式 设置请求的信息 xhr.open(method, url);
xhr.open("GET", "http://localhost:3000/students")
// 可以设置请求头，一般不设置
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 事件绑定 处理服务端返回的结果
// on  when 当....时候
// readystate 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
// 状态 0 表示未初始化  1 open方法调用完毕 2 send方法已经调用完毕 3 服务端返回部分结果 4 服务端返回了所有结果
// change  改变
xhr.onreadystatechange = function (){
     // 判断 (服务端返回了所有的结果)
    if(xhr.readyState == 4 && xhr.status == 200){
          console.log(xhr.status);// 状态码
           console.log(xhr.statusText);// 状态字符串
           console.log(xhr.getAllResponseHeaders());// 所有响应头
           console.log(xhr.response);//响应体
    }
}
// 发送请求
xhr.send()
// get请求不传 body 参数，只有post请求使用
// xhr.send(body) 
// xhr.response 表示响应信息 异步的 不能直接读 还没回来
```

```js
// 读取响应要怎么操作？
const btn = document.getElementById("btn")
const root = document.getElementById("root")
btn.onclick = () => {
// 创建一个xhr对象
const xhr = new XMLHttpRequest();
// 设置响应体的类型，设置后会自动对数据进行类型转换
xhr.responseType = "json"   //或者在这里直接转换

// 可以为xhr对象绑定一个load事件 加载完成后再去
xhr.onload = function () {
// 1发请求 2读取服务器响应 3把响应的数据渲染到页面 就是DOM
    
// xhr.status 表示响应状态码 与路由中的不同
// console.log(xhr.status)
if (xhr.status === 200) {
    // xhr.response 表示响应信息 现在是字符串 读不出来
    // const result = JSON.parse(xhr.response)  转换成js对象
    // console.log(result.status, result.data)
    
    // 读取响应信息
    // console.log(xhr.response)
    const result = xhr.response
    
    // 接下来要渲染界面 通过ajax把服务器的数据加载到浏览器 浏览器再通过dom把数据显示出来
    // 判断数据是否正确
    if (result.status === "ok") {
        // 创建一个ul
        const ul = document.createElement("ul")
        // 将ul插入到root中
        root.appendChild(ul)
        // 遍历数据 status data 这是根据api返回的数据结构
        for (let stu of result.data) {
            ul.insertAdjacentHTML(
                "beforeend",
                `<li>${stu.id} - ${stu.name} - ${stu.age} - ${stu.gender} - ${stu.address}</li>`
            )
        }
    }
}
}
// 设置请求的信息
xhr.open("get", "http://localhost:3000/students")
// 发送请求
xhr.send()
}
```

简单封装ajax

```js
const qs = require('qs');

export default function ajax(option = {}) {
    option = Object.assign({
        url: '',
        method: 'get',
        data: null,
        success: null
    }, option);

    option.data = qs.stringify(option.data); // x-www-form-urlencoded
    let isGET = /^(GET|DELETE|HEAD|OPTIONS)$/i.test(option.method);
    if (isGET && option.data) {
        let char = option.url.includes('?') ? '&' : ?
        option.url += `${char}${option.data}`;
        option.data = null;
    }

    // 发送请求
    let xhr = new XMLHttpRequest();
    xhr.open(option.method, option.url);
    xhr.onreadystatechange = function() {
        if (/^2\d{2}$/.test(xhr.status) && xhr.readyState === 4) {
            // 成功从服务器获取结果 JSON 字符串
            typeof option.success === "function" ? option.success(JSON.parse(xhr.responseText)) : null;
        }
    };
    xhr.send(option.data);
}

// 使用 ajax 函数
ajax({
    url: 'http://127.0.0.1:8888/user/list',
    method: 'get',
    data: {
        search:'',
        lx:1;
    }, // 这里可以传入需要发送的数据
    success: function(result) {
        console.log(result);
    }
});

// 需求：Ajax串行 回调地狱
Promise
new Promise(resolve =>{
    
}).then();
async await
```

基于promise封装ajax

```js
const qs = require('qs');

export default function ajax(option = {}) {
    option = Object.assign({
        url: '',
        method: 'get',
        data: null
    }, option);

    option.data = qs.stringify(option.data); // x-www-form-urlencoded
    let isGET = /^(GET|DELETE|HEAD|OPTIONS)$/i.test(option.method);
    if (isGET && option.data) {
        let char = option.url.includes('?') ? '&' : ?
        option.url += `${char}${option.data}`;
        option.data = null;
    }

    return new Promise((resolve,reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open(option.method, option.url);
        xhr.onreadystatechange = function() {
            if (!/^2\d{2}$/.test(xhr.status)) { //失败
                reject(xhr);
                return;
            }
            if (xhr.readyState === 4) { // 成功
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(option.data);
	});
}

// ajax.get
['get','post','delete'].forEach(item =>{
    ajax[item] = function(url='',data={}){
        return ajax({
            url,
            method:item,
            data
        })
    }
})
```

### 03 get请求

```js
// 创建对象 
const xhr = new XMLHttpRequest();
// 初始化 设置请求方法和url
xhr.open('GET', 'http://127.0.0.1:8000/server')
// 发送
xhr.send();
// 事件绑定 处理服务端返回的结果
xhr.onreadystatechange = function(){
    // readyState 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
    // 判断 (服务端返回了所有的结果)
    if(xhr.readyState === 4){
      // 判断响应状态码 200  404  403 401 500
      if(xhr.status >= 200 && xhr.status < 300){
        // 处理结果 行 头 空行 体
        // 响应
        console.log('状态码', xhr.status); // 状态码
        console.log('状态字符串', xhr.statusText); // 状态字符串
        console.log('所有响应头', xhr.getAllResponseHeaders()); // 所有响应头
        console.log('响应体', xhr.response); // 响应体
        //设置 result 的文本
        result.innerHTML=xhr.response;
      }
    }
} 
```

**GET 请求设置请求参数**

设置url参数

```javascript
xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
```

![image-20220624212741956](https://i0.hdslb.com/bfs/album/6503382b9601cfc3e01d146acc072a6da94db603.png)

![](https://img-blog.csdnimg.cn/img_convert/24762725394ed29f5644b01259f0b0ef.png)

### 04 post请求

```js
// 创建对象
const xhr = new XMLHttpRequest();
// 初始化 设置类型（请求方式）与url
xhr.open('POST', 'http://127.0.0.1:8000/server');
// 设置请求头
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
// 自定义头信息
xhr.setRequesHeader('name', 'ykyk');
// 发送   设置请求参数（请求体）
xhr.send('a=100&b=200&c=300');
// 事件绑定
xhr.onreadystatechange = function(){
    // 判断
    if(xhr.readyState === 4){
      if(xhr.status >=200 && xhr.status < 300){
        // 处理服务端返回的结果
        result.innerHTML = xhr.response;
      }
}
```

**后端设置**

设置响应头允许自定义请求头 post改成all

```js
response.setHeader('Access-Control-Allow-Header','*');
```

**取消发送无用的参数**

有的时候有的参数是可以不填写的，这时尽管是空串也会随着请求发过去，我们可以将参数的值设置成`undefined`，这样就不会随请求发过去了

**get/post 区别：**

区别1：get请求不会附带请求体，而post请求有请求体。

区别2： get请求传递的信息量是有限的，适合传递少量数据；post请求的传递信息量是没有限制的，适合传输大量数据。

区别3：get请求只能传递ASCII数据，遇到非ASCII数据需要进行编码；post请求是没有限制的。

区别4：大部分的get请求传递的数据都是附带在path参数中的，能够通过分享地址完整的重现页面，但是也同时暴露了数据，如果有重要数据传输的话，不应该使用GET请求。

区别5：post请求刷新页面的时候浏览器会提示是否重新提交，get请求不会。

区别6：get请求可以保存浏览器书签，post请求不可以。

**请求超时与网络异常**

```js
// 超时设置 （2秒） 超过2s请求就取消  status 状态变成 cancel 
xhr.timeout = 2000;
// 超时回调
xhr.ontimeout = function(){
    alert('网络超时，请稍后重试')
}
// 网络异常回调
xhr.onerror = function(){
    alert('网络异常，请稍后重试')
}
```

**取消请求**

```js
// 手动取消请求        
// network中的status中pending为等待中
// 取消就变成cancel
xhr.abort()
```

### 05 AJAX 请求状态

`xhr.readyState` 可以用来查看请求当前的状态
https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState

![status](https://i0.hdslb.com/bfs/album/1b95ed0be7824a04e45b0dd9f776037bcb441417.png)

- 0: 表示XMLHttpRequest 实例已经生成，但是open()方法还没有被调用
- 1: 表示send()方法还没有被调用，仍然可以使用setRequestHeader()，设定HTTP请求的头信息
- 2: 表示send()方法已经执行，并且头信息和状态码已经收到
- 3: 表示正在接收服务器传来的body 部分的数据
- 4: 表示服务器数据已经完全接收，或者本次接收已经失败了

### 06 API总结

- XMLHttpRequest()：创建 XHR 对象的构造函数
- status：响应状态码值，如 200、404
- statusText：响应状态文本，如 ’ok‘、‘not found’
- readyState：标识请求状态的只读属性 0-1-2-3-4
- onreadystatechange：绑定 readyState 改变的监听
- responseType：指定响应数据类型，如果是 ‘json’，得到响应后自动解析响应
- response：响应体数据，类型取决于 responseType 的指定
- timeout：指定请求超时时间，默认为 0 代表没有限制
- ontimeout：绑定超时的监听
- onerror：绑定请求网络错误的监听
- open()：初始化一个请求，参数为：(method, url[, async])
- send(data)：发送请求
- abort()：中断请求 （发出到返回之间）
- getResponseHeader(name)：获取指定名称的响应头值
- getAllResponseHeaders()：获取所有响应头组成的字符串
- setRequestHeader(name, value)：设置请求头

# d3 跨域

## 01 同源策略

- 同源策略(Same-Origin Policy)最早由Netscape 公司提出，是浏览器的一种安全策略
- 同源： 协议、域名、端口号必须完全相同
- 跨域： 违背同源策略就是**跨域**

## 02 如何解决跨域

什么情况造成跨域 ?

- 服务器分离做并发处理
- 云信息共享 请求第三方接口
- 开发跨域 部署同源

### 2.1 修改本地HOST

只需要在开发的时候解决跨域问题

DNS处理 

​	本地DNS（HOST）: appache服务 映射 骗浏览器

​	网络DNS

### 2.2 JSONP

> **jsonp只支持get请求不支持post请求**

**1)  JSONP 是什么**

JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持get 请求。

**2)  JSONP 怎么工作的？**

在网页有一些标签天生具有跨域能力，比如：img link iframe script。JSONP 就是利用script 标签的跨域能力来发送请求的。

- 需要服务器支持
- 只能get

**3)  JSONP 的使用**

JSONP通过动态创建一个`<script>`标签发送跨域请求，服务器返回调用指定回调函数的脚本，浏览器执行该脚本并传递数据给回调函数，实现跨域数据获取。

**html代码**

```js
// 1. 创建 script 标签
const script = document.createElement('script');
// 2. 设置标签的 src 属性
script.src = 'http://127.0.0.1:8000/check-username?callback=abc';
// 3. 将script 添加到body 中
document.body.appendChild(script);
function abc(data) {
    alert(data.name);
};
```

**nodejs 代码**

```js
app.get("/check-username" , function (req , res) {
    var callback = req.query.callback;
    const data = {
        name: '孙悟空'
    };
    //将数据转化为字符串
    let str = JSON.stringify(data);
    //返回结果(一段可执行的JavaScript代码)
    response.end(`handle(${str})`);
});
```

### 2.3 CORS

```js
/*
- CORS (跨域资源共享)
        - 跨域请求
            - 如果两个网站的完整的域名不相同
                a网站：http://haha.com 
                b网站：http://heihei.com
            - 跨域需要检查三个东西：
                协议 域名 端口号
                http://localhost:5000
                http://127.0.0.1:5000
                - 三个只要有一个不同，就算跨域
            - 当我们通过AJAX去发送跨域请求时，
                浏览器为了服务器的安全，会阻止JS读取到服务器的数据

        - 解决方案
            - 在服务器中设置一个允许跨域的头
                Access-Control-Allow-Origin
                    - 允许那些客户端访问我们的服务器
                https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS               
*/
```

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

1) **CORS 是什么？**
   CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持get 和post 请求。跨域资源共享标准新增了一组HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源
   
2) **CORS 怎么工作的？**
   CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。
   
3) **CORS 的使用**
   主要是服务器端的设置：

```js
app.use((req, res) => {
    // 通过res 来设置响应头，来允许跨域请求
    res.setHeader("Access-Control-Allow-Origin","*");//允许所有来源访问
    // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH")
    res.setHeader("Access-Control-Allow-Headers", "Content-type")
    
    // Access-Control-Allow-Origin 设置指定值时只能设置一个
    // Access-Control-Allow-Methods 允许的请求的方式
    // Access-Control-Allow-Headers 允许传递的请求头
});            
```

### 2.4 Proxy

通过中间代理服务器来转发请求，并将响应返回给客户端，从而绕过同源策略的限制。

```js
// 配置跨域代理：http-proxy-middleware
// 跨域
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://127.0.0.1:7100",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
```

> 部署 nginx反向代理 服务器 

# d4 Axios

## 01 Axios 是什么?

1. 前端最流行的`Ajax`请求库
2. react/vue 官方都推荐使用 axios 发ajax 请求
3. [文档: https://github.com/axios/axios](https://github.com/axios/axios)

## 02 Axios 特点

1. 基于 xhr + promise 的异步 ajax请求库
2. 浏览器端/node 端都可以使用
3. 支持请求／响应拦截器
4. 支持请求取消
5. 请求/响应数据转换
6. 批量发送多个请求

## 03 Axios 常用语法

```js
axios(config): 通用/最本质的发任意类型请求的方式
axios(url[, config]): 可以只指定url 发get 请求
axios.request(config): 等同于axios(config)
axios.get(url[, config]): 发get 请求
axios.delete(url[, config]): 发delete 请求
axios.post(url[, data, config]): 发post 请求
axios.put(url[, data, config]): 发put 请求

axios.defaults.xxx: 请求的默认全局配置（method\baseURL\params\timeout…）
axios.interceptors.request.use(): 添加请求拦截器
axios.interceptors.response.use(): 添加响应拦截器

axios.create([config]): 创建一个新的axios(它没有下面的功能)

axios.Cancel(): 用于创建取消请求的错误对象
axios.CancelToken(): 用于创建取消请求的 token 对象
axios.isCancel(): 是否是一个取消请求的错误
axios.all(promises): 用于批量执行多个异步请求
axios.spread(): 用来指定接收所有成功数据的回调函数的方法
```

![image-20220625194840070](https://i0.hdslb.com/bfs/album/ddc28465dad12c1c979947998de61a0ca9bd3968.png)

## 04 Axios使用

```js
<button id="btn1">按钮1</button>
<button id="btn2">按钮2</button>

<script>
    document.getElementById("btn1").onclick = () => {
        // 直接调用axios发送请求
        // axios(config)
        axios({
            method: "post",
            url: "http://localhost:3000/students",
            data: {
                name: "唐僧",
                age: 18,
                gender: "男",
                address: "女儿国"
            } // 请求参数 会自动转换为js对象 

            // data:"name=swk&age=18"
        })
            .then((result) => {
                // result是axios封装过
                console.log(result.data)
            })
            .catch((err) => {
                console.log("出错了！", err)
            })
    }


    document.getElementById("btn2").onclick = () => {
        // 直接调用axios发送请求
        // axios(config)
        axios({
            method: "get",
            url: "http://localhost:3000/students",

        })
            .then((result) => {
                // axios默认只会在响应状态为2xx时才会调用then
                // result是axios封装过
                console.log(result.data)
            })
            .catch((err) => {
                console.log("出错了！", err)
            })
    }
```

### 4.1 配置对象常用的配置项

```js
{
  // 路径url
  url: '/user',

  // 请求方法，默认get
  method: 'get', 

  //基础url，最终请求的url是 baseURL+url拼接，所以再全局设置默认，可以使得发送请求时的url变得简洁
  baseURL: 'https://some-domain.com/api/',

  //设置请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  //设置请求url的query参数，可以使得url简洁。
  //比如url是https://some-domain.com/api/user  然后params如下设置，那么最终的url是：
  //https://some-domain.com/api/user?ID=12345&name=Jack
  params: {
    ID: 12345,
    name:"Jack"
  },

 //设置请求体
  data: {
    firstName: 'Fred'
  },

  //设置请求的另外一种格式，不过这个是直接设置字符串的
  data: 'Country=Brasil&City=Belo Horizonte',

 //请求超时，单位毫秒，默认0，不超时。
  timeout: 1000,
      
  // 用来终止请求
  signal

  //响应数据类型，默认json
  responseType: 'json', 

  //响应数据的编码规则，默认utf-8
  responseEncoding: 'utf8',

  //响应体的最大长度 
  maxContentLength: 2000,

  // 请求体的最大长度
  maxBodyLength: 2000,

      
	// transformRequest 可以用来处理请求数据（data）
	// 它需要一个数组作为参数，数组可以接收多个函数，请求发送时多个函数会按照顺序执行
	// 函数在执行时，会接收到两个参数data和headers
  transformRequest:[function(data, headers){
     // 可以在函数中对data和headers进行修改
     data.name = "猪八戒"
     headers["Content-Type"] = "application/json"
     return data
 }, function(data, headers){
     // 最后一个函数必须返回一个字符串，才能使得数据有效
     return JSON.stringify(data)
 }]
      
  //设置响应状态码为多少时是成功，调用resolve，否则调用reject失败
  //默认是大于等于200，小于300
  validateStatus: function (status) {
    return status >= 200 && status < 300; 
  }
```

**代码**

```js
<button id="btn1">发送get请求</button> <br><br>
<button id="btn2">发送post请求</button><br><br>
<button id="btn3">发送put请求</button><br><br>
<button id="btn4">发送delete请求</button>

<hr>

<div>其他发送请求的api:</div><br><br>
<button id="btn5">发送get请求1</button> <br><br>
<button id="btn6">发送post请求1</button><br><br>
<button id="btn7">发送put请求1</button><br><br>
<button id="btn8">发送delete请求1</button>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
//发送get
document.getElementById("btn1").onclick = function(){
   axios({
    method:"GET",
    url:"http://localhost:3000/posts/1"
   }).then(response=>{
       console.log(response);
   })
};

//发送post
document.getElementById("btn2").onclick = function(){
   axios({
    method:"POST",
    url:"http://localhost:3000/posts",
    data:{
        title:"axios学习",
        author:"Yehaocong"
    }
   }).then(response=>{
       console.log(response);
   })
};
//发送put
document.getElementById("btn3").onclick = function(){
   axios({
    method:"PUT",
    url:"http://localhost:3000/posts/2",
    data:{
        title:"axios学习",
        author:"Liaoxiaoyan"
    }
   }).then(response=>{
       console.log(response);
   })
};
document.getElementById("btn4").onclick = function(){
   axios({
    method:"DELETE",
    url:"http://localhost:3000/posts/2",
   }).then(response=>{
       console.log(response);
   })
};


//其他发送请求的api
document.getElementById("btn5").onclick = function(){
    //发送get,使用get，第一个参数时url，第二个参数时config配置对象
   axios.get("http://localhost:3000/posts/1")
   .then(response=>{
       console.log(response);
   })
};

//发送post
document.getElementById("btn6").onclick = function(){
    //发送post请求，第一个参数时url，第二个参数时请求体，第三个参数时config配置对象
    axios.post("http://localhost:3000/posts",
    {title:"axios学习2",
        author:"Yehaocong2"})
        .then(response=>{
       console.log(response);
   })
};
//发送put,
document.getElementById("btn7").onclick = function(){
    //发送put,接收三个参数，url  请求体 、 config配置对象
   axios.put("http://localhost:3000/posts/2",{title:"axios学习",
        author:"Liaoxiaoyan"})
   .then(response=>{
       console.log(response);
   })
};
document.getElementById("btn8").onclick = function(){
    //发送delete请求，接收2个参数， url config配置对象
    axios.delete("http://localhost:3000/posts/3")
   .then(response=>{
       console.log(response);
   })
};
```

![image-20220625195401372](https://i0.hdslb.com/bfs/album/34b45913177b519321b0d509a3a9c527eb87d4d3.png)

### 4.2 默认配置

可以设置全局默认配置，是为了避免多种重复配置在不同请求中重复，比如baseURL、timeout等，这里设置baseURL。

```js
axios.defaults.baseURL="http://localhost:3000";

axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`
//因为上面配置了baseURL，所以我们之后的请求只需要配置url不用像之前那样的全路径
axios.get("/posts/1")
.then(response=>{
   console.log(response);
})
```

## 05 Axios实例

根据指定配置创建一个新的 axios, 也就是每个新 axios 都有自己的配置，新 axios 只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的。

**为什么要设计这个语法?**

(1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一样, 如何处理（比如有多个baseURL需要指定）

(2) 解决: 创建2 个新axios, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中

```js
// axios实例相当于是axios的一个副本，它的功能和axios一样
// axios的默认配置在实例也同样会生效
//  但是我可以单独修改axios实例的默认配置

// const instance = axios.create()
// instance.defaults.baseURL = "xxx"

const instance = axios.create({ // instance是函数类型
    baseURL: 'http://localhost:3000'
})

// 使用instance发Ajax请求
instance({
    url: '/posts'
})

instance.get('/posts')
```

## 06 拦截器

**请求拦截器**（在发送请求前，使用函数对请求的参数和内容进行处理和检测，若请求有问题可直接进行拦截->取消，后进先执行=则后面的请求拦截器先执行）

**响应拦截器**（对响应的结果预处理，先进先执行=前面的响应拦截器先执行）

1）请求拦截器：

① 在真正发送请求前执行的回调函数

② 可以对请求进行检查或配置进行特定处理

③ 失败的回调函数，传递的默认是error

④ 成功的回调函数，传递的默认是config（也必须是）

```js
axios.defaults.baseURL = "http://localhost:3000"
const myAxios = axios.create()
// axios的拦截器可以对请求或响应进行拦截，在请求发送前和响应读取前处理数据
// 拦截器只对当前的实例有效
// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // console.log("拦截器执行了")
        // config 表示axios中的配置对象
        // config.data.name = "猪哈哈"
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`

        // 在发送请求之前做些什么
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
document.getElementById("btn1").onclick = () => {
    axios({
        url: "students",
        method: "post",
        data: { name: "猪八戒" }
    })
        .then((res) => console.log(res.data))
        .catch((err) => {
            console.log("出错了", err)
        })
}
```

2）响应拦截器

① 在请求得到响应后执行的回调函数

② 可以对响应数据进行特定处理

③ 成功的回调函数，传递的默认是response

④ 失败的回调函数，传递的默认是error

```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

3）请求转换器：对请求头和请求体数据进行特定处理的函数

响应转换器：将响应体json字符串解析为js对象或数组的函数

1. 说明: 调用axios()并不是立即发送ajax 请求, 而是需要经历一个较长的流程
2. 流程: 请求拦截器2 => 请求拦截器1 => 发ajax 请求 => 响应拦截器1 => 响应拦截器2 => 请求的回调
3. 注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是config, 响应拦截器传递的是response

```js
<script>
 // axios的拦截器可以对请求或响应进行拦截，在请求发送前和响应读取前处理数据
       // 拦截器只对当前的实例有效
      //设置一个请求拦截器，在请求拦截器中可以对请求参数进行修改
      //config：配置对象
axios.interceptors.request.use(
    function (config) {
      console.log("请求拦截器 成功 1号");
      // config.headers.test = "I am only a header!";
      //修改 config 中的参数
      config.params = { a: 100 };
      return config;
    },
    error => {
      console.log("请求拦截器 失败 1号");
      return Promise.reject(error);
    }
  );

axios.interceptors.request.use(
    function (config) {
      config.timeout = 5000;
      console.log("请求拦截器 成功 2号");
      // config.headers.test = "I am only a header!";
      //修改 config 中的参数
      config.timeout = 2000;
      return config;
    },
    error => {
      console.log("请求拦截器 失败 2号");
      return Promise.reject(error);
    }
  );

  //设置一个响应拦截器，可以对响应结果做一些处理
axios.interceptors.response.use(
    function (response) {
      console.log("响应拦截器 成功 1号");
        //返回到请求回调时，只要data数据
         return response.data;
    },
    function (error) {
      console.log("响应拦截器 失败 1号");
      return Promise.reject(error);
    }
  );

  //设置一个响应拦截器
  axios.interceptors.response.use(
    function (response) {
      console.log("响应拦截器 成功 2号");
      return response;
    },
    function (error) {
      console.log("响应拦截器 失败 2号");
      return Promise.reject(error);
    }
  );

  //发送请求
  axios({
    method: "GET",
    url: "http://localhost:3000/posts",
  })
    .then((response) => {
      console.log("自定义回调处理成功的结果");
      //console.log(response);
    })
    .catch((reason) => {
      console.log(reason);
    });
</script>
```

![image-20220625200618691](https://i0.hdslb.com/bfs/album/397433af4df136d75a4f6efdf2be9b9d95f450ab.png)

## 07 取消请求

**0.22版本之前可以使用,0.22开始被废弃**

```js
  <body>
    <div class="container">
      <h1 class="page-header">axios取消请求</h1>
      <button class="btn btn-primary">发送请求</button>
      <button class="btn btn-warning">取消请求</button>
    </div>
  </body>
  <script>
    //获取按钮
    const btns = document.querySelectorAll("button");
    //2.声明一个全局变量
    let cancel = null;
    //发送请求
    btns[0].onclick = () => {
      //检测上一次请求是否已经完成
      if (cancel !== null) {
        //则代表上一次请求还未取消，故直接取消上一次请求
        cancel();
      }
      axios({
        method: "GET",
        url: "http://localhost:3000/posts",
        //1.添加配置对象的属性
        cancelToken: new axios.CancelToken((c) => {
          //3.将c的值赋值给cancel
          cancel = c;
        }),
      }).then((response) => {
        console.log(response);
        //当请求执行完后 将cancel进行初始化设置
        cancel = null;
      });
    };

    //取消请求
    btns[1].onclick = () => {
      cancel();
    };
  </script>
```

**0.22新方法**

```js
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.min.js"></script>
 let btn = document.querySelectorAll('button');
const controller = new AbortController();
      btn[0].onclick = function () {
          axios( {
              url:'https://api.uomg.com/api/get.kg?songurl=https://node.kg.qq.com/play?s=YaCv8EYfJunVWYcH',
              signal: controller.signal
              }).then(function(response) {
                  console.log(response);
              });
      }

      btn[1].onclick = function () {
        controller.abort()
      }
```

## 08 在vue中封装axios

`requests.js`

```js
//对于axios进行二次封装
import axios from 'axios';
//获取仓库:存储数据
import store from '@/store';

//axios.create方法执行,其实返回一个axios和request一样的
let requests = axios.create({
  //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
  baseURL: '/api',
  //超时的设置
  timeout: 5000,
});

//请求拦截器:将来项目中【N个请求】，只要发请求,会触发请求拦截器!!!
requests.interceptors.request.use(config => {
  //请求拦截器:请求头【header】,请求头能否给服务器携带参数
  //请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数
  if (store.state.detail.nanoid_token) config.headers.userTempId = store.state.detail.nanoid_token;
  if (store.state.user.token) config.headers.token = store.state.user.token;

  return config;
});

//响应拦截器：请求数据返回会执行
requests.interceptors.response.use(
  res => {
    //res:实质就是项目中发请求、服务器返回的数据
    return res.data;
  },
  err => {
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    alert(err.message);
    //终止Promise链
    return new Promise();
  }
);

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
export default requests;
```

**使用**

```js
import requests from '@/api/requests';
//注册的接口
export const reqRegister = data =>
  requests({ url: `/user/passport/register`, method: 'post', data });
```

**基于promise.all实现ajax得到串行和并行**

- 串行：请求是异步的，需要等待上一个请求成功，才能执行下一个请求

- 并行：同时发送多个请求 [http请求可以同时进行 但是js操作是一步步的 单线程] 等待所有请求成功 再去做其他事情

  ```js
  Promise.all([
  	axios.get(),
  	axios.get(),
  	axios.get(),
  ]).then(results =>{
  
  }).catch(reson=>{
  
  })
  ```

  

# d5 Fetch

> 向服务器发送请求的方案：
>
> - XMLHttpRequest
>
>   - ajax：自己编写请求的逻辑和步骤
>   - axios：第三方库，基于promise对XMLHttpRequest进行封装
>
> - fetch
>
>   ES6内置API，本身基于promise，用全新的方案实现客户端与服务器端的数据请求
>
> - 其他
>
>   - jsonp
>   - postMessage
>   - 利用img的src发送请求，实现数据埋点和上报
>   - ...

## 01 XMLHttpRequest缺点

浏览器提供了原生的AJAX实现类XMLHttpRequest，基于该类实例，我们可以实现在网页上发送AJAX请求到服务端。但是XMLHttpRequest的设计并不完美，主要体现在以下几个方面：

- HTTP请求，响应都被耦合在XMLHttpRequest实例上，结构不够简单明了
- 采用事件回调的方式获取HTTP响应，可能会产生回调地狱
- 如果HTTP响应数据过大，则会占用大量内存
- 最后一点就是，XMLHttpRequest实现AJAX的步骤太零碎了

## 02 Fetch 的优点

> let promise实例(p) = fetch(请求地址，配置项)
>
> 当请求成功，p的状态是fulfilled，值是请求回来的内容；
>
> 如果请求失败，p的状态是rejected，值是失败的原因
>
> fetch和axios有一个不一样的地方 在fetch中，只要服务器有反馈信息【不论HTTP状态码多少】，都说明请求成功，最后的实例p都是fulfilled，只有服务器没有反馈（请求中断、请求超时、断网等），实例p才是rejected。

fetch和XMLHttpRequest一样，也是浏览器原生的，用于发送AJAX请求。

XMLHttpRequest之后诞生的，它旨在解决XMLHttpRequest的不足，所以XMLHttpRequest的缺点就是它的优点，具体优点如下

- 语法简单，结构清晰明了
- 支持Promise获取异步的HTTP响应
- HTTP响应支持流式获取，内存友好

fetch被设计为函数，通过fetch函数调用即可发起AJAX，而不需要像XMLHttpRequest那样创建实例，然后基于xhr实例发起AJAX。

```js
fetch('http://localhost:3000/test') // fetch函数调用即发起AJAX
```

fetch函数返回一个Promise对象，而Promise对象的结果值就是HTTP响应

```javascript
fetch('http://localhost:3000/test').then(response => { // fetch函数返回值是一个Promise类型对象
    console.log(response) // 该Promise对象的结果值response就是HTTP响应
```

fetch函数返回的Promise对象的结果值HTTP响应是流式获取，即使HTTP响应数据很大，也不会占用过多的内存。

## 03 Fetch 基本用法

`fetch()`的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。

（1）`fetch()`使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。

（2）`fetch()`采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。

（3）`fetch()`通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

在用法上，`fetch()`接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。它的基本用法如下。

```js
fetch(url)
  .then(...)
  .catch(...)
```

下面是一个例子，从服务器获取 JSON 数据。

```js
fetch('https://api.github.com/users/ruanyf')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err)); 
```

上面示例中，`fetch()`接收到的`response`是一个 [Stream 对象](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)，`response.json()`是一个异步操作，取出所有内容，并将其转为 JSON 对象。

Promise 可以使用 await 语法改写，使得语义更清晰。

```js
async function getJSON() {
  let url = 'https://api.github.com/users/ruanyf';
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Request Failed', error);
  }
}
```

上面示例中，`await`语句必须放在`try...catch`里面，这样才能捕捉异步操作中可能发生的错误。

后文都采用`await`的写法，不使用`.then()`的写法。

## 04 Fetch 的请求对象

```javascript
fetch(url,options).then((response)=>{
//处理http响应
},(error)=>{
//处理错误
})
```

url ：是发送网络请求的地址

options：发送请求参数

- body - http请求参数 请求主体信息

  只适用于POST系列请求
  
  - json
  
  - urlencoded
  
  - 普通字符
  
  - form-data/multpart：主要运用于文件上传的操作中
  
    ```js
    let fm = new FormData();
    fm.append('file',文件);
    ```
  
  - buffer

- mode -  请求的模式
  - `cors`：默认值，允许跨域请求。

  - `same-origin`：只允许同源请求。

  - `no-cors`：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。

- cache - 用户指定缓存

- method - 请求方法，默认GET

- signal - 用于取消 fetch

- headers - http请求头设置

  Headers.prototype
  
  - append 新增
  - delete 删除
  - forEach 循环获取所有信息
  - get 获取某一项信息
  - has 验证是否包含某一项
  - ...

- keepalive - 用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。

- credentials -是否发送 Cookie
  - `same-origin`：默认值，同源请求时发送 Cookie，跨域请求时不发送。

  - `include`：不管同源请求，还是跨域请求，一律发送 Cookie。

  - `omit`：一律不发送。

- referrer- 用于设定`fetch()`请求的`referer`标头

- referrerPolicy- 用于设定`Referer`标头的规则
  - no-referrer-when-downgrade：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。

  - no-referrer：不发送Referer标头。

  - origin：Referer标头只包含域名，不包含完整的路径。

  - origin-when-cross-origin：同源请求Referer标头包含完整的路径，跨域请求只包含域名。

  - same-origin：跨域请求不发送Referer，同源请求发送。

  - strict-origin：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头。

  - strict-origin-when-cross-origin：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，

  - HTTPS 页面请求 HTTP 资源时不发送该标头。

  - unsafe-url：不管什么情况，总是发送Referer标头。

```js
fetch('http://localhost:3000/test',{
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'qfc',
        age: 18
    })
}).then(res => {
    console.log(res)
})
```

![image-20220624222137163](https://i0.hdslb.com/bfs/album/fbd11a8129e218c75e9897080d3e4014f5db996a.png)

其中需要注意的是Request对象的body属性，该属性值支持

- 查询参数字符串，如'name=qfc&age=18'
- 文本字符串，如'{"name":"qfc", "age": 18}'
- FormData对象
- Blob对象
- ReadableStream对象
- BufferSource对象

## 05 Fetch 的响应对象

### 5.1 Response 对象的同步属性

`fetch()`请求成功以后，得到的是一个 [Response 对象](https://developer.mozilla.org/en-US/docs/Web/API/Response)。它对应服务器的 HTTP 回应。

```js
const response = await fetch(url);
```

前面说过，Response 包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，对应 HTTP 回应的标头信息（Headers），可以立即读取。

```js
async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status);
  console.log(response.statusText);
}
```

上面示例中，`response.status`和`response.statusText`就是 Response 的同步属性，可以立即读取。

fetch 请求成功后，响应 response 对象如图：

![image-20220624221326446](https://i0.hdslb.com/bfs/album/980304396e4a9765abf9f9831d4ab42a3870973d.png)

标头信息属性有下面这些：【私有属性】

- status 

   `Response.status`属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。

- statusText 

   `Response.statusText`属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回“OK”）。

- ok

  `Response.ok`属性返回一个布尔值，表示请求是否成功，`true`对应 HTTP 请求的状态码 200 到 299，`false`对应其他的状态码。

- headers - 响应头

- body - 响应体

  > 响应体内的数据，根据类型各自处理。
  >
  > 是一个readableStream可读流

- type - 返回请求的类型。可能的值如下：
  - `basic`：普通请求，即同源请求。
  - `cors`：跨源请求。
  - `error`：网络错误，主要用于 Service Worker。
  - `opaque`：如果`fetch()`请求的`type`属性设为`no-cors`，就会返回这个值，详见请求部分。表示发出的是简单的跨源请求，类似`<form>`表单的那种跨源请求。
  - `opaqueredirect`：如果`fetch()`请求的`redirect`属性设为`manual`，就会返回这个值，详见请求部分。
  
- url - `Response.url`属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。

- redirected - 返回一个布尔值，表示请求是否发生过跳转。

### 5.2 判断请求是否成功

`fetch()`发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，`fetch()`才会报错，其他情况都不会报错，而是认为请求成功。

这就是说，即使服务器返回的状态码是 4xx 或 5xx，`fetch()`也不会报错（即 Promise 不会变为 `rejected`状态）。

只有通过`Response.status`属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。请看下面的例子。

```js
async function fetchText() {
  let response = await fetch('/readme.txt');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```

上面示例中，`response.status`属性只有等于 2xx （200~299），才能认定请求成功。这里不用考虑网址跳转（状态码为 3xx），因为`fetch()`会将跳转的状态码自动转为 200。

另一种方法是判断`response.ok`是否为`true`。

```js
if (response.ok) {
  // 请求成功
} else {
  // 请求失败
}
```

### 5.3 Response.headers 属性

Response 对象还有一个`Response.headers`属性，指向一个 [Headers 对象](https://developer.mozilla.org/en-US/docs/Web/API/Headers)，对应 HTTP 回应的所有标头。

Headers 对象可以使用`for...of`循环进行遍历。

```js
const response = await fetch(url);

for (let [key, value] of response.headers) {
  console.log(`${key} : ${value}`);
}

// 或者
for (let [key, value] of response.headers.entries()) {
  console.log(`${key} : ${value}`);
}
```

Headers 对象提供了以下方法，用来操作标头。

> - `Headers.get()`：根据指定的键名，返回键值。
> - `Headers.has()`： 返回一个布尔值，表示是否包含某个标头。
> - `Headers.set()`：将指定的键名设置为新的键值，如果该键名不存在则会添加。
> - `Headers.append()`：添加标头。
> - `Headers.delete()`：删除标头。
> - `Headers.keys()`：返回一个遍历器，可以依次遍历所有键名。
> - `Headers.values()`：返回一个遍历器，可以依次遍历所有键值。
> - `Headers.entries()`：返回一个遍历器，可以依次遍历所有键值对（`[key, value]`）。
> - `Headers.forEach()`：依次遍历标头，每个标头都会执行一次参数函数。

上面的有些方法可以修改标头，那是因为继承自 Headers 接口。对于 HTTP 回应来说，修改标头意义不大，况且很多标头是只读的，浏览器不允许修改。

这些方法中，最常用的是`response.headers.get()`，用于读取某个标头的值。

```js
let response =  await  fetch(url);
response.headers.get('Content-Type')
// application/json; charset=utf-8
```

`Headers.keys()`和`Headers.values()`方法用来分别遍历标头的键名和键值。

```js
// 键名
for(let key of myHeaders.keys()) {
  console.log(key);
}

// 键值
for(let value of myHeaders.values()) {
  console.log(value);
}
```

`Headers.forEach()`方法也可以遍历所有的键值和键名。

```js
let response = await fetch(url);
response.headers.forEach(
  (value, key) => console.log(key, ':', value)
);
```

### 5.4 读取内容的方法

`Response`对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

> - `response.text()`：得到文本字符串。
> - `response.json()`：得到 JSON 对象。
> - `response.blob()`：得到二进制 Blob 对象。
> - `response.formData()`：得到 FormData 表单对象。
> - `response.arrayBuffer()`：得到二进制 ArrayBuffer 对象。

上面5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。

**response.text()**

`response.text()`可以用于获取文本数据，比如 HTML 文件。

```js
const response = await fetch('/users.html');
const body = await response.text();
document.body.innerHTML = body
```

**response.json()**

`response.json()`主要用于获取服务器返回的 JSON 数据，前面已经举过例子了。

**response.formData()**

`response.formData()`主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。

**response.blob()**

`response.blob()`用于获取二进制文件。

```js
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```

上面示例读取图片文件`flower.jpg`，显示在网页上。

**response.arrayBuffer()**

`response.arrayBuffer()`主要用于获取流媒体文件。

```js
const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = buffer;
source.connect(audioCtx.destination);
source.loop = true;
```

上面示例是`response.arrayBuffer()`获取音频文件`song.ogg`，然后在线播放的例子。

### 5.5 Response.clone()

Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。

```js
let text =  await response.text();
let json =  await response.json();  // 报错
```

上面示例先使用了`response.text()`，就把 Stream 读完了。后面再调用`response.json()`，就没有内容可读了，所以报错。

Response 对象提供`Response.clone()`方法，创建`Response`对象的副本，实现多次读取。

```js
const response1 = await fetch('flowers.jpg');
const response2 = response1.clone();

const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();

image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);
```

上面示例中，`response.clone()`复制了一份 Response 对象，然后将同一张图片读取了两次。

Response 对象还有一个`Response.redirect()`方法，用于将 Response 结果重定向到指定的 URL。该方法一般只用在 Service Worker 里面，这里就不介绍了。

### 5.6 Response.body 属性

`Response.body`属性是 Response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作。

它可以用来分块读取内容，应用之一就是显示下载的进度。

```js
const response = await fetch('flower.jpg');
const reader = response.body.getReader();

while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

上面示例中，`response.body.getReader()`方法返回一个遍历器。这个遍历器的`read()`方法每次返回一个对象，表示本次读取的内容块。

这个对象的`done`属性是一个布尔值，用来判断有没有读完；`value`属性是一个 arrayBuffer 数组，表示内容块的内容，而`value.length`属性是当前块的大小。

## 06 `fetch()`请求的配置对象

`fetch()`的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

```js
fetch(url, optionObj)
```

上面命令的`optionObj`就是第二个参数。

HTTP 请求的方法、标头、数据体都在这个对象里面设置。下面是一些示例。

**（1）POST 请求**

```js
const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```

上面示例中，配置对象用到了三个属性。

> - `method`：HTTP 请求的方法，`POST`、`DELETE`、`PUT`都在这个属性设置。
> - `headers`：一个对象，用来定制 HTTP 请求的标头。
> - `body`：POST 请求的数据体。

注意，有些标头不能通过`headers`属性设置，比如`Content-Length`、`Cookie`、`Host`等等。它们是由浏览器自动生成，无法修改。

**（2）提交 JSON 数据**

如果是提交json数据时，需要把json转换成字符串。如

```js
fetch(`http://localhost:80/fetch`,{
 method:'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        name: 'qfc',
        age: 18
    }).then(response=>{
  console.log('响应',response)
})
```

**（3）提交表单**

如果提交的是表单数据，使用 formData转化下，如：

```js
body:new FormData(form)
```

上传文件，可以包含在整个表单里一起提交，如：

```js
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```

**（4）文件上传**

如果表单里面有文件选择器，可以用前一个例子的写法，上传的文件包含在整个表单里面，一起提交。

另一种方法是用脚本添加文件，构造出一个表单，进行上传，请看下面的例子。

```js
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```

上传二进制文件时，不用修改标头的`Content-Type`，浏览器会自动设置。

**（5）直接上传二进制数据**

`fetch()`也可以直接上传二进制数据，将 Blob 或 arrayBuffer 数据放在`body`属性里面。

```js
let blob = await new Promise(resolve =>
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```

`fetch()`第二个参数的完整 API 如下：

```js
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors",
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```

`fetch()`请求的底层用的是 [Request() 对象](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request)的接口，参数完全一样，因此上面的 API 也是`Request()`的 API。

这些属性里面，`headers`、`body`、`method`前面已经给过示例了，下面是其他属性的介绍。

**cache**

`cache`属性指定如何处理缓存。可能的取值如下：

- `default`：默认值，先在缓存里面寻找匹配的请求。
- `no-store`：直接请求远程服务器，并且不更新缓存。
- `reload`：直接请求远程服务器，并且更新缓存。
- `no-cache`：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
- `force-cache`：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
- `only-if-cached`：只检查缓存，如果缓存里面不存在，将返回504错误。

**mode**

`mode`属性指定请求的模式。可能的取值如下：

- `cors`：默认值，允许跨源请求。
- `same-origin`：只允许同源请求。
- `no-cors`：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨源的复杂标头，相当于提交表单、`<script>`加载脚本、`<img>`加载图片等传统的跨源请求方法。

**credentials**

`credentials`属性指定是否发送 Cookie。可能的取值如下：

- `same-origin`：默认值，同源请求时发送 Cookie，跨源请求时不发送。
- `include`：不管同源请求，还是跨源请求，一律发送 Cookie。
- `omit`：一律不发送。

跨源请求发送 Cookie，需要将`credentials`属性设为`include`。

```js
fetch('http://another.com', {
  credentials: "include"
});
```

**signal**

`signal`属性指定一个 AbortSignal 实例，用于取消`fetch()`请求，详见下一节。

**keepalive**

`keepalive`属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。

一个典型的场景就是，用户离开网页时，脚本向服务器提交一些用户行为的统计信息。这时，如果不用`keepalive`属性，数据可能无法发送，因为浏览器已经把页面卸载了。

```js
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      some: 'data'
    }),
    keepalive: true
  });
};
```

**redirect**

`redirect`属性指定 HTTP 跳转的处理方法。可能的取值如下：

- `follow`：默认值，`fetch()`跟随 HTTP 跳转。
- `error`：如果发生跳转，`fetch()`就报错。
- `manual`：`fetch()`不跟随 HTTP 跳转，但是`response.url`属性会指向新的 URL，`response.redirected`属性会变为`true`，由开发者自己决定后续如何处理跳转。

**integrity**

`integrity`属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值。

比如，下载文件时，检查文件的 SHA-256 哈希值是否相符，确保没有被篡改。

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

**referrer**

`referrer`属性用于设定`fetch()`请求的`referer`标头。

这个属性可以为任意字符串，也可以设为空字符串（即不发送`referer`标头）。

```js
fetch('/page', {
  referrer: ''
});
```

**referrerPolicy**

`referrerPolicy`属性用于设定`Referer`标头的规则。可能的取值如下：

- `no-referrer-when-downgrade`：默认值，总是发送`Referer`标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
- `no-referrer`：不发送`Referer`标头。
- `origin`：`Referer`标头只包含域名，不包含完整的路径。
- `origin-when-cross-origin`：同源请求`Referer`标头包含完整的路径，跨源请求只包含域名。
- `same-origin`：跨源请求不发送`Referer`，同源请求发送。
- `strict-origin`：`Referer`标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送`Referer`标头。
- `strict-origin-when-cross-origin`：同源请求时`Referer`标头包含完整路径，跨源请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
- `unsafe-url`：不管什么情况，总是发送`Referer`标头。

## 07 取消`fetch()`请求（请求中断）

`fetch()`请求发送以后，如果中途想要取消，需要使用`AbortController`对象。

```js
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消
console.log(signal.aborted); // true
```

上面示例中，首先新建 AbortController 实例，然后发送`fetch()`请求，配置对象的`signal`属性必须指定接收 AbortController 实例发送的信号`controller.signal`。

`controller.abort()`方法用于发出取消信号。这时会触发`abort`事件，这个事件可以监听，也可以通过`controller.signal.aborted`属性判断取消信号是否已经发出。

下面是一个1秒后自动取消请求的例子。

```js
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/long-operation', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') {
    console.log('Aborted!');
  } else {
    throw err;
  }
}
```

**fetch**

```js
const btn = document.getElementById("btn")
const btn2 = document.getElementById("btn02")
const root = document.getElementById("root")
btn2.onclick = () => {
    fetch("http://localhost:3000/students", {
        method: "post",

        headers:{
            // application/x-www-form-urlencoded
            "Content-type":"application/json"
        },

        // 通过body去发送数据时，必须通过请求头来指定数据的类型
        body: JSON.stringify({
            name: "白骨精",
            age: 16,
            gender: "女",
            address: "白骨洞"
        })
    })
}

btn.onclick = () => {
    /* 
        fetch
            - fetch是xhr的升级版，采用的是Promise API
            - 作用和AJAX是一样的，但是使用起来更加友好
            - fetch原生js就支持的一种ajax请求的方式
    */

    fetch("http://localhost:3000/students")
        .then((res) => {
            if(res.status === 200){
                // res.json() 可以用来读取json格式的数据
                return res.json()
            }else{
                throw new Error("加载失败！")
            }
        })
        .then(res => {
            // 获取到数据后，将数据渲染到页面中
            if(res.status === "ok"){
                // 创建一个table
                const table = document.createElement("table")
                root.appendChild(table)
                table.insertAdjacentHTML("beforeend", "<caption>学生列表</caption>")
                table.insertAdjacentHTML("beforeend", `
                    <thead>
                        <tr>
                            <th>学号</th>    
                            <th>姓名</th>    
                            <th>年龄</th>    
                            <th>性别</th>    
                            <th>地址</th>    
                        </tr> 
                    </thead>
                `)

                const tbody = document.createElement("tbody")
                table.appendChild(tbody)

                // 遍历数据
                for(let stu of res.data){
                    tbody.insertAdjacentHTML("beforeend", `
                        <tr>
                            <td>${stu.id}</td>    
                            <td>${stu.name}</td>    
                            <td>${stu.age}</td>    
                            <td>${stu.gender}</td>    
                            <td>${stu.address}</td>    
                        </tr>
                    `)
                }
            }
        })
        .catch((err) => {
            console.log("出错了！", err)
        })
}
```

**登录功能**

```js
// 定义一个登录的路由
app.post("/login", (req, res) => {
    // 获取用户输入的用户名和密码
    const { username, password } = req.body
    // 验证用户名和密码
    if (username === "admin" && password === "123123") {
        // 登录成功
        res.send({
            status: "ok",
            data: { id: "12345", username: "admin", nickname: "超级管理员" }
        })
    } else {
        // 登录失败
        res.status(403).send({
            status: "error",
            data: "用户名或密码错误"
        })
    }
})
```

```js
<body>
    <div id="root">
        <h1>请登录以后再做操作</h1>
        <h2 id="info"></h2>
        <form>
            <div>
                <input id="username" type="text" />
            </div>
            <div>
                <input id="password" type="password" />
            </div>
            <div>
                <button id="login-btn" type="button">登录</button>
            </div>
        </form>
    </div>

    <script>
        // 点击login-btn后实现登录功能
        const loginBtn = document.getElementById("login-btn")
        const root = document.getElementById("root")
        loginBtn.onclick = () => {
            // 获取用户输入的用户名和密码
            const username = document
                .getElementById("username")
                .value.trim()  //去除前后空格
            const password = document
                .getElementById("password")
                .value.trim()

            // 调用fetch发送请求来完成登录
            fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
                .then((res) => res.json())
                .then((res) => {

                    if(res.status !== "ok"){
                        throw new Error("用户名或密码错误")
                    }

                    // console.log(res)
                    // 登录成功
                    root.innerHTML = `
                        <h1>欢迎 ${res.data.nickname} 回来！</h1>
                        <hr>
                        <button id="load-btn">加载数据</button>
                    `
                })
                .catch((err) => {
                    console.log("出错了！", err)
                    // 这里是登录失败
                    document.getElementById("info").innerText = "用户名或密码错误"
                })
        }
    </script>
</body>            
```

# d6 本地存储

## 01 本地存储

所谓的本地存储就是指浏览器自身的存储空间，可以将用户的数据存储到浏览器内部

- sessionStorage 中存储的数据 页面一关闭就会丢失
- localStorage 存储的时间比较长

```js
<script>
    btn01.onclick = () => {
        // console.log(sessionStorage)
    
        // setItem() 用来存储数据
        // getItem() 用来获取数据
        // removeItem() 删除数据
        // clear() 清空数据
        // sessionStorage.setItem("name", "孙悟空")
        // sessionStorage.setItem("age", "18")
        // sessionStorage.setItem("gender", "男")
        // sessionStorage.setItem("address", "花果山")

        localStorage.setItem("name", "孙悟空")
        localStorage.setItem("age", "18")
        localStorage.setItem("gender", "男")
        localStorage.setItem("address", "花果山")
    }

    btn02.onclick = () => {
        // const name = sessionStorage.getItem("name")
        // console.log(name)
        // sessionStorage.removeItem("name")

        sessionStorage.clear()
    }
</script>
```

```js
/* 
问题：
- 现在是登录以后直接将用户信息存储到了localStorage
- 主要存在两个问题：
1.数据安全问题
2.服务器不知道你有没有登录
*/

// 点击login-btn后实现登录功能
const loginBtn = document.getElementById("login-btn")
const root = document.getElementById("root")

function loadData() {
	fetch("http://localhost:3000/students")
		.then((res) => {
	if (res.status === 200) {
	// res.json() 可以用来读取json格式的数据
	return res.json()
	} else {
			throw new Error("加载失败！")
	}
})
.then((res) => {
// 获取到数据后，将数据渲染到页面中
if (res.status === "ok") {
	// 创建一个table
	const dataDiv = document.getElementById("data")
	const table = document.createElement("table")
	dataDiv.appendChild(table)
	table.insertAdjacentHTML(
			"beforeend",
			"<caption>学生列表</caption>"
							)
	table.insertAdjacentHTML(
			"beforeend",
                `
                <thead>
                <tr>
                <th>学号</th>    
                <th>姓名</th>    
                <th>年龄</th>    
                <th>性别</th>    
                <th>地址</th>    
                </tr> 
                </thead>
                `
		)

const tbody = document.createElement("tbody")
table.appendChild(tbody)

// 遍历数据
for (let stu of res.data) {
tbody.insertAdjacentHTML(
    "beforeend",
    `
    <tr>
    <td>${stu.id}</td>    
    <td>${stu.name}</td>    
    <td>${stu.age}</td>    
    <td>${stu.gender}</td>    
    <td>${stu.address}</td>    
    </tr>
    `
    )
    }
    }
    })
    .catch((err) => {
    console.log("出错了！", err)
    })
    }

// 判断用户是否登录
if (localStorage.getItem("nickname")) {
// 用户已经登录
// 登录成功
root.innerHTML = `
    <h1>欢迎 ${localStorage.getItem(
    "nickname"
    )} 回来！</h1>
    <hr>
    <button id="load-btn" onclick="loadData()">加载数据</button>
    <hr>
    <div id="data"></div>
    `
    } else {
    loginBtn.onclick = () => {
// 获取用户输入的用户名和密码
const username = document
.getElementById("username")
.value.trim()
const password = document
.getElementById("password")
.value.trim()

// 调用fetch发送请求来完成登录
fetch("http://localhost:3000/login", {
method: "POST",
headers: {
"Content-type": "application/json"
},
body: JSON.stringify({ username, password })
})
.then((res) => res.json())
.then((res) => {
if (res.status !== "ok") {
throw new Error("用户名或密码错误")
}

// 登录成功以后，需要保持用户的登录的状态，需要将用户的信息存储到某个地方
// 需要将用户信息存储到本地存储
/* 
所谓的本地存储就是指浏览器自身的存储空间，
可以将用户的数据存储到浏览器内部
sessionStorage 中存储的数据 页面一关闭就会丢失
localStorage 存储的时间比较长
*/

// console.log(res)
// 登录成功，向本地存储中插入用户的信息
localStorage.setItem("username", res.data.username)
localStorage.setItem("userId", res.data.id)
localStorage.setItem("nickname", res.data.nickname)

// 登录成功
root.innerHTML = `
	<h1>欢迎 ${res.data.nickname} 回来！</h1>
	<hr>
	<button id="load-btn" onclick="loadData()">加载数据</button>
	<hr>
	<div id="data"></div>
`
})
.catch((err) => {
console.log("出错了！", err)
// 这里是登录失败
document.getElementById("info").innerText =
"用户名或密码错误"
})
}
}
</script>
</body>
```

## 02 token

问题：

现在是登录以后直接将用户信息存储到了localStorage

1. 数据安全问题
2. 服务器不知道你有没有登录

解决问题：如何告诉服务器客户端的登录状态

- rest风格的服务器是无状态的服务器，所以注意不要在服务器中存储用户的数据

- 服务器中不能存储用户信息，可以将用户信息发送给客户端保存

​			比如：{id:"xxx", username:"xxx", email:"xxx"}

​			客户端每次访问服务器时，直接将用户信息发回，服务器就可以根据用户信息来识别用户的身份

- 但是如果将数据直接发送给客户端同样会有数据安全的问题，所以我们必须对数据进行加密，加密以后在发送给客户端保存，这样即可避免数据的泄露

- 在node中可以直接使用jsonwebtoken这个包来对数据进行加密

  jsonwebtoken（jwt） --> 通过对json加密后，生成一个web中使用的令牌

> 使用步骤：
>
> 1. 安装
>
>    yarn add jsonwebtoken
>
> 2. 引入
>
> 3. .... 

```js
// 引入jwt
const jwt = require("jsonwebtoken")

// 创建一个对象
const obj = {
    name: "swk",
    age: 18,
    gender: "男"
}

// 使用jwt来对json数据进行加密
const token = jwt.sign(obj, "hellohellohowyou", {
    expiresIn: "1"
})
try {
    //服务器收到客户端的token后
    const decodeData = jwt.verify(token, "hellohellohowyou")

    console.log(decodeData)
} catch (e) {
    // 说明token解码失败，说明token
    console.log("无效的token")
}
```

```js
// 引入jwt
const jwt = require("jsonwebtoken")
...
// 设置响应头
res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization")

// 定义一个登录的路由
app.post("/login", (req, res) => {
    // 获取用户输入的用户名和密码
    const { username, password } = req.body
    // 验证用户名和密码
    if (username === "admin" && password === "123123") {
        // 登录成功，生成token
        const token = jwt.sign(
            {
                id: "12345",
                username: "admin",
                nickname: "超级管理员"
            },
            "chaojianquanmima", //开发时会存在配置文件 随机生成
            {
                expiresIn: "1d"  //过期时间
            }
        )

        // 登录成功
        res.send({
            status: "ok",
            data: {
                token,
                nickname: "超级管理员"
            }
        })
    } else {
        // 登录失败
        res.status(403).send({
            status: "error",
            data: "用户名或密码错误"
        })
    }
})

// 统一的api
// 定义学生信息的路由
app.get("/students", (req, res) => {
    try {
        // 这个路由必须在用户登录后才能访问
        // 需要检查用户是否登录
        // 读取请求头
        const token = req.get("Authorization").split(" ")[1]

        // 对token进行解码
        const decodeToken = jwt.verify(token, "chaojianquanmima")
        console.log(decodeToken)
        // 解码成功，token有效
        // 返回学生信息
        res.send({
            status: "ok",
            data: STU_ARR
        })
    } catch (e) {
        // 解码错误，用户token无效
        res.status(403).send({
            status: "error",
            data: "token无效"
        })
    }
})

```

```js
function loadData() {
    // 当我们访问的是需要权限的api时，必须在请求中附加权限的信息
    // token一般都是通过请求头来发送
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/students", {
        headers:{
            // "Bearer xxxxxx"
            "Authorization":`Bearer ${token}`
        }
    })
        ...
// 判断用户是否登录
if (localStorage.getItem("token")) {
            } else {
                }
```

```js
<body>
    <button id="btn01">点我一下</button>

    <button id="btn02">取消</button>
    <button id="btn03">按钮3号</button>
    <script>
        // 获取按钮
        const btn01 = document.getElementById("btn01")
        const btn02 = document.getElementById("btn02")
        const btn03 = document.getElementById("btn03")

        let controller

        btn01.onclick = () => {
            // 创建一个AbortController
            controller = new AbortController()
            // setTimeout(()=>{
            //     controller.abort()
            // }, 3000)

            // 终止请求
            // 点击按钮向test发送请求
            fetch("http://localhost:3000/test", {
                signal: controller.signal
            })
                .then((res) => console.log(res))
                .catch((err) => console.log("出错了", err))
        }

        btn02.onclick = () => {
            controller && controller.abort()
        }

        btn03.onclick = async () => {
            // fetch("http://localhost:3000/test").then()...
            // 注意：将promise改写为await时，一定要写try-catch

            try {
                const res = await fetch("http://localhost:3000/students")
                const data = await res.json()
                console.log(data)
            } catch (e) {
                console.log("出错了", e)
            }
        }
    </script>
</body>
```
