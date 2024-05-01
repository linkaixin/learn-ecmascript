const { reactive, toRefs } = Vue

export default function useReactive(initialState) {
    const reactiveState = reactive(initialState)
    const state = toRefs(reactiveState)

    const setInfo = (key, value) => {
        if (Object.prototype.toString.call(key) === '[object Object]') {
            for (let k in key) {
                if (reactiveState.hasOwnProperty(k)) {
                    reactiveState[k] = key[k]
                }
            }
        } else {
            if (typeof (value) === 'function') {
                reactiveState[key] = value()
            } else {
                reactiveState[key] = value
            }
        }
    }

    return [
        state,
        setInfo
    ]
}