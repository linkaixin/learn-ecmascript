import { reactive } from "../modules/vue/reactive";
import { isObject } from "../modules/vue/utils";
import { compileAttr } from "../modules/vue/compile";
import './main.scss'

class Vue {
    constructor(options) {
        const { el, data, template } = options;
        this.$data = data();
        this.$el = document.querySelector(el);
        this.$stylePool = new Map();

        this.init(this, template);
    }

    init(vm, template) {
        this.initData(vm)
        this.render(vm, template);

        console.log(this.$stylePool, 111);
    }

    initData(vm) {
        const _data = vm.$data;

        if (isObject(_data)) {
            reactive(vm, _data)
        }
    }

    render(vm, template) {
        const container = document.createElement('div');
        container.innerHTML = template;
        this.compileAttrs(vm, container);
        this.$el.appendChild(container);
    }

    compileAttrs(vm, container) {
        const allNodes = [...container.getElementsByTagName('*')];

        allNodes.forEach(el => {
            const attrs = [...el.attributes];

            attrs.forEach(attr => {
                const { name, value } = attr;
                compileAttr(vm, el, name, value);
            })

            el.removeAttribute(':class');
            el.removeAttribute(':style');
        })
    }
}

const vm = new Vue({
    el: '#app',
    data() {
        return {
            isShow: true,
            hasError: false,
            titleStyle: {
                color: '#fff',
                fontSize: '20px'
            },
            titleShow: true,
            isContentBig: true,
            subTitleColor: 'orange'
        }
    },
    template: `
        <div
            :class="[
                'box',
                isShow ? 'show' : '',
                hasError ? 'danger' : ''
            ]"
        >
        <h1
            :style="[
                titleStyle,
                {
                    display: titleShow ? 'block' : 'none'
                }
            ]"
        >
            This is Title
        </h1>
        <h2
            :style="{
                display: titleShow ? 'block' : 'none',
                color: subTitleColor,
                fontSize: '20px'
            }"
        >
            This is Sub Title
        </h2>
        <p
            :class="{
                danger: hasError,
                big: isContentBig
            }"
        >
            This is CONTENT
        </p>
        </div>
    `
})

console.log(vm);

vm.hasError = true;
vm.subTitleColor = 'purple'