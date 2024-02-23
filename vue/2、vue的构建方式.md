# vite+cdn

1. npm init -y
2. npm i vite
3. 配置 vite
   "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
   },
   ->
   "scripts": {
   "dev": "vite"
   },
4. 新建 index.html
5. 引入 vue 的 cdn
   5.1. vue2 使用时
   new Vue({
   render: h => h(App),
   }).$mount('#app')
   5.2. vue3 使用时
   const { createApp } = Vue;
   createApp(App).mount('#app')
6. 新建 src/main.js
   引入时候
   <script type="module" src="./src/main.js"></script>

# vite

1. npm init vite

# vue-cli 安装

npm i @vue/cli -g
vue create project-name

# vite-vue-cdn

1. npm init -y
2. npm i vite -d
3. 配置 vite
4. 新建目录
5. 在 index.html 中引入 cdn
6. 在 main.js 中创建 vue 实例
7. Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
8. 安装@vitejs/plugin-vue 并在 vite.config.js 中配置
9. import App from './App'不加入'./App.vue'会报错
   Failed to resolve import "./App" from "src\main.js". Does the file exist?
10. 在 vite.config.js 中配置
    resolve: {
    extensions: ['.js', '.ts', '.vue']
    }
11. 配置@
    import { resolve } from 'path';
    alias: {
    '@': resolve(\_\_dirname, './src')
    }
