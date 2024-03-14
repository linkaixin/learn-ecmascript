/**
 * class style视图绑定
 * v-bind: 在标签上绑定属性
 * v-bind:class v-bind:style -> :class/:style
 * vue对v-bind:class/style进行了特殊的封装，形式是比较多的，对象和数组的绑定方式
 */

import './main.scss'
const MyBox = {
    data() {
        return {
            isTop: true,
            isBottom: true,
            classObj: {
                top: true,
                'bottom': true
            },
            showTop: 'top',
            showBottom: 'bottom',
            fontStyle: {
                color: '#fff'
            },
            bgStyle: {
                backgroundColor: 'red'
            }
        }
    },
    computed: {
        computedObj() {
            return {
                top: this.isTop,
                bottom: this.isTop && this.isBottom
            }
        }
    },
    template: `
        <!--<div class="box top bottom">-->
        <!--<div 
            class="box"
            :class="{
                top: isTop,
                'bottom': isBottom
            }"
        >-->
        <!--<div
            class="box"
            :class="classObj"
        >-->
        <!--<div
            class="box"
            :class="computedObj"
        >-->
        <!--<div
            :class="['box', showTop, showBottom]"
        >-->
        <!--<div
            :class = "[
                'box',
                isTop ? 'top' : '',
                isTop && isBottom ? 'bottom' : ''
            ]"
        >-->
        <!--<div :class="[
            $attrs.class
        ]">-->
        <!--<div 
            :style="{
                color: '#fff',
                // backgroundColor: 'red'
                'background-color': 'red'
            }"
        >-->
        <!--<div :style="bgStyle">-->
        <!--<div :style="[fontStyle, bgStyle]">-->
        <div :style="{
            display: ['-webkit-box','-webkit-flex','flex'],
            '-webkit-transition':'all .3s'
        }">
            <div class="t-box">top box</div>
            <div class="b-box">bottom box</div>
        </div>
        <div></div>
    `,
    mounted() {
        // $attrs($attributes) -> 父组件通过调用组件时传递的属性集合
        console.log(this);
    }
}

const App = {
    components: {
        MyBox
    },
    data() {
        return {
            cBlue: 'c-blue'
        }
    },
    template: `
        <My-Box :class="cBlue"></My-Box>
    `
}

Vue.createApp(App).mount('#app')