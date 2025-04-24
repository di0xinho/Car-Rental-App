import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import useUser from './composables/useUser';

// Fetch user at application start
// https://fadamakis.com/data-fetching-in-vue-4b0faf0e88b7
await useUser().initializeUser();

const app = createApp(App);

app.use(router);

app.mount('#app');
