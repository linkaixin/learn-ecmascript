<template>
  <div class="menu">
    <div class="menu-item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-item",
}
</script>

<style lang="scss" scoped>
.menu {
  width: 200px;

  .menu-item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
}
</style>