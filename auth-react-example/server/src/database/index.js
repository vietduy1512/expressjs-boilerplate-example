const Sequelize = require('sequelize');

const settings = {
  host: 'localhost',
  username: 'root',
  password: '123456',
  db: 'testdb',
  //dialect: 'mysql',
  dialect: 'sqlite',
  storage: './database.sqlite'
}

// MySQL
// const sequelize = new Sequelize(settings.db, settings.username, settings.password, {
//   host: settings.host,
//   dialect: settings.dialect
// });

// SQLITE
const sequelize = new Sequelize({
  dialect: settings.dialect,
  storage: settings.storage
});

module.exports = sequelize;