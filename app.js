const express = require('express')
const app = express()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// Heroku dynamically sets a port
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

app.post('/img', upload.single('avatar'), (req, res) => {
  console.log(req.file, 'f');
  res.send('ok')
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
