const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3004

app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


const db = require('./queries')
app.get('/destination/:dest', db.getDestination)
app.get('/post/:flight_num/:dest/:title/:image_url/:post_content/:tags', db.createPost)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)
