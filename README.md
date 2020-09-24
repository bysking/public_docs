# public_docs
docs for records

电子资源： http://www.yanhuangxueyuan.com/Three.js/

模型的创建：Maya, 3dmax、blender软件导出的三维模型文件本质上是json

Geometry、Material、Light、Object3D等类，都提供了一个方法.toJSON(),可以导出Threejs三维模型的各类数据，该方法的功能就是把Threejs的几何体、材质、光源等对象转化为JSON格式导出。

Threejs在three.js-master\examples\js\loaders目录下会提供一系列的加载器,这些加载器本质上都是解析模型文件的字符串，通过正则表达式提取相关的顶点、材质等信息转化为Threejs自身的类表示的对象

# 加载.obj模型文件

- 只加载obj文件
引入路径three.js-master/examples/js/loaders/OBJLoader.js下的OBJLoader.js文件即可

<!-- 引入obj模型加载库OBJLoader.js -->
<script src="../../three.js-master/examples/js/loaders/OBJLoader.js"></script>

```
/**
 * OBJ文件加载  只加载obj文件中的几何信息，不加载材质文件.mtl
 */
var loader = new THREE.OBJLoader(); // 实例化THREE.OBJLoader();

// 没有材质文件，系统自动设置Phong网格材质
loader.load('./立方体/box.obj',function (obj) { // load函数接受两个参数：文件以及回调函数
  scene.add(obj);
  
  // 加载后的一些编辑操作
  obj.children[0].scale.set(20,20,20);//网格模型缩放
  obj.children[0].geometry.center();//网格模型的几何体居中
  obj.children[0].material.color.set(0xff0000);//设置材质颜色
})
```

- 同时加载obj文件和mtl文件
mtl文件包含模型的材质信息，纹理路径，贴图信息等

```
<!-- 引入obj模型加载库OBJLoader.js -->
<script src="../../three.js-master/examples/js/loaders/OBJLoader.js"></script>
<!-- 引入obj模型材质加载库MTLLoader.js -->
<script src="../../three.js-master/examples/js/loaders/MTLLoader.js"></script>

// 两个加载器的实例化
var OBJLoader = new THREE.OBJLoader();//obj加载器
var MTLLoader = new THREE.MTLLoader();//材质文件加载器

// 先加载材质文件，赋给模型加载器，然后加载模型
MTLLoader.load('./立方体/box.mtl', function(materials) {
  OBJLoader.setMaterials(materials);
  OBJLoader.load('./立方体/box.obj', function(obj) {
    obj.scale.set(10, 10, 10); //放大obj组对象
    scene.add(obj);//返回的组对象插入场景中
  })
})

```
.obj文件不包含场景的相机Camera,光源等信息，不能导出骨骼动画，如果希望导出光照，相机，骨骼动画，变形动画信息，可以选择.fbx、.gltf等格式

# fbx文件加载以及动画解析

stl、obj都是静态模型，不可以包含动画，fbx除了包含几何、材质信息，可以存储骨骼动画等数据

- 动画相关的数据是如何存储的
obj.animations属性的数组包含两个剪辑对象AnimationClip，obj.animations[0]对应剪辑对象AnimationClip包含多组关键帧KeyframeTrack数据，obj.animations[1]对应的剪辑对象AnimationClip没有关键帧数据，也就是说没有关键帧动画

```
var loader = new THREE.FBXLoader();//创建一个FBX加载器
loader.load("SambaDancing.fbx", function(obj) {
  // 查看动画数据  2个剪辑对象AnimationClip
  console.log(obj.animations)

})
```

- 解析fbx模型骨骼动画
```
var mixer=null;//声明一个混合器变量
var loader = new THREE.FBXLoader();//创建一个FBX加载器

loader.load("SambaDancing.fbx", function(obj) {
  scene.add(obj)
  // obj作为参数创建一个混合器，解析播放obj及其子对象包含的动画数据
  mixer = new THREE.AnimationMixer(obj);
  // 查看动画数据
  console.log(obj.animations)
  // obj.animations[0]：获得剪辑对象clip
  var AnimationAction=mixer.clipAction(obj.animations[0]);
  // AnimationAction.timeScale = 1; //默认1，可以调节播放速度
  // AnimationAction.loop = THREE.LoopOnce; //不循环播放
  // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
  AnimationAction.play();//播放动画
})
// 创建一个时钟对象Clock
var clock = new THREE.Clock();

// 渲染函数
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧

  if (mixer !== null) {
    //clock.getDelta()方法获得两帧的时间间隔
    // 更新混合器相关的时间
    mixer.update(clock.getDelta());
  }
}
render();
```
## 小案例

- 加载一个OBJ文件并进行贴图

var loader = new THREE.OBJLoader();
loader.load('./model.obj',function (obj) {
  //加载纹理贴图texture1.png
  var texture = new THREE.TextureLoader().load('texture1.png');
  
  // 颜色贴图中已经包含了光照信息，所以直接使用不受光照影响的基础网格材质MeshBasicMaterial
  obj.children[0].material= new THREE.MeshBasicMaterial({
    map:texture,//设置颜色纹理贴图
  })
  scene.add(obj);
})
