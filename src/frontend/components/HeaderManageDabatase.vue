<template>
  <fragment>
    <v-app-bar elevation="0" app white>
      <div class="d-flex align-center remove_select_text">
        <v-btn
          class="sidebarMenu_btn_state"
          small
          elevation="0"
          :color="openSidebar ? 'primary' : ''"
          fab
          rounded
          @click="handleSidebar"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/frontend/assets/logo.svg"
          transition="scale-transition"
          width="40"
        />

        <span>
          PG Manager
        </span>
      </div>

      <v-spacer></v-spacer>

      <v-btn color="primary" rounded dark @click="handleDisconnect">
        {{ language.disconnect }}
      </v-btn>
    </v-app-bar>

    <Sidebar :openSidebar="openSidebar">
      <div class="sidebar_content">
        <v-card elevation="1">
          <v-card-title>
            <v-icon>mdi-database</v-icon>
            <span class="sidebar_title remove_select_text">{{ dbName }}</span>

            <v-spacer />

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  @click="loadSchemasWithTables"
                  height="26"
                  width="26"
                  text
                >
                  <v-progress-circular
                    size="18"
                    width="2"
                    indeterminate
                    v-if="loadingData"
                  ></v-progress-circular>

                  <v-icon v-else>mdi-update</v-icon>
                </v-btn>
              </template>

              <span>{{ language.refresh }}</span>
            </v-tooltip>
          </v-card-title>
        </v-card>

        <v-sheet class="pa-2 pt-4 primary">
          <v-text-field
            v-model="searchTableName"
            :label="language.searchText"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
          <v-checkbox
            v-model="tableSearchcaseSensitive"
            dark
            hide-details
            :label="language.sensitiveSearch"
            color="white"
          ></v-checkbox>
        </v-sheet>

        <v-treeview
          :load-children="loadSchemasWithTables"
          :items="items"
          :active.sync="activeSchema"
          :search="searchTableName"
          :filter="filterSidebar"
          activatable
          item-key="name"
          open-on-click
          return-object
          rounded
          class="treeview_database"
        >
          <template v-slot:prepend="{ item, open }">
            <div>
              <v-icon v-if="!item.schema && !item.id">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-if="!item.schema && item.id">
                mdi-folder-table-outline
              </v-icon>
              <v-icon v-if="item.schema">
                mdi-table
              </v-icon>
            </div>
          </template>
        </v-treeview>
      </div>
    </Sidebar>
  </fragment>
</template>

<script>
import Sidebar from '@/frontend/components/Sidebar';
import callBackend from '../utils/callBackend';

export default {
  name: 'HeaderManageDatabase',
  components: {
    Sidebar,
  },

  computed: {
    dbName() {
      let name;

      if (this.$store.state.actualDatabase) {
        name = this.$store.state.actualDatabase.connectionName || 'Database';
      }

      return name;
    },

    items() {
      return [
        {
          name: this.language.databaseTexts.schema,
          children: this.schemas,
        },
      ];
    },

    selectedSchema() {
      if (!this.activeSchema.length) return undefined;

      return this.activeSchema[0];
    },

    filterSidebar() {
      return this.tableSearchcaseSensitive
        ? (item, search, textKey) => {
            return item[textKey].indexOf(search) > -1;
          }
        : undefined;
    },

    language() {
      return this.$vuetify.lang.locales[this.$vuetify.lang.current];
    },
  },

  watch: {
    selectedSchema() {
      if (!this.selectedSchema) {
        this.$store.commit('SET_ACTUAL_TABLE', null);
        return;
      }

      const { name: tableName, schema: schemeName } = this.selectedSchema;

      this.$store.commit('SET_ACTUAL_TABLE', {
        schemeName,
        tableName,
      });
    },
  },

  data: () => ({
    openSidebar: true,
    schemas: [],
    activeSchema: [],

    tableSearchcaseSensitive: false,
    searchTableName: undefined,
    loadingData: false,
  }),

  methods: {
    handleSidebar() {
      this.openSidebar = !this.openSidebar;
    },

    handleDisconnect() {
      callBackend({
        eventName: 'core/closeConnection',
      });

      this.$store.commit('SET_ACTUAL_DATABASE', null);
      this.$router.push('/');
    },

    async loadSchemasWithTables() {
      this.loadingData = true;
      const schemas = await callBackend({
        eventName: 'service/database/getAllSchemasWithTables',
      });
      this.loadingData = false;

      this.schemas = schemas.map(schema => ({
        name: schema.schema,
        id: schema.schema,

        children: schema.tables.map(table => ({
          name: table,
          id: table,
          schema: schema.schema,
        })),
      }));
    },
  },
};
</script>

<style scoped>
.sidebarMenu_btn_state {
  margin-right: 30px;
}
.sidebar_title {
  font-size: 16px;
}
.schemas_panel {
  max-height: 200px;
  overflow: auto;
}

.sidebar_content {
  max-height: 100vh;
  display: flex !important;
  flex-direction: column;
}

.treeview_database {
  flex-direction: column;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}
</style>
