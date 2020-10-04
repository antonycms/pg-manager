<template>
  <v-container class="pb-0 manage_database_container">
    <v-row justify="center" class="row_table_database">
      <TableDatabase
        :tableName="tableName"
        :search="search"
        :headers="headers"
        :tableData="tableData"
        class="manage_database_table"
      />
    </v-row>

    <v-row class="max-height-200" v-show="showSQLEditor">
      <SQLEditor />
    </v-row>
  </v-container>
</template>

<script>
import TableDatabase from '@/frontend/components/TableDatabase';
import SQLEditor from '@/frontend/components/SQLEditor';

export default {
  name: 'ManageDatabase',
  components: {
    TableDatabase,
    SQLEditor,
  },
  data: () => ({
    showSQLEditor: true,

    tableName: 'usuario',
    search: '',
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    tableData: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
    ],
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
.max-height-200 {
  max-height: 200px;
  margin-bottom: 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>
