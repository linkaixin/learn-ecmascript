/**
 * v-for与v-if
 * 不推荐在一个元素上同时使用
 */

const App = Vue.createApp({
    data() {
        return {
            list: [
                { id: 1, name: '张三', show: true },
                { id: 2, name: '李四', show: false },
                { id: 3, name: '王五', show: true },
            ]
        }
    },
    template: `
        <ul>
           <li v-for="item in filteredList" :key="item.id">{{ item.name }}</li>
        </ul>
    `,
    computed: {
        filteredList() {
            return this.list.filter(item => item.show);
        }
    }
})

App.mount('#app')