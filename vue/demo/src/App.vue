<template>
  <div>
    <test :utils="utils"></test>
  </div>
</template>

<script>
import test from "./components/test.vue"
export default {
  components: { test },
  data() {
    return {
      utils: {
        a: 1,
        b: 2,
      },
    }
  },
}
</script>

<style>
</style>