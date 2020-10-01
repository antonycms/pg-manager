<template>
  <div class="text-center">
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card>
        <v-card-text draggable="false">
          {{ loadingMessage }}
          <v-progress-linear indeterminate class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },

  props: {
    openModal: {
      type: Boolean,
    },
    loadingMessage: {
      type: String,
      required: true,
    },
  },

  watch: {
    openModal() {
      this.dialog = this.openModal;
    },
  },
};
</script>
