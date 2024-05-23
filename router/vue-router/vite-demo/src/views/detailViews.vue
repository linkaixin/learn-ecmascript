<template>
    <div>detail</div>
</template>

<script setup>
import { onBeforeRouteLeave, useRoute, onBeforeRouteUpdate } from 'vue-router';
const route = useRoute();

// 独享守卫 
// 监听参数的变化
onBeforeRouteUpdate(() => {
    console.log('update');
    console.log(route.query.id);
    console.log(route.params.id);
})

// 监听页面离开
onBeforeRouteLeave((to, from) => {
    console.log('leave');
})
</script>

<style></style>