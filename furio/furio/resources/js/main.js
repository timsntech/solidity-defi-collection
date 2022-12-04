// Bootstrap
import "bootstrap";
// Axios
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Web3
import Web3 from "web3";
window.web3 = new Web3();
// Vue
import { createApp } from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";
import App from "./App.vue";
import router from "./router";
import store from "./store";
createApp({
    components: {
        App,
    }
}).use(router).use(store).use(VueReCaptcha).mount('#app');
