const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'database',
    'username',
    'password',
    {
        host: 'host',
        port: 1111,
        dialect: 'dialect',
    }
)




