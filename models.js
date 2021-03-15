const mongoose = require('mongoose')

const imgSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String
  },
  createdAt: { type: Date, expires: 180, default: Date.now()}
})

imgSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Img', imgSchema)