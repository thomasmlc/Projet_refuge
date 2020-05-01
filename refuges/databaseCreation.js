const sqlite3 = require('sqlite3')
const db_name = 'refuges.sqlite'

let db = new sqlite3.Database(db_name, err => {
    if(err)
        throw err
    console.log('Database start on '+db_name)

    //db.run(`CREATE TABLE refuges(id INTEGER PRIMARY KEY,name VARCHAR(255), adress VARCHAR(255) )`)
    //db.run(`INSERT INTO refuges(name,adress) VALUES(?, ?)`,['Refuge dogosphere', '6 Rue du Berger'])
})