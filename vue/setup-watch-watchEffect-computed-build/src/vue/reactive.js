import Dep from "./Dep"
const dep = new Dep()

export function reactive(data) {
    return new Proxy(data, {
        get(target, key) {
            const value = Reflect.get(target, key)
            dep.collect(target, key)
            return value != null && typeof value === 'object' ? reactive(value) : value
        },
        set(target, key, value) {
            // 旧值
            const oldValue = target[key]
            if (oldValue === value) {
                return oldValue
            } else {
                const res = Reflect.set(target, key, value)
                dep.notify(target, key, value, oldValue)
                return res
            }
        }
    })
}