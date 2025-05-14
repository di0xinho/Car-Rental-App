import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import useUser from './composables/useUser';
import useCarPreferences from './composables/useCarPreferences';

// Fetch user at application start
// https://fadamakis.com/data-fetching-in-vue-4b0faf0e88b7
const user = await useUser().initializeUser();
if (user) useCarPreferences().setRecommendedCarsCluster(user.recommended_cluster);

const app = createApp(App);

app.use(router);

app.mount('#app');
