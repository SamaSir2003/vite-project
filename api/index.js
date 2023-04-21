
const express = require('express')
const oracledb = require('oracledb')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/api', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
          user          : "dse001",
          password      : "dse001",
          connectionString: "ORACLE-SERVER/mcaorcl"
        });
    
        let result = await connection.execute(`SELECT * FROM driver`);
        res.send(result);
    
      } catch (err) {
        console.error(err.message);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err.message);
          }
        }
      }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})