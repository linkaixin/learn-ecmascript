<template>
  <div>
    <div class="sub-menu" @mouseenter="handleEnter" @mouseleave="handleLeave">
      <div class="sub-menu-title">
        <slot name="title"></slot>
        <span class="icon">&gt;</span>
      </div>
      <div class="sub-item" v-show="subItemShow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "sub-menu-item",
  data() {
    return {
      subItemShow: false,
    }
  },
  methods: {
    handleEnter() {
      this.subItemShow = true
    },
    handleLeave() {
      this.subItemShow = false
    },
  },
}
</script>
  
  <style lang="scss" scoped>
.sub-menu {
  width: 200px;
  position: relative;

  .sub-menu-title {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    .icon {
      position: absolute;
      right: 10px;
    }
  }
  .sub-item {
    position: absolute;
    top: 0;
    left: 100%;
    background: #333;
  }
}
</style>