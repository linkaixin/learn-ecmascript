<template>
  <div>
    <cal-result :result="result"></cal-result>
    <div>
      <cal-input field="first" @dispatches="dispatches"></cal-input>
      <cal-input field="second" @dispatches="dispatches"></cal-input>
    </div>
    <div>
      <cal-button :curMethod="curMethod" innerText="+" method="plus" @dispatches="dispatches"></cal-button>
      <cal-button :curMethod="curMethod" innerText="-" method="minus" @dispatches="dispatches"></cal-button>
      <cal-button :curMethod="curMethod" innerText="*" method="mul" @dispatches="dispatches"></cal-button>
      <cal-button :curMethod="curMethod" innerText="/" method="div" @dispatches="dispatches"></cal-button>
    </div>
  </div>
</template>

<script>
import CalResult from "./result"
import CalInput from "./input"
import CalButton from "./button"
import dispatches from "@/dispatches/cal.js"
import { provide } from "vue"

export default {
  components: {
    CalResult,
    CalInput,
    CalButton,
  },
  data() {
    return {
      result: 0,
      first: 0,
      second: 0,
      curMethod: "plus",
    }
  },
  methods: {
    dispatches(type, ...args) {
      dispatches(this)(type, ...args)
    },
  },
  setup() {
    provide("aa", 222)
  },
}
</script>

<style>
</style>