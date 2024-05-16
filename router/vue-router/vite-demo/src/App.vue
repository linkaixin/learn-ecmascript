<template>
  <div>
    <div>
      <button @click="link('login')">login</button>
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
</template>

<script setup>
import { useRouter } from "vue-router"
// 路由操作
const router = useRouter()

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