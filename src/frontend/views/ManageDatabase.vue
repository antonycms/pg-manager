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
      <v-col cols="12" sm="6" md="6" lg="6" class="pa-0">
        <div class="pa-0 bottom_containers">
          <SQLEditor :sql="sql" @sql_textarea_data="value => (sql = value)" />

          <v-card rounded="0" elevation="0" class="menu_sql_editor">
            <button class="btn_run_sql" @click="handleRunSQL">
              <v-icon>mdi-play</v-icon>
            </button>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" sm="6" md="6" lg="6" class="pa-0 bottom_containers">
        <JSONEditor :json="SqlQueryData" />
      </v-col>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div class="btn_copy_container">
            <button v-bind="attrs" v-on="on" v-clipboard="SqlQueryData">
              <v-icon>mdi-content-copy</v-icon>
            </button>
          </div>
        </template>
        <span>Copiar Tudo</span>
      </v-tooltip>
    </v-row>
  </v-container>
</template>

<script>
import TableDatabase from '@/frontend/components/TableDatabase';
import SQLEditor from '@/frontend/components/SQLEditor';
import JSONEditor from '@/frontend/components/JSONEditor';
import callBackend from '../utils/callBackend';

export default {
  name: 'ManageDatabase',
  components: {
    TableDatabase,
    SQLEditor,
    JSONEditor,
  },
  computed: {
    actualTable() {
      return this.$store.state.actualTable;
    },

    showSQLEditor() {
      return this.$store.state.showSqlEditor;
    },
  },
  watch: {
    async actualTable() {
      this.headers = [];
      this.tableData = [];
      this.tableName = 'Tabela';

      if (!this.actualTable) {
        return;
      }

      const { schemeName, tableName } = this.actualTable;

      this.tableName = tableName;
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
    tableName: 'Tabela',
    search: '',
    headers: [],
    tableData: [],
    sql: '',
    SqlQueryData: '',
    loadingTableData: false,
    tabs: undefined,
  }),

  methods: {
    async handleRunSQL() {
      const data = await callBackend({
        eventName: 'service/database/executeQuery',
        data: this.sql,
      });

      this.SqlQueryData = JSON.stringify(data, null, 2);
    },
  },
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
  background-color: var(--black-white);
}
.bottom_containers {
  height: 100%;
  max-height: 200px;
  display: flex;
  flex: 1;
  overflow: auto;
}
.menu_sql_editor {
  padding: 10px 0;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1px;
  margin-left: 1px;
}
.btn_run_sql {
  outline: transparent;
}
.btn_copy_container {
  position: relative;
}
.btn_copy_container button {
  position: absolute;
  right: 10px;
  top: 10px;
  outline: transparent;
}
</style>
