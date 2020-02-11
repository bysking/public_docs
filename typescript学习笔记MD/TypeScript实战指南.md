## <<TypeScript实战指南>> 笔记

### 前言

- 为什么要学ts?
    - 效率提升：更快理清参数以及函数之间的关系，无需debugger逐层观察值的变化
    - 支持接口定义：清晰定义模块之间的边界
    - Self-ducumenting: 代码自我说明(ts拥有强制类型表达，函数定义时，入参和返回值必须标注好),无需依赖文档
- ts支持显式类型声明的好处
  - 利于阅读
  - 利于代码编辑器进行代码提示和依赖分析
### 1. 基础篇

> 第1章： Hello TS

- ts的特点1
  - JS的超集 
  - 支持ES6标准，支持输出ES3,5,6纯代码 
  - 支持ES未来提案中的特性： 比如异步，装饰器。。。
  - 支持类型系统并支持类型推断
  - 支持运行在任何浏览器和Node.js环境

- ts的特点2
  - 免费开源，Apache授权协议 
  - 支持ES6标准进行拓展，是js超集
  - 添加了可选的静态类型，类，模块
  - 可编译为可读的，符合规范的js代码
  - 跨平台，支持运行在任何浏览器和Node.js环境
  - 保证可以与js一起运行，项目平滑迁移
  - 拓展名：.ts
  - 编译时检查，不污染运行时

- ts编码环境搭建
   - > 安装Node.js运行环境
    
      - 地址：https://nodejs.org/zh-cn/
      - 选择LTS版本: 长期支持维护
      - 安装完毕验证: 命令行输入命令执行
        ```
        node -v // 成功则会回显版本号
        ``` 
   - > npm和yarn（用于安装工具包，工具库的）
      - npm: node package manager(node包管理工具)
        - > npm组成: 网站 + 注册表 + CLI
          -  网站是用户发现软件包的主要工具； 
          -  注册表关于软件包信息的大型数据库；
          -  CLI指明开发者如何在注册表上进行上传和下载软件包
      - yarn
        - 新的js包管理工具，同样从npm源获取模块CLI客户端 
        - 存在目的是解决依赖的版本锁定，并行安装以及文案输出等 
        - 如何安装yarn: 建议通过官方推荐方式：https://yarnpkg.com/ah-Hans/docs/install#mac-tab

   - > 安装TS
        ```
        npm install -g typescript
        npm install -g ts-node // 自带tsc不能直接运行ts代码， 而ts-node仅封装ts编译过程，提供运行ts能力
        ``` 
   - > 安装VScode: https://code.visualstudio.com/
        - 免费开源
        - 微软主导，持续更新
        - 几乎由ts实现，天然支持
- helloworld
  - hello.ts文件内容
    ```
    console.log('hello')
    ```  
  - 控制台运行该文件代码
    ```
    ts-node hello.ts
    ```
  - 报错解决： 
 ```
ts-node : 无法加载文件 C:\Users\bysking\AppData\Roaming\npm\ts-node.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.mic 
rosoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ ts-node hello.ts
+ ~~~~~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
  ```

  右键开始菜单找到Windos PowerShell--执行set-ExecutionPolicy RemoteSigned命令，输入A即可

> 第2章： 类型与函数

- 2.1 基本类型
  - js的基本数据类型
  
     boolean, number, undefined, null, string, symbol, object.
  - js函数的不足
    ```
    function add(a, b) {
      return a + b; // 无法知道a,b究竟是字符串还是数字，两者都不会导致错误。
    }
    ``` 
