# JavaScript设计模式与开发实战

> ## 1.单例模式

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


> ## 2.策略模式

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

> ## 3.代理模式

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

> ## 4.发布订阅模式

- 定义：定义对象间的一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都将得到通知。

- 例子1： Dom事件

```
    document.body.addEventListener('click', function () {
        alert('click body');
    }, false); // 默认是false（冒泡阶段执行）true(捕获阶段产生)

```
我们无法预知用户什么时候点击，所以订阅body的点击事件，当body被点击时，body节点向订阅者发布消息

- 例子2： 自定义例子

1.发布者。
2.发布者持有缓存列表，用来存放回调函数以便通知订阅者。
3.发布消息时，发布者会遍历缓存列表，触发里面的回调函数。

```
    // 发布者
    let Pubisher = {};

    // 订阅者回调函数缓存列表
    Pubisher.cacheList = [];

    // 添加订阅者回调函数
    Pubisher.addSubscribe = function (fn) {
        this.cacheList.push(fn);
    };

    // 发布者发布消息
    Pubisher.trigger = funtion () {
        cacheList.forEach(fn => fn.apply(this, arguments));
    }
```

上面的trigger函数中， 只要发布者发布消息，每个订阅者都会订阅到（即使这个消息不需要他们处理）。 增加一个标志key，修改如下：

```
    // 发布者
    let Pubisher = {};

    // 订阅者回调函数缓存列表,修改为对象
    Pubisher.cacheList = {};

    // 添加订阅者回调函数
    Pubisher.addSubscribe = function (key, fn) {
        if (!this.cacheList[key]) {
            this.cacheList[key] = [];
        }
        this.cacheList[key].push(fn);
    };

    // 发布者发布消息
    Pubisher.trigger = funtion (key) {

        let key = Array.prototype.shift.call(arguments); // 取出消息类型
        let fns = this.this.cacheList[key]; // 获取该类型回调函数列表

        if (!fns || fns.length === 0) { // 未订阅此类型消息， 列表为空
            return false;
        }
        fns.forEach(fn => fn.apply(this, arguments));
    }


```

- 通用的实现思路：把发布-订阅功能提出来，然后定义一个安装函数给所有对象安装发布-订阅功能

上述只能给某个具体的发布者使用。那么想要给任意对象添加发布订阅模式就需要一个通用版本。

```
// 把发布-订阅封装成一个对象
let event = {
    cacheList: [],
    addSubscribe: function (key, fn) {
        if (!this.cacheList[key]) {
            this.cacheList[key] = [];
        }
        this.cacheList[key].push(fn);
    },
    trigger:  funtion (key) {
        let key = Array.prototype.shift.call(arguments); // 取出消息类型
        let fns = this.this.cacheList[key]; // 获取该类型回调函数列表

        if (!fns || fns.length === 0) { // 未订阅此类型消息， 列表为空
            return false;
        }
        fns.forEach(fn => fn.apply(this, arguments));
    },
    remove: function (key, fn) {
        let fns = this.cacheList[key];
        if (!fns) { // 对应key没有被人订阅
            return false;
        }
        if (!fn) { // 如果没有传入具体的回调， 则取消key对应的所有事件
            fns && fns.length = 0;
        } else {
            for (let i = fns.length - 1; i > 0; i--) {
                let _fn = fns[i];
                if (_fn === fn) {
                    fns.splice(i, 1); // 数组里移除指定函数
                }
            }
        }
    }
}

// 定义一个安装函数
let installEvent = function (obj, event) {
    for (key in event) {
        obj[key] = event[key];
    }
}

 // 测试
 let obj = {};
 installEvent(obj, event);
 obj.addSubscribe('a', function () {
     console.log('小明订阅a事件');
 })
 obj.addSubscribe('b', function () {
     console.log('小红订阅b事件');
 })

 obj.trigger('a'); // 发布a事件
 obj.trigger('b');// 发布b事件
```

> ## 5.状态模式

- 说明： 区分事物内部状态，状态改变往往带来行为的改变。

- 例子： 电灯开关，灯开着时，按下开关，变为关闭； 灯关闭时，按下开关，变为开启。

```
let Light = function () {
    this.state = 'off'; // 电灯初始状态
    this.button = null; // 开关按钮
}

// 开关灯的行为
Light.prototype.btnWasPressed = function () {
    if (this.state === 'off') {
        console.log('开灯')；
        this.state = 'on';
    } else if (this.state === 'on') {
        console.log('关灯')；
        this.state = 'off';
    }
}

// 初始化事件绑定
Light.prototype.init = function () {
    let btn = document.creatElement('button'),
        self = this;

    button.innerHtml = '开关';
    this.button = document.body.appendChild(btn); // 函数返回追加的节点
    this.button.onclick = function () {
        self.btnWasPressed();
    }
}
```
- 代码缺点

