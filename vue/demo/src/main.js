import App from './App.vue'
import VModel from './components/VModel.vue'
const { createApp, h } = Vue
const app = createApp({
    components: {
        VModel
    },
    data() {
        return {
            username: "",
            password: ""
        }
    },
    render() {
        return h(VModel, {
            username: this.username,
            password: this.password,
            'onUpdate:username': (value) => this.username = value,
            'onChangePassword': (value) => this.password = value,
            'onSubmit': () => {
                console.log(this.username, this.password);
            }
        })
    }
})
app.mount('#app')