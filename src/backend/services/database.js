import { Core } from '../core';
import callFrontend from '../utils/callFrontend';

class DatabaseService {
  /**
   * @param {Core} core
   */
  constructor(core) {
    this.core = core;
  }

  async executeQuery(query) {
    if (!query) {
      return;
    }

    const [data] = await this.core.connection.query(query);

    return data;
  }

  async _getAllTableNames(schema) {
    const [tableNames] = await this.core.connection.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='${schema}' AND table_type='BASE TABLE';
    `);

    return tableNames.map(obj => obj.table_name);
  }

  async _getAllTableColumns({ schemeName = '', tableName = '' }) {
    const [tableColumns] = await this.core.connection.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns
      WHERE table_name = '${tableName}' AND table_schema = '${schemeName}';
    `);

    return tableColumns;
  }

  async getAllSchemasWithTables() {
    const schemas = await this.getAllSchemas();

    const data = schemas.reduce(async (acm, schema) => {
      const tables = await this._getAllTableNames(schema);

      return [...(await acm), { schema, tables }];
    }, []);

    return data;
  }

  async getAllSchemas() {
    const [data] = await this.core.connection.query(`
      select schema_name
      from information_schema.schemata;
    `);

    return data
      .map(queryData => queryData.schema_name)
      .filter(schema => {
        return (
          schema !== 'information_schema' &&
          schema !== 'pg_catalog' &&
          schema !== 'pg_toast'
        );
      });
  }

  async getAllDataInTable({ schemeName = '', tableName = '' }) {
    const tableColumns = await this._getAllTableColumns({
      schemeName,
      tableName,
    });

    const sql = `SELECT * FROM "${schemeName}"."${tableName}";`;

    const [data] = await this.core.connection.query(sql);

    return {
      tableColumns,
      data,
      sql,
    };
  }
}

export default function createDatabaseService(core) {
  if (!(core instanceof Core)) {
    throw new Error('Invalid Core');
  }

  const service = new DatabaseService(core);

  callFrontend({
    context: service,
    eventName: 'service/database/executeQuery',
    functionExec: service.executeQuery,
  });

  callFrontend({
    context: service,
    eventName: 'service/database/getAllSchemasWithTables',
    functionExec: service.getAllSchemasWithTables,
  });

  callFrontend({
    context: service,
    eventName: 'service/database/getAllSchemas',
    functionExec: service.getAllSchemas,
  });

  callFrontend({
    context: service,
    eventName: 'service/database/getAllDataInTable',
    functionExec: service.getAllDataInTable,
  });

  return service;
}
