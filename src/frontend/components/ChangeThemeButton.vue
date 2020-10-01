<template>
  <div class="change_theme_component_container">
    <div class="btn_theme_container">
      <v-switch class="btn_switch" v-model="lighTheme" inset />
      <v-icon>mdi-theme-light-dark</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    lighTheme: true,
  }),

  watch: {
    lighTheme() {
      this.$store.commit('SET_ACTIVE_THEME', this.lighTheme);
      this.changeTheme();
    },
  },

  computed: {
    theme() {
      return this.$store.state.active_theme === 'DARK';
    },
  },

  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = this.theme;
    },
  },

  created() {
    this.lighTheme = this.theme;
    this.changeTheme();
  },
};
</script>

<style scoped>
.change_theme_component_container {
  position: relative;
  height: 48px;
}
.btn_theme_container {
  display: flex !important;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;
  right: 0;

  overflow: hidden;

  width: 100px;
  height: 48px;
}
</style>
