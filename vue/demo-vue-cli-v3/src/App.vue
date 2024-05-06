<template>
  <div>
    <span>{{ a }}</span>
    <span>+</span>
    <span>{{ b }}</span>
    <span>=</span>
    <span>{{ res }}</span>
  </div>
</template>

<script setup>
import { reactive, computed, toRefs } from "vue"
const state = reactive({
  a: 1,
  b: 2,
})

const res = computed(() => state.a + state.b)

const { a, b } = toRefs(state)
</script>