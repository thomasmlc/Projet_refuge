const Sequelize = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database/main.sqlite '
  });

sequelize
  .authenticate()
  .then(function(err){
      console.log('Connection has been done')
  }, function (err){
      console.log('Unable to connect to the database', err)
  })

module.exports = sequelize