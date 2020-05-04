const Sequelize = require('sequelize')
const sequelize = require('./../database/sequelize')

module.exports = sequelize.define('refuges', {

    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        field: 'name',
        type: Sequelize.STRING,
        validate: {
            notEmpty:{
                args: true,
                msg: 'Nom requis'
            },
        }
    },

    adress: {
        field: 'adress',
        type: Sequelize.STRING,
        validate: {
            notEmpty:{
                args: true,
                msg: 'adresse requis'
            },
        }
    }
},

{
    timestamps: false
})