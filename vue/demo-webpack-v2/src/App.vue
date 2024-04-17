<template>
  <div>
    <button @click="open">打开模态框</button>
  </div>
</template>
  
  <script>
export default {
  name: "App",
  data() {
    return {}
  },

  methods: {
    open() {
      this.$model.show({
        title: "标题",
        content: "内容",
      })
    },
  },
}
</script>