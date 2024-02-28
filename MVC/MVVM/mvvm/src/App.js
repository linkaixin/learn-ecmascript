import { userDOM, useReactive } from '../MVVM';
// 写了数据、方法、模版
function App() {
    const state = useReactive({
        count: 0,
        name: 'zs'
    });

    const add = (num) => {
        state.count += num;
        console.log(state);
    }
    const minus = (num) => {
        state.count -= num;
        console.log(state);

    }
    const changeName = (name) => {
        state.name = name;
        console.log(state);

    }

    return {
        template: `
            <h1>{{ count }}</h1>
            <h2>{{ name }}</h2>
            <button onClick="add(2)">+</button>
            <button onClick="minus(1)">-</button>
            <button onClick="changeName('ls')">change Name</button>
        `,
        state,
        methods: {
            add,
            minus,
            changeName
        }
    }
}

userDOM(
    App(),
    document.querySelector('#app')
)