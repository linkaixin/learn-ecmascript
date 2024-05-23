import { routerTree } from "@/libs/utils";
import { getUserRouters } from "@/services"

export default {
    async setUserRouters({ commit, state }) {
        const userRouters = await getUserRouters(state.uid);
        const payload = routerTree(userRouters)
        commit('setUserRouters', payload)
        commit('setAuth', true)
    }
}