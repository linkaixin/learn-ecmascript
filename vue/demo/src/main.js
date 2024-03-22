const MyNav = {
    props: ['navData'],
    template: `
        <ul>
            <li v-for="item in navData" :key="item.id">{{ item.name }}</li>
        </ul>
    `
}

const MyHeader = {
    props: ['navData'],
    components: {
        MyNav
    },
    template: `
        <header>
            <my-nav :nav-data="navData"></my-nav>
            <my-search></my-search>
        </header>
    `
}

const App = {
    // 局部注册
    data() {
        return {
            navData: [{
                id: 1,
                name: '首页'
            }, {
                id: 2,
                name: '产品'
            }]
        }
    },
    components: {
        MyHeader
    },
    template: `
        <div>
            <my-header :nav-data="navData"></my-header>
        </div>
    `
}

const app = Vue.createApp(App)
app.component('my-search', {
    data() {
        return {
            value: ''
        }
    },
    template: `
        <input v-model="value" />    
    `
})

app.mount('#app')