// import App from './App.vue'
// const app = Vue.createApp(App)
// app.mount('#app')
import {
    reactive,
    watchEffect,
    watch,
    computed
} from './vue'

const oABtn1 = document.querySelector('#aBtn1');
const oCBtn1 = document.querySelector('#cBtn1');
const oABtn2 = document.querySelector('#aBtn2');
const oCBtn2 = document.querySelector('#cBtn2');

const state1 = reactive({
    a: 1,
    b: {
        c: 2
    }
})

const state2 = reactive({
    a: 1000,
    b: {
        c: 2000
    }
})
oABtn1.addEventListener('click', () => {
    state1.a = 100;
}, false)

oCBtn1.addEventListener('click', () => {
    state1.b.c = 200;
}, false)

oABtn2.addEventListener('click', () => {
    state2.a = 10000;
}, false)

oCBtn2.addEventListener('click', () => {
    state2.b.c = 20000;
}, false)

const res1 = computed(() => {
    let val = state1.a + state1.b.c
    console.log("🚀 ~ res1:", val)
    return val
});
const res2 = computed(() => state2.a + state2.b.c);
console.log("🚀 ~ res2:", res2.value)

watchEffect(() => {
    console.log('watchEffect -> state1.a', state1.a);
})

watchEffect(() => {
    console.log('watchEffect -> state1.b.c', state1.b.c);
})

watchEffect(() => {
    console.log('watchEffect -> state2.a', state2.a);
})

watchEffect(() => {
    console.log('watchEffect -> state2.b.c', state2.b.c);
})

watch(() => state1.a, (newValue, oldValue) => {
    console.log('watch -> state1.a', state1.a, newValue, oldValue);
})

watch(() => state1.b.c, (newValue, oldValue) => {
    console.log('watch -> state1.b.c', state1.b.c, newValue, oldValue);
})

watch(() => state2.a, (newValue, oldValue) => {
    console.log('watch -> state2.a', state2.a, newValue, oldValue);
})

watch(() => state2.b.c, (newValue, oldValue) => {
    console.log('watch -> state2.b.c', state2.b.c, newValue, oldValue);
})