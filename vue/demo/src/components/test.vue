<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ author }}</p>
    <p>{{ content }}</p>
  </div>
</template>

<script>
const { toRefs, toRef, getCurrentInstance } = Vue
export default {
  name: "Test",
  props: {
    title: String,
    author: String,
    content: String,
  },
  setup(props, ctx) {
    console.log("setup")
  },
}
</script>

<style>
</style>