<template>
  <v-card height="100%" width="100%">
    <v-card-title class="pl-0 pt-0">
      <v-col class="pa-0" cols="12" sm="8" md="8" lg="8">
        <v-tabs v-model="tab">
          <v-tab>
            Dados da tabela
          </v-tab>
          <v-tab>
            Informaçoes da tabela
          </v-tab>
        </v-tabs>
      </v-col>

      <v-spacer />

      <v-col v-show="!tab" class="pa-0" cols="12" sm="4" md="4" lg="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filtrar"
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
          search
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

  data: () => ({
    search: '',
    tab: undefined,
    headersInformation: [
      {
        value: 'column_name',
        text: 'Coluna',
      },
      {
        value: 'column_default',
        text: 'Valor padrão',
      },
      {
        value: 'data_type',
        text: 'Tipo',
      },
      {
        value: 'is_nullable',
        text: 'Nulavel',
      },
      {
        value: 'reference',
        text: 'Referencia',
      },
    ],
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
