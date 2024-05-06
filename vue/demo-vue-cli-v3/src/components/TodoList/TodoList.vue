<template>
    <div>
        <TodoItem v-for="item of list" :key="item.id" :item="item"></TodoItem>
    </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'

const props = defineProps({
    list: Array
})
</script>