- ts数据类型（ts是js超集，于是ts支持js的数据类型）

     > Boolean
     ```
     let areYouOk: boolean = true; // 布尔
     let age: number = 13; // number
     let name: string = 'sxf'; // string
     ``` 
     > 数组定义分两种

     ```
     let arrOne: number[] = [1, 2, 3];
     ``` 

     ```
     let arrTwo: Array<number> = [1, 2, 3];
     ``` 

    > 变量声明与ES6保持一致：let const
    - 根据指定变量进行类型推断

    ```
    let name = "xioaming"
    // let name: string = "xiaoming"
    ``` 

    - 严格类型检查

    ```
    const age = 5; // number
    age = "1" // string
    // 指定number后中途更改会导致编译时报错
    ``` 
  > 两种类型断言
 
    尖括号

    ```

    // 获取字符串长度
    let string1: any = "this is a string";
    let stringLength: number = (<string>string1).length
    
    ```

    as关键字
    
    
    ```

    // 获取字符串长度
    let string1: any = "this is a string";
    let stringLength: number = (string1 as string).length
    
    ```

    备注： ts的jsx中类型断言不能使用尖括号，其已经被用作泛型，于是都使用as

  > 泛型

  我们希望自己编写的模块或者组件代码，不仅支持当前的数据类型，还能支持将来的数据类型

- 泛型函数（与java语法一致）

  ```
  function hello<T> (arg: T): T {
    return arg;
  }

  let output = hello<string>("hello, ts");
  let output2 = hello("hello, ts"); // 智能进行类型推断

  ```
T: 用户传入的类型，最后的T是函数返回的类型

- 泛型函数使用参数的属性方法，比如length
```
  function hello<T> (arg: T): T {
    console.log(arg.length); // Error: T dosen`t have length
    return arg;
  }

  // 只有string, 数组有,把参数进一步指明为数组
  function hello<T> (arg: T[]): T[] {
    console.log(arg.length);
    return arg;
  }
``` 

> 枚举

场景：与后端约定数字变量代表具体的某种含义，缺乏可读性 

- 数字枚举
```
enum OrderStatus = {
  Start, // 从0自增
  Unpaid, // 1
  shipping,// 2
  Complete // 3
}
enum OrderStatus = {
  Start=1, // 从1自增
  Unpaid, // 2
  shipping, // 3
  Complete // 4
}
``` 
- 字符串枚举

没有递增含义，每一项需要手动初始化，值具有刻度性值，调试容易
```
enum OrderStatus = {
  Start="Start"
  Unpaid = "Unpaid", 
  Shipping = "Shipping", 
  Complete = "Complete"
}
``` 
- 反向映射

依赖于ts实现数字枚举时的代码编译
```
// 定义枚举结构
enum Enum {
  A
}

// 编译处理,把A与0做了双向映射，字符串没有反向映射
(function (Enum) {
  Enum[Enum['A'] = 0] = 'A'
})(Enum || (Enum = {}))



enum OrderStatus = {
  Start="Start"
  Unpaid = "Unpaid", 
  Shipping = "Shipping", 
  Complete = "Complete"
}
``` 
- symbol

es6开始symbol成为一种新的原生类型 

```
const symbol1 = Symbol();
const symbol2 = Symbol('hello');
const symbol3 = Symbol('hello'); // 不会相等

console.log(symbol2 === symbol3); // false


// 可以作为对象的key
const sym = Symbol();

const obj = {
  [sym]: 'testSymbol'
}

