<template>
  <ul>
    <todo-list-item v-for="item of list" :key="item.id" :item="item" @handlerClick="handlerClick"></todo-list-item>
  </ul>
</template>

<script>
import TodoListItem from "./item"
export default {
  name: "todo-list-list",
  components: {
    TodoListItem,
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  setup(props, ctx) {
    const handlerClick = (type, arg) => {
      ctx.emit("handlerClick", type, arg)
    }
    return {
      handlerClick,
    }
  },
}
</script>

<style>
</style>