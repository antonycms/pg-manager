<template>
  <v-data-table
    dense
    class="table_database"
    :headers="headers"
    :items="tableData"
    :search="search"
    :loading="loading"
    :hide-default-footer="hideDefaultFooter"
    :disable-pagination="hideDefaultFooter"
    :server-items-length="totalItems"
    draggable="false"
    @pagination="emitEventPagination"
    @update:options="emitEventSortBy"
    fixed-header
    :footer-props="{
      'items-per-page-options': [50, 100, 200, 500],
    }"
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
    hideDefaultFooter: {
      type: Boolean,
    },
    actualPage: {
      type: Number,
      default: () => 1,
    },
    totalItems: {
      type: Number,
    },
  },
  methods: {
    emitEventPagination(event) {
      this.$emit('pagination', event);
    },
    emitEventSortBy(event) {
      if (!this.totalItems || !this.actualPage) return;

      const { sortBy, sortDesc } = event;
      const sortTypes = { true: 'DESC', false: 'ASC' };

      const eventResponse = {
        columnName: null,
        sortType: null,
      };

      if (sortBy && sortBy.length) {
        const [columnName] = sortBy;
        const sortType = sortTypes[`${sortDesc}`];

        eventResponse.columnName = columnName;
        eventResponse.sortType = sortType;
      }

      this.$emit('sort', eventResponse);
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
