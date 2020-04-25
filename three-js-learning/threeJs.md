# ThreeJs学习笔记-cpx

## 起步

> 创建一个场景

- 首先需要下载依赖文件： [three.js](https://threejs.org/build/three.js)

- 编写代码如下
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ThreeJs学习案例</title>
    <style>
        body {
            margin: 0;
        }

        canvas {
            width: 100%;
            height: 100%
        }
    </style>
</head>

<body>
    <h1>threejs学习教程实例</h1>
    <!-- 引用的three.js库 -->
    <script src="./lib/three.js"></script>
    <!-- 自己的代码书写位置 -->
    <script src="./index.js"></script>
</body>

</html>

```
- 重点关注3个对象: 场景，相机，渲染器
  
场景、相机、渲染器的建立
```javascript
let wwidth = window.innerWidth;
let wheight = window.innerHeight;

let sceen = new THREE.Scene();
/**
 * param 1 视野角度，值是角度单位，表示在显示器上看到的场景的范围
 * param 2 长宽比 
 * param 3 近界面 物体距离摄像机位置比这个值小，则不渲染 提升性能
 * param 4 远界面 物体距离摄像机位置比这个值大，则不渲染 提升性能
 */
let camera = new THREE.PerspectiveCamera(75, wwidth/wheight, 0.1, 100); // 透视摄像机

// threejs 提供多中渲染器， 某些浏览器老旧的时候，可以使用别的渲染器进行降级
let renderer = new THREE.WebGLRenderer();

/**
 * param 1 2 渲染区域宽高
 * param 3 false 低分辨率渲染， 需要配合wwidth/2, wheight/2, 类似于用小图进行放大
 */
renderer.setSize(wwidth, wheight, false);

document.body.appendChild(renderer.domElement);
```

- 创建立方体
```javascript
/**
 * 
 * @param {any} seen 场景实例
 * @param {Object} options 创建立方体配置
 */
function addGeometry(seen, options) {
    let geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体对象， 顶点信息， 空间坐标
    let materail = new THREE.MeshBasicMaterial({ color: '#00ff00' }); // 材料信息
    let cube = new THREE.Mesh(geometry, materail); // 网格蒙皮
    seen.add(cube); // 默认情况 物体会被添加到（0，0，0），使得摄像机和立方体在一起，解决方案： 摄像机外移
}
```
- 添加渲染循环
```javascript
/**
 * 渲染循环 每次屏幕刷新时对场景进行绘制的循环-大多数屏幕60次/秒
 * 为什么不用setInterval替代？ 答： 用户切换其他标签页时requestAnimationFrame会暂停，节省处理器资源，省电
 */
function animate() {
    requestAnimationFrame(animate);
    // 自定义操作
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render(sceen, camera)
}
```
- 调用测试
```javascript
let wwidth = window.innerWidth;
let wheight = window.innerHeight;
let sceen = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, wwidth/wheight, 0.1, 100);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(wwidth, wheight, false);
document.body.appendChild(renderer.domElement);
addGeometry(sceen);
camera.position.z = 5;
animate();
```

> 通过模块引入
- npm install three

```javascript
import { Scene } from 'three';
const scene = new Scene();
```
- 注意

ES6版本加载器，控制器的引入需要在example/jsm/controls/OrbitControls.js
> 浏览器支持
- 在所有现代浏览器中，three.js可以用webGL渲染场景，如果是IE10或者更低，则需要回落到renders（CSS2DRENDERER,CSS3DRENDERER, SCGRENDERER）

three.js部分特性需要使用polyfill解决兼容问题
Typed Arrays, Web Audio API, WebVR API, Blob, Promise, Fetch, Flie API, URL API, Pointer Lock API

- 建议的填充物
1. [core-js](https://github.com/zloirock/core-js)
2. [typedarray.js](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js)
3. [ES6-Promise](https://github.com/stefanpenner/es6-promise/)
4. [Blob.js](https://github.com/eligrey/Blob.js)
5. [fetch](https://github.com/github/fetch)



> WebGl兼容性检查

> 本地运行Three.js

> 如何使用WebGl 2

> 画线

> 载入3D模型

> 常见问题

> 一些有用链接


## 进阶

> 如何更新场景


> 如何废置对象


> 如何创建VR内容


> 如何使用后期处理

> 矩阵变换

> 动画系统

## 构建工具

> 使用NPM进行测试

## API 集合
[Three.js官网地址](http://webgl3d.cn)