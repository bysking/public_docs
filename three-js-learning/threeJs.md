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
let camera = new THREE.PerspectiveCamera(75, wwidth/wheight, 0.1, 100);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(wwidth, wheight);

document.body.appendChild(renderer.domElement);
```

> 通过模块引入

> 浏览器支持

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