<template>
  <v-container class="pb-0 manage_database_container">
    <v-row justify="center" class="row_table_database">
      <TableDatabase
        :tableName="tableName"
        :search="search"
        :headers="headers"
        :tableData="tableData"
        :loading="loadingTableData"
        class="manage_database_table"
      />
    </v-row>

    <v-row class="container_sql_editor_md" v-show="showSQLEditor">
      <SQLEditor :sql="sql" />
    </v-row>
  </v-container>
</template>

<script>
import TableDatabase from '@/frontend/components/TableDatabase';
import SQLEditor from '@/frontend/components/SQLEditor';
import callBackend from '../utils/callBackend';

export default {
  name: 'ManageDatabase',
  components: {
    TableDatabase,
    SQLEditor,
  },
  computed: {
    actualTable() {
      return this.$store.state.actualTable;
    },
  },
  watch: {
    async actualTable() {
      this.headers = [];
      this.tableData = [];

      if (!this.actualTable) {
        return;
      }

      const { schemeName, tableName } = this.actualTable;

      this.loadingTableData = true;
      const data = await callBackend({
        eventName: 'service/database/getAllDataInTable',
        data: {
          schemeName,
          tableName,
        },
      });
      this.loadingTableData = false;

      this.headers = data.tableColumns.map(column => ({
        value: column.column_name,
        text: column.column_name,
      }));
      this.tableData = data.data;
      this.sql = data.sql;
    },
  },

  data: () => ({
    showSQLEditor: true,

    tableName: 'usuario',
    search: '',
    headers: [],
    tableData: [],
    sql: '',
    loadingTableData: false,
  }),
};
</script>

<style scoped>
.manage_database_container {
  max-width: 90%;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 64px - 48px);
}

.row_table_database {
  /* overflow: auto; */
  flex: 1;
  max-height: 100%;
  overflow: hidden;
  margin: auto -16px;
  margin-bottom: 10px;
  padding: 4px;
}

.manage_database_table {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.container_sql_editor_md {
  max-height: 200px;
  margin-bottom: 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>
