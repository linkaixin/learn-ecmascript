import { createApp } from '../modules';

import TestA from '../components/TestA';
import TestB from '../components/TestB';

const app = createApp({
    components: [
        TestA,
        TestB
    ]
});


app.mount('#app');