console.log(obj[sym]); // testSymbol
```

- 迭代器

当一个对象实现Symbol.iterator时，我们说他时可迭代的，常见如：array,map,set,string,int32array,unit32Array等内置对象已实现

  - for...of 返回对象迭代的值 (es6适用，es5,3只能用于数组，此时编译器会把of变成for循环)
  - for...in 返回对象迭代的key，可操作任何对象，会迭代原型对象上的key，可配合hasOwnProperty()只迭代自身

- 生成器: 允许函数暂停执行

  - 使用function *name () {}形式创建函数
  - 使用next()调用
  - 执行时遇到yield会暂停并返回yield表达式的值
  - 再次调用next()恢复执行

  > 返回无限整数列表
  ```
  function *infiniteList() {
      let i = 0;
      while(true) {
        yield i++;
      }
    }


    let ite = infiniteList();
    let i = 0;
    while(i < 10) {
      console.log(ite.next());
      i ++;
    }

    function *ge() {
      let who = yield;
      console.log('hello' + who);
    }

    let geTest = ge();

    console.log(geTest.next()); // {value: undefined,done:false}
    console.log(geTest.next('123')); // hello 123
    // {value: undefined,done:false}
  ```
  > 高级类型
  - interface: 函数传参使用字典方式最佳，解决如何约束对象字典

  ```
    interface A { // 定义接口以及数据类型
      a:number,
      b:string,
      c:number[]
    }

    let a: A;
    a.a = 1;
    a.b = "1";
    a.c = [1,2,3];
    a.d = [1,2,3] // error,d不存在接口定义中;
  ```

  > 交叉类型与联合类型

  交叉类型

  字典类型是使用interface定义的，交叉是多个字典类型合并为一个新的字典类型

  ```
  interface A {
    a: string,
    b: number
  }

  interface B {
    a: string,
    d: number
  }

  // 交叉类型M，是AB的并集（确实是这样）
  type M = A & B

  let c: M;
  ```

  联合类型

  使用竖线分割，只能访问共有属性

  ```
  interface A {
    a: string,
    b: number
  }

  interface B {
    a: string,
    d: number
  }

  // 联合类型M，是AB的并集（确实是这样）
  type M2 = A | B

  let c: M2; // 未定义c属性，只能访问共有属性a
  ```

  - 说明： 联合类型取交集，交叉类型取并集
  > 类型保护与区分类型

  ```
  interface Teacher {
    teach(): void
  }
  
  interface Stu {
    learn(): void
  }

  function getPerson(): Teacher | stu { // 返回类型已经定义，导致后续只能调用类型交集的方法
    return {} as Teacher;
  }

  const person = getPerson();
  person.teach(); // 只用交集方法才可调用

  // 解决：使用强制类型断言来轻质类型推测
  (<Teacher>person).teach();
  (<Stu>person).learn();
  

  // 类型保护实现
  function isTeacher(person: Teacher | Stu):person is Teacher {
    return (<Teacher>person).teach !== undefined;
  }
  <!-- person is Teacher是类型保护语句，说明参数必须来自当前定义的函数中的一个 -->

  // 现在调用person.teach()这么来
  if(isTeacher(person)) {
    person.teach();
  } else {
    person.learn();
  }
  ``` 
  > typeof 与 instanceof

  使用类型保护重构paddleft
  ```
  
  function isNumber(padding: number | string): padding is number {
    return typeof padding === 'number'
  }

  function isString(x: string | string): x is string {
    return typeof x === 'string'
  }

  function padleft(value:string, padding:number) {
    if (isNumber(padding)) {
      return Array(padding + 1).join(' ') + value;
    }
    if (isString(padding)) {
      return padding + value;
    }

    throw new Error('expected string or number, get ${padding}');
  }
  ```
每次使用类型保护都需要自定义函数，比较繁琐，于是ts针对基本类型时（敲黑板）使用typeof时会自动开启类型保护

  > instanceof更加精细化:通过构造函数区分类型

      ```
      // Person接口
      interface Person(name: string) {
        talk(): void
      }
      
      // 定义Teacher类实现接口
      class Teacher implements Person {
        constructor (name: string, age: number,) {

        }
        talk() {
          // code
        }
      }

      // 生产对象
      function getPerson () {
        return Math.random() < 0.5 ?
          new Peson ('xioaming', 13) :
          new Teacher('xiaozhang', 24);
      }

      let p = getPerson();

      // instance实现类型保护
      if (p instanceof Teacher) {
        p; // Teacher
      }

      if (p instanceof Student) {
        p; // Student
      }

      ```
  > 类型别名
  ```
  type Age = number;
  type AgeCreator = () => Age;

  function (arg: AgeCreator): Age {

  }
  ```
  泛型也可以使用

  ```
  type Person<T> = {
    age:T,
    mother: Person<T> // mother也是Person类型
  }
  ```

  > 字面量类型

  通常结合联合类型使用，达到类似枚举的效果

  ```
  type Profession = "teacher" | "doctor" | "student"

  function personCreator(p: Profession) {
    // code
  }

  personCreator("teacher");
  personCreator("doctor");

  personCreator("aaa"); // 报错，类型未定义

  // number也是可行的
  function getAge(): 1|2|3 {
    // code
  }
  ```
- 索引类型与映射类型
> Loadsh中的常见函数pluck函数
```
// 从对象中挑选在names中的属性值
function pluck(obj, names) {
  return names.map(name => {
    return obj[name];
  })
}
``` 

现在如果需要在ts中使用这个函数

```


