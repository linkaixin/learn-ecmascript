<script>
const { h } = Vue
export default {
  props: ["username", "password"],
  emits: ["update:username", "update:password", "submit"],
  render() {
    return h("div", null, [
      h("input", {
        type: "text",
        value: this.username,
        placeholder: "用户名",
        onInput: (e) => this.$emit("update:username", e.target.value),
      }),
      h("input", {
        type: "password",
        value: this.password,
        placeholder: "密码",
        onInput: (e) => this.$emit("changePassword", e.target.value),
      }),
      h(
        "button",
        {
          onClick: () => this.$emit("submit"),
        },
        "提交"
      ),
    ])
  },
}
</script>

<style>
</style>