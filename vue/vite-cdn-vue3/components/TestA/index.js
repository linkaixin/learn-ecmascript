import { createReactive } from "../../modules";

const template = `
    <ul class="list">
        <h1>{{ title }}</h1>
        {{ dateTime }}
        <for data="list" tag="li" class="item">
            <span>学生姓名：{ name }</span>
            <span>学生年龄：{ age }</span>
        </for>
    </ul>
`

function TestA() {
    const state = createReactive({
        title: '学生信息列表',
        dateTime: '2024-03-18',
        list: [{
            id: 1,
            name: '张三',
            age: 18
        }, {
            id: 2,
            name: '李四',
            age: 20
        }, {
            id: 3,
            name: '王五',
            age: 22
        }]
    })

    return [template, state]
}

export default TestA;