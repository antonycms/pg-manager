<template>
  <v-footer padless>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }}
      — <strong>PG Manager</strong>
    </v-col>

    <ChangeThemeButton />
  </v-footer>
</template>

<script>
import ChangeThemeButton from '@/frontend/components/ChangeThemeButton';

export default {
  name: 'Footer',
  components: {
    ChangeThemeButton,
  },
};
</script>
