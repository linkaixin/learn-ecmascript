import { update } from "./render";

export default class Ref {
    constructor(initialValue) {
        // 依赖设计到节点存放在deps中
        this.deps = new Set();
        // 重置的数据，不改变
        this._defaultValue = initialValue;
        // 改变的数据，触发劫持
        this._value = initialValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        this._value = newValue
        update(this)
    }

    // 在原型上绑定$reset方法
    $reset() {
        this.value = this._defaultValue;
    }
}