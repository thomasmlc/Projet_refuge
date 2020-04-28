const express = require('express')
const Sequelize = require('sequelize');
const app = express();
const port = 8000;

app.get('/', function(req, res){

  res.status(200).sendFile(__dirname+'/index.html')
});
app.post('/ajouter', function(req , res){
  res.send('test')
})
app.post('/supprimer', function(req, res){
  
  res.send('supprimé')
})

app.listen(port, () => {
  console.log('Server is on port'+ port)
});