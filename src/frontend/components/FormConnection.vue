<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" rounded dark v-bind="attrs" v-on="on">
          {{ language.databaseTexts.addConnection }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">{{
            language.databaseTexts.addNewConnection
          }}</span>
        </v-card-title>

        <form v-on:submit.prevent="handleConnection" id="login_form">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="connectionName"
                    :label="language.databaseTexts.connectionName + '*'"
                    hint="Nome da conexão que aparecerá no cartão na pagina principal"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="5" md="5">
                  <v-text-field
                    v-model="connectionConfig.database"
                    :label="language.databaseTexts.database + '*'"
                    hint="banco de dados a ser utilizado"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="5" md="5">
                  <v-text-field
                    v-model="connectionConfig.host"
                    :label="language.databaseTexts.host + '*'"
                    hint="Host de acesso do banco de dados"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="2" md="2">
                  <v-text-field
                    v-model="connectionConfig.port"
                    :label="language.databaseTexts.port + '*'"
                    hint="Porta de acesso para o banco de dados"
                    required
                    type="number"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="connectionConfig.username"
                    :label="language.databaseTexts.user + '*'"
                    hint="Usuário de acesso do banco de dados"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="connectionConfig.password"
                    :label="language.databaseTexts.password + '*'"
                    type="password"
                    hint="Senha do usuário de acesso do banco de dados"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <small>{{ language.requiredFields }}</small>
          </v-card-text>
        </form>

        <v-card-actions style="padding: 16px 24px 10px;">
          <v-btn
            style="margin-right: 10px;"
            color="blue darken-1"
            @click="handleTestConnection"
          >
            <span class="white--text" v-if="!loading">
              {{ language.databaseTexts.testConnection }}
            </span>

            <v-progress-circular
              indeterminate
              color="white"
              v-else
              :size="25"
              :width="3"
            ></v-progress-circular>
          </v-btn>

          <v-icon v-show="testStatus" color="green">mdi-check</v-icon>
          <v-icon v-show="testStatus === false" color="red"
            >mdi-window-close</v-icon
          >

          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1"
            text
            @click="handleResetConnectionFormData"
          >
            {{ language.cancel }}
          </v-btn>

          <v-btn form="login_form" type="submit" color="blue darken-1" text>
            {{ language.add }}
          </v-btn>
        </v-card-actions>

        <v-alert
          dense
          outlined
          type="error"
          v-model="alert"
          dismissible
          border="left"
          elevation="2"
          style="margin-bottom: 0; margin-top: 5px;"
        >
          Erro ao conectar a base de dados!
        </v-alert>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import callBackend from '@/frontend/utils/callBackend';

export default {
  data: () => ({
    dialog: false,

    connectionName: '',

    connectionConfig: {
      host: '',
      port: undefined,
      database: '',
      username: '',
      password: '',
    },

    testStatus: null,
    alert: false,

    loading: false,
  }),

  computed: {
    language() {
      return this.$vuetify.lang.locales[this.$vuetify.lang.current];
    },
  },

  methods: {
    async handleTestConnection() {
      this.alert = false;
      this.loading = true;

      const checkConnection = await callBackend({
        eventName: 'core/testConnection',
        data: this.connectionConfig,
      });

      this.loading = false;

      this.testStatus = checkConnection;
    },

    handleResetConnectionFormData() {
      this.alert = false;
      this.dialog = false;
      this.testStatus = null;
      this.connectionName = '';

      this.connectionConfig = {
        host: '',
        port: '',
        database: '',
        username: '',
        password: '',
      };
    },

    async handleConnection() {
      this.alert = false;

      const status = await callBackend({
        eventName: 'core/testConnection',
        data: this.connectionConfig,
      });

      if (!status) {
        this.alert = true;
        return;
      }

      this.$store.dispatch('saveNewDatabase', {
        ...this.connectionConfig,
        connectionName: this.connectionName,
      });

      this.handleResetConnectionFormData();
    },
  },
};
</script>
