# 编写可维护的JavaScript读书笔记

## 1. 编程风格

- 团队协作应尽早统一编程风格，包括：编程最佳实践，文件，目录规划以及注释等。
- 优势：
  > 1. 对于代码，降低代码理解成本
  > 2. 看到与众不同的代码时，易识别问题代码发现错误 

### 1.1 第一章：基本的格式化
1. 缩进层级

    > 使用缩进（清晰易读，易理解）
    ```
        if (a) {
            // ...
            // ...
            if (b) {
                // ...
            }
        }
    ```

    > 未使用缩进(不易读)
    ```
        if (a) {
                // ...
            // ...
                if (b) {
                    // ...
            }
        }
    ```
    > 如何缩进
    - 制表符缩进
        - 说明：一个层级对应一个tab制表符（通常一个制表符等于4字符）
        - 优点：1. tab数与层级数一一对应。 2. 制表符展现长度可配置
        - 缺点：不同系统对制表符的解释不一致
    - 空格缩进
        - 说明：2或4或8个空格表示一个层级缩进
        - 优点：所有系统和编辑器中，文件展现一致，可配置tab与空格数的对应关系 
        - 缺点： 编辑器需要配置空格缩进


2. 语句结尾
    - js代码书写时推荐使用 ' ; ' 结尾，虽然分析器会自动为我们插入分号
    > ASI机制
    自动分号插入
    - 英文名：Automatic Semicolon Insertion, ASI 
    - 解释：自动寻找代码中应该使用分号，实际未使用的地方进行分号插入
    - 缺点： 大多数情况ok, 但是少数情况会出问题
    - 举个例子：
        ```
        // 原始代码
        function getData() {
            return
            {
                name: 'xiaoming'
            }
        }

        // ASI机制进行处理后，会导致返回undefined
        function getData() {
            return; // 添加了分号,函数执行到这里直接返回
            {
                name: 'xiaoming'
            }; // 添加了分号
        }

        ```
        解决办法为：
        ```
        // 移动花括号到return 后面
        function getData() {
            return {
                name: 'xiaoming'
            }
        }
        ```

3. 行的长度
- 旧编辑器单行最长80字符限制，超过会换行或隐藏，jscrockford规范中规定80字符

4. 换行
    - 换行需要缩进，运算符作为前一行行尾
    - 举例：
        > 
        ```
        // 对于7来说，7前面逗号是运算符，放在上一行
        callFunction (1, 2, 3, 4, 5, 6, 
            7);

        // if条件举例
        if (a === 1 && b === 2 &&
            c === 3);

        // 变量赋值时保持对齐(a和d对齐)
        let res = a + b + c +
                  d + e; 
        ```

5. 空行

   - 添加空行位置，增加可读性
    > - 方法之间
    > - 局部变量和第一条语句之间
    > - 多行和单行注释之前
    > - 方法内逻辑片段之间



6. 命名
   - 6.1 变量和函数
       - 变量使用名词前缀，方法使用动词前缀 
       - 小驼峰命名：针对变量和函数名
            > let testName = 'xiaoming'
       - 前缀举例 
            - can | 函数返回一个布尔值
            - has | 函数返回一个布尔值
            - is | 函数返回一个布尔值
            - get | 函数返回一个非布尔值
            - set | 函数用于保存一个值值
   - 6.2 常量
     - 不变的常量，大写字母加下划线
     - > 举例
         ```
         // 直观看出count是变量，MAX_COUNT是常量
         if (count < MAX_COUNT>) {
             doSomething();
         }

         ```   
   - 6.3 构造函数
        - 构造函数使用大驼峰命名
        > 举例
        ```
        let me = new Person('xiaoming')
        ``` 

7. 直接量

    原始值：string+number+boolean+null+undefined

- 7.1 字符串
    - 使用单引号，双引号都可，代码风格保持一致，双引号内部嵌套双引号需要对内部双引号转义
    - 多行字符后串使用 + 操作符链接
- 7.2 数字
    - 整数 + 浮点数（小数点前后数字不省略）禁止8进制直接量
