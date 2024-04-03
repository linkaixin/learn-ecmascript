<template>
  <div class="box">
    <input type="text" placeholder="请输入手机号码" />
    <button>登录</button>
  </div>
</template>
    
    <script>
export default {
  name: "MobileLogin",
}
</script>
    
    <style lang="scss" scoped>
.box {
  padding: 20px;
  box-sizing: border-box;
  input {
    width: 100%;
    height: 30px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  button {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>