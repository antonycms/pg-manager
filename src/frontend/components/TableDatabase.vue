<template>
  <v-data-table
    dense
    class="table_database"
    :headers="headers"
    :items="tableData"
    :search="search"
    :loading="loading"
    loading-text="Carregando... Por favor aguarde"
    no-data-text="Nenhum dado disponivel."
    no-results-text="Nenhum dado disponivel."
  />
</template>

<script>
export default {
  name: 'TableDatabase',
  props: {
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
    search: {
      type: String,
    },
  },
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
