const { ref } = Vue;

export default function useState(initialValue) {
    const state = createState(initialValue);
    const setState = createStateSetter(state);

    return [
        state,
        setState
    ]
}

function createState(initialState) {
    return ref(initialState);
}

function createStateSetter(state) {
    return function (args) {
        if (typeof (args) === 'function') {
            state.value = args(state);
        } else {
            state.value = args;
        }
    }
}