<template>
  <v-app-bar elevation="0" app white>
    <div class="d-flex align-center">
      <!-- <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/frontend/assets/logo.svg"
        transition="scale-transition"
        width="40"
      /> -->

      <span class="remove_select_text">
        PG Manager
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
