<template>
  <div>
    <Child1 :count="count" @add="add"></Child1>
  </div>
</template>

<script setup>
const { ref } = Vue
import Child1 from "./components/Child1.vue"
let count = ref(0)

const add = () => {
  count.value++
}
const emit = defineEmits(["change", "delete"])
</script>

<style>
</style>