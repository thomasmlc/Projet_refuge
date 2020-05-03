const express = require('express')
const bodyParser = require('body-parser')
const Refuges = require('./models/refuges')
const Sequelize = require('sequelize')

const { Op } = Sequelize;

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('views', './views')
app.set('view engine', 'ejs')

app.delete('refuges/:id', function(request, response) {
    let { id } = request.params;

    Refuges.findByPk(id).then((refuge)=> {
        refuge.destroy().then(() => {
            response.status(204).send()
        })
    })
})

app.get('/', function(request, res) {
    let filter = {};
    let { q } = request.query

    if(request.query.q) {
        filter = {
            where: {
                name: {
                    
                    [Op.like]: `%${q}%`
                }
            },
            
        
        };
    }
    
    Refuges.findAll(filter).then ((refuges)=>{
        
        res.render('main', {
        title: 'Bonjour',
        name:'Toto',
        refuges: refuges

    })

    })

    
})


app.post('/refuges', function(request, response){
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

app.get('/refuges', function(request, res){
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
        
        res.render('refuges', {
        title: 'Bonjour',
        
        refuges: refuges

    })

    })
});

app.get('/refuges/:id', function(request, response){
    let { id } = request.params;

    Refuges.findByPk(id).then ((refuge)=>{

        if (refuge){
            response.render('refuge',{
                title: refuge.name,
                refuge: refuge
                })
        }
        else if (request.params.id == "add") {
            response.render("add", { refuge: {} });
        }
        else{

            response.status(404).send();
        }


    })
});

app.get("/refuges/edit/:id", (request, response) => {
    let { id } = request.params;

    Refuges.findByPk(id).then ((refuge)=>{

        if (refuge){
            response.render('edit',{
                refuge: refuge
            })

        }else{
            response.status(404).send();
        }
    })
});

app.post("/refuges/edit/:id", (request, response) => {

});

app.post("/refuges/add", (request, response) => {
    Refuges.create({
        name: request.body.name,
        adress: request.body.adress
    }) .then(() => {
        response.redirect('/refuges');
    })
});

app.get("/refuges/delete/:id", (request, response) => {
    const id = request.params.id;
    Refuges.findByPk(id).then ((refuge)=>{

        if (refuge){
            response.render('delete',{
                refuge: refuge
            })

        }else{
            response.status(404).send();
        }
    })
});

app.post("refuges/delete/:id", (request, response) => {
    const id = request.params.id;
    response.redirect('/refuges');
    Refuges.findByPk(id).then((refuge)=> {
        refuge.destroy().then(() => {
            response.redirect('/refuges');
        })
    })
});

app.listen(8000)