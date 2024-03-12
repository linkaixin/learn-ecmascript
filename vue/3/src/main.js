// import App from './App.vue';

const { createApp } = Vue;

const Article = {
    data() {
        return {
            title: 'This is a title',
            author: '张三',
            dateTime: '2024-02-26 10:39',
            content: 'This is a content',
            like: 0,
            commentFlag: true,
            comment: '',
            commentList: [],
            // todoList
            todoList: []
        }
    },
    methods: {
        addLike() {
            this.like++;
        },
        changeFlag() {
            this.commentFlag = !this.commentFlag;
        },
        addComment() {
            this.commentList.push({
                id: new Date().getTime(),
                time: new Date().getTime(),
                content: this.comment
            });
            this.comment = '';
        },
        // todolist 方法
        addTodoList(value) {
            this.todoList.push({
                id: new Date().getTime(),
                content: value,
                complate: false
            })
        },
        delTodoList(id) {
            console.log(id, 111);
            this.todoList = this.todoList.filter(item => item.id !== id);
        },
        changeComplate(id) {
            this.todoList.forEach(item => {
                if (item.id == id) {
                    item.complate = !item.complitate;
                }
            })
        }
    }
}


const app = createApp(Article);

app.component('todo-from', {

    data() {
        return {
            inputValue: ''
        }
    },
    template: `
    <div>
        <input type="text" v-model="inputValue" />
        <button @click="add">提交</button>
    </div>
`,
    methods: {
        add() {
            this.$emit('add-todo', this.inputValue)
            this.inputValue = ''
        }
    }
})

app.component('todo-list', {
    props: ['list'],
    data() {
        return {

        }
    },
    template: `
        <div>
            <ul>
                <li v-for="item in list" :key="item.id">
                    <input type="checkbox" :checked="item.complate" @click="changeComplate(item.id)" />
                    <span :style="{textDecoration: item.complate ? 'line-through': 'none'}">{{item.content}}</span>
                    <button @click="del(item.id)">删除</button>
                </li>
            </ul>
        </div>
    `,
    methods: {
        changeComplate(id) {
            this.$emit('change-complate', id)
        },
        del(id) {
            this.$emit('del-todo-list', id)
        }
    }
})

app.mount('#app')