<template>
  <li>
    <input
      type="checkbox"
      :checked="item.complated ? 'checked': false"
      @click="handlerClick('complated', item.id)"
    />
    <span :style="{textDecoration: item.complated ? 'line-through' : 'none'}">{{ item.title }}</span>
    <button @click="handlerClick('del',item.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: "todo-list-item",
  props: {
    item: Object,
  },
  setup(props, ctx) {
    const handlerClick = (type, id) => {
      ctx.emit("handlerClick", type, id)
    }
    return {
      handlerClick,
    }
  },
}
</script>

<style>
</style>