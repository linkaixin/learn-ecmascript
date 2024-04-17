<template>
    <div :class="[isDrak ? 'drak' : 'default']">
        我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我
        <div>
            <button @click="change">切换主题</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isDrak: false
        }
    },
    methods: {
        change() {
            this.isDrak = !this.isDrak
        }
    }
}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
}

.default {
    width: 100%;
    height: 100vh;
    background: pink;
    color: #000;
}

.drak {
    width: 100%;
    height: 100vh;
    background: #000;
    color: #fff;
}
</style>