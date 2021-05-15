<template>
  <v-container class="pb-0 manage_database_container">
    <v-row justify="center" class="row_table_database">
      <ContentManageDatabase
        class="manage_database_table"
        :search="search"
        :headersData="headersData"
        :tableData="tableData"
        :tableInformation="tableInformation"
        :loading="loadingTableData"
        :totalItems="totalItems"
        @pagination="pagination"
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
import ContentManageDatabase from '@/frontend/components/ContentManageDatabase';
import SQLEditor from '@/frontend/components/SQLEditor';
import JSONEditor from '@/frontend/components/JSONEditor';
import callBackend from '../utils/callBackend';

export default {
  name: 'ManageDatabase',
  components: {
    ContentManageDatabase,
    SQLEditor,
    JSONEditor,
  },
  data: () => ({
    search: '',
    headersData: [],
    tableData: [],
    tableInformation: [],

    sql: '',
    SqlQueryData: '',
    loadingTableData: false,
    tabs: undefined,
    page: 1,
    itemsPerPage: 50,
    totalItems: 0,
  }),
  computed: {
    actualTable() {
      return this.$store.state.actualTable;
    },

    showSQLEditor() {
      return this.$store.state.showSqlEditor;
    },

    language() {
      return this.$vuetify.lang.locales[this.$vuetify.lang.current];
    },
  },
  watch: {
    actualTable() {
      this.loadTableData();
    },
    page() {
      this.loadTableData();
    },
    itemsPerPage() {
      this.loadTableData();
    },
  },

  methods: {
    pagination(event) {
      const { itemsPerPage, page } = event;

      this.page = page;
      this.itemsPerPage = itemsPerPage;
    },

    async loadTableData() {
      this.headersData = [];
      this.tableData = [];
      this.tableInformation = [];

      if (!this.actualTable) {
        return;
      }

      const { schemeName, tableName } = this.actualTable;

      this.loadingTableData = true;

      const totalItems = await callBackend({
        eventName: 'service/database/getTableTotalRows',
        data: {
          schemeName,
          tableName,
        },
      });

      const data = await callBackend({
        eventName: 'service/database/getAllDataInTable',
        data: {
          schemeName,
          tableName,
          limit: this.itemsPerPage,
          actualPage: this.page,
        },
      });

      this.totalItems = Number(totalItems);
      this.headersData = data.tableColumns.map(column => ({
        value: column.column_name,
        text: column.column_name,
      }));
      this.tableInformation = data.tableColumns.map(column => {
        const nullable =
          column.is_nullable === 'NO' ? this.language.no : this.language.yes;

        column.is_nullable = nullable;
        return column;
      });
      this.tableData = data.data;
      this.sql = data.sql;

      this.loadingTableData = false;
    },

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
