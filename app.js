const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing 
// Heroku dynamically sets a port
const PORT = process.env.PORT || 5000

app.use(fileUpload({
  createParentPath: true
}));

app.use(express.static('dist'))
app.use(cors())

app.post('/upload', function(req, res) {
  console.log(req.get('Content-Type'));
  console.log(req.files); // the uploaded file object
  console.log(req.body); // the uploaded file object
});

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/version', (req, res) => {
  res.send('1') // change this string to ensure a new version deployed
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
