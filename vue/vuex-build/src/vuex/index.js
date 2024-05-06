import { inject } from "vue";
import Store from "./Store";

export function createStore(options) {
    return new Store(options);
}

export function useStore() {
    return inject('store')
}
