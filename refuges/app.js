const express = require('express')
const bodyParser = require('body-parser')
const Refuges = require('./models/refuges')
const Sequelize = require('sequelize')

const { Op } = Sequelize;

const app = express();

app.use(bodyParser.json());

app.delete('api/refuges/:id', function(request, response) {
    let { id } = request.params;

    Refuges.findByPk(id).then((refuge)=> {
        refuge.destroy().then(() => {
            response.status(204).send()
        })
    })
})

app.post('/api/genres', function(request, response){
    Refuges.create({
        name: request.body.name,
        adress: request.body.adress

    }).then((refuge)=>{
        response.json(refuge)
    },(validation) => {
        response.status(422).json({
            errors: validation.errors.map((error)=> {
                return{
                    attribute: error.path,
                    message: error.message
                } 
            })
        })
        
    })
    
})

app.get('/api/refuges', function(request, response){
    let filter = {};
    let { q } = request.query

    if(request.query.q) {
        filter = {
            where: {
                name: {
                    
                    [Op.like]: `%${q}%`
                }
            }
        };
    }

    Refuges.findAll(filter).then ((refuges)=>{
        response.json(refuges);

    })
});

app.get('/api/refuges/:id', function(request, response){
    let { id } = request.params;

    Refuges.findByPk(id).then ((refuge)=>{

        if (refuge){
            response.json(refuge);
        }else{
            response.status(404).send();
        }
        

    })
});

app.listen(8000)