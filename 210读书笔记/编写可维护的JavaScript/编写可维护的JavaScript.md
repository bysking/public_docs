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
 


## 2. 编程实践

### 2.1 ---
### 2.2 ---
### 2.3 ---
### 2.4 ---

## 3. 自动化

### 3.1 ---
### 3.2 ---
### 3.3 ---
### 3.4 ---
