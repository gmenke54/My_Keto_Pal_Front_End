import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

axios.defaults.baseURL = 'https://ketosis-backend.herokuapp.com';

createApp(App).use(store).use(router).mount('#app');
