const sqlite3 = require('sqlite3')
const db_name = 'main.sqlite'


let db = new sqlite3.Database(db_name, err => {
    if (err)
        throw err
    console.log('Database start on '+db_name)

    
    //db.run(`CREATE TABLE user(id INTEGER PRIMARY KEY,name VARCHAR(255), first_name VARCHAR(255) )`)
    //db.run(`INSERT INTO user(name,first_name) VALUES(?, ?)`,['JORIS', 'BLANC'])
    db.run(`DELETE FROM Refuge WHERE id == 2`)
    
    //db.each('SELECT * FROM user', (err, data) => {
    //    if (err)
    //        throw err
    //    
    //    console.log(data.name +' '+ data.first_name)
    //})
})

    /*
    
    SELECT
    .get // Récuper la premiere ligne
    .all // tout en un seul
    .each // tout en plusieurs comme un for

    CREATE/INSERT / ...
    .run // ligne de sql genre create etc

    */

db.close(err => {
    if(err)
        throw err
    console.log('Database closed')
})
