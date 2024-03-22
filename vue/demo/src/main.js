/**
 * 数据双向绑定 v-model="数据来源data" 语法糖
 * 适用元素：input textarea select checkbox radio
 * v-model / 会忽略value|chencked|selected
 */

const App = {
    data() {
        return {
            str1: '',
            str2: ''
        }
    },
    template: `
    <p>
        {{str1.length}}
        {{str2.length}}
        <input type="text" v-model="str1">
        <input type="text" v-model.trim="str2">
    </p>
  `,
    methods: {

    }
}

Vue.createApp(App).mount('#app')