export default {
    getFinished(state) {
        return state.todoList.filter(item => item.complated)
    },
    getUnfinished(state) {
        return state.todoList.filter(item => !item.complated)
    },
    getFilterTodoList(state, getters) {
        switch (state.filter) {
            case 'finished':
                return getters.getFinished;
            case 'unfinished':
                return getters.getUnfinished;
            default:
                return state.todoList;
        }
    }
}