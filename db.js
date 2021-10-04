const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'database',
    'user',
    'password',
    {
        host: 'localhost',
        port: 1111,
        dialect: 'postgres',
    }
)
