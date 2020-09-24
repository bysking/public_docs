# public_docs
docs for records

电子资源： http://www.yanhuangxueyuan.com/Three.js/

模型的创建：Maya, 3dmax、blender软件导出的三维模型文件本质上是json

Geometry、Material、Light、Object3D等类，都提供了一个方法.toJSON(),可以导出Threejs三维模型的各类数据，该方法的功能就是把Threejs的几何体、材质、光源等对象转化为JSON格式导出。

Threejs在three.js-master\examples\js\loaders目录下会提供一系列的加载器,这些加载器本质上都是解析模型文件的字符串，通过正则表达式提取相关的顶点、材质等信息转化为Threejs自身的类表示的对象

# 加载.obj模型文件

