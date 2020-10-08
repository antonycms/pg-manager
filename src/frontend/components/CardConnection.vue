<template>
  <v-card shaped class="mx-auto" max-width="344">
    <v-app-bar flat color="rgba(0, 0, 0, 0)" max-height="50">
      <v-toolbar-title class="title pl-0 remove_select_text">
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
      <div class="text--primary">
        <strong draggable="false" class="remove_select_text">Host:</strong>
        {{ host }}
      </div>

      <div class="text--primary">
        <strong draggable="false" class="remove_select_text">Porta:</strong>
        {{ port }}
      </div>

      <div class="text--primary">
        <strong draggable="false" class="remove_select_text">Usuário:</strong>
        {{ username }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        @click="handleConnection"
        text
        color="primary accent-4"
        class="remove_select_text"
      >
        {{ connectMessage }}
      </v-btn>
    </v-card-actions>

    <ModalAlertBottom
      :modalMessage="connectionTextError"
      :openModal="openModalErrorConnection"
      @close_alert_modal="openModalErrorConnection = false"
    />
  </v-card>
</template>

<script>
import AlertRemoveConnection from '@/frontend/components/AlertRemoveConnection';
import ModalAlertBottom from '@/frontend/components/ModalAlertBottom';
import callBackend from '../utils/callBackend';

export default {
  name: 'CardConnection',
  components: {
    AlertRemoveConnection,
    ModalAlertBottom,
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
    database: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    port: {
      type: [Number, String],
      required: true,
    },
  },

  data: () => ({
    openModalErrorConnection: false,
  }),

  computed: {
    language() {
      return this.$vuetify.lang.locales[this.$vuetify.lang.current];
    },
    connectionTextError() {
      return this.language.databaseTexts.connectionTextError;
    },
    connectMessage() {
      return this.language.connect;
    },
  },

  methods: {
    removeConnection(data) {
      const { connectionID } = data;
      this.$store.dispatch('removeDatabase', connectionID);
    },

    async handleConnection() {
      const configDB = {
        database: this.database,
        port: this.port,
        host: this.host,
        username: this.username,
        password: this.password,
      };

      const promise = callBackend({
        eventName: 'core/defineConnection',
        data: configDB,
      });

      this.$emit('db_connecting', promise);

      const status = await promise;

      if (!status) {
        this.openModalErrorConnection = true;
        return;
      }

      this.$store.commit('SET_ACTUAL_DATABASE', {
        ...configDB,
        connectionName: this.connectionName,
      });
      this.$router.push({ name: 'ManageDatabase' });
    },
  },
};
</script>
