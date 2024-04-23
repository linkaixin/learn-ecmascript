import App from './App.vue'
const app = Vue.createApp(App)
app.config.globalProperties.msg = '全局变量'
app.mount('#app')