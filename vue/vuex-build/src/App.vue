<template>
  <todo-list></todo-list>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store);
  }
}
</script>

<script setup>
import todoList from '@/components/TodoList/index'
import { createStore } from '@/vuex/index'
const store = createStore({
  state: {
    todoList: [],
    filter: 'all',
  },
  getters: {
    getFinished(state) {
      return state.todoList.filter(item => item.complated)
    },
    getUnfinished(state) {
      return state.todoList.filter(item => !item.complated)
    },
    getFilterTodoList(state, getters) {
      switch (state.filter) {
        case 'finished':
          return getters.getFinished;
        case 'unfinished':
          return getters.getUnfinished;
        default:
          return state.todoList;
      }
    }
  },
  mutations: {
    addTodo(state, value) {
      state.todoList.push({
        id: new Date().getTime(),
        content: value,
        complated: false
      })
    },
    toggleTodo(state, id) {
      state.todoList = state.todoList.map(todo => {
        if (todo.id == id) {
          todo.complated = !todo.complated
        }
        return todo
      })
    },
    removeTodo(state, id) {
      state.todoList = state.todoList.filter(todo => todo.id != id)
    },
    handleFilter(state, type) {
      state.filter = type
    }
  },
  actions: {
    addTodo({ commit }, value) {
      commit('addTodo', value)
    },
    toggleTodo({ commit }, id) {
      commit('toggleTodo', id)
    },
    removeTodo({ commit }, id) {
      commit('removeTodo', id)
    }
  }
})
console.log(store, 11);
</script>

<style></style>