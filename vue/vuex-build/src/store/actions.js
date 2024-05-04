export default {
    // 记录异步操作
    addTodo({ commit }, value) {
        commit('addTodo', value)
    },
    toggleTodo({ commit }, id) {
        commit('toggleTodo', id)
    },
    removeTodo({ commit }, id) {
        commit('removeTodo', id)
    }
}