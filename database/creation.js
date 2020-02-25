const sqlite3 = require('sqlite3')
const db_name = 'main.db'

let db = new sqlite3.Database(db_name, err => {
    if (err)
        throw err
    console.log('Database start on '+db_name)

    


})




db.close(err => {
    if(err)
        throw err
    console.log('Database closed')
})