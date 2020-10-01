<template>
  <div>
    <h4 class="home_title">Conexões Salvas</h4>

    <v-container>
      <v-row>
        <div v-if="!connections.length" class="not_con_message">
          <v-icon size="30">mdi-alert-circle-outline</v-icon>
          <p>Nenhuma conexão adicionada.</p>
        </div>

        <v-col
          v-else
          cols="12"
          sm="6"
          md="4"
          v-for="connection in connections"
          :key="connection.id"
        >
          <CardConnection
            :connectionName="connection.connectionName"
            :connectionID="connection.id"
            :database="connection.database"
            :username="connection.username"
            :password="connection.password"
            :host="connection.host"
            :port="connection.port"
            @db_connecting="promise => showModalConnecting(promise)"
          />
        </v-col>
      </v-row>

      <ModalLoading
        :openModal="openModal"
        loadingMessage="Conectando a base de dados..."
      />
    </v-container>
  </div>
</template>

<script>
import CardConnection from '@/frontend/components/CardConnection';
import ModalLoading from '@/frontend/components/ModalLoading';

export default {
  name: 'Home',
  components: {
    CardConnection,
    ModalLoading,
  },

  computed: {
    connections() {
      return this.$store.state.databases;
    },
  },

  data: () => ({
    openModal: false,
  }),

  methods: {
    async showModalConnecting(promise) {
      this.openModal = true;
      await promise;
      this.openModal = false;
    },
  },
};
</script>

<style scoped>
.home_title {
  font-size: 30px;
  margin: 20px auto;
  text-align: center;

  font-weight: 400;
  color: #666;
}

.not_con_message {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  height: 400px;

  font-size: 24px;
  font-weight: 300;
  color: #666;
}

.not_con_message p {
  margin: 0 6px;
}
</style>
