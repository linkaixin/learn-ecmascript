import Vue from 'vue';
import App from './App.vue'
import { model } from './libs/MyUI'

Vue.use(model)
// 组件实例
const app = new Vue({
    render: h => h(App)
}).$mount('#app');

console.log(app);

