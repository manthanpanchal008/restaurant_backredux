const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    img: { type: String, required: true }, 
    category:{type:String,required:true}
})

const eventsModel = mongoose.model('events',eventsSchema)

module.exports = eventsModel    