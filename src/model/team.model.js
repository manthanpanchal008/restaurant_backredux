const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    position:{type:String,required:true},
    profile:{type:String,required:true},
    socialmedia: {
        insta: {
            type:String
        },
        x:{
            type:String
        },
        facebook:{
            type:String
        }
    }

})

const teamModel = mongoose.model('team',teamSchema)

module.exports = teamModel