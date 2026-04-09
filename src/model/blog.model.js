const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    img: { type: String, required: true }, 
    topic:{type:String,required:true},
    desc:{type:String,required:true},
}, { timestamps: true })

const blogModel = mongoose.model('blog',blogSchema)

module.exports = blogModel    