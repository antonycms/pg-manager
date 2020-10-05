<template>
  <v-card height="100%" width="100%">
    <v-card-title>
      {{ tableName }}

      <v-spacer />

      <v-col class="pa-0" cols="12" sm="4" md="4" lg="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filtrar"
          single-line
          hide-details
        />
      </v-col>
    </v-card-title>

    <v-data-table
      class="table_database"
      :headers="headers"
      :items="tableData"
      :search="search"
      :loading="loading"
      loading-text="Carregando... Por favor aguarde"
      no-data-text="Nenhum dado disponivel."
      no-results-text="Nenhum dado disponivel."
    />
  </v-card>
</template>

<script>
export default {
  name: 'TableDatabase',
  props: {
    tableName: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
    },
  },

  data: () => ({
    search: '',
  }),
};
</script>

<style scoped>
.table_database {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 !important;
  overflow: auto;

  border-top: 1px solid var(--black-white);
}
</style>

<style>
.table_database .v-data-table__wrapper {
  flex: 1 !important;
  overflow: auto;
}

th:not(:last-child),
td:not(:last-child) {
  border-right: 1px solid var(--black-white);
}
tr:last-child td {
  border-bottom: 1px solid var(--black-white);
}
</style>
