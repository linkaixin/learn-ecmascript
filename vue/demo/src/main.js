/**
 * v-for 列表渲染
 * v-for="指令表达式"
 * (item, index) in/of list
 * index是可选项
 * 
 * for(item, index) in -> 对象属性的枚举
 * for(value, key, index) of -> 可迭代对象的遍历
 * 
 * :key 
 * v-for 建议搭配key，key属性必须是唯一的值
 * 方便vue的就地更新策略的实施
 */

const App = {
    data() {
        return {
            list: [{
                id: 1,
                name: '张三',
                score: 90
            },
            {
                id: 2,
                name: '李四',
                score: 30
            },
            {
                id: 3,
                name: '王五',
                score: 60
            }],
            info: {
                name: '张三',
                age: 18,
                hobbies: ['篮球', '足球', '乒乓球']
            }
        }
    },
    template: `
        <ul>
            <li v-for="item of list" :key="item.id">
                <span>No.{{ item.id }}</span>
                <span>Name:{{ item.name }}</span>
            </li>
        </ul>
        <ul>
            <li v-for="(value,key,index) of info" :key="index">
                <template v-if="key == 'hobbies'">
                    <ul>
                        <li v-for="(item, i) of value" :key="i">
                            <span>No.{{ i + 1 }}</span>
                            <span>:{{ item }}</span>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    {{ key }}:{{ value }}
                </template>
            </li>
        </ul>

        <ul>
            <li v-for="item of computedList" :key="item.id">
                <span>No.{{ item.id }}</span>
                <span>Name:{{ item.name }}</span>
                <span :style="{ color: item.pass ? 'green' : 'red' }">Pass:{{ item.pass ? 'true' : 'false' }}</span>
            </li>
        </ul>
    `,
    computed: {
        computedList() {
            return this.list.map(item => {
                item.pass = item.score >= 60
                return item
            })
        }
    }
}

Vue.createApp(App).mount('#app')