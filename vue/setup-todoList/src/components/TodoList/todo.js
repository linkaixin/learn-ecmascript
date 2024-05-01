// todoList的逻辑都放在这
import {
    getTodoService,
    addTodoService,
    toggleTodoService,
    removeTodoService
} from '@/api/todo'

import { ref, computed, watch, } from 'vue'

export function useTodoList() {
    let todoData = ref([]);
    let todoCount = computed(() => todoData.value.length)

    const getTodo = () => {
        getTodoService().then(res => todoData.value = res)
    }

    const addTodo = async (value) => {
        let todo = {
            id: new Date().getTime(),
            content: value,
            complated: false
        }

        try {
            await addTodoService(todo)
            todoData.value.push(todo)
            console.log(todoData.value);
        } catch (error) {

        }
    }

    const toggleTodo = async (id) => {
        try {
            await toggleTodoService(id)
            todoData.value = todoData.value.map(item => {
                if (item.id === id) {
                    item.complated = !item.complated
                }
                return item
            })
        } catch (error) {

        }
    }

    const removeTodo = async (id) => {
        try {
            await removeTodoService(id)
            todoData.value = todoData.value.filter(item => item.id !== id)
        } catch (error) {

        }
    }

    getTodo()

    return {
        todoData,
        todoCount,
        addTodo,
        toggleTodo,
        removeTodo
    }
}