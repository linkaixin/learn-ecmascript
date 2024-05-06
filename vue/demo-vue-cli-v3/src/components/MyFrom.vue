<template>
  <div>
    parent bound v-model is: {{ model }}
    <p>
      <button @click="update">update</button>
    </p>
  </div>
</template>

<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

