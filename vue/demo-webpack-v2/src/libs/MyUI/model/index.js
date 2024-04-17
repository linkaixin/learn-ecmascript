import model from './model.vue'

export default {
    install(Vue) {
        // 根组件实例
        let modelBox = null;

        Vue.component(model.name, model)

        Vue.prototype.$model = {
            show,
            hide
        }

        function show(props) {
            if (!modelBox) {
                // 新建根组件实例
                const ModelBox = Vue.extend({
                    render(h) {
                        return h('model', { props })
                    }
                })

                modelBox = new ModelBox();
                this.vm = modelBox.$mount();
                console.log("🚀 ~ show ~  this.vm :", this.vm)
                document.body.appendChild(this.vm.$el);
            }
        }
        function hide() {
            document.body.removeChild(this.vm.$el);
            // 销毁实例
            modelBox.$destroy();
            modelBox = null;
            this.vm = null;
        }
    }
}