import {
    // 使用history
    createWebHistory,
    // 使用hash
    createWebHashHistory,
    // 创建路由
    createRouter
} from 'vue-router'

import Login from '../views/loginViews.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/list',
        name: 'list',
        meta: {
            title: 'this is list'
        },
        component: () => import('../views/listViews.vue')
    },
    {
        path: '/detail/:id?',
        name: 'detail',
        component: () => import('../views/detailViews.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})