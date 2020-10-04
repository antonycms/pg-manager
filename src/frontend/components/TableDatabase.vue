<template>
  <v-card height="100%" width="100%">
    <v-card-title>
      {{ tableName }}

      <v-spacer />

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      class="table_database"
      :headers="headers"
      :items="tableData"
      :search="search"
    />
  </v-card>
</template>

<script>
export default {
  props: {
    tableName: {
      type: String,
      required: true,
    },
    search: {
      type: String,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
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
}
</style>

<style>
.table_database .v-data-table__wrapper {
  flex: 1 !important;
  overflow: auto;
}
</style>
