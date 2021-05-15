<template>
  <div class="show_sql_editor_container">
    <div class="btn_sql_editor_container">
      <v-icon class="btn_icon">mdi-open-in-app</v-icon>
      <v-switch class="btn_switch" v-model="showSQLEditor" inset />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showSQLEditor: true,
  }),

  watch: {
    showSQLEditor(value) {
      if (value !== this.show) {
        this.$store.commit('SET_SHOW_SQL_EDITOR', this.showSQLEditor);
      }
    },
    show(value) {
      if (value !== this.showSQLEditor) {
        this.showSQLEditor = value;
      }
    },
  },

  computed: {
    show() {
      return this.$store.state.showSqlEditor;
    },
  },

  created() {
    this.showSQLEditor = this.show;
  },
};
</script>

<style scoped>
.show_sql_editor_container {
  position: relative;
  height: 48px;
}
.btn_sql_editor_container {
  display: flex !important;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 0;

  overflow: hidden;

  width: 100px;
  height: 48px;
}

.btn_icon {
  margin: 0 15px;
}
</style>
