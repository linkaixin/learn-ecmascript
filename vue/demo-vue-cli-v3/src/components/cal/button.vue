<template>
  <button :class="{current: method === curMethod}" @click="handlerClick">{{ innerText }}</button>
</template>

<script>
export default {
  name: "cal-button",
  props: {
    curMethod: String,
    innerText: String,
    method: String,
  },
  methods: {
    handlerClick() {
      this.$emit("dispatches", "changeMethod", this.method)
    },
  },
}
</script>

<style>
.current {
  background: pink;
  color: #fff;
  outline: none;
}
</style>