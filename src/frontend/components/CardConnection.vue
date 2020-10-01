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
      />
    </v-app-bar>

    <v-card-text>
      <div class="text--primary"><strong>Host:</strong> {{ host }}</div>

      <div class="text--primary"><strong>Porta:</strong> {{ port }}</div>

      <div class="text--primary"><strong>Usuário:</strong> {{ user }}</div>
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
      type: Number,
      required: true,
    },
    connectionName: {
      type: String,
      required: true,
    },
    user: {
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
};
</script>
