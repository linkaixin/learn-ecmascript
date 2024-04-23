<template>
  <div>
    <todo-list-form @add="setTodoList"></todo-list-form>
    <todo-list-list :list="list" @handlerClick="setTodoList"></todo-list-list>
  </div>
</template>

<script>
import TodoListForm from "./form.vue"
import TodoListList from "./list.vue"
import todoListHook from "../../hooks/todoList/todoList.js"
export default {
  name: "TodoList",
  components: {
    TodoListForm,
    TodoListList,
  },
  setup() {
    const { list, setTodoList } = todoListHook()

    return {
      list,
      setTodoList,
    }
  },
}
</script>

<style>
</style>