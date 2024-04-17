<template>
  <div>
    <h1 class="color">{{ title }}</h1>
    <p>{{ date }}</p>
    <p>{{ content }}</p>
  </div>
</template>

<script>
const { h } = Vue
export default {
  name: "test",
  data() {
    return {
      title: "this is a title",
      date: "2024-04-17",
      content: "this is content",
    }
  },
}
</script>

<style>
</style>