// 属性挑选函数
function pluck<T, K extends keyof T>(obj: T, names: K): T[K][] {
  return names.map(name => obj[name])
}

// 定义Person接口类型
interface Person {
  name: string,
  age: number
}

// 定义接口类型的对象
let person: Person = {
  name: 'xiaoming',
  age: 21
}

pluck(person, ['name']); // ['xiaoming']
pluck(person, ['profession']); // 

```

函数调用时有两种泛型T,K，第一个参数person，类型推断为Person;第二个参数names,数组类型推断为从右向左
keyof关键字可以获取T的所有key数组：['name', 'age'],extend让泛型K继承T所有的关键字数组，所以K也拥有：['name', 'age'],依托于keyof完成关键字的索引。再看返回值：T[K][]: 表示为变量T取属性K的值的集合，T[K]就是索引访问操作符。

- 另外的场景
  > 将一个已知类型变为可选

  ```
    // 添加'?',实例化时不必给每个属性赋值
    interface Person {
      name?: string,
      age?: number
    }
  ```
  > 只读不可修改

  ```
    // key前添加'readonly'
    interface Person {
      readonly name: string,
      readonly age: number
    }
  ```
- 旧类型到新类型的映射
  > 令每个属性成为只读，或可选

  ```
    // 只读
    type Readonly<T> {
      readonly [P in keyof T]: T[P];
    }

    // 可选
    type Paritial<T> {
      [P in keyof T]?: T[P];
    }

    // 使用
    type PersonPartial = Paritial(Person);
    type PersonReadonly = Readonly(Person);
  ```

  备注说明： ts内部已经实现好了这两个函数，不需要自己实现

- 类型推断
  
  在没有明确指出类型的地方，ts编译器会自动推测当前的变量的类型

  ```
  let a = 1; // number
  ```

  > 通用类型集

  ```
  let a = [0, '123', null]; // 注意数组里面的元素类型不一致

  ```

  此例子推断的a的类型就是： （string|number）[]

  > 类型兼容性

  ```
  interface Person {
    age: number
  }

  class Father {
    age: number
  }

  let person: Person;

  person = new Father(); // 只要满足子结构描述，就能通过编译，会造成运行时和编译时的类型偏差


  ```

- ts结构化类型的基本原则：

```
// 定义接口类型
interface Person {
  name: string;
}

// 声明Person类型变量
let person: Person;

// 定义一个包含name属性的对象
const alice = {
  name: 'xiaoming',
  age: 22
}

// 赋值
person = alice; // 编译器会检查person中的每一个是否也在alice中，是就通过，看似合理，实则不准确


```
总之：如果x要兼容y，那么y至少应该包含与相同的属性

  > 函数类型赋值
```
f1 = (a: number) => 0;
f2 = (a: number, b: string) => 0;

f2 = f1; // 看f1的每个参数类型是否都在f2中的对应类型，此处有，赋值允许

f1 = f2; // f2中的参数b: string在f1中没有，赋值不允许

```

> 2.3 函数

- 函数定义

```
// js
function add(a, b) {
  return a + b;
}

// ts, 添加参数类型和返回类型
function add(a: number, b: number): number {
  return a + b;
}

// 可以给变量赋值为一个函数类型
let add2: (x: number, y: number) => number
```

- 可选参数

ts中每个函数必须要有值，一一对应，占坑， 参数可选则使用'?'，且必须放置于最后

```
function buildName (fname: string, lname:string): string {
  return fname + lname;
}

// 少传，只传一个参数
let fullName = buildName('王')； // 报错，需要两个参数
// 多传，多传一个参数
let fullName = buildName('王'， 'yang', '123')； // 报错，只需要两个参数
```

- 默认参数

```
function buildName(fname="123", lname:string) {
  return fname + lname;
}

