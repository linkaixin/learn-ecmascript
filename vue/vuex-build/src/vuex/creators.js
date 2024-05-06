import { computed } from "vue"

/**
 * 为了在自定义的属性对象上赋予key: fn
 * @param {*} obj vuex下的mutations, actions, getters都是对象
 * @param {*} cb 得到对象中的方法与key值
 */
function forEachValueKey(obj, cb) {
    Object.keys(obj).forEach(key => cb(obj[key], key))
}

export function createMutations(store, mutations) {
    forEachValueKey(mutations, (mutationFn, mutationKey) => {
        /**
         * this._mutations[type](payload)
         * 
         * store.commit('xxx',payload)
         * 
         * addTodo(state, value) {
            },
         */
        store._mutations[mutationKey] = (payload) => {
            mutationFn.apply(store, [store.state, payload])
        }
    })
}

export function createActions(store, actions) {
    forEachValueKey(actions, (actionFn, actionKey) => {
        store._actions[actionKey] = (payload) => {
            /**
             * store.dispatch('xxx',payload)
             * 
             * this._actions[type](payload)
             * 
             *  addTodo({ commit }, value) {
                    commit('addTodo', value)
                },
             */
            actionFn.apply(store, [store, payload])
        }
    })
}

export function createCommit(store, commit) {
    store.commit = (type, payload) => {
        commit.apply(store, [type, payload])
    }
}

export function createDispatch(store, dispatch) {
    store.dispatch = (type, payload) => {
        dispatch.apply(store, [type, payload])
    }
}

// store.getters.xxx
export function createGetters(store, getters) {
    store.getters = {}
    forEachValueKey(getters, (getterFn, getterKey) => {
        const getterFnComputed = computed(()=> getterFn(store.state, store.getters))
        Object.defineProperty(store.getters, getterKey, {
            get() {
                return getterFnComputed.value;
            }
        })
    })
}