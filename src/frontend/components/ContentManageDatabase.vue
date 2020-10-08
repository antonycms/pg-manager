<template>
  <v-card height="100%" width="100%">
    <v-card-title class="pl-0 pt-0 remove_select_text">
      <v-col class="pa-0" cols="12" sm="8" md="8" lg="8">
        <v-tabs v-model="tab">
          <v-tab>
            {{ tableTabs.dataTableText }}
          </v-tab>
          <v-tab>
            {{ tableTabs.informationTableText }}
          </v-tab>
        </v-tabs>
      </v-col>

      <v-spacer />

      <v-col v-show="!tab" class="pa-0" cols="12" sm="4" md="4" lg="4 ">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="language.filterText"
          single-line
          hide-details
        />
      </v-col>
    </v-card-title>

    <v-tabs-items v-model="tab" class="table_tabs_container">
      <v-tab-item>
        <TableDatabase
          :headers="headersData"
          :tableData="tableData"
          :loading="loading"
          :search="search"
        />
      </v-tab-item>
      <v-tab-item>
        <TableDatabase
          :headers="headersInformation"
          :tableData="tableInformation"
          :loading="loading"
          hideDefaultFooter
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import TableDatabase from '@/frontend/components/TableDatabase';
export default {
  name: 'ContentManageDatabase',
  components: {
    TableDatabase,
  },
  props: {
    headersData: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    tableInformation: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
    },
  },

  computed: {
    language() {
      return this.$vuetify.lang.locales[this.$vuetify.lang.current];
    },
    informationTableColumns() {
      return this.language.databaseTexts.informationTableColumns;
    },
    tableTabs() {
      return this.language.databaseTexts.tableTabs;
    },

    headersInformation() {
      return [
        {
          value: 'column_name',
          text: this.informationTableColumns.column,
        },
        {
          value: 'column_default',
          text: this.informationTableColumns.valueDefault,
        },
        {
          value: 'data_type',
          text: this.informationTableColumns.type,
        },
        {
          value: 'is_nullable',
          text: this.informationTableColumns.nullable,
        },
        {
          value: 'reference',
          text: this.informationTableColumns.reference,
        },
      ];
    },
  },

  data: () => ({
    search: '',
    tab: undefined,
  }),
};
</script>

<style>
.table_tabs_container .v-window-item--active,
.table_tabs_container .v-window__container,
.table_tabs_container.v-tabs-items {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 !important;
  overflow-y: auto;
}
</style>
