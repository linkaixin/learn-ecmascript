<template>
    <div>detail</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.query.id);
</script>

<style></style>