// 默认参数未放置最后，需要占位undefined or null
let testName = buildName(undefined, 'wang'); // 123wang
let testName = buildName('li', 'wang'); // liwang
```

- 剩余参数

函数定义时使用数组变量接受额外传入的参数

```
function buildName(fname: string, ...names: string[]) {
  return fname + names.join(' ');
}

```

2.3.3 回调函数和promise

- 文件读取，转换成字符串

```
const fs = require('fs');

function loadJSONSync (filePath: string) {
  return JSON.parse(fs.readFileSync(filePath))
}

console.log(loadJSONSyns('test.json'))
```

- 异步版本

```

const fs = require('fs');
function loadJSON (filePath: string, cb: (err: Error, data?: any) => void) {
  fs.readFile(filePath, function (error, data) => {
    if (error) {
      cb(error); // 读取文件出错在cb回调函数里处理
    } else {
      cb (null, JSON.parse(data)); // null占位
    }
  })
}

``` 

基于回调的异步函数：一定不要两次调用回调， 一定不要抛出错误

- 具备高完成度的版本：

```
  const fs = require('fs');

  function loadJSON(
    filePath: string,
    callback: (err: Error, data?: any) => void ) 
  {
    fs.readFile(filePath, function(error, data) {
      if (error) {
        callback(error); // 读取文件出错直接回调错误处理
      } else {
        let result;
        try {
          result = JSON.parse(data); // 读取转换都成功
        } catch(err) {
          callback(err); // 读取文件成功但是转换出错，直接回调错误处理
        }
        callback(null, result); // 成功后执行回调，传入转换的参数数据
      }
    })
  }

```

- promise

   > 3种状态

    pending, resolved, rejected
resolve,reject分别代表成功失败的处理函数

```
const p = new Promise ((resplve, reject) => {
  resolve('成功数据处理')
});

p.then((res) => {
  console.log(res); // 成功数据处理
});
p.catch((err) => {
  console.log(err); // 失败数据处理， 没有reject，不被调用
});

```

  - > 链式性

then返回的依旧是Promise

  - > ts与Promise

  ts可以通过Promise链推测值的类型

  ```
  Promise.resolve(123)
    .then((res) => {
      // (parameter) res: number
      return true;
    })
    .then((res) => {
      // res: boolean
    });
  
  ```

  - > 链式回调改为Promise版本

```
const fs = require('fs');

function readAsync(filePath: string): Promise: any {
  return new Promise((resolve, reject)=> {
    fs.readFile(filePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
}
```
  - > Promise.all并行控制流 

```
function f1 (uid: string): Promise: <{}> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ uid });
    }, 1000)
  });
}
function f2 (uid: string): Promise: <{}> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ uid });
    }, 1000)
  });
}
function f3 (uid: string): Promise: <{}> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ uid });
    }, 1000)
  });
}

// promise函数f1, f2, f3都执行完后进入then方法，这里还有一个promise.race方法, 只要其中一个执行完毕就进入then方法
Promise.all([f1, f2, f3]).then((res) => {
  // res: [{...}, {...}, {...}]
})
```

  - ES8: async/await
  - 重载： 函数名相同，参数列表不同
  ```
  // ts重载， 例子为，
  根据传入的参数类型处理不同的逻辑
  function padleft (value: string, padding: number): string; // 第二个参数类型为number
  function padleft (value: string, padding: string): string; // 第二个参数类型为string
  
  function padLeft (value: string, padding: any) { // 函数实现的第二个参数为任意类型any
    if (typeof padding === 'number') {
      // code
    }

    if (typeof padding === 'string') {
      // code
    }

    throw new Error('Expected string or number');
  }

  ``` 

  声明多个不同的padLeft函数，然后在一个类型最宽泛的版本中实现它


> 第3章：接口与类

接口是一种约束作用（限制和规范）

- 简单示例接口如何工作

```
function pringLabel(labelObj: {label: string}) {
  console.log(labelObj.label);
}

