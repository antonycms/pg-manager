import Sequelize from 'sequelize';

export default async function createConnection(config) {
  const connection = new Sequelize(config);

  connection
    .authenticate()
    .then(() => {
      console.log('SUCESS: A conexão com a base de dados foi estabelecida!');
    })
    .catch(err => {
      console.error(
        'ERROR: Impossivel se conectar a base dados: ',
        err.message,
      );
    });

  return connection;
}
