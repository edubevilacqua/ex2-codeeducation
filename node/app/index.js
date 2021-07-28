const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreateTable = `CREATE TABLE IF NOT EXISTS nodedb.people(id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL)`
connection.query(sqlCreateTable)

const sql = `INSERT INTO people(name) values('Eduardo')`
connection.query(sql)

let html = ''
connection.query(`SELECT name FROM people`, function (err, results) {
  if (err) {
    throw err;
  };
  for (const result of results) {
    html += `<li>${result.name}</li>`;
  }
})
connection.end()

app.get('/', (req, res) => {
  res.send('<h1>Full Cycle Rocks!</h1><ul>' + html + '</ul>')
})

app.listen(port, () => {
  console.log('NodeJS rodando...')
})