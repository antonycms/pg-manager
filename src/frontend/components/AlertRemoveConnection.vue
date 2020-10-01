<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn max-width="35" max-height="35" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title style="font-size: 18px !important;" class="headline">
          Remover a conexão {{ connectionName }}?
        </v-card-title>

        <v-card-text>
          Atenção, essa ação não poderá ser desfeita, deseja realmente remover
          essa conexão?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="grey darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>

          <v-btn color="red darken-1" text @click="handleRemoveConnection">
            Remover Conexão
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AlertRemoveConnection',
  props: {
    connectionName: {
      type: String,
      required: true,
    },
    connectionID: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    handleRemoveConnection() {
      this.$emit('remove_connection', {
        connectionID: this.connectionID,
        connectionName: this.connectionName,
      });

      this.dialog = false;
    },
  },
};
</script>
