<template>
  <v-footer inset padless app>
    <ShowSqlEditorButton v-if="actualDatabase && activeTabTabDatabase" />

    <v-col class="text-center remove_select_text" cols="12">
      <strong>PG Manager</strong> by
      <a target="_blank" href="https://github.com/antonycms" draggable="false">
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
    activeTabTabDatabase() {
      return this.$store.state.activeTab === 'database';
    },
  },
};
</script>
