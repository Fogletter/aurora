# react 音乐类 App

- 移动App

## 技术栈
- React全家桶
    React 组件开发
    组件的封装
    第三方组件库
    受控和非受控
    hooks编程 自定义hooks
    React-Router-DOM
      SPA
      路由守卫
      懒加载
    Zustand
- mock 接口模拟
- axios 请求拦截和代理
- jwt 登录
- module css
- vite 配置
- 性能优化
    防抖节流
    useCallback useMemo
- LLM
    - chat
    - 语音
    - coze 工作流 调用
- 移动端适配
    vw/vh
- git 提交等编程风格

## 项目的架构
- components
- pages
- store
- hooks
- api
- mock

## 开发前的准备
- 安装的包
    react-router-dom zustand axios
    react-vant（UI组件库
    开发期间的依赖
    postcss-px-to-viewport（替代lib-flexible+rem的移动端适配方案）
    vite-plugin-mock mockjs jsonwebtoken
- vite 配置
    - alias
    - mock
    - .env
    llm apikey
    - user-scalable
    - css 预处理
        index.css reset
        box-sizing:border-box font-family:-apple-system
        App.css  全局通用样式
        module.css 模块化样式
    - 移动端适配 vw/vh
        不能用px，相对单位vw/vh
        不同设备上体验要一致
        不同尺寸手机 等比例缩放

## 项目亮点
- 移动端适配
  - 设计稿 尺寸是iphone 标准尺寸 750px
  - 前端的职责是还原设计稿
  - 自动化？
      postcss-px-to-viewport
      postcss 是 css预编译器 很强大
      vite 自动读取postcss.config.js 将css内容编译
      px -> vw/vh
## git 提交规范
  - git add .
  - git commit -m '移动端适配等项目初始化'
  - git push origin main
## 功能模块
- UI 组件库
  - react-vant  第三方组件库
  - 选择一个适合业务的UI组件库 或者公司内部的组件库
- 配置路由及懒加载
  - 懒加载
  - 路由守卫
  - Layout组件
    - 嵌套路由Outlet 分组路由配置
    - 网页有几个模板 Layout
      - Route 不加path 对应的路由自由选择
      - tabbar 模板
      - blank 模板
  - tabbar
    - react-vant + @react-vant/icons
    - value + onChange 响应式
- chatbot 模块
  - llm 模块 chat 封装
  - 迭代chat，支持任意模型
- Search
  - 防抖
  - api
    GoogleSuggest
  - localStorage
- 瀑布流
  - 小红书等主流App的内容浏览用户体验产品
      两列、图片高度不一致、落差感
      滚动加载更多，图片懒加载
  - 接口
      /api/articles?page=${n} 支持翻页
      唯一id page + index
      随机图片，高度随机
  - images 怎么放到两列中？ MVVM
  数据驱动界面（2列） 奇偶
    - 此处可以进行优化，骨架屏、双响应式数组以保持高度落差较小，intersectionObserver可以封装使用
  - 加载更多 位于盒子底部的元素 通过使用 IntersectionObserver
  观察它是否出现在视窗，性能更好，使用了观察者模式
  组件卸载时，直接使用disconnect 释放资源，防止内存泄漏
  - key id  下拉刷新
  - 使用IntersectionObserver 再次图片懒加载 data-src
  - 点击后显示内容，图片卡片默认状态下不展示，点击后从下方升起
  - 添加了一个来自网易的url位于页面下方位置引导用户滑动页面

## 项目亮点和难点
- 前端智能
  - chat 函数
  - 对各家模型比较感兴趣，升级为kimiChat，doubaoChat... 灵活
      性能、能力、性价比
      随意切换大模型，通过参数抽象
  - 文生图
      - 优化prompt 设计 通过调用两次deepseek接口来实现图片生成（从掘金查找到相应的文章分享）
        - 关键是 pollinations 开源项目提供的文生图API接口和markdown的图片展示
          https://image.pollinations.ai/prompt/{description}?width={width}&height={height}&nologo=true
          图片描述 宽 高 不带水印
- 设计工作流
  - 创建工作流 ani_pic
      上传照片，生成一首歌曲
  - 代码节点
        参数校验和逻辑功能，返回运行的结果
  - 歌曲生成流程
        - 图片理解插件  计算机视觉
        - 大模型 特征提取 歌曲创作 文字转音频
        prompt
  - workflow_id token
  - coze 图片要先上传到coze中
      uploadUrl + token + new FormData()
      append(file)
      拿到file_id
  - workflowUrl + workflow_id + token
      工作流需要的参数

- Assistant ai助手
  - 该组件中在底部添加了ref关联的dom元素，以达到messages更新时可以自动滚动到底部的效果，
    用户体验时更能直观感受到已经成功返回了消息
    - 在Community页面组件中的Waterfall瀑布流组件底部也添加了一个ref关联的dom元素
      不过这个dom元素的作用是观察是否需要继续加载瀑布流中的元素

- 用户体验优化
  - 搜索建议 防抖 + useMemo 性能优化
  - 组件粒度划分
      React.memo + useCallback
  - 懒加载
  - 热门推荐 + 相关商品 （产品）
  - SPA
  - 骨架屏 不用让用户等待了
  - 文件上传的preview html5 FileReader

## 项目遇到过什么问题，怎么解决的
- chat messages 遇到message 覆盖问题 （来自Assistant组件）
  - 闭包陷阱问题
    一次事件里面，两次setMessages()
    在处理用户输入和处理大模型返回的事件中，连续两次使用set
    此处改成函数式更新可以正常处理

- 升级瀑布流？（尚未完成）
  - 骨架屏
  - 奇偶articles 两列分配可能有时候会高度差距极大 不好看 随机
      两个响应式数组，判断哪一列高度更少，将新得到的articles加入那个数组
  - intersectionObserver 用了两次 可以对其进行封装
      hooks

- 自定义hooks
  - useTitle
  一定要设置
  修改页面标题，通过页面标题更好地判断页面功能

- es6 特性使用
  tabbar 的高亮
  - arr.findIndex
  - str.startsWith
  - promise
  瀑布流随机数据生成
  - Array.from({length: pageSize}, (_, i) => ({

  }))

- 项目后续可迭代方向
  - 功能由浅入深
  - chatbot deepseek 简单chat // 目前处于该阶段
  - deepseek-r1 推理模型
  - 流式输出
  - 上下文 LRU
  - coze 工作流接口调用

## 通用组件开发
- Loading
  - 居中方案
     position: fixed;
     left: 0;
     right: 0;
     top: 0;
     bottom: 0;
     margin: auto;
  - React.memo 无状态组件，不重新渲染
  - animation

## 后续可开发方向
- 商城页
    分类页面未完成（已预留跳转）
    立即购买功能可直接跳转支付页（已预留跳转）
    页面底部可添加一个dom元素来实现社区瀑布流模式中的同款无限下刷（可稍作修改后直接搬迁）
- 详情页
    当前为mock的假数据，后续根据后端数据库按id查询到数据插入即可
    为购物车页面预留了一个按钮，目前默认跳转到商城页（后续可添加购物车页并将其修改）
    下方的店铺、客服、收藏、加入购物车和立即购买等待后续版本迭代后开发
- 服务页
    可添加手动选择大模型功能，供用户自由选择
- 个人页
    收藏页未完成，可展示用户收藏的所有商品
    设置页未完成，可在设置页修改头像、昵称、签名
- 菜单页
    菜单页中的购物车、收藏功能等待后续版本迭代后开发