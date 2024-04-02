<template>
  <sub-menu-item>
    <template #title>{{ data.title }}</template>
    <template #default>
      <div v-for="c of data.childer" :key="c.id">
        <menu-item v-if="!c.childer">{{ c.title }}</menu-item>
        <re-sub-menu-item v-else :data="c"></re-sub-menu-item>
      </div>
    </template>
  </sub-menu-item>
</template>

<script>
import MenuItem from "../MenuItem"
import SubMenuItem from "../SubMenuItem"

export default {
  name: "re-sub-menu-item",
  components: {
    MenuItem,
    SubMenuItem,
  },
  props: ["data"],
}
</script>

