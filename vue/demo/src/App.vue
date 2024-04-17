<template>
  <div>
    <test></test>
  </div>
</template>

<script>
import test from "./components/test"
export default {
  data() {
    return {}
  },
  components: {
    test,
  },
  methods: {},
}
</script>

<style lang="scss">
.tab {
  height: 50px;
  width: 300px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  .tab-item {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.active {
      background: #000;
      color: #fff;
    }
  }
}
</style>