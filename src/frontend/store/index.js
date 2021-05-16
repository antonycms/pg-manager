import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { v4 as uuidv4 } from 'uuid';

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
    actualTable: null,
    activeTab: 'database',
    active_theme: 'LIGHT',
    showSqlEditor: false,
    widthSidebar: 269,
  },
  mutations: {
    SET_DATABASES(state, data) {
      state.databases = data;
    },
    SET_ACTUAL_DATABASE(state, data) {
      state.actualDatabase = data;
    },
    SET_ACTUAL_TABLE(state, data) {
      state.actualTable = data;
    },
    SET_ACTIVE_TAB(state, data) {
      state.activeTab = data;
    },
    SET_ACTIVE_THEME(state, dark) {
      if (dark) {
        state.active_theme = 'DARK';
        return;
      }

      state.active_theme = 'LIGHT';
    },
    SET_SHOW_SQL_EDITOR(state, data) {
      state.showSqlEditor = data;
    },
    SET_WIDTH_SIDEBAR(state, data) {
      state.widthSidebar = data;
    },
  },
  actions: {
    saveNewDatabase(context, data) {
      const database = { ...data, id: uuidv4() };

      context.commit('SET_DATABASES', [...context.state.databases, database]);
    },

    removeDatabase(context, databaseID) {
      const newArrDatabases = context.state.databases.filter(
        db => db.id !== databaseID,
      );

      context.commit('SET_DATABASES', newArrDatabases);
    },
  },
  modules: {},
});
