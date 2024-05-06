<template>
  <div>
    <TodoForm></TodoForm>
    <TodoList :list="todoData"></TodoList>
    <TodoCount :count="todoCount"></TodoCount>
  </div>
</template>

<script setup>
import TodoForm from './TodoForm.vue'
import TodoList from './TodoList.vue'
import TodoCount from './TodoCount.vue'
import { useTodoList } from './todo'
import { provide } from 'vue'

const {
  todoData,
  todoCount,
  addTodo,
  toggleTodo,
  removeTodo
} = useTodoList();

provide("todoMethods",{
  addTodo,
  toggleTodo,
  removeTodo
})
</script>
