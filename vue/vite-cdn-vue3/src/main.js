const { createApp, ref } = Vue;

const App = {
    template: `
        <div>
            <h1>{{ text }}</h1>
            <button @click="changeText">change text</button>
        </div>
    `,
    setup() {
        const text = ref('hello vue3')
        const changeText = () => {
            text.value = 'hello vite!!!'
        }
        return {
            text,
            changeText
        }
    }
}


createApp(App).mount('#app')