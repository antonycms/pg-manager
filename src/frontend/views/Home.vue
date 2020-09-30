<template>
  <div class="home">
    <div>
      <input v-model="connectionConfig.host" type="text" placeholder="host" />
      <input v-model="connectionConfig.port" type="text" placeholder="port" />
      <input
        v-model="connectionConfig.database"
        type="text"
        placeholder="database"
      />
      <input
        v-model="connectionConfig.username"
        type="text"
        placeholder="username"
      />
      <input
        v-model="connectionConfig.password"
        type="text"
        placeholder="password"
      />
      <button @click="handleTestConnection" type="submit">
        Testar Conexao
      </button>
      <button @click="handleConnection" type="submit">Conectar</button>
    </div>

    <button @click="handleListSchemas">Listar schemas</button>
    <button @click="handleListData">Listar Dados schema</button>
  </div>
</template>

<script>
import callBackend from '@/frontend/utils/callBackend';

export default {
  name: 'Home',
  data: () => ({
    connectionConfig: {
      host: 'localhost',
      port: 5433,
      database: 'postgres',
      username: 'docker',
      password: 'docker',
    },
  }),

  methods: {
    async handleTestConnection() {
      const checkConnection = await callBackend({
        eventName: 'core/testConnection',
        data: this.connectionConfig,
      });

      console.log(checkConnection);
    },

    handleConnection() {
      callBackend({
        eventName: 'core/defineConnection',
        data: this.connectionConfig,
      });
    },

    async handleListSchemas() {
      const schemas = await callBackend({
        eventName: 'service/database/getAllSchemas',
      });

      console.log(schemas);
    },

    async handleListData() {
      const schemas = await callBackend({
        eventName: 'service/database/getAllDataInTable',
        data: {
          schemeName: 'pdvweb',
          tableName: 'Banco',
        },
      });

      console.log(schemas);
    },
  },
};
</script>
