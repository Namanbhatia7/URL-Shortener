const mongoose = require('mongoose')
var { nanoid } = require("nanoid");
mongoose.set('debug', true);

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
      },
      short: {
        type: String,
        required: true,
        default: () => nanoid()
      }, 
      clicks: {
        type: Number,
        required: true,
        default: 0
      }
})

module.exports = mongoose.model("ShortURL", shortUrlSchema);