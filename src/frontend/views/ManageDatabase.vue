<template>
  <div id="container_manage_content">
    <v-tabs height="45px" v-model="tab">
      <v-tab>Tabela</v-tab>
      <v-tab>Editor SQL</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-container v-show="tab == 0" class="pb-0 manage_database_container">
          <v-row justify="center" class="row_table_database">
            <ContentManageDatabase
              class="manage_database_table"
              @search="event => (search = event)"
              :headersData="headersData"
              :tableData="tableData"
              :tableInformation="tableInformation"
              :loading="loadingTableData"
              :totalItems="totalItems"
              @pagination="pagination"
              @sort="sortTableDatabase"
            />
          </v-row>

          <v-row class="container_sql_editor_md" v-show="showSQLEditor">
            <v-col cols="12" sm="6" md="6" lg="6" class="pa-0">
              <div class="pa-0 bottom_containers">
                <SQLEditor
                  :sql="sql"
                  @sql_textarea_data="value => (sql = value)"
                  readonly
                />

                <v-card rounded="0" elevation="0" class="menu_sql_editor" />
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
              md="6"
              lg="6"
              class="pa-0 bottom_containers"
            >
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
      </v-tab-item>

      <v-tab-item>
        <div v-show="tab == 1" class="sql_database_container">
          <v-card width="100%" max-width="90%" height="60%">
            <SQLEditor
              :sql="editorTabSql"
              @sql_textarea_data="value => (editorTabSql = value)"
            />
          </v-card>

          <v-card class="mt-4" width="100%" max-width="90%" height="40%">
            <p>Resultados</p>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
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
    editorTabSql: '',
    loadingTableData: false,
    tabs: undefined,
    page: 1,
    itemsPerPage: 50,
    totalItems: 0,
    sortTable: {
      columnName: null,
      sortType: null,
    },
    tab: null,
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
    sortTable() {
      this.loadTableData();
    },
    search() {
      this.loadTableData();
    },
    tab(tabIndex) {
      const tabs = {
        0: 'database',
        1: 'sql_editor',
      };

      const activeTab = tabs[tabIndex];

      if (activeTab === 'sql_editor') {
        this.hideSQLEditor();
      }

      this.$store.commit('SET_ACTIVE_TAB', activeTab);
    },
  },

  methods: {
    pagination(event) {
      const { itemsPerPage, page } = event;

      this.page = page;
      this.itemsPerPage = itemsPerPage;
    },

    sortTableDatabase(event) {
      this.sortTable = event;
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
          orderBy: this.sortTable.columnName ? this.sortTable : null,
          where: this.search,
        },
      });

      if (data.failed) {
        this.loadingTableData = false;
        this.SqlQueryData = '';
        this.sql = `SQL Inválido: ${data.sql.trim()} \n\n"${
          data.error.message
        }"`;
        return;
      }

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
      this.sql = data.sql.trim();
      this.SqlQueryData = JSON.stringify(data.data, null, 2);

      this.loadingTableData = false;
    },

    async handleRunSQL() {
      const data = await callBackend({
        eventName: 'service/database/executeQuery',
        data: this.sql,
      });

      this.SqlQueryData = JSON.stringify(data, null, 2);
    },

    hideSQLEditor() {
      this.$store.commit('SET_SHOW_SQL_EDITOR', false);
    },
  },
};
</script>

<style scoped>
#container_manage_content {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
}

#container_manage_content .v-tabs {
  flex: unset;
}

#container_manage_content .v-window.v-item-group.v-tabs-items,
#container_manage_content .v-window__container,
#container_manage_content .v-window-item.v-window-item--active {
  height: 100%;
}

.manage_database_container {
  max-width: 90%;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 64px - 48px);
}

.sql_database_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 97.5%;
  margin-top: 12px;
  max-height: calc(100vh - 64px - 48px);
}

.row_table_database {
  /* overflow: auto; */
  flex: 1;
  height: 1px;
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
