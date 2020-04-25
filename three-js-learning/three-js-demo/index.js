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
let geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体对象， 顶点信息， 空间坐标
let materail = new THREE.MeshBasicMaterial({ color: '#00ff00' }); // 材料信息
let cube = new THREE.Mesh(geometry, materail); // 网格蒙皮
sceen.add(cube); // 默认情况 物体会被添加到（0，0，0），使得摄像机和立方体在一起，解决方案： 摄像机外移
camera.position.z = 5;

animate();

/**
 * 渲染循环 每次屏幕刷新时对场景进行绘制的循环-大多数屏幕60次/秒
 * 为什么不用setInterval替代？ 答： 用户切换其他标签页时requestAnimationFrame会暂停，节省处理器资源，省电
 */
function animate() {
    requestAnimationFrame(animate);
    // 自定义操作
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(sceen, camera)
}