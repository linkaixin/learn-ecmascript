<template>
  <div>
    <div v-if="isLogin">
      <router-view></router-view>
    </div>
    <div v-else>
      <div>
        <button @click="link('login')">login</button>
        <button @click="link('home')">home</button>
        <button @click="link('list')">list</button>
        <button @click="link('detail', 'params', 1)">detail(params)</button>
        <button @click="link('detail', 'query', 2)">detail(query)</button>
      </div>
      <div>
        <router-view v-slot="{ Component }">
          <transition>
            <keep-alive>
              <component :is="Component">
                <p>this is slot content</p>
              </component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router"
// 路由操作
const router = useRouter()
let isLogin = ref(true)
let routerList = reactive([{
  path: '/list',
  name: 'list',
  meta: {
    title: 'this is list'
  },
  component: () => import('./views/listViews.vue')
},
{
  path: '/detail/:id?',
  name: 'detail',
  component: () => import('./views/detailViews.vue')
}])

let subRouterList = reactive([
{
  path: '/teacher',
  name: 'teacher',
  component: () => import('./views/sub/teacherList.vue'),
},
{
  path: '/student',
  name: 'student',
  component: () => import('./views/sub/studentList.vue'),
},])

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (token) {

      routerList.forEach(r => {
        router.addRoute(r)
      })

      subRouterList.forEach(r => {
        router.addRoute('home', r)
      })

      isLogin.value = false
      next()
    } else {
      next('/login')
    }
  }
})

// 路由跳转的两种模式
const link = (path, type, id) => {
  // 当没有type的时，可以直接放入字符串
  if (!type) {
    router.push("/" + path)
    // router.replace(path)
  } else {
    if (type == "params") {
      router.push({
        name: path,
        params: {
          id,
        },
      })
    } else if (type == "query") {
      router.push({
        path: "/" + path,
        query: {
          id,
        },
      })
    }
  }
}

</script>

<style></style>