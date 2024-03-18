import Vue from 'vue';

const App = {
    data() {
        return {
            list: [{
                id: 1,
                value: 'item-1',
            },
            {
                id: 2,
                value: 'item-2',
            },
            {
                id: 3,
                value: 'item-3',
            },
            ],
            arr: [1, 2, 3]
        }
    },
    template: `
    <div>
      <ul>
        <li v-for="(item,index) of list" :key="item.id">
            <span>{{ item.value }}</span>
            <input type="text" :value="arr[index]" />
            <button @click="deleteItem(index)">DELETE</button>
        </li>
      </ul>
    </div>
  `,
    methods: {
        deleteItem(index) {
            this.list.splice(index, 1);
        }
    },
}

new Vue({
    render: h => h(App)
}).$mount('#app');