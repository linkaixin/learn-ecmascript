import useState from "./useState";

export default function useReducer(fn, initialState) {
    const [state, setState] = useState(initialState);

    // 将fn中的函数传入setState中
    const dispatch = (action) => {
        fn(state, setState, action);
    }

    return [
        state,
        dispatch
    ]
}