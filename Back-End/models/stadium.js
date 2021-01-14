const mongoose = require('mongoose')


const stadiumSchema = mongoose.Schema( {
    Stadium_name: {
        type: String,
        required: true,
    },
    Length: {
        type: Number,
        required: true,
    },
    Width: {
        type: Number,
        required: true,
    },
})

stadiumSchema.virtual('Matches',{
    ref:'Match',
    localField:'_id',
    foreignField: 'stadium'
})

const stadium = mongoose.model('Stadium',stadiumSchema)
module.exports = stadium

