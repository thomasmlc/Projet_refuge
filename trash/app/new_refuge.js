const Sequelize = require('sequelize');
const connection = require('../database/db-connect')
  
  let Refuge = connection.define('Refuge',{
    name: {type: Sequelize.STRING, allowNull: false},
    lat: {type: Sequelize.DOUBLE, allowNull: false},
    long: {type: Sequelize.DOUBLE, allowNull: false},
    site: {type: Sequelize.STRING, allowNull: false},
    adress: {type: Sequelize.STRING, allowNull: false}
  
  },
  {
    timestamps: false,
    freezeTableName: true
  })
  
  connection
  .sync({
    force: true
  })
  .then(function(){
    Refuge.create({
      name: 'Association Venus',
      lat: 44.852509,
      long: -0.582730,
      site: "https://associationvenus.fr/",
      adress: "24 Rue De Laseppe, 33000 Bordeaux"
    })
    
    
  })
  
  
  //récupérer tous les élément avec juste la datavalues
  Refuge.findAll().then(refuges => {
    refuges.forEach(refuge => {
      const test = refuge.dataValues
    });
    
  }).catch(function(e){
    console.log(e)
  })

module.exports = Refuge