<template>
  <div>
    <h1>{{ props.count }}</h1>
    <h1>{{ count }}</h1>
    <button @click="add">add</button>
  </div>
</template>

<script setup>
import { toRefs } from "vue"
const props = defineProps({
  count: Number,
})
const { count } = toRefs(props)

const emit = defineEmits(["add"])
const add = () => {
  emit("add")
}
</script>

<style>
</style>