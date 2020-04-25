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