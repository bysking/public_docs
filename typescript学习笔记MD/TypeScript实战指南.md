## <<TypeScript实战指南>> 笔记

### 前言

- 为什么要学ts?
    - 效率提升：更快理清参数以及函数之间的关系，无需debugger逐层观察值的变化
    - 支持接口定义：清晰定义模块之间的边界
    - Self-ducumenting: 代码自我说明(ts拥有强制类型表达，函数定义时，入参和返回值必须标注好),无需依赖文档
- ts支持显式类型声明的好处
  - 利于阅读
  - 利于代码编辑器进行代码提示和依赖分析
### 1. 基础篇

> 第1章： Hello TS

- ts的特点1
  - JS的超集 
  - 支持ES6标准，支持输出ES3,5,6纯代码 
  - 支持ES未来提案中的特性： 比如异步，装饰器。。。
  - 支持类型系统并支持类型推断
  - 支持运行在任何浏览器和Node.js环境

- ts的特点2
  - 免费开源，Apache授权协议 
  - 支持ES6标准进行拓展，是js超集
  - 添加了可选的静态类型，类，模块
  - 可编译为可读的，符合规范的js代码
  - 跨平台，支持运行在任何浏览器和Node.js环境
  - 保证可以与js一起运行，项目平滑迁移
  - 拓展名：.ts
  - 编译时检查，不污染运行时

- ts编码环境搭建
   - > 安装Node.js运行环境
    
      - 地址：https://nodejs.org/zh-cn/
      - 选择LTS版本: 长期支持维护
      - 安装完毕验证: 命令行输入命令执行
        ```
        node -v // 成功则会回显版本号
        ``` 
   - > npm和yarn（用于安装工具包，工具库的）
      - npm: node package manager(node包管理工具)
        - > npm组成: 网站 + 注册表 + CLI
          -  网站是用户发现软件包的主要工具； 
          -  注册表关于软件包信息的大型数据库；
          -  CLI指明开发者如何在注册表上进行上传和下载软件包
      - yarn
        - 新的js包管理工具，同样从npm源获取模块CLI客户端 
        - 存在目的是解决依赖的版本锁定，并行安装以及文案输出等 
        - 如何安装yarn: 建议通过官方推荐方式：https://yarnpkg.com/ah-Hans/docs/install#mac-tab

   - > 安装TS
        ```
        npm install -g typescript
        npm install -g ts-node // 自带tsc不能直接运行ts代码， 而ts-node仅封装ts编译过程，提供运行ts能力
        ``` 
   - > 安装VScode: https://code.visualstudio.com/
        - 免费开源
        - 微软主导，持续更新
        - 几乎由ts实现，天然支持
- helloworld
  - hello.ts文件内容
    ```
    console.log('hello')
    ```  
  - 控制台运行该文件代码
    ```
    ts-node hello.ts
    ```
> 第2章： 类型与函数


> 第3章： 接口与类


> 第4章： 命名空间与模块


### 2. 实战篇

> 第5章： 命令行应用实战： 天气查询

> 第6章： Express实战： 后端服务

> 第9章： Vue实战: Html5网页开发

> 第11章： 项目迁移与社区共建
