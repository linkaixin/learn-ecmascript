function proxyData(vm, target, key) {
    Object.defineProperty(vm, key, {
        get: function () {
            return vm[target][key];
        },
        set: function (newValue) {
            vm[target][key] = newValue;
        }
    })
}

export default proxyData;