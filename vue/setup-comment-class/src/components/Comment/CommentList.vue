<template>
    <div>
        <ul>
            <li v-for="item of list" :key="item.id">
                <p>{{ item.userName }}</p>
                <p>{{ item.content }}</p>
                <p>
                    <a href="JavaScript:;" @click="repaly(item)">回复</a>
                </p>
                <div v-if="item.replayFlag">
                    <p>
                        <textarea v-model="item.replayText"></textarea>
                        <br />
                        <button @click="replyComment(item)">回复</button>
                    </p>
                </div>
                <div v-if="item.children && item.children.length > 0">
                    <comment-list :list="item.children" :user-info="userInfo"></comment-list>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { inject } from "vue"

const props = defineProps({
    list: Array,
    userInfo: Object
})

const repaly = (item) => {
    item.replayFlag = !item.replayFlag
}

const { setComment } = inject('commentMethods')

const replyComment = (item) => {
    if (!item.replayText || item.replayText.trim() == '') return;

    let comment = {
        id: new Date().getTime(),
        pid: item.id,
        uid: props.userInfo.id,
        userName: props.userInfo.name,
        content: item.replayText
    }
    setComment(comment, item.id)
    item.replayFlag = false
}
</script>

<style></style>