<template>
  <div>
    <input type="text" v-model.trim="value" />
    <button @click="add">添加</button>
  </div>
</template>

<script>
const { ref } = Vue
export default {
  name: "todo-list-form",
  setup(props, ctx) {
    let value = ref("")

    const add = () => {
      if (!value.value) return
      ctx.emit("add", "add", value.value)
      value.value = ""
    }

    return {
      value,
      add,
    }
  },
}
</script>

<style>
</style>