import Vue from 'vue';
import App from '@/frontend/App.vue';
import router from '@/frontend/router';
import store from '@/frontend/store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
