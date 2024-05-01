<template>
    <div>
        总条数：{{ count }}
    </div>
</template>

<script setup>
    const props = defineProps({
        count: Number
    })
</script>