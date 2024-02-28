# 项目 vite 新建

1. npm init -y
2. 安装 vite
   npm i vite@2.3.8 -D
3. 修改 package.json 中的启动方式
   "dev": "vite"
4. 新建 src/App.js
   console.log('hello vue');
5. 新建 index.html
 <div id="app"></div>
 <script type="module" src="./src/App.js"></script>
6. 新建 MVVM/index.js
7. 启动项目
   npm run dev

# MVVM 驱动 VM：ViewModel

M Model: 数据保存和处理的层
V View: 视图
