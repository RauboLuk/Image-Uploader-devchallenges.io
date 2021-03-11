require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const app = express()
// Heroku dynamically sets a port
const PORT = process.env.PORT || 5000

app.use(fileUpload({
  createParentPath: true
}));

app.use(express.static('dist'))
app.use(cors())

app.post('/upload', function(req, res) {
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let img = req.files.img;
        
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        img.mv('./uploads/' + img.name);

        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: img.name,
                mimetype: img.mimetype,
                size: img.size
            }
        });
    }
  } catch (err) {
      res.status(500).send(err);
  }
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