- 7.3 null
    - 初始化一个变量，可能赋值为对象
    - 函数的参数或返回值是对象时，可以使用null
    - 函数的参数或返回值是对象时，可以使用null
    - null可理解为对象占位符
    > 代码举例
    ```
    let peroson = null;

    function getPerson() {
        if (condition) {
            return new Person('xiaoming');
        }
        return null;
    }

    let person = getPerson();
    if (person !== null) {
        doSomething();
    }
    ``` 
- 7.4 undefined
    - 变量以生声明但是还未赋值
    > 代码举例
    ```
    let peroson;
    console.log(typeof person) // undefined
    ```  
- 7.5 对象直接量
    - 创建对象直接使用直接量
    > 代码举例
    ```
    let book = {
        title: 'i am a book',
        author: 'markTown'
    }
    ```  
- 7.6 数组直接量
    - 创建数组对象也直接使用直接量
    > 代码举例
    ```
    let arr = ['1', '2', '3']
    ``` 
### 1.2 第二章：注释
    1.2.1 单行注释 //
> 示例
>
```
// 这是一个条件注释说明
if (condition) {

    // 注易缩进，而且这里注释前空了一行 
    doSomething();
}
```
    1.2.2 多行注释，前后留空行 /* ... */
> 示例
```

/*
 * 第一行注释说明
 * 第二行注释说明
 * 第三行注释说明
 */

```
    1.2.3 使用注释
- 代码清晰时无需注释
- 文档注释
    ```
    // 举个例子

    /**
     只是一个文档注释的例子，这个是一些说明
     @method merge
     @param {Object} 被合并的一个或多个对象 
     @return {Object} 一个新的合并后的对象
     **/

    ```

### 1.3 第三章：语句和表达式
if 语句的书写（类似的还有 for, while, do while, try catch）
- 举个例子
```
if (condition) {
    doSomthing();
}
```
- 上面需要注意的是花括号的换行，同时if条件不写在一行，内部语句块合理空行，括号左右留有一空格

switch 语句的书写
- 举个例子
```
switch (condition) {
    case 'first':
        // code
        break;
    case 'second':
        // code
        break;
    case 'first':
        // code
        break;
    default:
        // code
}
```
switch 语句连续执行，共用条件,添加必要注释
- 举个例子，条件为first,second，都执行code1
```
switch (condition) {
    case 'first':
    case 'second':
        // code1
        break;
    case 'first':
        // code2
        break;
    default: // 没有默认行为且写了注释，此处可省略
        // code3
}
```

- for循环
  > 传统for循环用于遍历数组成员，for-in用于遍历对象属性
  - 两种方法可以改变循环执行流程
    - return 或 throw
    - break continue(一般可用if条件代替)

- for in循环举例
    ```
    for (key in myObject) {
        if (myObject.hasOwnProperty(key)) { // 排除原型上链的属性
            // doSomething
        }
    }
    ```
### 1.4 第四章：变量函数运算符
 - 变量声明
    - 函数内部任意位置定义的变量和在函数顶部定义的变量等效，因为存在变量提升，于是推荐用以把变量声明放在函数顶部
        > 举个例子
        ```
        function test () {

            // 多个变量合并一起声明，注意换行以及变量的对齐
            let i,
                j,
                testValue;

            // other code
        }
        ```
 - 函数声明
    - 与变量一样，也存在变量提升，推荐先声明后使用
        > 举个例子
        ```
        function test () {

            // 多个变量合并一起声明，注意换行以及变量的对齐
            let i,
                j,
                testValue;

            // other code
        }
        ```
    - 立即执行函数
        > 举个例子
        ```
        let value = (function () {
            
            // 函数体
            
            return {
                msh: 'hi'
            }
        } ())
        ```
 - 严格模式
   - 指令脚本： 
        ```
        "use strict" // 一般局部使用，比如函数体内
        ```
        > 举例
        ```
        function test () {
            "use strict";

            // code
        }
        ```
 - 相等的比较(总是推荐 === 与 ！==)
   - 强制类型转换会驱使某种类型变量自动转换成其他不同类型的变量 
        ```
        // number与string
        console.log( 5 == '5') // true

        // 使用 ===
        console.log( 5 === '5') // false

        console.log( null == undefined) // true
        ```

   - 对象与非对象比较 
       - 首先调用对象的valueOf(),咩有则调用toString()得到原始类型在进行比较
 - eval
   - 参数为字符串，当作代码执行，用于加载执行外部代码
        ```
        eval("alert('hi')")
        ```
   - setTimeout,setInterval,Function构造函数也可以，不推荐使用
 - 原始包装类型
   - 让原始值具有对象般的行为
   - 3个：String,Boolean,Number
        ```
        let name = "xiaoming";
        console.log(name.toUpperCase()) // 引擎创建对象，使用后就销毁
        ```
   - setTimeout,setInterval,Function构造函数也可以，不推荐使用

