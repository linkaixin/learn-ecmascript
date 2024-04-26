<template>
  <div>
    <h1>{{ title }}</h1>
    <h1>{{ content }}</h1>
    <h2>{{ subData.title }}</h2>
    <h2>{{ subData.content }}</h2>
    <button @click="changeTitle">修改标题</button>
  </div>
</template>

<script>
const { ref, watch, reactive, toRefs } = Vue
export default {
  setup() {
    const state = reactive({
      title: "this is title",
      content: "this is content",
      subData: {
        title: "this is sub title",
        content: "this is sub content",
      },
    })

    const changeTitle = () => {
      state.title = "这是标题"
    }

    const stop = watch(
      () => state.title,
      (newVal, oldVal) => {
        console.log(newVal, oldVal)
      }
    )

    stop()

    return {
      ...toRefs(state),
      changeTitle,
    }
  },
}
</script>

<style>
</style>