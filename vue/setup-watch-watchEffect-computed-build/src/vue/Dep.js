export default class Dep {
    constructor() {
        // 存放依赖
        this.effectMap = new WeakMap()
    }

    // 存入回调函数cb
    static effectCB = null;

    // 收集依赖
    collect(target, key) {
        // 使用class的静态方法
        const { effectCB } = Dep;

        if (effectCB) {
            // 获取WeakMap中对应的target的Map数据
            let depsMap = this.effectMap.get(target)

            if (!depsMap) {
                depsMap = new Map()
                this.effectMap.set(target, depsMap)
            }

            // 获取taget下的key对应存放的回调函数，只要这里的key发生改变就执行下面的方法
            let dep = depsMap.get(key)

            if (!dep) {
                dep = new Set()
                depsMap.set(key, dep)
            }

            dep.add(effectCB)
            console.log(this.effectMap);
        }
    }

    /**
     * 当页面中改变state下的值时，触发set，通知Dep下的notify方法；
     * 获取Dep下的effectMap，获取target下的key，获取key对应的dep；
     * 遍历dep下的所有涉及到这个state的回调函数，执行回调函数；
     */
    notify(target, key, value, oldValue) {
        const depMap = this.effectMap.get(target)

        if (!depMap) {
            return
        }

        const deps = depMap.get(key)
        deps.forEach(dep => {
            const newVal = dep(value, oldValue);
            if (dep.computedRef) {
                dep.computedRef.value = newVal;
            }
        });
    }
}