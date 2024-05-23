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
        path: '/',
        alias: '/home',
        name: 'home',
        component: () => import('../views/homeViews.vue'),
        children: [
            {
                path: '',
                name: 'teacher',
                component: () => import('../views/sub/teacherList.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },


]

export default createRouter({
    history: createWebHistory(),
    routes
})