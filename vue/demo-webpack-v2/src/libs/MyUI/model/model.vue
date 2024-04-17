<template>
  <div class="model-box">
    <div class="model">
      <div class="header">
        <h1>{{ title }}</h1>
        <div class="close" @click="close">x</div>
      </div>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "model",
  props: {
    title: {
      type: String,
      default: "THIS IS TITLE",
    },

    content: {
      type: String,
      default: "THIS IS CONTENT",
    },
  },
  methods: {
    close() {
      this.$model.hide()
    },
  },
}
</script>
  
  <style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}
.model-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .model {
    width: 500px;
    height: 300px;
    border: 1px solid #000;
    margin: 200px auto;
    background: #fff;
    .header {
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      font-weight: normal;
      font-size: 14px;
      cursor: pointer;
      background: pink;
    }
    .content {
      padding: 50px;
      font-size: 16px;
      box-sizing: border-box;
    }
  }
}
</style>