const path = require('path');
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
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
    console.log('connected')
});

app.use(fileUpload({
  createParentPath: true
}));

app.use(express.json()) // for parsing application/json
app.use(express.static('dist'))
app.use(cors())

app.post('/upload', async (req, res) => {
  try {
    if(!req.files) {
      res.send({
          status: false,
          message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let img = req.files.img
      
      
      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      img.mv('./uploads/' + img.name)
      
      const newImg = new imgModel({
        img: {
          data: img.data,
          contentType: 'image/jpg'
        }
      })

      await newImg.save()

      //send response
      // res.send({
      //     status: true,
      //     message: 'File is uploaded',
      //     data: {
      //         name: img.name,
      //         mimetype: img.mimetype,
      //         size: img.size
      //     }
      // })
    }
  } catch (err) {
      res.status(500).send(err);
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
