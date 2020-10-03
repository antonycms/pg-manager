import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/frontend/store';

Vue.use(VueRouter);

const routes = [
  {
    name: 'App',
    path: '/',
    redirect: () => {
      if (store.state.actualDatabase) {
        return '/manage-database';
      }
      return '/home';
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/manage-database',
    name: 'ManageDatabase',
    component: () =>
      import(
        /* webpackChunkName: "manageDatabase" */ '../views/ManageDatabase.vue'
      ),
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
