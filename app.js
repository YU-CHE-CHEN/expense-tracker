const express = require('express')


const app = express()


app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(3000, () => {
  console.log('App isrunning on http://localhost:3000')
})