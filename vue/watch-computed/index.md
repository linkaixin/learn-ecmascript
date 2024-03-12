# 使用 express 编写后端 JSON 数据

0. 初始化
   npm init -y
1. 安装依赖
   npm i express -S
   npm i nodemon -g
2. 新建 src/index.js，修改 package.json 中的配置
   "scripts": {
   "dev": "nodemon ./src/index.js"
   },
3. 在 src 下新建 data 文件夹，下面新建 json 文件
4. 在 src/index.js 下编写代码
   const express = require('express');
   const app = express();
   app.listen(8888, function () {
   console.log('Welcome to use Express on 8888');
   })
5. npm run dev
6. 处理 POST 请求
   const bodyParse = require('body-parser');
   // 处理 Post 请求
   app.use(bodyParse.urlencoded({ extended: true }));
   app.use(bodyParse.json());
