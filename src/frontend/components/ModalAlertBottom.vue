<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" :height="height || 150">
        <v-btn class="mt-6" text color="red" @click="handleEmitCloseModal">
          Fechar
        </v-btn>
        <div class="py-3" draggable="false">
          <span>{{ modalMessage }}</span>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    sheet: false,
  }),

  props: {
    openModal: {
      type: Boolean,
    },
    modalMessage: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
    },
  },

  watch: {
    openModal() {
      this.sheet = this.openModal;
    },
  },

  methods: {
    handleEmitCloseModal() {
      this.$emit('close_alert_modal');
    },
  },
};
</script>
