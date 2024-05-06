<template>
    <div>
        <p>
            <input type="text" v-model="todo">
            <button @click="add">添加</button>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/vuex'
let todo = ref('')
const store = useStore()
const add = () => {
    store.dispatch('addTodo', todo.value)
    todo.value = ''
}
</script>

<style></style>