<template>
  <v-app-bar elevation="3" app color="white" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <span class="black--text">
        Logo
      </span>
    </div>

    <v-spacer></v-spacer>

    <FormConnection />
  </v-app-bar>
</template>

<script>
import FormConnection from '@/frontend/components/FormConnection';

export default {
  name: 'Header',
  components: {
    FormConnection,
  },
};
</script>
