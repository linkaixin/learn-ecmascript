<template>
  <div>{{ result }}--{{ aa}}</div>
</template>

<script>
import { inject } from "vue"
export default {
  name: "cal-result",
  props: {
    result: [String, Number],
  },
  setup() {
    let aa = inject("aa")
    return { aa }
  },
}
</script>

<style>
</style>