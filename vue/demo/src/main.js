/**
 * 实现computed与watch
 * 
 * 1. data数据劫持，实现响应式
 *  get vm[key] -> vm.$data[key]
 *  set vm[key] -> vm.$data[key] = newValue
 *      ? -> updateComputedProp -> value
 *      ? -> updateWatchProp -> callback
 * 
 *  computed -> props ->{
 *      key
 *      value -> get -> value
 *      get -> fn
 *      dep -> [a, b]
 * }
 * 
 *  watch -> props -> fn ->data set -> call fn
 */
import { reactive } from "../modules/vue/reactive";
import Computed from "../modules/vue/Computed";
import Watch from "../modules/vue/Watch";

class Vue {
    constructor(options) {
        const { data, computed, watch } = options;
        this.$data = data();
        this._init(this, computed, watch)
    }

    _init(vm, computed, watch) {
        this.initData(vm);
        let computedIns = this.initComputed(vm, computed)
        let watchIns = this.initWatch(vm, watch)

        this.$computed = computedIns.update.bind(computedIns);
        this.$watch = watchIns.invoke.bind(watchIns);
    }

    initData(vm) {
        reactive(vm, () => {

        }, (key, newValue, oldValue) => {
            // console.log(key, newValue, oldValue);
            if (newValue === oldValue) {
                return;
            }
            this.$computed(key, this.$watch)
            this.$watch(key, newValue, oldValue)
        })
    }

    initComputed(vm, computed) {
        const computedIns = new Computed;

        for (let key in computed) {
            computedIns.addComputed(vm, computed, key);
        }

        return computedIns;
    }

    initWatch(vm, watch) {
        const watchIns = new Watch;

        for (let key in watch) {
            watchIns.addWatch(vm, watch, key);
        }

        return watchIns;
    }
}


const vm = new Vue({
    data() {
        return {
            a: 1,
            b: 2,
        }
    },
    computed: {
        total() {
            console.log('computed invoke');
            return this.a + this.b;
        }
    },
    watch: {
        total(newVal, oldVal) {
            console.log('total', newVal, oldVal);
        },
        a(newVal, oldVal) {
            console.log('a', newVal, oldVal);
        },
        b(newVal, oldVal) {
            console.log('b', newVal, oldVal);
        }
    }
})
console.log(vm);
console.log(vm.a);

console.log(vm.total);
console.log(vm.total);
console.log(vm.total);

vm.a = 100;

console.log(vm.total);
console.log(vm.total);
console.log(vm.total);

vm.b = 200;

console.log(vm.total);
console.log(vm.total);
console.log(vm.total);
