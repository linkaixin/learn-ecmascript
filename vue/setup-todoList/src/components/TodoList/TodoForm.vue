<template>
    <div>
        <input type="text" v-model="todo" placeholder="请输入事项">
        <button @click="add">add</button>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
let todo = ref('')
const { addTodo } = inject('todoMethods')

const add = () => {
    if (todo.value.length) {
        addTodo(todo.value)
        todo.value = ''
    }
}
</script>