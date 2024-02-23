const App = {
    data() {
        return {
            text: 'hello vue2'
        }
    },
    template: `
        <div>
            <h1>{{text}}</h1>
            <button @click="changeText">changeText</button>
        </div>
    `,
    methods: {
        changeText() {
            this.text = 'hello vite'
        }
    },
}

new Vue({
    render: h => h(App),
}).$mount('#app')