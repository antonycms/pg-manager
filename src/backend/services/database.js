import { Core } from '../core';
import callFrontend from '../utils/callFrontend';

class DatabaseService {
  /**
   * @param {Core} core
   */
  constructor(core) {
    this.core = core;
  }

  async _getAllTableNames(schema) {
    const [tableNames] = await this.core.connection.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='${schema}' AND table_type='BASE TABLE';
    `);

    return tableNames.map(obj => obj.table_name);
  }

  async getAllSchemas() {
    const schemas = await this.core.connection.showAllSchemas();

    const data = schemas.reduce(async (acm, schema) => {
      const tables = await this._getAllTableNames(schema);

      return [...acm, { schema, tables }];
    }, []);

    return data;
  }

  async getAllDataInTable({ schemeName = '', tableName = '' }) {
    const [data] = await this.core.connection.query(`
      SELECT * FROM "${schemeName}"."${tableName}";
    `);

    return data;
  }
}

export default function createDatabaseService(core) {
  if (!(core instanceof Core)) {
    throw new Error('Invalid Core');
  }

  const service = new DatabaseService(core);

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
