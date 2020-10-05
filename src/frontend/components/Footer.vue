<template>
  <v-footer padless>
    <v-col class="text-center" cols="12">
      <strong>PG Manager</strong> by
      <a target="_blank" href="https://github.com/antonycms">
        <strong>antonycms</strong>
      </a>
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
