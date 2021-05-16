<template>
  <v-navigation-drawer
    app
    ref="drawer"
    :width="navigation.width"
    class="sidebar_db_container remove_select_text"
    v-model="sidebarMenu"
    draggable="false"
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

  data() {
    return {
      sidebarMenu: true,
      navigation: {
        width: undefined,
        maxWidth: 560,
        minWidth: 269,
        borderSize: 2,
      },
    };
  },

  watch: {
    openSidebar() {
      this.sidebarMenu = this.openSidebar;
    },
    'navigation.width'(value) {
      this.$store.commit('SET_WIDTH_SIDEBAR', value);
    },
  },

  methods: {
    setBorderWidth() {
      const i = this.$refs.drawer.$el.querySelector(
        '.v-navigation-drawer__border',
      );

      i.style.width = this.navigation.borderSize + 'px';
      i.style.cursor = 'ew-resize';
    },

    setEvents() {
      const minSize = this.navigation.borderSize;
      const el = this.$refs.drawer.$el;
      const vm = this;

      const maxWidth = vm.navigation.maxWidth;
      const minWidth = vm.navigation.minWidth;

      const drawerBorder = el.querySelector('.v-navigation-drawer__border');
      const direction = el.classList.contains('v-navigation-drawer--right')
        ? 'right'
        : 'left';

      function resize(e) {
        document.body.style.cursor = 'ew-resize';
        let f =
          direction === 'right'
            ? document.body.scrollWidth - e.clientX
            : e.clientX;

        if (f > maxWidth || f < minWidth) return;

        el.style.width = f + 'px';
      }

      drawerBorder.addEventListener(
        'mousedown',
        function(e) {
          if (e.offsetX < minSize) {
            el.style.transition = 'initial';
            document.addEventListener('mousemove', resize, false);
          }
        },
        false,
      );

      document.addEventListener(
        'mouseup',
        function() {
          el.style.transition = '';
          vm.navigation.width = el.style.width;
          document.body.style.cursor = '';

          document.removeEventListener('mousemove', resize, false);
        },
        false,
      );
    },
  },
  created() {
    this.navigation.width = this.$store.state.widthSidebar;
  },
  mounted() {
    this.setBorderWidth();
    this.setEvents();
  },
};
</script>

<style scoped>
.sidebar_db_container {
  box-shadow: 0px 0 2px rgba(0, 0, 0, 0.5);
  overflow: hidden !important;
}
</style>
