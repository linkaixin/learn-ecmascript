import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { generateRouter } from '@/libs/utils'

// 路由守卫
router.beforeEach(async (to, from, next) => {
    if (!store.state.auth) {
        await store.dispatch('setUserRouters')
        generateRouter(store.state.userRouters).forEach(r => {
            router.addRoute(r)
        })
        next({ path: to.path })
    } else {
        next();
    }
})

const app = createApp(App)

app.use(router).use(store)

app.mount('#app')
