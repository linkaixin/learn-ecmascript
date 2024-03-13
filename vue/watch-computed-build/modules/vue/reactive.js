export function reactive(vm, __get__, __set__) {
    const _data = vm.$data;

    for (const key in _data) {
        Object.defineProperty(vm, key, {
            get: function () {
                __get__(key, _data[key])
                return _data[key];
            },
            set: function (newValue) {
                const oldVlaue = _data[key]
                _data[key] = newValue;
                __set__(key, newValue, oldVlaue);
            }
        })
    }
}

