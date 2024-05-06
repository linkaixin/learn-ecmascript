<template>
    <div>
        <button v-for="(item, index) of tabs" :key="index" :class="{ active: $store.state.filter == item.value }"
            @click="handleFilter(item.value)">{{ item.name }}</button>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "@/vuex";
const tabs = reactive([{
    name: '全部',
    value: 'all'
}, {
    name: '未完成',
    value: 'unfinished'
}, {
    name: '已完成',
    value: 'finished'
}])

const store = useStore();

const handleFilter = (type) => {
    store.commit('handleFilter', type)
}
</script>

<style>
.active {
    background: #000;
    color: #fff;
}
</style>