import Dep from './Dep.js'
import ComputedRef from './ComputedRef';

export function watchEffect(cb) {
    Dep.effectCB = cb;
    cb();
    Dep.effectCB = null;
}

export function watch(source, cb) {
    Dep.effectCB = cb;
    // 收集依赖
    source()
    Dep.effectCB = null;
}

export function computed(cb) {
    Dep.effectCB = cb;
    const value = cb();
    const computedRef = new ComputedRef(value);
    Object.defineProperty(cb, 'computedRef', {
        value: computedRef
    })
    Dep.effectCB = null;

    return computedRef;
}