## 2. 编程实践
代码风格规范的目的是解决多人工作模式下代码的一致性，松耦合增加分层合理性和消除依赖性
### 2.1 UI层的松耦合
- 用户界面的定义
    - HTML定义页面
    - CSS添加页面样式
    - js添加页面行为
- 松耦合说明
    - 修改一个组件而不需要修改其他组件时就做到了松耦合
- 松耦合说优势
    - 可维护
    - 容易定位问题所在
    - 容易调试
- js从css中抽离
    - 避免在css中使用expression函数，表达式
- js从html中抽离
    - 比如给一个按钮绑定事件
        ```
        <button onclick="doSomething()" id="action-btn">Click</button>
        ```
        有可能用户点击时函数并不存在，会没有响应或报错
    - 解决方案(js从html中抽离)
        ```
        function doSomething() {} // 函数定义

        // 获取按钮DOM
        let btn = document.getElementById('action-btn');
        btn.addEventListener('click', doSomething, false);

        ``` 
    - 事件绑定补充-兼容方法封装
        ```
        function bindEvent(target, type, handler) {
            if (target.addEventListener) {
                target.addEventListener(type, handler, false)
            } else if (target.attachEvent) {
                target.attachEvent('on' + type, handler)
            } else {
                target['on' + type] = handler;
            }
        }

        ``` 
- 调试技巧
    - 最笨的办法，一行一行注释掉代码，css问题也许会出现在js代码中
    - 一般js需要操作css时，使用类名,他是css与js通信的桥梁，保证松耦合
        > 代码
            ```
            // 原生方法：添加一个css类
            element.className += 'class1'

            // html5方法
            element.classList.add('class1')

            // JQ方法
            $(element).addClass('class1')
            ``` 
### 2.2 避免使用全局变量
- 任何在全局作用域中声明的变量都是window对象（Global Object）的属性
    > 代码举例
    ```
    var color = 'red';
    function test() {}

    console.log(color === window.color) // true
    console.log(test === window.test) // true
    ``` 
- 全局变量带来的问题
  - 命名冲突
  - 难以测试
- 问题解决方案
    - 避免函数内部引用外部自定义变量（消除依赖）
    - 全局变量定义不要使用常规单词，添加限定符，避免冲突
- 意外的全局变量
    ```
    function test() {
        var count = 10; // 注意这里加了分号
            name = "这里会变成全局变量"; // 同时name是window的一个默认属性，这里会修改，成为隐患 
    }
    ``` 
    - 全局变量定义不要使用常规单词，添加限定符，避免冲突
- 建议：避免使用全局变量

### 2.3 命名空间
> 代码举例，可以往命名空间挂属性
```
let myBooks = {};

myBooks.book1 = {}; // book1的命名空间

myBooks.book2 = {}; // book的命名空间
```
> 还可以通过模块的方式实现命名空间AMD,CommonJS
 - 零全局变量 
 > 使用一个立即执行函数调用，并在内部使用严格模式避免创建全局变量
 ```
 // 适用于脚本短，不需要和其它代码交互
 (function (win) {
     "use strict";
     var doc = win.document;

     // other code
 } (window));
 ``` 

