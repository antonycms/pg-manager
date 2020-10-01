import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'pg_manager',
  storage: window.localStorage,
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    databases: [],
    actualDatabase: null,
  },
  mutations: {
    SET_DATABASES(state, data) {
      state.databases = data;
    },
    SET_ACTUAL_DATABASE(state, data) {
      state.actualDatabase = data;
    },
  },
  actions: {},
  modules: {},
});
