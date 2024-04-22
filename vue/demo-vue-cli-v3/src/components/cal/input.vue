<template>
  <input type="number" @input="handleInput" />
</template>

<script>
export default {
  name: "cal-input",
  props: {
    field: String,
  },
  methods: {
    handleInput(e) {
      let value = e.target.value
      value = typeof value == "string" ? Number(value) : value
      this.$emit("dispatches", "setNumber", this.field, value)
    },
  },
}
</script>

<style>
</style>