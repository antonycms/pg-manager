import { Options } from 'sequelize';
import createConnection from './factorys/createConnection';
import callFrontend from './utils/callFrontend';
import services from './getAllServices';
import * as pg from 'pg';

export class Core {
  /**
   * @param {Options} options
   */
  async defineConnection(options) {
    const localOptions = { ...options };

    localOptions.dialectModule = pg;
    localOptions.dialect = 'postgres';

    if (this.connection) {
      await this.connection.close();

      this.connection = null;
    }

    try {
      const connection = await createConnection(localOptions);

      this.connection = connection;
      return true;
    } catch (_) {
      return false;
    }
  }

  async testConnection(options) {
    const localOptions = { ...options };

    localOptions.dialectModule = pg;
    localOptions.dialect = 'postgres';

    try {
      const connection = await createConnection(localOptions);
      connection.close();

      return true;
    } catch (_) {
      return false;
    }
  }

  async closeConnection() {
    if (this.connection) {
      await this.connection.close();

      this.connection = null;
    }
  }

  initServices(services = []) {
    services.forEach(service => service(this));
  }
}

export function createCore() {
  const core = new Core();

  callFrontend({
    context: core,
    eventName: 'core/testConnection',
    functionExec: core.testConnection,
  });

  callFrontend({
    context: core,
    eventName: 'core/defineConnection',
    functionExec: core.defineConnection,
  });

  callFrontend({
    context: core,
    eventName: 'core/closeConnection',
    functionExec: core.closeConnection,
  });

  core.initServices(services);

  return core;
}
