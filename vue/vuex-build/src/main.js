import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

function createA(store, a) {
    store.a = () => {
        a.apply(store)
    }
}

class A {
    constructor() {
        const { a } = this;
        createA(this, a);
    }

    a() {
        console.log(this);
    }
}

const { a } = new A();
(function () {
    a();
}())