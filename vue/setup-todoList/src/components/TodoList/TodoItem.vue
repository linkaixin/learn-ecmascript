<template>
    <div>
        <input type="checkbox" :checked="item.complated" @click="changeComplated(item.id)">
        <span :class="{ 'line-through': item.complated }">{{ item.content }}</span>
        <button @click="remove(item.id)">删除</button>
    </div>
</template>

<script setup>
import { inject } from 'vue';
const props = defineProps({
    item: Object
})
const { toggleTodo, removeTodo } = inject('todoMethods')

const changeComplated = (id) => {
    console.log("🚀 ~ changeComplated ~ id:", id)
    toggleTodo(id)
}

const remove = (id) => {
    removeTodo(id)
}
</script>