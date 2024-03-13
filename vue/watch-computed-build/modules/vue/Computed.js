export default class computed {
    constructor() {
        this.computedData = []
    }

    addComputed(vm, computed, key) {
        const descriptor = Object.getOwnPropertyDescriptor(computed, key),
            descriptorFn = descriptor.value.get
                ? descriptor.value.get
                : descriptor.value,
            value = descriptorFn.call(vm),
            get = descriptorFn.bind(vm),
            dep = this._collectDep(descriptorFn);

        this._addComputedProp({
            key,
            value,
            get,
            dep
        })

        // computed代理 将函数绑定到vm上
        const dataItem = this.computedData.find(item => item.key === key)

        Object.defineProperty(vm, key, {
            get: function () {
                return dataItem.value;
            },
            set: function (newValue) {
                dataItem.value = dataItem.get();
            }
        })
    }

    // 当依赖更新的时候
    update(key, watch) {
        this.computedData.map(item => {
            const dep = item.dep;
            const _key = dep.find(el => el === key);

            if (_key) {
                const oldValue = item.value;
                item.value = item.get();
                watch && watch(item.key, item.value, oldValue)
            }
        })
    }

    _addComputedProp(computedProp) {
        this.computedData.push(computedProp);
    }

    _collectDep(fn) {
        const method = fn.toString().match(/this\.(.+?)/g);
        return method.map(item => item.split('.')[1])
    }
}