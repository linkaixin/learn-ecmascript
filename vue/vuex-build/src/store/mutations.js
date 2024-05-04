export default {
    addTodo(state, value) {
        state.todoList.push({
            id: new Date().getTime(),
            content: value,
            complated: false
        })
    },
    toggleTodo(state, id) {
        state.todoList = state.todoList.map(todo => {
            if (todo.id == id) {
                todo.complated = !todo.complated
            }
            return todo
        })
    },
    removeTodo(state, id) {
        state.todoList = state.todoList.filter(todo => todo.id != id)
    },
    handleFilter(state, type) {
        state.filter = type
    }
}