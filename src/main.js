import Vue from 'vue';
import App from '@/frontend/App.vue';
import router from '@/frontend/router';
import store from '@/frontend/store';
import vuetify from './frontend/plugins/vuetify';
import './frontend/plugins/fragment';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
