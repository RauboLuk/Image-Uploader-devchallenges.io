const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const bodyParser = require('body-parser')

const app = express()
const upload = multer({ dest: 'uploads/' })

// Heroku dynamically sets a port
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/img', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  console.log('b', JSON.stringify(req.body));
  if(!req.file) {
    res.send({
        status: false,
        message: 'No file uploaded'
    });
  } else {
    res.send('ok');
  }
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/version', (req, res) => {
  res.send('1') // change this string to ensure a new version deployed
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
