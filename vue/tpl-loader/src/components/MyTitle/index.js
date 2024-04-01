import './MyTitle.scss'
import MyTitleView from './MyTitle.tpl'

export default MyTitleView({
    data() {
        return {
            title: 'title',
            subTitle: 'subTitle'
        }
    },
    methods: {
        handleTitleClick(e) {
            console.log(e.target.innerText);
        }
    }
}, {
    template: true,
    data: true,
    methods: true
})