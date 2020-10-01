<template>
  <v-app>
    <Header />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/frontend/components/Header';
export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style src="./styles/global.css"></style>