### 2.4 事件处理
- 规则1： 隔离应用逻辑
- 规则2： 不要分发事件对象
- 规则3： 不要分发事件对象
    > 点击弹框代码分析说明
    ```
    // bad 应用逻辑(弹框)和事件处理（点击）耦合在一起，
    function handleClick(event) {
        let popup = document.getElementById('popup');
        popup.style.left = event.clientX + 'px';
        popup.style.top = event.clientY + 'px';
        popup.className = 'reveal';
    }
    ```

    > 拆分用用逻辑
    ```    
    let myApplication = {
        handleClick: function (event) { // 处理点击
            this.showPopup(event); // 调用抽离的弹框函数
        },

        showPopup: function () { // 处理弹框
            let popup = document.getElementById('popup');
            popup.style.left = event.clientX + 'px';
            popup.style.top = event.clientY + 'px';
            popup.className = 'reveal';  
        }
    }

    // 给需要弹框的dom绑定事件
    addEventListener(element, 'click', function (event) {
        myApplication.handleClick(event);
    })
    ```

    > 不要分发事件对象
    ```    
    let myApplication = {
        handleClick: function (event) { // 处理点击

            // 阻止默认事件以及冒泡
            event.preventDefault();
            event.stopPropagation();

            this.showPopup(event.clientX, event.clientY); // 调用抽离的弹框函数
        },

        showPopup: function (x, y) { // 处理弹框传入必要参数即可
            let popup = document.getElementById('popup');
            popup.style.left = x + 'px';
            popup.style.top = y + 'px';
            popup.className = 'reveal';  
        }
    }

    // 给需要弹框的dom绑定事件
    addEventListener(element, 'click', function (event) {
        myApplication.handleClick(event);
    })
    ```
### 2.5 避免"空比较"
- 检测原始值
  - 如果希望某一个值是原始值：字符串、数字、布尔、null、undefined,最佳选择是使用typeof返回类型字符串
  > 代码举例
  ```
  typeof 1; // number
  typeof "1"; // string
  typeof true; // boolean
  typeof undefined; // undefined

  // 检测null直接使用 === 或 !==
  // 检测数组使用 Array.isArray()
  ``` 
- instance检测对象
  - instanceof会检测构造器的实例不是则在原型链上继续查找，并非最佳
  - 检测方法
  ```
  function test() {};

  console.log(typeof test === 'function' ); // true
  ```    
  - 检测数组
  ```
    function isArray(value) {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(value);
        } else {
            return Object.prototype.toString.call(value) === '[object Array]';
        }

    };
  ```    
  - 对象属性检测
  ```
    let obj = {
        count: 0,
        name: '123'
    }

    // 判断对象或其原型对象上是否拥有某个属性值
    if ('count' in obj) { 

        // code
    }

    // 判断对象自身是否拥有某个属性值
    if (obj.hasOwnProperty('count')) { 

        // code
    }
  ```    
### 2.6 第9章 将配置从代码中分离出来
- 配置数据举例
    > 1. URL
    2. 需要展现给用户的字符串
    3. 重复的值
    4. 设置项，配置项
    5. 任何可能发生变更的值

### 2.7 第10章 抛出自定义错误
- 为什么要抛出错误
  -  把代码执行失败的地方暴露出来，便于定位解决
- 如何抛出
  -  throw new Error('错误信息')
  -  如果没有通过try catch捕获的话浏览器通常直接显示错误字符串
  -  try catch如果try中包含了return ，需要等finally执行完毕之后才能返回
  -  7中错误类型：
     - Error 基本错误类型
     - EvalError 执行eval()函数报错
     - RangeError 数字超过边界
     - RefrenceError 期望对象不存在，null上调用其函数
     - SyntaxError 语法错误
     - TypeError 变量不是期望类型
     - URIError EncodeURL()等函数传递的参数是非法的URI字符串时抛出错误
     - Error 基本错误类型
- 自定义错误
    - 代码示例
        ```
        function MyError (msg) {
            this.message = msg
        };

        MyError.prototype = new Error();
        
        ``` 
### 2.7 第11章 不是你的对象不要动
- 如果你的代码没有创建以下对象，请勿修改
  - 原生对象（Object,Array等） 
  - Dom对象（比如document） 
  - Bom浏览器对象模型（比如window） 
  - 类库对象
