import { ADD, COMPLATED, DEL } from "./type"
const { ref } = Vue

export default function todoListHook() {
    let list = ref([])

    const setTodoList = (type, arg) => {
        switch (type) {
            case ADD:
                list.value.push({
                    id: new Date().getTime(),
                    title: arg,
                    complated: false,
                })
                break;
            case COMPLATED:
                list.value.map((item) => {
                    if (item.id === arg) {
                        item.complated = !item.complated
                    }
                })
                break;
            case DEL:
                list.value = list.value.filter((item) => item.id != arg)
                break;
            default:
                break;
        }
    }

    return {
        list,
        setTodoList
    }
}