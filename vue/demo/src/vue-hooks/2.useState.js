const { ref } = Vue;
// 存放响应式的值
let states = [];
// 存放对应的方法函数
let stateSetters = [];
// 缓存池的索引
let stateIndex = 0;

export default function useState(initialState) {
    states[stateIndex] = createState(initialState, stateIndex);

    if (!stateSetters[stateIndex]) {
        stateSetters[stateIndex] = createStateSetter(stateIndex);
    }

    const _state = states[stateIndex];
    const _setState = stateSetters[stateIndex];
    stateIndex++;

    return [_state, _setState]
}

function createState(initialState, stateIndex) {
    const state = ref(initialState);

    return states[stateIndex] != undefined ? states[stateIndex] : state
}

function createStateSetter(stateIndex) {
    return function (args) {
        if (typeof (args) === 'function') {
            console.log("🚀 ~ args:", args)
            states[stateIndex].value = args(states[stateIndex])
        } else {
            states[stateIndex].value = args
        }
    }
}