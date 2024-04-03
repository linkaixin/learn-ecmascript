<template>
  <div>
    <div class="tab">
      <div class="tab-nav">
        <div
          class="tab-nav-item"
          v-for="(item,index) in tabData"
          :key="index"
          :class="currIndex == index ? 'active' : ''"
          @click="changeTab(index)"
        >{{ item }}</div>
      </div>
      <div>
        <keep-alive>
          <component :is="componentName"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import AccountLogin from "./components/AccountLogin"
const QrcodeLogin = Vue.defineAsyncComponent(() =>
  import("./components/QrcodeLogin")
)
const MobileLogin = Vue.defineAsyncComponent(() =>
  import("./components/MobileLogin")
)

export default {
  data() {
    return {
      tabData: ["账号密码", "扫一扫", "手机号码"],
      currIndex: 0,
    }
  },
  components: {
    AccountLogin,
    QrcodeLogin,
    MobileLogin,
  },
  computed: {
    componentName() {
      const tabName = this.tabData[this.currIndex]
      let componentName = ""
      switch (tabName) {
        case "账号密码":
          componentName = "AccountLogin"
          break
        case "扫一扫":
          componentName = "QrcodeLogin"
          break
        case "手机号码":
          componentName = "MobileLogin"
          break
        default:
          break
      }
      console.log(componentName)
      return componentName
    },
  },
  methods: {
    changeTab(index) {
      this.currIndex = index
    },
  },
}
</script>

<style lang="scss" scoped>
.tab {
  margin: 100px auto;
  width: 300px;
  height: 250px;
  border: 1px solid #000;
  .tab-nav {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    .tab-nav-item {
      flex: 1;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      &.active {
        background: #000;
        color: #fff;
      }
    }
  }
}
</style>