let myObj = { szie: 10, label: 'Size 10 Object' };
pringLabel(myObj);
```
类型检查器会查看函数调用，函数需要一个参数，类型为对象，必须要含有名为label,类型为string的属性，一般传入的参数会包含许多的属性，但是编译器只检查必备的属性是否存在，同时类型是否匹配，有时也并非如此。

- 重写上述例子

使用接口来描述

```
interface LabelledValue {
  label: string
}

function printLabel(labelObj: LabelledValue) {
  console.log(labelObj.label);
}

let myObj = { szie: 10, label: 'Size 10 Object' }; // 不检查顺序
pringLabel(myObj);
```
- > 可选属性
interface里面的属性可选
```
interface SquareConfig { // 经过vscode实践测试，这里
  color?: string;
  width?: number;
}

function creatSquare(config: SquareConfig):{color:string, area: number} {
  let newSquare = { color: "white", area: 100 };

  if (config.color) { // 有属性就执行相应代码
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }

  return newSquare;
}
```
可选属性的好处：

  - 对可能存在的属性进行预定义
  - 可以捕获引用了不存在的属性时的错误，比如把color写成coulor就会报错


- > 只读属性

  ```

  interface Point {
    readonly x: number, // 添加只读前缀
    readonly y: number
  }


  let p1: Point = { // 声明Point类型实例
    x: 1,
    y: 1
  }

  p1.x = 3; // error, 只读

  ```

> 数组只读
  ```
  // ReadonlyArray<T>与Array<T>类似，只是去除数组可变方法， 确保数组创建后不能被修改
  let a: number[] = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  ro[0] = 12; // error， 只读
  ro.push(12); // error， 只读

  a = ro; // error, 把只读数组赋值给普通数组也是不可以，需要类型断言

  // 类型断言,可以赋值
  a = ro as number[];
  ```
- readonly 与 const的使用区别： 
  变量使用const， 属性使用readonly

- 额外的属性检查

```
interface SquareConfig {
  color?: string, // 注意这里color, 可选
  width?: number
}

function createSquare(config：SquareConfig):{color: string, area: number} {
  // code
}

createSquare({ coulor: 'red', width: 10 }); // 这里写的是coulor， error
```

对象字面量中coulor没有在接口类型中定义

- 绕开检查

  - 使用类型断言

  ```
  createSquare({ coulor: 'red', width: 10 } as SquareConfig); 

  ```
  - 索引签名（最佳）

  ```
  interface SquareConfig {
    color?: string, // 注意这里color, 可选
    width?: number,
    [propName: string]: any // 带有任意数量的其他类型，只要他们不是color, width, 无所谓类型是什么
  }
  ```

- 赋值给另外一个变量

  > 接口可以描述函数类型（参数列表和函数返回类型）

  ```
  // 定义函数类型
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  // 创建该函数类型变量
  let mySearch: SearchFunc;

  // 赋值
  mySearch = function (source: string, sub: string) {
    let result = source.search(sub);
    return result > -1;
  }

  ```
说明： 对于函数，形参参数名不需要和定义的类型里面一致，只需要类型一致即可，未写类型的会自动推出参数类型

- 可索引类型

```
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['bob', 'lili']

let myStr: string = myArray[0];

```

- 索引类型有两种： 字符串和数字

arr[100]的返回值要是arr['100']返回值的子类型，js内部会先把number转换为string

```
class Animal {
  name: string;
}

class Dog extend Animal {
  breed: string;
}

interface NotOk {
  [x: number]: Animal;
  [x: string]: Dog;
}

// 通过number类型的索引需要是string索引返回的子类型，这里Animal不是Dog的子类型
```

- 接口继承

```
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}


let square = <Square>{};
square.sideLength = 3; // 自身属性
square.color = 'red'; // 继承来的属性
```

- 继承多个接口
```
interface Shape1 {
  color: string
}
interface Shape2 {
  color2: string
}

interface Square extends Shape1, shape2 {
  sideLength: number
}

```

- 类的定义

```
class Greeter {
  greeting: string; // 成员变量

  constructor (msg: string) { // 构造函数
    this.greeting = msg;
  }

  greet () {
    return 'hello' + this.greeting;
  }
}

