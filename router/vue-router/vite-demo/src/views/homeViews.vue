<template>
  <div>
    <h1>Home</h1>
    <div>
      <router-link to="/teacher">老师</router-link> |
      <router-link to="/student">学生</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
  
<script>
export default {

}
</script>
  
<style></style>