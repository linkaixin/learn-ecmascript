<template>
    <div>
        <comment-form :user-list="userList" :user-info="userInfo"></comment-form>
        <comment-list :list="commentData" :user-info="userInfo"></comment-list>
    </div>
</template>

<script setup>
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';
import comment from './comment';
import { provide } from 'vue'
// const { userList, userInfo, commentData, changeUserInfo, setComment } = comment()
// provide('commentMethods', {
//     setComment,
//     changeUserInfo
// })
import Comment from './commentClass';

const { userList, userInfo, commentData, changeUserInfo, setComment } = new Comment()
provide('commentMethods', {
    setComment,
    changeUserInfo
})
</script>

<style></style>