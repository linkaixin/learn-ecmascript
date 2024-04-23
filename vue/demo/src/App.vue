<template>
  <div>
    <test :title="titel" :author="author" :content="content"></test>
  </div>
</template>

<script>
import Test from "./components/Test.vue"
const { ref, onMounted } = Vue
export default {
  data() {
    return {
      titel: "THIS IS TITLE",
      author: "CXY",
      content: "THIS IS CONTENT",
    }
  },
  components: {
    Test,
  },
  setup() {},
}
</script>

<style>
</style>