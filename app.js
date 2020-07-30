
const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello Tekton!'))

app.listen(port, () => console.log(`server started`))

//source: https://expressjs.com/en/starter/hello-world.html