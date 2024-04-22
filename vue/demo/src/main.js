import App from './App.vue'
import utils from './utils/index.js';
const app = Vue.createApp(App)
console.log(app.config, 11);
// vue3 实例定义全局变量globalProperties
app.config.globalProperties.utils = utils
app.config.globalProperties.a = 1
app.config.globalProperties.msg = 'hello'
app.mount('#app')