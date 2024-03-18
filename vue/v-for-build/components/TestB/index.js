import { createReactive } from "../../modules";

const template = `
    <ul class="list">
        <h1>{{ title }}</h1>
        {{ dateTime }}
        <for data="list" tag="li" class="item">
            <span>老师姓名：{ name }</span>
            <span>老师年龄：{ age }</span>
        </for>
    </ul>
`

function TestB() {
    const state = createReactive({
        title: '老师信息列表',
        dateTime: '2024-03-18',
        list: [{
            id: 1,
            name: '小红',
            age: 38
        }, {
            id: 2,
            name: '小蓝',
            age: 30
        }, {
            id: 3,
            name: '小紫',
            age: 32
        }]
    })

    return [template, state]
}

export default TestB;