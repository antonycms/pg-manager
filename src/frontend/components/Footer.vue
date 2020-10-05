<template>
  <v-footer inset padless app>
    <ShowSqlEditorButton v-if="actualDatabase" />

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
import ShowSqlEditorButton from '@/frontend/components/ShowSqlEditorButton';

export default {
  name: 'Footer',
  components: {
    ChangeThemeButton,
    ShowSqlEditorButton,
  },

  computed: {
    actualDatabase() {
      return this.$store.state.actualDatabase;
    },
  },
};
</script>
