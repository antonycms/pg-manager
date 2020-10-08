import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from '@/frontend/language/pt';
import en from '@/frontend/language/en';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt, en },
    current: 'pt',
  },
});
