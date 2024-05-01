const { ref } = Vue;
// 缓存池
const states = [];
const stateSetters = [];
let stateIndex = 0;

export default function useState(initialState) {
    states[stateIndex] = createState(initialState, stateIndex);

    if (!stateSetters[stateIndex]) {
        stateSetters[stateIndex] = createStateSetter(stateIndex);
    }

    const _state = states[stateIndex]
    const _setState = stateSetters[stateIndex]

    console.log(states, stateSetters[stateIndex]);
    stateIndex++;

    return [
        _state,
        _setState
    ]
}

/**
 * 创建ref响应式数据，并存入states缓存池
 * @param {*} initialState ref声明的值
 * @param {*} stateIndex states缓存池的索引
 * @returns 
 */
function createState(initialState, stateIndex) {
    const state = ref(initialState);

    return states[stateIndex] != undefined ? states[stateIndex] : state;
}

function createStateSetter(stateIndex) {
    return function (newState) {
        if (typeof newState == 'function') {
            states[stateIndex].value = newState(states[stateIndex])
        } else {
            states[stateIndex].value = newState;
        }
    }
}