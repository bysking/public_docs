# JavaScript设计模式与开发实战

> 1.单例模式

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

fn负责创建对象，与管理单例的逻辑相互分离
```
// 管理单例的逻辑
let Singleton = function (fn) {
    let instance;
    return function () {
        return instance || (instance = fn.apply(this, arguments));
    }
}

// 创建对象的函数
let createLogin = function () {
    let div = document.createElement('div');
    div.innerHtml = '我是登录弹窗';
    div.style.display = 'none'; // 默认隐藏
    document.body.appendChild(div);
    return div;
}


// 代码测试
let createSingleLogin = Singleton(createLogin); // 闭包，保存了创建对象函数
let loginLayerInstance = createSingleLogin(); // 使用的时候再创建，通过调用保存的创建函数
singleLogin.style.display = 'none'; 
```


> 2.策略模式

- 定义：定义一系列算法，把他们封装起来，并且可相互替换。

- 直观理解：实现某一功能有多种方式可以选择，目的是把算法的使用和算法的实现分离。

- 使用策略模式设计年终奖金

    模仿传统的面向对象语言的实现: 

    ```
        // 定义算法， A级别
        function rankA = function () {};
        rankA.prototype.calculate = function (salary) {
            return salary * 2;
        }

        // B级别
        function rankB = function () {};
        rankB.prototype.calculate = function (salary) {
            return salary * 1;
        }

        // 定义策略类
        let Bonus = function () {
            this.salary = null; // 工资参数
            this.stratege = null; // 算法策略函数
        }

        // salary赋值方法
        Bonus.prototype.setSalary = function (salary) {
            this.salary = salary;
        }

        // stratege赋值方法
        Bonus.prototype.setStratege = function (salary) {
            this.stratege = stratege;
        }

        // 奖金计算: 把计算委托给策略对象
        Bonus.prototype.getBonus = function () {
        return this.stratege.calculate(this.salary);
        }

        // 测试: 传入不同算法策略，获得对应计算结果
        let bonus = new Bonus();
        bonus.setSalary(5000);
        bonus.setStratege(new rankA());
        console.log(bonus.getBonus()); // 5000 * 2 = 10000

        bonus.setStratege(new rankB());
        console.log(bonus.getBonus()); // 5000 * 1 = 50000
    ```

    javascript版的实现

    更直接的做法是把策略定义为函数

    ```
        let strategies = {
            'A': function (salary) {
                return salary * 2;
            },
            'B': function (salary) {
                return salary * 1;
            },
            // ...
        };

        let calBonus = function (salary, rank) {
            return strategies[rank](salary);
        }

        // 测试
        console.log(calBonus(5000, 'A')); // 10000, (5000 * 2)
        console.log(calBonus(5000, 'B')); // 5000, (5000 * 1)
    
    ```

> 3.代理模式

- 解释： 为一个对象提供一个替代品以控制对该对象的访问
- 简单代理：B 帮助 A 给 C 送花；

```
let Flower = function () {}; // 花

let A = {
    sendFlower: function (target) {
        target.receiveFlower(new Flower());
    }
}

let B = {
    receiveFlower: function (flower) {
        C.listenGoodMood(function () { // 心情好的时候才收花
            C.receiveFlower(flower);
        });
    }
}

let C = {
    listenGoodMood: function (fn) {
        setTimeout(() => { // 5秒后心情变好
            fn();
        }, 5000)
    },
    receiveFlower: function (flower) {
        console.log('收到花' + flower);
    }
}

// 测试
A.sendFlower(B);
```

- 虚拟代理实现图片预加载

```
    let myImage = (function () {
        let imgNode = document.createElement('img');
        document.body.appendChild(imgNode);
        return {
            setSrc: function (src) {
                imgNode.src = src;
            }
        }
    })();

    let proxyImg = (function () {
        let img = new Image();
        img.onload = function () {
            myImage.setSrc(this.src);
        }

        return {
            setSrc: function (src) {
                myImage.setSrc('loading.jpg');
                img.src = src;
            }
        }

    })();

    // 测试
    let src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581607042729&di=3b7d6396bde70b231b71eeb068f7e595&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F169a0840d14f19e572a12bc96dcfe5acefeb6eca1f85d-mnLbE1_fw658';
    proxyImg.setSrc(src);

```