import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.less';
import 'uno.css'

const app = createApp(App);
app.use(ArcoVue);
app.mount('#app');
