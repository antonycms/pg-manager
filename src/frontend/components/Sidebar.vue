<template>
  <v-navigation-drawer
    disable-resize-watcher
    class="sidebar_db_container remove_select_text"
    v-model="sidebarMenu"
    draggable="false"
    app
    floating
    :permanent="sidebarMenu"
  >
    <slot />
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    openSidebar: {
      type: Boolean,
    },
  },

  data: () => ({
    sidebarMenu: true,
  }),

  watch: {
    openSidebar() {
      this.sidebarMenu = this.openSidebar;
    },
  },
};
</script>

<style scoped>
.sidebar_db_container {
  box-shadow: 0px 0 2px rgba(0, 0, 0, 0.5);
  overflow: hidden !important;
}
</style>