> 原则：不覆盖、不新增方法、不删除方法
- 不覆盖
```
// 不好的写法：把方法覆盖掉
document.getElementById = function () {
    return null;
}
```    
- 不新增方法
```
// 不好的写法：在DOM对象上增加方法
document.sayHi = function () {
    alert('hi');
}
```    
- 不删除方法（覆盖也算, 或使用delete删除定义在对象上的方法[无法删除原生性上的]）
```
// 不好的写法， getElementById是原型上的方法，无法delete删除，可通过null赋值阻止调用
document.getElementById = null;

// delete删除
let myObj = {
    sayHi: function () {
        alert('hi');
    }
};
delete myObj.sayHi;
``` 
    - 如果团队的某一个方法不使用，不应删除，可能会导致运行时错误，应该标识为废弃
> 对象扩展（最受欢迎的对象扩充形式是继承）
- 基于对象的继承
    ```
    // 创建一个对象
    let person = {
        name: 'xiaoming',
        sayHi: function () {
            alert('hi ' + name);
        }
    }

    // 继承，基于person创建一个对象
    let myPerson = Object.create(person);
    myPerson.sayHi(); // hi xiaoming

    // 指定第二个参数，添加到新建的对象中
    let myPersonNew = Object.create(person, {
        name: {
            value: '123'
        }
    });
    myPersonNew.sayHi(); // hi 123
    ```
- 基于类型的继承
    - 原生类型继承
    ```
        function MyError(msg) {
            this.message = msg;
        }

        MyError.prototype = new Error();
    ``` 
    - 开发者自定义了构造函数的继承
    ```
        function Person(name) { // 构造函数首字母大写
            this.name = name;
        }

        function Author(name) { // 想让Author继承Person
            Person.call(this, name)
        }

        Author.prototype = new Person();
    ``` 
    分析：Author继承自Person,name由Person管理，于是继续使用Person构造函数定义name,Person实在this上执行的（this指向Author）所以最后name被定义在了Author上.
- 门面模式
    > 门面模式创建新的接口，实现特定的接口；适配器模式实现已经存在的接口
    ```
    function DomWrapper(element) {
        this.element = element;
    }

    // 添加一个添加类名的操作接口方法
    DomWrapper.prototype.addClass = function (className) {
        element.className += ' ' + className;
    }

    // 添加一个移除元素的操作接口方法
    DomWrapper.prototype.remove = function () {
        this.element.parentNode.removeChild(this.element);
    }

    // 调用
    let wrapper = new DomWrapper(documenet.getElementById('div'));
    wrapper.addClass('selected');
    wrapper.remove()
    ``` 
- 关于Polyfill
    > 一个polyfill是指一种功能的模拟，这些功能已经在新版本的浏览器中已经有完备定义且原生实现，目的是让老版本浏览器如同新版本一样正常使用该功能。
    - 阻止修改
        - ES5引入几个方法防止对对象的修改,对象一旦锁定，无法解锁，使用严格模式
          - > 防止扩展
            - 禁止添加，但已存在的属性方法可以修改，删除 
            ```
                // 锁定对象防止被扩展
                let person = {
                    name: 'sxf'
                };

                Object.preventExtension(person);// 锁定对象
                console.log(Object.isExtensible(person)); // false
                person.age = 25; // 悄悄失败，strict模式下会抛出错误
            ``` 
          - > 密封
            - 禁止删除对象已经存在的属性和方法
            ```
                // 密封对象防止已存在的属性方法被删除,也不可扩展
                Object.seal(person);// 密封对象
                console.log(Object.isExtensible(person)); // false
                console.log(Object.isSealed(person)); // true
                person.age = 25; // 悄悄失败，strict模式下会抛出错误
            ```  
          - > 冻结 
            - 禁止修改已经存在的属性和方法
            ```
                // 冻结对象防止已存在的属性方法被修改,也不可扩展
                Object.freeze(person);// 冻结对象
                console.log(Object.isFrozen(person)); // true
                console.log(Object.isSealed(person)); // true
                console.log(Object.isExtensible(person)); // false 不可扩展
                person.age = 25; // 悄悄失败，strict模式下会抛出错误
                delete person.name = 25; // 悄悄失败，strict模式下会抛出错误
            ```
