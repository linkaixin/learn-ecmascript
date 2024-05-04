import { reactive } from "vue";
import { createMutations, createActions, createCommit, createDispatch, createGetters } from './creators'

export default class Store {
    constructor(options) {
        const { state, mutations, actions, getters } = options;

        const store = this;
        const { commit, dispatch } = store;

        store._state = reactive({ data: state });

        // vuex/store实例下_mutations与_atcions下没有原型链，也不想让他们继承到其他方法
        store._mutations = Object.create(null);
        store._actions = Object.create(null);

        createMutations(store, mutations)
        createActions(store, actions)
        createCommit(store, commit)
        createDispatch(store, dispatch)
        createGetters(store, getters)
    }


    // store.state.xxx
    get state() {
        return this._state.data;
    }

    // 使用mutations 通过使用commit
    // store.commit('xxx',payload)
    commit(type, payload) {
        this._mutations[type](payload)
    }

    // 使用actions 通过使用dispatch
    // store.dispatch('xxx',payload)
    dispatch(type, payload) {
        this._actions[type](payload)
    }

    install(app) {
        app.provide('store', this);
        app.config.globalProperties.$store = this;
    }
}