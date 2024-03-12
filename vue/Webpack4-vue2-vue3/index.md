# Webpack4 搭建 vue2 和 vue3

## vue2

1. 新建文件夹
2. npm init -y
3. 安装 webpack
   npm i webpack@4.44.2 webpack-cli@3.3.12 webpack-dev-server@3.11.2 -D
   修改 package.json 文件，"dev": "webpack-dev-server",
4. 新建 public 文件夹，下新建 index.html，建立<div id="app"></div>，引入 vue2
5. 新建 src 文件夹，下新建 main.js
6. 安装 vue2 所需要的插件
   npm i vue-loader@15.9.7 vue-template-compiler@2.6.14 html-webpack-plugin@4.5.0 -D
7. 新建并配置 webpack.config.js
8. 新建 src/App.vue
9. 在 main.js 中引入 vue，App.vue，并实例化 vue
10. 运行 npm run dev，在浏览器中打开 localhost:8080，查看效果

## vue3

1. <script src="https://cdn.jsdelivr.net/npm/vue@3.1.2/dist/vue.global.js"></script>
2. npm i -D @vue/compiler-sfc@3.1.2
   npm i vue-loader@next -D
3. src/main.js
   Vue.createApp(App).mount('#app')
4. webpack.config.js
   const { VueLoaderPlugin } = require('vue-loader');

## vue2 vue3 的切换

1. CDN 引入的切换
2. src/main.js 下创建实例的切换
3. vue-loader 的切换
   webpack.config.js 下 vue-loader 引入的切换
