<template>
    <div>
        <div class="btns">
            <button v-for="(item, index) of userList" :key="item.id"
                :class="['btn', userInfo.id == index + 1 ? 'active' : '']" @click="changeUserInfo(index)">{{ item.name
                }}</button>
        </div>
        <p>
            <textarea v-model="commentText"></textarea>
            <br />
            <button @click="replay">提交评论</button>
        </p>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
const props = defineProps({
    userList: Array,
    userInfo: Object
})
let commentText = ref('')

const { setComment, changeUserInfo } = inject('commentMethods')

const replay = () => {
    // 提交评论
    let comment = {
        id: new Date().getTime(),
        pid: 0,
        uid: props.userInfo.id,
        userName: props.userInfo.name,
        content: commentText.value
    }
    setComment(comment, 0);
    commentText.value = ''
}
</script>

<style lang="scss">
.active {
    background-color: #000;
    color: #fff;
}
</style>