import proxyData from "./proxy";
import observe from "./observe";

function initState(vm) {
    var options = vm.$options;

    if (options.data) {
        initData(vm);
    }
}

function initData(vm) {
    var data = vm.$options.data;

    vm._data = data = typeof data === 'function' ? data.call(vm) : data || {};

    for (var key in data) {
        (function (key) {
            proxyData(vm, '_data', key);
        })(key)
    }

    // 观察者
    observe(vm._data);
}

export {
    initState,
}