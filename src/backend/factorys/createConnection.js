import { Sequelize } from 'sequelize';

export default async function createConnection(config = {}) {
  const connection = new Sequelize(config);

  await connection.authenticate().catch(err => {
    throw new Error(
      `ERROR: Impossivel se conectar a base dados: ${err.message}`,
    );
  });

  return connection;
}
