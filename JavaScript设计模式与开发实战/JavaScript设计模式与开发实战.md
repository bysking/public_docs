# JavaScript设计模式与开发实战

> 单例模式

- 概念说明： 保证一个类仅有一个实例，并且提供一个全局访问点。

- 场景举例： 比如点击页面登录按钮弹窗（无论单击多少次，弹窗唯一）。还有比如线程池、全局缓存、浏览器中的window对象等

- 代码举例

```
let Singleton = function (name) { 
    this.name = name;
    this.instance = null;
};

// 定义获取实例的静态方法，实例存在直接返回，否则new一个实例， 返回
Singleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
};

// 验证单例
let instance1 = Singleton.getInstance('instance1');
let instance2 = Singleton.getInstance('instance2');

console.log(instance1 === instance2); // true
```

- 问题

    不透明， 使用者必须要知道这是一个单例类，通过getInstance获得单例。

- 透明单例
```
let createDiv = (function () {
    let instance; // 保存唯一的实例
    let createDiv = function (html) { // div构造函数
        if (instance) {
            return instance;
        }
        this.html =html;
        this.init();
        return instance = this;
    };
    createDiv.prototype.init = function () {
        let div = document.createElement('div');
        div.innerHtml = this.html;
        document.body.appendChild(div);
    };
    return createDiv;
})();

// 测试
let a = createDiv('div1');
let b = createDiv('div2');

console.log(a === b); // true
```
和普通创建对象的构造函数一样使用

- 惰性单例

需要的时候才创建实例

- 例子：点击按钮展示悬浮窗

