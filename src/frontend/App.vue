<template>
  <v-app>
    <Header />

    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Header from '@/frontend/components/Header';
import Footer from '@/frontend/components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style src="./styles/global.css"></style>
