import qs from 'qs';

const app = Vue.createApp({
    data() {
        return {
            myResult: [],
            question: {},
            order: 0,
            answerIndex: -1
        }
    },
    template: `
        <div>
            <div v-if="myResult.length > 0">
                <h1>考试结果</h1>
                <ul>
                    <li
                        v-for="(item, index) of myResult"
                        :key="item.qid"
                    >
                        <h2>编号：{{ item.qid }}</h2>
                        <p>题目：{{ item.question }}</p>
                        <p>你的答案：{{ item.myAnswer }}</p>
                        <p>正确答案：{{ item.rightAnswer }}</p>
                        <p>正确：{{ isRightText(item.isRight) }}</p>
                    </li>
                </ul>
            </div>
            <div v-else>
                <h1>编号：{{question.id}}</h1>
                <p>{{question.question}}</p>
                <div>
                    <button 
                        v-for="(item,index) of question.items"
                        :key="item.id"
                        @click="next(index)"
                    >
                        {{item}}
                    </button>
                </div>
            </div>
        </div>
    `,
    watch: {
        order(newValue, oldValue) {
            console.log(this.answerIndex, 33);
            this.uploadAnswer(oldValue, this.answerIndex);
            this.getQuestion(newValue);
        }
    },
    computed: {
        isRightText() {
            return function (isRight) {
                return isRight ? '正确' : '错误'
            }
        }
    },
    mounted() {
        this.getQuestion(this.order);
    },
    methods: {
        getQuestion(order) {
            axios.post('http://localhost:8888/getQuestion', qs.stringify({
                order
            })).then(res => {
                var res = res.data;
                if (res.error_code) {
                    this.myResult = res.data;
                }
                this.question = res.data;
            })
        },
        uploadAnswer(order, answerIndex) {
            axios.post('http://localhost:8888/uploadAnswer', qs.stringify({
                order,
                myAnswer: answerIndex
            })).then(res => {

            })
        },
        next(index) {
            this.order++;
            this.answerIndex = index;
        }
    }
})

const vm = app.mount('#app')