export default class Watch {
    constructor() {
        this.watchData = []
    }

    addWatch(vm, watch, key) {
        this._addWatchProp({
            key,
            fn: watch[key].bind(vm)
        })
    }

    invoke(key, newValue, oldValue) {
        this.watchData.map(item => {
            if (item.key === key) {
                item.fn(newValue, oldValue)
            }
        })
    }

    _addWatchProp(data) {
        this.watchData.push(data)
    }
}