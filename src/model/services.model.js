const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    desc:{type:String},
    icon:{type:String,required:true},

})

const servicesModel = mongoose.model('services',servicesSchema)

module.exports = servicesModel