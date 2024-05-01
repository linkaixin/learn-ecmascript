// import App from './App.vue'
// const app = Vue.createApp({})
// app.mount('#app')

import {
    createApp,
    ref
} from '../vue/index.js'

createApp('#app', {
    refs: {
        title: ref('THIS IS TITLE'),
        content: ref('THIS IS CONTENT')
    },
    methods: {
        setTitle() {
            this.title.value = '这是标题'
        },
        setContent() {
            this.content.value = '这是内容'
        },
        reset() {
            this.title.$reset();
            this.content.$reset();
        }
    }
})