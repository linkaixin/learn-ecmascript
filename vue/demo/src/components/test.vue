<template>
  <div></div>
</template>

<script>
import { getCurrentInstance } from "vue"
export default {
  name: "test",
  props: ["utils"],
  mounted() {
    console.log(this, this.msg, this.a, 22)
  },
  setup() {
    const instance = getCurrentInstance()
    const { utils } = instance.appContext.config.globalProperties
    console.log(instance)
  },
}
</script>

<style>
</style>