const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const routes = require('./routes')

const { withConnection } = require('./connection');

app.use(bodyParser.json());

app.use('/services', routes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

withConnection(connection => {
  console.log('connection successfully obtained');
});