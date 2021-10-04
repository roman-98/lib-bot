const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'library_db',
    'root',
    'Jor@79253*/prof1',
    {
        host: 'localhost',
        port: 5487,
        dialect: 'postgres',
    }
)
