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