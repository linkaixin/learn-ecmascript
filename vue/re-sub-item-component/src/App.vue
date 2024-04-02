<template>
  <div class="box">
    <div v-for="item of data" :key="item.id">
      <menu-item v-if="!item.childer">{{ item.title }}</menu-item>
      <re-sub-menu-item v-else :data="item"></re-sub-menu-item>
    </div>
  </div>
</template>

<script>
import MenuItem from "./components/MenuItem"
import SubMenuItem from "./components/SubMenuItem"
import ReSubMenuItem from "./components/ReSubMenuItem"
export default {
  name: "App",
  components: {
    MenuItem,
    SubMenuItem,
    ReSubMenuItem,
  },
  data() {
    return {
      data: [
        {
          id: 1,
          title: "菜单1",
        },
        {
          id: 2,
          title: "菜单2",
        },
        {
          id: 3,
          title: "菜单3",
          childer: [
            {
              id: 3 - 1,
              title: "菜单3-1",
            },
            {
              id: 3 - 2,
              title: "菜单3-2",
              childer: [
                {
                  id: 3 - 2 - 1,
                  title: "菜单3-2-1",
                  childer: [
                    {
                      id: 3 - 2 - 1 - 1,
                      title: "菜单3-2-1-1",
                    },
                  ],
                },
                {
                  id: 3 - 2 - 2,
                  title: "菜单3-2-2",
                },
                {
                  id: 3 - 2 - 3,
                  title: "菜单3-2-3",
                },
              ],
            },
            {
              id: 3 - 3,
              title: "菜单3-3",
            },
          ],
        },
        {
          id: 4,
          title: "菜单4",
        },
        {
          id: 5,
          title: "菜单5",
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.box {
  background: #000;
  width: 200px;
}
</style>