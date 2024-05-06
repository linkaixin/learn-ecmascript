<template>
    <div>
        <input type="checkbox" :checked="item.complated ? 'checked' : false" @click="changeComplated(item.id)">
        <span :style="{ textDecoration: item.complated ? 'line-through' : 'none' }">{{ item.content }}</span>
        <button @click="remove(item.id)">删除</button>
    </div>
</template>

<script setup>
import { useStore } from '@/vuex';
const props = defineProps({
    item: Object
})

const store = useStore();
const changeComplated = (id) => {
    store.dispatch('toggleTodo', id)
}

const remove = (id) => {
    store.dispatch('removeTodo', id)
}
</script>

<style></style>