<template>
    <div>
        <todo-item v-for="item of $store.getters.getFilterTodoList" :key="item.id" :item="item"></todo-item>
    </div>
</template>

<script>
export default {
    mounted() {
    }
}
</script>

<script setup>
import TodoItem from './TodoItem.vue';
</script>

<style></style>