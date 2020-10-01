<template>
  <v-card shaped class="mx-auto" max-width="344">
    <v-app-bar flat color="rgba(0, 0, 0, 0)" max-height="50">
      <v-toolbar-title class="title black--text pl-0">
        {{ connectionName }}
      </v-toolbar-title>

      <v-spacer />

      <AlertRemoveConnection
        :connectionID="connectionID"
        :connectionName="connectionName"
        @remove_connection="data => removeConnection(data)"
      />
    </v-app-bar>

    <v-card-text>
      <div class="text--primary"><strong>Host:</strong> {{ host }}</div>

      <div class="text--primary"><strong>Porta:</strong> {{ port }}</div>

      <div class="text--primary"><strong>Usuário:</strong> {{ username }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn text color="deep-purple accent-4">
        Conectar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AlertRemoveConnection from '@/frontend/components/AlertRemoveConnection';

export default {
  name: 'CardConnection',
  components: {
    AlertRemoveConnection,
  },

  props: {
    connectionID: {
      type: String,
      required: true,
    },
    connectionName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
      required: true,
    },
  },

  methods: {
    removeConnection(data) {
      const { connectionID } = data;
      this.$store.dispatch('removeDatabase', connectionID);
    },
  },
};
</script>
