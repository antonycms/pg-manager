<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="650">
      <v-card>
        <v-card-title style="font-size: 20px !important;" class="headline">
          {{ modalTitle }}
        </v-card-title>

        <v-card-text>
          {{ modalMessage }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="emitCloseModal">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
    modalTitle: {
      type: String,
      required: true,
    },
    modalMessage: {
      type: String,
      required: true,
    },
  },

  watch: {
    openModal() {
      this.dialog = this.openModal;
    },
  },

  methods: {
    emitCloseModal() {
      this.$emit('close_alert_modal');
    },
  },
};
</script>
