const express = require('express')
const Refuges = require('./models/refuges')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const {
    Op
} = Sequelize;

const app = express();

app.use(express.urlencoded({
    extended: true
}))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.json());


// Get main.ejs
app.get('/', function (request, res) {

    Refuges.findAll().then((refuges) => {

        if (refuges) {

            res.render('main', {
                title: 'Bonjour',

            })
        } else {
            res.status(404).send('Error 404 not found')
        }
    })

})


// Make search and GET refuges
app.get('/refuges', function (request, res) {

    // q => rechercher avec nom correspondant
    let filter = {};
    let {
        q
    } = request.query

    if (request.query.q) {

        filter = {
            where: {
                name: {
                    [Op.like]: `%${q}%`
                }
            }
        };
    }

    // Get refuges correspondant a filter
    Refuges.findAll(filter).then((refuges) => {

        if (refuges) {

            res.render('refuges', {

                title: 'Bonjour',
                refuges: refuges

            })

        } else {
            res.status(404).send('Error 404 not found')
        }

    })
});


// GET Refuges and Add
app.get('/refuges/:id', function (request, response) {
    let {
        id
    } = request.params;

    Refuges.findByPk(id).then((refuge) => {

        if (refuge) {
            response.render('refuge', {
                title: refuge.name,
                refuge: refuge
            })
        } else if (request.params.id == "add") {
            response.render("add", {
                refuge: {}
            });
        } else {
            response.status(404).send('Error 404 not found');
        }

    })
});


// GET Edit current values
app.get("/refuges/edit/:id", (request, response) => {
    let {
        id
    } = request.params;

    Refuges.findByPk(id).then((refuge) => {

        if (refuge) {
            response.render('edit', {
                refuge: refuge
            })
        } else {
            response.status(404).send('Error 404 not found');
        }
    })
});


// POST Edit
app.post("/refuges/edit/:id", (request, response) => {
    Refuges.findByPk(request.params.id).then(refuge => {

        if (refuge) {

            refuge.update({
                name: request.body.name,
                adress: request.body.adress
            });
        } else {
            response.status(404).send('Error 404 not found');
        }

        response.redirect('/refuges/' + request.params.id);
    })

});


// POST Add
app.post("/refuges/add", (request, response) => {
    Refuges.create({
        name: request.body.name,
        adress: request.body.adress
    }).then(() => {
        response.redirect('/refuges');
    }).catch(() => {
        response.status(404).send('Error 404 not found');
    })
});


// GET Delete current values
app.get("/refuges/delete/:id", (request, response) => {
    let id = request.params.id;
    Refuges.findByPk(id).then((refuge) => {
        if (refuge) {
            response.render('delete', {
                refuge: refuge
            })
        } else {
            response.status(404).send('Error 404 not found');
        }
    })
});


// POST Delete
app.post("/refuges/delete/:id", (request, response) => {
    let id = request.params.id;
    Refuges.findByPk(id).then((refuge) => {

        if (refuge) {
            refuge.destroy().then(() => {
                response.redirect('/refuges');
            })
        } else {
            response.status(404).send('Error 404 not found');
        }

    })
});

app.listen(8000)