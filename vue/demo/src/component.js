import { defineAsyncComponent } from 'vue'
import Loading from './components/Loading.vue'
import Error from './components/Error.vue'

export const Intro = defineAsyncComponent({
    loadingComponent: Loading,
    errorComponent: Error,
    delay: 0,
    loader: () => new Promise(resole => setTimeout(() => resole(import(/* webpackChunkName: "Intro" */'./components/Intro.vue')), 1000))
})

export const Article = defineAsyncComponent({
    loadingComponent: Loading,
    errorComponent: Error,
    delay: 0,
    loader: () => new Promise(resole => setTimeout(() => resole(import(/* webpackChunkName: "Article" */'./components/Article.vue')), 1000))
})

export const List = defineAsyncComponent({
    loadingComponent: Loading,
    errorComponent: Error,
    delay: 0,
    loader: () => new Promise(resole => setTimeout(() => resole(import(/* webpackChunkName: "List" */'./components/List.vue')), 1000))
})