const mongoose = require('mongoose')



const matchSchema = mongoose.Schema( {
    Home_Team: {
        type: String,
        required: true,
    },
    Away_Team: {
        type: String,
        required: true,
    },
    stadium:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Stadium',
            required:true
    },
    Date:{
        type:Date,
        required:true
    },
    Main_Ref:{
        type:String,
        required:true
    },
    Line1_Ref:{
        type:String,
        required:true
    },
    Line2_Ref:{
        type:String,
        required:true
    },
    Seats:{
        type:Array,
        required:true
    }
})

const Match = mongoose.model('Match',matchSchema)
module.exports = Match

