// style
import './style.css';
import '@babel/polyfill';
import 'url-search-params-polyfill';

// main
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import VueClickAway from 'vue3-click-away';
import main from './hamburger';


// app
createApp(App)
  .use(router)
  .use(VueClickAway)
  .mount('#app')

main();
document.querySelector("#footer-year").innerText = new Date().getFullYear();
