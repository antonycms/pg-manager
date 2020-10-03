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
};
</script>

<style src="./styles/global.css"></style>
