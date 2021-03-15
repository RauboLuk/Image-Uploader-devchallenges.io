const path = require('path');
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
// const cors = require('cors')
const fileUpload = require('express-fileupload')

const app = express()
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const PORT = process.env.PORT

const imgModel = require('./models')

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => {
    console.log('Mongo connected')
})

app.use(fileUpload({
  createParentPath: true
}))

app.use(express.json())
app.use(express.static('build'))
// app.use(cors())

app.post('/upload', async (req, res) => {
  try {
    if(!req.files) {
      res.send({
          status: false,
      });
    } else {
      let img = req.files.img
      const newImg = new imgModel({
        img: {
          data: img.data,
          contentType: 'image/jpg'
        }
      })

      const data = await newImg.save()
      res.send({
          status: true,
          id: data.id
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/upload/:id', (req, res) => {
  const id = req.params.id
  if( !mongoose.Types.ObjectId.isValid(id) ){
    return res.sendStatus(400)
  }
  imgModel.findById(id, (err, items) => {
    if (err) {
      console.log(err)
      res.status(500).send('An error occurred', err)
    }
    else {
      res.send({ items })
    }
  })
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
