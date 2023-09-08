require('dotenv').config();
const{CONNECTION_STRING}  = process.env;

const Sequelize = require("sequelize");// returns a Class so upper case
const sequelize= new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
})

module.exports = {
    sequelize
}


