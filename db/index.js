const mysql = require('mysql')

const db = mysql.createPool({
    host: '47.109.61.218',
    user: 'root',
    password: 'tohsaka666',
    database: 'TKBLOG'
})

module.exports = db