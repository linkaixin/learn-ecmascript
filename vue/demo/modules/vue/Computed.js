export default class Computed {
    constructor() {
        this.computedData = []
    }

    addComputed(vm, computed, key) {
        let descriptor = Object.getOwnPropertyDescriptor(computed, key),
            descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value,
            value = descriptorFn.call(vm),
            get = descriptorFn.bind(vm),
            dep = this._collectDeps(descriptorFn);

        this._addComputedProp({
            key,
            value,
            get,
            dep
        })

        const dataItem = this.computedData.find(item => item.key === key);

        if (dataItem) {
            Object.defineProperty(vm, key, {
                get: function () {
                    return dataItem.value;
                },
                set: function (newVal) {
                    dataItem.value = dataItem.get();
                }
            })
        }
    }

    update(key, watch) {
        this.computedData.map(item => {
            let dep = item.dep;
            if (dep.includes(key)) {
                const oldValue = item.value;
                item.value = item.get();
                watch && watch(item.key, item.value, oldValue);
            }
        })
    }

    _collectDeps(fn) {
        const arr = fn.toString().match(/this\.(.+?)/g);
        return arr.map(item => item.split('.')[1])
    }

    _addComputedProp(data) {
        this.computedData.push(data);
    }
}