let greeter = new Greeter('world');
```

- 类实现接口

  ```
    interface ClockInterface {
      currentTime: Date;
      setTime(d: Date);
    }

    class Clock implements ClockInterface {
      currentTime: Date;
      setTime(d: Date){

          this.currentTime = d;
      };

      constructor (h: number, m: number) {

      }
    }
  ```

  - 存取器
  
  ts通过支持getters/setters来截取对对象成员的访问， 这可以有效控制访问对象成员。

```
class Employee {
  fullName: string
}

let employee = new Employee();
employee.fullName = 'Bob Smith'; // 可以随意设置属性
if (employee.fullName) {
  console.log(employee.fullName);
}

```
```
  // 检查用户密码是是否正确，在允许修改用户信息
  let pwd = 'pwd';

  class Employee {
    private _fullName: string;

    get fullName(): string {
      return this._fullName;
    }

    set fullName(newName: string) {
      if (pwd && pwd === 'pwd') {
        this._fullName = newName;
      } else {
        console.log(throw new Error('pwd is incorrect so not allowed edit'))
      }
    }
  }
```

注意事项：编译器输出设置为ES5或更高， 不支持降级到ES3; 只带get不带set会被推断为readonly

 - 只读属性
使用readonly设置属性， 必须在声明或构造函数里进行初始化

```
class Octopus {
  readonly name: string; // 只读属性
  readonly numberOfLegs: number = 8; // 声明就初始化
  constructor (theName: string) {
    this.name = theName; // 只读属性需要在构造函数中初始化
  }
}

let dad = new Octopus('Man with 8 legs');
dad.name = 'sxf'; // error， 只读
```
- 使用点(.)运算符访问类的静态属性

- 抽象类

不同于interface,abstract类可包含实现细节

> 第4章： 命名空间与模块

- 单文件命名空间

```
// a.js
namespace A { // 命名空间A
  export interface Person { // 命名空间外使用到这个类型需要export
    name: string
  }
}

// 命名空间之外
let a: A.Person = {
  name: '123'
}
```

跨文件引用

```
// a.js中需要export
export namespace A { // 命名空间A
  export interface Person { // 命名空间外使用到这个类型需要export
    name: string
  }
}

// b.js中需要导入

import { A } from './a';

let a: A.Person = {
  name: '123'
}
```

- 单文件里面为命名空间起别名

```
namespace Shapes {
  export namespace Polygon {
    export class Triangle {}
    export class Square {}
  }
}

import polygon = Shapes.Polygon; // 与模块的导入区分，这里只是起别名
let sq = new  polygon.Squares(); // 点运算符
```
- 模块的导入与导出

export 可以导出任意类型的声明
```
// Validation.ts
export interface StringValidator { // 导出类型
  isAcceptable(s: string): boolean;
}

export const name = '123'; // 导出变量

export class A implements B { // 导出类
}
```
- 导出并重新命名
```
// 原始文件
class A {}

export { A }; // 导出类


// 现在重命名导出
export { A }; // 原始的需要保留，因为很大可能别的地方使用了这个名字
export { A as newA }; // as 关键字
```

- 一个模块可以包裹多个模块，并将它们导出的类容联合在一起使用语法：export * from module

- 导入

导入一个模块的某个导出类容

```
import { A } from './index.js'; // A在index.js中被export

let b = new A();
```
导入并重命名

```
import { A as AA } from './index.js'; // as关键字

let b = new AA();
```
导入整个模块中所有的导出，放到一个变量并重命名

```
import * as Module from './index.js'; // as关键字

let b = new Module.AA();
```

- 默认导出：每个模块默认，default

```
// Jquery.d.ts, 默认导出$: 默认导出的类和函数名可以省略
declare let $: JQuery;
export default $;

// app.ts
import $ from "JQuery"; // 导入 默认导出的$
$('#btn').onClick(() => {
  // code
})

// one.js
export default 123;

// test.js
import num from './one'
console.log(num); // 123
```

  

### 2. 实战篇(待补充)

> 第5章： 命令行应用实战： 天气查询

> 第6章： Express实战： 后端服务

> 第9章： Vue实战: Html5网页开发

> 第11章： 项目迁移与社区共建
