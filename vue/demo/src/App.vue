<template>
  <div class="box">
    <div class="head">
      <div
        v-for="(item,index) of list"
        :class="['h-item', {'artive': index === curIndex}]"
        :key="item"
        @click="curIndex = index"
      >{{ item }}</div>
    </div>
    <div class="content">
      <component :is="componentName"></component>
    </div>
  </div>
</template>

<script>
import { Intro, Article, List } from "./component.js"
export default {
  components: {
    Intro,
    Article,
    List,
  },
  data() {
    return {
      curIndex: 0,
      list: ["intro", "article", "list"],
    }
  },
  computed: {
    componentName() {
      let name = this.list[this.curIndex]
      switch (name) {
        case "intro":
          return Intro
        case "article":
          return Article
        case "list":
          return List
        default:
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid #000;
  .head {
    height: 50px;
    display: flex;
    border-bottom: 1px solid #000;
    .h-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &.artive {
        background: #000;
        color: #fff;
      }
    }
  }
  .content {
    padding: 30px;
  }
}
</style>