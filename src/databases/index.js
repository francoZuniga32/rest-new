const Sequelize = require('sequelize')
const data = require('./config/config.json').development;

const sequelize = new Sequelize(
    data.database,          
    data.username,          
    data.password,{
        host: data.host,
        port: data.port,         
        dialect: 'mysql'
    }
);

module.exports = sequelize;