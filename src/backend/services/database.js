import { Core } from '../core';
import { QueryTypes } from 'sequelize';
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

    try {
      const data = await this.core.connection.query(query, {
        type: QueryTypes.SELECT,
      });

      return data;
    } catch ({ message }) {
      return message;
    }
  }

  async _getAllTableNames(schema) {
    const tableNames = await this.core.connection.query(
      `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='${schema}' AND table_type='BASE TABLE';
    `,
      {
        type: QueryTypes.SELECT,
      },
    );

    return tableNames.map(obj => obj.table_name);
  }

  async _getAllTableColumns({ schemeName = '', tableName = '' }) {
    const tableColumns = await this.core.connection.query(
      `
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns
      WHERE table_name = '${tableName}' AND table_schema = '${schemeName}';
    `,
      { type: QueryTypes.SELECT },
    );

    return tableColumns;
  }

  async _getTableReferences({ schemeName = '', tableName = '' }) {
    const data = await this.core.connection.query(
      `
      select	R.CONSTRAINT_NAME, R.TABLE_SCHEMA, R.TABLE_NAME, R.COLUMN_NAME,
      U.TABLE_SCHEMA as "reference_table_schema", U.TABLE_NAME as "reference_table_name",
      U.COLUMN_NAME as "reference_column_name"
      
      
      from INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE U

      inner join INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS FK
          on U.CONSTRAINT_SCHEMA = FK.UNIQUE_CONSTRAINT_SCHEMA
          and U.CONSTRAINT_NAME = FK.UNIQUE_CONSTRAINT_NAME

      inner join INFORMATION_SCHEMA.KEY_COLUMN_USAGE R
          on R.CONSTRAINT_SCHEMA = FK.CONSTRAINT_SCHEMA
          and R.CONSTRAINT_NAME = FK.CONSTRAINT_NAME

      where R.TABLE_SCHEMA = '${schemeName}'
        and R.TABLE_NAME = '${tableName}';
    `,
      { type: QueryTypes.SELECT },
    );

    return data;
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
    const data = await this.core.connection.query(
      `
      select schema_name
      from information_schema.schemata;
    `,
      { type: QueryTypes.SELECT },
    );

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

  async getAllDataInTable({
    schemeName = '',
    tableName = '',
    limit = 50,
    actualPage = 1,
  }) {
    const references = await this._getTableReferences({
      schemeName,
      tableName,
    });
    const _tableColumns = await this._getAllTableColumns({
      schemeName,
      tableName,
    });

    const tableColumns = _tableColumns.map(column => {
      column.reference = references.reduce((acm, reference) => {
        if (reference.column_name === column.column_name) {
          return `${reference.reference_table_name}.${reference.reference_column_name}`;
        }

        return acm;
      }, '');

      return column;
    });

    const offset = limit * (actualPage - 1);

    const sql = `SELECT * FROM "${schemeName}"."${tableName}" LIMIT ${limit} OFFSET ${offset}`;
    const data = await this.core.connection.query(sql, {
      type: QueryTypes.SELECT,
    });

    return {
      tableColumns,
      data,
      references,
      sql,
    };
  }

  async getTableTotalRows({ schemeName = '', tableName = '' }) {
    const sql = `
      SELECT count(*) as total_rows FROM "${schemeName}"."${tableName}";
    `;

    const [data] = await this.core.connection.query(sql, {
      type: QueryTypes.SELECT,
    });

    const { total_rows } = data;

    return total_rows;
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

  callFrontend({
    context: service,
    eventName: 'service/database/getTableTotalRows',
    functionExec: service.getTableTotalRows,
  });

  return service;
}
