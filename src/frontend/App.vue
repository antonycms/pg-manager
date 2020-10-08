<template>
  <v-app>
    <HomeHeader v-if="!actualDatabase" />
    <HeaderManageDabatase v-else />

    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import HomeHeader from '@/frontend/components/HomeHeader';
import HeaderManageDabatase from '@/frontend/components/HeaderManageDabatase';
import Footer from '@/frontend/components/Footer';

export default {
  name: 'App',
  components: {
    HomeHeader,
    HeaderManageDabatase,
    Footer,
  },

  computed: {
    actualDatabase() {
      return this.$store.state.actualDatabase;
    },
  },

  beforeCreate() {
    if (this.$store.state.actualDatabase) {
      this.$store.commit('SET_ACTUAL_DATABASE', null);
      this.$store.commit('SET_ACTUAL_TABLE', null);
      this.$router.push('/');
    }
  },

  created() {
    if (navigator.language.includes('pt')) {
      this.$vuetify.lang.current = 'pt';
    } else {
      this.$vuetify.lang.current = 'en';
    }
  },
};
</script>

<style src="./styles/global.css"></style>