### 2.8 第12章 浏览器嗅探
- User-Agent检测：根据该字符串确定浏览器类型
    > 网景浏览器
    - 在'Mozilla/2.0 (Win95; I)'中查找'Mozilla'和版本号字符串
    > IE浏览器
    - 在'Mozilla/2.0 (compatible; MISE 3.0; windows 95)'中查找'Mozilla'和版本号字符串
    ```
        // IE 8 以及之前的版本的user-agent字符串不变化，可以与新版本的分开处理
        if (isIE8OrEarlier) {
            // 处理IE 8以及之前的版本
        } else {
            // 处理其他浏览器
        }

        // 检测IE 代码
        if (navigator.userAgent.indexOf('MISE') > -1) {
            // 是IE
        } else {
            // 非IE
        }
    ``` 
- 特性检测：对特定的功能(函数)进行存在性检测
    ```
        // 根据id获取Dom
        function getById(id) {
            let element = null;

            if (document.getElementById) { // DOM标准方法
                element = document.getElementById(id);
            } else if (document.all) { // IE
                element = document.all[id];
            } else if (document.layers) { // Netscape <= 4
                element = document.layers[id];
            }

            return element;
        }
    ```
  > 重要组成部分 
    - 探测标准方法
    - 探测不同浏览器的特定方法
    - 都不存在时提供一个备用方法
- 避免特性推断和浏览器推断(敲黑板：汽车有4轮，但不能说4轮的就是汽车)
 
## 3. 自动化
> 利弊分析-优势
- 本地代码任意组织，无需和线上保持一致 
- 静态分析可自动发现错误 
- 构建之前可以进行文件连接压缩等处理 
- 自动化测试易于发现问题 
- 方便地部署到生产环境 
- 轻松快速执行常见任务
> 弊端
- 开发环境修改后需要本地构建
- 线上BUG比较难定位
- 技术水平低会遇到较多问题

总结： 利大于弊 


### 3.1 第13章 文件和目录结构
> 最佳实践总结
- 一个文件只包含一个对象
  - 让不同人维护各自不同的文件，避免多人维护一个文件
- 相关的文件使用目录分组
- 保持第三方代码独立
  - 类库代码 
- 确定创建位置
    - 代码构建输出位置不要放在源码目录，放在独立的目录
- 保持测试代码的完整性
    - 测试代码放到显眼的地方，方便测试人员排查测试场景遗漏情况
### 3.2 第14章 ant
> Ant构建三部曲
- 任务
    - 构建过程中的一个步骤，比如执行一个程序或赋值一个文件
- 目标
  - 一组有序任务的集合  
- 项目
    - 所有目标的容器
> build.xml配置文件
```
<project name="maintainblejs" default="hello">
    <target name="hello">
        <echo>hello world</echo>
    </target>
</project>
``` 

分析：project代表整个项目，name必须有，用于标识此项目，target表示目标， echo用于回显任务

关系： 一个项目可对应多个目标，一个目标可对应多个任务

> 构建
项目目录下运行命令行
```
ant // 读取project的default选择目标
``` 
```
ant hello // 显式指定运行的目标
``` 

> 目标操作的依赖将会被首先执行,使用depends指定
```
<project name="maintainblejs" default="hello">

    <target name="hello">
        <echo>hello world</echo>
    </target>

    <target name="goodbye" depends="hello">
        <echo>good bye</echo>
    </target>
</project>
```
> 属性,${version} 使用
```
the version is ${version}
```
```
<project name="maintainblejs" default="hello">
    <property name="version" value="0.1.1"></property>
</project>
```
> 外部文件导入属性
- build.properties 
```
version=1.0
copyright="123"
```

- build.xml中使用properties元素加载属性定义文件
```
<project name="maintainblejs" default="hello">

    <loadproperties srcfile="build.properties" value="0.1.1"></loadproperties>
    <target name="version">
        <echo>Version is ${version}</echo>
    </target>
</project>
```

> buildr项目
- Buildr是一个寻找和收集前端相关且语法简单的Ant任务的开源项目 
- 使用之前需要拥有一份源码 
- 然后使用命令导入所有任务
    ```
    <import file="/path/to/buildr/buildr.xml" />
    ```  
### 3.3 ---
### 3.4 ---