1.btnWasPressed违反开闭原则
2.状态种类不确定: 比如增加强光弱光就需要修改if-else
3.状态切换需要堆砌if-else

- 修改代码

一般封装指的是封装对象行为，而不是状态，但是状态模式里面封装的是状态。
具体做法是把每一种状态以及该状态对应的行为封装在一个类里面，事件触发时把请求委托给这个对象即可。


1. 编写不同的灯状态类
```
// 弱光类
let WeakLight = function (light) {
    this.light = light;
};
WeakLight.prototype.btnWasPressed = function () {
    console.log('弱光');
    this.light.setState(this.light.weakState);
}

// 强光类
let StrongLight = function (light) {
    this.light = light;
};
StrongLight.prototype.btnWasPressed = function () {
    console.log('强光');
    this.light.setState(this.light.strongState);
}

// 关灯类
let OffLight = function (light) {
    this.light = light;
};
OffLight.prototype.btnWasPressed = function () {
    console.log('关灯');
    this.light.setState(this.light.offState);
}


```

2. 改写Light类

```
let Light = function () {
    this.offState = new OffLight(this);
    this.strongState = new OffLight(this);
    this.weakState = new WeakLight(this);
    this.button = null;
}

```

3. button事件绑定 
Light.prototype.init = function () {
    let btn = document.creatElement('button'),
        self = this;

    button.innerHtml = '开关';
    this.button = document.body.appendChild(btn); // 函数返回追加的节点
    this.currentState = this.offState;
    this.button.onclick = function () { // 实际上使用了委托
        self.currentState.btnWasPressed();
    } 
}

5. 测试代码

```
let light = new Light();
light.init();
```

> ## 6. 装饰者模式

在不改变对象自身情况下，给对象动态增加职责

- 模拟传统面向对象的装饰着模式

场景： 飞机大战， 一级发射普通子弹， 二级导弹， 三级原子弹

```
let Plane = function () {};
Plane.prototype.fire = function () {
    console.log('发射普通子弹')；
}
```

接下来增加两个装饰类：导弹、原子弹

```
let DecoratorMissile = function (plane) {
    this.plane = plane'
}
DecoratorMissile.prototype.fire = function () {
    this.plane.fire();
    console.log('发射导弹');
}

let DecoratorAtom = function (plane) {
    this.plane = plane'
}
DecoratorAtom.prototype.fire = function () {
    this.plane.fire();
    console.log('发射原子弹');
}

// 测试代码
let plane = new Plane();
plane.fire(); // 发射普通子弹

plane = new DecoratorMissile(plane);
plane.fire(); // 发射普通子弹以及发射导弹

plane = new DecoratorAtom(plane);
plane.fire(); // 发射普通子弹以及发射原子弹

```
- js版

```
let plane = {
    fire: function () {
        console.log('发射普通子弹');
    }
}

let decoratorMissile = function () {
    console.log('发射导弹');
}

let decoratorAtom = function () {
    console.log('发射原子弹');
}

let fire = plane.fire; // 保存原始的函数

plane.fire = function () { // 扩展函数
   fire(); 
   decoratorMissile();
}
let fire2 = plane.fire;

plane.fire = function () {
   fire2(); 
   decoratorAtom();
}
```
> ## 7.职责链模式

- 概念：使得多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，沿着它传递请求，直到有一个对象处理它。

- 实例：

```
    // 老板不写代码，让经理写。
    fubction Boss(manager) {
        this.manager = manager;
    };
    Boss.prototype.coding = function (js) {
        this.manager.write(js);
    };

    // 经理也不写代码，让程序员写
    function Manager (coder) {
        this.coder = coder;
    }
    Manager.prototype.write = function (js) {
        this.coder.write(js);
    }

    // 程序员：让我来！
    function Coder() {};
    Coder.prototype.write = function (js) {
        console.log('codding' + js)
    }

    // 测试
    let begin = new Boss(new Manager(new Coder()));
    begin.write('js')
```
> ## 8.命令模式

```
    let lian = {}; // 一个连

    // 炮兵
    lian.paobing = function (pao_num) {
        console.log(pao_num + '炮' + '开始战斗');
    };

    // 步兵
    lian.bubing = function (bubing_num) {
        console.log(bubing_num + '步兵' + '开始战斗');
    };

    lian.fight = function (command) {
        lian[command.type](command.num);
    };

    // 开始打仗: 让炮兵出动的命令
    lian.fight({
        type: 'paobing',
        num: 900
    })

    // 让步兵出动的命令
    lian.fight({
        type: 'bubing',
        num: 1000
    })

```